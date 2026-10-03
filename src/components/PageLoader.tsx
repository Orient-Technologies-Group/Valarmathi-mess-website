import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already shown in this tab session
    const hasLoaded = sessionStorage.getItem('tapriwala_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('tapriwala_loaded', 'true');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setLoading(false);
    sessionStorage.setItem('tapriwala_loaded', 'true');
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleDismiss}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6EF] text-[#302019] cursor-pointer selection:bg-transparent overflow-hidden"
          role="status"
          aria-label="Loading Tapriwala experience"
        >
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 bg-paper-grain opacity-70 pointer-events-none" />

          {/* Centered Cart & Kettle Illustration */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            
            {/* Animated Tea Cart & Steaming Kettle SVG */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-40 h-36 mb-6"
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
                  animate={{ pathLength: 1, opacity: [0, 0.8, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M98 46 C102 36 96 26 100 16"
                  stroke="#D49A3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.9, 0.3] }}
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

                {/* Vintage Spoked Wheels */}
                <circle cx="48" cy="124" r="14" fill="#FAF6EF" stroke="#302019" strokeWidth="3" />
                <circle cx="48" cy="124" r="3" fill="#B95032" />
                <line x1="48" y1="110" x2="48" y2="138" stroke="#8C7E74" strokeWidth="1.5" />
                <line x1="34" y1="124" x2="62" y2="124" stroke="#8C7E74" strokeWidth="1.5" />

                <circle cx="112" cy="124" r="14" fill="#FAF6EF" stroke="#302019" strokeWidth="3" />
                <circle cx="112" cy="124" r="3" fill="#B95032" />
                <line x1="112" y1="110" x2="112" y2="138" stroke="#8C7E74" strokeWidth="1.5" />
                <line x1="98" y1="124" x2="126" y2="124" stroke="#8C7E74" strokeWidth="1.5" />
              </svg>
            </motion.div>

            {/* Typographic Identity */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#302019]">
                tapriwala
              </h1>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8C7E74] mt-1">
                The Contemporary Tea Cafe · Coimbatore
              </p>
            </motion.div>

            {/* Brewing indicator bar */}
            <div className="w-48 h-1 bg-[#E4D6C2] rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#B95032] to-[#D49A3D]"
              />
            </div>

            <p className="font-script text-lg text-[#B95032] font-semibold mt-3">
              Brewing fresh in a clay kulhad...
            </p>

            <span className="text-[10px] text-[#8C7E74]/60 uppercase tracking-widest mt-6">
              Click anywhere to enter
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
