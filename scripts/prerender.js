// Prerender the priority routes into static HTML.
//
// The site is a client-rendered SPA on GitHub Pages: the server returns a shell
// with no body copy. Googlebot renders JS (with a delay) but most AI answer
// engines — GPTBot, PerplexityBot, Google-Extended — do not, so the guides and
// commercial pages are effectively invisible to them.
//
// This script loads each priority route in headless Chrome after the build, then
// splices the rendered markup into the route's existing SEO shell. The shell head
// (hand-written title / description / canonical) is preserved, the JSON-LD the
// page adds at runtime is carried over, and the entry bundle stays in place so
// hydration replaces the static markup on load.
//
// Delivery is soft: if Chrome is missing or a route fails, the build still ships
// the shells. Set PRERENDER_STRICT=1 to fail the build instead.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, statSync, createReadStream, existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';
import { PRERENDER_ROUTES } from './route-manifest.js';

const dist = 'dist';
const strict = process.env.PRERENDER_STRICT === '1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function findChrome() {
  const override = process.env.PRERENDER_CHROME_PATH;
  if (override && existsSync(override)) return override;

  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate)) || null;
}

// Minimal static file server over dist/, with directory-index and 404 fallback.
function startServer() {
  const root = resolve(dist);

  const server = createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400).end('bad request');
      return;
    }

    const candidates = [];
    const direct = resolve(root, `.${pathname}`);
    if (direct.startsWith(root)) {
      candidates.push(direct);
      if (pathname.endsWith('/')) candidates.push(join(direct, 'index.html'));
      else if (!extname(pathname)) candidates.push(join(direct, 'index.html'));
    }

    const file = candidates.find((candidate) => {
      try {
        return statSync(candidate).isFile();
      } catch {
        return false;
      }
    });

    if (!file) {
      const notFound = join(root, '404.html');
      if (existsSync(notFound)) {
        res.writeHead(404, { 'content-type': MIME['.html'] });
        createReadStream(notFound).pipe(res);
        return;
      }
      res.writeHead(404).end('not found');
      return;
    }

    res.writeHead(200, { 'content-type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });

  return new Promise((done, fail) => {
    server.once('error', fail);
    server.listen(0, '127.0.0.1', () => done(server));
  });
}

function shellPathFor(route) {
  return route ? join(dist, route, 'index.html') : join(dist, 'index.html');
}

async function main() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.warn('prerender: no Chrome found (set PRERENDER_CHROME_PATH) - shipping shells only');
    return { ok: 0, failed: 0, skipped: true };
  }

  const server = await startServer();
  const port = server.address().port;
  const origin = `http://127.0.0.1:${port}`;
  let browser;

  let ok = 0;
  const failures = [];

  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--hide-scrollbars'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Only this machine's static server is reachable: measurement scripts and
    // remote image hosts are blocked, so prerendering can never send analytics
    // hits or slow the build down on image downloads.
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (url.startsWith(origin) || url.startsWith('data:') || url.startsWith('blob:')) request.continue();
      else request.abort();
    });

    for (const route of PRERENDER_ROUTES) {
      const shellFile = shellPathFor(route);
      const url = `${origin}/${route ? `${route}/` : ''}`;

      try {
        if (!existsSync(shellFile)) throw new Error(`shell missing at ${shellFile}`);

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page.waitForFunction(
          () => {
            const main = document.querySelector('#root main');
            return Boolean(main && main.textContent.replace(/\s+/g, ' ').trim().length > 200);
          },
          { timeout: 25000 }
        );
        // Let the page's own effects (title, JSON-LD) finish before serializing.
        await new Promise((done) => setTimeout(done, 200));

        const rendered = await page.evaluate(() => {
          const root = document.getElementById('root');
          const jsonLd = Array.from(document.querySelectorAll('script[data-page-jsonld="true"]')).map((node) => node.outerHTML);
          return { html: root ? root.innerHTML : '', jsonLd, title: document.title };
        });

        if (!rendered.html || rendered.html.length < 500) {
          throw new Error(`rendered body too small (${rendered.html.length} chars)`);
        }

        const shell = readFileSync(shellFile, 'utf8');
        const marker = '<div id="root"></div>';
        if (!shell.includes(marker)) throw new Error('shell has no empty #root placeholder');

        let html = shell.replace(marker, `<div id="root">${rendered.html}</div>`);
        if (rendered.jsonLd.length) {
          html = html.replace('</head>', `    ${rendered.jsonLd.join('\n    ')}\n  </head>`);
        }

        writeFileSync(shellFile, html);
        ok += 1;
        console.log(`prerender: ok  /${route}  (${html.length.toLocaleString()} bytes, title "${rendered.title}")`);
      } catch (error) {
        failures.push({ route, message: error.message });
        console.warn(`prerender: skip /${route} - ${error.message}`);
      }
    }
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
    await new Promise((done) => server.close(done));
  }

  return { ok, failed: failures.length, skipped: false };
}

main()
  .then(({ ok, failed, skipped }) => {
    if (skipped) return;
    console.log(`prerender: ${ok}/${PRERENDER_ROUTES.length} routes prerendered, ${failed} skipped`);
    if (failed && strict) process.exitCode = 1;
  })
  .catch((error) => {
    console.warn(`prerender: skipped entirely - ${error.message}`);
    if (strict) process.exitCode = 1;
  });
