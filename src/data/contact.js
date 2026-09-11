// contact.js — single source for contact channels (factory-confirmed, 2026-08).
export const CONTACT = {
  email: 'forgealloyracing@163.com',
  whatsapp: '8617860625953', // +86 178 6062 5953
  whatsappDisplay: '+86 178 6062 5953',
  address: '901, 9th Floor, Building 1, Hualong Golden Tower, Greenland, Jinan High-Tech Zone, Jinan, Shandong 250000, China',
  hours: null,           // business hours — PENDING
  salesReplyHours: null, // e.g. '24' — PENDING
};

export const hasWhatsApp = Boolean(CONTACT.whatsapp);
