import { ADVANTAGES } from '../data/facts.js';
import Reveal from './Reveal.jsx';

// Why ForgeAlloy — verified factory advantages.
export default function AdvantagesSection({ compact = false }) {
  return (
    <section className={`section container advantages${compact ? ' compact' : ''}`} data-component="advantages">
      <Reveal className="section-head">
        <span className="eyebrow">Why ForgeAlloy</span>
        <h2>Built on evidence, not adjectives</h2>
        {!compact && <p className="lede">Every claim on this page is traceable to a factory fact, a certificate, a process or a buyer review.</p>}
      </Reveal>
      <div className="advantages-grid">
        {ADVANTAGES.map((a, i) => (
          <Reveal key={a.n} delay={(i % 3) * 60} className="advantage-card">
            <span className="advantage-num">{a.n}</span>
            <h3>{a.title}</h3>
            <p>{a.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
