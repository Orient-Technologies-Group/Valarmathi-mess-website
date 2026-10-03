import React from 'react';
import { motion } from 'framer-motion';

export const BrandStrip: React.FC = () => {
  const items = [
    'Kulhad Chai',
    'Desi Comfort',
    'Freshly Prepared',
    'Conversations Welcome',
    '100% Pure Vegetarian',
    'Jain Options On Request',
    'Zero Artificial Colours',
    'Pocket-Friendly',
  ];

  return (
    <section 
      className="border-y border-[#E4D6C2] bg-[#FAF6EF] py-4 overflow-hidden relative shadow-xs" 
      aria-label="Brand philosophy"
    >
      <div className="flex select-none overflow-hidden whitespace-nowrap">
        {/* Infinite gentle drifting ticker */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex items-center space-x-8 sm:space-x-12 shrink-0 font-serif"
        >
          {[...items, ...items, ...items].map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center space-x-6 text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#302019]/80">
              <span className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B95032]" />
                <span className="font-sans text-[11px] sm:text-xs tracking-[0.2em]">{item}</span>
              </span>
              <span className="text-[#8C7E74]/35 text-base font-light">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
