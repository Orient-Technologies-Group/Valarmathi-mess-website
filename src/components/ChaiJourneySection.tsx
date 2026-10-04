import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Flame, Heart, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { KulhadIllustration, StreetPlateIllustration } from './TapriIllustrations';

interface ChaiJourneySectionProps {
  onExploreMenu: () => void;
}

interface Chapter {
  id: string;
  number: string;
  headline: string;
  subheadline: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  image: string;
  imageAlt: string;
  elements: string[];
  quote: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'chapter-1',
    number: '01',
    headline: 'It starts with a little warmth.',
    subheadline: 'The Earthen Vessel',
    description:
      'Clay dug from riverbeds, turned on ancient potter wheels, and fired in open kilns. The unglazed kulhad breathes: as boiling Assam CTC tea meets porous terracotta, it releases the iconic petrichor aroma (mitti ki khushbu) that metal and paper cups can never replicate.',
    icon: <Flame className="w-5 h-5 text-[#B95032]" />,
    tag: 'Chapter 01 · Origin & Earth',
    image: '/images/kulhad-chai.jpg',
    imageAlt: 'Clay kulhad filled with steaming masala chai on rustic wooden table',
    elements: ['Assam CTC Dust', 'Full-Cream Milk', 'Natural Clay Earthenware', 'Clay Baking'],
    quote: '"The clay doesn’t just hold the tea; it transforms the flavour with every sip."'
  },
  {
    id: 'chapter-2',
    number: '02',
    headline: 'Then comes the character.',
    subheadline: 'The Hand-Pounded Spice Blend',
    description:
      'No pre-packaged powders or artificial essence. Fresh ginger roots are hand-crushed on marble mortar blocks just before boiling; fragrant green cardamom pods are bruised to release essential oils; fresh garden mint leaves are torn by hand for a refreshing top note.',
    icon: <Sparkles className="w-5 h-5 text-[#D49A3D]" />,
    tag: 'Chapter 02 · Spice Craft',
    image: '/images/cold-cocoa.jpg', // will use high-res tea/spice framing
    imageAlt: 'Rich spiced brew infusion and handcrafted ingredients',
    elements: ['Fresh Crushed Ginger', 'Green Cardamom Pods', 'Garden Fresh Mint', 'Slow Simmered Boil'],
    quote: '"Brewed on a rolling simmer, coaxing deep aromas without any harsh bitterness."'
  },
  {
    id: 'chapter-3',
    number: '03',
    headline: 'Best enjoyed with good company.',
    subheadline: 'The Desi Street Pairing',
    description:
      'Chai in India is never a solo pursuit—it is an invitation. Settle in with a golden, chutney-swirled Bombay Masala Toast, a crisp butter-toasted Vada Pav, and a game of Jenga. In our cafes across Coimbatore, the table is always yours for as long as conversations last.',
    icon: <Users className="w-5 h-5 text-[#728064]" />,
    tag: 'Chapter 03 · Table & Company',
    image: '/images/bombay-toast.jpg',
    imageAlt: 'Bombay Masala Toast served hot with kulhad chai',
    elements: ['Bombay Masala Toast', 'Crisp Bun Maska', 'Board Games on Tables', 'Unhurried Hours'],
    quote: '"No one rushes you to vacate the table when your cup is empty."'
  }
];

export const ChaiJourneySection: React.FC<ChaiJourneySectionProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth background progress line scale
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  // Subtle scroll parallax for the background lettering
  const bgTextY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="py-24 lg:py-32 bg-paper-grain relative overflow-hidden border-b border-[#E4D6C2]"
      aria-label="The Journey of a Chai"
    >
      {/* Background Art Direction: Isolated, Pointer-Events-None Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Background Typography: EK AUR CHAI? - readable, centered, and crisp */}
        <motion.div
          style={{ y: bgTextY }}
          className="absolute top-12 left-0 right-0 flex justify-center will-change-transform"
        >
          <span className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[0.2em] text-[#302019]/[0.07] uppercase select-none text-center">
            EK AUR CHAI?
          </span>
        </motion.div>

        {/* Large Kulhad Outline floating gently on top-right */}
        <div className="absolute top-16 -right-12 text-[#B95032]/[0.05] transform rotate-6 scale-150 lg:scale-[2]">
          <KulhadIllustration className="w-56 h-64" />
        </div>

        {/* Street Plate / Saucer Sketch on bottom-left */}
        <div className="absolute bottom-20 -left-10 text-[#8C7E74]/[0.07] transform -rotate-6 scale-125 lg:scale-150">
          <StreetPlateIllustration className="w-56 h-36" />
        </div>

        {/* Fine editorial station imprint */}
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.3em] uppercase text-[#302019]/[0.2] font-mono">
          TAPRIWALA KITCHEN CHRONICLES
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 lg:mb-28">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
              <span className="w-8 h-[1px] bg-[#B95032]" />
              <span className="text-xs uppercase tracking-[0.22em] font-semibold">
                Anatomy of an Authentic Brew
              </span>
              <span className="w-8 h-[1px] bg-[#B95032]" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#302019] tracking-tight mb-6">
              The Journey of a{' '}
              <span className="italic font-normal text-[#B95032]">
                Kulhad Chai.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-base sm:text-lg text-[#302019]/75 font-normal leading-relaxed max-w-2xl mx-auto">
              How clay, spice, and companionship come together in every single cup we brew at Tapriwala.
            </p>
          </ScrollReveal>
        </div>

        {/* Chapters Flow (Natural document scroll with connected timeline) */}
        <div className="relative">
          {/* Vertical Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 -translate-x-1/2 w-0.5 bg-[#E4D6C2]/60 z-0" aria-hidden="true">
            <motion.div
              style={{ scaleY: lineProgress }}
              className="w-full h-full bg-gradient-to-b from-[#B95032] via-[#D49A3D] to-[#728064] origin-top will-change-transform"
            />
          </div>

          <div className="space-y-24 lg:space-y-36 relative z-10">
            {CHAPTERS.map((chapter, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={chapter.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Text Story Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? 'lg:pr-8' : 'lg:order-2 lg:pl-8'
                    }`}
                  >
                    <ScrollReveal animation={isEven ? 'fade-right' : 'fade-left'} delay={0.1}>
                      {/* Step Badge */}
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E7] border border-[#E4D6C2] text-xs font-semibold text-[#B95032] mb-5 shadow-2xs">
                        {chapter.icon}
                        <span className="tracking-wide uppercase text-[11px]">{chapter.tag}</span>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.15}>
                      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight leading-[1.12] mb-3">
                        {chapter.headline}
                      </h3>
                      <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#D49A3D] block mb-5">
                        {chapter.subheadline}
                      </span>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={0.25}>
                      <p className="text-base sm:text-lg text-[#302019]/80 leading-relaxed font-normal mb-6">
                        {chapter.description}
                      </p>
                    </ScrollReveal>

                    {/* Ingredient / Process Pills */}
                    <ScrollReveal animation="fade-up" delay={0.3}>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {chapter.elements.map((elem) => (
                          <span
                            key={elem}
                            className="text-xs px-3 py-1.5 rounded-lg bg-[#FAF6EF] border border-[#E4D6C2] text-[#302019]/80 font-medium"
                          >
                            ✦ {elem}
                          </span>
                        ))}
                      </div>
                    </ScrollReveal>

                    {/* Editorial Quote Callout */}
                    <ScrollReveal animation="fade-up" delay={0.35}>
                      <div className="p-4 rounded-xl bg-[#F7F1E7] border-l-4 border-[#B95032] italic text-xs sm:text-sm text-[#302019]/85">
                        {chapter.quote}
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Photography & Visual Column */}
                  <div
                    className={`lg:col-span-6 relative flex justify-center ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <ScrollReveal animation="zoom-in" delay={0.2} duration={0.7} className="w-full max-w-lg">
                      <motion.div
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF] bg-[#302019]/5 group aspect-4/3 sm:aspect-16/11"
                      >
                        <img
                          src={chapter.image}
                          alt={chapter.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />

                        {/* Warm Vignette Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/75 via-transparent to-transparent pointer-events-none" />

                        {/* Top Large Number Indicator */}
                        <div className="absolute top-4 left-4 bg-[#302019]/80 backdrop-blur-xs text-[#FAF6EF] px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-serif font-bold tracking-wider">
                          Phase {chapter.number}
                        </div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF6EF]">
                          <span className="font-serif italic text-sm text-[#FAF6EF]">
                            {chapter.subheadline}
                          </span>
                          <span className="text-[11px] bg-[#B95032] px-2.5 py-1 rounded text-[#FAF6EF] font-semibold uppercase tracking-wider">
                            Tapriwala Standard
                          </span>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Action Banner */}
        <ScrollReveal animation="fade-up" delay={0.2} className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-2xl bg-[#F7F1E7] border border-[#E4D6C2] shadow-sm max-w-xl mx-auto">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#302019] font-medium">
              <Heart className="w-4 h-4 text-[#B95032] shrink-0" />
              <span>Taste the craft in person at any of our 3 Coimbatore cafes.</span>
            </div>
            <button
              type="button"
              onClick={onExploreMenu}
              className="px-6 py-2.5 bg-[#B95032] hover:bg-[#993B22] text-[#FAF6EF] text-xs uppercase tracking-wider font-semibold rounded-md shadow-sm transition-all cursor-pointer shrink-0 inline-flex items-center space-x-1.5"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
