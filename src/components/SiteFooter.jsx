import { Link } from 'react-router-dom';
import { SERIES } from '../data/series.js';
import { BRAND, LEGAL_NAME } from '../data/facts.js';
import { CERTS } from '../data/certs.js';
import { CONTACT } from '../data/contact.js';

export default function SiteFooter() {
  const contact = CONTACT.email ? CONTACT.email : 'sales contact — pending verification';
  return (
    <footer className="site-footer" data-component="site-footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <div className="wordmark">
            <span className="wordmark-main">{BRAND.toUpperCase()}</span>
            <span className="wordmark-sub">FORGED ALLOY WHEELS</span>
          </div>
          <p>Precision 6061-T6 forged wheels for dealers, tuners, race teams and OEM programs — designed in Shandong, shipped worldwide.</p>
        </div>

        <div className="footer-col">
          <h4>Products</h4>
          <Link to="/products">All models</Link>
          {SERIES.map((s) => (
            <Link key={s.slug} to={`/series/${s.slug}`}>{s.name}</Link>
          ))}
          <Link to="/accessories">Accessories</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about-factory">Factory</Link>
          <Link to="/oem-odm">OEM / ODM</Link>
          <Link to="/dealer-program">Dealer program</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <span className="footer-line">{contact}</span>
          <span className="footer-line">WhatsApp: {CONTACT.whatsapp ? CONTACT.whatsappDisplay : 'pending verification'}</span>
          <span className="footer-line">{CONTACT.address || 'Factory address — pending verification'}</span>
        </div>
      </div>

      <div className="container footer-meta">
        <span>© {new Date().getFullYear()} {LEGAL_NAME}.</span>
        <span className="footer-certs">{CERTS.map((c) => c.name).join(' · ')}</span>
      </div>
    </footer>
  );
}
