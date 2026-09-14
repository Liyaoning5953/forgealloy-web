import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound({ title = 'Page not found', backTo = '/', backLabel = 'Back to homepage' }) {
  return (
    <section className="section container">
      <Seo
        title={`${title} | ForgeAlloy`}
        description="The requested ForgeAlloy page could not be found."
        robots="noindex,follow"
      />
      <span className="eyebrow">404</span>
      <h1>{title}</h1>
      <p className="lede">The requested page may have moved or the address may be incorrect.</p>
      <Link to={backTo} className="btn btn-primary">{backLabel}</Link>
    </section>
  );
}
