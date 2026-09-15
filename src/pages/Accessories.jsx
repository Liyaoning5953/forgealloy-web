import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { ACCESSORIES } from '../data/accessories.js';
import { HERO_BG } from '../data/images.js';

export default function Accessories() {
  return (
    <>
      <Seo
        title="Workshop Accessories — Wheel & Tyre Tools | ForgeAlloy"
        description="Workshop tools that ship with our wheels — starting with a 12V electric hydraulic jack kit at US$20 per set, priced for dealers and tyre shops."
      />
      <PageHero
        eyebrow="Accessories"
        title="Workshop accessories"
        lead="The tools that go with a wheel order — priced per set, shipped with your container."
        image={HERO_BG}
      />

      <section className="section container">
        <div className="guide-teaser-grid">
          {ACCESSORIES.map((a) => (
            <Link to={`/accessories/${a.slug}`} className="article-card" key={a.slug} data-component="accessory-card">
              <div className="article-card-media">
                <img src={a.image} alt={a.name} loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="article-card-body">
                <span className="article-card-cat">{a.category} · {a.sku}</span>
                <h3>{a.name}</h3>
                <p>{a.tagline}</p>
                <span className="price-tag">{a.price} <em>{a.priceUnit}</em></span>
                <span className="btn btn-ghost">View details <ArrowRight size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">More coming</span>
          <h2>Need something else in the box?</h2>
          <p className="lede">
            We are adding more tyre-change and workshop accessories to this range. If you want a specific tool quoted
            alongside your wheel order, send us the item and target price and we will confirm feasibility.
          </p>
        </Reveal>
      </section>

      <CtaBand
        headline="Quote it with your wheels"
        sub="Send the accessory, quantity and target port — we confirm pricing and consolidate it into your wheel shipment."
      />
    </>
  );
}
