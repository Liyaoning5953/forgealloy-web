// GitHub Pages post-build: route-specific SEO shells, sitemap and safe 404 handling.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { MODELS } from '../src/data/products.js';
import { SERIES } from '../src/data/series.js';
import { GUIDES } from '../src/data/guides.js';

const dist = 'dist';
const origin = 'https://forgealloyracing.com';
const baseShell = readFileSync(join(dist, 'index.html'), 'utf8');

const staticPages = [
  { route: 'products', title: 'Custom Forged Wheels Catalog | ForgeAlloy', description: 'Browse ForgeAlloy passenger, race, off-road, pickup and wire wheel models. Custom size, PCD, offset, finish and private-label programs.' },
  { route: 'gallery', title: 'Custom Wheel Gallery | ForgeAlloy', description: 'Explore ForgeAlloy custom forged wheel designs for passenger, race, off-road, SUV and pickup applications.' },
  { route: 'oem-odm', title: 'OEM & ODM Forged Wheel Programs | ForgeAlloy', description: 'Custom forged wheel engineering, samples, finishes, private labels, packaging and export support for brands, wholesalers and dealers.' },
  { route: 'about-factory', title: 'Forged Wheel Factory in Shandong, China | ForgeAlloy', description: 'See ForgeAlloy factory capabilities, process, quality records and current certification status.' },
  { route: 'faq', title: 'Forged Wheel Buying FAQ | ForgeAlloy', description: 'Answers about custom forged wheel fitment, MOQ, samples, lead times, finishes, testing and shipping.' },
  { route: 'guides', title: 'Forged Wheel Buyer Guides | ForgeAlloy', description: 'Technical and sourcing guides for forged wheel specifications, fitment, construction, supplier checks and shipping.' },
  { route: 'contact', title: 'Request a Forged Wheel Quote | ForgeAlloy', description: 'Request pricing and lead time for custom forged wheels. Send your target series, size, fitment, finish, quantity and destination.' },
  { route: 'dealer-program', title: 'Forged Wheel Dealer Program | ForgeAlloy', description: 'Factory-direct forged wheel support for dealers, distributors, workshops, racing teams and private-label programs.' },
];

const routePages = [
  ...staticPages,
  ...SERIES.map((series) => ({
    route: `series/${series.slug}`,
    title: `${series.name} | ${series.code} — ForgeAlloy`,
    description: `${series.name} — ${series.blurb}`,
    image: series.image,
  })),
  ...GUIDES.map((guide) => ({
    route: `guides/${guide.slug}`,
    title: `${guide.title} | ForgeAlloy`,
    description: guide.excerpt,
    image: guide.cover,
  })),
  ...MODELS.map((model) => {
    const series = SERIES.find((item) => item.slug === model.series);
    const noun = series?.wheelType?.noun || 'wheel';
    return {
      route: `products/${model.model.toLowerCase()}`,
      title: `${model.model} ${model.kind} ${series?.wheelType?.title || 'Wheel'} | ForgeAlloy`,
      description: `${model.model} — ${model.kind} ${noun} in the ${series?.name || 'ForgeAlloy'} series. Custom size, width, offset, PCD, center bore and finish.`,
      image: model.image,
    };
  }),
];

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
  priority: page.route.startsWith('products/') ? '0.5' : page.route.startsWith('guides/') ? '0.6' : '0.8',
}))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map(({ route, priority }) => `  <url><loc>${origin}${route ? `/${route}/` : '/'}</loc><priority>${priority}</priority></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(`pages-postbuild: ${routePages.length} SEO route shells + sitemap + 404 + /about redirect`);
