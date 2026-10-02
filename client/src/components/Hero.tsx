import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { RestaurantInfo, OpeningHour } from '../../../shared/types.js';
import { getLiveRestaurantStatus } from '../utils/helpers.js';

interface HeroProps {
  info: RestaurantInfo | null;
  hours: OpeningHour[];
  onNavigate: (route: string) => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ info, hours, onNavigate, onOpenReservation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const status = getLiveRestaurantStatus(hours);

  const headline = info?.hero_headline || 'KONGU FLAVOUR. ROOTED IN TRADITION.';
  const subheadline =
    info?.hero_subheadline ||
    'Coimbatore’s revered regional food institution since 1986. Freshly ground spices, country chicken, and legendary mutton feasts served on fresh banana leaves.';

  // Scroll driven transforms for hero transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, shouldReduceMotion ? 1.05 : 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, shouldReduceMotion ? 1 : 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.7], [1, shouldReduceMotion ? 1 : 0.94]);

  // Split headline for line-by-line reveal
  const headlineParts = headline.includes('.')
    ? headline.split('.').filter(Boolean).map((s) => s.trim() + '.')
    : [headline];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-[98vh] flex items-center justify-center overflow-hidden bg-[#241613]"
    >
      {/* Cinematic Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          y: bgY,
          scale: bgScale,
        }}
      >
        <motion.img
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=2000&q=85"
          alt="Traditional Kongu regional mutton feast at Valarmathi Mess"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12]"
          loading="eager"
        />

        {/* Gradual Settling Dark Overlay */}
        <motion.div
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-t from-[#241613] via-[#241613]/50 to-black/60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(36,22,19,0.7)_100%)]" />
      </motion.div>

      {/* Hero Content (Pushed upward & faded on scroll) */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
        }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center will-change-transform"
      >
        {/* Heritage & Status Pill (Step 3) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-3 mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm shadow-xl"
        >
          <span className="font-tamil text-[#E09E2B] font-semibold tracking-wider">வளர்மதி மெஸ்</span>
          <span className="text-white/40">•</span>
          <span className="tracking-widest uppercase font-semibold text-white/90">
            ESTD. {info?.founded_year || 1986}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-[#E09E2B] flex items-center space-x-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="font-medium text-xs">{status.message}</span>
          </span>
        </motion.div>

        {/* Line-by-Line Headline Reveal (Step 4) */}
        <div className="overflow-hidden mb-6">
          {headlineParts.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.35 + idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF7F2] uppercase leading-[1.08] drop-shadow-lg">
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subheadline (Step 5) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#F4EFE7]/85 font-light leading-relaxed mb-10"
        >
          {subheadline}
        </motion.p>

        {/* Sequential CTA Buttons (Step 6) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            onClick={() => {
              onNavigate('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded bg-[#C8861B] text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest hover:bg-[#E09E2B] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 text-[#FAF7F2] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              onNavigate('visit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded bg-white/10 text-[#FAF7F2] font-semibold text-xs uppercase tracking-widest hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <MapPin className="w-4 h-4 text-[#E09E2B]" />
            <span>Visit Us (Race Course)</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded bg-transparent text-[#FAF7F2]/90 hover:text-white font-medium text-xs tracking-wider underline-offset-8 hover:underline transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#E09E2B]" />
            <span>Enquire / Book Table</span>
          </button>
        </motion.div>

        {/* Verified Landmark Metadata (Step 7) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-12 pt-6 border-t border-white/15 max-w-xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs text-white/70"
        >
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E09E2B]" />
            <span>CSI Compound, 207/A Race Course</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E09E2B]" />
            <span>Daily Lunch & Dinner</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E09E2B]" />
            <span>Banana Leaf Dining</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Indicator (Step 8) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.35 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#E09E2B]/80 mb-1.5">
          Scroll To Taste
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#E09E2B]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
