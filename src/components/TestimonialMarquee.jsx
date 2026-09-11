// Scrolling customer-review marquee. Renders nothing when no verified reviews exist.
import { hasTestimonials, TESTIMONIALS } from '../data/testimonials.js';

function Card({ t }) {
  return (
    <div className="testimonial-card" data-component="testimonial-card">
      <p className="testimonial-quote">{t.quote}</p>
      <div className="testimonial-meta">
        <span>{t.name || 'Verified buyer'}{t.company ? ` · ${t.company}` : ''}</span>
        <span>{t.country || ''}{t.channel ? ` · ${t.channel}` : ''}</span>
      </div>
    </div>
  );
}

export default function TestimonialMarquee() {
  if (!hasTestimonials) return null;
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="testimonial-marquee" data-component="testimonial-marquee">
      {doubled.map((t, i) => <Card key={i} t={t} />)}
    </div>
  );
}
