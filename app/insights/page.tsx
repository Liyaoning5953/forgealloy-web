'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  Search,
  Menu,
  X,
  User,
  Download,
  Phone,
  Send,
  Calendar,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company, insights } from '@/lib/data';
import Link from 'next/link';

export default function InsightsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <img src={company.logo} alt="ForgeAlloy" className="h-10 w-auto rounded transition-transform group-hover:scale-110" />
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">FORGE<span className="text-red-600">ALLOY</span></h1>
          </Link>

          <nav className="hidden xl:flex items-center gap-8 uppercase text-[12px] font-black tracking-[2px]">
            <Link href="/" className="hover:text-red-600 transition">Home</Link>
            <Link href="/#wheels" className="hover:text-red-600 transition flex items-center gap-1">Wheels <ChevronDown size={14} /></Link>
            <Link href="/#gallery" className="hover:text-red-600 transition">Gallery</Link>
            <Link href="/#oem" className="hover:text-red-600 transition">OEM/ODM</Link>
            <Link href="/insights" className="text-red-600 border-b-2 border-red-600 pb-1">Insights</Link>
            <Link href="/#contact" className="hover:text-red-600 transition">Contact</Link>
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

      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 grayscale" alt="Insights Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter mb-4"
          >
            TECHNICAL <span className="text-red-600">INSIGHTS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 font-bold uppercase tracking-[4px] max-w-2xl mx-auto"
          >
            Mastering the art and science of forged wheel engineering
          </motion.p>
        </div>
      </section>

      {/* ARTICLES LIST */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {insights.map((post, idx) => (
              <motion.article 
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-6 bg-zinc-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Tag size={12} /> FORGED TECH</span>
                </div>
                <h2 className="text-2xl font-black italic tracking-tighter mb-4 group-hover:text-red-600 transition-colors uppercase leading-tight">
                  {post.title}
                </h2>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <Link href={`/insights/${post.slug}`} className="w-fit flex items-center gap-2 text-xs font-black uppercase tracking-[2px] group/link">
                  Read Full Article <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8">Ready to <span className="text-red-600">Transform</span> Your Ride?</h2>
          <button className="bg-red-600 hover:bg-red-700 transition px-12 py-5 rounded-md font-black text-sm tracking-[4px] uppercase shadow-2xl shadow-red-600/20">
            Start Your Build
          </button>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-[10px] font-bold uppercase tracking-[2px]">
            <div>© 2026 FORGEALLOY RACING TECH. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
