import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import TrustBar from './TrustBar.jsx';
import Reveal from './Reveal.jsx';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

const HERO_BG = 'https://sc01.alicdn.com/kf/Af09b8da0393548558c1f3ce05d153f9fx.png';

// Full-bleed CTA band — one tap starts a WhatsApp conversation, with the page context prefilled.
export default function CtaBand({
  headline = 'Ready to build your program?',
  sub = 'Tell us the series, sizes and finishes you need — we reply with pricing and lead time.',
  image = HERO_BG,
  whatsappMessage,
}) {
  const message = whatsappMessage || `Hello ForgeAlloy, ${headline} ${sub}`.trim();

  return (
    <section
      className="cta-band"
      data-component="cta-band"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.6) 60%, rgba(10,10,11,0.4) 100%), url(${image})` }}
    >
      <div className="container cta-band-inner">
        <Reveal>
          <span className="eyebrow">Factory direct</span>
          <h2>{headline}</h2>
          <p className="lede">{sub}</p>
          <div className="cta-band-actions">
            <a
              className="btn btn-primary btn-lg"
              href={whatsAppUrl(message)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { link_location: 'cta_band', page_path: window.location.pathname })}
            >
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>
            <Link to="/oem-odm" className="btn btn-ghost btn-lg">OEM / ODM inquiry</Link>
          </div>
          <TrustBar className="cta-trust" />
        </Reveal>
      </div>
    </section>
  );
}
