import { VERIFIED_FACTS, ORDER_FACTS } from '../data/facts.js';
import { FACTORY } from '../data/images.js';
import Reveal from './Reveal.jsx';

// Strength showcase — 8-box capability grid over a blurred factory band (reference-driven).
const BOXES = [...VERIFIED_FACTS, ...ORDER_FACTS];

export default function StrengthBand() {
  return (
    <section className="strength-band" data-component="strength-band" style={{ backgroundImage: `linear-gradient(rgba(10,10,11,0.82), rgba(10,10,11,0.9)), url(${FACTORY.floor})` }}>
      <div className="container">
        <Reveal className="section-head strength-head">
          <span className="eyebrow">Factory capability</span>
          <h2>Numbers that hold up</h2>
        </Reveal>
        <div className="strength-grid">
          {BOXES.map((b, i) => (
            <Reveal key={b.label} delay={(i % 4) * 50} className="strength-box">
              <span className="strength-value">{b.value}</span>
              <span className="strength-label">{b.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
