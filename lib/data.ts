export const company = {
  name: 'ForgeAlloy',
  slogan: 'Premium Custom Forged Wheels Manufacturer',
  description:
    'ForgeAlloy specializes in high-end forged wheel manufacturing for sports cars, luxury SUVs, off-road builds, and trucks. Available from 15 to 28 inch with full OEM & ODM customization support.',
  email: 'sales@forgealloy.com',
  phone: '+86 20-89235992',
  logo: '/forgealloy-logo.jpg',
};

export const wheels = [
  {
    id: 1,
    slug: 'yp01-monoblock-forged-wheel',
    series: 'YP Series',
    name: 'YP01',
    category: 'Single Piece Forged',
    sizes: ['19”', '20”', '21”', '22”'],
    finish: 'Gloss Black',
    vehicle: 'BMW M Series / Audi RS',
    boltPattern: ['5x112', '5x120'],
    offset: 'ET15 - ET45',
    description:
      'High-performance monoblock forged wheel designed for luxury sedans and sports cars.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'fw202-2piece-forged-wheel',
    series: 'FW Series',
    name: 'FW202',
    category: '2 Piece Forged',
    sizes: ['20”', '22”', '24”'],
    finish: 'Brushed Silver',
    vehicle: 'Mercedes AMG / Porsche',
    boltPattern: ['5x112', '5x130'],
    offset: 'Custom Offset',
    description:
      'Luxury 2-piece forged wheel with deep concave profile and custom lip options.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'YP20',
    category: 'Single Piece Forged',
    sizes: ['20”', '22”', '24”'],
    finish: 'Brushed Titanium',
    vehicle: 'Mercedes / Porsche',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'FW288',
    category: '2 Piece Forged',
    sizes: ['22”', '24”', '26”'],
    finish: 'Gold Brushed',
    vehicle: 'Lamborghini / McLaren',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'GTM-22',
    category: 'Off-Road Wheels',
    sizes: ['17”', '20”', '22”', '24”', '26”'],
    finish: 'Matte Black',
    vehicle: 'Ford Raptor / Jeep',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'MFX-77',
    category: 'Luxury SUV Forged',
    sizes: ['20”', '22”', '24”', '26”'],
    finish: 'Gloss Bronze',
    vehicle: 'Urus / G63',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop',
  },
];

export const categories = [
  'All',
  'YP Series',
  'FW Series',
  'Single Piece Forged',
  '2 Piece Forged',
  '3 Piece Forged',
  'Off-Road Wheels',
  'Truck Wheels',
];

export const finishes = [
  'Gloss Black',
  'Brushed Silver',
  'Gloss Bronze',
  'Chrome',
  'Machined Face',
  'Custom Color',
];
