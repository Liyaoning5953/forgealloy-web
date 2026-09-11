import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';

import ScrollToTop from './components/ScrollToTop.jsx';
import SiteNav from './components/SiteNav.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import FloatingDock from './components/FloatingDock.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import SeriesPage from './pages/SeriesPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Gallery from './pages/Gallery.jsx';
import OemOdm from './pages/OemOdm.jsx';
import AboutFactory from './pages/AboutFactory.jsx';
import Faq from './pages/Faq.jsx';
import Guides from './pages/Guides.jsx';
import GuidePost from './pages/GuidePost.jsx';
import Contact from './pages/Contact.jsx';
import DealerProgram from './pages/DealerProgram.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteNav />
      <main>
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <SiteFooter />
      <FloatingDock />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
