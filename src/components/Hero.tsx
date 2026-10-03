import React, { useRef } from 'react';
import { Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  onExploreMenu: () => void;
  onFindOutlets: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onFindOutlets }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Desktop Scroll Parallax Transformations
  const leftTextY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15]);
  const cupY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const cupScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.05]);
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-paper-grain"
    >
      {/* Decorative Warm Lighting Glows */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E4D6C2]/45 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#B95032]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy with Parallax Exit */}
          <motion.div 
            style={{ y: leftTextY, opacity: leftTextOpacity }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center order-2 lg:order-1 pt-4 lg:pt-0"
          >
            
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center space-x-2 self-start px-3 py-1.5 rounded-full bg-[#FAF6EF] border border-[#E4D6C2] shadow-xs mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#B95032] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#302019]/80">
                Coimbatore’s Contemporary Tapri
              </span>
            </motion.div>

            {/* Main Heading with Staggered Word Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#302019] tracking-tight leading-[1.08] mb-6"
            >
              A little chai.{' '}
              <span className="block italic font-normal text-[#B95032]">
                A lot of conversation.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-[#302019]/75 font-normal leading-relaxed max-w-xl mb-8"
            >
              Freshly brewed kulhad chai, comforting desi bites, and a cosy corner to make your own. Where roadside memories meet the calm of an afternoon cafe.
            </motion.p>

            {/* CTAs with Interactive Hover Bounce */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8"
            >
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-sm uppercase tracking-wider font-semibold rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#302019]"
              >
                <span>Explore the menu</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onFindOutlets}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#FAF6EF] hover:bg-[#E4D6C2]/40 text-[#302019] border border-[#8C7E74]/40 text-sm font-semibold rounded-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B95032]"
              >
                <MapPin className="w-4 h-4 text-[#B95032]" />
                <span>Find your Tapri</span>
              </button>
            </motion.div>

            {/* Supporting Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-3 text-xs sm:text-sm text-[#8C7E74] font-medium pt-2 border-t border-[#E4D6C2]/60"
            >
              <span className="inline-flex items-center text-[#728064] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-1.5"></span>
                100% vegetarian
              </span>
              <span>·</span>
              <span>Jain options on request</span>
              <span>·</span>
              <span>Pocket-friendly</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Oversized Kulhad Chai with Parallax Movement & Hover */}
          <div className="lg:col-span-6 xl:col-span-6 relative order-1 lg:order-2 flex justify-center">
            
            {/* Parallax Container */}
            <motion.div
              style={{ y: cupY, scale: cupScale }}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[480px] lg:max-w-[530px] aspect-4/3 sm:aspect-5/4 rounded-2xl overflow-visible"
            >
              
              {/* Image Frame with fine shadow and subtle border */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF] bg-[#302019]/5 group">
                <img
                  src="/images/kulhad-chai.jpg"
                  alt="Authentic clay kulhad filled with steaming masala chai, surrounded by spices on wooden table"
                  className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Warm gradient vignette at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/65 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Left Pill on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F7F1E7]">
                  <motion.div 
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    className="flex items-center space-x-2 bg-[#302019]/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 text-xs shadow-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#D49A3D]" />
                    <span className="font-medium tracking-wide">Signature Kulhad Brew — ₹40</span>
                  </motion.div>
                  <span className="text-xs text-[#FAF6EF]/90 font-serif italic hidden sm:inline-block">
                    Brewed with fresh ginger & mint
                  </span>
                </div>
              </div>

              {/* Gentle Steam Particles (CSS animated SVG) */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none w-32 h-32 flex justify-center" aria-hidden="true">
                <div className="w-2 h-14 bg-gradient-to-t from-white/40 via-white/20 to-transparent rounded-full blur-[2px] animate-steam-1 absolute" />
                <div className="w-2.5 h-16 bg-gradient-to-t from-white/35 via-white/15 to-transparent rounded-full blur-[2px] animate-steam-2 absolute left-8" />
                <div className="w-1.5 h-12 bg-gradient-to-t from-white/30 via-white/10 to-transparent rounded-full blur-[2px] animate-steam-3 absolute right-8" />
              </div>

              {/* Rotating Circular Seal with Scroll-linked Rotation */}
              <motion.div 
                style={{ rotate: sealRotate }}
                className="absolute -top-6 -right-4 sm:-top-8 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none"
                aria-hidden="true"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Rotating Text Ring */}
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full animate-spin-slow filter drop-shadow-md"
                  >
                    <path
                      id="seal-text-path"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] uppercase tracking-[0.19em] fill-[#302019] font-semibold">
                      <textPath href="#seal-text-path" startOffset="0%">
                        Brewed Fresh · Served Warm · Tapriwala ·
                      </textPath>
                    </text>
                  </svg>
                  {/* Seal Center Emblem */}
                  <div className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B95032] text-[#F7F1E7] flex items-center justify-center shadow-inner">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </motion.div>

              {/* Handwritten Understated Annotation with Gentle Float */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                transition={{ 
                  opacity: { delay: 0.8, duration: 0.5 },
                  scale: { delay: 0.8, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute -bottom-6 -left-2 sm:-left-6 z-20 bg-[#FAF6EF] px-3.5 py-1.5 rounded-md shadow-md border border-[#E4D6C2] rotate-[-3deg] hidden sm:flex items-center space-x-1.5 pointer-events-none"
                aria-hidden="true"
              >
                <span className="font-script text-xl sm:text-2xl text-[#B95032] font-semibold leading-none">
                  Your chai break starts here ↗
                </span>
              </motion.div>

            </motion.div>

          </div>

        </div>

        {/* Scroll Cue at Bottom with Scroll-triggered Fade-out */}
        <motion.div 
          style={{ opacity: scrollCueOpacity }}
          className="mt-14 lg:mt-20 flex flex-col items-center justify-center text-center"
        >
          <a
            href="#story"
            className="group inline-flex flex-col items-center text-[#8C7E74] hover:text-[#B95032] transition-colors focus:outline-none"
            aria-label="Scroll to learn our story"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-[#8C7E74]/40 flex items-start justify-center p-1 group-hover:border-[#B95032] transition-colors">
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 bg-[#B95032] rounded-full" 
              />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
