import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Flame, Clock, Heart, Users } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Restrained depth parallax on photography
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 0 : -35, shouldReduceMotion ? 0 : 35]);
  const secondaryParallaxY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 0 : 25, shouldReduceMotion ? 0 : -25]);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-36 bg-[#FAF7F2] border-b border-[#6B1D28]/10 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Parallax Depth Photography Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main Image with restrained inner parallax */}
              <div className="rounded overflow-hidden border border-[#6B1D28]/15 shadow-2xl bg-[#E8E1D5] h-[400px] sm:h-[480px]">
                <motion.img
                  style={{ y: photoParallaxY, scale: 1.1 }}
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Busy authentic atmosphere at Valarmathi Mess in Coimbatore"
                  className="w-full h-full object-cover will-change-transform filter brightness-[0.92]"
                  loading="lazy"
                />
              </div>

              {/* Overlaid secondary authentic detail with counter parallax */}
              <motion.div
                style={{ y: secondaryParallaxY }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-52 sm:w-64 rounded overflow-hidden border-4 border-white shadow-2xl bg-[#F4EFE7] hidden sm:block will-change-transform z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80"
                  alt="Crispy hot mutton kola urundai"
                  className="w-full h-36 sm:h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-2.5 bg-[#4F131C] text-white text-[11px] font-bold text-center uppercase tracking-widest">
                  Daily Fresh Batches
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase"
            >
              <span className="w-6 h-[1.5px] bg-[#C8861B]" />
              <span>Unpretentious & Alive</span>
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4F131C] leading-[1.12]">
              The Mess Culture. <br />
              <span className="italic font-normal text-[#242220]">
                Where food comes first and pretense is left at the door.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#554E48] font-light leading-relaxed">
              Valarmathi Mess does not pose as a hushed fine-dining salon. We are a bustling, vibrant South Indian
              food sanctuary in the heart of Race Course. From midday onwards, the dining hall buzzes with the
              clatter of brass vessels, the rhythmic beat of kothu parotta spatulas on iron griddles, and the
              intoxicating aroma of country chicken simmering in hot shallot oil.
            </p>

            <p className="text-sm sm:text-base text-[#554E48] font-light leading-relaxed">
              When you take a seat, a fresh green plantain leaf is unrolled before you, sprinkled with water, and
              instantly filled with steaming Ponni rice, piping hot rasam, and choice mutton gravies. Generations of
              Coimbatoreans share the same tables, united solely by an obsession with unforgettable Kongu taste.
            </p>

            {/* Hallmarks grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#6B1D28]/10">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#C8861B]/10 text-[#C8861B] mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F131C]">Hot Off The Iron</h4>
                  <p className="text-xs text-[#6F6B66] mt-0.5 font-light">Tawa-roasted dishes cooked directly upon order.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#C8861B]/10 text-[#C8861B] mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F131C]">Banana Leaf Soul</h4>
                  <p className="text-xs text-[#6F6B66] mt-0.5 font-light">Traditional leaf dining that enhances natural digestion.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#C8861B]/10 text-[#C8861B] mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F131C]">Daily Fresh Prep</h4>
                  <p className="text-xs text-[#6F6B66] mt-0.5 font-light">Zero stored curries; meats butchered fresh daily.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded bg-[#C8861B]/10 text-[#C8861B] mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F131C]">Coimbatore Warmth</h4>
                  <p className="text-xs text-[#6F6B66] mt-0.5 font-light">Welcoming service refined across four decades.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
