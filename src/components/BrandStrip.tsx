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
    'Assam CTC Leaves',
    'Clay Pot Baked',
  ];

  // Duplicate items for continuous loop
  const duplicatedItems = [...items, ...items];

  return (
    <section 
      className="border-y border-[#E4D6C2] bg-[#F7F1E7] py-3.5 overflow-hidden select-none relative" 
      aria-label="Brand philosophy ticker"
    >
      <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#F7F1E7] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#F7F1E7] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center min-w-max gap-8 text-[#302019]/80 font-medium will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center space-x-8">
            <div className="flex items-center space-x-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#302019]/85">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B95032] shrink-0" />
              <span>{item}</span>
            </div>
            <span className="text-[#8C7E74]/40 text-xs font-serif italic select-none">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

