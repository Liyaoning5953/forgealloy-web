const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();

export function initAnalytics() {
  if (!GTM_ID || typeof document === 'undefined') return;
  if (!/^GTM-[A-Z0-9]+$/i.test(GTM_ID)) {
    console.warn('VITE_GTM_ID is not a valid GTM container ID.');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.prepend(noscript);
}

export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return;
  const safeParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...safeParams });
}
