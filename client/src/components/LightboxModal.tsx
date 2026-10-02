import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../../shared/types.js';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentItem) return null;

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped Left -> Next
      onNext();
    } else if (diff < -50) {
      // Swiped Right -> Prev
      onPrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Header controls */}
      <div
        className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white/80 z-50 bg-gradient-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-widest text-[#E09E2B] font-semibold bg-white/10 px-2.5 py-1 rounded">
            {currentItem.category}
          </span>
          <span className="text-sm text-white/60">
            {currentIndex + 1} of {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons for desktop */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors"
        aria-label="Next Image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[82vh] mx-auto px-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentItem.image_url}
          alt={currentItem.title}
          className="max-h-[68vh] w-auto max-w-full object-contain rounded shadow-2xl"
        />

        {/* Caption below image */}
        <div className="mt-4 text-center text-white max-w-2xl px-4">
          <div className="flex items-center justify-center space-x-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
              {currentItem.title}
            </h3>
            {currentItem.tamil_title && (
              <span className="font-tamil text-sm text-[#E09E2B]">
                {currentItem.tamil_title}
              </span>
            )}
          </div>
          {currentItem.description && (
            <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
              {currentItem.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
