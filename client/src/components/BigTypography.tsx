import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const BigTypography: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Staged word progress for understated editorial reveal
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.3], [0.15, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4], [0.15, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.35, 0.5], [0.15, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.6], [0.15, 1]);

  const yMove = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 0 : 30, shouldReduceMotion ? 0 : -30]);

  return (
    <section
      ref={containerRef}
      className="py-28 lg:py-44 bg-[#FAF7F2] border-b border-[#6B1D28]/10 relative overflow-hidden flex items-center justify-center select-none"
    >
      {/* Giant Architectural Background Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-tamil text-[16vw] font-bold text-[#4F131C] whitespace-nowrap">
          வளர்மதி மெஸ்
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.3em] uppercase text-[#C8861B] mb-6">
          <span className="w-8 h-[1.5px] bg-[#C8861B]" />
          <span>The Soul of Coimbatore</span>
          <span className="w-8 h-[1.5px] bg-[#C8861B]" />
        </div>

        {/* Dramatic Word-by-Word Big Typography Statement */}
        <motion.div style={{ y: yMove }} className="space-y-2 sm:space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#4F131C] leading-[1.05] uppercase">
            <motion.span style={{ opacity: opacity1 }} className="inline-block mx-2">
              Flavour
            </motion.span>
            <motion.span style={{ opacity: opacity2 }} className="inline-block mx-2">
              That
            </motion.span>
            <br className="hidden sm:inline" />
            <motion.span style={{ opacity: opacity3 }} className="inline-block mx-2 text-[#C8861B]">
              Belongs
            </motion.span>
            <motion.span style={{ opacity: opacity4 }} className="inline-block mx-2">
              Here.
            </motion.span>
          </h2>
        </motion.div>

        {/* Subtitle Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-[#6B6661] font-light leading-relaxed tracking-wide uppercase"
        >
          Rooted in the soil of Kongunadu • Unapologetically authentic since 1986
        </motion.p>
      </div>
    </section>
  );
};
