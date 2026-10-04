import React, { useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CHAI_PAIRINGS } from '../data/tapriwalaData';
import type { ChaiPairing } from '../data/tapriwalaData';
import { ScrollReveal } from './ScrollReveal';

interface ChaiCompanionProps {
  onHighlightMenu: (itemIds: string[]) => void;
}

export const ChaiCompanion: React.FC<ChaiCompanionProps> = ({ onHighlightMenu }) => {
  const [selectedPairingId, setSelectedPairingId] = useState<string>(CHAI_PAIRINGS[0].id);

  const currentPairing = CHAI_PAIRINGS.find((p) => p.id === selectedPairingId) || CHAI_PAIRINGS[0];

  const handleSelectMood = (pairing: ChaiPairing) => {
    setSelectedPairingId(pairing.id);
    // Gentle confetti spark
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#B95032', '#D49A3D', '#FAF6EF', '#728064']
      });
    } catch (_e) {
      // safe fallback
    }
  };

  return (
    <section id="pairing" className="py-20 lg:py-28 bg-paper-grain border-y border-[#E4D6C2] relative overflow-hidden">
      {/* Background Art Direction: Isolated, Pointer-Events-None Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-10 -right-10 text-[#D49A3D]/[0.05] transform rotate-45 scale-125">
          <svg viewBox="0 0 100 100" className="w-60 h-60" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="32" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
              <span className="w-6 h-[1px] bg-[#B95032]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Curated Combinations
              </span>
              <span className="w-6 h-[1px] bg-[#B95032]" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight mb-4">
              Find your chai-time pairing.
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-sm sm:text-base text-[#8C7E74]">
              Every mood has a sip and a bite that belongs together. Pick what you are feeling today:
            </p>
          </ScrollReveal>
        </div>

        {/* Mood Selector Buttons */}
        <ScrollReveal animation="fade-up" delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" role="tablist">
            {CHAI_PAIRINGS.map((pairing) => (
              <button
                key={pairing.id}
                type="button"
                role="tab"
                aria-selected={selectedPairingId === pairing.id}
                onClick={() => handleSelectMood(pairing)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer border ${
                  selectedPairingId === pairing.id
                    ? 'bg-[#B95032] text-[#F7F1E7] border-[#B95032] shadow-md scale-103'
                    : 'bg-[#F7F1E7] text-[#302019]/80 hover:text-[#302019] hover:bg-[#E4D6C2]/50 border-[#E4D6C2]'
                }`}
              >
                <span>{pairing.mood}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dynamic Animated Pairing Display */}
        <ScrollReveal animation="zoom-in" delay={0.4} duration={0.8}>
          <div className="bg-[#F7F1E7] rounded-3xl border border-[#E4D6C2] p-6 sm:p-10 shadow-lg relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPairing.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* The Drink */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="md:col-span-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left bg-[#FAF6EF] p-5 rounded-2xl border border-[#E4D6C2] shadow-2xs"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border-2 border-[#FAF6EF] shadow-md bg-[#302019]/10">
                      <img
                        src={currentPairing.drinkImage}
                        alt={currentPairing.drinkName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B95032] bg-[#B95032]/10 px-2 py-0.5 rounded">
                        The Brew
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#302019] mt-1">
                        {currentPairing.drinkName}
                      </h3>
                      <span className="font-serif text-lg font-bold text-[#B95032]">
                        {currentPairing.drinkPrice}
                      </span>
                      <p className="text-xs text-[#8C7E74] mt-1">
                        {currentPairing.drinkDesc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Plus Indicator */}
                  <div className="md:col-span-2 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#B95032] text-[#F7F1E7] flex items-center justify-center font-bold text-lg shadow-sm">
                      +
                    </div>
                    <span className="text-[11px] font-serif italic text-[#8C7E74] mt-1.5">
                      perfect match
                    </span>
                  </div>

                  {/* The Snack */}
                  <motion.div 
                    whileHover={{ y: -3 }}
                    className="md:col-span-5 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left bg-[#FAF6EF] p-5 rounded-2xl border border-[#E4D6C2] shadow-2xs"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border-2 border-[#FAF6EF] shadow-md bg-[#302019]/10">
                      <img
                        src={currentPairing.snackImage}
                        alt={currentPairing.snackName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#728064] bg-[#728064]/10 px-2 py-0.5 rounded">
                        The Bite
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#302019] mt-1">
                        {currentPairing.snackName}
                      </h3>
                      <span className="font-serif text-lg font-bold text-[#B95032]">
                        {currentPairing.snackPrice}
                      </span>
                      <p className="text-xs text-[#8C7E74] mt-1">
                        {currentPairing.snackDesc}
                      </p>
                    </div>
                  </motion.div>

                </div>

                {/* Why It Works & Action */}
                <div className="mt-8 pt-6 border-t border-[#E4D6C2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-4 h-4 text-[#B95032] shrink-0" />
                    <p className="text-xs sm:text-sm text-[#302019]/80 font-medium">
                      <span className="font-bold text-[#302019]">Why it works:</span> {currentPairing.whyItWorks}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onHighlightMenu(currentPairing.menuItemIds)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#302019] hover:bg-[#261710] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B95032] shrink-0"
                  >
                    <span>View these in the menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
