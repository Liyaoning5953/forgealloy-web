import { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { CONTACT, hasWhatsApp } from '../data/contact.js';
import { BRAND } from '../data/facts.js';
import { whatsAppUrl, DEFAULT_WA_MESSAGE } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

const TOPICS = [
  {
    id: 'wheels',
    label: 'Custom forged wheels',
    message: 'Hello ForgeAlloy, I would like a quote for custom forged wheels. Sizes and quantity to follow.',
  },
  {
    id: 'oem',
    label: 'OEM / ODM program',
    message: 'Hello ForgeAlloy, I am interested in an OEM / ODM or private-label wheel program. Please tell me what you need from me.',
  },
  {
    id: 'dealer',
    label: 'Dealer / wholesale pricing',
    message: 'Hello ForgeAlloy, I am a dealer / distributor and would like wholesale program terms and factory pricing.',
  },
  {
    id: 'fitment',
    label: 'Fitment check',
    message: 'Hello ForgeAlloy, I need a fitment check for my vehicle. I will send my vehicle model and current wheel specs.',
  },
  {
    id: 'wire',
    label: 'Wire wheels',
    message: 'Hello ForgeAlloy, I am interested in wire-spoke wheels. Please send available patterns, sizes and pricing.',
  },
];

const DEFAULTS = {
  eyebrow: 'Direct contact',
  title: 'Message us on WhatsApp',
  lead: 'One tap opens a WhatsApp chat with our sales team — no form to fill in, no waiting for an email.',
  intro: 'Tell us what you are looking for in the chat and we reply with pricing, lead time and next steps.',
};

// Zero-friction contact block: a single tap starts a WhatsApp conversation with context prefilled.
export default function DirectContact({ context, eyebrow, title, lead, intro, topics = TOPICS }) {
  const [selected, setSelected] = useState(context ? '' : topics[0].id);
  const topic = topics.find((t) => t.id === selected);
  const message = topic ? topic.message : context || DEFAULT_WA_MESSAGE;

  const track = (location, extra = {}) => trackEvent('whatsapp_click', {
    link_location: location,
    page_path: window.location.pathname,
    ...extra,
  });

  if (!hasWhatsApp && !CONTACT.email) return null;

  return (
    <div className="direct-contact" data-component="direct-contact">
      <div className="direct-contact-main">
        <span className="eyebrow">{eyebrow || DEFAULTS.eyebrow}</span>
        <h2>{title || DEFAULTS.title}</h2>
        <p className="lede">{lead || DEFAULTS.lead}</p>
        <p className="direct-contact-intro">{intro || DEFAULTS.intro}</p>

        {topics.length > 0 && (
          <>
            <span className="form-label-static">What is it about? (optional)</span>
            <div className="contact-topic-row">
              {topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`contact-topic${selected === t.id ? ' on' : ''}`}
                  aria-pressed={selected === t.id}
                  onClick={() => setSelected(selected === t.id ? '' : t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="direct-contact-actions">
          {hasWhatsApp && (
            <a
              className="btn btn-primary btn-lg"
              href={whatsAppUrl(message)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('contact_primary', { topic: topic ? topic.id : 'context' })}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          )}
          {CONTACT.email && (
            <a
              className="btn btn-ghost btn-lg"
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('ForgeAlloy inquiry')}`}
              onClick={() => trackEvent('email_click', { link_location: 'contact_primary', page_path: window.location.pathname })}
            >
              <Mail size={18} /> Email us
            </a>
          )}
          {hasWhatsApp && (
            <a
              className="btn btn-ghost btn-lg"
              href={`tel:+${CONTACT.whatsapp}`}
              onClick={() => trackEvent('phone_click', { link_location: 'contact_primary', page_path: window.location.pathname })}
            >
              <Phone size={18} /> {CONTACT.whatsappDisplay}
            </a>
          )}
        </div>
        <p className="direct-contact-note">Opens WhatsApp with your message ready — review it and tap Send.</p>
      </div>

      <aside className="contact-sidebar" data-component="contact-sidebar">
        <span className="eyebrow">Direct lines</span>
        <h3>Talk to {BRAND} sales</h3>
        <p>For urgent requests use WhatsApp — it is the fastest channel we monitor.</p>
        <div className="contact-rows">
          {CONTACT.email && (
            <div className="contact-row">
              <span className="contact-row-label">Email</span>
              <a className="contact-row-value" href={`mailto:${CONTACT.email}`} onClick={() => trackEvent('email_click', { link_location: 'contact_sidebar', page_path: window.location.pathname })}>{CONTACT.email}</a>
            </div>
          )}
          {CONTACT.whatsapp && (
            <div className="contact-row">
              <span className="contact-row-label">WhatsApp</span>
              <a className="contact-row-value" href={whatsAppUrl(message)} target="_blank" rel="noreferrer" onClick={() => track('contact_sidebar')}>{CONTACT.whatsappDisplay}</a>
            </div>
          )}
          {CONTACT.address && (
            <div className="contact-row">
              <span className="contact-row-label">Factory</span>
              <span className="contact-row-value">{CONTACT.address}</span>
            </div>
          )}
          {CONTACT.hours && (
            <div className="contact-row">
              <span className="contact-row-label">Business hours</span>
              <span className="contact-row-value">{CONTACT.hours}</span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
