import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import { PROCESS_STEPS } from '../data/facts.js';
import { CERTS, EXPIRED_CERTS, TEST_REPORTS } from '../data/certs.js';
import { HERO_BG, FACTORY } from '../data/images.js';

const CAPABILITY_FACTS = [
  { value: '6061-T6', label: 'Forged aluminum' },
  { value: '15"–30"', label: 'Size range' },
  { value: '5', label: 'Wheel series' },
  { value: 'OEM / ODM', label: 'Export programs' },
];

const GALLERY = [
  { src: FACTORY.floor, caption: 'Production floor' },
  { src: FACTORY.machining, caption: 'CNC machining' },
  { src: FACTORY.warehouse, caption: 'Warehouse & finished stock' },
  { src: FACTORY.line, caption: 'Conveyor finishing line' },
];

export default function AboutFactory() {
  return (
    <>
      <Seo
        title="Factory — ForgeAlloy Forged Wheel Manufacturer, Shandong China"
        description="ForgeAlloy Racing Tech — a 6061-T6 forged wheel factory in Shandong, China. Process, capability facts and certification status."
      />
      <PageHero
        eyebrow="Factory"
        title="Shandong Forgealloy Racing Tech"
        lead="A forged-wheel manufacturing operation built around one standard: 6061-T6. Factory photos and certification records below — verified August 2026."
        image={HERO_BG}
      />

      <section className="section container factory-story">
        <Reveal>
          <span className="eyebrow">Who we are</span>
          <h2>One forge, one standard</h2>
          <p className="lede">
            ForgeAlloy designs and manufactures alloy wheels for the global aftermarket and OEM programs — passenger, race, off-road/SUV, pickup and wire-spoke series. Forged wheels start as 6061 billet and finish as a QC'd, export-packed wheel.
          </p>
          <p>
            Founding year, factory area and equipment list are being verified — they will be published here with the factory's confirmation. What we state now is limited to what is already verified: forged 6061-T6 construction, five product series, and OEM/ODM export capability.
          </p>
          <p>
             Certification and compliance claims are shown only where current supporting records are on file. Ask for the certificate, inspection record or test-equipment accreditation that applies to your target product and order.
          </p>
        </Reveal>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">On the floor</span>
          <h2>Factory photos</h2>
        </Reveal>
        <div className="factory-gallery">
          {GALLERY.map((g) => (
            <figure className="factory-photo" key={g.caption}>
              <img src={g.src} alt={`ForgeAlloy factory — ${g.caption}`} loading="lazy" referrerPolicy="no-referrer" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Capability facts</span>
          <h2>Verified numbers</h2>
        </Reveal>
        <div className="spec-table">
          {CAPABILITY_FACTS.map((f) => (
            <div className="spec-cell" key={f.label}>
              <span className="spec-value">{f.value}</span>
              <span className="spec-label">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Process</span>
          <h2>How wheels are made here</h2>
        </Reveal>
        <div className="oem-process">
          {PROCESS_STEPS.map((s) => (
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
          <span className="eyebrow">Certifications</span>
          <h2>DOT / NHTSA and VIA accreditations first</h2>
        </Reveal>
        <div className="certs-row">
          {CERTS.map((c) => (
            <div className="cert-card" key={c.name}>
              <div className="cert-card-head">
                <span className="cert-card-name">{c.name}</span>
                {c.status === 'renewal'
                  ? <span className="pending-chip">Renewal in verification</span>
                  : <span className="cert-status valid">Valid</span>}
              </div>
              <span className="cert-card-number">{c.number}</span>
              <span className="cert-card-issuer">{c.issuer}</span>
              <span className="cert-card-scope">{c.scope}</span>
              <span className="cert-card-date">
                Issued {c.issued}
                {c.validUntil ? ` · Valid until ${c.validUntil}` : ''}
              </span>
            </div>
          ))}
        </div>
        {EXPIRED_CERTS.length > 0 && (
          <div className="certs-row certs-row-muted">
            {EXPIRED_CERTS.map((c) => (
              <div className="cert-card" key={c.name}>
                <div className="cert-card-head">
                  <span className="cert-card-name">{c.name}</span>
                  <span className="pending-chip">Expired {c.validUntil}</span>
                </div>
                <span className="cert-card-number">{c.number}</span>
                <span className="cert-card-issuer">{c.issuer}</span>
                <span className="cert-card-scope">{c.scope}</span>
              </div>
            ))}
          </div>
        )}
        <p className="muted-note">
          Transcribed from factory certificate documents. The DOT / NHTSA entry is the designation of a U.S. agent for service of process — a U.S. market entry requirement recorded with NHTSA, not a certificate issued by the agency: under 49 CFR Part 571 the DOT marking is a certification made by the manufacturer. Current certificate copies and the full test reports are available from sales on request.
        </p>
      </section>

      <section className="section container">
        <Reveal className="section-head">
          <span className="eyebrow">Test reports</span>
          <h2>Structural test reports, issued per part number</h2>
          <p className="lede">New forgings are validated on the JWTC-accredited equipment before shipment. Two reports for MB797 are shown below; equivalents are issued per model.</p>
        </Reveal>
        <div className="report-grid">
          {TEST_REPORTS.map((r) => (
            <article className="report-card" key={r.id}>
              <a className="report-media" href={r.image} target="_blank" rel="noreferrer">
                <img src={r.image} alt={`${r.title} report for ${r.model}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              </a>
              <div className="report-body">
                <span className="report-standard">{r.standard} standard</span>
                <h3>{r.title} — {r.model}</h3>
                <span className="report-spec">{r.spec}</span>
                <span className="report-line"><strong>Parameters: </strong>{r.parameters}</span>
                <span className="report-line"><strong>Result: </strong>{r.result}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="muted-note">
          Reports shown for MB797 (19×9.5, 5×120, ET28, 690 kg design load) — the sample carries the test technician's name and internal test numbers, as issued by the laboratory. Ask sales for the report matching your target part number.
        </p>
      </section>

      <CtaBand headline="Verify before you buy" sub="Ask for the current certification records and QC process — we answer in writing." />
    </>
  );
}
