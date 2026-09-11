import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PageHero({ eyebrow, title, lead, image, crumbs = [] }) {
  return (
    <section
      className="page-hero"
      data-component="page-hero"
      style={image ? { backgroundImage: `linear-gradient(90deg, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.55) 55%, rgba(10,10,11,0.35) 100%), url(${image})` } : undefined}
    >
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.to || c.label}>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
                {i < crumbs.length - 1 && <span className="crumb-sep">/</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lede">{lead}</p>}
      </div>
    </section>
  );
}

export function CtaLink({ to, children = 'Request a quote', variant = 'primary', size }) {
  return (
    <Link to={to} className={`btn btn-${variant}${size === 'lg' ? ' btn-lg' : ''}`}>
      {children} <ArrowRight size={16} />
    </Link>
  );
}
