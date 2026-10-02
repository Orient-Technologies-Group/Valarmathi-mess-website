import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const KonguIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scroll driven transforms for image mask and expansion
  const imageScale = useTransform(scrollYProgress, [0.1, 0.6], [1.12, 1]);
  const imageX = useTransform(scrollYProgress, [0.1, 0.6], [shouldReduceMotion ? 0 : 20, 0]);
  const imageClip = useTransform(
    scrollYProgress,
    [0.1, 0.55],
    ['inset(10% 6% 10% 6% round 8px)', 'inset(0% 0% 0% 0% round 6px)']
  );

  // Words for staged reveal
  const words = ['Pure.', 'Native.', 'Regional.'];

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-36 bg-[#FAF7F2] border-b border-[#6B1D28]/10 relative overflow-hidden"
    >
      {/* Warm Ambient Radial Lighting (Subtle, authentic warmth) */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] bg-[radial-gradient(circle_at_80%_20%,rgba(200,134,27,0.06),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle_at_15%_85%,rgba(107,29,40,0.04),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Understated Tamil Heritage Watermark */}
      <div
        className="absolute inset-y-0 right-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.035] -rotate-6"
        aria-hidden="true"
      >
        <span className="font-tamil text-[16vw] font-bold text-[#4F131C] leading-none whitespace-nowrap">
          கொங்கு நாடு
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Progressive Editorial Statement */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase"
            >
              <span className="w-6 h-[1.5px] bg-[#C8861B]" />
              <span>The Culinary Heritage of Kongunadu</span>
            </motion.div>

            {/* Word-by-Word Reveal: "Pure. Native. Regional." */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F131C] leading-[1.08] tracking-tight">
              <span className="flex flex-wrap gap-x-3 mb-2">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
                className="italic font-normal text-[#242220] text-3xl sm:text-4xl block mt-2"
              >
                Food cooked with reverence for the soil.
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg text-[#554E48] leading-relaxed font-light"
            >
              Unlike the heavy marinades of northern cuisines or the pungent fennel-rich pastes of Chettinad,
              authentic <strong className="font-semibold text-[#4F131C]">Kongu cuisine</strong> celebrates restraint,
              subtlety, and absolute freshness. Here in Coimbatore and the surrounding western plains of Tamil Nadu,
              the culinary language is defined by locally grown ingredients that allow the natural flavour of meat
              and grain to triumph.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-base text-[#554E48] leading-relaxed font-light"
            >
              At <strong className="font-semibold text-[#4F131C]">Valarmathi Mess</strong>, operating in Race Course
              since 1986, every recipe adheres to this ancestral wisdom: generous handfuls of sweet{' '}
              <em>chinna vengayam</em> (small shallots), cold-pressed gingelly oil, whole cracked Tellicherry black pepper,
              and sun-dried native red chilies roasted over gentle heat.
            </motion.p>

            {/* Cultural highlights: 3 Refined Editorial Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6"
            >
              <div className="bg-white/80 backdrop-blur-xs rounded-lg p-3.5 border border-[#C8861B]/25 shadow-xs hover:border-[#C8861B]/50 transition-colors">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8861B]" />
                  <span className="text-xs uppercase tracking-wider text-[#C8861B] font-bold">Chinna Vengayam</span>
                </div>
                <div className="font-tamil text-[11px] text-[#4F131C] font-medium mb-1">சின்ன வெங்காயம்</div>
                <p className="text-xs text-[#6F6B66] leading-snug">Sweet native small shallots crushed fresh every dawn</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-lg p-3.5 border border-[#C8861B]/25 shadow-xs hover:border-[#C8861B]/50 transition-colors">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8861B]" />
                  <span className="text-xs uppercase tracking-wider text-[#C8861B] font-bold">Cold-Pressed Oils</span>
                </div>
                <div className="font-tamil text-[11px] text-[#4F131C] font-medium mb-1">மரச்செக்கு எண்ணெய்</div>
                <p className="text-xs text-[#6F6B66] leading-snug">Pure nallennai (sesame) & country-churned butter ghee</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-lg p-3.5 border border-[#C8861B]/25 shadow-xs hover:border-[#C8861B]/50 transition-colors">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8861B]" />
                  <span className="text-xs uppercase tracking-wider text-[#C8861B] font-bold">Seeraga Samba</span>
                </div>
                <div className="font-tamil text-[11px] text-[#4F131C] font-medium mb-1">சீரக சம்பா அரிசி</div>
                <p className="text-xs text-[#6F6B66] leading-snug">Aromatic short-grain rice cooked to delicate perfection</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sophisticated Masked Image Reveal */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Architectural Brass Offset Framing Line */}
              <div
                className="absolute -inset-2.5 rounded-xl border border-[#C8861B]/30 translate-x-2 translate-y-2 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />

              {/* Primary Image with scroll-driven clip-path unmasking */}
              <motion.div
                style={{
                  clipPath: shouldReduceMotion ? 'none' : imageClip,
                  x: imageX,
                }}
                className="relative z-10 overflow-hidden rounded-lg border border-[#6B1D28]/15 shadow-2xl bg-[#F4EFE7] will-change-transform"
              >
                <motion.img
                  style={{
                    scale: shouldReduceMotion ? 1 : imageScale,
                  }}
                  src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80"
                  alt="Traditional banana leaf South Indian mess meal"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </motion.div>

              {/* Floating Accent Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 -mt-8 sm:-mt-10 sm:-ml-6 ml-4 bg-[#4F131C] text-[#FAF7F2] p-5 rounded-lg shadow-2xl border border-[#C8861B]/40 max-w-[260px]"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E09E2B]" />
                  <span className="font-tamil text-xl text-[#E09E2B] font-bold">கொங்கு சுவை</span>
                </div>
                <div className="text-[11px] uppercase tracking-widest text-white/80 font-medium">Race Course, Coimbatore</div>
                <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-[#FAF7F2]/80 leading-snug">
                  Unpretentious, honest, and fiercely authentic since 1986.
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
