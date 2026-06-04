'use client';

import React, { useState, Suspense } from 'react';
import { 
  Search, 
  ArrowRight, 
  ChevronDown, 
  Download, 
  User, 
  Phone, 
  Menu, 
  X,
  Send,
  Globe,
  MessageSquare,
  Mail,
  Filter,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company, wheels, categories } from '@/lib/data';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function WheelsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWheels = wheels.filter(wheel => {
    const matchesCategory = selectedCategory === 'ALL' || wheel.category === selectedCategory;
    const matchesSearch = wheel.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <header className="fixed left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/5 h-20 top-0 lg:top-10">
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img src={company.logo} alt="ForgeAlloy" className="h-10 w-auto rounded transition-transform group-hover:scale-110" />
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">FORGE<span className="text-red-600">ALLOY</span></h1>
          </Link>

          <nav className="hidden xl:flex items-center gap-8 uppercase text-[12px] font-black tracking-[2px]">
            <Link href="/" className="hover:text-red-600 transition">Home</Link>
            <Link href="/wheels" className="text-red-600 border-b-2 border-red-600 pb-1 flex items-center gap-1">Wheels <ChevronDown size={14} /></Link>
            <Link href="/gallery" className="hover:text-red-600 transition">Gallery</Link>
            <Link href="/#oem" className="hover:text-red-600 transition">OEM/ODM</Link>
            <Link href="/insights" className="hover:text-red-600 transition">Insights</Link>
            <Link href="/#about" className="hover:text-red-600 transition">About Us</Link>
            <Link href="/#dealer" className="hover:text-red-600 transition">Dealer</Link>
            <Link href="/#contact" className="hover:text-red-600 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="SEARCH MODEL..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-full px-6 py-2 text-[10px] font-bold tracking-widest focus:outline-none focus:border-red-600 w-64 transition-all"
              />
              <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
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
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/wheels" onClick={() => setIsMenuOpen(false)}>Wheels</Link>
              <Link href="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
              <Link href="/#oem" onClick={() => setIsMenuOpen(false)}>OEM/ODM</Link>
              <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="pt-48 pb-20 bg-zinc-950 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6">
          <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic mb-8">
            WHEEL <span className="text-red-600">CATALOG</span>
          </h2>
          <p className="text-zinc-400 text-lg lg:text-xl font-medium max-w-2xl mb-12 tracking-wide leading-relaxed uppercase">
            Browse our comprehensive collection of precision-engineered forged wheels. From lightweight monoblock to complex multi-piece designs.
          </p>
          
          {/* FILTER BAR */}
          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-10">
            <div className="flex items-center gap-3 mr-6 text-zinc-500">
              <Filter size={18} />
              <span className="text-[11px] font-black uppercase tracking-[2px]">Series:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSelectedCategory('ALL')}
                className={`px-6 py-2 rounded text-[11px] font-black uppercase tracking-[2px] transition-all ${
                  selectedCategory === 'ALL' 
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                ALL SERIES
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded text-[11px] font-black uppercase tracking-[2px] transition-all ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-20 bg-black">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredWheels.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 8) * 0.05 }}
                className="group relative bg-zinc-900/50 rounded-xl border border-white/5 hover:border-red-600/30 transition-all duration-500 overflow-hidden"
              >
                <div className="aspect-square p-8 flex items-center justify-center relative overflow-hidden bg-zinc-950">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                     <button className="w-full bg-white text-black py-3 rounded font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                        View Details <Maximize2 size={12} />
                     </button>
                  </div>
                </div>
                <div className="p-6 border-t border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-red-600 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      {item.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Available Sizes</p>
                      <p className="text-[10px] font-bold text-zinc-300">{item.size}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Standard Finish</p>
                      <p className="text-[10px] font-bold text-zinc-300">{item.finish}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredWheels.length === 0 && (
            <div className="py-40 text-center">
              <p className="text-zinc-500 font-black uppercase tracking-[4px]">No models found matching your criteria.</p>
            </div>
          )}
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
                  <Link href="/" className="hover:text-red-600 transition">Home</Link>
                  <Link href="/wheels" className="hover:text-red-600 transition">Wheels</Link>
                  <Link href="/gallery" className="hover:text-red-600 transition">Gallery</Link>
                  <Link href="/#oem" className="hover:text-red-600 transition">OEM / ODM</Link>
               </nav>
            </div>

           <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[14px] font-black uppercase tracking-[5px] text-white underline decoration-red-600 decoration-4 underline-offset-8">Wheel Series</h4>
              <nav className="flex flex-col gap-6 text-[12px] font-black uppercase tracking-[4px] text-zinc-500">
                 <button onClick={() => setSelectedCategory('Monoblock Forged')} className="text-left hover:text-red-600 transition">YP Series (Monoblock)</button>
                 <button onClick={() => setSelectedCategory('Multi-piece Forged')} className="text-left hover:text-red-600 transition">FW Series (2-Piece)</button>
                 <button onClick={() => setSelectedCategory('Off-Road Forged')} className="text-left hover:text-red-600 transition">Off-Road Spec Forged</button>
                 <button onClick={() => setSelectedCategory('Truck Forged')} className="text-left hover:text-red-600 transition">Truck Spec Forged</button>
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
    </div>
  );
}

export default function WheelsPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <WheelsContent />
    </Suspense>
  );
}
