import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import DirectContact from '../components/DirectContact.jsx';
import { HERO_BG } from '../data/images.js';

export default function Contact() {
  const [params] = useSearchParams();
  const model = params.get('model');
  const interest = params.get('interest');

  const context = model
    ? `Hello ForgeAlloy, I would like a quote for model ${model.toUpperCase()}. Please send pricing and lead time.`
    : interest
      ? `Hello ForgeAlloy, I would like to request ${interest.replace(/-/g, ' ')}.`
      : '';

  return (
    <>
      <Seo
        title="Contact — Chat with ForgeAlloy Sales on WhatsApp"
        description="Message ForgeAlloy sales directly on WhatsApp for forged wheel pricing, lead time and OEM programs. No form needed — one tap starts the conversation."
      />
      <PageHero
        eyebrow="Contact"
        title="Chat with us directly"
        lead="No form, no waiting. Tap WhatsApp and your message is ready to send — our sales team replies with pricing, lead time and next steps."
        image={HERO_BG}
      />

      <section className="section container">
        <DirectContact context={context} />
      </section>
    </>
  );
}
