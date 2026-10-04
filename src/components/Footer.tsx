import React, { useRef, useState } from 'react';
import { Link } from 'wouter';
import { MapPin, Heart, ArrowUpRight, Sparkles } from 'lucide-react';
import { OUTLETS } from '../data/tapriwalaData';
import { KulhadIllustration, ChaiSealStamp } from './TapriIllustrations';
import { OutletContactModal } from './OutletContactModal';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();
  const [contactModalOutletId, setContactModalOutletId] = useState<string | null>(null);

  return (
    <footer ref={footerRef} className="bg-dark-grain text-[#F7F1E7] relative overflow-hidden">
      
      {/* Background Art Direction: Isolated, Pointer-Events-None Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Background Typography: YOUR EVERYDAY TAPRI - readable, centered, and crisp */}
        <div className="absolute top-10 left-0 right-0 flex justify-center">
          <span className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[0.18em] text-[#F7F1E7]/[0.08] uppercase select-none text-center">
            YOUR EVERYDAY TAPRI
          </span>
        </div>

        {/* Oversized Kulhad cropped on bottom right */}
        <div className="absolute -bottom-10 -right-10 text-[#D49A3D]/[0.08] transform rotate-12 scale-150 lg:scale-[2.2]">
          <KulhadIllustration className="w-64 h-72" />
        </div>

        {/* Chai Seal Stamp on top left */}
        <div className="hidden lg:block absolute top-16 left-12 text-[#B95032]/[0.07] transform -rotate-12">
          <ChaiSealStamp className="w-40 h-40" />
        </div>

        {/* Fine editorial station coordinates */}
        <div className="absolute top-8 right-12 hidden md:flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#F7F1E7]/[0.18] font-mono">
          <span>COIMBATORE · 11.0168° N, 76.9558° E</span>
        </div>
      </div>

      {/* Big Typographic Invitation Banner */}
      <div className="border-b border-[#E4D6C2]/15 py-20 lg:py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="inline-flex items-center space-x-2 text-[#D49A3D] mb-4">
            <span className="w-6 h-[1px] bg-[#D49A3D]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              The Table Is Set
            </span>
            <span className="w-6 h-[1px] bg-[#D49A3D]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center lg:text-left mb-10">
            <div className="lg:col-span-8">
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F1E7] mb-6">
                See you over chai.
              </h2>
              <p className="text-base sm:text-lg text-[#E4D6C2]/80 max-w-xl mx-auto lg:mx-0 mb-8 font-normal">
                Pull up a chair at our R.S. Puram, Saibaba Colony, or Peelamedu outlets. Your fresh kulhad brew is steaming.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/outlets"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-lg transition-all active:scale-98 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find your nearest Tapri</span>
                </Link>

                <a
                  href="https://www.instagram.com/tapri.wala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 bg-[#FAF6EF]/10 hover:bg-[#FAF6EF]/20 text-[#FAF6EF] border border-[#FAF6EF]/20 text-xs uppercase tracking-wider font-semibold rounded-md transition-all active:scale-98"
                >
                  <svg className="w-4 h-4 text-[#D49A3D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Follow @tapri.wala</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Final Warm Kulhad Visual Panel */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 sm:w-56 aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FAF6EF]/20 group">
                <img
                  src="/images/kulhad-chai.jpg"
                  alt="A warm clay kulhad of chai ready for the next guest"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#261710]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="font-serif italic text-xs text-[#E4D6C2]">
                    Brewed fresh for every visitor
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Info (Col 4) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center space-x-3 mb-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EF]/10 border border-[#FAF6EF]/20 text-[#FAF6EF] flex items-center justify-center p-2 shadow-xs group-hover:bg-[#B95032] transition-colors shrink-0">
                <svg viewBox="0 0 32 32" className="w-full h-full fill-current">
                  <path d="M12 8 C12 6.5 13.5 5 16 5 C18.5 5 20 6.5 20 8 L24 10 L24 23 C24 25 22 27 16 27 C10 27 8 25 8 23 L8 10 Z" fill="#F7F1E7" />
                  <path d="M6 13 L3 11 C2 10 3 8 5 9 L8 11 Z" fill="#D49A3D" />
                  <path d="M24 14 C27 14 28 17 25 20" stroke="#F7F1E7" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <circle cx="16" cy="18" r="2" fill="#B95032" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#F7F1E7] block leading-none">
                  tapriwala
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#D49A3D] uppercase block mt-1 font-semibold">
                  The Contemporary Tea Cafe
                </span>
              </div>
            </Link>
            
            <p className="text-xs sm:text-sm text-[#E4D6C2]/70 leading-relaxed mb-6 max-w-sm">
              The soul of a tapri. The warmth of your favourite cafe. Handcrafted kulhad chai, Surat cold cocoa, and comforting street food across Coimbatore.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#728064]/20 text-[#728064] border border-[#728064]/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#728064]" />
              <span className="text-[#E4D6C2]">100% Pure Vegetarian Kitchen</span>
            </div>
          </div>

          {/* Quick Navigation (Col 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D49A3D] mb-4">
              Explore Pages
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E4D6C2]/80">
              <li>
                <Link href="/" className="hover:text-[#F7F1E7] transition-colors cursor-pointer">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#F7F1E7] transition-colors cursor-pointer">
                  Full Menu & Prices
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-[#F7F1E7] transition-colors cursor-pointer">
                  Our Story & Standards
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#F7F1E7] transition-colors cursor-pointer">
                  The Experience & Board Games
                </Link>
              </li>
              <li>
                <Link href="/outlets" className="hover:text-[#F7F1E7] transition-colors cursor-pointer">
                  Coimbatore Outlets & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Outlets Directory (Col 5) */}
          <div className="lg:col-span-5">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D49A3D] mb-4">
              Our Locations
            </h3>
            <div className="space-y-4 text-xs text-[#E4D6C2]/80">
              {OUTLETS.map((outlet) => (
                <div key={outlet.id} className="p-3 rounded-lg bg-[#3D2920]/60 border border-[#E4D6C2]/15">
                  <span className="font-serif font-bold text-sm text-[#F7F1E7] block mb-0.5">
                    {outlet.name}
                  </span>
                  <p className="line-clamp-2 text-[#E4D6C2]/70 leading-relaxed mb-1">
                    {outlet.address}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactModalOutletId(outlet.id)}
                    className="text-[#D49A3D] font-semibold hover:underline cursor-pointer text-left block text-xs"
                  >
                    {outlet.phone || '+91 80565 44622'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#E4D6C2]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E4D6C2]/50 gap-4">
          <p>
            © {currentYear} Tapriwala - The Contemporary Tea Cafe. Coimbatore, Tamil Nadu.
          </p>
          <p className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#B95032] fill-current" />
            <span>for authentic chai culture</span>
          </p>
        </div>

      </div>

      {/* Outlet Contact Modal */}
      <OutletContactModal
        isOpen={!!contactModalOutletId}
        onClose={() => setContactModalOutletId(null)}
        initialOutletId={contactModalOutletId || OUTLETS[0].id}
      />
    </footer>
  );
};
