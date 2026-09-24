import { SERIES } from './series.js';

// Diameter pages. Which series can be built in a given diameter is derived from the
// factory size ranges in series.js, so the lists can never drift from the series data.
const SIZES = [
  {
    inch: 19,
    applications: 'Sports sedans, performance coupes and staggered street or track setups.',
  },
  {
    inch: 20,
    applications: 'Sports sedans, crossovers, SUVs and street-driven pickups.',
  },
  {
    inch: 21,
    applications: 'Large SUVs, performance sedans and show builds that need sidewall.',
  },
  {
    inch: 22,
    applications: 'Full-size SUVs, pickups and show builds running a low-profile tyre.',
  },
];

function parseRange(sizeRange) {
  const match = sizeRange.match(/(\d+)"?\s*[–-]\s*(\d+)"/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2])];
}

export const SIZE_PAGES = SIZES.map((size) => {
  const series = SERIES.filter((s) => {
    const range = parseRange(s.sizeRange);
    return range && size.inch >= range[0] && size.inch <= range[1];
  });
  return {
    ...size,
    slug: `${size.inch}-inch`,
    label: `${size.inch}"`,
    series,
  };
});

export function getSizePage(slug) {
  return SIZE_PAGES.find((page) => page.slug === slug) || null;
}

// Every parameter a buyer has to fix before a forged set can be quoted.
export const SIZE_SPEC_LIST = [
  'Diameter and width (e.g. 19×9.5 front, 19×10.5 rear)',
  'Offset or ET, and whether the setup is square or staggered',
  'PCD and centre bore, or the vehicle list you are covering',
  'Load target per wheel for the heaviest vehicle in the range',
  'Finish and colour reference',
  'Quantity for the first order, and the market you sell into',
];
