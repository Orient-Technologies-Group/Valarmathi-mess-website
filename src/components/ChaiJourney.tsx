import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Info, Eye } from 'lucide-react';
import { MENU_ITEMS, type MenuItem } from '../data/tapriwalaData';
import { DishDetailModal } from './DishDetailModal';

interface ChaiJourneyProps {
  onExploreMenu: () => void;
}

export const ChaiJourney: React.FC<ChaiJourneyProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Link sticky stages to scroll progress over 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Target dish lookups for interactive modals
  const kulhadChaiDish = MENU_ITEMS.find((d) => d.id === 'tapriwala-special-chai') || MENU_ITEMS[0];
  const vadaPavDish = MENU_ITEMS.find((d) => d.id === 'mumbai-vada-pav') || MENU_ITEMS[10];

  // Chapter 1 Progress: [0.00, 0.28]
  // Chapter 2 Progress: [0.33, 0.62]
  // Chapter 3 Progress: [0.68, 1.00]

  // Chapter text opacity & Y transforms
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.26, 0.33], [0, 1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0, 0.12, 0.26, 0.33], [24, 0, 0, -20]);

  const ch2Opacity = useTransform(scrollYProgress, [0.33, 0.42, 0.58, 0.67], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.33, 0.42, 0.58, 0.67], [24, 0, 0, -20]);

  const ch3Opacity = useTransform(scrollYProgress, [0.67, 0.76, 0.95, 1], [0, 1, 1, 1]);
  const ch3Y = useTransform(scrollYProgress, [0.67, 0.76, 0.95, 1], [24, 0, 0, 0]);

  // Cup transformations across the 3 chapters
  // Enters in Ch1, centers in Ch2, shifts gracefully left and scales down in Ch3 to make room for snack
  const cupScale = useTransform(scrollYProgress, [0, 0.15, 0.62, 0.82], [0.88, 1, 1, 0.88]);
  const cupX = useTransform(scrollYProgress, [0, 0.15, 0.62, 0.85], [0, 0, 0, -85]);

  // Ingredients (Ginger, Mint, Cardamom) entrance in Ch2 and disperse in Ch3
  const ing1Opacity = useTransform(scrollYProgress, [0.32, 0.42, 0.60, 0.68], [0, 1, 1, 0]);
  const ing1X = useTransform(scrollYProgress, [0.32, 0.45, 0.62, 0.70], [-50, 0, 0, -120]);
  const ing1Y = useTransform(scrollYProgress, [0.32, 0.45, 0.62, 0.70], [30, 0, 0, -40]);

  const ing2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.68], [0, 1, 1, 0]);
  const ing2X = useTransform(scrollYProgress, [0.35, 0.48, 0.62, 0.70], [50, 0, 0, 120]);
  const ing2Y = useTransform(scrollYProgress, [0.35, 0.48, 0.62, 0.70], [-30, 0, 0, -60]);

  const ing3Opacity = useTransform(scrollYProgress, [0.38, 0.48, 0.60, 0.68], [0, 1, 1, 0]);
  const ing3Y = useTransform(scrollYProgress, [0.38, 0.50, 0.62, 0.70], [50, 0, 0, 80]);

  // Snack (Vada Pav) entrance in Ch3
  const snackOpacity = useTransform(scrollYProgress, [0.65, 0.78, 1], [0, 1, 1]);
  const snackX = useTransform(scrollYProgress, [0.65, 0.82, 1], [90, 75, 75]);
  const snackScale = useTransform(scrollYProgress, [0.65, 0.82, 1], [0.85, 1, 1]);

  // Active chapter state helper for clickable indicator
  const scrollToChapter = (chapterIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const startY = rect.top + scrollTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    
    // targets: 0 = 0.12, 1 = 0.45, 2 = 0.82
    const targetFraction = chapterIndex === 0 ? 0.08 : chapterIndex === 1 ? 0.45 : 0.84;
    window.scrollTo({
      top: startY + totalHeight * targetFraction,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <section
        id="journey"
        ref={containerRef}
        className="relative bg-[#FAF6EF] text-[#302019] border-b border-[#E4D6C2] lg:min-h-[300vh]"
        aria-label="Journey of a Chai visual scroll sequence"
      >
        {/* Sticky Visual Viewport Stage on Desktop / Clean Normal Flow on Mobile */}
        <div className="lg:sticky lg:top-0 min-h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 z-20">
          
          {/* Top Bar: Section Title & Clickable Chapter Tabs */}
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-16 sm:pt-14 z-30">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#B95032] mb-1">
                <span className="w-6 h-[1.5px] bg-[#B95032]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold">
                  Interactive Ritual
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#302019]">
                Journey of a Chai
              </h2>
            </div>

            {/* Discreet Clickable Chapter Indicators */}
            <div className="flex items-center space-x-2 sm:space-x-3 bg-[#F7F1E7] p-1.5 rounded-full border border-[#E4D6C2] shadow-2xs self-start sm:self-auto">
              {[
                { num: '01', title: 'The Warmth' },
                { num: '02', title: 'The Character' },
                { num: '03', title: 'The Company' }
              ].map((ch, idx) => (
                <button
                  key={ch.num}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer hover:bg-[#FAF6EF] hover:text-[#B95032] flex items-center space-x-1.5"
                  aria-label={`Jump to Chapter ${ch.num}: ${ch.title}`}
                >
                  <span className="font-serif text-[11px] text-[#B95032]">{ch.num}</span>
                  <span className="hidden md:inline text-[11px] text-[#302019]/80 font-medium">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Central Interactive Choreography Canvas */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto relative">
            
            {/* Left: Dynamic Editorial Narrative Layers */}
            <div className="lg:col-span-6 relative min-h-[220px] sm:min-h-[260px] flex items-center">
              
              {/* Chapter 1 Story Panel */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: ch1Opacity, y: ch1Y }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center space-x-2 text-[#8C7E74] text-xs uppercase tracking-widest font-semibold mb-2">
                  <span>Chapter 01</span>
                  <span>·</span>
                  <span className="text-[#B95032]">The Clay & Flame</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#302019] mb-4 leading-[1.15]">
                  “It starts with a little warmth.”
                </h3>
                <p className="text-sm sm:text-base text-[#302019]/80 leading-relaxed max-w-lg mb-4 font-normal">
                  Porous baked earth from Tamil Nadu kilns. Natural clay imbues every brew with a comforting, mineral finish that paper or glass can never replicate.
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDish(kulhadChaiDish)}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#B95032] hover:text-[#993B22] cursor-pointer group"
                  >
                    <span>Tapriwala Special Chai — ₹40</span>
                    <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Chapter 2 Story Panel */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: ch2Opacity, y: ch2Y }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center space-x-2 text-[#8C7E74] text-xs uppercase tracking-widest font-semibold mb-2">
                  <span>Chapter 02</span>
                  <span>·</span>
                  <span className="text-[#D49A3D]">Botanical Balance</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#302019] mb-4 leading-[1.15]">
                  “Then comes the character.”
                </h3>
                <p className="text-sm sm:text-base text-[#302019]/80 leading-relaxed max-w-lg mb-4 font-normal">
                  Crushed mountain ginger for throat warmth, garden-fresh mint for lift, and green cardamom pods pounded by hand right before boiling. Zero extracts. Zero artificial syrups.
                </p>
                <div className="flex items-center space-x-2 text-xs text-[#728064] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100% whole spices & real Assam tea leaves</span>
                </div>
              </motion.div>

              {/* Chapter 3 Story Panel */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: ch3Opacity, y: ch3Y }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="inline-flex items-center space-x-2 text-[#8C7E74] text-xs uppercase tracking-widest font-semibold mb-2">
                  <span>Chapter 03</span>
                  <span>·</span>
                  <span className="text-[#B95032]">The Desi Duet</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#302019] mb-4 leading-[1.15]">
                  “Best enjoyed with good company.”
                </h3>
                <p className="text-sm sm:text-base text-[#302019]/80 leading-relaxed max-w-lg mb-5 font-normal">
                  Chai belongs with something hot from the griddle. A golden Mumbai Vada Pav spiced with dry red thecha chutney or a crisp grilled cheese toast turns an ordinary tea break into a memorable afternoon.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDish(vadaPavDish)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#B95032] hover:bg-[#993B22] text-[#FAF6EF] text-xs uppercase tracking-wider font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <span>View Vada Pav Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onExploreMenu}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#FAF6EF] hover:bg-[#E4D6C2]/40 text-[#302019] border border-[#E4D6C2] text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    <span>Full 30+ Menu</span>
                  </button>
                </div>
              </motion.div>

            </div>

            {/* Right: Visual Stage with Choreographed Stage Components */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[340px] sm:min-h-[420px]">
              
              {/* Central Kulhad Cup Frame */}
              <motion.div
                style={shouldReduceMotion ? {} : { scale: cupScale, x: cupX }}
                className="relative z-20 w-56 sm:w-72 md:w-80 aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF] bg-[#302019]/10 cursor-pointer group"
                onClick={() => setSelectedDish(kulhadChaiDish)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(kulhadChaiDish); } }}
                aria-label="Inspect Tapriwala Special Kulhad Chai"
              >
                <img
                  src="/images/kulhad-chai.jpg"
                  alt="Special Kulhad Chai brewed in earthen clay"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Dish Badge on Cup */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF6EF]">
                  <div>
                    <span className="font-serif text-sm sm:text-base font-bold block leading-tight">
                      Special Kulhad Chai
                    </span>
                    <span className="text-[11px] text-[#D49A3D] font-bold">
                      ₹40 · Tapri Icon
                    </span>
                  </div>
                  <div className="p-1.5 rounded-full bg-[#FAF6EF]/90 text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#FAF6EF] transition-colors shadow-xs">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>

              {/* Chapter 2 Ingredients: Cutout & Framed Botanical Cards */}
              
              {/* Ingredient 1: Fresh Ginger Root */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1 } : { opacity: ing1Opacity, x: ing1X, y: ing1Y }}
                className="absolute z-15 -top-4 -left-2 sm:-left-8 bg-[#FAF6EF] p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E4D6C2] flex items-center space-x-2.5 pointer-events-none"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D49A3D]/15 flex items-center justify-center text-xl shrink-0">
                  🫚
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#D49A3D] block">
                    Ingredient 01
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#302019]">
                    Crushed Ginger
                  </span>
                </div>
              </motion.div>

              {/* Ingredient 2: Fresh Mint Leaves */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1 } : { opacity: ing2Opacity, x: ing2X, y: ing2Y }}
                className="absolute z-15 top-8 -right-2 sm:-right-8 bg-[#FAF6EF] p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E4D6C2] flex items-center space-x-2.5 pointer-events-none"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#728064]/20 flex items-center justify-center text-xl shrink-0">
                  🌿
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#728064] block">
                    Ingredient 02
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#302019]">
                    Fresh Pudina (Mint)
                  </span>
                </div>
              </motion.div>

              {/* Ingredient 3: Green Cardamom (Elaichi) */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1 } : { opacity: ing3Opacity, y: ing3Y }}
                className="absolute z-15 -bottom-4 right-4 sm:right-10 bg-[#FAF6EF] p-2.5 sm:p-3 rounded-2xl shadow-xl border border-[#E4D6C2] flex items-center space-x-2.5 pointer-events-none"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#B95032]/15 flex items-center justify-center text-xl shrink-0">
                  ✨
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#B95032] block">
                    Ingredient 03
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#302019]">
                    Hand-Crushed Elaichi
                  </span>
                </div>
              </motion.div>

              {/* Chapter 3 Pairing: Street Food Entrance (Mumbai Vada Pav) */}
              <motion.div
                style={shouldReduceMotion ? { opacity: 1 } : { opacity: snackOpacity, x: snackX, scale: snackScale }}
                className="absolute z-30 w-48 sm:w-60 md:w-64 aspect-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF] bg-[#302019]/10 cursor-pointer group"
                onClick={() => setSelectedDish(vadaPavDish)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDish(vadaPavDish); } }}
                aria-label="Inspect Mumbai Vada Pav"
              >
                <img
                  src="/images/vada-pav.jpg"
                  alt="Crispy hot Mumbai Vada Pav with dry garlic thecha"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Pairing Badge */}
                <div className="absolute top-3 left-3 bg-[#B95032] text-[#FAF6EF] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                  The Chai Companion
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FAF6EF]">
                  <div>
                    <span className="font-serif text-sm sm:text-base font-bold block leading-tight">
                      Mumbai Vada Pav
                    </span>
                    <span className="text-[11px] text-[#D49A3D] font-bold">
                      ₹60 · With Fried Chilli
                    </span>
                  </div>
                  <div className="p-1.5 rounded-full bg-[#FAF6EF]/90 text-[#302019] group-hover:bg-[#B95032] group-hover:text-[#FAF6EF] transition-colors shadow-xs">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

          {/* Bottom Progress Bar & Scroll Cue */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#E4D6C2]/60 text-xs text-[#8C7E74]">
            <span className="font-medium hidden sm:inline">
              Scroll down to watch ingredients & snacks assemble
            </span>
            <div className="flex items-center space-x-2 mx-auto sm:mx-0">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B95032]">
                Ritual Timeline
              </span>
              <div className="w-32 sm:w-48 h-1.5 bg-[#E4D6C2] rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress }}
                  className="h-full bg-gradient-to-r from-[#B95032] via-[#D49A3D] to-[#B95032] origin-left"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Accessible Interactive Dish Modal for Canvas Items */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onViewFullMenu={onExploreMenu}
      />
    </>
  );
};
