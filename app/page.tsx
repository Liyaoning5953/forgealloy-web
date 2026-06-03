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
  Send,
  Wrench,
  BadgeCheck,
  Shield,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company, series, wheels, categories, insights, cases } from '@/lib/data';
import Link from 'next/link';

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
            <Link href="/gallery" className="hover:text-red-600 transition">Gallery</Link>
            <a href="#oem" className="hover:text-red-600 transition">OEM / ODM</a>
            <Link href="/insights" className="hover:text-red-600 transition">Insights</Link>
            <a href="#about" className="hover:text-red-600 transition">About Us</a>
            <a href="#dealer" className="hover:text-red-600 transition">Dealer</a>
            <a href="#contact" className="hover:text-red-600 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white transition"><Search size={20} /></button>
            <button className="bg-red-600 hover:bg-red-500 transition px-8 py-3 rounded-md font-black text-[12px] tracking-[2px] uppercase flex items-center gap-3 group shadow-[0_0_30px_rgba(220,38,38,0.2)]">
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
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}><X size={40} /></button>
            </div>
            <nav className="flex flex-col gap-8 text-4xl font-black uppercase tracking-tighter">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="#wheels" onClick={() => setIsMenuOpen(false)}>Wheels</a>
              <Link href="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
              <a href="#oem" onClick={() => setIsMenuOpen(false)}>OEM/ODM</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <img src={company.images.hero} alt="Forged Wheels" className="w-full h-full object-cover scale-110" />
        </div>

        <div className="relative z-20 max-w-[1600px] mx-auto px-6 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-8xl lg:text-[160px] leading-[0.85] font-black italic uppercase tracking-tighter mb-10 drop-shadow-2xl">
              FORGED TO<br />
              <span className="text-red-600">PERFORM</span>
            </h2>
            <p className="text-xl lg:text-2xl font-bold uppercase tracking-[6px] text-zinc-300 mb-16 max-w-2xl border-l-4 border-red-600 pl-8">
              {company.tagline}
            </p>
            <div className="flex flex-wrap gap-8">
              <button className="bg-red-600 hover:bg-red-500 transition px-12 py-5 rounded font-black text-[14px] tracking-[4px] uppercase flex items-center gap-4 group shadow-[0_0_50px_rgba(220,38,38,0.4)]">
                Explore Series <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="border-2 border-white/20 hover:bg-white/10 transition px-12 py-5 rounded font-black text-[14px] tracking-[4px] uppercase">
                Custom Inquiry
              </button>
            </div>
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/5 py-12 z-20">
          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {company.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center lg:items-start lg:text-left border-r border-white/5 last:border-0">
                <span className="text-4xl lg:text-6xl font-black italic text-red-600 mb-2">{stat.value}</span>
                <span className="text-[10px] font-black uppercase tracking-[4px] text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHEEL COLLECTIONS */}
      <section id="wheels" className="py-40 bg-zinc-950 border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
           <div>
              <h3 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter mb-8">THE <span className="text-red-600">SERIES</span></h3>
              <p className="text-zinc-500 font-bold uppercase tracking-[4px]">Precision engineered across four distinct architectural platforms.</p>
           </div>
           <button className="text-[12px] font-black uppercase tracking-[4px] border-b-2 border-red-600 pb-2 hover:text-red-600 transition">View Full Catalog</button>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 space-y-24">
           {series.map((item, idx) => (
             <motion.div 
               key={item.id}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
             >
                <div className="flex-1 relative group overflow-hidden rounded-2xl">
                   <img src={item.image} alt={item.name} className="w-full h-auto grayscale group-hover:grayscale-0 transition duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="flex-1 space-y-10">
                   <span className="text-red-600 font-black text-sm tracking-[5px] uppercase">{item.category}</span>
                   <h4 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">{item.name}</h4>
                   <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-xl">{item.description}</p>
                   <ul className="grid grid-cols-2 gap-6">
                      {item.sellingPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-300">
                           <div className="w-2 h-2 bg-red-600 rotate-45" /> {point}
                        </li>
                      ))}
                   </ul>
                   <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[4px] group">
                      Explore {item.name} <ArrowRight size={16} className="text-red-600 group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* OEM/ODM SOLUTIONS */}
      <section id="oem" className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={company.images.customization} alt="Customization" className="w-full h-full object-cover grayscale opacity-20" />
           <div className="absolute inset-0 bg-black/80" />
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6">
           <div className="text-center mb-32">
              <h3 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter mb-8 text-white">BESPOKE <span className="text-red-600">MANUFACTURING</span></h3>
              <p className="text-zinc-400 font-bold uppercase tracking-[4px] max-w-2xl mx-auto">Turnkey OEM/ODM solutions for brands, fleets, and specialized tuning shops.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: 'Concept & Design', icon: <PenTool size={40} />, desc: 'Photorealistic 2D/3D renderings delivered within 24 hours.' },
                { title: 'Structural FEA', icon: <Target size={40} />, desc: 'Simulated load testing to ensure optimal weight-to-strength ratio.' },
                { title: 'Precision CNC', icon: <Wrench size={40} />, desc: 'High-tolerance machining on 10,000-ton forged aerospace blanks.' },
                { title: 'Global Logistics', icon: <Truck size={40} />, desc: 'Factory-direct worldwide shipping with DDP services available.' }
              ].map((service, sIdx) => (
                <div key={sIdx} className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/5 hover:border-red-600/50 transition-all group">
                   <div className="text-red-600 mb-8 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                   <h5 className="text-2xl font-black uppercase tracking-tight mb-6">{service.title}</h5>
                   <p className="text-zinc-500 text-sm font-medium leading-relaxed uppercase tracking-wider">{service.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* REAL INSTALLS (GALLERY PREVIEW) */}
      <section id="gallery" className="py-40 bg-white text-black">
        <div className="max-w-[1600px] mx-auto px-6">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
              <div>
                <h3 className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">REAL <span className="text-red-600">INSTALLS</span></h3>
                <p className="text-zinc-500 font-bold uppercase tracking-[4px]">Precision engineering on the world's finest vehicles.</p>
              </div>
              <Link href="/gallery" className="bg-black text-white px-10 py-4 rounded font-black text-xs uppercase tracking-[4px] hover:bg-red-600 transition-colors shadow-2xl">
                Enter Gallery
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cases.slice(0, 3).map((item, idx) => (
                <div key={item.id} className="group cursor-pointer overflow-hidden rounded-xl relative">
                   <div className="aspect-[16/10] overflow-hidden">
                      <img src={item.image} alt={item.car} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700" />
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                      <p className="text-red-600 font-black text-[10px] tracking-[4px] uppercase mb-2">{item.wheel}</p>
                      <h4 className="text-white text-2xl font-black uppercase italic tracking-tighter">{item.car}</h4>
                   </div>
                </div>
              ))}
           </div>
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
                 {company.description}
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
                  <Link href="/gallery" className="hover:text-red-600 transition">Gallery</Link>
                  <Link href="/insights" className="hover:text-red-600 transition">Insights</Link>
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
                    <p className="group-hover:text-white transition">{company.email}</p>
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

      {/* FLOATING CTAs */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-5">
         <div className="group relative">
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded text-[10px] font-black uppercase tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl border border-white/5">Chat WhatsApp</div>
            <a 
              href={`https://wa.me/${company.whatsapp}`}
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
