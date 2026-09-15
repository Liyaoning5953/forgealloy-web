import { useParams, Link } from 'react-router-dom';
import { Check, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import SpecTable from '../components/SpecTable.jsx';
import Reveal from '../components/Reveal.jsx';
import { ACCESSORIES, getAccessory } from '../data/accessories.js';
import { trackEvent } from '../lib/analytics.js';
import { whatsAppUrl } from '../lib/whatsapp.js';

export default function AccessoryDetail() {
  const { slug } = useParams();
  const a = getAccessory(slug);

  if (!a) {
    return (
      <section className="section container">
        <h1>Accessory not found</h1>
        <p className="lede"><Link to="/accessories">Back to accessories</Link></p>
      </section>
    );
  }

  const related = ACCESSORIES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${a.name} — ${a.price} ${a.priceUnit} | ForgeAlloy`}
        description={`${a.name}: ${a.summary}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: a.name,
          sku: a.sku,
          brand: { '@type': 'Brand', name: 'ForgeAlloy' },
          image: a.image,
          description: a.summary,
          offers: {
            '@type': 'Offer',
            price: '20.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        }}
      />

      <section className="product-hero section" data-component="accessory-hero">
        <div className="container product-hero-inner">
          <div className="product-gallery">
            <img src={a.image} alt={a.name} referrerPolicy="no-referrer" />
            <span className="product-gallery-code">{a.sku}</span>
          </div>
          <div className="product-info">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/accessories">Accessories</Link> <span className="crumb-sep">/</span>
              <span>{a.name}</span>
            </nav>
            <span className="eyebrow">{a.category} · {a.sku}</span>
            <h1>{a.name}</h1>
            <span className="price-tag price-tag-lg">{a.price} <em>{a.priceUnit}</em></span>
            <p className="lede">{a.summary}</p>
            <SpecTable rows={a.specs} />
            <div className="custom-chip-row">
              <span className="custom-chip"><Check size={13} /> MOQ {a.moq}</span>
              <span className="custom-chip"><Check size={13} /> Ships with wheel orders</span>
              <span className="custom-chip"><Check size={13} /> Export packing</span>
            </div>
            <div className="product-info-actions">
              <a
                className="btn btn-primary btn-lg"
                href={whatsAppUrl(`Hello ForgeAlloy, I would like a quote for ${a.name} (${a.sku}) at ${a.price} ${a.priceUnit}. Please confirm quantity, packing and freight.`)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('request_accessory_quote', { sku: a.sku, link_location: 'accessory_detail', page_path: window.location.pathname })}
              >
                <MessageCircle size={17} /> Chat about {a.sku}
              </a>
              <Link to={`/contact?item=${a.sku}`} className="btn btn-ghost btn-lg">Send an RFQ</Link>
            </div>
            <p className="custom-note">
              Price is per set. Freight, lead time and payment terms are confirmed on your quote — tell us the
              quantity and destination port.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">What you get</span>
          <h2>Built for the tyre change</h2>
        </Reveal>
        <div className="features-grid">
          {a.highlights.map((h) => (
            <div className="spec-cell" key={h.title}>
              <span className="spec-label">{h.title}</span>
              <p>{h.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section container">
          <Reveal className="section-head">
            <span className="eyebrow">Related</span>
            <h2>More accessories</h2>
          </Reveal>
          <div className="related-grid">
            {related.map((r) => (
              <Link to={`/accessories/${r.slug}`} className="related-card" key={r.slug}>
                <img src={r.image} alt={r.name} loading="lazy" referrerPolicy="no-referrer" />
                <span className="related-code">{r.sku}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBand
        headline={`Quote ${a.sku} with your wheels`}
        sub="Send the quantity and destination port — we confirm the set price and consolidate it into your wheel shipment."
        image={a.image}
      />
    </>
  );
}
