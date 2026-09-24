import { useEffect } from 'react';
import { reportRouteView } from '../lib/analytics.js';

const SITE_URL = 'https://forgealloyracing.com';

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
}

// Per-page SEO: title, description, canonical URL, robots and optional JSON-LD.
export default function Seo({ title, description, jsonLd, canonicalPath, robots = 'index,follow', image }) {
  useEffect(() => {
    const path = canonicalPath || window.location.pathname;
    const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
    const canonicalUrl = new URL(normalizedPath, SITE_URL).href;

    if (title) document.title = title;
    if (description) upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    if (title) upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    if (description) upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    if (image) upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Report the route only after the title for this page has been written, so the
    // analytics title always matches the page the visitor is looking at.
    reportRouteView(`${window.location.pathname}${window.location.search}`, title || document.title);

    // The prerendered copy of this page ships with the structured data already in
    // the head. Drop it before writing a fresh one so the head never carries two
    // copies of the same markup.
    document.head.querySelectorAll('script[data-page-jsonld="true"]').forEach((node) => node.remove());

    let script = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.pageJsonld = 'true';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, jsonLd, canonicalPath, robots, image]);

  return null;
}
