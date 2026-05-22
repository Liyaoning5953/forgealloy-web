'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { company, wheels, categories, finishes } from '@/lib/data';

export default function ForgedWheelCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWheel, setSelectedWheel] = useState<any>(null);
  const [selectedFinish, setSelectedFinish] = useState('Gloss Black');
  const [activePage, setActivePage] = useState('home');

  const filteredWheels = useMemo(() => {
    if (selectedCategory === 'All') return wheels;
    // Note: The logic in original code checked wheel.category === selectedCategory
    // but some categories are Series names.
    return wheels.filter((wheel) => 
      wheel.category === selectedCategory || wheel.series === selectedCategory
    );
  }, [selectedCategory]);

  const ProductDetailPage = ({ wheel }: { wheel: any }) => {
    if (!wheel) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black text-white"
      >
        {/* PRODUCT HERO */}
        <section className="relative border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-red-950/40 to-black z-10" />

          <img
            src={wheel.image}
            alt={wheel.name}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />

          <div className="relative z-20 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => {
                   setActivePage('home');
                   window.scrollTo(0, 0);
                }}
                className="mb-8 border border-white/10 hover:border-red-500 hover:text-red-500 transition px-5 py-3 rounded-xl"
              >
                ← Back To Catalog
              </button>

              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                {wheel.category}
              </p>

              <h1 className="text-6xl lg:text-8xl font-black leading-none mb-8">
                {wheel.name}
              </h1>

              <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-2xl">
                Premium custom forged wheel engineered for high-performance vehicles, luxury SUVs, and custom builds.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {wheel.sizes?.map((size: string) => (
                  <span
                    key={size}
                    className="bg-zinc-900 border border-white/10 px-5 py-3 rounded-xl text-lg"
                  >
                    {size}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-xl">
                  <span className="text-zinc-400 text-sm uppercase tracking-[3px]">
                    Finish:
                  </span>

                  <select
                    value={selectedFinish}
                    onChange={(e) => setSelectedFinish(e.target.value)}
                    className="bg-transparent outline-none text-white cursor-pointer"
                  >
                    {finishes.map((finish) => (
                      <option key={finish} className="bg-black">
                        {finish}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="bg-red-600 hover:bg-red-500 transition px-8 py-5 rounded-2xl font-bold text-lg">
                  Request Quote
                </button>

                <button className="border border-white/10 hover:bg-white/10 transition px-8 py-5 rounded-2xl">
                  Download Catalog
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-red-600/20 blur-[120px] rounded-full" />

              <img
                src={wheel.image}
                alt={wheel.name}
                className="relative rounded-[40px] border border-white/10 w-full h-[650px] object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* SPECIFICATIONS */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                Technical Specifications
              </p>

              <h2 className="text-5xl font-black mb-10">
                Wheel Details
              </h2>

              <div className="space-y-5">
                {[
                  ['Construction', 'Forged Aluminum'],
                  ['Wheel Type', wheel.category],
                  ['Available Sizes', '15” - 28”'],
                  ['Finish', wheel.finish || 'Custom'],
                  ['Vehicle Fitment', wheel.vehicle],
                  ['Bolt Pattern', 'Custom Available'],
                  ['Offset', 'Custom ET'],
                  ['Center Bore', 'Custom Machined'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-white/10 pb-5"
                  >
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-semibold text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-[36px] p-10">
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                Inquiry Form
              </p>

              <h3 className="text-4xl font-black mb-8">
                Request Custom Quote
              </h3>

              <div className="space-y-5">
                <input
                  placeholder="Your Name"
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:border-red-500 outline-none transition"
                />

                <input
                  placeholder="Email Address"
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:border-red-500 outline-none transition"
                />

                <input
                  value={wheel.name}
                  readOnly
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-zinc-400"
                />

                <textarea
                  rows={5}
                  placeholder="Tell us your custom wheel requirements..."
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 focus:border-red-500 outline-none transition"
                />

                <button className="w-full bg-red-600 hover:bg-red-500 transition py-5 rounded-xl font-bold text-lg">
                  Send Inquiry To ForgeAlloy
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* VEHICLE GALLERY */}
        <section className="border-t border-white/10 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="mb-14">
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                ForgeAlloy Vehicle Gallery
              </p>

              <h2 className="text-5xl font-black">
                Real Vehicle Fitment
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                wheel.image,
                'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop',
              ].map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-[32px] group"
                >
                  <img
                    src={img}
                    className="h-[520px] w-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8">
                    <p className="text-red-500 uppercase tracking-[3px] text-sm mb-2">
                      Premium Forged Setup
                    </p>
                    <h3 className="text-3xl font-bold">
                      {wheel.vehicle}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FLOATING WHATSAPP */}
        <a
          href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:scale-110 transition text-white px-6 py-4 rounded-full shadow-2xl font-bold"
        >
          WhatsApp Inquiry
        </a>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <AnimatePresence mode="wait">
        {activePage === 'product' && selectedWheel ? (
          <ProductDetailPage key="product" wheel={selectedWheel} />
        ) : (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-600 font-black text-xl">
                    FA
                  </div>

                  <div>
                    <h1 className="text-2xl font-black tracking-widest text-red-500">
                      {company.name}
                    </h1>
                    <p className="text-xs text-zinc-500 tracking-[3px] uppercase mt-1">
                      Forged Wheel Catalog
                    </p>
                  </div>
                </div>

                <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-[2px] text-zinc-300">
                  <a href="#home" className="hover:text-red-500 transition">Home</a>
                  <a href="#catalog" className="hover:text-red-500 transition">Shop All</a>
                  <a href="#yp-series" className="hover:text-red-500 transition">YP Series</a>
                  <a href="#fw-series" className="hover:text-red-500 transition">FW Series</a>
                  <a href="#contact" className="hover:text-red-500 transition">Contact</a>
                </nav>

                <button className="bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-xl font-semibold">
                  Get Quote
                </button>
              </div>
            </header>

            {/* HERO */}
            <section id="home" className="relative overflow-hidden border-b border-white/10 h-[80vh] flex items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-red-950/70 to-transparent z-10" />

              <img
                src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2000&auto=format&fit=crop"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />

              <div className="relative z-20 max-w-7xl mx-auto px-6 py-36 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="uppercase tracking-[6px] text-sm text-red-500 mb-4"
                  >
                    ForgeAlloy Forged Wheels
                  </motion.p>

                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl lg:text-8xl font-black leading-none mb-8"
                  >
                    Custom Forged
                    <br />
                    Wheels
                  </motion.h2>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-300 text-lg max-w-2xl leading-relaxed mb-10"
                  >
                    {company.description}
                  </motion.p>

                  <div className="flex flex-wrap gap-5">
                    <button className="bg-red-600 hover:bg-red-500 transition px-8 py-5 rounded-2xl font-bold text-lg">
                      Explore Collection
                    </button>

                    <button className="border border-white/20 px-8 py-5 rounded-2xl hover:bg-white/10 transition">
                      View Gallery
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-white/5 border border-white/10 rounded-[36px] p-8 backdrop-blur-xl">
                    <p className="text-red-500 uppercase tracking-[4px] text-sm mb-6">
                      Quick Search
                    </p>

                    <div className="space-y-4">
                      <select className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-red-500 transition">
                        <option>Select Vehicle Brand</option>
                        <option>BMW</option>
                        <option>Tesla</option>
                        <option>Mercedes</option>
                        <option>Ford</option>
                      </select>

                      <select className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-red-500 transition">
                        <option>Select Wheel Type</option>
                        <option>Single Piece</option>
                        <option>2 Piece</option>
                        <option>3 Piece</option>
                      </select>

                      <button className="w-full bg-red-600 hover:bg-red-500 transition py-4 rounded-xl font-bold">
                        Search Wheels
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SHOP ALL */}
            <section id="catalog" className="bg-zinc-950 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                  <div>
                    <p className="text-red-500 uppercase tracking-[4px] text-sm mb-3">
                      Shop All Wheels
                    </p>
                    <h2 className="text-5xl font-black">Forged Catalog</h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-3 rounded-xl border transition ${
                          selectedCategory === category
                            ? 'bg-red-600 border-red-600'
                            : 'bg-black border-white/10 hover:border-red-500 hover:text-red-500'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SERIES SHOWCASE */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                  <div
                    id="yp-series"
                    className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-zinc-950 to-zinc-900 p-10"
                  >
                    <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                      YP Series
                    </p>

                    <h3 className="text-5xl font-black mb-6">
                      Monoblock Forged
                    </h3>

                    <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">
                      Lightweight single-piece forged wheel lineup designed for sports cars and luxury performance vehicles.
                    </p>

                    <button 
                       onClick={() => setSelectedCategory('YP Series')}
                       className="bg-red-600 hover:bg-red-500 transition px-8 py-4 rounded-2xl font-bold"
                    >
                      Explore YP Series
                    </button>
                  </div>

                  <div
                    id="fw-series"
                    className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-black to-red-950/20 p-10"
                  >
                    <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                      FW Series
                    </p>

                    <h3 className="text-5xl font-black mb-6">
                      2 Piece Custom
                    </h3>

                    <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-xl">
                      Premium multi-piece forged wheel collection with deep concave profiles and custom finish options.
                    </p>

                    <button 
                       onClick={() => setSelectedCategory('FW Series')}
                       className="border border-white/10 hover:border-red-500 hover:text-red-500 transition px-8 py-4 rounded-2xl font-bold"
                    >
                      Explore FW Series
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredWheels.map((wheel) => (
                    <motion.div
                      layout
                      key={wheel.id}
                      className="group overflow-hidden rounded-[30px] border border-white/10 bg-black hover:-translate-y-2 transition duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={wheel.image}
                          alt={wheel.name}
                          className="h-[340px] w-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {wheel.category}
                        </div>
                      </div>

                      <div className="p-7">
                        <div className="mb-5">
                          <h3 className="text-3xl font-bold mb-2">{wheel.name}</h3>
                          <p className="text-zinc-400">{wheel.vehicle}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {wheel.sizes?.map((size: string) => (
                            <span
                              key={size}
                              className="bg-zinc-900 border border-white/10 px-3 py-2 rounded-lg text-sm"
                            >
                              {size}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              setSelectedWheel(wheel);
                              setActivePage('product');
                              window.scrollTo(0, 0);
                            }}
                            className="flex-1 bg-red-600 hover:bg-red-500 transition py-3 rounded-xl font-semibold text-center"
                          >
                            View Details
                          </button>

                          <a 
                            href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 border border-white/10 hover:bg-white/10 transition py-3 rounded-xl text-center"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="border-t border-white/10 bg-gradient-to-b from-black to-red-950/20">
              <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">
                    Contact Us
                  </p>

                  <h2 className="text-5xl font-black leading-tight mb-6">
                    ForgeAlloy OEM & ODM Solutions
                  </h2>

                  <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                    Single piece, 2 piece, 3 piece forged wheels with full customization service.
                  </p>

                  <div className="space-y-5 text-zinc-300 text-lg">
                    <p>Email: {company.email}</p>
                    <p>Phone: {company.phone}</p>
                    <p>Sizes Available: 15” - 28”</p>
                  </div>
                </div>

                <div className="bg-black border border-white/10 rounded-[36px] p-10">
                  <h3 className="text-3xl font-bold mb-8">Get Wholesale Pricing</h3>

                  <div className="space-y-5">
                    <input
                      placeholder="Your Name"
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-4 focus:border-red-500 outline-none"
                    />

                    <input
                      placeholder="Email Address"
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-4 focus:border-red-500 outline-none"
                    />

                    <textarea
                      rows={5}
                      placeholder="Tell us your wheel requirements..."
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-5 py-4 focus:border-red-500 outline-none"
                    />

                    <button className="w-full bg-red-600 hover:bg-red-500 transition py-5 rounded-xl font-bold text-lg">
                      Submit Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
