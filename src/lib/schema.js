// Structured data helpers for the commercial pages.
//
// Everything emitted here restates what the page itself already says — service
// names, breadcrumb labels and descriptions are the on-page copy, so the markup
// never claims more than a visitor can read.
import { MOQ_FACT, LEAD_TIME_STD } from '../data/facts.js';

const SITE = 'https://forgealloyracing.com';

const ORGANIZATION = {
  '@type': 'Organization',
  name: 'Shandong Forgealloy Racing Tech Co., Ltd.',
  url: SITE,
};

export function breadcrumb(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function service({ name, description, serviceType, path }) {
  return {
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE}${path}`,
    provider: ORGANIZATION,
    areaServed: 'Worldwide',
  };
}

// Commercial terms restate facts.js (factory-confirmed, 2026-08). No price is
// emitted: every quote is made per fitment list and order volume, so a number
// here would be a claim the site itself never makes.
export function offer(path) {
  return {
    '@type': 'Offer',
    url: `${SITE}${path}`,
    availability: 'https://schema.org/InStock',
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: Number(MOQ_FACT) || 1, unitText: 'set' },
    seller: ORGANIZATION,
    description: `Built to order. MOQ ${MOQ_FACT} set; lead time ${LEAD_TIME_STD}.`,
  };
}

export function product({ name, description, path, material, image, sku, category }) {
  return {
    '@type': 'Product',
    name,
    description,
    url: `${SITE}${path}`,
    brand: { '@type': 'Brand', name: 'ForgeAlloy' },
    ...(sku ? { sku } : {}),
    ...(category ? { category } : {}),
    ...(image ? { image } : {}),
    ...(material ? { material } : {}),
    offers: offer(path),
  };
}

export function collection({ name, description, path }) {
  return {
    '@type': 'CollectionPage',
    name,
    ...(description ? { description } : {}),
    url: `${SITE}${path}`,
  };
}

export function contactPage({ name, description, path }) {
  return {
    '@type': 'ContactPage',
    name,
    description,
    url: `${SITE}${path}`,
    about: ORGANIZATION,
  };
}

// SERP titles are cut around 60 characters. When the brand suffix would push a
// title past that, the suffix is what gets dropped — never the topic.
export function fitTitle(text, brand = 'ForgeAlloy', max = 60) {
  const topic = String(text || '').trim();
  const suffix = ` | ${brand}`;
  return topic.length + suffix.length <= max ? topic + suffix : topic;
}

// Meta descriptions are truncated at a word boundary: SERP snippets cut around
// 155-160 characters, and a hard cut mid-word reads worse than a shorter line.
export function trimMeta(text, max = 155) {
  const value = String(text || '').trim();
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > max * 0.6 ? cut.slice(0, boundary) : cut).replace(/[,;:.\s]+$/, '')}…`;
}

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export { SITE };
