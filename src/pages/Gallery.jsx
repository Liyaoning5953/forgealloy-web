import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { MODELS } from '../data/models.js';
import { getSeries } from '../data/series.js';
import { FACTORY, HERO_BG } from '../data/images.js';

const FACTORY_SHOTS = [
  { src: FACTORY.floor, caption: 'Production floor' },
  { src: FACTORY.machining, caption: 'CNC machining' },
  { src: FACTORY.warehouse, caption: 'Finished stock' },
  { src: FACTORY.line, caption: 'Finishing line' },
];

export default function Gallery() {
  return (
    <>
      <Seo
        title="Gallery — Forged Wheels & Factory | ForgeAlloy"
        description="ForgeAlloy forged wheel models and real factory floor — machining, finishing and finished stock."
      />
      <PageHero eyebrow="Gallery" title="Wheels & workshop" lead="Every model currently in the lineup, plus the floor where they are made." image={HERO_BG} />

      {MODELS.length > 0 && (
        <section className="section container">
          <Reveal className="section-head">
            <span className="eyebrow">Models</span>
            <h2>The lineup</h2>
          </Reveal>
          <div className="gallery-grid">
            {MODELS.slice(0, 60).map((m, i) => (
              <Reveal key={m.model} delay={(i % 4) * 40} className="gallery-item">
                <img src={m.image} alt={`Duaxen Forgealloy ${getSeries(m.series)?.wheelType.noun || 'wheel'} ${m.model}`} loading="lazy" referrerPolicy="no-referrer" />
                <span className="gallery-code">{m.model}</span>
              </Reveal>
            ))}
          </div>
          <div className="load-more">
            <Link to="/products" className="btn btn-ghost btn-lg">Browse all {MODELS.length} designs</Link>
          </div>
        </section>
      )}

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Factory floor</span>
          <h2>Where they are made</h2>
        </Reveal>
        <div className="factory-gallery">
          {FACTORY_SHOTS.map((g) => (
            <figure className="factory-photo" key={g.caption}>
              <img src={g.src} alt={`ForgeAlloy factory — ${g.caption}`} loading="lazy" referrerPolicy="no-referrer" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CtaBand headline="Found your model?" sub="Request specs and pricing for any wheel in the lineup." />
    </>
  );
}
