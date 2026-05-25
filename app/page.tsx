'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Settings, 
  ShieldCheck, 
  Users, 
  BarChart, 
  Clock, 
  CheckCircle,
  Globe,
  MessageSquare,
  Search,
  Menu,
  X,
  Target,
  Zap,
  Gem,
  PenTool
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company, series, wheels, categories, gallery } from '@/lib/data';

export default function ForgeAlloyWebsite() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredWheels = selectedCategory === 'ALL' 
    ? wheels 
    : wheels.filter(w => w.category === selectedCategory);

  const stats = [
    { value: '500+', label: 'Wheel Designs' },
    { value: '10+', label: 'Years Experience' },
    { value: '80+', label: 'Countries Served' },
    { value: '100%', label: 'Quality Guarantee' }
  ];

  const features = [
    { icon: Target, label: 'PRECISION Engineered' },
    { icon: Gem, label: 'PREMIUM Quality' },
    { icon: Zap, label: 'LIGHTWEIGHT Stronger' },
    { icon: PenTool, label: 'CUSTOM Made' }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600/30 overflow-x-hidden">
      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 h-20' : 'bg-transparent h-24'}`}>
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={company.logo} alt="ForgeAlloy" className="h-10 w-auto rounded" />
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">FORGE<span className="text-red-600">ALLOY</span></h1>
          </div>

          <nav className="hidden xl:flex items-center gap-8 uppercase text-[11px] font-black tracking-[2px]">
            <a href="#" className="text-red-600">Home</a>
            <div className="group relative">
              <a href="#wheels" className="hover:text-red-600 transition flex items-center gap-1">Wheels <ChevronDown size={14} /></a>
            </div>
            <a href="#gallery" className="hover:text-red-600 transition">Gallery</a>
            <a href="#oem" className="hover:text-red-600 transition">OEM / ODM</a>
            <a href="#dealer" className="hover:text-red-600 transition">Dealer</a>
            <a href="#about" className="hover:text-red-600 transition">About Us</a>
            <a href="#contact" className="hover:text-red-600 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="bg-red-600 hover:bg-red-500 transition px-8 py-3 rounded-md font-black text-[12px] tracking-[2px] uppercase shadow-lg shadow-red-600/20">
              Inquiry Now
            </button>
            <button className="xl:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black p-10 flex flex-col gap-10"
          >
            <div className="flex justify-end"><button onClick={() => setIsMenuOpen(false)}><X size={40} /></button></div>
            <nav className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#wheels" onClick={() => setIsMenuOpen(false)}>Wheels</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#oem" onClick={() => setIsMenuOpen(false)}>OEM / ODM</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={(company as any).images.hero} className="w-full h-full object-cover opacity-50 grayscale" alt="Hero Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-6xl lg:text-[110px] font-black leading-[0.8] mb-8 tracking-tighter uppercase italic">
              FORGED TO<br />
              <span className="text-red-600">PERFORM</span>
            </h2>
            <p className="text-zinc-400 text-lg lg:text-xl font-medium max-w-2xl mb-12 tracking-wide leading-relaxed uppercase">
              Precision forged wheels for luxury, performance and off-road vehicles.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 border border-white/20 rounded flex items-center justify-center">
                    <f.icon size={20} className="text-zinc-400" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[2px] text-zinc-300">{f.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-5">
              <button className="bg-red-600 hover:bg-red-500 transition px-12 py-5 rounded-md font-black text-sm tracking-[3px] uppercase flex items-center gap-3">
                Shop All Wheels <ArrowRight size={18} />
              </button>
              <button className="bg-white/5 border border-white/20 hover:border-white transition px-12 py-5 rounded-md font-black text-sm tracking-[3px] uppercase">
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 py-10 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                   {i === 0 && <Target size={24} className="text-red-600" />}
                   {i === 1 && <Clock size={24} className="text-red-600" />}
                   {i === 2 && <Globe size={24} className="text-red-600" />}
                   {i === 3 && <CheckCircle size={24} className="text-red-600" />}
                </div>
                <div>
                   <h3 className="text-3xl font-black tracking-tighter">{s.value}</h3>
                   <p className="text-[10px] font-black uppercase tracking-[2px] text-zinc-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERIES SECTION */}
      <section id="series" className="py-32 bg-zinc-100 text-black">
        <div className="max-w-[1600px] mx-auto px-6 text-center mb-20">
           <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic underline decoration-red-600 decoration-8 underline-offset-[12px]">Our Wheel Series</h2>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-6 gap-6">
          {series.map((s, i) => (
            <div key={i} className="bg-black text-white p-6 rounded-lg flex flex-col items-center text-center group hover:bg-zinc-900 transition-colors cursor-pointer">
              <div className="w-full aspect-square mb-6 overflow-hidden rounded">
                <img src={s.image} className="w-full h-full object-contain group-hover:scale-110 transition duration-500" alt={s.name} />
              </div>
              <h3 className="text-lg font-black uppercase italic mb-1 tracking-tighter">{s.name}</h3>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[2px] mb-6">{s.description}</p>
              <button className="text-[10px] font-black uppercase tracking-[2px] border-b border-zinc-700 pb-1 hover:border-red-600 transition-colors">View More →</button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WHEELS */}
      <section id="wheels" className="py-32 bg-white text-black">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
           <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic mb-8">Featured Wheels</h2>
              <div className="flex flex-wrap gap-3">
                 <button 
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-[2px] border rounded transition ${selectedCategory === 'ALL' ? 'bg-red-600 text-white border-red-600' : 'border-zinc-200 hover:border-black'}`}>All</button>
                 {categories.map(cat => (
                   <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 text-[10px] font-black uppercase tracking-[2px] border rounded transition ${selectedCategory === cat ? 'bg-red-600 text-white border-red-600' : 'border-zinc-200 hover:border-black'}`}>{cat.replace(' Forged', '')}</button>
                 ))}
              </div>
           </div>
           <button className="text-[11px] font-black uppercase tracking-[3px] border-b-2 border-zinc-800 pb-1">View All Products →</button>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10">
          {filteredWheels.map((wheel, i) => (
            <div key={i} className="group">
              <div className="bg-zinc-50 rounded p-8 mb-6 relative overflow-hidden flex items-center justify-center min-h-[300px]">
                <img src={wheel.image} className="w-full h-auto object-contain group-hover:scale-110 transition duration-700" alt={wheel.name} />
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">{wheel.name}</h3>
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[2px] mt-1">{wheel.category.replace(' Forged', '')}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-[2px] text-zinc-500">
                    <p>Size: <span className="text-black">{wheel.size}</span></p>
                    <p>Finish: <span className="text-black truncate">{wheel.finish}</span></p>
                    <p>PCD: <span className="text-black">{wheel.pcd}</span></p>
                    <p>Offset: <span className="text-black">{wheel.offset}</span></p>
                 </div>
                 <button className="w-full text-[10px] font-black uppercase tracking-[3px] border-b border-zinc-200 py-3 text-left group-hover:border-red-600 transition-colors">View Details +</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OEM / ODM SOLUTIONS */}
      <section id="oem" className="relative py-40 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={(company as any).images.manufacturing} className="w-full h-full object-cover opacity-20" alt="OEM Background" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic mb-8 leading-[0.9]">OEM / ODM <span className="text-red-600">Solutions</span></h2>
              <p className="text-zinc-400 text-lg lg:text-xl font-medium max-w-xl mb-12 tracking-wide uppercase leading-relaxed">
                 We provide one-stop customized forged wheel solutions for global brands, wholesalers and dealers.
              </p>
              
              <div className="grid grid-cols-3 gap-10 mb-16">
                 {[
                   { icon: Settings, label: 'Custom Design' },
                   { icon: ShieldCheck, label: 'OEM Logo' },
                   { icon: Users, label: 'Private Brand' },
                   { icon: BarChart, label: 'Low MOQ' },
                   { icon: Clock, label: 'Fast Delivery' },
                   { icon: CheckCircle, label: 'Strict QC' }
                 ].map((feat, i) => (
                   <div key={i} className="flex flex-col gap-4">
                      <feat.icon size={32} className="text-zinc-500" />
                      <p className="text-[10px] font-black uppercase tracking-[2px] text-zinc-300">{feat.label}</p>
                   </div>
                 ))}
              </div>

              <button className="bg-red-600 hover:bg-red-500 transition px-12 py-5 rounded-md font-black text-sm tracking-[3px] uppercase">Learn More →</button>
           </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-32 bg-white text-black">
         <div className="max-w-[1600px] mx-auto px-6 mb-20">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">Gallery & Inspiration</h2>
         </div>
         <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((g, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer relative">
                 <img src={g.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Gallery" />
                 <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition duration-500" />
              </div>
            ))}
         </div>
      </section>

      {/* DEALER PROGRAM */}
      <section id="dealer" className="relative py-40 bg-black text-white overflow-hidden border-t border-white/5">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-600/10 blur-[200px] rounded-full" />
        
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
           <p className="text-red-600 font-black tracking-[8px] text-xs mb-6 uppercase">Dealer Program</p>
           <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic mb-8 leading-none">Grow with ForgeAlloy</h2>
           <p className="text-zinc-500 text-lg lg:text-xl font-medium max-w-xl mb-16 tracking-wide uppercase">
              Join our global dealer network and enjoy exclusive benefits.
           </p>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
              {[
                { label: 'Competitive Pricing', icon: Target },
                { label: 'Marketing Support', icon: Zap },
                { label: 'Exclusive Territory', icon: ShieldCheck },
                { label: 'New Product Priority', icon: Gem }
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col gap-6">
                   <benefit.icon size={40} className="text-zinc-700" />
                   <p className="text-[11px] font-black uppercase tracking-[3px] text-zinc-400">{benefit.label}</p>
                </div>
              ))}
           </div>

           <button className="border-2 border-white/20 hover:border-red-600 hover:text-red-600 transition px-16 py-6 rounded-md font-black text-sm tracking-[4px] uppercase">Become A Dealer →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-zinc-950 text-white py-32 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-12 gap-20">
           <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-10">
                <img src={company.logo} alt="ForgeAlloy" className="h-10 w-auto rounded" />
                <h1 className="text-3xl font-black tracking-tighter italic uppercase">FORGE<span className="text-red-600">ALLOY</span></h1>
              </div>
              <p className="text-zinc-500 text-[11px] font-medium leading-[2.5] tracking-[2px] uppercase mb-12">
                 Premier automotive wheel engineering firm specializing in bespoke T6061 forged solutions for international high-performance markets.
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition cursor-pointer"><Globe size={18} /></div>)}
              </div>
           </div>

           <div className="lg:col-span-2 space-y-8">
              <h4 className="text-[12px] font-black uppercase tracking-[4px]">Quick Links</h4>
              <nav className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-[3px] text-zinc-500">
                 <a href="#" className="hover:text-red-600 transition">Home</a>
                 <a href="#wheels" className="hover:text-red-600 transition">Wheels</a>
                 <a href="#gallery" className="hover:text-red-600 transition">Gallery</a>
                 <a href="#oem" className="hover:text-red-600 transition">OEM / ODM</a>
              </nav>
           </div>

           <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[12px] font-black uppercase tracking-[4px]">Wheel Series</h4>
              <nav className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-[3px] text-zinc-500">
                 <p>YP Series (Monoblock)</p>
                 <p>FW Series (2-Piece)</p>
                 <p>Off-Road Series</p>
                 <p>Truck Series</p>
                 <p>Custom Forged</p>
              </nav>
           </div>

           <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[12px] font-black uppercase tracking-[4px]">Contact Us</h4>
              <div className="flex flex-col gap-5 text-[11px] font-black uppercase tracking-[3px] text-zinc-500">
                 <p className="flex items-center gap-3 italic"><MessageSquare size={16} className="text-red-600" /> WhatsApp: +86 178 6062 5953</p>
                 <p className="flex items-center gap-3 italic"><Globe size={16} className="text-red-600" /> Email: info@forgealloyracing.com</p>
                 <p className="flex items-center gap-3 italic"><Settings size={16} className="text-red-600" /> Fitment Guide</p>
                 <p className="flex items-center gap-3 italic"><ShieldCheck size={16} className="text-red-600" /> Factory Center</p>
              </div>
           </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[4px] text-zinc-600">
           <p>© 2026 FORGEALLOY RACING TECH. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-10">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
           </div>
        </div>
      </footer>

      {/* FLOATING CTAs */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
         <a 
          href="https://wa.me/8617860625953"
          target="_blank"
          className="w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition duration-300">
            <MessageSquare size={32} />
         </a>
         <button className="w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition duration-300">
            <BarChart size={24} />
            <span className="text-[8px] font-black uppercase mt-1">Catalog</span>
         </button>
      </div>
    </div>
  );
}
