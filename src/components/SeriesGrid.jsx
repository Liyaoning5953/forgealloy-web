import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERIES } from '../data/series.js';
import { MODELS } from '../data/models.js';
import Reveal from './Reveal.jsx';

const countBySeries = MODELS.reduce((acc, m) => {
  acc[m.series] = (acc[m.series] || 0) + 1;
  return acc;
}, {});

export function SeriesCard({ s, compact = false, showCount = false }) {
  const count = countBySeries[s.slug] || 0;
  return (
    <Link to={`/series/${s.slug}`} className={`series-card${compact ? ' compact' : ''}`} data-component="series-card">
      <div className="series-card-media">
        <img src={s.image} alt={`${s.name} ${s.wheelType.noun}s`} loading="lazy" referrerPolicy="no-referrer" />
        <span className="series-card-code">{s.code}</span>
      </div>
      <div className="series-card-body">
        <h3>{s.name}</h3>
        <p>{s.tagline}</p>
        {showCount && (
          <span className="series-count">
            {count} designs{s.sizeRange ? ` · ${s.sizeRange}` : ''}
          </span>
        )}
        {!compact && <span className="series-card-link">Explore <ArrowRight size={14} /></span>}
      </div>
    </Link>
  );
}

export default function SeriesGrid({ compact = false, showCount = false }) {
  return (
    <div className={`series-grid${compact ? ' compact' : ''}`} data-component="series-grid">
      {SERIES.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 3) * 60}>
          <SeriesCard s={s} compact={compact} showCount={showCount} />
        </Reveal>
      ))}
    </div>
  );
}
