import { CONTACT } from '../data/contact.js';

// Single source for WhatsApp deep links. wa.me requires digits only (no +, spaces or dashes).
export const DEFAULT_WA_MESSAGE =
  'Hello ForgeAlloy, I would like a quote for custom forged wheels.';

export function whatsAppUrl(message) {
  if (!CONTACT.whatsapp) return null;
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message, context = {}) {
  const url = whatsAppUrl(message);
  if (!url) return null;
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
