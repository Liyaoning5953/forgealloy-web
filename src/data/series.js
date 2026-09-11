// series.js — 5 product groups (factory taxonomy, 2026-09).
// Size ranges are factory-confirmed. Card images come from the product library.
// wheelType drives construction-accurate copy (wire wheels are not a forged product).
const FORGED_TYPE = {
  noun: 'forged wheel',
  title: 'Forged Wheel',
  material: '6061-T6',
  materialLong: '6061-T6 aluminum',
};

const WIRE_TYPE = {
  noun: 'wire-spoke wheel',
  title: 'Wire-Spoke Wheel',
  material: null,
  materialLong: null,
};

export const SERIES = [
  {
    slug: 'passenger',
    code: 'PASSENGER SERIES',
    name: 'Passenger Wheels',
    tagline: 'Street performance',
    sizeRange: '17"–26"',
    blurb: 'Forged wheels for luxury and performance cars — monoblock, two-piece and three-piece construction, custom fitment and finishes.',
    image: 'https://s.alicdn.com/@sc04/kf/H7e6877aa93744266b570709e1d6f7c58m/Duaxen-Forgealloy-19-20-Inch-5x112.jpg',
    wheelType: FORGED_TYPE,
  },
  {
    slug: 'race',
    code: 'RACE SERIES',
    name: 'Race Wheels',
    tagline: 'Built for the track',
    sizeRange: '17"–26"',
    blurb: 'Lightweight forged wheels engineered for racing — weight and stiffness first, built to hold alignment under load.',
    image: 'https://s.alicdn.com/@sc04/kf/Hd8809eb29a7542a999c5066f3dc88f135/Duaxen-Forgealloy-Hot-1-Piece-Deep.jpg',
    wheelType: FORGED_TYPE,
  },
  {
    slug: 'off-road-suv',
    code: 'OFF-ROAD / SUV SERIES',
    name: 'Off-Road & SUV',
    tagline: 'Built for the rough',
    sizeRange: '15"–26"',
    blurb: 'Forged off-road and SUV wheels designed for the loads and impacts of serious trail and desert use.',
    image: 'https://s.alicdn.com/@sc04/kf/Hbd3328d095264c40aa346ac44a6ac260U/Duaxen-Forgealloy-Car-Wheels-Off-road.png',
    wheelType: FORGED_TYPE,
  },
  {
    slug: 'pickup',
    code: 'PICKUP SERIES',
    name: 'Pickup Wheels',
    tagline: 'Made to haul, built to last',
    sizeRange: '20"–30"',
    blurb: 'Heavy-duty forged pickup wheels for HD trucks, towing and commercial loads.',
    image: 'https://s.alicdn.com/@sc04/kf/He3851b4a80ff40a5aab24bd26bea68f3H/Duaxen-Forgealloy-Custom-Chrome-Beadlock-Forged.jpg',
    wheelType: FORGED_TYPE,
  },
  {
    slug: 'wire',
    code: 'WIRE SERIES',
    name: 'Wire Wheels',
    tagline: 'Classic lace, built to your spec',
    sizeRange: '13"–26"',
    blurb: 'High-count wire-spoke wheels — straight-laced or cross-laced patterns, deep-dish and reverse-lip profiles, in chrome, gold, bronze and custom finishes.',
    image: 'https://sc02.alicdn.com/kf/Hb6317532233e4b1ba8f6bce99a5622e79.jpg',
    wheelType: WIRE_TYPE,
  },
];

export const getSeries = (slug) => SERIES.find((s) => s.slug === slug);
