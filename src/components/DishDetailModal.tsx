import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { MenuItem } from '../data/tapriwalaData';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onViewFullMenu: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ item, onClose, onViewFullMenu }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302019]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-[#FAF6EF] rounded-2xl shadow-2xl border border-[#E4D6C2] overflow-hidden z-10 my-auto transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6EF]/80 hover:bg-[#FAF6EF] text-[#302019] shadow-md border border-[#E4D6C2] focus:outline-none focus:ring-2 focus:ring-[#B95032] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-[#302019]/10 overflow-hidden">
          <img
            src={item.image || '/images/kulhad-chai.jpg'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/70 via-transparent to-transparent pointer-events-none" />

          {/* Tags on Image */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#728064] text-[#F7F1E7] text-[11px] font-semibold tracking-wide">
              Pure Vegetarian
            </span>
            {item.isJainAvailable && (
              <span className="px-2.5 py-1 rounded-full bg-[#D49A3D] text-[#302019] text-[11px] font-semibold tracking-wide">
                Jain Option Available
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#E4D6C2]">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#8C7E74]">
                {item.category}
              </span>
              <h3 id="dish-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#302019] mt-0.5">
                {item.name}
              </h3>
            </div>
            
            <div className="text-right shrink-0">
              <span className="font-serif text-2xl font-bold text-[#B95032]">
                {item.price}
              </span>
              {item.priceNote && (
                <p className="text-[11px] text-[#8C7E74] font-medium mt-0.5">
                  {item.priceNote}
                </p>
              )}
            </div>
          </div>

          <div className="py-5">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C7E74] mb-2">
              Description & Highlights
            </h4>
            <p className="text-sm sm:text-base text-[#302019]/85 leading-relaxed">
              {item.description}
            </p>
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-md bg-[#E4D6C2]/40 text-[#302019] text-xs font-medium border border-[#E4D6C2]">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-[#E4D6C2] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#8C7E74] font-medium text-center sm:text-left">
              * Indicative cafe price. Available fresh across Coimbatore outlets.
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewFullMenu();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#302019]"
            >
              <span>See full menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
