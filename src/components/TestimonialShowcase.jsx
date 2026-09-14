import { Star } from 'lucide-react';
import { hasTestimonials, TESTIMONIALS } from '../data/testimonials.js';
import Reveal from './Reveal.jsx';

// Premium testimonial showcase: header stat + edge-faded scrolling marquee.
// Cards carry 5-star rating, monogram avatar and buyer meta.

function initials(name) {
  if (!name) return '★';
  return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

function Card({ t }) {
  return (
    <div className="testimonial-card" data-component="testimonial-card">
      <div className="testimonial-stars" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
      </div>
      <p className="testimonial-quote">{t.quote}</p>
      <div className="testimonial-meta">
        <span className="testimonial-person">
          <span className="testimonial-avatar" aria-hidden="true">{initials(t.name)}</span>
          <span>
            <strong>{t.name || 'Verified buyer'}</strong>
            <em>{t.country || ''}</em>
          </span>
        </span>
        <span className="testimonial-channel">{t.channel || ''}</span>
      </div>
    </div>
  );
}

export default function TestimonialShowcase() {
  if (!hasTestimonials) return null;
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="testimonial-section" data-component="testimonials">
      <div className="container testimonial-head">
        <Reveal className="testimonial-head-copy">
          <span className="eyebrow">Customer reviews</span>
          <h2>What buyers say</h2>
        </Reveal>
        <Reveal delay={80} className="testimonial-stat">
          <span className="testimonial-stat-value">{TESTIMONIALS.length}</span>
          <span className="testimonial-stat-label">Buyer review excerpts reproduced from storefront evidence on file</span>
        </Reveal>
      </div>
      <div className="testimonial-marquee" data-component="testimonial-marquee">
        {doubled.map((t, i) => <Card key={`${t.name}-${i}`} t={t} />)}
      </div>
    </section>
  );
}
