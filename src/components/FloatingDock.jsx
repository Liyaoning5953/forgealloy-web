import { MessageCircle, Mail, FileText } from 'lucide-react';
import { CONTACT } from '../data/contact.js';
import { trackEvent } from '../lib/analytics.js';

// Right-edge floating dock: WhatsApp / Email / Catalog. All links verified.
export default function FloatingDock() {
  return (
    <div className="floating-dock" data-component="floating-dock">
      <a
        className="dock-btn dock-whatsapp"
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackEvent('whatsapp_click', { link_location: 'floating_dock', page_path: window.location.pathname })}
      >
        <MessageCircle size={22} />
      </a>
      <a className="dock-btn dock-mail" href={`mailto:${CONTACT.email}`} aria-label="Email us" onClick={() => trackEvent('email_click', { link_location: 'floating_dock', page_path: window.location.pathname })}>
        <Mail size={22} />
      </a>
      <a className="dock-btn dock-catalog" href="/products#catalog" aria-label="Product catalog" onClick={() => trackEvent('catalog_nav_click', { link_location: 'floating_dock', page_path: window.location.pathname })}>
        <FileText size={22} />
      </a>
    </div>
  );
}
