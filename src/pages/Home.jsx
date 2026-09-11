import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gem, Feather, Settings } from 'lucide-react';
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

const HERO_BG = 'https://sc01.alicdn.com/kf/Af09b8da0393548558c1f3ce05d153f9fx.png';

// One flagship design from each group.
const FEATURED = ['passenger', 'race', 'off-road-suv', 'pickup']
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
  { value: '10+', label: 'Years experience' },
  { value: '80+', label: 'Countries served' },
  { value: '100%', label: 'Quality guarantee' },
];

export default function Home() {
  return (
    <>
      <Seo
        title="ForgeAlloy | Custom Forged Wheels — 6061-T6 Factory Direct"
        description="Precision 6061-T6 forged wheels for dealers, tuners, race teams and OEM programs — passenger, race, off-road/SUV and pickup series, factory direct from Shandong, China."
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

      <section className="hero-home" data-component="hero-home">
        <video className="hero-video" autoPlay muted loop playsInline poster={HERO_BG}>
          <source src="/assets/videos/hero-h264.mp4" type="video/mp4" />
        </video>
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
            <Link to="/products" className="btn btn-primary btn-lg">Shop all wheels <ArrowRight size={16} /></Link>
            <Link to="/gallery" className="btn btn-ghost btn-lg">View gallery</Link>
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
              Shandong Forge Alloy Racing Tech Co., Ltd. is a fully integrated forged-wheel manufacturer rooted in
              Shandong, dedicated to premium automotive wheel exports — end-to-end, from innovative design and advanced
              R&D to a global sales network. Every wheel is forged from 6061-T6 aluminum and backed by an R&D team using
              FEA simulation, ISO 9001 quality management and DOT (FMVSS) compliance, with fatigue and impact testing on
              every wheel. Flexible OEM/ODM customization and robust after-sales support complete the package.
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
              <h2>Four series. Zero compromise.</h2>
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
                <ProductCard m={m} />
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
