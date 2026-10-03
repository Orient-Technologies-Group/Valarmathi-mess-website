import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigateToMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
    { label: 'Our Story', href: '#story' },
    { label: 'Signature Bites', href: '#signatures' },
    { label: 'Menu', href: '#menu' },
    { label: 'Chai Pairing', href: '#pairing' },
    { label: 'The Experience', href: '#experience' },
    { label: 'Outlets', href: '#outlets' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F1E7]/95 backdrop-blur-md shadow-sm border-b border-[#E4D6C2]/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark Logo */}
            <a
              href="#"
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B95032] rounded-sm"
              aria-label="Tapriwala Home"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#302019] group-hover:text-[#B95032] transition-colors leading-none">
                tapriwala
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#8C7E74] uppercase font-medium mt-1">
                The Contemporary Tea Cafe
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-[#302019]/80 hover:text-[#B95032] relative py-1 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B95032] rounded"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B95032] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Action */}
            <div className="hidden sm:flex items-center space-x-4">
              <span className="hidden xl:inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#728064]/10 text-[#728064] border border-[#728064]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-1.5"></span>
                100% Pure Veg
              </span>

              <a
                href="#menu"
                onClick={(e) => {
                  handleLinkClick(e, '#menu');
                  if (onNavigateToMenu) onNavigateToMenu();
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all duration-200 hover:shadow active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#302019]"
              >
                <Coffee className="w-4 h-4" />
                <span>View Menu</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <a
                href="#menu"
                onClick={(e) => handleLinkClick(e, '#menu')}
                className="px-3 py-1.5 bg-[#B95032] text-[#F7F1E7] text-xs font-medium rounded shadow-sm"
              >
                Menu
              </a>
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

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF6EF] shadow-2xl p-6 flex flex-col justify-between border-l border-[#E4D6C2]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E4D6C2]">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#302019]">tapriwala</span>
                  <span className="text-[9px] tracking-widest text-[#8C7E74] uppercase">The Contemporary Tea Cafe</span>
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
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-base font-medium text-[#302019] hover:text-[#B95032] py-2 border-b border-[#E4D6C2]/40 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-[#E4D6C2]">
                <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded bg-[#728064]/10 text-[#728064] border border-[#728064]/20">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  100% Pure Vegetarian · Jain on Request
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E4D6C2] flex flex-col space-y-3">
              <a
                href="#menu"
                onClick={(e) => handleLinkClick(e, '#menu')}
                className="w-full text-center py-3 bg-[#B95032] text-[#F7F1E7] text-sm uppercase tracking-wider font-semibold rounded-md shadow-sm"
              >
                Explore Full Menu
              </a>
              <a
                href="#outlets"
                onClick={(e) => handleLinkClick(e, '#outlets')}
                className="w-full text-center py-2.5 border border-[#8C7E74]/40 text-[#302019] text-sm font-medium rounded-md hover:bg-[#E4D6C2]/30"
              >
                Find Nearest Outlet
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
