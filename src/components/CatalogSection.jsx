import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Mail } from 'lucide-react';
import { CATALOG } from '../data/catalog.js';
import Reveal from './Reveal.jsx';

// Product materials / catalog section. Scrolls into view when navigated with #catalog.
export default function CatalogSection() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#catalog') {
      const el = document.querySelector('[data-component="catalog"]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <section className="section container" data-component="catalog" id="catalog">
      <Reveal className="section-head">
        <span className="eyebrow">Product materials</span>
        <h2>Catalog & downloads</h2>
        <p className="lede">Official ForgeAlloy catalogs — grab the full lineup, finishes and off-road range.</p>
      </Reveal>
      <div className="catalog-grid">
        {CATALOG.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 60} className="catalog-card">
            <span className="catalog-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            {c.ready ? (
              <div className="catalog-cta">
                <span className="catalog-meta">PDF · {c.size}</span>
                <a className="btn btn-primary" href={c.file} download>
                  Download PDF <Download size={15} />
                </a>
              </div>
            ) : (
              <Link className="btn btn-ghost" to={`/contact?interest=catalog-${i + 1}`}>
                Request the file <Mail size={15} />
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
