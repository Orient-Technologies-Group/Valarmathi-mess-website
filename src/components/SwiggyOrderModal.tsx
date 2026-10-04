import React, { useEffect } from 'react';
import { X, ExternalLink, MapPin, Star, Clock, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SwiggyOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SwiggyOutlet {
  id: string;
  name: string;
  locationTag: string;
  address: string;
  rating: string;
  deliveryAreas: string;
  estimatedTime: string;
  swiggyUrl: string;
  highlight: string;
}

const SWIGGY_OUTLETS: SwiggyOutlet[] = [
  {
    id: 'rs-puram',
    name: 'Tapriwala — R.S. Puram',
    locationTag: 'Flagship Cafe · D.B. Road Corner',
    address: '551-B Lokamanya St (West), R.S. Puram',
    rating: '4.4 ★ (500+ ratings)',
    deliveryAreas: 'R.S. Puram, Sukrawarpet, Gandhipuram, Town Hall, Race Course',
    estimatedTime: '20–30 mins',
    swiggyUrl: 'https://www.swiggy.com/restaurants/tapriwala-the-contemporary-tea-cafe-rs-puram-coimbatore-584807',
    highlight: 'Full Cafe Menu · Kulhad Chai · All Street Chaat'
  },
  {
    id: 'saibaba-colony',
    name: 'Tapriwala — Saibaba Colony',
    locationTag: 'Neighborhood Cafe · Alagesan Road',
    address: '32, Alagesan Road, Saibaba Colony',
    rating: '4.3 ★ (350+ ratings)',
    deliveryAreas: 'Saibaba Colony, NSR Road, Koundampalayam, Thudiyalur, Bharathi Park',
    estimatedTime: '20–30 mins',
    swiggyUrl: 'https://www.swiggy.com/city/coimbatore/tapriwala-the-contemporary-tea-cafe-saibaba-colony-rest584808',
    highlight: 'Quick Service · Bun Maska · Hot Masala Chai'
  },
  {
    id: 'peelamedu',
    name: 'Tapriwala — Peelamedu / Express',
    locationTag: 'Campus & IT Hub · Avinashi Road',
    address: 'Near PSG Tech & Venkatasamy Road West',
    rating: '4.4 ★ (400+ ratings)',
    deliveryAreas: 'Peelamedu, PSG Tech, Hopes College, Nava India, Singanallur, Ramanathapuram',
    estimatedTime: '15–25 mins',
    swiggyUrl: 'https://www.swiggy.com/city/coimbatore/tapriwala-the-contemporary-tea-cafe-peelamedu-rest619374',
    highlight: 'Superfast Delivery · Vada Pav & Cold Cocoa'
  }
];

export const SwiggyOrderModal: React.FC<SwiggyOrderModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="swiggy-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#302019]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAF6EF] rounded-3xl shadow-2xl border border-[#E4D6C2] overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-8 bg-[#F7F1E7] border-b border-[#E4D6C2] relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF6EF] hover:bg-[#E4D6C2]/40 text-[#302019] shadow-xs border border-[#E4D6C2] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FC8019] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <Bike className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#FC8019]">
                  Swiggy Delivery · Coimbatore
                </span>
              </div>

              <h2
                id="swiggy-modal-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#302019] tracking-tight"
              >
                Select Your Nearest Tapriwala
              </h2>

              <p className="text-xs sm:text-sm text-[#8C7E74] mt-1.5 leading-relaxed">
                Choose your location to open the direct Swiggy menu with live discounts, real-time availability, and doorstep delivery:
              </p>
            </div>

            {/* Outlets List */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              {SWIGGY_OUTLETS.map((outlet, index) => (
                <div
                  key={outlet.id}
                  className="p-5 rounded-2xl bg-[#FAF6EF] border border-[#E4D6C2] hover:border-[#FC8019] shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FC8019] bg-[#FC8019]/10 px-2.5 py-0.5 rounded-full border border-[#FC8019]/20">
                        {outlet.locationTag}
                      </span>
                      <span className="inline-flex items-center text-xs font-semibold text-[#D49A3D]">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        {outlet.rating}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#302019] group-hover:text-[#FC8019] transition-colors">
                      {outlet.name}
                    </h3>

                    <div className="flex items-center space-x-1.5 text-xs text-[#8C7E74]">
                      <MapPin className="w-3.5 h-3.5 text-[#B95032] shrink-0" />
                      <span>{outlet.address}</span>
                    </div>

                    <p className="text-xs text-[#302019]/75 pt-1">
                      <strong className="text-[#302019]">Serves:</strong> {outlet.deliveryAreas}
                    </p>

                    <div className="flex items-center space-x-2 text-[11px] text-[#728064] font-medium pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>Avg. Delivery: {outlet.estimatedTime}</span>
                      <span>·</span>
                      <span>{outlet.highlight}</span>
                    </div>
                  </div>

                  <a
                    href={outlet.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#FC8019] hover:bg-[#e26e10] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-sm hover:shadow-md transition-all shrink-0 active:scale-98 cursor-pointer"
                  >
                    <span>Order #{index + 1} ↗</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-[#F7F1E7] border-t border-[#E4D6C2] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shrink-0">
              <span className="text-xs text-[#8C7E74]">
                Also searching from another area?
              </span>

              <a
                href="https://www.swiggy.com/city/coimbatore?search=tapriwala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#FC8019] hover:text-[#e26e10] hover:underline inline-flex items-center space-x-1"
              >
                <span>Search all Tapriwala locations on Swiggy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
