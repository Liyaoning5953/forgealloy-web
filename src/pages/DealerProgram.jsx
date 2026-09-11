import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { DEALER_BENEFITS } from '../data/facts.js';
import { HERO_BG } from '../data/images.js';

const STEPS = [
  { n: '01', title: 'Apply', copy: 'Tell us your market, target vehicles and expected volume.' },
  { n: '02', title: 'Approval', copy: 'We confirm program terms and pricing tier for your region.' },
  { n: '03', title: 'Order', copy: 'Place trial or container orders at program pricing.' },
  { n: '04', title: 'Support', copy: 'Priority scheduling, imagery and spec sheets as you grow.' },
];

export default function DealerProgram() {
  return (
    <>
      <Seo
        title="Dealer Program — Forge ForgeAlloy Wheels | ForgeAlloy"
        description="Join the ForgeAlloy dealer network: factory pricing, tiered programs, priority lead times and marketing support."
      />
      <PageHero
        eyebrow="Dealer program"
        title="Grow with ForgeAlloy"
        lead="Factory pricing, priority scheduling and marketing support for dealers and distributors who want a direct line to the forge."
        image={HERO_BG}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Why dealers choose us</span>
          <h2>Direct from the forge</h2>
        </Reveal>
        <div className="features-grid">
          {DEALER_BENEFITS.map((b) => (
            <div className="spec-cell" key={b.n}>
              <span className="process-num">{b.n}</span>
              <span className="spec-label">{b.title}</span>
              <p>{b.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Four steps in</h2>
        </Reveal>
        <div className="oem-process">
          {STEPS.map((s) => (
            <div className="oem-step" key={s.n}>
              <span className="process-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="oem-cta-box">
          <span className="eyebrow">Dealer FAQ</span>
          <h2>Quick answers</h2>
          <div className="dealer-faq">
            <p><strong>Is there a dealer commitment?</strong> Program terms depend on region and volume — sales confirms what applies to you.</p>
            <p><strong>Can I stock multiple series?</strong> Yes. Mixed-model containers are common; confirm the mix with sales.</p>
            <p><strong>Do you support dealer marketing?</strong> Yes — product imagery and spec sheets for your listings and showroom.</p>
          </div>
          <Link to="/contact" className="btn btn-primary btn-lg">Start your dealer application <ArrowRight size={16} /></Link>
        </Reveal>
      </section>

      <CtaBand headline="Become a ForgeAlloy dealer" sub="Apply today — program terms confirmed within the same week for most regions." />
    </>
  );
}
