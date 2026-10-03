import React from 'react';

export const BrandStrip: React.FC = () => {
  const items = [
    'Kulhad chai',
    'Desi comfort',
    'Freshly prepared',
    'Conversations welcome',
    '100% Pure vegetarian',
    'Jain options on request',
  ];

  return (
    <section 
      className="border-y border-[#E4D6C2] bg-[#FAF6EF] py-4 sm:py-5 overflow-hidden" 
      aria-label="Brand philosophy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-10 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#302019]/80">
          {items.map((item, index) => (
            <React.Fragment key={item}>
              <span className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B95032]/70" />
                <span>{item}</span>
              </span>
              {index < items.length - 1 && (
                <span className="hidden md:inline-block text-[#8C7E74]/40" aria-hidden="true">
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
