import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Coffee, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Our Story', href: '/story' },
    { label: 'The Experience', href: '/experience' },
    { label: 'Outlets', href: '/outlets' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F1E7]/95 backdrop-blur-md shadow-sm border-b border-[#E4D6C2]/80 py-3'
            : 'bg-[#F7F1E7]/80 backdrop-blur-xs py-4.5 border-b border-[#E4D6C2]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Wordmark Logo + Stylized Tapri Kettle Icon */}
            <Link
              href="/"
              className="group flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B95032] rounded-md cursor-pointer"
              aria-label="Tapriwala Home"
            >
              {/* Brand Emblem Logo Badge */}
              <div className="w-10 h-10 rounded-xl bg-[#302019] text-[#FAF6EF] flex items-center justify-center p-2 shadow-sm group-hover:bg-[#B95032] transition-colors shrink-0">
                <svg viewBox="0 0 32 32" className="w-full h-full fill-current">
                  {/* Traditional Kettle Silhouette */}
                  <path d="M12 8 C12 6.5 13.5 5 16 5 C18.5 5 20 6.5 20 8 L24 10 L24 23 C24 25 22 27 16 27 C10 27 8 25 8 23 L8 10 Z" fill="#F7F1E7" />
                  <path d="M6 13 L3 11 C2 10 3 8 5 9 L8 11 Z" fill="#D49A3D" />
                  <path d="M24 14 C27 14 28 17 25 20" stroke="#F7F1E7" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <circle cx="16" cy="18" r="2" fill="#B95032" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#302019] group-hover:text-[#B95032] transition-colors leading-none">
                  tapriwala
                </span>
                <span className="text-[9px] tracking-[0.22em] text-[#8C7E74] uppercase font-semibold mt-0.5">
                  The Contemporary Tea Cafe
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide relative py-1 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B95032] rounded cursor-pointer ${
                      isActive
                        ? 'text-[#B95032]'
                        : 'text-[#302019]/80 hover:text-[#B95032]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#B95032] transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Action */}
            <div className="hidden sm:flex items-center space-x-4">
              <span className="hidden xl:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#728064]/10 text-[#728064] border border-[#728064]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-1.5" />
                100% Pure Veg
              </span>

              <Link
                href="/menu"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all duration-200 hover:shadow active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#302019] cursor-pointer"
              >
                <Coffee className="w-4 h-4" />
                <span>Explore Menu</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <Link
                href="/menu"
                className="px-3 py-1.5 bg-[#B95032] text-[#F7F1E7] text-xs font-semibold rounded shadow-sm"
              >
                Menu
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#302019] hover:text-[#B95032] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B95032] rounded-md"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-[#302019]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF6EF] shadow-2xl p-6 flex flex-col justify-between border-l border-[#E4D6C2] z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E4D6C2]">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#302019]">tapriwala</span>
                  <span className="text-[9px] tracking-widest text-[#8C7E74] uppercase font-semibold">
                    The Contemporary Tea Cafe
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#8C7E74] hover:text-[#302019] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B95032]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = location === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-semibold py-2.5 border-b border-[#E4D6C2]/40 transition-colors ${
                        isActive ? 'text-[#B95032] pl-2 border-l-2 border-[#B95032]' : 'text-[#302019] hover:text-[#B95032]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-[#E4D6C2]">
                <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-[#728064]/10 text-[#728064] border border-[#728064]/20">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  100% Pure Vegetarian · Jain on Request
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E4D6C2] flex flex-col space-y-3">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#B95032] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm"
              >
                Explore Full Menu
              </Link>
              <Link
                href="/outlets"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 border border-[#8C7E74]/40 text-[#302019] text-xs font-semibold rounded-md hover:bg-[#E4D6C2]/30"
              >
                Find Nearest Outlet
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
