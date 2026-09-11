// images.js — central registry of user-provided image URLs (live site assets + factory photos).
export const HERO_BG = 'https://sc01.alicdn.com/kf/Af09b8da0393548558c1f3ce05d153f9fx.png';

// Real factory photos (user-provided, August 2026). One warehouse shot with a third-party
// brand sign (立中轮毂) was deliberately excluded from use.
export const FACTORY = {
  floor: 'https://sc02.alicdn.com/kf/Hf0f44c14204a461d85baf25e978b20df5.jpg', // wide production floor, CNC, forklift
  machining: 'https://sc02.alicdn.com/kf/H9124fbaa67dc4b9896e9058097738601w.jpg', // CNC machining rows
  warehouse: 'https://sc02.alicdn.com/kf/H266a6ffd78a340fb8f978338c43136cft.jpg', // warehouse racks, finished stock
  line: 'https://sc02.alicdn.com/kf/Hefa2c5fb6497499ba46c5d6158e04339V.jpg', // overhead conveyor production line
};

export const OEM_IMG = FACTORY.line;

// Series cover imagery — selected from the factory product library (2026-09-10).
export const IMG = {
  passenger: 'https://s.alicdn.com/@sc04/kf/H7e6877aa93744266b570709e1d6f7c58m/Duaxen-Forgealloy-19-20-Inch-5x112.jpg',
  race: 'https://s.alicdn.com/@sc04/kf/Hd8809eb29a7542a999c5066f3dc88f135/Duaxen-Forgealloy-Hot-1-Piece-Deep.jpg',
  'off-road-suv': 'https://s.alicdn.com/@sc04/kf/Hbd3328d095264c40aa346ac44a6ac260U/Duaxen-Forgealloy-Car-Wheels-Off-road.png',
  pickup: 'https://s.alicdn.com/@sc04/kf/He3851b4a80ff40a5aab24bd26bea68f3H/Duaxen-Forgealloy-Custom-Chrome-Beadlock-Forged.jpg',
};

// Editorial covers for the buyer guides (kept distinct from the series covers).
export const GUIDE_COVERS = {
  specs: 'https://s.alicdn.com/@sc04/kf/H86667c9e07804cd284bf4357cc07b91b0/Duaxen-Forgealloy-New-2-Piece-18.jpg',
  constructions: 'https://s.alicdn.com/@sc04/kf/Hccd0d77098fb49f78dd4b64e19fb4555d/Duaxen-Forgealloy-Forgealloy-Custom-Sport-Racing.jpg',
  supplier: 'https://s.alicdn.com/@sc04/kf/Hc56ebdb28c1d495b95e00bc23efb64abG/Duaxen-Forgealloy-2-Piece-Forged-Wheels.jpg',
  fitment: 'https://s.alicdn.com/@sc04/kf/H14b6127e3eaa4cd6aa76da0902b467331/Duaxen-Forgealloy-Car-Rims-2-Piece.jpg',
  shipping: 'https://s.alicdn.com/@sc04/kf/H0466d5f9038a4a11b185795bf3e79d21Q/Duaxen-Forgealloy-1-Piece-Forged-Wheel.jpg',
};
