import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import ContactSidebar from '../components/ContactSidebar.jsx';
import { HERO_BG } from '../data/images.js';

export default function Contact() {
  const [params] = useSearchParams();
  const model = params.get('model');
  const interest = params.get('interest');
  const prefill = model
    ? `I would like a quote for model ${model.toUpperCase()}.`
    : interest
      ? `I would like to request ${interest.replace(/-/g, ' ')}.`
      : '';

  return (
    <>
      <Seo
        title="Contact — Request a Forged Wheel Quote | ForgeAlloy"
        description="Request pricing and lead time for ForgeAlloy forged wheels. Tell us series, sizes, fitment and quantity."
      />
      <PageHero
        eyebrow="Contact"
        title="Request a quote"
        lead="Series, sizes, offsets, finishes, quantity, destination — the more spec you send, the faster the quote comes back."
        image={HERO_BG}
      />

      <section className="section container inquiry-layout">
        <InquiryForm prefill={prefill} />
        <ContactSidebar />
      </section>
    </>
  );
}
