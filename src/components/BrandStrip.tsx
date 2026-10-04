import React from 'react';

export const BrandStrip: React.FC = () => {
  const items = [
    'Kulhad Chai',
    'Desi Comfort',
    'Freshly Prepared',
    'Conversations Welcome',
    '100% Pure Vegetarian',
    'Jain Options On Request',
    'Zero Artificial Colours',
    'Pocket-Friendly',
  ];

  return (
    <section 
      className="border-y border-[#E4D6C2] bg-[#FAF6EF] py-3.5 overflow-x-auto scrollbar-none" 
      aria-label="Brand philosophy"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-w-max gap-6 text-[#302019]/80 font-medium">
          {items.map((item, index) => (
            <React.Fragment key={item}>
              <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B95032]" />
                <span>{item}</span>
              </div>
              {index < items.length - 1 && (
                <span className="text-[#8C7E74]/30 text-sm select-none">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
