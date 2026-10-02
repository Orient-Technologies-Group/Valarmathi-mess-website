import React from 'react';
import { Phone, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { RestaurantInfo } from '../../../shared/types.js';

interface FooterProps {
  info: RestaurantInfo | null;
  onNavigate: (route: string) => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onNavigate, onOpenReservation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (route: string) => {
    onNavigate(route);
    scrollToTop();
  };

  return (
    <footer className="bg-[#1C0F0D] text-[#FAF7F2] border-t border-[#6B1D28]/40 pb-20 md:pb-10 relative overflow-hidden select-none">
      {/* Giant Architectural Brand Silhouette in background */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-[0.03] overflow-hidden flex justify-center"
        aria-hidden="true"
      >
        <span className="font-serif text-[18vw] font-bold text-white whitespace-nowrap leading-none tracking-tighter">
          VALARMATHI
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 & 2: Brand & Heritage Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2] block">
                VALARMATHI MESS
              </span>
              <div className="font-tamil text-sm text-[#E09E2B] font-semibold mt-1">
                வளர்மதி மெஸ் • கோவை பந்தய சாலை
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 font-light leading-relaxed max-w-sm">
              Established in 1986 at Race Course, Coimbatore. Dedicated to preserving authentic Kongu regional
              recipes, traditional banana leaf service, and uncompromising home-style taste.
            </p>

            <div className="pt-2 text-xs text-[#FAF7F2]/50 flex items-center space-x-2">
              <span className="text-[#E09E2B] font-semibold">Native • Natural • Regional</span>
              <span>•</span>
              <span>Since 1986</span>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E09E2B]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF7F2]/80">
              <li>
                <button onClick={() => handleNav('menu')} className="hover:text-white transition-colors">
                  Menu & Specialties
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('story')} className="hover:text-white transition-colors">
                  Our Story (1986)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors">
                  Food & Mess Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('visit')} className="hover:text-white transition-colors">
                  Visit & Hours
                </button>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-white transition-colors">
                  Table Enquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Timings & Dining */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E09E2B]">
              Service Hours
            </h4>
            <div className="space-y-2 text-xs text-[#FAF7F2]/80 font-light">
              <div>
                <span className="text-white font-medium block">Lunch Service:</span>
                <span>12:00 PM – 04:00 PM (Daily)</span>
              </div>
              <div className="pt-1">
                <span className="text-white font-medium block">Dinner Service:</span>
                <span>07:00 PM – 11:00 PM (Daily)</span>
              </div>
              <div className="pt-1 text-[#E09E2B] font-medium">
                <span>All 7 Days Open</span>
              </div>
            </div>
          </div>

          {/* Column 5: Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E09E2B]">
              Contact
            </h4>
            <div className="space-y-2 text-xs text-[#FAF7F2]/80 font-light">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#E09E2B] shrink-0 mt-0.5" />
                <span>CSI Compound, 207/A, Race Course, Coimbatore 641018</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#E09E2B] shrink-0" />
                <a href="tel:+914224271190" className="hover:text-white transition-colors font-medium">
                  +91 422 427 1190
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="inline-flex items-center space-x-1 text-[11px] text-[#FAF7F2]/40 hover:text-white/80 transition-colors"
                >
                  <ShieldCheck className="w-3 h-3 text-[#E09E2B]" />
                  <span>Admin Demonstration Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-4">
          <div>
            <span>© {new Date().getFullYear()} Valarmathi Mess, Coimbatore. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-tamil text-xs text-[#E09E2B]">
              பாரம்பரிய கொங்கு சுவை • நேரடி அனுபவம்
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
