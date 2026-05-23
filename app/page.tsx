'use client';

import { useMemo, useState } from 'react';
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
  Users
} from 'lucide-react';
import { company, wheels, series, oemFeatures } from '@/lib/data';

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

  const filteredWheels = useMemo(() => {
    if (selectedCategory === 'ALL') return wheels;
    return wheels.filter((wheel) => wheel.category.toUpperCase().includes(selectedCategory));
  }, [selectedCategory]);

  const ProductDetailPage = ({ wheel }: { wheel: any }) => {
    if (!wheel) return null;
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black text-white font-sans"
      >
        {/* Detail Hero */}
        <section className="relative h-[70vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img src={wheel.image} className="absolute inset-0 w-full h-full object-cover opacity-30" alt={wheel.name} />
          <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
            <button 
              onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }}
              className="text-red-500 flex items-center gap-2 mb-8 hover:translate-x-[-5px] transition"
            >
              <ChevronLeft size={20} /> BACK TO CATALOG
            </button>
            <h1 className="text-7xl font-black mb-4 uppercase">{wheel.name}</h1>
            <p className="text-2xl text-zinc-400 mb-8 max-w-2xl">{wheel.category} Engineered for Performance</p>
            <div className="flex gap-6">
              <button className="bg-red-600 px-8 py-4 rounded-full font-bold hover:bg-red-500 transition">INQUIRY NOW</button>
              <button className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition">TECH SPECS</button>
            </div>
          </div>
        </section>

        {/* Detail Specs */}
        <section className="py-24 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h2 className="text-4xl font-bold border-l-4 border-red-600 pl-6 uppercase">Product Specifications</h2>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                {[
                  ['Model', wheel.name],
                  ['Type', wheel.category],
                  ['Size Range', wheel.size],
                  ['Finish', wheel.finish],
                  ['PCD', wheel.pcd],
                  ['Offset', wheel.offset],
                  ['Material', 'T6061-T6 Forged Aluminum'],
                  ['Certification', 'ISO9001, DOT, FMVSS'],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-white/5 pb-4">
                    <p className="text-zinc-500 text-sm uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden border border-white/10">
              <img src={wheel.image} className="w-full h-full object-cover" alt={wheel.name} />
            </div>
          </div>
        </section>

        {/* Floating WhatsApp */}
        <a 
          href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          className="fixed bottom-8 right-8 z-50 bg-green-500 p-4 rounded-full shadow-2xl hover:scale-110 transition"
        >
          <Phone size={28} />
        </a>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <AnimatePresence mode="wait">
        {activePage === 'product' && selectedWheel ? (
          <ProductDetailPage key="product" wheel={selectedWheel} />
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* TOP BAR */}
            <div className="bg-zinc-900/50 border-b border-white/5 py-2 hidden lg:block">
              <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-bold tracking-[2px] text-zinc-400">
                <div className="flex gap-6">
                  <span>FORGED PERFORMANCE. BUILT WITHOUT COMPROMISE.</span>
                </div>
                <div className="flex gap-6 items-center">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-white"><User size={12} /> DEALER LOGIN</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-white"><Download size={12} /> DOWNLOAD CATALOG</span>
                  <span className="flex items-center gap-1"><Phone size={12} /> {company.phone}</span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-white uppercase">English <ChevronRight size={10} /></span>
                </div>
              </div>
            </div>

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
              <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-10">
                  <h1 className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
                    <span className="bg-red-600 px-2 py-1 rounded not-italic">F</span> ForgeAlloy
                  </h1>
                  <nav className="hidden xl:flex gap-8 text-[11px] font-bold tracking-[3px] text-zinc-300">
                    <a href="#home" className="text-red-600">HOME</a>
                    <a href="#series" className="hover:text-red-500 transition">WHEELS</a>
                    <a href="#gallery" className="hover:text-red-500 transition">GALLERY</a>
                    <a href="#oem" className="hover:text-red-500 transition">OEM/ODM</a>
                    <a href="#dealer" className="hover:text-red-500 transition">DEALER</a>
                    <a href="#footer" className="hover:text-red-500 transition">ABOUT US</a>
                    <a href="#footer" className="hover:text-red-500 transition">CONTACT</a>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-red-600 px-6 py-2 rounded font-bold text-[11px] tracking-[2px] hover:bg-red-500 transition">INQUIRY NOW <ChevronRight size={14} className="inline ml-1" /></button>
                  <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}><Menu /></button>
                </div>
              </div>
            </header>

            {/* HERO */}
            <section id="home" className="relative h-screen flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
                alt="Hero Background"
              />
              <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
                <motion.h1 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  className="text-7xl lg:text-9xl font-black leading-[0.9] mb-6 tracking-tighter uppercase"
                >
                  Forged to<br /><span className="text-red-600">Perform</span>
                </motion.h1>
                <motion.p 
                  initial={{ y: 50, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.1 }}
                  className="text-xl text-zinc-300 mb-12 max-w-xl leading-relaxed"
                >
                  {company.tagline}
                </motion.p>
                
                <div className="flex flex-wrap gap-12 mb-16">
                  {[
                    { label: 'PRECISION', sub: 'Engineered', icon: Settings },
                    { label: 'PREMIUM', sub: 'Quality', icon: ShieldCheck },
                    { label: 'LIGHTWEIGHT', sub: 'Stronger', icon: BarChart },
                    { label: 'CUSTOM', sub: 'Made', icon: Users },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                      <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-red-600 transition">
                        <item.icon size={24} className="text-zinc-400 group-hover:text-red-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black tracking-widest uppercase">{item.label}</p>
                        <p className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="bg-red-600 px-10 py-5 rounded font-black tracking-widest text-[12px] hover:bg-red-500 transition uppercase">Shop All Wheels <ArrowRight size={16} className="inline ml-2" /></button>
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded font-black tracking-widest text-[12px] hover:bg-white/20 transition uppercase">View Gallery <ChevronRight size={16} className="inline ml-2" /></button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-xl border-t border-white/10 py-10 z-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {company.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-px h-12 bg-red-600/50 group-hover:h-16 transition-all duration-500" />
                      <div>
                        <p className="text-4xl font-black tracking-tighter mb-1">{stat.value}</p>
                        <p className="text-[10px] text-zinc-500 font-bold tracking-[3px] uppercase">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* OUR WHEEL SERIES */}
            <section id="series" className="py-24 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-black mb-12 tracking-tight flex items-center gap-4 uppercase">
                  Our Wheel <span className="text-red-600">Series</span>
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  {series.map((item) => (
                    <div key={item.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer border border-white/10">
                      <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-50" alt={item.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 p-6 w-full text-center">
                        <p className="text-[14px] font-black tracking-tight mb-1">{item.name}</p>
                        <p className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase mb-4">{item.description}</p>
                        <span className="text-[9px] font-black border-b border-red-600 pb-1 group-hover:text-red-500 transition">VIEW MORE →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED WHEELS */}
            <section id="catalog" className="py-24 bg-black">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                  <div>
                    <h2 className="text-4xl font-black mb-4 tracking-tight uppercase">Featured <span className="text-red-600">Wheels</span></h2>
                    <div className="flex flex-wrap gap-2">
                      {['ALL', 'MONOBLOCK', '2-PIECE', 'OFF-ROAD', 'TRUCK'].map((cat) => (
                        <button 
                          key={cat} 
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-6 py-2 rounded text-[10px] font-black tracking-[2px] transition ${selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="text-[11px] font-black tracking-[2px] text-zinc-500 hover:text-red-500 transition">VIEW ALL PRODUCTS →</button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {filteredWheels.map((wheel) => (
                    <motion.div layout key={wheel.id} className="group bg-zinc-900/40 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition">
                      <div className="relative aspect-square overflow-hidden bg-zinc-900">
                        <img src={wheel.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={wheel.name} />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-black tracking-tight mb-4 uppercase">{wheel.name}</h3>
                        <div className="space-y-2 mb-6">
                          {[
                            ['Size', wheel.size],
                            ['Finish', wheel.finish],
                            ['PCD', wheel.pcd],
                            ['Offset', wheel.offset],
                          ].map(([label, val]) => (
                            <p key={label} className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase flex justify-between">
                              <span>{label}:</span> <span className="text-zinc-300">{val}</span>
                            </p>
                          ))}
                        </div>
                        <button 
                          onClick={() => { setSelectedWheel(wheel); setActivePage('product'); window.scrollTo(0,0); }}
                          className="w-full text-[10px] font-black tracking-[2px] text-zinc-500 group-hover:text-red-500 transition uppercase"
                        >
                          View Details →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* OEM/ODM SOLUTIONS */}
            <section id="oem" className="relative py-32 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="OEM Background" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
              <div className="relative z-20 max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-black mb-4 uppercase">OEM / <span className="text-red-600">ODM</span> Solutions</h2>
                <p className="text-zinc-400 max-w-xl mb-12 font-medium">We provide one-stop customized forged wheel solutions for global brands, wholesalers and dealers.</p>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-16">
                  {oemFeatures.map((feat) => {
                    const IconComp = IconMap[feat.icon];
                    return (
                      <div key={feat.name} className="flex flex-col items-center gap-4 group">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-red-600 transition">
                          <IconComp size={32} className="text-zinc-500 group-hover:text-red-500" />
                        </div>
                        <p className="text-[9px] font-black tracking-[2px] text-center uppercase">{feat.name}</p>
                      </div>
                    );
                  })}
                </div>
                <button className="bg-red-600 px-10 py-5 rounded font-black tracking-widest text-[12px] hover:bg-red-500 transition uppercase">Learn More <ArrowRight size={16} className="inline ml-2" /></button>
              </div>
            </section>

            {/* GALLERY */}
            <section id="gallery" className="py-24 bg-zinc-950">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-black mb-12 uppercase tracking-tight">Gallery & <span className="text-red-600">Inspiration</span></h2>
                <div className="grid lg:grid-cols-4 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?q=80&w=800&auto=format&fit=crop',
                  ].map((img, i) => (
                    <div key={i} className="rounded-3xl overflow-hidden aspect-video lg:aspect-square group cursor-pointer border border-white/10">
                      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Gallery item" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* DEALER PROGRAM */}
            <section id="dealer" className="relative py-32 bg-black overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-[150px] rounded-full translate-x-1/2" />
               <div className="max-w-7xl mx-auto px-6 relative z-10">
                  <p className="text-red-600 font-black tracking-[4px] text-[12px] mb-4 uppercase">Dealer Program</p>
                  <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Grow with <span className="text-red-600">ForgeAlloy</span></h2>
                  <p className="text-zinc-400 mb-16 max-w-xl text-lg font-medium">Join our global dealer network and enjoy exclusive benefits, priority production and marketing support.</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {[
                      { label: 'COMPETITIVE PRICING', icon: BarChart },
                      { label: 'MARKETING SUPPORT', icon: Users },
                      { label: 'EXCLUSIVE TERRITORY', icon: MapPin },
                      { label: 'NEW PRODUCT PRIORITY', icon: CheckCircle },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center lg:items-start gap-4">
                        <item.icon size={32} className="text-red-600" />
                        <p className="text-[11px] font-black tracking-[2px] uppercase">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <button className="border-b-2 border-red-600 pb-2 font-black tracking-widest text-[12px] hover:text-red-500 transition uppercase">Become a Dealer →</button>
               </div>
            </section>

            {/* FOOTER */}
            <footer id="footer" className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-16 mb-24">
                <div className="col-span-1 lg:col-span-1">
                  <h2 className="text-3xl font-black italic tracking-tighter mb-8 uppercase">
                    <span className="bg-red-600 px-2 py-1 rounded not-italic">F</span> ForgeAlloy
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8">{company.tagline}</p>
                  <div className="flex gap-4">
                    {['facebook', 'instagram', 'youtube', 'pinterest'].map(social => (
                      <div key={social} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 transition cursor-pointer">
                        <span className="text-[10px] font-black uppercase">{social[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 col-span-1 lg:col-span-1">
                  <div>
                    <h4 className="text-[11px] font-black tracking-[3px] mb-8 uppercase">Quick Links</h4>
                    <nav className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase">
                      <a href="#home" className="hover:text-red-600 transition">Home</a>
                      <a href="#series" className="hover:text-red-600 transition">Wheels</a>
                      <a href="#gallery" className="hover:text-red-600 transition">Gallery</a>
                      <a href="#oem" className="hover:text-red-600 transition">OEM/ODM</a>
                      <a href="#footer" className="hover:text-red-600 transition">About Us</a>
                      <a href="#footer" className="hover:text-red-600 transition">Contact Us</a>
                    </nav>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black tracking-[3px] mb-8 uppercase">Wheel Series</h4>
                    <nav className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase">
                      <a href="#" className="hover:text-red-600 transition">YP Series (Monoblock)</a>
                      <a href="#" className="hover:text-red-600 transition">FW Series (2-Piece)</a>
                      <a href="#" className="hover:text-red-600 transition">2-Piece Series</a>
                      <a href="#" className="hover:text-red-600 transition">3-Piece Series</a>
                      <a href="#" className="hover:text-red-600 transition">Off-Road Series</a>
                      <a href="#" className="hover:text-red-600 transition">Truck Series</a>
                    </nav>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-black tracking-[3px] mb-8 uppercase">Support</h4>
                  <nav className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase">
                    <a href="#" className="hover:text-red-600 transition">Catalog Download</a>
                    <a href="#" className="hover:text-red-600 transition">Fitment Guide</a>
                    <a href="#" className="hover:text-red-600 transition">FAQ</a>
                    <a href="#" className="hover:text-red-600 transition">Shipping & Returns</a>
                    <a href="#" className="hover:text-red-600 transition">Warranty</a>
                    <a href="#" className="hover:text-red-600 transition">Privacy Policy</a>
                  </nav>
                </div>

                <div>
                  <h4 className="text-[11px] font-black tracking-[3px] mb-8 uppercase">Contact Us</h4>
                  <div className="space-y-6 text-zinc-500 text-xs font-bold uppercase">
                    <p className="flex items-center gap-3 hover:text-white transition cursor-pointer">
                      <Phone size={14} className="text-red-600" /> WhatsApp: {company.phone}
                    </p>
                    <p className="flex items-center gap-3 hover:text-white transition cursor-pointer lowercase">
                      <Mail size={14} className="text-red-600" /> Email: {company.email}
                    </p>
                    <p className="flex items-start gap-3 hover:text-white transition cursor-pointer leading-relaxed">
                      <MapPin size={14} className="text-red-600 shrink-0" /> Add: {company.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">© 2024 ForgeAlloy Wheels. All Rights Reserved.</p>
                <div className="flex gap-8 text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
                  <a href="#" className="hover:text-white transition">Sitemap</a>
                  <a href="#" className="hover:text-white transition">Terms of Service</a>
                </div>
              </div>
            </footer>

            {/* FLOATING WHATSAPP BUTTON */}
            <a 
              href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              className="fixed bottom-8 right-8 z-40 bg-green-500 p-4 rounded-full shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:scale-110 transition group"
            >
              <Phone size={24} className="text-white" />
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded text-[10px] font-black tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition">WHATSAPP US</span>
            </a>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
