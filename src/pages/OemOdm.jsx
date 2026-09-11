import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { OEM_CAPABILITIES } from '../data/facts.js';
import { OEM_IMG } from '../data/images.js';

const OEM_PROCESS = [
  { n: '01', title: 'Brief & drawing', copy: 'Your drawing, reference model or target vehicle fitment defines the starting point.' },
  { n: '02', title: 'Sample approval', copy: 'Sample wheels produced and approved — fitment and finish locked before production.' },
  { n: '03', title: 'Production', copy: 'Forged, heat treated, machined and finished against the approved spec.' },
  { n: '04', title: 'QC & ship', copy: 'Dimension and balance checks, inspection records per order, export packing.' },
];

const CUSTOM_ROWS = [
  { option: 'Design', detail: 'From drawing, reference or target vehicle' },
  { option: 'Size / width', detail: '15"–30" range; confirm target with sales' },
  { option: 'Offset / PCD / CB', detail: 'Confirmed against vehicle data before quoting' },
  { option: 'Finish', detail: 'Matte, gloss, brushed, gunmetal, bronze, custom RAL' },
  { option: 'Branding', detail: 'Center caps, laser marking, packaging' },
];

export default function OemOdm() {
  return (
    <>
      <Seo
        title="OEM / ODM Custom Forged Wheel Manufacturing | ForgeAlloy"
        description="Custom 6061-T6 forged wheel programs for brands, wholesalers and dealers — design, sample, production, QC and private label from one factory."
      />
      <PageHero
        eyebrow="OEM / ODM"
        title="One-stop custom programs"
        lead="Custom design, sample development, finishes, private label and export packaging for global brands, wholesalers and dealers."
        image={OEM_IMG}
      />

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Capabilities</span>
          <h2>What we build with you</h2>
        </Reveal>
        <div className="features-grid">
          {OEM_CAPABILITIES.map((c) => (
            <div className="spec-cell" key={c.title}>
              <span className="spec-label">{c.title}</span>
              <p>{c.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Process</span>
          <h2>Four steps to your wheel</h2>
        </Reveal>
        <div className="oem-process">
          {OEM_PROCESS.map((s) => (
            <div className="oem-step" key={s.n}>
              <span className="process-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Customization</span>
          <h2>What you can change</h2>
        </Reveal>
        <div className="custom-table">
          {CUSTOM_ROWS.map((r) => (
            <div className="custom-row" key={r.option}>
              <span className="custom-option">{r.option}</span>
              <span className="custom-detail">{r.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="oem-cta-box">
          <span className="eyebrow">Start a program</span>
          <h2>Tell us the target — we handle the rest</h2>
          <p className="lede">Send your drawings, reference models or target vehicle list. We reply with feasibility, sample plan and pricing.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">Get OEM pricing <ArrowRight size={16} /></Link>
        </Reveal>
      </section>

      <CtaBand headline="Ready when you are" sub="OEM programs start with a conversation — send your target fitment and volume." />
    </>
  );
}
