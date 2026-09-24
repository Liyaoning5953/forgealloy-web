// GitHub Pages post-build: route-specific SEO shells, sitemap and safe 404 handling.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { MODELS } from '../src/data/products.js';
import { SERIES } from '../src/data/series.js';
import { GUIDES } from '../src/data/guides.js';
import { ACCESSORIES } from '../src/data/accessories.js';
import { SIZE_PAGES } from '../src/data/sizes.js';

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
  { route: 'accessories', title: 'Workshop Accessories — Wheel & Tyre Tools | ForgeAlloy', description: 'Workshop tools that ship with our wheels — starting with a 12V electric hydraulic jack kit at US$20 per set, priced for dealers and tyre shops.' },
  { route: 'contact', title: 'Request a Forged Wheel Quote | ForgeAlloy', description: 'Request pricing and lead time for custom forged wheels. Send your target series, size, fitment, finish, quantity and destination.' },
  { route: 'dealer-program', title: 'Forged Wheel Dealer Program | ForgeAlloy', description: 'Factory-direct forged wheel support for dealers, distributors, workshops, racing teams and private-label programs.' },
  { route: 'wholesale', title: 'Wholesale Forged Wheels | Factory Direct Pricing — ForgeAlloy', description: 'Buy forged wheels wholesale direct from the factory: MOQ from 1, custom fitment, mixed-model orders, custom finishes and private-label programs.' },
  { route: 'private-label', title: 'Private Label Forged Wheels | Your Brand on the Forge — ForgeAlloy', description: 'Private label forged wheel programs with your center caps, laser marking, packaging, model names and catalogue imagery.' },
  { route: 'fitment', title: 'Wheel Fitment Check — PCD, Offset & Center Bore | ForgeAlloy', description: 'Send your vehicle details and get size, width, offset, PCD, center bore and load target confirmed in writing before production.' },
  { route: 'forged-wheels-by-size', title: 'Forged Wheels by Size | 17–30 inch Custom Forged Rims — ForgeAlloy', description: 'Custom forged wheels by diameter: 19, 20, 21 and 22 inch programs built to your width, offset, PCD and centre bore. Factory direct, MOQ from 1.' },
  ...SIZE_PAGES.map((page) => ({
    route: `forged-wheels-by-size/${page.slug}`,
    title: `${page.inch}-Inch Forged Wheels | Custom Made to Your Fitment — ForgeAlloy`,
    description: `${page.inch}-inch custom forged wheels machined to your width, offset, PCD and centre bore. ${page.series.length} series available in ${page.inch} inch.`,
  })),
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
  ...ACCESSORIES.map((item) => ({
    route: `accessories/${item.slug}`,
    title: `${item.name} — ${item.price} ${item.priceUnit} | ForgeAlloy`,
    description: `${item.name}: ${item.summary}`,
    image: item.image,
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
  priority: page.route.startsWith('products/') ? '0.5' : page.route.startsWith('guides/') ? '0.6' : page.route.startsWith('accessories/') ? '0.7' : '0.8',
}))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPages.map(({ route, priority }) => `  <url><loc>${origin}${route ? `/${route}/` : '/'}</loc><priority>${priority}</priority></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);

console.log(`pages-postbuild: ${routePages.length} SEO route shells + sitemap + 404 + /about redirect`);
