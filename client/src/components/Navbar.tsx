import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Menu as MenuIcon, X, CalendarCheck, ShieldCheck, ChevronRight } from 'lucide-react';
import { RestaurantInfo, OpeningHour } from '../../../shared/types.js';
import { getLiveRestaurantStatus } from '../utils/helpers.js';

interface NavbarProps {
  info: RestaurantInfo | null;
  hours: OpeningHour[];
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  hours,
  currentRoute,
  onNavigate,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const status = getLiveRestaurantStatus(hours);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Menu', route: 'menu' },
    { label: 'Our Story', route: 'story' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'Visit & Hours', route: 'visit' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top announcement bar (collapses smoothly when scrolled) */}
      <div
        className={`bg-[#4F131C] text-[#F4EFE7] text-xs px-4 hidden md:block border-b border-[#6B1D28]/30 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-1.5 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-[#E09E2B] font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>{status.message}</span>
              <span className="text-white/60">({status.nextChange})</span>
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center space-x-1 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#E09E2B]" />
              <span>CSI Compound, Race Course, Coimbatore</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+914224271190"
              className="flex items-center space-x-1 text-[#F4EFE7] hover:text-[#E09E2B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E09E2B]" />
              <span className="tracking-wide">+91 422 427 1190</span>
            </a>
            <span className="text-white/40">|</span>
            <button
              onClick={() => handleLinkClick('admin')}
              className="text-xs text-white/70 hover:text-white flex items-center space-x-1 transition-colors"
              title="Demo Admin Portal"
            >
              <ShieldCheck className="w-3 h-3 text-[#E09E2B]" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div
        className={`bg-[#FAF7F2]/95 backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? 'border-[#6B1D28]/15 shadow-[0_4px_20px_rgba(35,33,30,0.08)] py-0'
            : 'border-[#6B1D28]/10 shadow-none py-1'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Brand Logo */}
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left group focus:outline-none flex items-center space-x-3"
            >
              <div>
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`font-serif font-bold tracking-tight text-[#4F131C] group-hover:text-[#6B1D28] transition-all duration-300 ${
                      isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
                    }`}
                  >
                    VALARMATHI MESS
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] tracking-widest text-[#6B6661] uppercase mt-0.5">
                  <span className="font-tamil text-xs text-[#C8861B] font-semibold">வளர்மதி மெஸ்</span>
                  <span>•</span>
                  <span>Race Course</span>
                  <span>•</span>
                  <span className="text-[#C8861B] font-semibold">1986</span>
                </div>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => handleLinkClick(link.route)}
                    className={`relative text-xs uppercase tracking-widest font-semibold transition-colors py-2 group ${
                      isActive ? 'text-[#4F131C]' : 'text-[#554E48] hover:text-[#4F131C]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D28] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8861B] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Call to Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#FAF7F2] text-[#4F131C] border border-[#4F131C]/30 hover:border-[#4F131C] hover:bg-[#F3EDE2] transition-all active:scale-[0.98]"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#C8861B]" />
                <span>Enquiry</span>
              </button>

              <a
                href="tel:+914224271190"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider bg-[#4F131C] text-white hover:bg-[#6B1D28] shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[#E09E2B]" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onOpenReservation}
                className="p-2 text-[#4F131C] bg-[#F4EFE7] rounded border border-[#6B1D28]/20 text-xs font-semibold flex items-center space-x-1"
                aria-label="Table Enquiry"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#C8861B]" />
                <span className="hidden sm:inline">Reserve</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-[#4F131C] hover:bg-[#F3EDE2] focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FAF7F2] border-b border-[#6B1D28]/20 px-5 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            {/* Status bar */}
            <div className="mb-4 pb-3 border-b border-[#6B1D28]/10 flex items-center justify-between text-xs">
              <span className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="font-semibold text-[#4F131C]">{status.message}</span>
              </span>
              <span className="text-[#6B6661] text-[11px]">{status.nextChange}</span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.route;
                return (
                  <button
                    key={link.route}
                    onClick={() => handleLinkClick(link.route)}
                    className={`w-full text-left px-3.5 py-3 rounded text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#4F131C] text-white shadow-sm'
                        : 'text-[#2D2B29] hover:bg-[#F3EDE2]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 ${isActive ? 'text-[#E09E2B]' : 'text-stone-400'}`}
                    />
                  </button>
                );
              })}

              <button
                onClick={() => handleLinkClick('admin')}
                className="w-full text-left px-3.5 py-3 rounded text-xs font-semibold text-[#6B6661] hover:bg-[#F3EDE2] flex items-center space-x-2 mt-2 pt-2 border-t border-[#6B1D28]/10"
              >
                <ShieldCheck className="w-4 h-4 text-[#C8861B]" />
                <span>Admin Demonstration Portal</span>
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-[#6B1D28]/10 grid grid-cols-2 gap-3">
              <a
                href="tel:+914224271190"
                className="flex items-center justify-center space-x-2 py-3 px-3 bg-[#4F131C] text-white rounded text-xs font-semibold uppercase tracking-wider shadow"
              >
                <Phone className="w-3.5 h-3.5 text-[#E09E2B]" />
                <span>Call Mess</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="flex items-center justify-center space-x-2 py-3 px-3 bg-[#F4EFE7] border border-[#6B1D28]/30 text-[#4F131C] rounded text-xs font-semibold uppercase tracking-wider"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-[#C8861B]" />
                <span>Enquiry</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
