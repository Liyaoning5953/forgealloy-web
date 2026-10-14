// Tell IndexNow about the pages that changed.
//
// IndexNow is an open protocol led by Bing: one POST notifies Bing, Yandex, Naver
// and Seznam at once. Google does not participate, so this does not replace
// "Request indexing" in Search Console. It matters here because ChatGPT's web
// retrieval leans on the Bing index — a page Bing has not seen is a page ChatGPT
// cannot cite.
//
// Runs after the deploy step, so the URLs are live before they are announced.
// Soft by design: a failed notification must never fail a deploy.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { PRERENDER_ROUTES } from './route-manifest.js';

const HOST = 'forgealloyracing.com';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// The key must match the file name served at /<KEY>.txt, and that file's contents.
const KEY = 'fd5f637f1201a7c3fd01306154909252';
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

function targetUrls() {
  const explicit = process.argv.slice(2).filter((arg) => arg.startsWith('http'));
  if (explicit.length) return explicit;
  return PRERENDER_ROUTES.map((route) => `${ORIGIN}/${route ? `${route}/` : ''}`);
}

async function main() {
  // Guard against the key file and the key constant drifting apart.
  const keyFile = join('public', `${KEY}.txt`);
  if (!existsSync(keyFile)) {
    console.warn(`indexnow: skipped - key file ${keyFile} is missing`);
    return;
  }

  const urlList = targetUrls();
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  const meaning = {
    200: 'accepted',
    202: 'accepted, key pending validation',
    400: 'bad request',
    403: 'key file not reachable or contents do not match',
    422: 'URLs do not belong to this host, or are malformed',
    429: 'too many requests - retry later',
  };

  // IndexNow rejects the whole batch with 403 when the key file is not readable, and
  // the CDN can lag a few seconds behind the deploy, so confirm it is live first.
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const probe = await fetch(KEY_LOCATION, { cache: 'no-store' });
      const text = probe.ok ? (await probe.text()).trim() : '';
      if (probe.ok && text === KEY) break;
      if (attempt === 6) {
        console.warn(`indexnow: skipped - ${KEY_LOCATION} not serving the key yet (status ${probe.status})`);
        return;
      }
    } catch (error) {
      if (attempt === 6) {
        console.warn(`indexnow: skipped - could not reach ${KEY_LOCATION} (${error.message})`);
        return;
      }
    }
    await new Promise((done) => setTimeout(done, 10000));
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    console.log(`indexnow: ${urlList.length} URLs submitted -> ${response.status} ${meaning[response.status] || ''}`.trim());
  } else {
    console.warn(`indexnow: submission rejected -> ${response.status} ${meaning[response.status] || ''}`.trim());
  }
}

main().catch((error) => {
  console.warn(`indexnow: skipped - ${error.message}`);
});
