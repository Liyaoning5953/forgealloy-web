'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Settings, 
  ShieldCheck, 
  User, 
  BarChart, 
  Truck, 
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Download,
  Users,
  Globe,
  MessageCircle,
  Clock,
  Heart
} from 'lucide-react';
import { company, wheels, series, oemFeatures, finishes } from '@/lib/data';

const IconMap: any = {
  Settings,
  ShieldCheck,
  User,
  BarChart,
  Truck,
  CheckCircle,
};

export default function ForgedWheelCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedWheel, setSelectedWheel] = useState<any>(null);
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  const filteredWheels = useMemo(() => {
    if (selectedCategory === 'ALL') return wheels;
    return wheels.filter((wheel) => wheel.category.toUpperCase().includes(selectedCategory));
  }, [selectedCategory]);

  const InquiryModal = () => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-zinc-900 border border-white/10 p-10 rounded-[40px] max-w-xl w-full relative"
      >
        <button onClick={() => setShowInquiryModal(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X /></button>
        <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">Quick <span className="text-red-600">Inquiry</span></h2>
        <p className="text-zinc-400 mb-8">Send your requirements and get a quote within 24 hours.</p>
        <div className="space-y-4">
          <input placeholder="Your Name" className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:border-red-600 outline-none transition" />
          <input placeholder="Email Address" className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:border-red-600 outline-none transition" />
          <textarea rows={4} placeholder="Wheel Model, Sizes, and Quantity..." className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:border-red-600 outline-none transition" />
          <button className="w-full bg-red-600 py-5 rounded-xl font-black tracking-widest text-sm hover:bg-red-500 transition uppercase">Submit Request</button>
        </div>
      </motion.div>
    </motion.div>
  );

  const ProductDetailPage = ({ wheel }: { wheel: any }) => {
    const [detailFinish, setDetailFinish] = useState(wheel.finish || 'Gloss Black');
    if (!wheel) return null;
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black text-white">
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img src={wheel.image} className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110" alt={wheel.name} />
          <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <button 
                onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }}
                className="text-red-600 flex items-center gap-2 mb-10 font-black tracking-widest text-[10px] hover:translate-x-[-5px] transition uppercase"
              >
                <ChevronLeft size={16} /> BACK TO COLLECTION
              </button>
              <div className="inline-block bg-red-600/10 border border-red-600/30 text-red-500 px-4 py-1 rounded-full text-[10px] font-black tracking-[2px] mb-6 uppercase">
                {wheel.category}
              </div>
              <h1 className="text-7xl lg:text-9xl font-black mb-6 uppercase tracking-tighter">{wheel.name}</h1>
              <p className="text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">Precision-engineered forged aluminum wheel. Built for strength, style, and extreme performance.</p>
              
              <div className="space-y-8 mb-12">
                <div>
                  <p className="text-[10px] font-black tracking-[3px] text-zinc-500 mb-4 uppercase">Select Finish</p>
                  <div className="flex flex-wrap gap-3">
                    {finishes.map((f) => (
                      <button 
                        key={f} 
                        onClick={() => setDetailFinish(f)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition border ${detailFinish === f ? 'bg-red-600 border-red-600 text-white' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'}`}
                      >
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <button onClick={() => setShowInquiryModal(true)} className="bg-red-600 px-10 py-5 rounded-full font-black tracking-widest text-[12px] hover:bg-red-500 transition shadow-[0_0_30px_rgba(220,38,38,0.3)]">INQUIRY NOW</button>
                <a 
                  href={`https://wa.me/${company.whatsapp}?text=Hello, I am interested in the ${wheel.name} (${detailFinish}) forged wheel.`}
                  target="_blank"
                  className="bg-zinc-800 border border-white/10 px-10 py-5 rounded-full font-black tracking-widest text-[12px] hover:bg-zinc-700 transition flex items-center gap-3"
                >
                  <MessageCircle size={18} className="text-green-500" /> WHATSAPP
                </a>
              </div>
            </motion.div>
            
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative aspect-square">
              <div className="absolute inset-0 bg-red-600/20 blur-[150px] rounded-full" />
              <img src={wheel.image} className="relative w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]" alt={wheel.name} />
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-zinc-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <h2 className="text-4xl font-black border-l-4 border-red-600 pl-8 uppercase tracking-tight">Technical Data</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  ['Wheel Model', wheel.name],
                  ['Construction', wheel.category],
                  ['Process', 'Fully Forged T6061-T6'],
                  ['Chosen Finish', detailFinish],
                  ['Size Availability', wheel.size],
                  ['PCD Range', wheel.pcd],
                  ['Offset (ET)', wheel.offset],
                  ['Quality Standard', 'ISO9001 / DOT / TUV Ready'],
                ].map(([label, val]) => (
                  <div key={label} className="border-b border-white/5 pb-4">
                    <p className="text-[10px] text-zinc-500 font-black tracking-widest mb-2 uppercase">{label}</p>
                    <p className="text-2xl font-black tracking-tight">{val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/10 p-10 rounded-[40px]">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Need Help?</h3>
              <p className="text-zinc-400 mb-8 font-medium">Contact our technical experts for custom fitment advice and wholesale pricing.</p>
              <div className="space-y-4">
                <a href={`mailto:${company.email}`} className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-red-500 transition">
                  <Mail className="text-red-500" /> <span className="text-xs font-bold">{company.email}</span>
                </a>
                <a href={`https://wa.me/${company.whatsapp}`} className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-red-500 transition">
                  <Phone className="text-red-500" /> <span className="text-xs font-bold">{company.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <AnimatePresence>
        {showInquiryModal && <InquiryModal key="inquiry" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activePage === 'product' && selectedWheel ? (
          <ProductDetailPage key="product" wheel={selectedWheel} />
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* TOP BAR */}
            <div className="bg-zinc-950 border-b border-white/5 py-3 hidden lg:block">
              <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-black tracking-[2px] text-zinc-500">
                <div className="flex gap-8">
                  <span className="flex items-center gap-2"><Clock size={12} className="text-red-600" /> PRODUCTION: 30-35 DAYS</span>
                  <span className="flex items-center gap-2"><Globe size={12} className="text-red-600" /> GLOBAL SHIPPING AVAILABLE</span>
                </div>
                <div className="flex gap-8 items-center">
                  <div className="relative group cursor-pointer">
                    <span className="flex items-center gap-2 hover:text-white transition uppercase"><Globe size={12} /> {currentLang} <ChevronRight size={10} className="rotate-90" /></span>
                    <div className="absolute top-full right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg py-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                      {['English', 'Español', 'Français', 'Deutsch', '中文'].map(lang => (
                        <button key={lang} onClick={() => setCurrentLang(lang)} className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition uppercase text-[9px]">{lang}</button>
                      ))}
                    </div>
                  </div>
                  <span className="flex items-center gap-2"><Phone size={12} /> {company.phone}</span>
                </div>
              </div>
            </div>

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
              <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <div className="flex items-center gap-12">
                  <h1 onClick={() => {setActivePage('home'); window.scrollTo(0,0);}} className="text-2xl font-black italic tracking-tighter cursor-pointer flex items-center gap-2">
                    <span className="bg-red-600 px-2 py-1 rounded not-italic">F</span> ForgeAlloy
                  </h1>
                  <nav className="hidden xl:flex gap-10 text-[11px] font-black tracking-[3px] text-zinc-400">
                    {['HOME', 'WHEELS', 'GALLERY', 'OEM/ODM', 'DEALER', 'ABOUT'].map(link => (
                      <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-red-500 transition">{link}</a>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center gap-6">
                  <button onClick={() => setShowInquiryModal(true)} className="bg-red-600 px-8 py-3 rounded-full font-black text-[11px] tracking-[2px] hover:bg-red-500 transition shadow-[0_0_20px_rgba(220,38,38,0.2)]">INQUIRY NOW</button>
                  <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}><Menu /></button>
                </div>
              </div>
            </header>

            {/* MOBILE MENU */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[100] bg-black p-10 flex flex-col items-center justify-center gap-10">
                  <button className="absolute top-10 right-10" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
                  {['HOME', 'WHEELS', 'GALLERY', 'OEM/ODM', 'DEALER'].map(link => (
                    <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase tracking-tighter">{link}</a>
                  ))}
                  <button onClick={() => { setShowInquiryModal(true); setMobileMenuOpen(false); }} className="bg-red-600 w-full py-6 rounded-2xl font-black text-xl tracking-widest">INQUIRY NOW</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HERO */}
            <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105" alt="Hero" />
              <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-32">
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <p className="text-red-600 font-black tracking-[8px] text-[12px] mb-6 uppercase">Mastercrafted in Shandong</p>
                  <h1 className="text-8xl lg:text-[160px] font-black leading-[0.85] mb-8 tracking-tighter uppercase">Forged to<br /><span className="text-red-600">Perform</span></h1>
                  <p className="text-xl text-zinc-300 mb-16 max-w-xl leading-relaxed font-medium">{company.tagline}</p>
                  <div className="flex flex-wrap gap-16 mb-20">
                    {company.stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-5xl font-black tracking-tighter mb-1 uppercase">{stat.value}</p>
                        <p className="text-[10px] text-zinc-500 font-black tracking-[3px] uppercase">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    <button className="bg-red-600 px-12 py-6 rounded-full font-black tracking-widest text-[13px] hover:bg-red-500 transition uppercase flex items-center gap-3">Explore Catalog <ArrowRight size={18} /></button>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-6 rounded-full font-black tracking-widest text-[13px] hover:bg-white/20 transition uppercase">Gallery</button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* SERIES */}
            <section id="series" className="py-32 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <p className="text-red-600 font-black tracking-[4px] text-[11px] mb-4 uppercase">Wheel Categories</p>
                    <h2 className="text-5xl font-black uppercase tracking-tight">Our <span className="text-red-600">Series</span></h2>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
                  {series.map((item) => (
                    <div key={item.id} className="group relative aspect-[3/4.5] rounded-[32px] overflow-hidden cursor-pointer border border-white/5">
                      <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000 opacity-40" alt={item.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-0 p-8 w-full text-center">
                        <p className="text-lg font-black tracking-tight mb-2 uppercase">{item.name.replace(' SERIES', '')}</p>
                        <p className="text-[10px] text-zinc-500 font-black tracking-[2px] uppercase mb-6">{item.description}</p>
                        <span className="text-[10px] font-black border-b-2 border-red-600 pb-2 group-hover:text-red-500 transition uppercase">View Series</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CATALOG */}
            <section id="wheels" className="py-32 bg-black">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
                  <div className="w-full lg:w-auto">
                    <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Featured <span className="text-red-600">Wheels</span></h2>
                    <div className="flex flex-wrap gap-3">
                      {['ALL', 'MONOBLOCK', '2-PIECE', 'OFF-ROAD', 'TRUCK'].map((cat) => (
                        <button 
                          key={cat} 
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-8 py-3 rounded-full text-[11px] font-black tracking-[2px] transition border ${selectedCategory === cat ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-white/5 border-white/5 text-zinc-500 hover:text-white'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="text-[12px] font-black tracking-[3px] text-zinc-600 hover:text-red-500 transition border-b border-zinc-800 pb-2">BROWSE FULL CATALOG →</button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                  {filteredWheels.map((wheel) => (
                    <motion.div layout key={wheel.id} className="group bg-zinc-900/30 rounded-[40px] overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500">
                      <div className="relative aspect-square overflow-hidden bg-zinc-900">
                        <img src={wheel.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={wheel.name} />
                        <div className="absolute top-6 left-6 bg-red-600 text-[9px] font-black px-3 py-1 rounded-full uppercase">{wheel.category.split(' ')[0]}</div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-black tracking-tighter mb-6 uppercase">{wheel.name}</h3>
                        <div className="space-y-3 mb-10">
                          {[
                            ['Size', wheel.size],
                            ['Finish', wheel.finish],
                            ['PCD', wheel.pcd],
                          ].map(([label, val]) => (
                            <div key={label} className="flex justify-between items-center text-[10px] font-black uppercase">
                              <span className="text-zinc-600 tracking-[2px]">{label}:</span>
                              <span className="text-zinc-300 tracking-[1px]">{val}</span>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => { setSelectedWheel(wheel); setActivePage('product'); window.scrollTo(0,0); }}
                          className="w-full text-center text-[11px] font-black tracking-[3px] text-zinc-500 group-hover:text-red-500 transition uppercase pt-4 border-t border-white/5"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* DEALER SECTION (PROMINENT) */}
            <section id="dealer" className="py-32 bg-red-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
              <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="text-center lg:text-left">
                  <h2 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 uppercase leading-none">Become a<br />Partner</h2>
                  <p className="text-red-100 text-xl font-medium max-w-xl">Join ForgeAlloy\'s global dealer network. Get exclusive territories and priority access to our latest forged designs.</p>
                </div>
                <div className="flex flex-col gap-6 w-full lg:w-auto">
                  <button className="bg-white text-red-600 px-16 py-7 rounded-full font-black tracking-[4px] text-sm hover:scale-105 transition shadow-2xl uppercase">Apply for Dealership</button>
                  <button className="bg-black/20 backdrop-blur-md border border-white/20 px-16 py-7 rounded-full font-black tracking-[4px] text-sm hover:bg-black/30 transition uppercase">Download Partner Kit</button>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer id="footer" className="bg-zinc-950 pt-32 pb-16">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-20 mb-32">
                <div className="space-y-10">
                  <h2 className="text-3xl font-black italic tracking-tighter flex items-center gap-2 uppercase">
                    <span className="bg-red-600 px-2 py-1 rounded not-italic">F</span> ForgeAlloy
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium uppercase tracking-wider">{company.description}</p>
                  <div className="flex gap-4">
                    {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition cursor-pointer"><Users size={18} /></div>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-[12px] font-black tracking-[4px] mb-10 uppercase text-red-600">Quick Links</h4>
                  <div className="flex flex-col gap-5 text-[11px] font-black tracking-[2px] text-zinc-500 uppercase">
                    {['Home', 'Wheel Collection', 'Vehicle Gallery', 'OEM & ODM', 'Dealer Program', 'About Us', 'Contact Us'].map(l => <a key={l} href="#" className="hover:text-white transition">{l}</a>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-[12px] font-black tracking-[4px] mb-10 uppercase text-red-600">Contact Us</h4>
                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <Phone className="text-red-600 shrink-0" size={24} />
                      <div>
                        <p className="text-[10px] text-zinc-500 font-black tracking-widest uppercase mb-1">WhatsApp / Phone</p>
                        <p className="text-lg font-black tracking-tight">{company.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <Mail className="text-red-600 shrink-0" size={24} />
                      <div>
                        <p className="text-[10px] text-zinc-500 font-black tracking-widest uppercase mb-1">Email Inquiry</p>
                        <p className="text-lg font-black tracking-tight lowercase">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <MapPin className="text-red-600 shrink-0" size={24} />
                      <div>
                        <p className="text-[10px] text-zinc-500 font-black tracking-widest uppercase mb-1">Global Headquarter</p>
                        <p className="text-[11px] font-black tracking-tight leading-relaxed uppercase">{company.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-900 p-8 rounded-[40px] border border-white/5">
                  <h4 className="text-lg font-black mb-6 uppercase tracking-tight">Dealer <span className="text-red-600">Entrance</span></h4>
                  <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-8 uppercase tracking-widest">Access exclusive B2B inventory, real-time lead times, and technical fitment documents.</p>
                  <button className="w-full bg-white text-black py-4 rounded-2xl font-black tracking-[3px] text-[10px] hover:bg-zinc-200 transition uppercase">Dealer Dashboard</button>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] text-zinc-600 font-black tracking-[4px] uppercase">© 2024 ForgeAlloy Racing Tech. All Rights Reserved.</p>
                <div className="flex gap-10 text-[10px] text-zinc-600 font-black tracking-[4px] uppercase">
                  <a href="#" className="hover:text-white transition">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition">Terms of Use</a>
                </div>
              </div>
            </footer>

            {/* TRUE FLOATING WHATSAPP COMPONENT */}
            <div className="fixed bottom-10 right-10 z-[80] flex flex-col items-end gap-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl shadow-2xl pointer-events-auto group hidden md:flex items-center gap-4"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-[10px] font-black tracking-[2px] text-zinc-400 uppercase">Online Service</p>
                  <p className="text-[12px] font-black tracking-tight">Reply within 15 min</p>
                </div>
              </motion.div>
              <a 
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                className="bg-[#25D366] p-5 rounded-full shadow-[0_0_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto group relative"
              >
                <MessageCircle size={32} className="text-white" />
                <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-green-500 text-white px-5 py-2 rounded-xl text-[12px] font-black tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 shadow-2xl">WHATSAPP US</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
