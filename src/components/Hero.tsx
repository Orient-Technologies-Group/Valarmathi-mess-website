import React from 'react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onExploreMenu: () => void;
  onFindOutlets: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onFindOutlets }) => {
  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#FAF6EF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="inline-flex items-center space-x-2 self-start px-3 py-1.5 rounded-full bg-[#F7F1E7] border border-[#E4D6C2] mb-6 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#B95032]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#302019]/85">
                Coimbatore’s Contemporary Tapri
              </span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#302019] tracking-tight leading-[1.08] mb-6"
            >
              A little chai.{' '}
              <span className="block italic font-normal text-[#B95032]">
                A lot of conversation.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="text-base sm:text-lg text-[#302019]/75 font-normal leading-relaxed max-w-xl mb-8"
            >
              Freshly brewed kulhad chai, comforting desi bites, and a cosy corner to make your own.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8"
            >
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 bg-[#B95032] hover:bg-[#993B22] text-[#FAF6EF] text-xs uppercase tracking-widest font-semibold rounded-md shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#302019]"
              >
                <span>Explore the menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onFindOutlets}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#FAF6EF] hover:bg-[#E4D6C2]/50 text-[#302019] border border-[#8C7E74]/40 text-xs uppercase tracking-widest font-semibold rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B95032]"
              >
                <MapPin className="w-4 h-4 text-[#B95032]" />
                <span>Find your Tapri</span>
              </button>
            </motion.div>

            {/* Clear Vegetarian Reassurance Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#8C7E74] font-medium pt-3 border-t border-[#E4D6C2]/80"
            >
              <span className="inline-flex items-center text-[#728064] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#728064] mr-1.5" />
                100% vegetarian
              </span>
              <span>·</span>
              <span>Jain options on request</span>
              <span>·</span>
              <span>Pocket-friendly</span>
            </motion.div>
          </div>

          {/* Right Column: Prominent Kulhad Image Panel */}
          <div className="lg:col-span-6 xl:col-span-6 relative order-1 lg:order-2 flex justify-center">
            
            <div className="relative w-full max-w-[480px] lg:max-w-[520px] aspect-4/3 sm:aspect-5/4 rounded-2xl">
              {/* Image Frame with fine shadow and restrained border */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-[#E4D6C2] bg-[#FAF6EF]">
                <img
                  src="/images/kulhad-chai.jpg"
                  alt="Authentic clay kulhad filled with steaming masala chai, surrounded by spices on wooden table"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Left Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF6EF]">
                  <div className="flex items-center space-x-2 bg-[#302019]/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10 text-xs shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#D49A3D]" />
                    <span className="font-medium tracking-wide">Signature Kulhad Brew — ₹40</span>
                  </div>
                  <span className="text-xs text-[#FAF6EF]/90 font-serif italic hidden sm:inline-block">
                    Brewed with fresh ginger & mint
                  </span>
                </div>
              </div>

              {/* Gentle Steam Particles (CSS animated) */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none w-28 h-28 flex justify-center" aria-hidden="true">
                <div className="w-1.5 h-12 bg-gradient-to-t from-white/35 via-white/15 to-transparent rounded-full blur-[1.5px] animate-steam-1 absolute" />
                <div className="w-2 h-14 bg-gradient-to-t from-white/30 via-white/10 to-transparent rounded-full blur-[1.5px] animate-steam-2 absolute left-6" />
                <div className="w-1.5 h-10 bg-gradient-to-t from-white/25 via-white/10 to-transparent rounded-full blur-[1.5px] animate-steam-3 absolute right-6" />
              </div>

              {/* Rotating Circular Brand Seal */}
              <div 
                className="absolute -top-5 -right-3 sm:-top-7 sm:-right-7 w-22 h-22 sm:w-26 sm:h-26 z-20 pointer-events-none"
                aria-hidden="true"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full animate-spin-slow filter drop-shadow-sm"
                  >
                    <path
                      id="seal-text-path"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] uppercase tracking-[0.19em] fill-[#302019] font-bold">
                      <textPath href="#seal-text-path" startOffset="0%">
                        Brewed Fresh · Served Warm · Tapriwala ·
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#B95032] text-[#FAF6EF] flex items-center justify-center shadow-inner">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Handwritten Understated Annotation */}
              <div
                className="absolute -bottom-4 -left-2 sm:-left-5 z-20 bg-[#FAF6EF] px-3.5 py-1.5 rounded-md shadow-md border border-[#E4D6C2] rotate-[-2.5deg] hidden sm:flex items-center space-x-1.5 pointer-events-none"
                aria-hidden="true"
              >
                <span className="font-script text-xl sm:text-2xl text-[#B95032] font-semibold leading-none">
                  Your chai break starts here ↗
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll Cue at Bottom */}
        <div className="mt-12 lg:mt-16 flex flex-col items-center justify-center text-center">
          <a
            href="#story"
            className="group inline-flex flex-col items-center text-[#8C7E74] hover:text-[#B95032] transition-colors focus:outline-none"
            aria-label="Scroll to learn our story"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-2">
              Scroll to explore
            </span>
            <div className="w-4 h-7 rounded-full border border-[#8C7E74]/40 flex items-start justify-center p-1 group-hover:border-[#B95032] transition-colors">
              <div className="w-1 h-1.5 bg-[#B95032] rounded-full animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
