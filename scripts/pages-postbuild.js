// GitHub Pages SPA fallback: Pages serves 404.html for unknown paths, so the
// client router can take over deep links like /products/p-001.
import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
writeFileSync(join(dist, '.nojekyll'), '');
console.log('pages-postbuild: wrote dist/404.html and dist/.nojekyll');
