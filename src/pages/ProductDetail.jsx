import { useParams, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import SpecTable from '../components/SpecTable.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { getModel, getModelsBySeries } from '../data/models.js';
import { getSeries } from '../data/series.js';
import { trackEvent } from '../lib/analytics.js';

// Every fitment parameter is customizable; confirmed against the vehicle before production.
const customRows = (sizeRange) => [
  { label: 'Size', value: sizeRange || 'On request' },
  { label: 'Width', value: 'Custom' },
  { label: 'Offset (ET)', value: 'Custom' },
  { label: 'PCD', value: 'Custom' },
  { label: 'Center bore', value: 'Custom' },
  { label: 'Finish & color', value: 'Custom' },
];

// Construction copy follows the series, so a wire wheel never claims forged 6061-T6.
const featuresFor = (series) => {
  const t = series.wheelType;
  const build = t.material
    ? { title: `Forged ${t.material}`, copy: 'Dense, grain-aligned construction from forged billet — lighter and stiffer than cast alternatives at the same strength target.' }
    : { title: 'Wire-spoke construction', copy: 'High-count steel wire laced to a formed rim — the classic lace pattern, finished and built to your fitment.' };

  return [
    build,
    { title: 'Fully custom fitment', copy: `Size (${series.sizeRange}), width, offset, PCD and center bore are all customizable and confirmed against your vehicle before production. A wrong PCD is a safety issue, not a fitment inconvenience.` },
    { title: 'Custom color & finish', copy: 'Custom colors and finishes are available — send us your color chart or a sample and we match it. Matte, gloss, brushed, chrome, gold, bronze and custom RAL are common.' },
    { title: 'OEM / private label', copy: 'Center caps, laser marking and packaging can carry your brand under a private-label program.' },
  ];
};

export default function ProductDetail() {
  const { model } = useParams();
  const m = getModel(model);
  if (!m) return <NotFound title="Model not found" backTo="/products" backLabel="Back to all models" />;

  const series = getSeries(m.series);
  const related = getModelsBySeries(m.series).filter((x) => x.model !== m.model).slice(0, 3);

  return (
    <>
      <Seo
        title={`${m.model} ${m.kind} ${series.wheelType.title} | ForgeAlloy`}
        description={`${m.model} — ${m.kind} ${series.wheelType.noun} in the ${series.name} series. Fully customizable: size ${series.sizeRange}, width, offset, PCD, center bore and color.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${m.model} ${m.kind} ${series.wheelType.title}`,
          brand: { '@type': 'Brand', name: 'ForgeAlloy' },
          image: m.image,
          ...(series.wheelType.materialLong ? { material: series.wheelType.materialLong } : {}),
          description: `${m.model} ${m.kind} ${series.wheelType.noun}, ${series.name}.`,
        }}
      />

      <section className="product-hero section" data-component="product-hero">
        <div className="container product-hero-inner">
          <div className="product-gallery">
            <img src={m.image} alt={`${m.model} ${m.kind} ${series.wheelType.noun}`} decoding="async" fetchPriority="high" referrerPolicy="no-referrer" />
            <span className="product-gallery-code">{m.model}</span>
          </div>
          <div className="product-info">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/products">Products</Link> <span className="crumb-sep">/</span>
              <Link to={`/series/${series.slug}`}>{series.name}</Link> <span className="crumb-sep">/</span>
              <span>{m.model}</span>
            </nav>
            <span className="eyebrow">{series.code}</span>
            <h1>{m.model}</h1>
            <p className="lede">{m.kind} {series.wheelType.noun} — fully customizable. Size, width, offset, PCD, center bore and color are all made to your spec.</p>
            <SpecTable rows={customRows(series.sizeRange)} />
            <div className="custom-chip-row">
              {[`Size ${series.sizeRange}`.trim(), 'Width', 'Offset', 'PCD', 'Center bore', 'Color & finish'].map((c) => (
                <span className="custom-chip" key={c}><Check size={13} /> {c}</span>
              ))}
            </div>
            <p className="custom-note">Every parameter is confirmed against your vehicle data before production. Color chart and finish options on request.</p>
            <div className="product-info-actions">
              <Link to={`/contact?model=${m.model}`} className="btn btn-primary btn-lg" onClick={() => trackEvent('request_quote', { model: m.model, series: m.series, page_path: window.location.pathname })}>Request quote — {m.model}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Built to spec</span>
          <h2>What you get</h2>
        </Reveal>
        <div className="features-grid">
          {featuresFor(series).map((f) => (
            <div className="spec-cell" key={f.title}>
              <span className="spec-label">{f.title}</span>
              <p>{f.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section container">
          <Reveal className="section-head">
            <span className="eyebrow">Related models</span>
            <h2>More from {series.name}</h2>
          </Reveal>
          <div className="related-grid">
            {related.map((r) => (
              <Link to={`/products/${r.model.toLowerCase()}`} className="related-card" key={r.model}>
                <img src={r.image} alt={r.model} loading="lazy" referrerPolicy="no-referrer" />
                <span className="related-code">{r.model}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBand
        headline={`Build ${m.model} to your spec`}
        sub={`Send your target size, width, offset, PCD, center bore, color and quantity — we confirm feasibility and reply with pricing.`}
        image={m.image}
      />
    </>
  );
}
