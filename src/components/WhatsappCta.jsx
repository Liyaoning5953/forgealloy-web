import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../data/contact.js';

// Floating WhatsApp button. Renders only when a number is configured.
export default function WhatsappCta() {
  if (!CONTACT.whatsapp) return null;
  return (
    <a
      className="whatsapp-cta"
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      data-component="whatsapp-cta"
    >
      <MessageCircle size={24} />
    </a>
  );
}
