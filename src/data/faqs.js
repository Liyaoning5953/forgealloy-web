// faqs.js — FAQ groups for /faq. Answers stay factual; unverified numbers say "on request".
export const FAQ_GROUPS = [
  {
    group: 'Ordering',
    items: [
      { q: 'What is your minimum order quantity (MOQ)?', a: 'Our MOQ is 1 — you can start with a single wheel or a single set to validate fitment and finish before scaling.' },
      { q: 'Do you sell single wheels or only sets?', a: 'We sell from a single wheel up. Sets and container programs are quoted the same way — confirm your configuration with sales.' },
      { q: 'Can I order mixed models in one container?', a: 'Yes, mixed-model containers are common. Confirm the mix with sales so packaging and lead times are quoted correctly.' },
    ],
  },
  {
    group: 'MOQ & lead time',
    items: [
      { q: 'What is the typical lead time?', a: 'Standard configurations: 15–20 days after design mockup approval. Large-size or multi-piece forged wheels: 45–60 days. The clock starts once the design/effect image is confirmed.' },
      { q: 'Does lead time include design time?', a: 'No. The countdown starts after you approve the design effect image. Custom design work before that is quoted separately on request.' },
      { q: 'Can you do small trial orders before a container?', a: 'Yes — MOQ is 1, so a trial order of a single wheel or set is a normal way to validate fitment and finish before committing to volume.' },
    ],
  },
  {
    group: 'Shipping & payment',
    items: [
      { q: 'Which incoterms do you support?', a: 'FOB, CIF and DDP are common. We confirm terms per order and provide freight options for your destination port.' },
      { q: 'How are wheels packaged for export?', a: 'Individually boxed wheels with export-grade packing for sea or air freight. Custom packaging is available for dealer programs.' },
      { q: 'What payment methods do you accept?', a: 'Standard B2B terms apply — confirm the payment schedule with sales for your order size.' },
    ],
  },
  {
    group: 'OEM & custom',
    items: [
      { q: 'Can you produce wheels from my drawing or target vehicle?', a: 'Yes. OEM/ODM projects start from your drawing, a reference model, or a target fitment. PCD, offset, center bore and load rating are locked before tooling.' },
      { q: 'What finishes are available?', a: 'Matte, gloss, brushed, gunmetal, bronze and custom RAL finishes are common. Confirm the current finish menu with sales.' },
      { q: 'Can you apply my brand or logo?', a: 'Yes — center caps, laser marking and packaging can carry your brand under a private-label program.' },
    ],
  },
  {
    group: 'Fitment',
    items: [
      { q: 'What bolt patterns do you cover?', a: 'Common PCDs such as 5x112, 5x114.3, 5x120 and 6x139.7 are regularly produced. Send your vehicle or PCD and we confirm feasibility.' },
      { q: 'Do you confirm fitment before production?', a: 'Yes. Size, offset, PCD and center bore are confirmed against your vehicle data before a quote is finalized — a wrong PCD is a safety issue, not a fitment inconvenience.' },
      { q: 'What sizes can you make?', a: 'From 15" up to 30". Confirm your target size, width and offset with sales before quoting.' },
    ],
  },
];
