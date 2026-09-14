import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gem, Feather, Settings, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import StrengthBand from '../components/StrengthBand.jsx';
import SeriesGrid from '../components/SeriesGrid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProcessStrip from '../components/ProcessStrip.jsx';
import AdvantagesSection from '../components/AdvantagesSection.jsx';
import TestimonialShowcase from '../components/TestimonialShowcase.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { GUIDES } from '../data/guides.js';
import { MODELS } from '../data/models.js';
import { FACTORY } from '../data/images.js';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

const HERO_BG = 'https://sc01.alicdn.com/kf/Af09b8da0393548558c1f3ce05d153f9fx.png';

// One flagship design from each group.
const FEATURED = ['passenger', 'race', 'off-road-suv', 'pickup', 'wire']
  .map((g) => MODELS.find((m) => m.series === g))
  .filter(Boolean);

const FEATURES = [
  { icon: ShieldCheck, title: 'Precision', sub: 'Engineered' },
  { icon: Gem, title: 'Premium', sub: 'Quality' },
  { icon: Feather, title: 'Lightweight', sub: 'Stronger' },
  { icon: Settings, title: 'Custom', sub: 'Made' },
];

const STORY_STATS = [
  { value: '500+', label: 'Wheel designs' },
  { value: '5', label: 'Product series' },
  { value: '6061-T6', label: 'Forged aluminum' },
  { value: 'OEM / ODM', label: 'Export programs' },
];

export default function Home() {
  const heroRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    if (reducedMotion || saveData || !heroRef.current) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadVideo(true);
        observer.disconnect();
      }
    }, { rootMargin: '160px' });
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="ForgeAlloy | Custom Forged Wheels — 6061-T6 Factory Direct"
        description="Precision 6061-T6 forged wheels and wire-spoke wheels for dealers, tuners, race teams and OEM programs — passenger, race, off-road/SUV, pickup and wire series, factory direct from Shandong, China."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ForgeAlloy',
          legalName: 'Shandong Forgealloy Racing Tech Co., Ltd.',
          url: 'https://forgealloyracing.com/',
          description: 'Manufacturer of custom 6061-T6 forged alloy wheels for performance, luxury and off-road vehicles.',
          knowsAbout: ['Forged alloy wheels', '6061-T6 aluminum', 'OEM/ODM wheel manufacturing'],
        }}
      />

      <section ref={heroRef} className="hero-home" data-component="hero-home" style={{ backgroundImage: `url(${HERO_BG})` }}>
        {loadVideo && (
          <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={HERO_BG} aria-hidden="true">
            <source src="/assets/videos/hero-h264.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-scrim" />
        <div className="container hero-inner">
          <span className="eyebrow">Shandong Forgealloy Racing Tech</span>
          <h1>Forged to <em>perform</em></h1>
          <p className="lede">Precision forged wheels for luxury, performance and off-road vehicles — 6061-T6, factory direct.</p>
          <div className="hero-features">
            {FEATURES.map((f) => (
              <span className="hero-feature" key={f.title}>
                <f.icon size={22} strokeWidth={1.6} />
                <span><strong>{f.title}</strong> {f.sub}</span>
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <a
              className="btn btn-primary btn-lg"
              href={whatsAppUrl('Hello ForgeAlloy, I am looking for custom forged wheels. Please send pricing and lead time.')}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', { link_location: 'hero_home', page_path: window.location.pathname })}
            >
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>
            <Link to="/products" className="btn btn-ghost btn-lg">Shop all wheels <ArrowRight size={16} /></Link>
          </div>
          <span className="hero-scroll">Scroll to explore</span>
        </div>
      </section>

      <section className="story-section" data-component="story">
        <div className="container story-inner">
          <Reveal className="story-copy">
            <span className="eyebrow">Our story</span>
            <h2>Crafted for precision. Engineered for durability.</h2>
            <p>
               Shandong Forge Alloy Racing Tech Co., Ltd. manufactures custom wheel programs for global aftermarket and
               OEM buyers. Current factory records document 6061-T6 forged programs, OEM/ODM customization and
               JWTC/VIA-accredited fatigue and impact test equipment. Ask our sales team for the certificate or inspection
               record that applies to your target product and order before purchase.
            </p>
          </Reveal>
          <div className="story-stats">
            {STORY_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 60} className="story-stat">
                <span className="story-stat-value">{s.value}</span>
                <span className="story-stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StrengthBand />

      <section className="collections" data-component="collections">
        <div className="container collections-inner">
          <span className="collections-ghost" aria-hidden="true">FORGEALLOY</span>
          <Reveal className="section-head collections-head">
            <div>
              <span className="eyebrow">Wheel collections</span>
              <h2>Five series. Zero compromise.</h2>
            </div>
            <Link to="/products" className="btn btn-outline-ink">View all products <ArrowRight size={15} /></Link>
          </Reveal>
          <SeriesGrid showCount />
        </div>
      </section>

      {FEATURED.length > 0 && (
        <section className="section container">
          <Reveal className="section-head">
            <span className="eyebrow">Just dropped</span>
            <h2>Featured models</h2>
          </Reveal>
          <div className="featured-grid">
            {FEATURED.map((m, i) => (
              <Reveal key={m.model} delay={(i % 4) * 50}>
                <ProductCard m={m} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">How wheels are made</span>
          <h2>Six steps, zero shortcuts</h2>
        </Reveal>
        <ProcessStrip />
      </section>

      <AdvantagesSection />

      <section className="oem-teaser" data-component="oem-teaser" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.55) 60%, rgba(10,10,11,0.35) 100%), url(${FACTORY.warehouse})` }}>
        <div className="container oem-teaser-inner">
          <Reveal>
            <span className="eyebrow">OEM / ODM solutions</span>
            <h2>One-stop custom forged wheel programs</h2>
            <p className="lede">Custom design, sample development, finishes, private label and export packaging for global brands, wholesalers and dealers.</p>
            <Link to="/oem-odm" className="btn btn-primary btn-lg">Get OEM pricing <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Buyer guides</span>
          <h2>Learn before you order</h2>
        </Reveal>
        <div className="guide-teaser-grid">
          {GUIDES.slice(0, 3).map((g) => (
            <Link to={`/guides/${g.slug}`} className="article-card" key={g.slug} data-component="article-card">
              <div className="article-card-media">
                <img src={g.cover} alt="" loading="lazy" referrerPolicy="no-referrer" />
              </div>
              <div className="article-card-body">
                <span className="article-card-cat">{g.category}</span>
                <h3>{g.title}</h3>
                <p>{g.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <TestimonialShowcase />

      <CtaBand />
    </>
  );
}
