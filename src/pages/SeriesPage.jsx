import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { getSeries } from '../data/series.js';
import { getModelsBySeries } from '../data/models.js';
import { IMG } from '../data/images.js';

const PROCESS_NOTES = {
  passenger: { title: 'Any construction, custom fitment', copy: 'Monoblock, two-piece and three-piece forged options for luxury and performance cars — size, offset, PCD and finish confirmed before production.' },
  race: { title: 'Engineered for the track', copy: 'Weight and stiffness first — forged construction built to hold alignment under load, with fitment confirmed against your vehicle data.' },
  'off-road-suv': { title: 'Forged for load', copy: 'Forging density and grain alignment carry the impact and load targets of off-road and SUV use.' },
  pickup: { title: 'Heavy-duty forged', copy: 'Forged blanks sized for HD pickup and commercial load ratings.' },
};

const PAGE = 48;

export default function SeriesPage() {
  const { slug } = useParams();
  const [shown, setShown] = useState(PAGE);
  const series = getSeries(slug);
  const models = getModelsBySeries(slug);
  const visible = models.slice(0, shown);

  if (!series) {
    return (
      <section className="section container">
        <h1>Series not found</h1>
        <p className="lede"><Link to="/products">Back to all models</Link></p>
      </section>
    );
  }

  const processNote = PROCESS_NOTES[series.slug];

  return (
    <>
      <Seo
        title={`${series.name} | ${series.code} — ForgeAlloy`}
        description={`${series.name} — ${series.blurb}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `${series.code} ${series.name}`,
          brand: { '@type': 'Brand', name: 'ForgeAlloy' },
          ...(series.wheelType.materialLong ? { material: series.wheelType.materialLong } : {}),
          description: series.blurb,
        }}
      />
      <PageHero eyebrow={series.code} title={series.name} lead={series.blurb} image={series.image} />

      <section className="section container series-intro">
        <Reveal className="series-intro-copy">
          <span className="eyebrow">About this series</span>
          <h2>{series.tagline}</h2>
          <p className="lede">{series.blurb} Request the full spec sheet for sizes, offsets and PCDs available in this series.</p>
        </Reveal>
        <Reveal className="series-intro-spec" delay={100}>
          <div className="spec-cell">
            <span className="spec-label">Construction</span>
            <span className="spec-value">{processNote ? processNote.title : series.name}</span>
          </div>
        </Reveal>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">
            {models.length} designs{series.sizeRange ? ` · ${series.sizeRange}` : ''}
          </span>
          <h2>{series.code} lineup</h2>
        </Reveal>
        {models.length > 0 ? (
          <>
            <div className="product-grid">
              {visible.map((m, i) => (
                <Reveal key={m.model} delay={(i % 4) * 50}>
                  <ProductCard m={m} />
                </Reveal>
              ))}
            </div>
            {shown < models.length && (
              <div className="load-more">
                <button type="button" className="btn btn-ghost btn-lg" onClick={() => setShown((n) => n + PAGE)}>
                  Load more ({models.length - shown} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <Reveal className="onrequest-panel">
            <span className="eyebrow">Models uploading</span>
            <h3>New product photos are on the way</h3>
            <p className="lede">Tell us your vehicle, sizing and finish — we confirm current models, fitment and pricing while the new lineup uploads.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">Request details <ArrowRight size={16} /></Link>
          </Reveal>
        )}
      </section>

      {processNote && (
        <section className="section container">
          <Reveal className="process-note">
            <div className="spec-cell">
              <span className="spec-label">{processNote.title}</span>
              <p>{processNote.copy}</p>
            </div>
          </Reveal>
        </section>
      )}

      <CtaBand
        headline={`Build your ${series.name.replace('Forged ', '').replace('Heavy Duty', 'Truck')} program`}
        sub={`Tell us the ${series.code} sizes and finishes you need — we reply with pricing and lead time.`}
        image={IMG[series.slug] || series.image || undefined}
      />
    </>
  );
}
