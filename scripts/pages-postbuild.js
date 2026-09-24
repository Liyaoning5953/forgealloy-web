// GitHub Pages post-build: route-specific SEO shells, sitemap and safe 404 handling.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { routePages } from './route-manifest.js';

const dist = 'dist';
const origin = 'https://forgealloyracing.com';
const baseShell = readFileSync(join(dist, 'index.html'), 'utf8');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function renderShell({ route = '', title, description, image, robots = 'index,follow' }) {
  const path = route ? `/${route}/` : '/';
  const url = `${origin}${path}`;
  let html = baseShell
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);

  if (image) {
    html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeHtml(image)}" />`);
  }
  return html;
}

writeFileSync(join(dist, '.nojekyll'), '');

for (const page of routePages) {
  const target = join(dist, page.route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderShell(page));
}

const notFound = renderShell({
  title: 'Page not found | ForgeAlloy',
  description: 'The requested ForgeAlloy page could not be found.',
  robots: 'noindex,follow',
});
writeFileSync(join(dist, '404.html'), notFound);

const movedTarget = `${origin}/about-factory/`;
const moved = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${movedTarget}"><meta http-equiv="refresh" content="0;url=${movedTarget}"><title>Page moved | ForgeAlloy</title></head><body><p>This page moved to <a href="${movedTarget}">${movedTarget}</a>.</p></body></html>`;
mkdirSync(join(dist, 'about'), { recursive: true });
writeFileSync(join(dist, 'about', 'index.html'), moved);

const sitemapPages = [{ route: '', priority: '1.0' }, ...routePages.map((page) => ({
  route: page.route,
  priority: page.route.startsWith('products/') ? '0.5' : page.route.startsWith('guides/') ? '0.6' : page.route.startsWith('accessories/') ? '0.7' : '0.8',
}))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map(({ route, priority }) => `  <url><loc>${origin}${route ? `/${route}/` : '/'}</loc><priority>${priority}</priority></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(`pages-postbuild: ${routePages.length} SEO route shells + sitemap + 404 + /about redirect`);
