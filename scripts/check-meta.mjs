// Fail loudly when a route's title or description falls outside what a SERP
// will show. The shell copy in route-manifest.js is what crawlers actually get,
// so this runs against the manifest rather than the React pages.
//
//   npm run check:meta
import { routePages } from './route-manifest.js';

const TITLE_MAX = 60;
const DESC_MAX = 160;

const longTitles = routePages.filter((page) => page.title.length > TITLE_MAX);
const longDescs = routePages.filter((page) => (page.description || '').length > DESC_MAX);

console.log(`checked ${routePages.length} routes`);
for (const page of longTitles) {
  console.log(`  title ${page.title.length}  /${page.route}  ${page.title}`);
}
for (const page of longDescs) {
  console.log(`  desc  ${(page.description || '').length}  /${page.route}  ${(page.description || '').slice(0, 90)}`);
}

if (longTitles.length || longDescs.length) {
  console.error(`\n${longTitles.length} titles over ${TITLE_MAX} chars, ${longDescs.length} descriptions over ${DESC_MAX} chars`);
  process.exit(1);
}
console.log('all titles and descriptions within SERP limits');
