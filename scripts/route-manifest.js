// Single source of truth for the site's static routes.
// Both the SEO shell writer (pages-postbuild.js) and the prerenderer (prerender.js)
// read from here, so the shell titles, the sitemap and the prerendered pages can
// never drift apart.
import { MODELS } from '../src/data/products.js';
import { SERIES } from '../src/data/series.js';
import { GUIDES } from '../src/data/guides.js';
import { ACCESSORIES } from '../src/data/accessories.js';
import { SIZE_PAGES, SIZE_RANGE_LABEL, SIZE_LIST_LABEL } from '../src/data/sizes.js';
import { trimMeta, fitTitle } from '../src/lib/schema.js';

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
  { route: 'wholesale', title: 'Wholesale Forged Wheels | Factory Direct — ForgeAlloy', description: 'Buy forged wheels wholesale direct from the factory: MOQ from 1, custom fitment, mixed-model orders, custom finishes and private-label programs.' },
  { route: 'private-label', title: 'Private Label Forged Wheels | Your Brand — ForgeAlloy', description: 'Private label forged wheel programs with your center caps, laser marking, packaging, model names and catalogue imagery.' },
  { route: 'fitment', title: 'Fitment Check — PCD, Offset & Center Bore | ForgeAlloy', description: 'Send your vehicle details and get size, width, offset, PCD, center bore and load target confirmed in writing before production.' },
  { route: 'forged-wheels-by-size', title: `Forged Wheels by Size | ${SIZE_RANGE_LABEL} Custom Rims — ForgeAlloy`, description: trimMeta(`Custom forged wheels by diameter: ${SIZE_LIST_LABEL} inch, built to your width, offset, PCD and centre bore.`) },
  ...SIZE_PAGES.map((page) => ({
    route: `forged-wheels-by-size/${page.slug}`,
    title: `${page.inch}-Inch Forged Wheels | Made to Your Fitment — ForgeAlloy`,
    description: `${page.inch}-inch custom forged wheels machined to your width, offset, PCD and centre bore. ${page.series.length} series available in ${page.inch} inch.`,
  })),
];

const seriesPages = SERIES.map((series) => ({
  route: `series/${series.slug}`,
  title: `${series.name} | ${series.code} — ForgeAlloy`,
  description: trimMeta(`${series.name} — ${series.blurb}`),
  image: series.image,
}));

const guidePages = GUIDES.map((guide) => ({
  route: `guides/${guide.slug}`,
  title: fitTitle(guide.title),
  description: trimMeta(guide.excerpt, 155),
  image: guide.cover,
}));

const accessoryPages = ACCESSORIES.map((item) => ({
  route: `accessories/${item.slug}`,
  title: fitTitle(`${item.name} — ${item.price} ${item.priceUnit}`),
  description: trimMeta(`${item.name}: ${item.summary}`, 155),
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

// Every route that ships real HTML gets prerendered — including the model pages.
//
// Model pages used to keep their shells only, to save build time. That left 1,269
// of the 1,310 sitemap URLs with no body copy in the HTML: GPTBot, PerplexityBot
// and ClaudeBot do not run JavaScript, so they saw an empty page for 96.9% of the
// site. prerender.js now soft-navigates the already-loaded app (pushState +
// popstate) instead of cold-loading every route, which brings the full 1,310-route
// run down to roughly the cost the old partial run paid.
export const PRERENDER_ROUTES = [
  '',
  ...staticPages.map((page) => page.route),
  ...seriesPages.map((page) => page.route),
  ...guidePages.map((page) => page.route),
  ...accessoryPages.map((page) => page.route),
  ...modelPages.map((page) => page.route),
];

export { seriesPages, guidePages, accessoryPages, modelPages };
