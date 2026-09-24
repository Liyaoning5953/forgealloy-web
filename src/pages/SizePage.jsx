import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { getSizePage, SIZE_PAGES, SIZE_SPEC_LIST } from '../data/sizes.js';
import { HERO_BG } from '../data/images.js';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

export default function SizePage() {
  const { size } = useParams();
  const page = getSizePage(size);

  if (!page) return <NotFound title="Size not found" backTo="/forged-wheels-by-size" backLabel="Back to wheels by size" />;

  const waMessage = `Hello ForgeAlloy, I would like a quote for ${page.inch}-inch forged wheels. Sizes and quantity to follow.`;

  return (
    <>
      <Seo
        title={`${page.inch}-Inch Forged Wheels | Custom Made to Your Fitment — ForgeAlloy`}
        description={`${page.inch}-inch custom forged wheels machined to your width, offset, PCD and centre bore. ${page.series.length} series available in ${page.inch} inch. Factory direct, quoted per order.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `What widths are available in ${page.inch}-inch forged wheels?`,
              acceptedAnswer: { '@type': 'Answer', text: 'Width, offset and PCD are machined to your order, so the width is fixed by your fitment rather than by a stock list. Send the vehicle list or the exact sizes you sell and the factory confirms what is feasible.' },
            },
            {
              '@type': 'Question',
              name: `What is the minimum order for ${page.inch}-inch forged wheels?`,
              acceptedAnswer: { '@type': 'Answer', text: 'Programs can start from a single sample set so you can inspect finish and fitment before committing to volume. Dealer and distributor pricing is quoted per fitment list and volume.' },
            },
            {
              '@type': 'Question',
              name: 'Are these wheels tested?',
              acceptedAnswer: { '@type': 'Answer', text: 'Structural testing runs on JWTC-accredited equipment for dynamic cornering fatigue, radial fatigue and impact. Reports are issued per part number and shared with the order.' },
            },
          ],
        }}
      />
      <PageHero
        eyebrow={`${page.label} diameter`}
        title={`${page.inch}-inch forged wheels`}
        lead={`${page.applications} Machined from 6061-T6 to your width, offset, PCD and centre bore.`}
        image={HERO_BG}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Series available in {page.label}</span>
          <h2>{page.series.length} programs can be built in {page.inch} inch</h2>
          <p className="lede">Sizes below are the factory range for each series. Your exact width and offset are set by the order.</p>
        </Reveal>
        <div className="series-grid">
          {page.series.map((s) => (
            <Link className="series-card" to={`/products/${s.slug}`} key={s.slug} onClick={() => trackEvent('series_open', { series: s.slug, link_location: `size_${page.slug}`, page_path: window.location.pathname })}>
              <div className="series-card-body">
                <span className="series-card-code">{s.sizeRange}</span>
                <span className="series-card-name">{s.name}</span>
                <span className="series-card-range">{s.tagline || 'Forged to order'}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="series-intro">
          <Reveal>
            <span className="eyebrow">Before you ask for a price</span>
            <h2>What to specify for {page.inch}-inch</h2>
            <ul className="check-list">
              {SIZE_SPEC_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="product-info-actions">
              <a className="btn btn-primary btn-lg" href={whatsAppUrl(waMessage)} target="_blank" rel="noreferrer" onClick={() => trackEvent('request_quote', { size: page.label, link_location: 'size_page', page_path: window.location.pathname })}>
                <MessageCircle size={17} /> Quote {page.inch}&quot; on WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/forged-wheels-by-size">Other diameters</Link>
            </div>
          </Reveal>
          <Reveal className="series-intro-spec">
            <div className="spec-cell">
              <span className="spec-value">{page.label}</span>
              <span className="spec-label">Diameter</span>
            </div>
            <div className="spec-cell">
              <span className="spec-value">6061-T6</span>
              <span className="spec-label">Forged aluminium</span>
            </div>
            <div className="spec-cell">
              <span className="spec-value">MOQ 1</span>
              <span className="spec-label">Sample set</span>
            </div>
            <div className="spec-cell">
              <span className="spec-value">VIA / JWTC</span>
              <span className="spec-label">Accredited test lab</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Next steps</span>
          <h2>Where buyers usually go next</h2>
        </Reveal>
        <div className="series-grid">
          <Link className="series-card" to="/fitment">
            <div className="series-card-body">
              <span className="series-card-code">Fitment</span>
              <span className="series-card-name">Confirm PCD, offset and bore</span>
              <span className="series-card-range">Six numbers we lock before production</span>
            </div>
          </Link>
          <Link className="series-card" to="/wholesale">
            <div className="series-card-body">
              <span className="series-card-code">Wholesale</span>
              <span className="series-card-name">Dealer and distributor pricing</span>
              <span className="series-card-range">Mixed-model orders and repeat programs</span>
            </div>
          </Link>
          <Link className="series-card" to="/guides/inspection-before-shipment">
            <div className="series-card-body">
              <span className="series-card-code">Guide</span>
              <span className="series-card-name">Inspection before shipment</span>
              <span className="series-card-range">What to check on the QC report</span>
            </div>
          </Link>
        </div>
        <Reveal className="cred-foot" style={{ marginTop: 'var(--space-8)' }}>
          <span className="cred-foot-note">
            <Check size={14} /> {SIZE_PAGES.length} diameter pages · <Check size={14} /> Sizes taken from the factory series ranges
          </span>
          <a className="btn btn-ghost" href={whatsAppUrl(waMessage)} target="_blank" rel="noreferrer" onClick={() => trackEvent('whatsapp_click', { link_location: 'size_page_foot', page_path: window.location.pathname })}>
            Chat with the factory <ArrowRight size={15} />
          </a>
        </Reveal>
      </section>

      <CtaBand headline={`${page.inch}-inch forged wheels, quoted by the factory`} sub="Send your fitment list and volume — pricing and lead time come back in one message." />
    </>
  );
}
