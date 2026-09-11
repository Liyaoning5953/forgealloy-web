import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Download, User, Search } from 'lucide-react';
import Logo from './Logo.jsx';
import { SERIES } from '../data/series.js';
import { CONTACT } from '../data/contact.js';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [seriesOpen, setSeriesOpen] = useState(false);
  const close = () => { setOpen(false); setSeriesOpen(false); };
  const navLinkCls = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <header className="site-nav" data-component="site-nav">
      <div className="nav-top">
        <div className="container nav-top-inner">
          <span className="nav-top-tagline">Forged performance. Built without compromise.</span>
          <div className="nav-top-links">
            <Link to="/dealer-program"><User size={13} /> Dealer</Link>
            <Link to="/products"><Download size={13} /> Download catalog</Link>
            <a href={`tel:${CONTACT.whatsapp ? '+' + CONTACT.whatsapp : ''}`}><Phone size={13} /> {CONTACT.whatsappDisplay || '+86 178 6062 5953'}</a>
          </div>
        </div>
      </div>

      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          <span className="brand-text">
            <span className="wordmark-main">FORGEALLOY</span>
            <span className="wordmark-sub">FORGED ALLOY WHEELS</span>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Main">
          <NavLink to="/" className={navLinkCls} end>Home</NavLink>
          <div className="nav-drop">
            <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Wheels <ChevronDown size={14} className="nav-chev" />
            </NavLink>
            <div className="nav-drop-panel">
              <Link to="/products" onClick={close}>All models</Link>
              {SERIES.map((s) => (
                <Link key={s.slug} to={`/series/${s.slug}`} onClick={close}>{s.name}</Link>
              ))}
            </div>
          </div>
          <NavLink to="/gallery" className={navLinkCls}>Gallery</NavLink>
          <NavLink to="/oem-odm" className={navLinkCls}>OEM / ODM</NavLink>
          <NavLink to="/about-factory" className={navLinkCls}>About us</NavLink>
          <NavLink to="/dealer-program" className={navLinkCls}>Dealer</NavLink>
          <NavLink to="/contact" className={navLinkCls}>Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/contact" className="btn btn-primary nav-cta"><Search size={14} className="nav-cta-icon" /> Inquiry now</Link>
          <button type="button" className="nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav-mobile" aria-label="Mobile" onClick={close}>
          <div className="container nav-mobile-inner">
            <NavLink to="/" end className={navLinkCls}>Home</NavLink>
            <NavLink to="/products" className={navLinkCls}>Wheels — all models</NavLink>
            {SERIES.map((s) => (
              <NavLink key={s.slug} to={`/series/${s.slug}`} className={navLinkCls}>{s.name}</NavLink>
            ))}
            <NavLink to="/gallery" className={navLinkCls}>Gallery</NavLink>
            <NavLink to="/oem-odm" className={navLinkCls}>OEM / ODM</NavLink>
            <NavLink to="/about-factory" className={navLinkCls}>About us</NavLink>
            <NavLink to="/dealer-program" className={navLinkCls}>Dealer</NavLink>
            <NavLink to="/guides" className={navLinkCls}>Guides</NavLink>
            <NavLink to="/faq" className={navLinkCls}>FAQ</NavLink>
            <Link to="/contact" className="btn btn-primary nav-mobile-cta">Inquiry now</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
