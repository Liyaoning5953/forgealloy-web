import { CONTACT } from '../data/contact.js';
import { BRAND } from '../data/facts.js';

const ROWS = [
  { label: 'Email', value: CONTACT.email || 'Pending verification' },
  { label: 'WhatsApp', value: CONTACT.whatsapp ? CONTACT.whatsappDisplay : 'Pending verification' },
  { label: 'Factory', value: CONTACT.address || 'Pending verification' },
  { label: 'Business hours', value: CONTACT.hours || 'Pending verification' },
];

export default function ContactSidebar() {
  return (
    <aside className="contact-sidebar" data-component="contact-sidebar">
      <span className="eyebrow">Direct lines</span>
      <h3>Talk to {BRAND} sales</h3>
      <p>For urgent requests, use the direct channels. For everything else, the form works — every inquiry goes to the same team.</p>
      <div className="contact-rows">
        {ROWS.map((r) => (
          <div className="contact-row" key={r.label}>
            <span className="contact-row-label">{r.label}</span>
            <span className="contact-row-value">{r.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
