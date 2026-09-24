// Single source of truth for the site's static routes.
// Both the SEO shell writer (pages-postbuild.js) and the prerenderer (prerender.js)
// read from here, so the shell titles, the sitemap and the prerendered pages can
// never drift apart.
import { MODELS } from '../src/data/products.js';
import { SERIES } from '../src/data/series.js';
import { GUIDES } from '../src/data/guides.js';
import { ACCESSORIES } from '../src/data/accessories.js';
import { SIZE_PAGES } from '../src/data/sizes.js';

export const staticPages = [
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

const seriesPages = SERIES.map((series) => ({
  route: `series/${series.slug}`,
  title: `${series.name} | ${series.code} — ForgeAlloy`,
  description: `${series.name} — ${series.blurb}`,
  image: series.image,
}));

const guidePages = GUIDES.map((guide) => ({
  route: `guides/${guide.slug}`,
  title: `${guide.title} | ForgeAlloy`,
  description: guide.excerpt,
  image: guide.cover,
}));

const accessoryPages = ACCESSORIES.map((item) => ({
  route: `accessories/${item.slug}`,
  title: `${item.name} — ${item.price} ${item.priceUnit} | ForgeAlloy`,
  description: `${item.name}: ${item.summary}`,
  image: item.image,
}));

const modelPages = MODELS.map((model) => {
  const series = SERIES.find((item) => item.slug === model.series);
  const noun = series?.wheelType?.noun || 'wheel';
  return {
    route: `products/${model.model.toLowerCase()}`,
    title: `${model.model} ${model.kind} ${series?.wheelType?.title || 'Wheel'} | ForgeAlloy`,
    description: `${model.model} — ${model.kind} ${noun} in the ${series?.name || 'ForgeAlloy'} series. Custom size, width, offset, PCD, center bore and finish.`,
    image: model.image,
  };
});

// Every route gets a SEO shell and a sitemap entry.
export const routePages = [
  ...staticPages,
  ...seriesPages,
  ...guidePages,
  ...accessoryPages,
  ...modelPages,
];

// The pages worth paying prerender time for: commercial landing pages, the size
// hub, guides and series pages. The 1268 model pages keep their shells only —
// prerendering all of them would add minutes to every build for little gain.
export const PRERENDER_ROUTES = [
  '',
  ...staticPages.map((page) => page.route),
  ...seriesPages.map((page) => page.route),
  ...guidePages.map((page) => page.route),
  ...accessoryPages.map((page) => page.route),
];

export { seriesPages, guidePages, accessoryPages, modelPages };
