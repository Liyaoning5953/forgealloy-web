import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { SERIES } from '../data/series.js';
import { HERO_BG, FACTORY } from '../data/images.js';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

const WA_MESSAGE = 'Hello ForgeAlloy, I would like wholesale pricing for forged wheels. My target market and volume to follow.';

const ADVANTAGES = [
  { n: '01', title: 'Factory, not a trader', copy: 'You quote with the plant that forges the blank. No middle layer inflating the unit price or slowing down answers.' },
  { n: '02', title: 'MOQ from 1', copy: 'Start with a single wheel or a set to check finish and fitment, then scale to mixed-model container orders.' },
  { n: '03', title: 'Fitment locked first', copy: 'Size, width, offset, PCD and center bore are confirmed against your vehicle data before anything is machined.' },
  { n: '04', title: 'Your brand on the product', copy: 'Center caps, laser marking and packaging can carry your logo — see the private label program.' },
];

const PRICE_DRIVERS = [
  { title: 'Construction', copy: 'Monoblock, two-piece and three-piece carry different machining and assembly time. Tell us the target build and we quote the construction that fits it.' },
  { title: 'Size and width', copy: 'Larger diameters and wider barrels use more material and longer forging and machining cycles.' },
  { title: 'Finish', copy: 'A single solid color, a brushed face, a polished lip and a multi-stage chrome finish are not the same process. Send your finish spec or a sample.' },
  { title: 'Volume and mix', copy: 'Repeat configurations and single-model runs price differently from mixed-model trial orders.' },
  { title: 'Packaging', copy: 'Individual boxing, foam, palletizing and branded cartons all change the landed cost — say what your market expects.' },
  { title: 'Incoterm and destination', copy: 'FOB, CIF and DDP price different scopes of freight and duty. Ask for the same configuration quoted more than one way.' },
];

const QUOTE_INPUTS = [
  'Target series or model codes (or send photos of what you want to sell)',
  'Size, width, offset (ET), PCD and center bore — or the vehicle list you sell to',
  'Finish and color references, including a color chart or sample if you have one',
  'Quantity for the first order and the annual volume you expect',
  'Destination port or door, and the incoterm you import on',
  'Branding requirements: center caps, laser marking, packaging',
];

const FAQ = [
  { q: 'Do I have to buy a full container to start?', a: 'No. Programs can start with a trial order of a few sets, and scale to mixed-model container orders once the specification is proven.' },
  { q: 'Can I mix series in one order?', a: 'Yes. Mixed-model orders are common across passenger, race, off-road, pickup and wire wheels — confirm the mix with sales before the order is placed.' },
  { q: 'How is wholesale pricing structured?', a: 'Pricing is quoted per configuration and volume — it depends on construction, size, finish, packaging and incoterm. Send the specification and sales returns a written quote.' },
  { q: 'Can I sell under my own brand?', a: 'Yes. Center caps, laser marking and packaging can carry your brand. Ask for the private label program details.' },
];

export default function Wholesale() {
  return (
    <>
      <Seo
        title="Wholesale Forged Wheels | Factory Direct Pricing — ForgeAlloy"
        description="Buy forged wheels wholesale direct from the factory. MOQ from 1, custom fitment, mixed-model orders, custom finishes and private-label programs for dealers and distributors."
      />
      <PageHero
        eyebrow="Wholesale"
        title="Wholesale forged wheels, direct from the forge"
        lead="Dealer and distributor programs built around your fitment list, your finishes and your volume — quoted by the factory that forges the wheel."
        image={HERO_BG}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Why buy direct</span>
          <h2>Four reasons dealers buy from us</h2>
        </Reveal>
        <div className="features-grid">
          {ADVANTAGES.map((b) => (
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
          <span className="eyebrow">What moves the price</span>
          <h2>Six things that decide your unit price</h2>
          <p className="lede">We do not publish a price list, because a forged wheel is quoted per configuration. These are the variables sales works through with you.</p>
        </Reveal>
        <div className="features-grid">
          {PRICE_DRIVERS.map((d) => (
            <div className="spec-cell" key={d.title}>
              <span className="spec-label">{d.title}</span>
              <p>{d.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="series-intro">
          <Reveal>
            <span className="eyebrow">Send this first</span>
            <h2>What to send for a wholesale quote</h2>
            <p className="lede">The faster we receive these six items, the faster you receive a quote you can act on.</p>
            <ul className="check-list">
              {QUOTE_INPUTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="product-info-actions">
              <a
                className="btn btn-primary btn-lg"
                href={whatsAppUrl(WA_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click', { link_location: 'wholesale_quote', page_path: window.location.pathname })}
              >
                <MessageCircle size={17} /> Get wholesale pricing
              </a>
              <Link to="/private-label" className="btn btn-ghost btn-lg">Private label program <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
          <Reveal className="series-intro-media">
            <img src={FACTORY.warehouse} alt="Finished forged wheel stock in the ForgeAlloy warehouse" loading="lazy" referrerPolicy="no-referrer" />
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Range</span>
          <h2>Five series to build a catalogue around</h2>
          <p className="lede">Mixed-model orders can cover more than one series — ask sales to plan the mix against your market's vehicles.</p>
        </Reveal>
        <div className="series-grid">
          {SERIES.map((s) => (
            <Link key={s.slug} to={`/series/${s.slug}`} className="series-card">
              <img src={s.image} alt={`${s.name} — ${s.tagline}`} loading="lazy" referrerPolicy="no-referrer" />
              <span className="series-card-body">
                <span className="series-card-code">{s.code}</span>
                <span className="series-card-name">{s.name}</span>
                <span className="series-card-range">{s.sizeRange}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="oem-cta-box">
          <span className="eyebrow">Wholesale FAQ</span>
          <h2>Quick answers</h2>
          <div className="dealer-faq">
            {FAQ.map((f) => (
              <p key={f.q}><strong>{f.q}</strong> {f.a}</p>
            ))}
          </div>
          <Link to="/guides/questions-before-moq" className="link-inline">Read the supplier verification checklist <ArrowRight size={14} /></Link>
        </Reveal>
      </section>

      <CtaBand
        headline="Ready for a wholesale quote?"
        sub="Send your fitment list, finishes and volume — we reply with pricing, lead time and the incoterm options for your market."
      />
    </>
  );
}
