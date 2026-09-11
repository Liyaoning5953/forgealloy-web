import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_GROUPS } from '../data/faqs.js';

export default function FaqAccordion() {
  const [open, setOpen] = useState(null); // index key `${gi}-${ii}`

  return (
    <div className="faq-accordion" data-component="faq-accordion">
      {FAQ_GROUPS.map((g, gi) => (
        <div className="faq-group" key={g.group}>
          <h3 className="faq-group-title">{g.group}</h3>
          {g.items.map((item, ii) => {
            const key = `${gi}-${ii}`;
            const isOpen = open === key;
            return (
              <div className="faq-item" key={key}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                >
                  <span>{item.q}</span>
                  <ChevronDown size={18} className={`faq-chev${isOpen ? ' open' : ''}`} />
                </button>
                <div className={`faq-a${isOpen ? ' open' : ''}`} hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
