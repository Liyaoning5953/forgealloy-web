import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { getGuide, GUIDES } from '../data/guides.js';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="article-h2">{block.text}</h2>;
    case 'pull':
      return <blockquote className="article-pull">{block.text}</blockquote>;
    default:
      return <p className="article-p">{block.text}</p>;
  }
}

export default function GuidePost() {
  const { slug } = useParams();
  const guide = getGuide(slug);
  if (!guide) return <NotFound title="Guide not found" backTo="/guides" backLabel="Back to guides" />;
  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${guide.title} | ForgeAlloy`}
        description={guide.excerpt}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          datePublished: guide.date,
          author: { '@type': 'Organization', name: 'ForgeAlloy' },
        }}
      />

      <article className="article" data-component="article-body">
        <header className="article-header container" data-component="article-header">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/guides">Guides</Link> <span className="crumb-sep">/</span>
            <span>{guide.category}</span>
          </nav>
          <span className="eyebrow">{guide.category} · {guide.date}</span>
          <h1>{guide.title}</h1>
          <p className="lede">{guide.excerpt}</p>
          <span className="article-byline">ForgeAlloy Engineering Team</span>
        </header>

        <div className="article-hero container">
          <img src={guide.cover} alt="" referrerPolicy="no-referrer" />
        </div>

        <div className="container article-prose">
          {guide.body.map((b, i) => <Block key={i} block={b} />)}
        </div>

        <section className="container article-related">
          <Reveal className="section-head">
            <span className="eyebrow">Keep reading</span>
            <h2>Related guides</h2>
          </Reveal>
          <div className="guide-teaser-grid">
            {related.map((g) => (
              <Link to={`/guides/${g.slug}`} className="article-card" key={g.slug}>
                <div className="article-card-media">
                  <img src={g.cover} alt="" loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div className="article-card-body">
                  <span className="article-card-cat">{g.category}</span>
                  <h3>{g.title}</h3>
                  <p>{g.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <CtaBand headline="Spec it right, order it once" sub="Send your vehicle or target fitment — our engineers confirm before we quote." />
    </>
  );
}
