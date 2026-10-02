import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryItem } from '../../../shared/types.js';
import { LightboxModal } from './LightboxModal.js';
import { Camera, ArrowRight, Expand } from 'lucide-react';

interface EditorialGalleryPreviewProps {
  items: GalleryItem[];
  onViewAll: () => void;
}

export const EditorialGalleryPreview: React.FC<EditorialGalleryPreviewProps> = ({
  items,
  onViewAll,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayItems = items.slice(0, 6);

  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] border-b border-[#6B1D28]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Glimpse Inside</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4F131C] tracking-tight">
              Life at Valarmathi Mess
            </h2>
            <div className="font-tamil text-base text-[#C8861B] font-medium mt-1">
              புகைப்படத் தொகுப்பு
            </div>
          </div>

          <button
            onClick={() => {
              onViewAll();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#4F131C] hover:text-[#C8861B] transition-colors group"
          >
            <span>View Full Gallery ({items.length} Photos)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Asymmetric Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative h-80 sm:h-96 rounded overflow-hidden cursor-pointer border border-[#6B1D28]/15 shadow-sm hover:shadow-2xl transition-all duration-500 bg-[#E8E1D5]"
              data-cursor="VIEW"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-65 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded border border-white/20">
                  {item.category}
                </span>
              </div>

              {/* Expand Indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                <Expand className="w-4 h-4" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#E09E2B] transition-colors leading-tight">
                  {item.title}
                </h3>
                {item.tamil_title && (
                  <span className="font-tamil text-xs text-[#E09E2B] block mt-0.5 font-medium">
                    {item.tamil_title}
                  </span>
                )}
                {item.description && (
                  <p className="text-xs text-white/75 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={displayItems}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % displayItems.length);
          }
        }}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + displayItems.length) % displayItems.length);
          }
        }}
      />
    </section>
  );
};
