import React, { useRef, useState } from 'react';
import { MenuItem } from '../../../shared/types.js';
import { formatPrice } from '../utils/helpers.js';
import { ArrowRight, Flame, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface SignatureDishesProps {
  items: MenuItem[];
  onViewMenu: () => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ items, onViewMenu }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Top signature items (fallback to first 6 if is_featured not populated)
  const displayItems =
    items.length > 0
      ? items.filter((item) => item.is_featured === 1).slice(0, 6)
      : [];

  // Smooth button scroll handler
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mouse drag-to-scroll handlers (allows swiping with mouse inside the section)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F7F2EB] border-b border-[#6B1D28]/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(200,134,27,0.04)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Left/Right Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Cornerstone Recipes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4F131C] tracking-tight">
              Valarmathi Signature Dishes
            </h2>
            <div className="font-tamil text-sm sm:text-base text-[#C8861B] font-semibold mt-1">
              பாரம்பரிய சிறப்பு உணவுகள் • தலைமுறை சுவை
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Full Menu CTA */}
            <button
              onClick={() => {
                onViewMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#4F131C] hover:text-[#C8861B] transition-colors group mr-2"
            >
              <span>Explore Complete Menu (30+ Dishes)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Left / Right Carousel Arrow Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll dishes left"
                className="w-10 h-10 rounded-full bg-white border border-[#6B1D28]/15 hover:border-[#C8861B] hover:bg-[#FAF7F2] text-[#4F131C] flex items-center justify-center shadow-xs transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll dishes right"
                className="w-10 h-10 rounded-full bg-white border border-[#6B1D28]/15 hover:border-[#C8861B] hover:bg-[#FAF7F2] text-[#4F131C] flex items-center justify-center shadow-xs transition-all active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Free-flowing Horizontal Carousel (Normal Vertical Page Scroll Preserved) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex space-x-6 overflow-x-auto scroll-smooth pb-6 pt-2 snap-x snap-mandatory scrollbar-none select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {displayItems.map((item, idx) => (
            <div
              key={item.id}
              className="w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start bg-[#FAF7F2] rounded-xl border border-[#6B1D28]/15 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Dish Photograph */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#E8E1D5]">
                <img
                  src={
                    item.image_url ||
                    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={item.name}
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-90 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span
                    className={
                      item.is_veg
                        ? 'veg-badge bg-white/95 p-0.5 rounded shadow'
                        : 'nonveg-badge bg-white/95 p-0.5 rounded shadow'
                    }
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C8861B] text-white px-2.5 py-0.5 rounded shadow">
                    #{idx + 1} Signature
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-md ${
                      item.is_available_today === 1
                        ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-400/30'
                        : 'bg-rose-950/80 text-rose-200 border border-rose-400/30'
                    }`}
                  >
                    {item.is_available_today === 1 ? 'Available Today' : 'Sold Out'}
                  </span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-3 right-3">
                  <span className="font-serif text-2xl font-bold text-white bg-[#4F131C]/95 px-3.5 py-1 rounded-md shadow-lg border border-white/10">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              {/* Dish Description & Authentic Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#4F131C] group-hover:text-[#6B1D28] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  {item.tamil_name && (
                    <div className="font-tamil text-sm text-[#C8861B] font-semibold mt-1 mb-2">
                      {item.tamil_name}
                    </div>
                  )}
                  <p className="text-xs text-[#554E48] font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer: Clear attributes and direct action */}
                <div className="pt-4 mt-4 border-t border-[#6B1D28]/10 flex items-center justify-between text-xs text-[#7A736C]">
                  <div className="flex items-center space-x-1.5">
                    {item.is_spicy === 1 ? (
                      <>
                        <span className="flex text-rose-600">
                          {Array.from({ length: item.spice_level || 1 }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-rose-600" />
                          ))}
                        </span>
                        <span className="text-[10px] font-semibold text-rose-700">
                          Kongu Heat
                        </span>
                      </>
                    ) : (
                      <span className="text-[10px] text-[#7A736C] font-medium">Mild & Fragrant</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      onViewMenu();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#4F131C] hover:text-[#C8861B] transition-colors"
                  >
                    <span>View in Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Final CTA Card on Track */}
          <div className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-[#4F131C] rounded-xl border border-[#E09E2B]/40 p-8 flex flex-col justify-center items-center text-center shadow-xl text-[#FAF7F2]">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2]/10 border border-[#E09E2B]/40 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#E09E2B]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Hungry for More?
            </h3>
            <p className="text-xs text-[#FAF7F2]/80 font-light mb-6 leading-relaxed">
              Explore our full daily menu with over 30+ regional Kongu mutton, chicken, and banana leaf meals.
            </p>
            <button
              onClick={() => {
                onViewMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-lg bg-[#C8861B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#E09E2B] shadow-md transition-colors"
            >
              View Full Menu
            </button>
          </div>
        </div>

        {/* Intuitive Touch/Swipe Indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#7A736C] px-1">
          <span className="text-[11px] font-medium">
            ← Drag or click arrows to explore dishes →
          </span>
          <span className="text-[11px] font-semibold text-[#4F131C]">
            Showing 6 Signature Specialties
          </span>
        </div>
      </div>
    </section>
  );
};
