'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Settings, 
  ShieldCheck, 
  BarChart, 
  Users, 
  ChevronDown, 
  Clock, 
  Globe, 
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company, wheels, series } from '@/lib/data';

export default function ForgeAlloyWebsite() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const filteredWheels = selectedCategory === 'ALL' 
    ? wheels 
    : wheels.filter(w => w.category === selectedCategory);

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600/30">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src={company.logo} alt="ForgeAlloy" className="h-12 w-auto rounded-lg shadow-lg shadow-red-600/20" />
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
                FORGE<span className="text-red-600">ALLOY</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[4px] text-zinc-500 mt-1">
                FORGED WHEELS
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10 uppercase text-[11px] font-black tracking-[3px]">
            <a href="#" className="text-red-600">Home</a>
            <a href="#series" className="hover:text-red-600 transition">Series</a>
            <a href="#wheels" className="hover:text-red-600 transition">Wheels</a>
            <a href="#process" className="hover:text-red-600 transition">Manufacturing</a>
            <a href="#oem" className="hover:text-red-600 transition">OEM / ODM</a>
            <a href="#contact" className="hover:text-red-600 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-3 text-green-500 text-[11px] font-black tracking-[2px]">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              WHATSAPP: +86 178 6062 5953
            </div>

            <button className="bg-red-600 hover:bg-red-500 transition px-8 py-4 rounded-xl font-black text-sm tracking-[2px] uppercase shadow-lg shadow-red-600/20">
              Inquiry Now
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center pt-32">
        <img
          src={(company as any).images.hero}
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          alt="Hero Background"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-10 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[8px] text-red-600 mb-8 text-sm font-black">
              Professional Forged Manufacturer
            </p>

            <h2 className="text-7xl lg:text-[140px] font-black leading-[0.8] mb-12 tracking-tighter uppercase">
              FORGED TO
              <br />
              <span className="text-red-600">PERFORM</span>
            </h2>

            <p className="text-zinc-400 text-2xl leading-relaxed max-w-2xl mb-16 font-medium tracking-wide">
              {company.tagline}
            </p>

            <div className="flex flex-wrap gap-6 mb-20">
              <button className="bg-red-600 hover:bg-red-500 transition px-14 py-6 rounded-2xl font-black text-[15px] tracking-[4px] uppercase flex items-center gap-4 shadow-2xl">
                Shop All Wheels <ArrowRight size={20} />
              </button>

              <button className="bg-white/5 border border-white/20 hover:border-red-600 hover:text-red-600 transition px-14 py-6 rounded-2xl font-black text-[15px] tracking-[4px] uppercase">
                View Gallery
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                ['500+', 'Designs'],
                ['10+', 'Years'],
                ['80+', 'Countries'],
                ['100%', 'Quality'],
              ].map(([number, text]) => (
                <div
                  key={text}
                  className="border border-white/10 rounded-3xl p-6 bg-white/5 backdrop-blur-xl group hover:border-red-600 transition-all duration-500"
                >
                  <h3 className="text-4xl font-black text-red-600 mb-2">{number}</h3>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[3px]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-red-600/20 blur-[150px] rounded-full" />
            <img
              src={wheels[0].image}
              className="relative z-10 rounded-[60px] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition duration-1000"
              alt="Featured Forged Wheel"
            />
          </motion.div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="py-20 bg-zinc-950 border-y border-white/5">
         <div className="max-w-[1600px] mx-auto px-10">
            <img src={(company as any).images.banner} alt="Commitment" className="w-full rounded-[48px] border border-white/10 shadow-2xl" />
         </div>
      </section>

      {/* SERIES */}
      <section id="series" className="py-40 bg-white text-black">
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
            <div>
              <p className="uppercase tracking-[8px] text-red-600 text-sm font-black mb-6">
                Wheel Collections
              </p>
              <h2 className="text-7xl lg:text-9xl font-black tracking-tighter leading-none uppercase">Our <span className="text-red-600">Series</span></h2>
            </div>

            <button className="border-2 border-black px-12 py-5 rounded-2xl font-black tracking-[4px] text-sm hover:bg-black hover:text-white transition uppercase">
              Download Catalog
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {series.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-[48px] bg-black text-white min-h-[550px] shadow-2xl"
              >
                <img
                  src={item.image}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000 opacity-60 grayscale group-hover:grayscale-0"
                  alt={item.name}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                  <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">{item.name.replace(' SERIES', '')}</h3>
                  <p className="text-zinc-400 text-sm font-medium tracking-widest uppercase mb-10">{item.description}</p>

                  <button className="bg-red-600 hover:bg-red-500 transition px-10 py-5 rounded-2xl font-black tracking-[3px] text-xs uppercase">
                    Explore Series
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="wheels" className="py-40 bg-zinc-100 text-black">
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="flex flex-wrap items-center justify-between gap-12 mb-24">
            <div>
              <p className="uppercase tracking-[8px] text-red-600 text-sm font-black mb-6">
                Precision Engineered
              </p>
              <h2 className="text-7xl font-black tracking-tighter uppercase leading-none">Best <span className="text-red-600">Sellers</span></h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {['ALL', 'Monoblock Forged', '2-Piece Forged', 'Off-Road Forged', 'Truck Forged'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-10 py-4 rounded-2xl text-[12px] font-black tracking-[3px] uppercase transition shadow-sm ${
                      selectedCategory === cat 
                        ? 'bg-red-600 text-white border-2 border-red-600' 
                        : 'bg-white border-2 border-zinc-200 hover:border-black'
                    }`}
                  >
                    {cat.replace(' Forged', '')}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-12">
            {filteredWheels.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[48px] overflow-hidden border border-zinc-200 group hover:-translate-y-4 transition duration-500 shadow-xl"
              >
                <div className="relative h-[400px] overflow-hidden p-10 bg-zinc-50">
                  <img
                    src={product.image}
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-700"
                    alt={product.name}
                  />
                  <div className="absolute top-8 right-8 bg-red-600 text-white text-[10px] font-black tracking-[2px] px-4 py-2 rounded-full uppercase">
                    {product.category.split(' ')[0]}
                  </div>
                </div>

                <div className="p-10 border-t border-zinc-100">
                  <div className="mb-8">
                    <h3 className="text-4xl font-black mb-2 tracking-tighter">{product.name}</h3>
                    <p className="text-zinc-400 text-[10px] font-black tracking-[4px] uppercase">{product.finish}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button className="w-full bg-black text-white hover:bg-red-600 transition py-6 rounded-2xl font-black tracking-[4px] text-xs uppercase shadow-xl shadow-black/10">
                      View Technical Specs
                    </button>

                    <a
                      href={`https://wa.me/8617860625953?text=Inquiry%20for%20${product.name}`}
                      target="_blank"
                      className="w-full border-2 border-black hover:bg-black hover:text-white transition py-6 rounded-2xl font-black tracking-[4px] text-xs uppercase text-center"
                    >
                      WhatsApp Inquiry
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section id="process" className="py-40 bg-zinc-950 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-10">
            <div className="max-w-4xl mb-24">
                <p className="text-red-600 font-black tracking-[8px] text-sm mb-6 uppercase">Manufacturing Authority</p>
                <h2 className="text-7xl lg:text-[120px] font-black mb-10 uppercase tracking-tighter leading-[0.8]">Production <span className="text-white">Process</span></h2>
                <p className="text-2xl text-zinc-500 font-medium leading-relaxed uppercase tracking-widest">Global standard aerospace forging technology.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
                <div className="bg-white/5 p-12 rounded-[56px] border border-white/10">
                   <h3 className="text-3xl font-black mb-12 uppercase tracking-tight text-white">12-Step <span className="text-red-600">Precision Engineery</span></h3>
                   <img src={(company as any).images.process} alt="Process Map" className="w-full rounded-[32px] shadow-2xl" />
                </div>
                <div className="bg-white/5 p-12 rounded-[56px] border border-white/10 relative overflow-hidden group">
                   <h3 className="text-3xl font-black mb-12 uppercase text-white">Advanced Machinery</h3>
                   <img src={(company as any).images.manufacturing} alt="Manufacturing" className="w-full rounded-[32px] grayscale group-hover:grayscale-0 transition duration-700 shadow-2xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-20">
                <div className="bg-zinc-900/50 p-12 rounded-[56px] border border-white/5 group">
                   <h3 className="text-3xl font-black mb-12 uppercase tracking-tight text-white">Customization <span className="text-red-600">Capability</span></h3>
                   <div className="flex flex-col lg:flex-row gap-12 items-center">
                      <div className="lg:w-1/2">
                         <ul className="space-y-6 text-[13px] font-black uppercase tracking-[4px] text-zinc-300">
                            <li className="flex items-center gap-4 border-b border-white/10 pb-4">Size / Width / Offset</li>
                            <li className="flex items-center gap-4 border-b border-white/10 pb-4">PCD / Center Bore</li>
                            <li className="flex items-center gap-4 border-b border-white/10 pb-4">Custom Engraving</li>
                            <li className="flex items-center gap-4">Deep Lips / Concave</li>
                         </ul>
                      </div>
                      <img src={(company as any).images.customization} alt="Custom" className="lg:w-1/2 rounded-[32px] shadow-2xl" />
                   </div>
                </div>
                <div className="bg-zinc-900/50 p-12 rounded-[56px] border border-white/5 group">
                   <h3 className="text-3xl font-black mb-12 uppercase tracking-tight text-white">Packaging <span className="text-red-600">Authority</span></h3>
                   <div className="flex flex-col lg:flex-row gap-12 items-center">
                      <div className="lg:w-1/2">
                         <ul className="space-y-6 text-[13px] font-black uppercase tracking-[4px] text-zinc-300">
                            <li className="flex items-center gap-4 border-b border-white/10 pb-4">Protective Cap</li>
                            <li className="flex items-center gap-4 border-b border-white/10 pb-4">Dust / Scratch Bag</li>
                            <li className="flex items-center gap-4 border-b border-white/10 pb-4">Reinforced Sponge</li>
                            <li className="flex items-center gap-4">High-strength Box</li>
                         </ul>
                      </div>
                      <img src={(company as any).images.packaging} alt="Packaging" className="lg:w-1/2 rounded-[32px] shadow-2xl" />
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* OEM / ODM SOLUTIONS */}
      <section id="oem" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/10 blur-[200px] rounded-full" />

        <div className="max-w-[1600px] mx-auto px-10 relative z-10 grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <p className="uppercase tracking-[10px] text-red-600 text-sm font-black mb-8">
              B2B / OEM / ODM Solutions
            </p>

            <h2 className="text-7xl lg:text-9xl font-black leading-[0.8] mb-12 uppercase tracking-tighter">
              Bespoke Forged<br /><span className="text-red-600">Manufacturing</span>
            </h2>

            <p className="text-zinc-400 text-2xl leading-relaxed mb-16 font-medium tracking-wide">
              We empower wheel brands, wholesalers, and specialized distributors with top-tier forged engineering and global logistics.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-16">
              {[
                'OEM Logo',
                'Custom Finish',
                'Low MOQ (4pcs)',
                '15D Delivery',
                'Private Label',
                'DDP Shipping',
              ].map((item) => (
                <div
                  key={item}
                  className="border border-white/10 rounded-3xl p-8 bg-white/5 backdrop-blur-md group hover:border-red-600 transition duration-500"
                >
                  <p className="font-black text-lg uppercase tracking-[2px]">{item}</p>
                </div>
              ))}
            </div>

            <button className="bg-red-600 hover:bg-red-500 transition px-16 py-7 rounded-[32px] font-black text-lg tracking-[5px] uppercase shadow-2xl">
              Start Project Brief
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-red-600/20 rounded-[64px] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1400&auto=format&fit=crop"
              className="relative rounded-[60px] border border-white/10 shadow-2xl grayscale group-hover:grayscale-0 transition duration-1000"
              alt="OEM Factory"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/5 bg-zinc-950">
        <div className="max-w-[1600px] mx-auto px-10 py-32 grid lg:grid-cols-4 gap-24">
          <div className="lg:col-span-1">
            <img src={company.logo} alt="ForgeAlloy" className="h-16 w-auto mb-10 rounded-xl" />
            <p className="text-zinc-500 text-[13px] font-medium leading-[2] tracking-widest mb-12 uppercase">
              Premier automotive wheel engineering firm specializing in bespoke T6061 forged solutions for international high-performance markets.
            </p>

            <div className="space-y-6 text-[11px] font-black uppercase tracking-[4px] text-zinc-400">
              <p className="flex items-center gap-4"><Globe size={18} className="text-red-600" /> WhatsApp: +86 178 6062 5953</p>
              <p className="flex items-center gap-4"><MessageSquare size={18} className="text-red-600" /> Email: sales@forgealloyracing.com</p>
              <p className="flex items-center gap-4"><ShieldCheck size={18} className="text-red-600" /> China Integrated Production Base</p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-12 uppercase tracking-[5px]">Navigation</h4>
            <div className="space-y-6 text-[12px] font-black uppercase tracking-[4px] text-zinc-500">
              <a className="block hover:text-red-600 transition cursor-pointer">Home</a>
              <a className="block hover:text-red-600 transition cursor-pointer">Wheel Series</a>
              <a className="block hover:text-red-600 transition cursor-pointer">Fitment Gallery</a>
              <a className="block hover:text-red-600 transition cursor-pointer">OEM Inquiry</a>
              <a className="block hover:text-red-600 transition cursor-pointer text-red-600/50">Dealer Portal</a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-12 uppercase tracking-[5px]">Collections</h4>
            <div className="space-y-6 text-[12px] font-black uppercase tracking-[4px] text-zinc-500">
              <p>YP Monoblock</p>
              <p>FW 2-Piece Series</p>
              <p>VXR 3-Piece Series</p>
              <p>Off-Road Spec</p>
              <p>Heavy Duty Truck</p>
            </div>
          </div>

          <div className="bg-red-600 p-12 rounded-[56px] shadow-2xl shadow-red-600/10">
            <h4 className="text-2xl font-black mb-8 uppercase tracking-tighter">Dealer Network</h4>
            <p className="text-white/80 text-[12px] font-medium leading-relaxed tracking-wider mb-10 uppercase">
              Unlock exclusive wholesale pricing, territory protection, and premium engineering support.
            </p>
            <button className="w-full bg-black text-white hover:bg-zinc-900 transition py-6 rounded-2xl font-black tracking-[5px] text-xs uppercase shadow-2xl">
              Join Network
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 py-12 text-center text-[10px] font-black text-zinc-600 uppercase tracking-[6px]">
          © 2026 FORGEALLOY RACING TECH. ALL RIGHTS RESERVED.
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/8617860625953"
        target="_blank"
        className="fixed bottom-10 right-10 bg-green-500 hover:scale-110 transition-all duration-500 text-white px-8 py-5 rounded-full shadow-[0_0_60px_rgba(34,197,94,0.4)] z-50 font-black flex items-center gap-4 group"
      >
        <div className="w-3 h-3 bg-white rounded-full animate-ping group-hover:hidden" />
        <span className="uppercase tracking-[3px] text-xs">Chat with Engineers</span>
      </a>
    </div>
  );
}