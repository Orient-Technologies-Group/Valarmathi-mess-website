import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically transition into the site after the cart & brewing animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.98 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6EF] text-[#302019] cursor-pointer selection:bg-transparent overflow-hidden bg-paper-grain"
          role="status"
          aria-label="Loading Tapriwala experience"
        >
          {/* Subtle paper grain texture overlay */}
          <div className="absolute inset-0 bg-paper-grain opacity-80 pointer-events-none" />

          {/* Centered Cart & Kettle Illustration Box */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center select-none">
            
            {/* Animated Tea Cart & Steaming Kettle SVG */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative w-44 h-40 mb-5"
            >
              <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-md">
                {/* Steam spirals from kettle */}
                <motion.path
                  d="M92 48 C90 35 98 25 94 15 C92 10 95 6 93 2"
                  stroke="#B95032"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.85, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M98 46 C102 36 96 26 100 16"
                  stroke="#D49A3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.9, 0.35] }}
                  transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Awning Roof of the Tapri Cart */}
                <path d="M25 45 L135 45 L145 56 L15 56 Z" fill="#B95032" />
                <path d="M35 45 L45 56 M65 45 L75 56 M95 45 L105 56 M125 45 L135 56" stroke="#FAF6EF" strokeWidth="2" />

                {/* Wooden Poles */}
                <rect x="28" y="56" width="4" height="42" fill="#8C7E74" />
                <rect x="128" y="56" width="4" height="42" fill="#8C7E74" />

                {/* Counter Table Top */}
                <rect x="18" y="94" width="124" height="8" rx="2" fill="#302019" />

                {/* Traditional Chai Kettle on Counter */}
                <path d="M78 80 C78 68 85 62 96 62 C107 62 114 68 114 80 L112 94 L80 94 Z" fill="#D49A3D" />
                <path d="M85 62 L87 56 L105 56 L107 62 Z" fill="#B95032" />
                {/* Kettle Handle */}
                <path d="M76 74 C68 74 68 86 78 86" stroke="#302019" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Kettle Spout */}
                <path d="M112 76 L124 64 L122 62 L110 70 Z" fill="#D49A3D" />

                {/* Clay Kulhads stacked on counter */}
                <path d="M38 82 L43 94 L51 94 L56 82 Z" fill="#B95032" />
                <path d="M53 82 L58 94 L66 94 L71 82 Z" fill="#B95032" />

                {/* Cart Body */}
                <rect x="24" y="102" width="112" height="18" rx="2" fill="#FAF6EF" stroke="#E4D6C2" strokeWidth="2" />
                <line x1="30" y1="111" x2="130" y2="111" stroke="#E4D6C2" strokeWidth="1" />

                {/* Vintage Spoked Wheels with subtle rotation */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '48px 124px' }}
                >
                  <circle cx="48" cy="124" r="14" fill="#FAF6EF" stroke="#302019" strokeWidth="3" />
                  <circle cx="48" cy="124" r="3" fill="#B95032" />
                  <line x1="48" y1="110" x2="48" y2="138" stroke="#8C7E74" strokeWidth="1.5" />
                  <line x1="34" y1="124" x2="62" y2="124" stroke="#8C7E74" strokeWidth="1.5" />
                </motion.g>

                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '112px 124px' }}
                >
                  <circle cx="112" cy="124" r="14" fill="#FAF6EF" stroke="#302019" strokeWidth="3" />
                  <circle cx="112" cy="124" r="3" fill="#B95032" />
                  <line x1="112" y1="110" x2="112" y2="138" stroke="#8C7E74" strokeWidth="1.5" />
                  <line x1="98" y1="124" x2="126" y2="124" stroke="#8C7E74" strokeWidth="1.5" />
                </motion.g>
              </svg>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#302019]">
                tapriwala
              </h1>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C7E74] mt-1">
                The Contemporary Tea Cafe · Coimbatore
              </p>
            </motion.div>

            {/* Brewing Progress Indicator Bar */}
            <div className="w-52 h-1.5 bg-[#E4D6C2] rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.0, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#B95032] via-[#D49A3D] to-[#B95032]"
              />
            </div>

            {/* Authentic Tapriwala Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4"
            >
              <p className="font-serif italic text-lg sm:text-xl text-[#B95032] font-medium leading-snug">
                “Brewing your kulhad chai & setting your table...”
              </p>
              <p className="text-xs text-[#8C7E74] mt-1.5 leading-relaxed font-normal max-w-xs mx-auto">
                Fresh ginger, mint & spices simmering away. Your seat at the tapri is almost ready.
              </p>
            </motion.div>

            {/* Skip hint */}
            <span className="text-[10px] text-[#8C7E74]/60 uppercase tracking-widest mt-7 hover:text-[#B95032] transition-colors">
              Click anywhere to enter sooner
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
