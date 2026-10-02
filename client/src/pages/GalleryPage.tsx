import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../../../shared/types.js';
import { LightboxModal } from '../components/LightboxModal.js';
import { Camera, Expand } from 'lucide-react';

interface GalleryPageProps {
  items: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['all', 'Food', 'Ambiance', 'Kitchen', 'Heritage'];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="py-16 lg:py-24 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Chronicle</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F131C] tracking-tight">
            Valarmathi Mess Gallery
          </h1>
          <div className="font-tamil text-lg text-[#C8861B] font-semibold mt-1">
            புகைப்படங்கள் & நினைவுகள்
          </div>
          <p className="text-xs sm:text-base text-[#6B6661] mt-3 font-light">
            A window into our food preparations, dining room energy, and the unpretentious warmth of Race Course mess life.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center space-x-2 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#4F131C] text-white shadow'
                  : 'bg-[#F4EFE7] text-[#554E48] hover:bg-[#EFE8DD]'
              }`}
            >
              {cat === 'all' ? 'All Images' : cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid with smooth category layout transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded overflow-hidden cursor-pointer border border-[#6B1D28]/15 shadow-sm hover:shadow-2xl transition-all duration-500 bg-[#E8E1D5] flex flex-col"
                data-cursor="VIEW"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Expand Indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/25 backdrop-blur-md text-white">
                    <Expand className="w-4 h-4" />
                  </div>
                </div>

                {/* Caption Card */}
                <div className="p-4 bg-[#FAF7F2] border-t border-[#6B1D28]/10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#4F131C] group-hover:text-[#C8861B] transition-colors">
                      {item.title}
                    </h3>
                    {item.tamil_title && (
                      <span className="font-tamil text-xs text-[#C8861B] font-semibold block mt-0.5">
                        {item.tamil_title}
                      </span>
                    )}
                    {item.description && (
                      <p className="text-xs text-[#554E48] font-light mt-1.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#6B1D28]/10 text-[10px] text-[#7A736C] uppercase tracking-wider font-medium flex justify-between items-center">
                    <span>Valarmathi Archive</span>
                    <span className="text-[#C8861B]">Click to Enlarge</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
          }
        }}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
          }
        }}
      />
    </div>
  );
};
