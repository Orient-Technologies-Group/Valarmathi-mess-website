import React from 'react';
import { Coffee, MapPin } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside 
      aria-label="Quick mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#FAF6EF]/95 backdrop-blur-md border-t border-[#E4D6C2] p-2.5 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => handleScrollTo('#menu')}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#B95032] active:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm"
        >
          <Coffee className="w-4 h-4" />
          <span>Explore Menu</span>
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo('#outlets')}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#FAF6EF] active:bg-[#E4D6C2]/40 text-[#302019] border border-[#8C7E74]/40 text-xs uppercase tracking-wider font-semibold rounded-lg shadow-xs"
        >
          <MapPin className="w-4 h-4 text-[#B95032]" />
          <span>Find Outlets</span>
        </button>
      </div>
    </aside>
  );
};
