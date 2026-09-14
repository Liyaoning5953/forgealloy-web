import { CONTACT } from '../data/contact.js';
import { BRAND } from '../data/facts.js';
import { trackEvent } from '../lib/analytics.js';

const ROWS = [
  { label: 'Email', value: CONTACT.email || 'Pending verification', href: CONTACT.email ? `mailto:${CONTACT.email}` : null, event: 'email_click' },
  { label: 'WhatsApp', value: CONTACT.whatsapp ? CONTACT.whatsappDisplay : 'Pending verification', href: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : null, event: 'whatsapp_click' },
  { label: 'Factory', value: CONTACT.address || 'Pending verification' },
  { label: 'Business hours', value: CONTACT.hours || 'Pending verification' },
];

export default function ContactSidebar() {
  return (
    <aside className="contact-sidebar" data-component="contact-sidebar">
      <span className="eyebrow">Direct lines</span>
      <h3>Talk to {BRAND} sales</h3>
      <p>Complete the quote form to prepare a WhatsApp message with your specifications, then tap Send in WhatsApp to deliver it to our sales team.</p>
      <div className="contact-rows">
        {ROWS.map((r) => (
          <div className="contact-row" key={r.label}>
            <span className="contact-row-label">{r.label}</span>
             {r.href ? (
               <a className="contact-row-value" href={r.href} target={r.event === 'whatsapp_click' ? '_blank' : undefined} rel={r.event === 'whatsapp_click' ? 'noreferrer' : undefined} onClick={() => trackEvent(r.event, { link_location: 'contact_sidebar', page_path: window.location.pathname })}>{r.value}</a>
             ) : <span className="contact-row-value">{r.value}</span>}
          </div>
        ))}
      </div>
    </aside>
  );
}
