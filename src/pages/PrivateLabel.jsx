import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { GUIDE_COVERS } from '../data/images.js';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

const WA_MESSAGE = 'Hello ForgeAlloy, I would like to set up a private label wheel program. My brand details to follow.';

const BRANDING = [
  { title: 'Center caps', copy: 'Your logo on the center cap — the most visible branding point on the wheel.' },
  { title: 'Laser marking', copy: 'Laser-marked model codes, sizing and branding on the wheel face or lip, to your artwork.' },
  { title: 'Packaging', copy: 'Branded cartons, foam inserts, hangtags and labels — tell us what your market expects to see when a box is opened.' },
  { title: 'Colour matching', copy: 'Send a colour chart, RAL reference or physical sample and we match the finish to it.' },
  { title: 'Model naming', copy: 'Your own model codes and names across the range, instead of factory part numbers.' },
  { title: 'Catalogue assets', copy: 'Product imagery and spec sheets for your listings, so your brand is presented consistently.' },
];

const STEPS = [
  { n: '01', title: 'Brand brief', copy: 'Send your logo files, colours, packaging expectations, target vehicles and volume plan.' },
  { n: '02', title: 'Specification', copy: 'We confirm construction, sizes, fitment, finishes and branding points against your brief.' },
  { n: '03', title: 'Sample', copy: 'A trial piece or set is produced so you can approve finish, marking and packaging in hand.' },
  { n: '04', title: 'Production', copy: 'Approved specifications go into production with fitment locked and QC records per order.' },
  { n: '05', title: 'Repeat programs', copy: 'Reorders run against the approved specification, so the second shipment matches the first.' },
];

const NEEDED = [
  'Logo files — vector format (AI, EPS, PDF or SVG) where possible',
  'Brand colours with references, or a physical sample to match',
  'Packaging requirements: carton artwork, inserts, labels, hangtags',
  'Target fitments or the vehicle list your catalogue covers',
  'First order quantity and planned annual volume',
  'Any market-specific marking or labelling your country requires',
];

const FAQ = [
  { q: 'Which parts of the wheel can carry my brand?', a: 'Center caps, laser marking on the wheel, and the packaging. Tell us what is important for your market and we confirm feasibility per item.' },
  { q: 'Do I need a large first order?', a: 'Programs can start with a trial order so you can approve the finished product before scaling. Volume then determines the commercial terms.' },
  { q: 'Who is responsible for market compliance?', a: 'Regulatory requirements in your market — such as marking, labelling or homologation rules — remain the importer\'s responsibility. We document the manufacturing and inspection we perform, and share the records we hold.' },
  { q: 'Can branding be added to an existing model?', a: 'Yes. Center caps, marking and packaging can be applied to models already in the range, without building a new wheel from scratch.' },
];

export default function PrivateLabel() {
  return (
    <>
      <Seo
        title="Private Label Forged Wheels | Your Brand on the Forge — ForgeAlloy"
        description="Private label forged wheel programs: your center caps, laser marking, packaging, model names and catalogue imagery, produced to your approved specification."
      />
      <PageHero
        eyebrow="Private label"
        title="Your brand on a forged wheel program"
        lead="Center caps, laser marking, packaging and model naming under your own brand — built to a specification you approve on a sample first."
        image={GUIDE_COVERS.specs}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Branding points</span>
          <h2>Where your brand appears</h2>
        </Reveal>
        <div className="features-grid">
          {BRANDING.map((b) => (
            <div className="spec-cell" key={b.title}>
              <span className="spec-label">{b.title}</span>
              <p>{b.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">How it runs</span>
          <h2>Five steps from brief to repeat order</h2>
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
        <div className="series-intro">
          <Reveal>
            <span className="eyebrow">Start here</span>
            <h2>What we need from your brand</h2>
            <p className="lede">Send these six items and the first answer you get back will already be specific to your brand.</p>
            <ul className="check-list">
              {NEEDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="product-info-actions">
              <a
                className="btn btn-primary btn-lg"
                href={whatsAppUrl(WA_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click', { link_location: 'private_label', page_path: window.location.pathname })}
              >
                <MessageCircle size={17} /> Start a private label program
              </a>
              <Link to="/oem-odm" className="btn btn-ghost btn-lg">OEM / ODM engineering <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
          <Reveal className="series-intro-media">
            <img src={GUIDE_COVERS.constructions} alt="Forged wheel prepared for private label finishing" loading="lazy" referrerPolicy="no-referrer" />
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal className="oem-cta-box">
          <span className="eyebrow">Private label FAQ</span>
          <h2>Quick answers</h2>
          <div className="dealer-faq">
            {FAQ.map((f) => (
              <p key={f.q}><strong>{f.q}</strong> {f.a}</p>
            ))}
          </div>
          <Link to="/guides/private-label-wheel-program-steps" className="link-inline">Read the private label program guide <ArrowRight size={14} /></Link>
        </Reveal>
      </section>

      <CtaBand
        headline="Put your brand on the wheel"
        sub="Send your logo, colours and target fitments — we confirm what can be branded, then build a sample for your approval."
      />
    </>
  );
}
