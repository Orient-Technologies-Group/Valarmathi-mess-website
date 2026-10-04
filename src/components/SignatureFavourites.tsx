import React, { useState } from 'react';
import { ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data/tapriwalaData';
import type { MenuItem } from '../data/tapriwalaData';
import { DishDetailModal } from './DishDetailModal';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

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
            <ScrollReveal animation="fade-right" delay={0.1}>
              <div className="flex items-center space-x-2 text-[#B95032] mb-3">
                <span className="w-8 h-[1px] bg-[#B95032]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                  Signature Introductions
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight">
                First visit?{' '}
                <span className="italic font-normal text-[#B95032]">Start here.</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <ScrollReveal animation="fade-up" delay={0.3}>
              <p className="text-sm text-[#8C7E74] max-w-xs font-normal">
                Four timeless house favourites that define the Tapriwala taste. Click any item to explore.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Asymmetric Choreographed Food Showcase: Hero Left + Two Staggered Settling Companion Panels Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Panel 1: Featured Large Hero Dish (Tapriwala Special Chai) */}
          <div className="lg:col-span-6 flex flex-col">
            <ScrollReveal animation="fade-right" delay={0.1} className="h-full">
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedDish(SIGNATURE_DISHES[0])}
                className="h-full group cursor-pointer bg-[#F7F1E7] rounded-3xl overflow-hidden border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[0]); } }}
                aria-label={`View details for ${SIGNATURE_DISHES[0].name}`}
              >
                <div className="relative aspect-16/11 overflow-hidden bg-[#302019]/5">
                  <img
                    src={SIGNATURE_DISHES[0].image}
                    alt={SIGNATURE_DISHES[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/70 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  
                  <div className="absolute top-5 left-5 bg-[#B95032] text-[#FAF6EF] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                    House Icon · Signature Brew
                  </div>

                  <div className="absolute bottom-5 right-5 bg-[#FAF6EF]/90 backdrop-blur-xs p-2.5 rounded-full text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#FAF6EF] transition-colors shadow-sm">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between grow">
                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors">
                        {SIGNATURE_DISHES[0].name}
                      </h3>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#B95032] shrink-0 ml-4">
                        {SIGNATURE_DISHES[0].price}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#8C7E74] leading-relaxed mb-6 font-normal">
                      {SIGNATURE_DISHES[0].description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E4D6C2]/80 flex items-center justify-between text-xs text-[#302019]/75 font-medium">
                    <span className="inline-flex items-center text-[#728064] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-2" />
                      Earthy Clay Kulhad · Fresh Mint & Ginger
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform text-[#B95032] font-semibold inline-flex items-center">
                      Explore Dish <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Panels Right: 3 Staggered Settling Companion Panels (Cold Cocoa, Vada Pav, Paneer Sandwich) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Panel 2: Surat Special Cold Cocoa */}
            <ScrollReveal animation="fade-left" delay={0.15}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedDish(SIGNATURE_DISHES[1])}
                className="group cursor-pointer bg-[#F7F1E7] rounded-2xl p-4 sm:p-5 border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center gap-5"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[1]); } }}
                aria-label={`View details for ${SIGNATURE_DISHES[1].name}`}
              >
                <div className="relative w-full sm:w-36 h-32 rounded-xl overflow-hidden shrink-0 bg-[#302019]/10">
                  <img
                    src={SIGNATURE_DISHES[1].image}
                    alt={SIGNATURE_DISHES[1].name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-[#302019] text-[#FAF6EF] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Surat Special
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors truncate">
                      {SIGNATURE_DISHES[1].name}
                    </h4>
                    <span className="font-serif text-lg font-bold text-[#B95032] shrink-0">
                      {SIGNATURE_DISHES[1].price}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7E74] leading-relaxed mb-2.5 line-clamp-2">
                    {SIGNATURE_DISHES[1].description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#302019]/75 font-medium pt-2 border-t border-[#E4D6C2]/60">
                    <span className="text-[#D49A3D] font-semibold">Decadent Chilled Cocoa</span>
                    <span className="text-[#B95032] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Panel 3: Classic Mumbai Vada Pav */}
            <ScrollReveal animation="fade-left" delay={0.2}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedDish(SIGNATURE_DISHES[2])}
                className="group cursor-pointer bg-[#F7F1E7] rounded-2xl p-4 sm:p-5 border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center gap-5"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[2]); } }}
                aria-label={`View details for ${SIGNATURE_DISHES[2].name}`}
              >
                <div className="relative w-full sm:w-36 h-32 rounded-xl overflow-hidden shrink-0 bg-[#302019]/10">
                  <img
                    src={SIGNATURE_DISHES[2].image}
                    alt={SIGNATURE_DISHES[2].name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-[#B95032] text-[#FAF6EF] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Bombay Street
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors truncate">
                      {SIGNATURE_DISHES[2].name}
                    </h4>
                    <span className="font-serif text-lg font-bold text-[#B95032] shrink-0">
                      {SIGNATURE_DISHES[2].price}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7E74] leading-relaxed mb-2.5 line-clamp-2">
                    {SIGNATURE_DISHES[2].description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#302019]/75 font-medium pt-2 border-t border-[#E4D6C2]/60">
                    <span className="text-[#B95032] font-semibold">Dry Garlic Thecha & Mint</span>
                    <span className="text-[#B95032] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Panel 4: Paneer Cheese Burst Sandwich */}
            <ScrollReveal animation="fade-left" delay={0.25}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedDish(SIGNATURE_DISHES[3])}
                className="group cursor-pointer bg-[#F7F1E7] rounded-2xl p-4 sm:p-5 border border-[#E4D6C2] hover:border-[#B95032] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center gap-5"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(SIGNATURE_DISHES[3]); } }}
                aria-label={`View details for ${SIGNATURE_DISHES[3].name}`}
              >
                <div className="relative w-full sm:w-36 h-32 rounded-xl overflow-hidden shrink-0 bg-[#302019]/10">
                  <img
                    src={SIGNATURE_DISHES[3].image}
                    alt={SIGNATURE_DISHES[3].name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-[#728064] text-[#FAF6EF] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Cheese Loaded
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors truncate">
                      {SIGNATURE_DISHES[3].name}
                    </h4>
                    <span className="font-serif text-lg font-bold text-[#B95032] shrink-0">
                      {SIGNATURE_DISHES[3].price}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7E74] leading-relaxed mb-2.5 line-clamp-2">
                    {SIGNATURE_DISHES[3].description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#302019]/75 font-medium pt-2 border-t border-[#E4D6C2]/60">
                    <span className="text-[#728064] font-semibold">Marinated Cottage Cheese</span>
                    <span className="text-[#B95032] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Quick Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

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
