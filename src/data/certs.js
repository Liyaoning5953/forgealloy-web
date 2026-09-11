// certs.js — verified certification data (from factory certificate images, 2026-08).
// status: 'valid' = shown as current; 'renewal' = certificate exists but expiry shown on file
// is past — renewal copy in verification before it is claimed as current.
export const CERTS = [
  {
    name: 'JWTC / VIA test equipment accreditation',
    issuer: 'Japan Light Alloy Automotive Wheel Testing Council (JWTC)',
    number: 'VIA A-366 · A-367 · B-328 · B-329 · C-405 · C-406',
    scope: 'Dynamic cornering fatigue, dynamic radial fatigue and impact test equipment (13° / 30°)',
    issued: '2023-12-04',
    validUntil: '2033-12-03',
    status: 'valid',
  },
  {
    name: 'NHTSA U.S. agent designation',
    issuer: 'U.S. Department of Transportation — National Highway Traffic Safety Administration',
    number: '49 CFR Part 551, Subpart D',
    scope: 'Designation of U.S. agent for service of process (UA International Inc., Colorado Springs, CO)',
    issued: '2026-01-02',
    validUntil: null,
    status: 'valid',
  },
  {
    name: 'IATF 16949:2016 quality management system',
    issuer: 'NSF-ISR (IATF certificate CNIATF052766)',
    number: 'IATF Certificate 0445007',
    scope: 'Manufacturing of aluminum alloy parts',
    issued: '2022-03-03',
    validUntil: '2025-02-26',
    status: 'renewal',
  },
];
