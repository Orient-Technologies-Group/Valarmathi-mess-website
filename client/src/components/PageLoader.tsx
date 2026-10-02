import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [show, setShow] = useState<boolean>(() => {
    // Only show once per browser session for optimal UX
    return !sessionStorage.getItem('vm_loaded');
  });

  useEffect(() => {
    if (!show) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('vm_loaded', 'true');
      if (onComplete) onComplete();
    }, 900); // Fast, respectful 900ms duration

    return () => clearTimeout(timer);
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#241613] text-[#FAF7F2] flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            className="text-center space-y-3 px-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C8861B]">
              Coimbatore, Tamil Nadu
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              VALARMATHI MESS
            </h1>

            <div className="font-tamil text-sm text-[#E09E2B] font-medium tracking-wide">
              வளர்மதி மெஸ் • 1986
            </div>

            {/* Growing thin gold progress line */}
            <div className="w-36 h-[2px] bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C8861B] to-[#E09E2B]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
