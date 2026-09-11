// facts.js — single source for verifiable claims + PENDING markers.
// Verify with the factory before shipping any number that is not listed here.

export const BRAND = 'ForgeAlloy';
export const LEGAL_NAME = 'Shandong Forgealloy Racing Tech Co., Ltd.';

// Verified facts (from the live site + company files). Do not edit unless the factory confirms.
export const VERIFIED_FACTS = [
  { value: '4', label: 'Series' },
  { value: '500+', label: 'Wheel designs' },
  { value: '6061-T6', label: 'Forged aluminum' },
  { value: 'OEM / ODM', label: 'Export programs' },
];

export const PENDING = 'PENDING VERIFICATION';
export const ON_REQUEST = 'On request';

export const SERIES_COUNT = 4;
export const MODELS_COUNT = 0;

// Verified commercial terms (factory-confirmed, 2026-08).
export const MOQ_FACT = '1';
export const LEAD_TIME_STD = '15–20 days after design approval';
export const LEAD_TIME_LARGE = '45–60 days (large-size or multi-piece forged)';

export const ORDER_FACTS = [
  { value: MOQ_FACT, label: 'Minimum order quantity' },
  { value: '15–20 days', label: 'Lead time after design approval' },
  { value: '45–60 days', label: 'Large-size / multi-piece forged' },
  { value: '15"–30"', label: 'Size range' },
];

// Why-ForgeAlloy advantages — sourced from factory materials & storefront evidence (2026-08).
export const ADVANTAGES = [
  { n: '01', title: '15,000-ton press forging', copy: 'High-pressure forging of 6061 blanks for dense, grain-aligned strength in every wheel.' },
  { n: '02', title: 'VIA-accredited testing', copy: 'JWTC-accredited dynamic cornering fatigue, radial fatigue and impact test equipment (13° / 30°).' },
  { n: '03', title: 'MOQ from 1', copy: 'Start with a single wheel or set — validate fitment and finish before scaling.' },
  { n: '04', title: 'Fast lead times', copy: '15–20 days after design approval; 45–60 days for large-size or multi-piece builds.' },
  { n: '05', title: 'OEM / ODM & private label', copy: 'Custom design, finishes, center caps, laser marking and export packaging under your brand.' },
  { n: '06', title: 'Buyer-verified service', copy: '26 reviews on our Alibaba storefront — supplier service rated 5 stars by buyers.' },
];

// Generic forging process — industry-standard steps, no invented claims.
export const PROCESS_STEPS = [
  { n: '01', title: 'Design', copy: 'Fitment data, load targets and finish direction locked before material is cut.' },
  { n: '02', title: 'Forging', copy: '6061 billet formed under high pressure into a dense, grain-aligned blank.' },
  { n: '03', title: 'Heat treat (T6)', copy: 'Solution and aging heat treatment to restore strength after forming.' },
  { n: '04', title: 'CNC machining', copy: 'Barrel, face, bolt pattern and pad machined to print tolerances.' },
  { n: '05', title: 'Surface', copy: 'Base, paint, powder or brushed finish applied and cured.' },
  { n: '06', title: 'QC & test', copy: 'Dimension, balance and load checks before packing for export.' },
];

export const OEM_CAPABILITIES = [
  { title: 'Custom design & engineering', copy: 'Work from your drawing, a reference model, or a target vehicle fitment. PCD, offset, center bore and load rating defined up front.' },
  { title: 'Sample development', copy: 'Sample wheels produced and approved before production. Sample lead time on request.' },
  { title: 'Finish library', copy: 'Matte, gloss, brushed, gunmetal, bronze, custom RAL and multi-stage finishes. Confirm current finish menu with sales.' },
  { title: 'Private label / branding', copy: 'Cap, center cap, laser marking and packaging can carry your brand.' },
  { title: 'Export packaging', copy: 'Individually boxed wheels with export-grade packing for sea or air freight.' },
  { title: 'QC documentation', copy: 'Inspection records available per order. Certification scope pending verification.' },
];

export const DEALER_BENEFITS = [
  { n: '01', title: 'Factory pricing', copy: 'Direct from the forge — no trading-company layer between you and production.' },
  { n: '02', title: 'Program pricing tiers', copy: 'Tiered pricing by annual volume. Program terms on request.' },
  { n: '03', title: 'Priority lead times', copy: 'Dealer orders scheduled ahead of standard queue. Current lead times on request.' },
  { n: '04', title: 'Marketing support', copy: 'Product imagery and spec sheets to support your listings and showroom.' },
  { n: '05', title: 'Custom programs', copy: 'Exclusive finishes or model configurations for your market.' },
];
