import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Flame, Sprout, Soup, Utensils } from 'lucide-react';

interface Stage {
  step: string;
  badge: string;
  title: string;
  tamil_title: string;
  description: string;
  highlight: string;
  image_url: string;
  icon: React.ElementType;
}

const stages: Stage[] = [
  {
    step: '01',
    badge: 'THE SOIL',
    title: 'The Living Red Loam of Kongu',
    tamil_title: 'மண் • நிலத்தின் வளம்',
    description:
      'The foundation of authentic Kongunadu flavour begins in the rich red soil of the western plains. Native chinna vengayam (small shallots) grown in regional soil possess a natural sweetness and delicate pungency that no hybrid onion can replicate.',
    highlight: 'Pure small shallots harvested daily across regional farms.',
    image_url:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    icon: Sprout,
  },
  {
    step: '02',
    badge: 'THE SPICES',
    title: 'Sun-Dried Peppercorns & Native Chilis',
    tamil_title: 'மசாலா • நறுமணச் சுவை',
    description:
      'Kongu cooking rejects heavy store-bought pastes. Instead, whole Tellicherry black peppercorns, sun-dried red chillies, coriander seeds, and cumin are dry-roasted over low heat and hand-pounded to release their essential aromatic oils.',
    highlight: 'Zero artificial colourings; roasted and cracked every morning.',
    image_url:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    icon: Sparkles,
  },
  {
    step: '03',
    badge: 'THE FIRE',
    title: 'Seasoned Iron Tawas & Clay Pots',
    tamil_title: 'நெருப்பு • இரும்பு தவா',
    description:
      'The characteristic mess aroma emerges when fresh meats meet intense heat in heavy cast-iron tawas and clay pots. Cold-pressed gingelly (sesame) oil and country ghee sizzle with curry leaves, creating that legendary charred crispness in our Pichu Potta Kozhi and Chukka.',
    highlight: 'Cooked to order on fire-seasoned heavy iron griddles.',
    image_url:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    icon: Flame,
  },
  {
    step: '04',
    badge: 'THE PLATE',
    title: 'The Plantain Leaf Ritual',
    tamil_title: 'இலை • வாழை இலை விருந்து',
    description:
      'The journey culminates on a freshly cut green banana leaf. Hot Ponni rice, fragrant Seeraga Samba mutton biryani, and simmering salna are poured generously, allowing natural heat to release the wholesome polyphenols of the leaf into every mouthful.',
    highlight: 'Uncompromised Coimbatore hospitality served hot since 1986.',
    image_url:
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    icon: Utensils,
  },
];

export const IngredientJourney: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const currentStage = stages[activeStageIndex];

  return (
    <section className="py-24 lg:py-36 bg-[#241613] text-[#FAF7F2] border-b border-[#6B1D28]/30 relative overflow-hidden">
      {/* Decorative ambient background grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4F131C]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#E09E2B] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Culinary Odyssey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2]">
            From Soil to Plate
          </h2>
          <div className="font-tamil text-base sm:text-lg text-[#E09E2B] font-medium mt-1">
            மண்ணிலிருந்து வாழை இலை வரை
          </div>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/70 font-light mt-3 max-w-lg mx-auto">
            Experience the four sacred phases that elevate humble Kongunadu ingredients into legendary mess feasts.
          </p>
        </div>

        {/* Central Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Stage Selectors (01 - 04) */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-row lg:flex-col justify-between gap-3 overflow-x-auto pb-2 lg:pb-0">
            {stages.map((st, idx) => {
              const isActive = activeStageIndex === idx;
              const IconComp = st.icon;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-4 rounded transition-all duration-300 border flex items-center lg:items-start space-x-3 w-full shrink-0 lg:shrink ${
                    isActive
                      ? 'bg-[#4F131C] border-[#E09E2B]/50 shadow-xl'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded flex items-center justify-center shrink-0 font-serif font-bold text-sm ${
                      isActive ? 'bg-[#E09E2B] text-[#241613]' : 'bg-white/10 text-[#FAF7F2]'
                    }`}
                  >
                    {st.step}
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] font-bold tracking-widest uppercase block text-[#E09E2B]">
                      {st.badge}
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#FAF7F2] line-clamp-1">
                      {st.title.split(' ')[0]} {st.title.split(' ')[1]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: Central Editorial Image with Mask Transition */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded overflow-hidden border border-white/20 shadow-2xl bg-black h-80 sm:h-96 md:h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.step}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                  data-cursor="JOURNEY"
                >
                  <img
                    src={currentStage.image_url}
                    alt={currentStage.title}
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Stage Watermark in corner */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 flex items-center space-x-2">
                    <span className="font-serif font-bold text-lg text-[#E09E2B]">
                      {currentStage.step}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">
                      {currentStage.badge}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Active Stage Editorial Description */}
          <div className="lg:col-span-4 order-3 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#E09E2B] mb-1">
                    Stage {currentStage.step} • {currentStage.badge}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF7F2] leading-tight">
                    {currentStage.title}
                  </h3>
                  <div className="font-tamil text-sm text-[#E09E2B] font-semibold mt-1">
                    {currentStage.tamil_title}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Craft Highlight Pill */}
                <div className="p-3.5 rounded bg-white/5 border border-white/15 text-xs text-[#FAF7F2]/90 flex items-start space-x-2.5">
                  <Sparkles className="w-4 h-4 text-[#E09E2B] shrink-0 mt-0.5" />
                  <span className="font-light italic">{currentStage.highlight}</span>
                </div>

                {/* Progress Navigation Buttons */}
                <div className="pt-2 flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setActiveStageIndex((prev) => (prev + 1) % stages.length)
                    }
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#E09E2B] hover:text-white transition-colors"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-white/40">
                    {activeStageIndex + 1} of {stages.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
