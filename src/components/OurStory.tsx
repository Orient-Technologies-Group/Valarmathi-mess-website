import React from 'react';
import { Leaf, Sparkles, ShieldCheck, HeartHandshake, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND_PROMISES } from '../data/tapriwalaData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const OurStory: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'pure-veg':
        return <Leaf className="w-5 h-5 text-[#728064]" />;
      case 'jain-options':
        return <Sparkles className="w-5 h-5 text-[#B95032]" />;
      case 'no-preservatives':
        return <ShieldCheck className="w-5 h-5 text-[#D49A3D]" />;
      case 'pocket-friendly':
        return <HeartHandshake className="w-5 h-5 text-[#302019]" />;
      default:
        return <Coffee className="w-5 h-5 text-[#B95032]" />;
    }
  };

  return (
    <section id="story" className="py-20 lg:py-28 bg-[#F7F1E7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text & Promises with ScrollReveal */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Section Tag */}
            <ScrollReveal animation="fade-right" delay={0.1}>
              <div className="flex items-center space-x-2 text-[#B95032] mb-4">
                <span className="w-8 h-[1px] bg-[#B95032]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                  Our Story & Philosophy
                </span>
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal animation="fade-up" delay={0.2}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight leading-[1.15] mb-6">
                Your familiar tapri,{' '}
                <span className="italic font-normal text-[#B95032]">reimagined.</span>
              </h2>
            </ScrollReveal>

            {/* Narrative copy */}
            <ScrollReveal animation="fade-up" delay={0.3}>
              <p className="text-base sm:text-lg text-[#302019]/80 leading-relaxed font-normal mb-10 max-w-2xl">
                Tapriwala brings the heart of an Indian tea stall into a warm, contemporary cafe. Come for a freshly brewed chai, stay for comforting street food and conversations that deserve another cup. We celebrate the slow ritual of the tea break — unhurried, heartfelt, and served with a smile.
              </p>
            </ScrollReveal>

            {/* Four Beautiful Promises: Staggered Scroll Entrance */}
            <div className="border-t border-[#E4D6C2] pt-8">
              <ScrollReveal animation="fade-up" delay={0.35}>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#8C7E74] mb-6">
                  Our Kitchen Standards
                </h3>
              </ScrollReveal>

              <StaggerContainer
                staggerDelay={0.15}
                delay={0.1}
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8"
              >
                {BRAND_PROMISES.map((promise) => (
                  <StaggerItem key={promise.id} animation="fade-up">
                    <div className="flex items-start space-x-4 group p-2 rounded-xl transition-all duration-300 hover:bg-[#FAF6EF]/60">
                      <div className="p-2.5 rounded-lg bg-[#FAF6EF] border border-[#E4D6C2] group-hover:border-[#B95032] group-hover:scale-105 transition-all shadow-2xs shrink-0">
                        {getIcon(promise.id)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-serif text-base font-semibold text-[#302019] group-hover:text-[#B95032] transition-colors">
                            {promise.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#8C7E74] leading-relaxed">
                          {promise.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

          </div>

          {/* Right: Rich Atmospheric Photo & Floating Badge with Parallax Tilt */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal animation="zoom-in" delay={0.25} duration={0.85}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Primary Photo Frame */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF] bg-[#302019]/10 aspect-4/5 group"
                >
                  <img
                    src="/images/bombay-toast.jpg"
                    alt="Bombay Masala Toast served with hot cutting chai on wooden table"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Overlay Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Caption on image */}
                  <div className="absolute bottom-5 left-5 right-5 text-[#F7F1E7]">
                    <p className="font-serif text-lg font-bold leading-tight mb-1">
                      Freshly toasted street bites & cutting sips
                    </p>
                    <p className="text-xs text-[#E4D6C2]/90">
                      Handcrafted daily with fresh chutneys and house spice masalas
                    </p>
                  </div>
                </motion.div>

                {/* Secondary Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-[#FAF6EF] p-4 sm:p-5 rounded-xl border border-[#E4D6C2] shadow-xl max-w-[240px] hidden sm:block"
                >
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#728064]" />
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#728064]">
                      Vegetarian Kitchen
                    </span>
                  </div>
                  <p className="text-xs text-[#302019]/80 leading-snug font-medium">
                    "No meat. No artificial colour. Just clean desi warmth."
                  </p>
                </motion.div>

                {/* Decorative Stamp on Top Right */}
                <motion.div
                  initial={{ rotate: -5, scale: 0.9 }}
                  whileInView={{ rotate: 3, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="absolute -top-4 -right-4 bg-[#B95032] text-[#F7F1E7] px-4 py-2 rounded-lg shadow-md font-serif text-xs font-semibold tracking-wide"
                >
                  Est. Coimbatore
                </motion.div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
