import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { SIZE_PAGES } from '../data/sizes.js';
import { HERO_BG } from '../data/images.js';
import { whatsAppUrl } from '../lib/whatsapp.js';
import { trackEvent } from '../lib/analytics.js';

const WA_MESSAGE = 'Hello ForgeAlloy, I am looking for forged wheels by size. Please advise on availability and pricing.';

export default function SizesHub() {
  return (
    <>
      <Seo
        title="Forged Wheels by Size | 17–30 inch Custom Forged Rims — ForgeAlloy"
        description="Custom forged wheels by diameter: 19, 20, 21 and 22 inch programs built to your width, offset, PCD and centre bore. Factory direct, MOQ from 1."
      />
      <PageHero
        eyebrow="By size"
        title="Forged wheels by diameter"
        lead="Every set is machined to your width, offset, PCD and centre bore. Start from the diameter you sell most."
        image={HERO_BG}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Pick a diameter</span>
          <h2>Which size do you need?</h2>
        </Reveal>
        <div className="series-grid">
          {SIZE_PAGES.map((page) => (
            <Link className="series-card" to={`/forged-wheels-by-size/${page.slug}`} key={page.slug} onClick={() => trackEvent('size_page_open', { size: page.label, link_location: 'hub', page_path: window.location.pathname })}>
              <div className="series-card-body">
                <span className="series-card-code">{page.label}</span>
                <span className="series-card-name">{page.inch}-inch forged wheels</span>
                <span className="series-card-range">{page.series.length} series available</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="series-intro">
          <Reveal>
            <span className="eyebrow">Beyond these four</span>
            <h2>Our full diameter range</h2>
            <p className="lede">The factory builds forged wheels from 13&quot; to 30&quot; depending on the series — wire wheels start at 13&quot;, pickups run to 30&quot;.</p>
            <div className="product-info-actions">
              <a className="btn btn-primary" href={whatsAppUrl(WA_MESSAGE)} target="_blank" rel="noreferrer" onClick={() => trackEvent('whatsapp_click', { link_location: 'sizes_hub', page_path: window.location.pathname })}>
                <MessageCircle size={16} /> Ask about a diameter
              </a>
              <Link className="btn btn-ghost" to="/wholesale" onClick={() => trackEvent('catalog_nav_click', { link_location: 'sizes_hub', page_path: window.location.pathname })}>
                Wholesale program <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal className="series-intro-spec">
            <Link className="link-inline" to="/products">Browse all series and models <ArrowRight size={14} /></Link>
            <Link className="link-inline" to="/fitment">Fitment check before you order <ArrowRight size={14} /></Link>
            <Link className="link-inline" to="/private-label">Private-label program <ArrowRight size={14} /></Link>
          </Reveal>
        </div>
      </section>

      <CtaBand headline="Need a diameter that is not listed?" sub="Send your target size and volume — the factory quotes it directly." />
    </>
  );
}
