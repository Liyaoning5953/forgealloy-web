// Measurement IDs are public identifiers that appear in every page's HTML, so the
// site's own GA4 stream is the default; a build-time variable overrides it.
const DEFAULT_GA4_ID = 'G-E9YDPGMC8N';

const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();
const GA4_ID = (import.meta.env.VITE_GA4_ID || DEFAULT_GA4_ID).trim();

const GTM_PATTERN = /^GTM-[A-Z0-9]+$/i;
const GA4_PATTERN = /^G-[A-Z0-9]+$/i;

// Which loader is active: 'gtm', 'ga4' or 'none'.
let mode = 'none';

function validGtmId() {
  return GTM_ID && GTM_PATTERN.test(GTM_ID) ? GTM_ID : null;
}

function validGa4Id() {
  return GA4_ID && GA4_PATTERN.test(GA4_ID) ? GA4_ID : null;
}

function loadGtm(id) {
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.prepend(noscript);
}

function loadGa4(id) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are reported by reportRouteView for the initial load and for every
  // client-side route change, so GA4's own automatic page_view is switched off to
  // avoid counting each navigation twice.
  window.gtag('config', id, { send_page_view: false });
}

// Configures measurement. A GTM container wins when both IDs are present.
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // The queue exists even before an ID is configured, so nothing pushed while
  // measurement is being set up is lost.
  window.dataLayer = window.dataLayer || [];

  const gtmId = validGtmId();
  if (gtmId) {
    mode = 'gtm';
    loadGtm(gtmId);
    return;
  }

  const ga4Id = validGa4Id();
  if (ga4Id) {
    mode = 'ga4';
    loadGa4(ga4Id);
    return;
  }

  if (GTM_ID) console.warn('VITE_GTM_ID is not a valid GTM container ID.');
  if (GA4_ID) console.warn('VITE_GA4_ID is not a valid GA4 measurement ID.');
}

// SPA route change: the first load is reported by the loader itself, so we only
// report client-side navigations after that.
export function trackPageView(path, title) {
  if (typeof window === 'undefined') return;
  const payload = {
    page_path: path,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
    page_location: window.location.href,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'page_view', ...payload });

  if (mode === 'ga4' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', payload);
  }
}

// Called by the component that writes the page title, so the reported title is the
// new page's title even when the page chunk loads asynchronously. The first call of a
// session reports the landing page (GA4's own page_view is switched off for that
// reason); repeat calls for the same path are ignored so one route is counted once.
let lastReportedPath = null;

export function reportRouteView(path, title) {
  if (typeof window === 'undefined') return;
  if (lastReportedPath === path) return;
  lastReportedPath = path;
  trackPageView(path, title);
}

export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return;
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...safeParams });

  if (mode === 'ga4' && typeof window.gtag === 'function') {
    window.gtag('event', event, safeParams);
  }
}
