import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  tamil_title?: string;
  description: string;
  isVerified: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1986',
    title: 'Founding at Race Course, Coimbatore',
    tamil_title: '1986 — தொடக்கம்',
    description:
      'Valarmathi Mess opens its doors in the CSI Compound on Race Course, Coimbatore, dedicated to honest Kongunadu home-style dining and banana leaf meals.',
    isVerified: true,
  },
  {
    year: '1990s',
    title: 'Pioneering Regional Meat Preparations',
    tamil_title: 'பாரம்பரிய சுவைகள்',
    description:
      'Perfecting the signature dishes that define the mess today: crisp Mutton Kola Urundai, fiery Pallipalayam Chicken, and the iconic tawa Pichu Potta Kozhi.',
    isVerified: true,
  },
  {
    year: '2000s',
    title: 'The Seeraga Samba Biryani Ritual',
    tamil_title: 'சீரக சம்பா பிரியாணி',
    description:
      'Establishing the beloved daily lunch ritual centered around tiny-grain Seeraga Samba mutton biryani and fresh country chicken roasts.',
    isVerified: true,
  },
  {
    year: 'Present',
    title: 'Coimbatore’s Enduring Food Institution',
    tamil_title: 'நிகழ்காலம்',
    description:
      'Continuing the uninterrupted four-decade commitment to uncompromised regional recipes, local ingredients, and generous mess hospitality.',
    isVerified: true,
  },
];

export const HeritageTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Giant 1986 architectural typography slow horizontal drift
  const x1986 = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? '0%' : '10%', shouldReduceMotion ? '0%' : '-18%']
  );

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-36 bg-[#F4EFE7] border-b border-[#6B1D28]/10 relative overflow-hidden select-none"
    >
      {/* Giant Architectural 1986 Typography moving horizontally with scroll */}
      <div
        className="absolute top-12 left-0 right-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <motion.div
          style={{ x: x1986 }}
          className="font-serif text-[28vw] md:text-[22vw] font-bold text-[#4F131C] opacity-[0.06] whitespace-nowrap leading-none select-none tracking-tighter will-change-transform"
        >
          1986
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layered Architectural Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Four Decades of Flavour</span>
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F131C] tracking-tight">
            Rooted Since 1986
          </h2>
          <div className="font-tamil text-base sm:text-lg text-[#C8861B] mt-1 font-medium">
            1986 முதல் தொடரும் கொங்கு பாரம்பரியம்
          </div>
          <p className="text-xs sm:text-base text-[#6B6661] mt-3 font-light max-w-lg mx-auto">
            Founded in Coimbatore and continuously operating with unbroken reverence for ancestral Kongu recipes.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative border-l-2 border-[#C8861B]/40 ml-4 md:ml-32 space-y-12">
          {timelineEvents.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#FAF7F2] border-4 border-[#4F131C] group-hover:border-[#C8861B] transition-colors" />

              {/* Year label for desktop */}
              <div className="md:absolute md:-left-32 md:top-0 md:text-right md:w-24">
                <span className="font-serif text-2xl font-bold text-[#4F131C] tracking-tight group-hover:text-[#C8861B] transition-colors">
                  {item.year}
                </span>
              </div>

              {/* Content Card */}
              <div className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4F131C]">
                    {item.title}
                  </h3>
                  {item.tamil_title && (
                    <span className="font-tamil text-xs font-semibold text-[#C8861B] bg-[#F4EFE7] px-2.5 py-1 rounded">
                      {item.tamil_title}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#554E48] font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center space-x-1.5 text-[11px] text-[#8C847B]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified regional archive detail</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Archival Footnote */}
        <div className="mt-16 text-center p-4 rounded bg-[#FAF7F2]/80 border border-[#6B1D28]/10 max-w-xl mx-auto">
          <p className="text-xs text-[#7A736C] italic font-light">
            Verified historical milestones of Valarmathi Mess at Race Course, Coimbatore.
          </p>
        </div>
      </div>
    </section>
  );
};
