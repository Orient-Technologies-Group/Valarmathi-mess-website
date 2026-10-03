import React, { useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight, Utensils } from 'lucide-react';
import type { MenuItem } from '../data/tapriwalaData';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onViewFullMenu?: () => void;
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
        className="fixed inset-0 bg-[#302019]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-[#FAF6EF] rounded-3xl shadow-2xl border border-[#E4D6C2] overflow-hidden z-10 my-auto transform transition-all animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6EF]/90 hover:bg-[#FAF6EF] text-[#302019] shadow-md border border-[#E4D6C2] focus:outline-none focus:ring-2 focus:ring-[#B95032] cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative w-full aspect-16/9 bg-[#302019]/10 shrink-0 overflow-hidden">
          <img
            src={item.image || '/images/kulhad-chai.jpg'}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent pointer-events-none" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-[#728064] text-[#F7F1E7] text-xs font-semibold tracking-wide shadow-xs flex items-center space-x-1">
              <Check className="w-3 h-3" />
              <span>100% Pure Vegetarian</span>
            </span>
            {item.isJainAvailable && (
              <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#302019] text-xs font-semibold tracking-wide shadow-xs flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Jain Available</span>
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Exact Price */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E4D6C2]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#8C7E74]">
                {item.category}
              </span>
              <h3 id="dish-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#302019] mt-0.5">
                {item.name}
              </h3>
            </div>
            
            <div className="text-right shrink-0">
              <span className="font-serif text-3xl font-bold text-[#B95032]">
                {item.price}
              </span>
              <span className="text-[10px] text-[#8C7E74] block uppercase tracking-wider font-semibold">
                Exact Cafe Price
              </span>
            </div>
          </div>

          {/* Delicious Editorial Writeup */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C7E74] mb-2">
              The Experience & Culinary Note
            </h4>
            <p className="text-sm sm:text-base text-[#302019]/90 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>

          {/* Taste Notes */}
          {item.tasteNotes && (
            <div className="p-4 rounded-xl bg-[#F7F1E7] border border-[#E4D6C2]">
              <span className="text-xs font-bold text-[#B95032] uppercase tracking-wider block mb-1">
                Flavour Highlights
              </span>
              <p className="text-xs sm:text-sm text-[#302019]/80 italic">
                "{item.tasteNotes}"
              </p>
            </div>
          )}

          {/* Flavor Profile Bars */}
          {item.flavorProfile && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C7E74] mb-3">
                Taste Balance
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {item.flavorProfile.spice !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1 text-[#302019] font-medium">
                      <span>Spiciness</span>
                      <span className="text-[#8C7E74]">{item.flavorProfile.spice} / 5</span>
                    </div>
                    <div className="h-1.5 bg-[#E4D6C2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#B95032]" style={{ width: `${(item.flavorProfile.spice / 5) * 100}%` }} />
                    </div>
                  </div>
                )}
                {item.flavorProfile.warmth !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1 text-[#302019] font-medium">
                      <span>Warmth & Comfort</span>
                      <span className="text-[#8C7E74]">{item.flavorProfile.warmth} / 5</span>
                    </div>
                    <div className="h-1.5 bg-[#E4D6C2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D49A3D]" style={{ width: `${(item.flavorProfile.warmth / 5) * 100}%` }} />
                    </div>
                  </div>
                )}
                {item.flavorProfile.richness !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1 text-[#302019] font-medium">
                      <span>Richness</span>
                      <span className="text-[#8C7E74]">{item.flavorProfile.richness} / 5</span>
                    </div>
                    <div className="h-1.5 bg-[#E4D6C2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#302019]" style={{ width: `${(item.flavorProfile.richness / 5) * 100}%` }} />
                    </div>
                  </div>
                )}
                {item.flavorProfile.sweetness !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1 text-[#302019] font-medium">
                      <span>Sweetness</span>
                      <span className="text-[#8C7E74]">{item.flavorProfile.sweetness} / 5</span>
                    </div>
                    <div className="h-1.5 bg-[#E4D6C2] rounded-full overflow-hidden">
                      <div className="h-full bg-[#728064]" style={{ width: `${(item.flavorProfile.sweetness / 5) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Best Paired With */}
          {item.bestPairedWith && (
            <div className="flex items-center space-x-3 text-xs text-[#302019]/80 pt-2 border-t border-[#E4D6C2]">
              <Utensils className="w-4 h-4 text-[#B95032] shrink-0" />
              <span>
                <strong className="text-[#302019]">Best paired with:</strong> {item.bestPairedWith}
              </span>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F7F1E7] border-t border-[#E4D6C2] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#8C7E74]">
            Freshly prepared at all 3 outlets
          </span>

          <div className="flex items-center space-x-3">
            {onViewFullMenu && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewFullMenu();
                }}
                className="px-4 py-2 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <span>Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#FAF6EF] border border-[#E4D6C2] text-[#302019] text-xs font-semibold rounded-md hover:bg-[#E4D6C2]/40 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
