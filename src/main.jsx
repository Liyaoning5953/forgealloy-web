import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';

import ScrollToTop from './components/ScrollToTop.jsx';
import SiteNav from './components/SiteNav.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import FloatingDock from './components/FloatingDock.jsx';

import { initAnalytics } from './lib/analytics.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const SeriesPage = lazy(() => import('./pages/SeriesPage.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const OemOdm = lazy(() => import('./pages/OemOdm.jsx'));
const AboutFactory = lazy(() => import('./pages/AboutFactory.jsx'));
const Faq = lazy(() => import('./pages/Faq.jsx'));
const Guides = lazy(() => import('./pages/Guides.jsx'));
const GuidePost = lazy(() => import('./pages/GuidePost.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const DealerProgram = lazy(() => import('./pages/DealerProgram.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

initAnalytics();

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/oem-odm" element={<OemOdm />} />
          <Route path="/about-factory" element={<AboutFactory />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuidePost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dealer-program" element={<DealerProgram />} />
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
