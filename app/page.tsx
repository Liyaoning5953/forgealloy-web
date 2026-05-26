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
  PenTool,
  Download,
  User,
  Phone,
  Mail,
  Send
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

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600/30 overflow-x-hidden">
      {/* TOP UTILITY BAR */}
      <div className="bg-black border-b border-white/5 h-10 hidden lg:block relative z-[60]">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between text-[10px] font-bold uppercase tracking-[2px] text-zinc-500">
           <div>FORGED PERFORMANCE. BUILT WITHOUT COMPROMISE.</div>
           <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 hover:text-white transition"><User size={12} /> Dealer Login</a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition"><Download size={12} /> Download Catalog</a>
              <a href="#" className="flex items-center gap-2 text-green-500 hover:text-green-400 transition"><Phone size={12} /> +86 178 6062 5953</a>
              <div className="flex items-center gap-2 cursor-pointer hover:text-white">🇺🇸 English <ChevronDown size={12} /></div>
           </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 h-20 top-0' : 'bg-transparent h-24 top-10'}`}>
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img src={company.logo} alt="ForgeAlloy" className="h-10 w-auto rounded transition-transform group-hover:scale-110" />
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">FORGE<span className="text-red-600">ALLOY</span></h1>
          </div>

          <nav className="hidden xl:flex items-center gap-8 uppercase text-[12px] font-black tracking-[2px]">
            <a href="#" className="text-red-600 border-b-2 border-red-600 pb-1">Home</a>
            <a href="#wheels" className="hover:text-red-600 transition flex items-center gap-1">Wheels <ChevronDown size={14} /></a>
            <a href="#gallery" className="hover:text-red-600 transition">Gallery</a>
            <a href="#oem" className="hover:text-red-600 transition">OEM/ODM</a>
            <a href="#about" className="hover:text-red-600 transition">About Us</a>
            <a href="#dealer" className="hover:text-red-600 transition">Dealer</a>
            <a href="#contact" className="hover:text-red-600 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition"><Search size={20} /></button>
            <button className="bg-red-600 hover:bg-red-500 transition px-8 py-3 rounded-md font-black text-[12px] tracking-[2px] uppercase flex items-center gap-3 group">
              Inquiry Now <Send size={14} className="group-hover:translate-x-1 transition-transform" />
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
              <a href="#oem" onClick={() => setIsMenuOpen(false)}>OEM/ODM</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img src={(company as any).images.hero} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition duration-[2s]" alt="Hero Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-7xl lg:text-[140px] font-black leading-[0.8] mb-8 tracking-tighter uppercase italic">
              FORGED TO<br />
              <span className="text-red-600">PERFORM</span>
            </h2>
            <p className="text-zinc-400 text-lg lg:text-xl font-medium max-w-xl mb-16 tracking-wide leading-relaxed uppercase">
              Precision forged wheels for luxury, performance and off-road vehicles.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
              {[
                { icon: CheckCircle, label1: 'PRECISION', label2: 'Engineered' },
                { icon: Gem, label1: 'PREMIUM', label2: 'Quality' },
                { icon: Zap, label1: 'LIGHTWEIGHT', label2: 'Stronger' },
                { icon: Target, label1: 'CUSTOM', label2: 'Made' }
              ].map((f, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <div className="w-12 h-12 border border-white/20 rounded flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all">
                    <f.icon size={24} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-[2px] leading-tight">
                    <p className="text-white">{f.label1}</p>
                    <p className="text-zinc-500">{f.label2}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-5">
              <button className="bg-red-600 hover:bg-red-500 transition px-12 py-5 rounded-md font-black text-sm tracking-[3px] uppercase flex items-center gap-4">
                Shop All Wheels <ArrowRight size={18} />
              </button>
              <button className="bg-transparent border-2 border-white/20 hover:border-white transition px-12 py-5 rounded-md font-black text-sm tracking-[3px] uppercase">
                View Gallery →
              </button>
            </div>
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10 py-12">
          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { value: '500+', label: 'Wheel Designs', icon: Globe },
              { value: '10+', label: 'Years Experience', icon: Clock },
              { value: '80+', label: 'Countries Served', icon: Globe },
              { value: '100%', label: 'Quality Guarantee', icon: ShieldCheck }
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-8">
                <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center">
                   <s.icon size={28} className="text-zinc-500" />
                </div>
                <div>
                   <h3 className="text-4xl font-black tracking-tighter leading-none mb-1 uppercase">{s.value}</h3>
                   <p className="text-[11px] font-black uppercase tracking-[3px] text-zinc-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERIES SECTION (WHEEL COLLECTIONS) */}
      <section id="series" className="py-24 bg-zinc-50 text-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 relative">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative">
              <div className="relative">
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic mb-4 relative z-10">WHEEL COLLECTIONS</h2>
                <div className="absolute -top-10 -left-4 text-[100px] font-black text-zinc-200/50 italic select-none -z-0 pointer-events-none uppercase tracking-[-5px]">FORGEALLOY</div>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-[2px]">Explore our forged wheel series</p>
              </div>
              <div className="flex items-center gap-6 mt-8 md:mt-0 relative">
                 <button className="bg-white border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all px-8 py-3 rounded-md text-[11px] font-black uppercase tracking-[2px] flex items-center gap-4 group">
                   View All Products <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </button>
                 
                 {/* CATALOG PDF BADGE */}
                 <div className="absolute -top-28 -right-4 lg:-right-8 flex flex-col items-center group cursor-pointer animate-bounce-slow">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform duration-500">
                       <Download size={24} className="mb-1" />
                       <span className="text-[10px] font-black leading-tight text-center uppercase">Catalog<br/>PDF</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {series.map((s, idx) => (
               <motion.div 
                 key={s.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="group bg-zinc-900 rounded-xl overflow-hidden flex h-48 hover:shadow-2xl hover:shadow-black/20 transition-all border border-transparent hover:border-white/10"
               >
                 <div className="w-1/2 relative overflow-hidden bg-black/40 flex items-center justify-center p-4">
                   <img 
                     src={s.image} 
                     alt={s.name} 
                     className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700" 
                   />
                 </div>
                 <div className="w-1/2 p-6 flex flex-col justify-between items-start text-white">
                    <div>
                       <h3 className="text-xl font-black italic tracking-tighter group-hover:text-red-600 transition-colors uppercase">{s.name}</h3>
                       <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[2px] mt-2">{s.description}</p>
                    </div>
                    <button className="text-[10px] font-black uppercase tracking-[2px] flex items-center gap-2 hover:text-red-600 transition group/btn">
                       View More <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* FEATURED WHEELS (Keep from previous) */}
      <section id="wheels" className="py-24 bg-white text-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row items-end justify-between mb-24 gap-12 relative">
           <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter italic mb-8 relative z-10">FEATURED WHEELS</h2>
              <div className="absolute -top-10 -left-4 text-[100px] font-black text-zinc-100 italic select-none -z-0 pointer-events-none uppercase tracking-[-5px]">PERFORMANCE</div>
              <div className="flex flex-wrap gap-3 relative z-10">
                 <button 
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-8 py-3 text-[11px] font-black uppercase tracking-[3px] border rounded-md transition ${selectedCategory === 'ALL' ? 'bg-red-600 text-white border-red-600' : 'border-zinc-200 hover:border-black'}`}>All</button>
                 {categories.map(cat => (
                   <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-3 text-[11px] font-black uppercase tracking-[3px] border rounded-md transition ${selectedCategory === cat ? 'bg-red-600 text-white border-red-600' : 'border-zinc-200 hover:border-black'}`}>{cat.replace(' Forged', '')}</button>
                 ))}
              </div>
           </div>
           <button className="text-[12px] font-black uppercase tracking-[4px] border-b-2 border-zinc-800 pb-1 hover:text-red-600 hover:border-red-600 transition">View All Products →</button>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-12">
          {filteredWheels.map((wheel, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="bg-zinc-50 rounded p-10 mb-8 relative overflow-hidden flex items-center justify-center min-h-[350px] border border-zinc-100 group-hover:border-red-600/20 transition-all">
                <img src={wheel.image} className="w-full h-auto object-contain group-hover:scale-110 transition duration-700" alt={wheel.name} />
                <div className="absolute top-6 right-6 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded uppercase tracking-[2px]">{wheel.category.split(' ')[0]}</div>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-none">{wheel.name}</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-y-3 text-[11px] font-black uppercase tracking-[2px] text-zinc-500">
                    <div className="space-y-1"><p className="text-zinc-400">Size</p><p className="text-black">{wheel.size}</p></div>
                    <div className="space-y-1"><p className="text-zinc-400">Finish</p><p className="text-black truncate">{wheel.finish}</p></div>
                    <div className="space-y-1"><p className="text-zinc-400">PCD</p><p className="text-black">{wheel.pcd}</p></div>
                    <div className="space-y-1"><p className="text-zinc-400">Offset</p><p className="text-black">{wheel.offset}</p></div>
                 </div>
                 <button className="w-full text-[11px] font-black uppercase tracking-[4px] border-b border-zinc-200 py-4 text-left group-hover:border-red-600 group-hover:text-red-600 transition-all">View Details +</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OEM / ODM SOLUTIONS (Match Ref) */}
      <section id="oem" className="relative py-48 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={(company as any).images.manufacturing} className="w-full h-full object-cover opacity-20 grayscale" alt="OEM Background" />
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-32 items-center">
           <div>
              <h2 className="text-6xl lg:text-[90px] font-black uppercase tracking-tighter italic mb-10 leading-[0.8]">OEM / ODM <span className="text-red-600">Solutions</span></h2>
              <p className="text-zinc-400 text-xl lg:text-2xl font-medium max-w-xl mb-16 tracking-wide uppercase leading-relaxed">
                 We provide one-stop customized forged wheel solutions for global brands, wholesalers and dealers.
              </p>
              
              <div className="grid grid-cols-3 gap-y-12 gap-x-8 mb-20">
                 {[
                   { icon: Settings, label: 'Custom Design' },
                   { icon: ShieldCheck, label: 'OEM Logo' },
                   { icon: Users, label: 'Private Brand' },
                   { icon: BarChart, label: 'Low MOQ' },
                   { icon: Clock, label: 'Fast Delivery' },
                   { icon: CheckCircle, label: 'Strict QC' }
                 ].map((feat, i) => (
                   <div key={i} className="flex flex-col gap-5 group">
                      <feat.icon size={36} className="text-zinc-600 group-hover:text-red-600 transition-colors" />
                      <p className="text-[11px] font-black uppercase tracking-[3px] text-zinc-400 group-hover:text-white transition-colors">{feat.label}</p>
                   </div>
                 ))}
              </div>

              <button className="bg-red-600 hover:bg-red-500 transition px-16 py-6 rounded-md font-black text-sm tracking-[4px] uppercase flex items-center gap-4 group">
                Learn More <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           <div className="relative group hidden lg:block">
              <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-lg opacity-0 group-hover:opacity-100 transition duration-700" />
              <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop" className="relative rounded-lg grayscale group-hover:grayscale-0 transition duration-1000 shadow-2xl border border-white/10" alt="OEM Production" />
           </div>
        </div>
      </section>

      {/* GALLERY & INSPIRATION */}
      <section id="gallery" className="py-40 bg-white text-black">
         <div className="max-w-[1600px] mx-auto px-6 mb-24 text-center">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter italic underline decoration-zinc-100 decoration-[16px] underline-offset-[12px]">Gallery & Inspiration</h2>
         </div>
         <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <div key={i} className="aspect-[16/10] overflow-hidden rounded-md group cursor-pointer relative shadow-xl">
                 <img src={g.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" alt="Gallery" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-500 flex items-center justify-center">
                    <Search size={40} className="text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500" />
                 </div>
              </div>
            ))}
         </div>
         <div className="flex justify-center mt-20">
            <div className="flex gap-2">
               {[1,2,3,4,5].map(i => <div key={i} className={`w-3 h-1 rounded-full ${i === 1 ? 'bg-red-600 w-12' : 'bg-zinc-200'}`} />)}
            </div>
         </div>
      </section>

      {/* DEALER PROGRAM (Match Ref) */}
      <section id="dealer" className="relative py-48 bg-black text-white overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
           <p className="text-red-600 font-black tracking-[12px] text-xs mb-8 uppercase">Dealer Program</p>
           <h2 className="text-6xl lg:text-[100px] font-black uppercase tracking-tighter italic mb-10 leading-none">Grow with <span className="text-red-600">ForgeAlloy</span></h2>
           <p className="text-zinc-500 text-xl lg:text-2xl font-medium max-w-xl mb-24 tracking-wide uppercase leading-relaxed">
              Join our global dealer network and enjoy exclusive benefits.
           </p>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
              {[
                { label: 'Competitive Pricing', icon: Target },
                { label: 'Marketing Support', icon: Zap },
                { label: 'Exclusive Territory', icon: ShieldCheck },
                { label: 'New Product Priority', icon: Gem }
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col gap-8 group">
                   <div className="w-20 h-20 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all duration-500">
                      <benefit.icon size={48} className="text-zinc-700 group-hover:text-red-600 transition-colors" />
                   </div>
                   <p className="text-[14px] font-black uppercase tracking-[4px] text-zinc-400 group-hover:text-white transition-colors">{benefit.label}</p>
                </div>
              ))}
           </div>

           <button className="border-2 border-white/10 hover:border-red-600 hover:text-red-600 transition px-20 py-7 rounded-md font-black text-sm tracking-[5px] uppercase shadow-2xl">Become A Dealer →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-zinc-950 text-white pt-40 pb-20 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 grid lg:grid-cols-12 gap-24 relative z-10">
           <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-12">
                <img src={company.logo} alt="ForgeAlloy" className="h-12 w-auto rounded shadow-lg shadow-red-600/10" />
                <h1 className="text-4xl font-black tracking-tighter italic uppercase">FORGE<span className="text-red-600">ALLOY</span></h1>
              </div>
              <p className="text-zinc-500 text-[12px] font-medium leading-[2.8] tracking-[3px] uppercase mb-16 max-w-sm">
                 Premier automotive wheel engineering firm specializing in bespoke T6061 forged solutions for international high-performance markets.
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 cursor-pointer group">
                      <Globe size={20} className="text-zinc-600 group-hover:text-white" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-2 space-y-10">
              <h4 className="text-[14px] font-black uppercase tracking-[5px] text-white underline decoration-red-600 decoration-4 underline-offset-8">Quick Links</h4>
              <nav className="flex flex-col gap-6 text-[12px] font-black uppercase tracking-[4px] text-zinc-500">
                 <a href="#" className="hover:text-red-600 transition">Home</a>
                 <a href="#wheels" className="hover:text-red-600 transition">Wheels</a>
                 <a href="#gallery" className="hover:text-red-600 transition">Gallery</a>
                 <a href="#oem" className="hover:text-red-600 transition">OEM / ODM</a>
              </nav>
           </div>

           <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[14px] font-black uppercase tracking-[5px] text-white underline decoration-red-600 decoration-4 underline-offset-8">Wheel Series</h4>
              <nav className="flex flex-col gap-6 text-[12px] font-black uppercase tracking-[4px] text-zinc-500">
                 <p className="hover:text-red-600 transition cursor-pointer">YP Series (Monoblock)</p>
                 <p className="hover:text-red-600 transition cursor-pointer">FW Series (2-Piece)</p>
                 <p className="hover:text-red-600 transition cursor-pointer">Off-Road Spec Forged</p>
                 <p className="hover:text-red-600 transition cursor-pointer">Truck Spec Forged</p>
                 <p className="hover:text-red-600 transition cursor-pointer text-red-600/60 font-black">Custom Bespoke</p>
              </nav>
           </div>

           <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[14px] font-black uppercase tracking-[5px] text-white underline decoration-red-600 decoration-4 underline-offset-8">Contact Us</h4>
              <div className="flex flex-col gap-8 text-[12px] font-black uppercase tracking-[4px] text-zinc-500">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                       <MessageSquare size={18} className="text-zinc-500 group-hover:text-white" />
                    </div>
                    <p className="group-hover:text-white transition">+86 178 6062 5953</p>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                       <Mail size={18} className="text-zinc-500 group-hover:text-white" />
                    </div>
                    <p className="group-hover:text-white transition">info@forgealloyracing.com</p>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                       <Globe size={18} className="text-zinc-500 group-hover:text-white" />
                    </div>
                    <p className="group-hover:text-white transition">Fitment Guide Center</p>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-6 mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] font-black uppercase tracking-[6px] text-zinc-600">
           <p>© 2026 FORGEALLOY RACING TECH. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-12">
              <p className="hover:text-white transition cursor-pointer">Privacy Policy</p>
              <p className="hover:text-white transition cursor-pointer">Terms of Service</p>
           </div>
        </div>
      </footer>

      {/* FLOATING CTAs (Match Ref) */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-5">
         <div className="group relative">
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-white/5">Chat WhatsApp</div>
            <a 
              href="https://wa.me/8617860625953"
              target="_blank"
              className="w-16 h-16 bg-green-500 text-white rounded-full shadow-[0_0_40px_rgba(34,197,94,0.4)] flex items-center justify-center hover:scale-110 hover:-rotate-12 transition duration-500">
                <MessageSquare size={32} />
            </a>
         </div>
         <div className="group relative">
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-white/5">Email Us</div>
            <button className="w-16 h-16 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition duration-500 border border-white/10 group-hover:bg-red-600 group-hover:border-red-600">
               <Mail size={28} />
            </button>
         </div>
         <div className="group relative">
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-white/5">Live Support</div>
            <button className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center hover:scale-110 transition duration-500 border border-white/10">
               <Globe size={28} />
            </button>
         </div>
      </div>
    </div>
  );
}
