// Structured data helpers for the commercial pages.
//
// Everything emitted here restates what the page itself already says — service
// names, breadcrumb labels and descriptions are the on-page copy, so the markup
// never claims more than a visitor can read.
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

export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export { SITE };
