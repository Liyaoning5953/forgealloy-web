import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SeriesGrid from '../components/SeriesGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CatalogSection from '../components/CatalogSection.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { MODELS } from '../data/models.js';
import { SERIES } from '../data/series.js';
import { HERO_BG } from '../data/images.js';

const FITMENT_NOTES = [
  { label: 'PCD', copy: 'Bolt pattern — 5x112, 5x114.3, 5x120, 6x139.7 and more. A wrong PCD is a safety issue.' },
  { label: 'Offset (ET)', copy: 'Distance from wheel centerline to mounting pad. Changes scrub radius and steering feel.' },
  { label: 'Center bore', copy: 'Hub-centering bore; hub rings close the gap when the bore is larger than the hub.' },
  { label: 'Load rating', copy: 'Rated load per wheel — critical for trucks and off-road use.' },
];

const PAGE = 48;

export default function Products() {
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(PAGE);

  const all = filter === 'all' ? MODELS : MODELS.filter((m) => m.series === filter);
  const visible = all.slice(0, shown);

  const pick = (slug) => { setFilter(slug); setShown(PAGE); };

  return (
    <>
      <Seo
        title="Custom Forged Wheels Catalog | ForgeAlloy"
        description="Forged wheels across four series — passenger, race, off-road/SUV and pickup. 6061-T6, custom fitment and finishes."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'ForgeAlloy forged wheel catalog',
          url: 'https://forgealloyracing.com/products',
        }}
      />
      <PageHero
        eyebrow="Catalog"
        title="All models"
        lead="Four series of forged wheels — passenger, race, off-road/SUV and pickup. Filter by series, then request specs for the fitment you need."
        image={HERO_BG}
      />

      <section className="section container">
        <SeriesGrid compact />
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Model matrix</span>
          <h2>All {MODELS.length} models</h2>
        </Reveal>

        <div className="filter-tabs" role="tablist" aria-label="Filter by series">
          <button type="button" className={`filter-tab${filter === 'all' ? ' on' : ''}`} onClick={() => pick('all')}>
            All · {MODELS.length}
          </button>
          {SERIES.map((s) => (
            <button type="button" key={s.slug} className={`filter-tab${filter === s.slug ? ' on' : ''}`} onClick={() => pick(s.slug)}>
              {s.code.replace(' SERIES', '')} · {MODELS.filter((m) => m.series === s.slug).length}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <>
            <div className="product-grid">
              {visible.map((m, i) => (
                <Reveal key={m.model} delay={(i % 4) * 50}>
                  <ProductCard m={m} />
                </Reveal>
              ))}
            </div>
            {shown < all.length && (
              <div className="load-more">
                <button type="button" className="btn btn-ghost btn-lg" onClick={() => setShown((n) => n + PAGE)}>
                  Load more ({all.length - shown} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <Reveal className="onrequest-panel">
            <span className="eyebrow">Product photos uploading</span>
            <h3>New model photos are on the way</h3>
            <p className="lede">We are refreshing the product lineup. Request the current model list and pricing, or check back shortly.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">Request the model list <ArrowRight size={16} /></Link>
          </Reveal>
        )}
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Fitment glossary</span>
          <h2>What the numbers mean</h2>
        </Reveal>
        <div className="spec-notes">
          {FITMENT_NOTES.map((n) => (
            <div className="spec-cell" key={n.label}>
              <span className="spec-label">{n.label}</span>
              <p>{n.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <CatalogSection />

      <CtaBand headline="Need a specific fitment?" sub="Send the vehicle list or PCDs you need — we confirm feasibility and quote your configuration." />
    </>
  );
}
