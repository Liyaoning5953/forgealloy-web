import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';

import ScrollToTop from './components/ScrollToTop.jsx';
import SiteNav from './components/SiteNav.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import FloatingDock from './components/FloatingDock.jsx';

import { initAnalytics, trackPageView } from './lib/analytics.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const SeriesPage = lazy(() => import('./pages/SeriesPage.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Accessories = lazy(() => import('./pages/Accessories.jsx'));
const AccessoryDetail = lazy(() => import('./pages/AccessoryDetail.jsx'));
const OemOdm = lazy(() => import('./pages/OemOdm.jsx'));
const AboutFactory = lazy(() => import('./pages/AboutFactory.jsx'));
const Faq = lazy(() => import('./pages/Faq.jsx'));
const Guides = lazy(() => import('./pages/Guides.jsx'));
const GuidePost = lazy(() => import('./pages/GuidePost.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const DealerProgram = lazy(() => import('./pages/DealerProgram.jsx'));
const Wholesale = lazy(() => import('./pages/Wholesale.jsx'));
const PrivateLabel = lazy(() => import('./pages/PrivateLabel.jsx'));
const Fitment = lazy(() => import('./pages/Fitment.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

initAnalytics();

// Reports client-side route changes to the data layer (the first load is reported by GTM itself).
// The push is deferred so document.title has already been updated by the page's Seo effect.
function RouteAnalytics() {
  const location = useLocation();
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return undefined;
    }
    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteAnalytics />
      <ScrollToTop />
      <SiteNav />
      <main>
        <Suspense fallback={<div className="section container" role="status">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/series/:slug" element={<SeriesPage />} />
          <Route path="/products/:model" element={<ProductDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/accessories/:slug" element={<AccessoryDetail />} />
          <Route path="/oem-odm" element={<OemOdm />} />
          <Route path="/about-factory" element={<AboutFactory />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuidePost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dealer-program" element={<DealerProgram />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/private-label" element={<PrivateLabel />} />
          <Route path="/fitment" element={<Fitment />} />
          <Route path="/about" element={<NotFound title="This page has moved" backTo="/about-factory" backLabel="Visit our factory page" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <SiteFooter />
      <FloatingDock />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
