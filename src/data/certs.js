// certs.js — certification data transcribed from factory certificate documents (2026-09).
// status: 'valid' = in force; 'renewal' = certificate on file but expiry passed, renewal in verification.
// Only documents whose scope and legal entity cover this factory's wheel manufacturing are listed.

export const CERTS = [
  {
    name: 'DOT / NHTSA — U.S. agent for service of process',
    shortName: 'DOT / NHTSA U.S. agent',
    issuer: 'U.S. Department of Transportation — National Highway Traffic Safety Administration',
    number: '49 CFR Part 551, Subpart D',
    scope: 'U.S. agent of record: UA International Inc., Colorado Springs, CO. Foreign manufacturers must designate a U.S. agent before placing products on the U.S. market.',
    issued: '2026-01-02',
    validUntil: null,
    status: 'valid',
    image: '/assets/certificates/nhtsa-us-agent-designation.jpg',
  },
  {
    name: 'VIA / JWTC accredited wheel test laboratory',
    shortName: 'VIA / JWTC test lab',
    issuer: 'Japan Light Alloy Automotive Wheel Testing Council (JWTC)',
    number: 'VIA A-355 · B-320 · C-400  |  VIA A-366 · A-367 · B-328 · B-329 · C-405 · C-406',
    scope: 'Dynamic cornering fatigue (CFT-3, CFT-5), dynamic radial fatigue (RFT-2A, RFT-5, RFT-7) and impact test equipment (ITM-4, ITM-5 at 13° / 30°). JWTC recognises test reports produced on this equipment.',
    issued: '2019-11-05 (re-approved 2023-12-04)',
    validUntil: '2033-12-03',
    status: 'valid',
    image: '/assets/certificates/jwtc-via-accreditation-2023.jpg',
  },
  {
    name: 'IATF 16949:2016 quality management system',
    shortName: 'IATF 16949 (renewal)',
    issuer: 'NSF-ISR (IATF certificate CNIATF052766)',
    number: 'IATF Certificate 0445007',
    scope: 'Manufacturing of aluminum alloy parts',
    issued: '2022-03-03',
    validUntil: '2025-02-26',
    status: 'renewal',
  },
];

// Structural test reports issued per part number on the accredited equipment.
// Transcribed from the factory test reports for MB797 (2026-09).
export const TEST_REPORTS = [
  {
    id: 'mb797-cornering-fatigue',
    title: 'Dynamic cornering fatigue test',
    model: 'MB797',
    spec: '19×9.5 · PCD 5×120 · offset 28 mm · design load 690 kg',
    standard: 'VIA',
    parameters: '100,000 cycles · bending moment 3.579 kN·m · nut torque 120 N·m · 1,439.4 r/min',
    result: 'Accepted — no visible cracks, no torque loss (deflection 1.30 mm → 1.36 mm)',
    image: '/assets/test-reports/mb797-cornering-fatigue.jpg',
  },
  {
    id: 'mb797-impact',
    title: 'Impact test',
    model: 'MB797',
    spec: '19×9.5 · PCD 5×120 · offset 28 mm · design load 690 kg',
    standard: 'VIA',
    parameters: '600 kg impact hammer · 230 mm drop height · striker overlap 25 mm · nut torque 120 N·m',
    result: 'Accepted — no fracture penetrating the centre member, no separation from the rim',
    image: '/assets/test-reports/mb797-impact.jpg',
  },
];

// Earlier certificates from the same factory. Kept visible as history with their
// expiry dates rather than presented as current.
export const EXPIRED_CERTS = [
  {
    name: 'ISO 9001:2015 quality management system',
    issuer: 'Beijing Sheng Hui Certification Service Co., Ltd. (SHQC)',
    number: 'Certificate 30318Q20305R0S',
    scope: 'Tyre steel wheel rims processing and service',
    validUntil: '2021-10-21',
  },
  {
    name: 'ISO/TS 16949:2009 quality management system',
    issuer: 'Intertek (IATF certificate 0225718)',
    number: 'Certificate M-2012-0196',
    scope: 'Design and manufacture of aluminium-alloy wheels',
    validUntil: '2018-09-14',
  },
];
