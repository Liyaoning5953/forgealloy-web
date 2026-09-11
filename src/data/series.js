// series.js — 4 vehicle-application groups (factory taxonomy, 2026-09).
// Size ranges are factory-confirmed. Card images come from the product library.
export const SERIES = [
  {
    slug: 'passenger',
    code: 'PASSENGER SERIES',
    name: 'Passenger Wheels',
    tagline: 'Street performance',
    sizeRange: '17"–26"',
    blurb: 'Forged wheels for luxury and performance cars — monoblock, two-piece and three-piece construction, custom fitment and finishes.',
    image: 'https://s.alicdn.com/@sc04/kf/H7e6877aa93744266b570709e1d6f7c58m/Duaxen-Forgealloy-19-20-Inch-5x112.jpg',
  },
  {
    slug: 'race',
    code: 'RACE SERIES',
    name: 'Race Wheels',
    tagline: 'Built for the track',
    sizeRange: '17"–26"',
    blurb: 'Lightweight forged wheels engineered for racing — weight and stiffness first, built to hold alignment under load.',
    image: 'https://s.alicdn.com/@sc04/kf/Hd8809eb29a7542a999c5066f3dc88f135/Duaxen-Forgealloy-Hot-1-Piece-Deep.jpg',
  },
  {
    slug: 'off-road-suv',
    code: 'OFF-ROAD / SUV SERIES',
    name: 'Off-Road & SUV',
    tagline: 'Built for the rough',
    sizeRange: '15"–26"',
    blurb: 'Forged off-road and SUV wheels designed for the loads and impacts of serious trail and desert use.',
    image: 'https://s.alicdn.com/@sc04/kf/Hbd3328d095264c40aa346ac44a6ac260U/Duaxen-Forgealloy-Car-Wheels-Off-road.png',
  },
  {
    slug: 'pickup',
    code: 'PICKUP SERIES',
    name: 'Pickup Wheels',
    tagline: 'Made to haul, built to last',
    sizeRange: '20"–30"',
    blurb: 'Heavy-duty forged pickup wheels for HD trucks, towing and commercial loads.',
    image: 'https://s.alicdn.com/@sc04/kf/He3851b4a80ff40a5aab24bd26bea68f3H/Duaxen-Forgealloy-Custom-Chrome-Beadlock-Forged.jpg',
  },
];

export const getSeries = (slug) => SERIES.find((s) => s.slug === slug);
