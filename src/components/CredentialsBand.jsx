import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { CERTS, TEST_REPORTS } from '../data/certs.js';
import { trackEvent } from '../lib/analytics.js';

// Homepage credentials band — placed directly under the hero so a first-time
// visitor sees the compliance documents and the test reports without scrolling far.
export default function CredentialsBand() {
  const documented = CERTS.filter((c) => c.image);

  return (
    <section className="cred-band" data-component="credentials">
      <div className="container">
        <Reveal className="cred-head">
          <span className="eyebrow">Credentials</span>
          <h2>Documents you can check before you ask</h2>
          <span className="cred-head-note">
            Certificates and test reports on file — click any document to open the full copy.
          </span>
        </Reveal>

        <div className="cred-docs">
          {documented.map((c, i) => (
            <Reveal key={c.name} delay={i * 70} className="cred-doc">
              <a className="cred-doc-media" href={c.image} target="_blank" rel="noreferrer" onClick={() => trackEvent('credential_open', { document: c.shortName || c.name, page_path: window.location.pathname })}>
                <img src={c.image} alt={`${c.name} certificate`} loading="eager" decoding="async" referrerPolicy="no-referrer" />
              </a>
              <div className="cred-doc-body">
                <span className="cred-doc-tag"><ShieldCheck size={13} /> {c.status === 'valid' ? 'In force' : 'Renewal in progress'}</span>
                <h3>{c.name}</h3>
                <span className="cred-doc-meta">{c.issuer}</span>
                <span className="cred-doc-meta">{c.number}</span>
                <span className="cred-doc-meta">
                  {c.validUntil ? `Valid to ${c.validUntil}` : `Recorded ${c.issued}`}
                </span>
              </div>
            </Reveal>
          ))}

          {TEST_REPORTS.map((r, i) => (
            <Reveal key={r.id} delay={(documented.length + i) * 70} className="cred-doc">
              <a className="cred-doc-media" href={r.image} target="_blank" rel="noreferrer">
                <img src={r.image} alt={`${r.title} report for ${r.model}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              </a>
              <div className="cred-doc-body">
                <span className="cred-doc-tag"><ShieldCheck size={13} /> {r.standard} test report</span>
                <h3>{r.title}</h3>
                <span className="cred-doc-meta">{r.model} · {r.spec}</span>
                <span className="cred-doc-meta">{r.result}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="cred-foot">
          <span className="cred-foot-note">
            DOT / NHTSA listing is the designation of a U.S. agent for service of process (49 CFR Part 551 Subpart D); under 49 CFR Part 571 the DOT marking is a certification made by the manufacturer. Test reports are issued per part number.
          </span>
          <Link className="btn btn-ghost" to="/about-factory" onClick={() => trackEvent('credential_open', { document: 'factory_page', page_path: window.location.pathname })}>
            All certificates and reports <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
