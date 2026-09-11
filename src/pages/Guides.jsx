import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { GUIDES } from '../data/guides.js';
import { HERO_BG } from '../data/images.js';

export default function Guides() {
  const [featured, ...rest] = GUIDES;
  return (
    <>
      <Seo
        title="Buyer Guides — Forged Wheel Sourcing & Fitment | ForgeAlloy"
        description="Procurement education for wheel buyers: reading specs, construction comparison, supplier verification, bolt patterns and shipping incoterms."
      />
      <PageHero
        eyebrow="Guides"
        title="Buyer guides"
        lead="Specs, construction, sourcing, fitment and shipping — written for buyers who want to order once, correctly."
        image={HERO_BG}
      />

      <section className="section container">
        <Reveal className="featured-guide">
          <Link to={`/guides/${featured.slug}`} className="featured-guide-inner" data-component="featured-guide">
            <div className="featured-guide-media">
              <img src={featured.cover} alt="" referrerPolicy="no-referrer" />
            </div>
            <div className="featured-guide-body">
              <span className="article-card-cat">{featured.category} · {featured.date}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="btn btn-ghost">Read guide <ArrowRight size={14} /></span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="section container">
        <div className="guide-teaser-grid">
          {rest.map((g) => (
            <Link to={`/guides/${g.slug}`} className="article-card" key={g.slug} data-component="article-card">
              <div className="article-card-media">
                <img src={g.cover} alt="" loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="article-card-body">
                <span className="article-card-cat">{g.category} · {g.date}</span>
                <h3>{g.title}</h3>
                <p>{g.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand headline="Reading, then buying" sub="When the guides run out of answers, our sales team picks up from there." />
    </>
  );
}
