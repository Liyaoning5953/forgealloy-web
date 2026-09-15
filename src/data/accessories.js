// accessories.js — non-wheel products sold alongside the wheel lines.
// Specs are taken from the supplier's dimension drawing; anything not stated
// there is marked "On request" rather than guessed.
export const ACCESSORIES = [
  {
    slug: 'electric-hydraulic-jack-12v',
    sku: 'A-001',
    name: '12V Electric Hydraulic Jack Kit',
    category: 'Car repair tools',
    tagline: 'Button-press lifting, no manual scissor jack',
    price: 'US$20',
    priceUnit: 'per set',
    moq: '1 set',
    image: 'https://sc02.alicdn.com/kf/H6eb3f2be8533498d84438615404630a0l.jpg',
    summary:
      'A 12V DC electric hydraulic jack supplied as a complete set — jack, matching 12V impact wrench and a hard carry case. It lifts to 45 cm and replaces the manual scissor jack, so a wheel can be changed without a breaker bar.',
    highlights: [
      { title: '12V DC electric drive', copy: 'Push-button lifting instead of a manual scissor jack — one person can raise the vehicle.' },
      { title: 'Lifts to 45 cm', copy: 'Tall enough for passenger car and SUV wheel heights, with a 32 × 15.5 × 15 cm body that stores in the boot.' },
      { title: 'Complete set', copy: 'Ships as a kit: electric jack, matching 12V impact wrench and a hard carry case.' },
      { title: 'Add-on pricing', copy: 'US$20 per set when ordered with a wheel order — one set covers one vehicle.' },
    ],
    specs: [
      { label: 'Drive', value: '12V DC electric hydraulic' },
      { label: 'Max lifting height', value: '45 cm' },
      { label: 'Body size (L × W × H)', value: '32 × 15.5 × 15 cm' },
      { label: 'Load capacity', value: 'On request' },
      { label: 'Colour', value: 'Orange / black' },
      { label: 'Set contents', value: 'Jack, 12V impact wrench, hard carry case' },
    ],
  },
];

export const getAccessory = (slug) => ACCESSORIES.find((a) => a.slug === slug);
