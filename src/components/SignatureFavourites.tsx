import React, { useState } from 'react';
import { ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data/tapriwalaData';
import type { MenuItem } from '../data/tapriwalaData';
import { DishDetailModal } from './DishDetailModal';

interface SignatureFavouritesProps {
  onViewFullMenu: () => void;
}

export const SignatureFavourites: React.FC<SignatureFavouritesProps> = ({ onViewFullMenu }) => {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  return (
    <section id="signatures" className="py-20 lg:py-28 bg-[#FAF6EF] border-b border-[#E4D6C2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[#E4D6C2] pb-8">
          <div>
            <div className="flex items-center space-x-2 text-[#B95032] mb-3">
              <span className="w-8 h-[1px] bg-[#B95032]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Signature Introductions
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight">
              First visit?{' '}
              <span className="italic font-normal text-[#B95032]">Start here.</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <p className="text-sm text-[#8C7E74] max-w-xs font-normal">
              Four timeless house favourites that define the Tapriwala taste. Click any item to explore.
            </p>
          </div>
        </div>

        {/* Varied Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Tapriwala Special Chai (Large, Span 6) */}
          <div 
            onClick={() => setSelectedDish(SIGNATURE_DISHES[0])}
            className="lg:col-span-6 group cursor-pointer bg-[#F7F1E7] rounded-2xl overflow-hidden border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[0]); } }}
            aria-label={`View details for ${SIGNATURE_DISHES[0].name}`}
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#302019]/5">
              <img
                src={SIGNATURE_DISHES[0].image}
                alt={SIGNATURE_DISHES[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-[#B95032] text-[#F7F1E7] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                House Icon
              </div>

              <div className="absolute bottom-4 right-4 bg-[#FAF6EF]/90 backdrop-blur-xs p-2 rounded-full text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#F7F1E7] transition-colors shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between grow">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors">
                    {SIGNATURE_DISHES[0].name}
                  </h3>
                  <span className="font-serif text-xl font-bold text-[#B95032] shrink-0 ml-4">
                    {SIGNATURE_DISHES[0].price}
                  </span>
                </div>
                <p className="text-sm text-[#8C7E74] leading-relaxed mb-4">
                  {SIGNATURE_DISHES[0].description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4D6C2]/60 flex items-center justify-between text-xs text-[#302019]/70 font-medium">
                <span className="inline-flex items-center text-[#728064]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-1.5" />
                  Earthy Clay Kulhad
                </span>
                <span className="group-hover:translate-x-1 transition-transform text-[#B95032] font-semibold inline-flex items-center">
                  Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Surat Special Cold Cocoa (Medium, Span 6) */}
          <div 
            onClick={() => setSelectedDish(SIGNATURE_DISHES[1])}
            className="lg:col-span-6 group cursor-pointer bg-[#F7F1E7] rounded-2xl overflow-hidden border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[1]); } }}
            aria-label={`View details for ${SIGNATURE_DISHES[1].name}`}
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#302019]/5">
              <img
                src={SIGNATURE_DISHES[1].image}
                alt={SIGNATURE_DISHES[1].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-[#302019] text-[#F7F1E7] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                Surat Street Special
              </div>

              <div className="absolute bottom-4 right-4 bg-[#FAF6EF]/90 backdrop-blur-xs p-2 rounded-full text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#F7F1E7] transition-colors shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between grow">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors">
                    {SIGNATURE_DISHES[1].name}
                  </h3>
                  <span className="font-serif text-xl font-bold text-[#B95032] shrink-0 ml-4">
                    {SIGNATURE_DISHES[1].price}
                  </span>
                </div>
                <p className="text-sm text-[#8C7E74] leading-relaxed mb-4">
                  {SIGNATURE_DISHES[1].description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4D6C2]/60 flex items-center justify-between text-xs text-[#302019]/70 font-medium">
                <span className="inline-flex items-center text-[#D49A3D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A3D] mr-1.5" />
                  Ultra-Thick Chocolate
                </span>
                <span className="group-hover:translate-x-1 transition-transform text-[#B95032] font-semibold inline-flex items-center">
                  Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Mumbai Vada Pav (Span 6) */}
          <div 
            onClick={() => setSelectedDish(SIGNATURE_DISHES[2])}
            className="lg:col-span-6 group cursor-pointer bg-[#F7F1E7] rounded-2xl overflow-hidden border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[2]); } }}
            aria-label={`View details for ${SIGNATURE_DISHES[2].name}`}
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#302019]/5">
              <img
                src={SIGNATURE_DISHES[2].image}
                alt={SIGNATURE_DISHES[2].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-[#FAF6EF] text-[#302019] border border-[#E4D6C2] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                Bombay Comfort
              </div>

              <div className="absolute bottom-4 right-4 bg-[#FAF6EF]/90 backdrop-blur-xs p-2 rounded-full text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#F7F1E7] transition-colors shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between grow">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors">
                    {SIGNATURE_DISHES[2].name}
                  </h3>
                  <div className="text-right ml-4 shrink-0">
                    <span className="font-serif text-xl font-bold text-[#B95032]">
                      {SIGNATURE_DISHES[2].price}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#8C7E74] leading-relaxed mb-4">
                  {SIGNATURE_DISHES[2].description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4D6C2]/60 flex items-center justify-between text-xs text-[#302019]/70 font-medium">
                <span className="inline-flex items-center text-[#B95032]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B95032] mr-1.5" />
                  Spicy Garlic Thecha
                </span>
                <span className="group-hover:translate-x-1 transition-transform text-[#B95032] font-semibold inline-flex items-center">
                  Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Paneer Cheese Burst Sandwich (Span 6) */}
          <div 
            onClick={() => setSelectedDish(SIGNATURE_DISHES[3])}
            className="lg:col-span-6 group cursor-pointer bg-[#F7F1E7] rounded-2xl overflow-hidden border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[3]); } }}
            aria-label={`View details for ${SIGNATURE_DISHES[3].name}`}
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#302019]/5">
              <img
                src={SIGNATURE_DISHES[3].image}
                alt={SIGNATURE_DISHES[3].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute top-4 left-4 bg-[#728064] text-[#F7F1E7] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                Cheese Loaded
              </div>

              <div className="absolute bottom-4 right-4 bg-[#FAF6EF]/90 backdrop-blur-xs p-2 rounded-full text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#F7F1E7] transition-colors shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            <div className="p-6 sm:p-7 flex flex-col justify-between grow">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors">
                    {SIGNATURE_DISHES[3].name}
                  </h3>
                  <span className="font-serif text-xl font-bold text-[#B95032] shrink-0 ml-4">
                    {SIGNATURE_DISHES[3].price}
                  </span>
                </div>
                <p className="text-sm text-[#8C7E74] leading-relaxed mb-4">
                  {SIGNATURE_DISHES[3].description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4D6C2]/60 flex items-center justify-between text-xs text-[#302019]/70 font-medium">
                <span className="inline-flex items-center text-[#728064]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-1.5" />
                  Marinated Paneer
                </span>
                <span className="group-hover:translate-x-1 transition-transform text-[#B95032] font-semibold inline-flex items-center">
                  Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA to Full Menu */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onViewFullMenu}
            className="inline-flex items-center space-x-2 text-sm uppercase tracking-wider font-semibold text-[#B95032] hover:text-[#993B22] border-b-2 border-[#B95032] pb-1 hover:border-[#993B22] transition-colors cursor-pointer"
          >
            <span>Explore the complete 30+ item menu below</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Accessible Detail Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onViewFullMenu={onViewFullMenu}
      />
    </section>
  );
};
