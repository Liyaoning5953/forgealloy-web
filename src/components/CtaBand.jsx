import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TrustBar from './TrustBar.jsx';
import Reveal from './Reveal.jsx';

const HERO_BG = 'https://sc01.alicdn.com/kf/Af09b8da0393548558c1f3ce05d153f9fx.png';

// Full-bleed CTA band — trust row always sits above the button.
export default function CtaBand({ headline = 'Ready to build your program?', sub = 'Tell us the series, sizes and finishes you need — we reply with pricing and lead time.', image = HERO_BG }) {
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
            <Link to="/contact" className="btn btn-primary btn-lg">Request a quote <ArrowRight size={16} /></Link>
            <Link to="/oem-odm" className="btn btn-ghost btn-lg">OEM / ODM inquiry</Link>
          </div>
          <TrustBar className="cta-trust" />
        </Reveal>
      </div>
    </section>
  );
}
