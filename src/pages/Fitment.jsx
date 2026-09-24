import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import { breadcrumb, graph, service } from '../lib/schema.js';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { IMG } from '../data/images.js';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

// Structured data for this page. The labels and description mirror the on-page copy.
const PAGE_SCHEMA = graph(
  breadcrumb([{ name: 'Home', path: '/' }, { name: 'Fitment', path: '/fitment/' }]),
  service({
    name: 'Forged wheel fitment service',
    serviceType: 'Wheel fitment specification and confirmation',
    description: 'Send your vehicle details and get size, width, offset, PCD, center bore and load target confirmed in writing before production.',
    path: '/fitment/',
  })
);

const WA_MESSAGE = 'Hello ForgeAlloy, I need a fitment check. I will send my vehicle details and current wheel specs.';

const LOCKED = [
  { title: 'Diameter', copy: 'The wheel size the tyre mounts on, for example 19". Sets brake clearance and the look of the car.' },
  { title: 'Width', copy: 'The second number — 19x9.5 is 19" diameter, 9.5" wide. Width drives tyre choice and fender clearance.' },
  { title: 'Offset (ET)', copy: 'Distance from the wheel centreline to the mounting pad. Wrong offset changes steering feel and can stress the suspension.' },
  { title: 'PCD (bolt pattern)', copy: 'Bolt count and the circle diameter through the bolt holes — 5x112, 5x114.3, 5x120, 6x139.7 and so on. A wrong PCD cannot be mounted safely.' },
  { title: 'Center bore', copy: 'The hub opening. When the wheel bore is larger than the hub, hub-centric rings take up the gap so the hub centres the wheel.' },
  { title: 'Load target', copy: 'What the wheel must carry. For trucks, towing and off-road use this matters as much as fitment.' },
];

const PATTERNS = [
  { pcd: '5x112', copy: 'Covers a large share of European vehicles, including VW/Audi-family platforms.' },
  { pcd: '5x114.3', copy: 'Covers a broad range of Japanese and Korean models.' },
  { pcd: '5x120', copy: 'The BMW-family pattern.' },
  { pcd: '6x139.7', copy: 'Covers a wide band of off-road pickups and SUVs.' },
];

const SEND = [
  'Vehicle make, model, year and trim',
  'A photo of your current wheel label or the stamped numbers on the wheel',
  'Current wheel size and tyre size, if you are keeping the same stance',
  'Target stance or clearance change, if you want to change it',
  'Photos of front and rear brake calipers if clearance is a concern',
  'Any suspension modification that changes ride height or geometry',
];

const CONFIRM = [
  { n: '01', title: 'You send the data', copy: 'Vehicle details, current wheel specs and photos go to sales.' },
  { n: '02', title: 'We check the numbers', copy: 'Size, width, offset, PCD, centre bore and load target are checked against the vehicle.' },
  { n: '03', title: 'You get it in writing', copy: 'The confirmed specification is confirmed back to you before anything is quoted or produced.' },
  { n: '04', title: 'Production locks it', copy: 'The approved figures go to the forge — a wrong PCD never reaches the machine.' },
];

const FAQ = [
  { q: 'Can you tell me my PCD from my car model alone?', a: 'Send the make, model, year and trim, and the numbers are checked against vehicle data before quoting. A photo of the current wheel label removes any doubt.' },
  { q: 'What if my two vehicles share a PCD but differ elsewhere?', a: 'That is common. The same PCD can differ in centre bore, offset or brake clearance — which is why we confirm all six numbers, not just the bolt pattern.' },
  { q: 'Do you supply hub-centric rings?', a: 'Ask sales for the ring requirement for your fitment when the centre bore differs from your hub.' },
  { q: 'Can you match a stance I have seen in a photo?', a: 'Send the reference photo with the vehicle details. We confirm what is achievable on your car rather than promising a look that will not clear.' },
];

export default function Fitment() {
  return (
    <>
      <Seo
        title="Wheel Fitment Check — PCD, Offset & Center Bore | ForgeAlloy"
        description="Send your vehicle details and get size, width, offset, PCD, center bore and load target confirmed in writing before production. Forged wheel fitment service."
        jsonLd={PAGE_SCHEMA}
      />
      <PageHero
        eyebrow="Fitment"
        title="Fitment confirmed before anything is forged"
        lead="A forged wheel is built to your car, not to a generic size. Send the vehicle data and the six numbers are locked in writing before production."
        image={IMG['off-road-suv']}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">What we lock</span>
          <h2>Six numbers decide whether a wheel fits</h2>
        </Reveal>
        <div className="features-grid">
          {LOCKED.map((l) => (
            <div className="spec-cell" key={l.title}>
              <span className="spec-label">{l.title}</span>
              <p>{l.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Common patterns</span>
          <h2>The bolt patterns most orders use</h2>
          <p className="lede">PCD is the first filter, not the last — centre bore and offset still have to match.</p>
        </Reveal>
        <div className="features-grid">
          {PATTERNS.map((p) => (
            <div className="spec-cell" key={p.pcd}>
              <span className="spec-value">{p.pcd}</span>
              <p>{p.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="series-intro">
          <Reveal>
            <span className="eyebrow">Send this first</span>
            <h2>What to send for a fitment check</h2>
            <ul className="check-list">
              {SEND.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="product-info-actions">
              <a
                className="btn btn-primary btn-lg"
                href={whatsAppUrl(WA_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click', { link_location: 'fitment_check', page_path: window.location.pathname })}
              >
                <MessageCircle size={17} /> Send my vehicle details
              </a>
              <Link to="/guides/bolt-pattern-fitment-basics" className="btn btn-ghost btn-lg">Fitment basics guide <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
          <Reveal className="series-intro-media">
            <img src={IMG.passenger} alt="Forged wheel fitment reference" loading="lazy" referrerPolicy="no-referrer" />
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Process</span>
          <h2>How the confirmation runs</h2>
        </Reveal>
        <div className="oem-process">
          {CONFIRM.map((s) => (
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
          <span className="eyebrow">Fitment FAQ</span>
          <h2>Quick answers</h2>
          <div className="dealer-faq">
            {FAQ.map((f) => (
              <p key={f.q}><strong>{f.q}</strong> {f.a}</p>
            ))}
          </div>
          <Link to="/products" className="link-inline">Browse all models <ArrowRight size={14} /></Link>
        </Reveal>
      </section>

      <CtaBand
        headline="Not sure it will clear?"
        sub="Send the vehicle and the current wheel specs — fitment is confirmed in writing before a quote is issued."
      />
    </>
  );
}
