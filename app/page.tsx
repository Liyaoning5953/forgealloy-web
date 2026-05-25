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
  Heart,
  ChevronDown,
  Search
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
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
              <h2 className="text-4xl font-black border-l-4 border-red-600 pl-8 uppercase tracking-tight text-white">Technical Data</h2>
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
                    <p className="text-2xl font-black tracking-tight text-white">{val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/10 p-10 rounded-[40px]">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight text-white">Need Help?</h3>
              <p className="text-zinc-400 mb-8 font-medium">Contact our technical experts for custom fitment advice and wholesale pricing.</p>
              <div className="space-y-4">
                <a href={`mailto:${company.email}`} className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-red-500 transition">
                  <Mail className="text-red-500" /> <span className="text-xs font-bold text-white">{company.email}</span>
                </a>
                <a href={`https://wa.me/${company.whatsapp}`} className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-red-500 transition">
                  <Phone className="text-red-500" /> <span className="text-xs font-bold text-white">{company.phone}</span>
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
              <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center text-[10px] font-black tracking-[2.5px] text-zinc-500">
                <div className="flex gap-10 italic">
                  <span>FORGED PERFORMANCE. BUILT WITHOUT COMPROMISE.</span>
                </div>
                <div className="flex gap-10 items-center">
                  <div className="flex gap-6">
                    <span className="flex items-center gap-2 cursor-pointer hover:text-white transition uppercase"><User size={12} /> Dealer Login</span>
                    <span className="flex items-center gap-2 cursor-pointer hover:text-white transition uppercase"><Download size={12} /> Download Catalog</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-2 text-zinc-300"><Phone size={12} className="text-red-600" /> {company.phone}</span>
                  <div className="relative group cursor-pointer">
                    <span className="flex items-center gap-2 hover:text-white transition uppercase text-zinc-300">
                       <Globe size={12} className="text-red-600" /> {currentLang} <ChevronDown size={10} />
                    </span>
                    <div className="absolute top-full right-0 mt-3 bg-zinc-900 border border-white/10 rounded-xl py-4 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-2xl">
                      {['English', 'Español', 'Français', 'Deutsch', '中文'].map(lang => (
                        <button key={lang} onClick={() => setCurrentLang(lang)} className="w-full text-left px-6 py-3 hover:bg-red-600 hover:text-white transition uppercase text-[10px] font-black tracking-[1px]">{lang}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
              <div className="max-w-[1600px] mx-auto px-10 py-6 flex justify-between items-center">
                <div className="flex items-center gap-16">
                  <h1 onClick={() => {setActivePage('home'); window.scrollTo(0,0);}} className="text-3xl font-black italic tracking-tighter cursor-pointer flex items-center gap-3">
                    <span className="bg-red-600 px-3 py-1 rounded not-italic">F</span> ForgeAlloy
                  </h1>
                  <nav className="hidden xl:flex gap-12 text-[12px] font-black tracking-[4px] text-zinc-400">
                    <a href="#home" className="text-red-600">HOME</a>
                    <div className="relative group">
                       <a href="#wheels" className="hover:text-red-500 transition flex items-center gap-1">WHEELS <ChevronDown size={14} /></a>
                       <div className="absolute top-full left-0 mt-5 bg-zinc-900 border border-white/10 rounded-2xl py-6 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
                          {['Monoblock', '2-Piece', '3-Piece', 'Off-Road', 'Truck'].map(t => (
                            <button key={t} onClick={() => setSelectedCategory(t.toUpperCase())} className="w-full text-left px-8 py-3 hover:text-red-600 transition text-[11px] font-black tracking-[2px]">{t.toUpperCase()}</button>
                          ))}
                       </div>
                    </div>
                    <a href="#gallery" className="hover:text-red-500 transition">GALLERY</a>
                    <a href="#oem" className="hover:text-red-500 transition">OEM/ODM</a>
                    <a href="#dealer" className="hover:text-red-500 transition">DEALER</a>
                    <a href="#footer" className="hover:text-red-500 transition">ABOUT US</a>
                    <a href="#footer" className="hover:text-red-500 transition">CONTACT</a>
                  </nav>
                </div>
                <div className="flex items-center gap-8">
                  <button onClick={() => setShowInquiryModal(true)} className="bg-red-600 px-10 py-4 rounded-full font-black text-[12px] tracking-[3px] hover:bg-red-500 transition shadow-[0_0_30px_rgba(220,38,38,0.3)]">INQUIRY NOW</button>
                  <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}><Menu size={28} /></button>
                </div>
              </div>
            </header>

            {/* HERO */}
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105" alt="Hero" />
              <div className="relative z-20 max-w-[1600px] mx-auto px-10 w-full pt-20">
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                  <h1 className="text-8xl lg:text-[180px] font-black leading-[0.8] mb-10 tracking-tighter uppercase">Forged to<br /><span className="text-red-600">Perform</span></h1>
                  <p className="text-2xl text-zinc-300 mb-16 max-w-2xl leading-relaxed font-medium drop-shadow-2xl">{company.tagline}</p>
                  
                  <div className="flex flex-wrap gap-20 mb-20">
                    {[
                      { label: 'PRECISION', sub: 'Engineered', icon: Settings },
                      { label: 'PREMIUM', sub: 'Quality', icon: ShieldCheck },
                      { label: 'LIGHTWEIGHT', sub: 'Stronger', icon: BarChart },
                      { label: 'CUSTOM', sub: 'Made', icon: Users },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-4 group cursor-default">
                        <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-red-600 transition-all duration-500">
                          <item.icon size={28} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
                        </div>
                        <div className="text-center">
                          <p className="text-[12px] font-black tracking-[4px] uppercase">{item.label}</p>
                          <p className="text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase mt-1">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-8">
                    <button className="bg-red-600 px-14 py-7 rounded-full font-black tracking-[4px] text-[14px] hover:bg-red-500 transition shadow-[0_0_50px_rgba(220,38,38,0.4)] uppercase flex items-center gap-4">Shop All Wheels <ArrowRight size={20} /></button>
                    <button className="bg-white/5 backdrop-blur-md border border-white/20 px-14 py-7 rounded-full font-black tracking-[4px] text-[14px] hover:bg-white/10 transition uppercase">View Gallery</button>
                  </div>
                </motion.div>
              </div>

              {/* STATS FLOATING */}
              <div className="absolute bottom-12 w-full z-20">
                <div className="max-w-[1600px] mx-auto px-10">
                   <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[40px] py-12 px-16 grid grid-cols-2 lg:grid-cols-4 gap-12">
                      {company.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-8 group">
                          <div className="p-4 bg-red-600/10 rounded-2xl border border-red-600/20 group-hover:bg-red-600 group-hover:scale-110 transition-all duration-500">
                            {i === 0 && <BarChart size={24} className="text-red-600 group-hover:text-white" />}
                            {i === 1 && <Clock size={24} className="text-red-600 group-hover:text-white" />}
                            {i === 2 && <Globe size={24} className="text-red-600 group-hover:text-white" />}
                            {i === 3 && <CheckCircle size={24} className="text-red-600 group-hover:text-white" />}
                          </div>
                          <div>
                            <p className="text-5xl font-black tracking-tighter text-white uppercase leading-none mb-1">{stat.value}</p>
                            <p className="text-[11px] text-zinc-500 font-black tracking-[3px] uppercase">{stat.label}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </section>

             {/* TRUST BANNER (48H / 15D / LIFETIME) */}
             <section className="py-20 bg-black">
                <div className="max-w-[1600px] mx-auto px-10">
                   <img src={(company as any).images.banner} alt="Lead Time and Warranty" className="w-full rounded-[40px] shadow-2xl border border-white/5" />
                </div>
             </section>

             {/* OUR WHEEL SERIES */}
            <section id="series" className="py-40 bg-zinc-950">
              <div className="max-w-[1600px] mx-auto px-10">
                <div className="mb-20">
                  <p className="text-red-600 font-black tracking-[6px] text-[13px] mb-4 uppercase">Exploration</p>
                  <h2 className="text-6xl font-black uppercase tracking-tighter">Our Wheel <span className="text-red-600">Series</span></h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                  {series.map((item) => (
                    <div key={item.id} className="group relative aspect-[3/4.5] rounded-[40px] overflow-hidden cursor-pointer border border-white/10 hover:border-red-600/50 transition-all duration-500">
                      <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-1000 opacity-40 grayscale group-hover:grayscale-0" alt={item.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 p-10 w-full text-center translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                        <p className="text-xl font-black tracking-tight mb-2 uppercase text-white">{item.name.replace(' SERIES', '')}</p>
                        <p className="text-[11px] text-zinc-500 font-black tracking-[2px] uppercase mb-8">{item.description}</p>
                        <span className="text-[11px] font-black border-b-2 border-red-600 pb-2 text-red-600 group-hover:text-white group-hover:border-white transition-all uppercase">View Series</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED WHEELS */}
            <section id="wheels" className="py-40 bg-black">
              <div className="max-w-[1600px] mx-auto px-10">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
                  <div className="w-full lg:w-auto">
                    <h2 className="text-6xl font-black mb-10 uppercase tracking-tighter">Featured <span className="text-red-600">Wheels</span></h2>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button 
                        onClick={() => setSelectedCategory('ALL')}
                        className={`px-10 py-3 rounded-full text-[12px] font-black tracking-[3px] transition border ${selectedCategory === 'ALL' ? 'bg-red-600 border-red-600 text-white shadow-2xl' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'}`}
                      >
                        ALL
                      </button>
                      {['DIAMETER', 'FINISH', 'VEHICLE TYPE'].map(f => (
                        <div key={f} className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-black tracking-[2px] text-zinc-400 flex items-center gap-2 cursor-pointer hover:border-white transition">
                          {f} <ChevronDown size={14} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-white/5 px-8 py-3 rounded-full text-[12px] font-black tracking-[3px] text-zinc-400 hover:bg-red-600 hover:text-white transition uppercase">View All Products →</button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10">
                  {filteredWheels.map((wheel) => (
                    <motion.div layout key={wheel.id} className="group bg-zinc-900/20 rounded-[48px] overflow-hidden border border-white/5 hover:border-red-600/30 transition-all duration-500">
                      <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center p-6">
                        <img src={wheel.image} className="w-full h-full object-contain group-hover:scale-110 transition duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" alt={wheel.name} />
                      </div>
                      <div className="p-10">
                        <h3 className="text-3xl font-black tracking-tighter mb-8 uppercase text-white leading-none">{wheel.name}</h3>
                        <div className="space-y-4 mb-10">
                          {[
                            ['Type', wheel.category.split(' ')[0]],
                            ['Size', wheel.size],
                            ['Finish', wheel.finish],
                            ['PCD', wheel.pcd],
                            ['Offset', wheel.offset],
                          ].map(([label, val]) => (
                            <div key={label} className="flex justify-between items-center text-[11px] font-black uppercase">
                              <span className="text-zinc-600 tracking-[3px]">{label}:</span>
                              <span className="text-zinc-300 tracking-[1.5px] truncate max-w-[120px] text-right">{val}</span>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => { setSelectedWheel(wheel); setActivePage('product'); window.scrollTo(0,0); }}
                          className="w-full text-center text-[12px] font-black tracking-[4px] text-zinc-500 group-hover:text-red-500 transition uppercase pt-8 border-t border-white/5"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

             {/* PRODUCTION PROCESS */}
             <section id="oem" className="py-40 bg-zinc-950 border-t border-white/5">
                <div className="max-w-[1600px] mx-auto px-10">
                   <div className="max-w-4xl mb-24">
                      <p className="text-red-600 font-black tracking-[6px] text-sm mb-6 uppercase">Manufacturing Excellence</p>
                      <h2 className="text-7xl lg:text-9xl font-black mb-10 uppercase tracking-tighter leading-[0.8]">Production <span className="text-white">Process</span></h2>
                      <p className="text-2xl text-zinc-400 font-medium leading-relaxed uppercase tracking-wider">From aerospace-grade aluminum to high-precision CNC machining.</p>
                   </div>
                   
                   <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
                      <div className="space-y-12">
                         <div className="bg-white/5 p-12 rounded-[48px] border border-white/10">
                            <h3 className="text-3xl font-black mb-8 uppercase tracking-tight text-white">12-Step <span className="text-red-600">Precision</span></h3>
                            <p className="text-zinc-500 text-[14px] font-black leading-relaxed mb-12 uppercase tracking-[2px]">Our integrated manufacturing workflow ensures zero-defect quality and maximum structural integrity.</p>
                            <img src={(company as any).images.process} alt="Process Map" className="w-full rounded-3xl" />
                         </div>
                      </div>
                      <div className="grid grid-cols-1 gap-12">
                         <div className="bg-white/5 p-12 rounded-[48px] border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-2xl font-black mb-4 uppercase text-white">Advanced Machinery</h3>
                            <p className="text-zinc-500 text-[12px] font-black tracking-[2px] mb-8 uppercase">State-of-the-art CNC centers and forging presses.</p>
                            <img src={(company as any).images.manufacturing} alt="Manufacturing" className="w-full rounded-2xl grayscale group-hover:grayscale-0 transition duration-700" />
                         </div>
                      </div>
                   </div>

                   <div className="grid lg:grid-cols-2 gap-20">
                      <div className="bg-zinc-900/50 p-12 rounded-[56px] border border-white/5 group">
                         <h3 className="text-3xl font-black mb-10 uppercase tracking-tight text-white">Customization <span className="text-red-600">Options</span></h3>
                         <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/2">
                               <p className="text-zinc-500 text-[12px] font-black leading-relaxed mb-10 uppercase tracking-[2px]">PCD, Offset, CB, Color, and Engraving. We bring your vision to life.</p>
                               <ul className="space-y-4 text-[13px] font-black uppercase tracking-[3px] text-zinc-300">
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-red-600 rounded-full" /> Size / Width / Offset</li>
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-red-600 rounded-full" /> PCD / Center Bore</li>
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-red-600 rounded-full" /> Custom Engraving</li>
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-red-600 rounded-full" /> Aerodynamic Rings</li>
                               </ul>
                            </div>
                            <img src={(company as any).images.customization} alt="Customization" className="lg:w-1/2 rounded-3xl shadow-2xl" />
                         </div>
                      </div>
                      <div className="bg-zinc-900/50 p-12 rounded-[56px] border border-white/5 group">
                         <h3 className="text-3xl font-black mb-10 uppercase tracking-tight text-white">Packaging <span className="text-red-600">Protection</span></h3>
                         <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/2">
                               <p className="text-zinc-500 text-[12px] font-black leading-relaxed mb-10 uppercase tracking-[2px]">5-Fold effective protection ensures your wheels arrive in pristine condition.</p>
                               <ul className="space-y-4 text-[13px] font-black uppercase tracking-[3px] text-zinc-300">
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-green-500 rounded-full" /> Protective Cap</li>
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-green-500 rounded-full" /> Dust Bag</li>
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-green-500 rounded-full" /> Sponge Foam</li>
                                  <li className="flex items-center gap-4"><div className="w-2 h-2 bg-green-500 rounded-full" /> High-strength Carton</li>
                               </ul>
                            </div>
                            <img src={(company as any).images.packaging} alt="Packaging" className="lg:w-1/2 rounded-3xl shadow-2xl" />
                         </div>
                      </div>
                   </div>
                </div>
             </section>

             {/* OEM / ODM SOLUTIONS (Mini Version) */}
             <section className="py-24 bg-black border-y border-white/5">
                <div className="max-w-[1600px] mx-auto px-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                   <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter">Ready for <span className="text-red-600">OEM Cooperation?</span></h3>
                      <p className="text-zinc-500 text-[12px] font-black tracking-[4px] uppercase mt-4">24H Design Service | 15 Days Production | Global Logistics</p>
                   </div>
                   <button onClick={() => setShowInquiryModal(true)} className="bg-red-600 px-16 py-7 rounded-full font-black tracking-[5px] text-[15px] hover:bg-red-500 transition shadow-2xl uppercase">Start Project Inquiry</button>
                </div>
             </section>

            {/* GALLERY & INSPIRATION */}
            <section id="gallery" className="py-40 bg-black">
              <div className="max-w-[1600px] mx-auto px-10">
                <div className="flex justify-between items-end mb-24">
                   <h2 className="text-6xl font-black uppercase tracking-tighter">Gallery & <span className="text-red-600">Inspiration</span></h2>
                   <div className="flex gap-4">
                      <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition"><ChevronLeft /></button>
                      <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition"><ChevronRight /></button>
                   </div>
                </div>
                <div className="grid lg:grid-cols-4 gap-8">
                  {[
                    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=1200&auto=format&fit=crop',
                  ].map((img, i) => (
                    <div key={i} className="rounded-[48px] overflow-hidden aspect-[4/5] group cursor-pointer border border-white/10 relative">
                      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Gallery" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                         <Search size={48} className="text-white scale-75 group-hover:scale-100 transition duration-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DEALER PROGRAM */}
            <section id="dealer" className="relative py-48 bg-red-600 overflow-hidden group">
               <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
               <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <div className="max-w-[1600px] mx-auto px-10 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-24">
                  <div className="text-center lg:text-left">
                     <p className="text-white/70 font-black tracking-[6px] text-sm mb-6 uppercase">Partnership</p>
                     <h2 className="text-8xl lg:text-[140px] font-black tracking-tighter mb-10 uppercase leading-[0.8] text-white">Grow with<br />ForgeAlloy</h2>
                     <p className="text-red-100 text-2xl font-medium max-w-2xl leading-relaxed uppercase tracking-wider">Empowering distributors worldwide with engineering excellence and unmatched B2B support.</p>
                  </div>
                  <div className="flex flex-col gap-8 w-full lg:w-auto">
                     <button className="bg-white text-red-600 px-20 py-8 rounded-full font-black tracking-[6px] text-[16px] hover:scale-105 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.3)] uppercase">Become a Dealer</button>
                     <div className="grid grid-cols-2 gap-8">
                        {[
                          { label: 'Competitive Pricing', icon: BarChart },
                          { label: 'Marketing Support', icon: Users },
                          { label: 'Exclusive Territory', icon: MapPin },
                          { label: 'New Design Priority', icon: CheckCircle },
                        ].map(item => (
                          <div key={item.label} className="flex flex-col items-center gap-3">
                             <item.icon size={28} className="text-white/60" />
                             <p className="text-[10px] font-black tracking-[2px] text-white/80 text-center uppercase">{item.label}</p>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* FOOTER */}
            <footer id="footer" className="bg-zinc-950 pt-48 pb-20 border-t border-white/5">
              <div className="max-w-[1600px] mx-auto px-10 grid lg:grid-cols-4 gap-24 mb-40">
                <div className="space-y-12">
                  <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-4 uppercase">
                    <img src={company.logo} alt={company.name} className="h-8 w-auto rounded" />
                    <span>ForgeAlloy</span>
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed font-bold uppercase tracking-[2px]">{company.tagline}</p>
                  <div className="flex gap-6">
                    {['FB', 'IG', 'YT', 'PN'].map(s => <div key={s} className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer font-black text-xs">{s}</div>)}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[14px] font-black tracking-[6px] mb-12 uppercase text-red-600">Wheel Series</h4>
                  <div className="flex flex-col gap-6 text-[12px] font-black tracking-[3px] text-zinc-500 uppercase">
                    {['YP Series (Monoblock)', 'FW Series (2-Piece)', '3-Piece Collection', 'Off-Road Series', 'Heavy Duty Truck', 'Custom Design'].map(l => <a key={l} href="#" className="hover:text-white transition">{l}</a>)}
                  </div>
                </div>

                <div>
                  <h4 className="text-[14px] font-black tracking-[6px] mb-12 uppercase text-red-600">Contact Us</h4>
                  <div className="space-y-10">
                    <div className="flex gap-6">
                      <Phone className="text-red-600 shrink-0" size={28} />
                      <div>
                        <p className="text-[11px] text-zinc-500 font-black tracking-widest uppercase mb-2">Technical Support</p>
                        <p className="text-xl font-black tracking-tight text-white">{company.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <Mail className="text-red-600 shrink-0" size={28} />
                      <div>
                        <p className="text-[11px] text-zinc-500 font-black tracking-widest uppercase mb-2">Global Sales</p>
                        <p className="text-xl font-black tracking-tight text-white lowercase">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <MapPin className="text-red-600 shrink-0" size={28} />
                      <div>
                        <p className="text-[11px] text-zinc-500 font-black tracking-widest uppercase mb-2">Corporate Office</p>
                        <p className="text-xs font-black tracking-widest text-zinc-300 leading-relaxed uppercase">{company.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-12 rounded-[56px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] group-hover:bg-red-600/20 transition-all" />
                  <h4 className="text-2xl font-black mb-8 uppercase tracking-tight text-white">Dealer <span className="text-red-600">Portal</span></h4>
                  <p className="text-zinc-500 text-[11px] font-black leading-relaxed mb-10 uppercase tracking-[2px]">Log in to access wholesale pricing, 3D configurators, and priority manufacturing queues.</p>
                  <button className="w-full bg-white text-black py-5 rounded-2xl font-black tracking-[4px] text-[11px] hover:bg-zinc-200 transition uppercase shadow-2xl">Distributor Login</button>
                </div>
              </div>

              <div className="max-w-[1600px] mx-auto px-10 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                <p className="text-[11px] text-zinc-600 font-black tracking-[5px] uppercase italic">© 2024 ForgeAlloy Racing Technology. All Rights Reserved.</p>
                <div className="flex gap-12 text-[11px] text-zinc-600 font-black tracking-[5px] uppercase">
                  <a href="#" className="hover:text-white transition">Terms</a>
                  <a href="#" className="hover:text-white transition">Privacy</a>
                  <a href="#" className="hover:text-white transition">Cookies</a>
                </div>
              </div>
            </footer>

            {/* FLOATING WHATSAPP COMPONENT */}
            <div className="fixed bottom-12 right-12 z-[80] flex flex-col items-end gap-6 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }}
                className="bg-black/90 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] pointer-events-auto group hidden md:flex items-center gap-6"
              >
                <div className="relative">
                   <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute inset-0" />
                   <div className="w-4 h-4 bg-green-500 rounded-full relative" />
                </div>
                <div>
                  <p className="text-[11px] font-black tracking-[3px] text-zinc-500 uppercase">Support Online</p>
                  <p className="text-[14px] font-black tracking-tight text-white">Chat with Engineeers</p>
                </div>
              </motion.div>
              <a 
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                className="bg-[#25D366] p-7 rounded-[32px] shadow-[0_0_60px_rgba(37,211,102,0.5)] hover:scale-110 hover:-rotate-6 active:scale-95 transition-all duration-300 pointer-events-auto group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <MessageCircle size={36} className="text-white relative z-10" />
                <span className="absolute right-full mr-8 top-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-3 rounded-2xl text-[14px] font-black tracking-[4px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-10 group-hover:translate-x-0 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">WHATSAPP NOW</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

