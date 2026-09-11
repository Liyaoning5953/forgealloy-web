import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { FAQ_GROUPS } from '../data/faqs.js';
import { HERO_BG } from '../data/images.js';

const FLATTENED = FAQ_GROUPS.flatMap((g) => g.items.map((i) => ({ ...i, group: g.group })));

export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FLATTENED.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <>
      <Seo
        title="FAQ — MOQ, Lead Time, Fitment, Shipping | ForgeAlloy"
        description="Ordering, MOQ and lead time, shipping and payment, OEM and custom programs, and fitment questions for ForgeAlloy forged wheels."
        jsonLd={jsonLd}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        lead="Ordering, MOQ, lead time, shipping, fitment and custom programs. Unverified numbers stay marked — ask sales for the exact quote on your configuration."
        image={HERO_BG}
      />

      <section className="section container">
        <FaqAccordion />
      </section>

      <CtaBand headline="Still have questions?" sub="Ask us directly — every question gets a written answer, including the numbers we do not publish." />
    </>
  );
}
