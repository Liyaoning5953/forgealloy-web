import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SERIES } from '../data/series.js';
import { CONTACT } from '../data/contact.js';
import TrustBar from './TrustBar.jsx';

const BUYER_TYPES = ['Dealer / distributor', 'Workshop / retailer', 'Racing team', 'E-commerce seller', 'OEM / ODM', 'Other'];

// Client-side validated inquiry form. No backend connected — on submit we show
// a success panel with next steps and the verified delivery channels.
export default function InquiryForm({ prefill = '' }) {
  const [form, setForm] = useState({
    name: '', company: '', country: '', email: '', whatsapp: '',
    buyerType: '', interest: [], quantity: '', message: prefill || '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox'
      ? (e.target.checked ? [...form.interest, e.target.value] : form.interest.filter((x) => x !== e.target.value))
      : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (f) => {
    const er = {};
    if (!f.name.trim()) er.name = 'Full name is required.';
    if (!f.email.trim()) er.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Enter a valid email address.';
    if (!f.message.trim()) er.message = 'Tell us what you need — series, sizes, quantities.';
    return er;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate(form);
    setErrors(er);
    if (Object.keys(er).length) {
      const first = document.querySelector('.inquiry-form [aria-invalid="true"]');
      if (first) first.focus();
      return;
    }
    setSending(true);
    // Simulated delivery handoff — no backend connected yet.
    setTimeout(() => { setSending(false); setSubmitted(true); }, 400);
  };

  if (submitted) {
    return (
      <div className="inquiry-success" role="status" data-component="inquiry-success">
        <span className="eyebrow">Inquiry received</span>
        <h3>Your inquiry is ready for our sales team.</h3>
        <p>Here is what happens next: our sales team reviews your request and replies with pricing and lead time for your configuration.</p>
        <p className="success-note">
          Sales response time: {CONTACT.salesReplyHours ? `within ${CONTACT.salesReplyHours} business hours` : 'pending verification'}.
          {!CONTACT.email && !CONTACT.whatsapp && ' Contact channels are being configured — the factory will confirm them shortly.'}
        </p>
        <div className="success-actions">
          {CONTACT.whatsapp && (
            <a className="btn btn-primary" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
              Continue on WhatsApp
            </a>
          )}
          <button type="button" className="btn btn-ghost" onClick={() => { setSubmitted(false); setForm((f) => ({ ...f, message: '' })); }}>
            Edit inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="inquiry-form" data-component="inquiry-form" onSubmit={onSubmit} noValidate>
      <TrustBar className="inquiry-trust" />

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-name">Full name *</label>
          <input id="f-name" type="text" value={form.name} onChange={set('name')} required aria-invalid={!!errors.name} />
          {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="f-company">Company</label>
          <input id="f-company" type="text" value={form.company} onChange={set('company')} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-email">Work email *</label>
          <input id="f-email" type="email" inputMode="email" value={form.email} onChange={set('email')} required aria-invalid={!!errors.email} />
          {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="f-wa">WhatsApp (with country code)</label>
          <input id="f-wa" type="tel" inputMode="tel" placeholder="+86 ..." value={form.whatsapp} onChange={set('whatsapp')} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-country">Country</label>
          <input id="f-country" type="text" value={form.country} onChange={set('country')} />
        </div>
        <div className="form-field">
          <label htmlFor="f-buyer">Buyer type</label>
          <select id="f-buyer" value={form.buyerType} onChange={set('buyerType')}>
            <option value="">Select…</option>
            {BUYER_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="form-field">
        <span className="form-label-static">Product interest</span>
        <div className="chip-row">
          {SERIES.map((s) => (
            <label className={`chip${form.interest.includes(s.slug) ? ' on' : ''}`} key={s.slug}>
              <input type="checkbox" value={s.slug} checked={form.interest.includes(s.slug)} onChange={set('interest')} />
              {s.code.replace(' SERIES', '')}
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="f-qty">Estimated quantity</label>
          <input id="f-qty" type="text" placeholder="e.g. 20 sets / 1 container" value={form.quantity} onChange={set('quantity')} />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="f-msg">Message *</label>
        <textarea id="f-msg" rows={4} value={form.message} onChange={set('message')} required aria-invalid={!!errors.message}
          placeholder="Series, sizes, offset / PCD, finishes, destination port…" />
        {errors.message && <span className="form-error" role="alert">{errors.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-lg form-submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send inquiry'} <ArrowRight size={16} />
      </button>
    </form>
  );
}
