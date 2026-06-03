'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft,
  ChevronDown, 
  Search,
  Menu,
  X,
  User,
  Download,
  Phone,
  Send,
  Calendar,
  Tag,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { company, insights } from '@/lib/data';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function ArticleDetail() {
  const params = useParams();
  const router = useRouter();
  const post = insights.find(p => p.slug === params.slug);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black mb-8">ARTICLE NOT FOUND</h1>
        <Link href="/insights" className="text-red-600 font-bold uppercase tracking-widest flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600/30 overflow-x-hidden">
      {/* TOP BAR & NAVBAR (Simplified version of Home) */}
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 bg-black/95 backdrop-blur-xl border-b border-white/5 h-20`}>
        <div className="max-w-[1600px] mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">FORGE<span className="text-red-600">ALLOY</span></h1>
          </Link>

          <nav className="hidden xl:flex items-center gap-8 uppercase text-[11px] font-black tracking-[2px]">
            <Link href="/" className="hover:text-red-600 transition">Home</Link>
            <Link href="/insights" className="text-red-600">Insights</Link>
            <Link href="/#contact" className="hover:text-red-600 transition">Inquiry</Link>
          </nav>

          <div className="flex items-center gap-6">
            <button className="bg-red-600 hover:bg-red-500 transition px-6 py-2 rounded-md font-black text-[10px] tracking-[2px] uppercase">
              Get Quote
            </button>
          </div>
        </div>
      </header>

      {/* ARTICLE HEADER */}
      <section className="pt-40 pb-20 bg-zinc-950">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/insights" className="text-red-600 text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-8 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft size={16} /> Back to Insights
            </Link>
            <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">
              <span className="bg-red-600 text-white px-3 py-1 rounded">{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-tight mb-10">
              {post.title}
            </h1>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={post.image} className="w-full h-full object-cover grayscale" alt={post.title} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-[800px] mx-auto px-6 prose prose-zinc lg:prose-xl">
           <div 
             className="article-body font-medium leading-relaxed text-zinc-800"
             dangerouslySetInnerHTML={{ __html: post.content }} 
           />
           
           <div className="mt-20 pt-10 border-t border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Share:</span>
                 <button className="p-2 hover:text-red-600 transition"><Share2 size={18} /></button>
              </div>
              <button className="text-xs font-black uppercase tracking-widest bg-zinc-900 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition shadow-xl">
                 Download Technical PDF
              </button>
           </div>
        </div>
      </section>

      {/* MORE INSIGHTS */}
      <section className="py-24 bg-zinc-50 text-black">
        <div className="max-w-[1200px] mx-auto px-6">
           <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-12 border-l-4 border-red-600 pl-6">Related Insights</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {insights.filter(p => p.slug !== post.slug).slice(0, 2).map(p => (
               <Link href={`/insights/${p.slug}`} key={p.slug} className="group bg-white p-6 rounded-2xl flex gap-6 border border-zinc-100 hover:shadow-xl transition-all">
                  <div className="w-1/3 aspect-square overflow-hidden rounded-xl">
                    <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.title} />
                  </div>
                  <div className="w-2/3 flex flex-col justify-center">
                    <h4 className="font-black italic uppercase tracking-tighter text-lg leading-tight mb-2 group-hover:text-red-600 transition-colors">{p.title}</h4>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{p.date}</span>
                  </div>
               </Link>
             ))}
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12">
        <div className="max-w-[1600px] mx-auto px-6 text-center text-zinc-500 text-[10px] font-bold uppercase tracking-[2px]">
          © 2026 FORGEALLOY RACING TECH. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
