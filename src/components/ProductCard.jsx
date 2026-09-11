import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getSeries } from '../data/series.js';

// Numbered product card: item code + fitment spec line (no titles by factory choice).
export default function ProductCard({ m }) {
  const specs = [
    m.kind,
    m.sizes,
    m.pcd && m.pcd.length ? m.pcd.slice(0, 2).join(' / ') : null,
  ].filter(Boolean);

  const noun = getSeries(m.series)?.wheelType.noun || 'wheel';

  return (
    <Link to={`/products/${m.model.toLowerCase()}`} className="product-card" data-component="product-card">
      <div className="product-card-media">
        <img
          src={m.image}
          alt={`Duaxen Forgealloy ${noun} ${m.model}`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <span className="product-card-code">{m.model}</span>
        {m.kind && <span className="product-card-kind">{m.kind}</span>}
      </div>
      <div className="product-card-body">
        <span className="product-card-spec">{specs.join(' · ')}</span>
        <span className="product-card-link">Request quote <ArrowUpRight size={14} /></span>
      </div>
    </Link>
  );
}
