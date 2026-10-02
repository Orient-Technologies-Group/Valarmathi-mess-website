import React from 'react';

export const BananaLeafTransition: React.FC = () => {
  return (
    <div className="relative -mt-1 z-20 overflow-hidden select-none" aria-hidden="true">
      {/* Seamless Dark-to-Ivory Architectural Transition */}
      <div className="relative bg-gradient-to-b from-[#1C100B] via-[#2D1810] to-[#FAF7F2] pt-8 pb-4">
        {/* Subtle Warm Amber Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(200,134,27,0.18),transparent_70%)] pointer-events-none" />

        {/* Traditional Architectural Curved Silhouette */}
        <div className="relative w-full">
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 text-[#FAF7F2] drop-shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
          >
            <path
              d="M0,24 C320,60 1120,60 1440,24 L1440,56 L0,56 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Central Heritage Brass Insignia Seal */}
        <div className="relative z-10 -mt-6 sm:-mt-8 flex items-center justify-center px-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Left Brass Line */}
            <div className="hidden sm:flex items-center space-x-1.5 opacity-60">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C8861B]" />
              <span className="text-[#C8861B] text-[10px]">✦</span>
            </div>

            {/* Medallion */}
            <div className="flex items-center space-x-2.5 sm:space-x-3 bg-[#FAF7F2] px-5 sm:px-6 py-2 rounded-full border border-[#C8861B]/40 shadow-lg backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#C8861B] shadow-[0_0_8px_rgba(200,134,27,0.6)]" />
              <span className="font-tamil text-xs sm:text-sm font-bold text-[#4F131C] tracking-wide">
                வளர்மதி உணவகம் • 1986
              </span>
              <span className="text-[#C8861B]/40 text-xs">|</span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#C8861B]">
                Kongunadu Heritage
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C8861B] shadow-[0_0_8px_rgba(200,134,27,0.6)]" />
            </div>

            {/* Right Brass Line */}
            <div className="hidden sm:flex items-center space-x-1.5 opacity-60">
              <span className="text-[#C8861B] text-[10px]">✦</span>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C8861B]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

