import React from 'react';
import { Gamepad2, Users, Lamp, Sparkles, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const TapriExperience: React.FC = () => {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-dark-grain text-[#F7F1E7] relative overflow-hidden">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <ScrollReveal animation="fade-right" delay={0.1}>
            <div className="inline-flex items-center space-x-2 text-[#D49A3D] mb-4">
              <span className="w-8 h-[1px] bg-[#D49A3D]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                The Cafe Ambiance
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[#F7F1E7] mb-6">
              Some conversations need{' '}
              <span className="italic font-normal text-[#D49A3D]">
                a second cup.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#E4D6C2]/80 leading-relaxed font-normal max-w-2xl">
              At Tapriwala, we built a place where time slows down. From students huddled over college notes to families sharing evening bun maska, our spaces are designed for comfort, warmth, and easy connection.
            </p>
          </ScrollReveal>
        </div>

        {/* Cafe Scrapbook Layout with Scroll Reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Atmosphere Visual (Polaroid / Frame Feel) */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="zoom-in" delay={0.25} duration={0.8}>
              <motion.div 
                whileHover={{ rotate: 0, scale: 1.01 }}
                transition={{ duration: 0.4 }}
                className="relative p-3 bg-[#FAF6EF] rounded-2xl shadow-2xl rotate-[-1deg] border border-[#E4D6C2]/40"
              >
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#261710] group">
                  <img
                    src="/images/cafe-ambience.jpg"
                    alt="Friends laughing around wooden table at Tapriwala playing board games with kulhad chai"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating pill on photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#F7F1E7]">
                    <span className="text-xs font-serif italic text-[#FAF6EF]">
                      Flagship Cafe · R.S. Puram, Coimbatore
                    </span>
                    <span className="text-[11px] bg-[#302019]/80 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                      Warm Edison Lighting
                    </span>
                  </div>
                </div>

                {/* Scrapbook Caption Under Image */}
                <div className="pt-3 pb-1 px-2 flex items-center justify-between text-[#302019]">
                  <p className="font-script text-xl sm:text-2xl text-[#302019] font-bold">
                    Evenings at the DB Road corner outlet
                  </p>
                  <span className="text-xs font-serif italic text-[#8C7E74]">
                    Table #4
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Secondary Stacked Moments */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Real Outlet Photo Card */}
            <ScrollReveal animation="fade-left" delay={0.35}>
              <motion.div 
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="p-3 bg-[#FAF6EF] rounded-2xl shadow-xl rotate-[1.5deg] border border-[#E4D6C2]/40"
              >
                <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#261710]">
                  <img
                    src="/images/swiggy_rspuram.jpg"
                    alt="Tapriwala RS Puram cafe exterior and dining area"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#F7F1E7] bg-[#B95032] px-2.5 py-0.5 rounded">
                    Live Corner View
                  </div>
                </div>
                <div className="pt-2 px-1">
                  <p className="font-script text-lg text-[#302019] font-semibold">
                    Board games, fresh brews & friendly banter
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Scrapbook Note Card */}
            <ScrollReveal animation="fade-up" delay={0.45}>
              <div className="p-6 rounded-2xl bg-[#3D2920] border border-[#E4D6C2]/20 text-[#F7F1E7] shadow-lg">
                <div className="flex items-center space-x-2 text-[#D49A3D] text-xs uppercase font-bold tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Flagship Culture</span>
                </div>
                <p className="text-sm text-[#E4D6C2]/90 leading-relaxed font-normal">
                  "No one rushes you to vacate the table when your cup is empty. Order another cutting chai, challenge a friend to Jenga, and let the conversation flow."
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>

        {/* Four Experience Pillars with Staggered Scroll Animation */}
        <StaggerContainer
          staggerDelay={0.14}
          delay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-[#E4D6C2]/20"
        >
          
          {/* Pillar 1 */}
          <StaggerItem animation="fade-up">
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(185, 80, 50, 0.45)' }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl bg-[#3D2920]/60 border border-[#E4D6C2]/15 h-full transition-shadow hover:shadow-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-[#B95032]/20 text-[#B95032] flex items-center justify-center mb-4">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F7F1E7] mb-2">
                Board Games on Tables
              </h3>
              <p className="text-xs sm:text-sm text-[#E4D6C2]/75 leading-relaxed">
                Jenga towers, Scrabble, Uno cards, and board games free for all guests at our R.S. Puram flagship.
              </p>
            </motion.div>
          </StaggerItem>

          {/* Pillar 2 */}
          <StaggerItem animation="fade-up">
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(212, 154, 61, 0.45)' }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl bg-[#3D2920]/60 border border-[#E4D6C2]/15 h-full transition-shadow hover:shadow-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center mb-4">
                <Lamp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F7F1E7] mb-2">
                Warm Cafe Ambiance
              </h3>
              <p className="text-xs sm:text-sm text-[#E4D6C2]/75 leading-relaxed">
                Mellow incandescent hanging lights, cozy wooden benches, clay pottery accents, and soothing playlists.
              </p>
            </motion.div>
          </StaggerItem>

          {/* Pillar 3 */}
          <StaggerItem animation="fade-up">
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(114, 128, 100, 0.45)' }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl bg-[#3D2920]/60 border border-[#E4D6C2]/15 h-full transition-shadow hover:shadow-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-[#728064]/20 text-[#728064] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F7F1E7] mb-2">
                All Are Welcome
              </h3>
              <p className="text-xs sm:text-sm text-[#E4D6C2]/75 leading-relaxed">
                A welcoming corner for college students on a budget, colleagues after office, and family chai hours.
              </p>
            </motion.div>
          </StaggerItem>

          {/* Pillar 4 */}
          <StaggerItem animation="fade-up">
            <motion.div 
              whileHover={{ y: -6, borderColor: 'rgba(247, 241, 231, 0.45)' }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl bg-[#3D2920]/60 border border-[#E4D6C2]/15 h-full transition-shadow hover:shadow-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAF6EF]/20 text-[#FAF6EF] flex items-center justify-center mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F7F1E7] mb-2">
                Pocket-Friendly
              </h3>
              <p className="text-xs sm:text-sm text-[#E4D6C2]/75 leading-relaxed">
                Full comfort, hearty portions, and generous hospitality for two at roughly ₹200–₹400.
              </p>
            </motion.div>
          </StaggerItem>

        </StaggerContainer>

      </div>
    </section>
  );
};
