import { VERIFIED_FACTS } from '../data/facts.js';
import Reveal from './Reveal.jsx';

// Verified facts row — used on Home and directly above inquiry CTAs.
export default function TrustBar({ className = '' }) {
  return (
    <div className={`trust-bar ${className}`} data-component="trust-bar">
      {VERIFIED_FACTS.map((f, i) => (
        <Reveal key={f.label} delay={i * 60} className="trust-item">
          <span className="trust-value">{f.value}</span>
          <span className="trust-label">{f.label}</span>
        </Reveal>
      ))}
    </div>
  );
}
