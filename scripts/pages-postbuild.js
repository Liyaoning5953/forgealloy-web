// GitHub Pages post-build:
// 1. 404.html + .nojekyll so unknown paths still boot the SPA.
// 2. A static shell per route so real pages answer 200 instead of 404
//    (GitHub Pages has no rewrite rules; a directory index is the only way).
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { MODELS } from '../src/data/products.js';
import { SERIES } from '../src/data/series.js';
import { GUIDES } from '../src/data/guides.js';

const dist = 'dist';

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');

const shell = readFileSync(join(dist, 'index.html'));

const routes = [
  'products',
  'gallery',
  'oem-odm',
  'about-factory',
  'faq',
  'guides',
  'contact',
  'dealer-program',
  ...SERIES.map((s) => `series/${s.slug}`),
  ...GUIDES.map((g) => `guides/${g.slug}`),
  ...MODELS.map((m) => `products/${m.model.toLowerCase()}`),
];

for (const route of routes) {
  const target = join(dist, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, shell);
}

console.log(`pages-postbuild: 404.html + .nojekyll + ${routes.length} route shells`);
