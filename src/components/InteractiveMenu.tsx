import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Coffee, Info, Eye } from 'lucide-react';
import { MENU_ITEMS } from '../data/tapriwalaData';
import type { MenuItem } from '../data/tapriwalaData';
import { DishDetailModal } from './DishDetailModal';

type CategoryFilter = 'All' | 'Chai & Hot Brews' | 'Cold Sips' | 'Street Food & Chaat' | 'Sandwiches & Wraps' | 'Maggi';

export const InteractiveMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jainOnly, setJainOnly] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const categories: CategoryFilter[] = [
    'All',
    'Chai & Hot Brews',
    'Cold Sips',
    'Street Food & Chaat',
    'Sandwiches & Wraps',
    'Maggi',
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Jain check
      if (jainOnly && !item.isJainAvailable) {
        return false;
      }
      // Search query check
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCategory || matchesTags;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, jainOnly]);

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#F7F1E7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
            <span className="w-6 h-[1px] bg-[#B95032]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              Authentic Contemporary Selection
            </span>
            <span className="w-6 h-[1px] bg-[#B95032]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight mb-4">
            What are you craving?
          </h2>
          <p className="text-base text-[#8C7E74]">
            From kadak Assam kulhad brews and thick chilled cocoa to Mumbai vada pav and toasted desi sandwiches.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FAF6EF] p-4 sm:p-5 rounded-2xl border border-[#E4D6C2] shadow-sm mb-10">
          
          {/* Top row: Search and Jain filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E4D6C2]/70">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C7E74] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chai, vada pav, cocoa, sandwich, maggi..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#F7F1E7] border border-[#E4D6C2] rounded-lg text-sm text-[#302019] placeholder-[#8C7E74] focus:outline-none focus:ring-2 focus:ring-[#B95032] focus:border-transparent transition-all"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C7E74] hover:text-[#302019] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Jain Toggle & Stats */}
            <div className="flex items-center space-x-4 justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => setJainOnly(!jainOnly)}
                className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                  jainOnly
                    ? 'bg-[#D49A3D] text-[#302019] border-[#D49A3D] shadow-xs'
                    : 'bg-[#F7F1E7] text-[#8C7E74] hover:text-[#302019] border-[#E4D6C2]'
                }`}
                aria-pressed={jainOnly}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Jain Friendly Only</span>
              </button>

              <span className="text-xs text-[#8C7E74] font-medium hidden md:inline">
                {filteredItems.length} items found
              </span>
            </div>
          </div>

          {/* Bottom row: Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#302019] text-[#F7F1E7] shadow-xs'
                    : 'bg-[#F7F1E7] text-[#302019]/70 hover:text-[#302019] hover:bg-[#E4D6C2]/40 border border-[#E4D6C2]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Presentation: Typeset Cafe Rows & Photo Accents */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6EF] rounded-2xl border border-dashed border-[#E4D6C2] p-8">
            <Coffee className="w-10 h-10 text-[#8C7E74] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#302019] mb-1">
              No matching treats found
            </h3>
            <p className="text-sm text-[#8C7E74] mb-4">
              Try searching for something else like "chai", "pav", "maggi", or clear your filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setJainOnly(false);
              }}
              className="px-4 py-2 bg-[#B95032] text-[#F7F1E7] text-xs font-semibold rounded-md shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDish(dish);
                  }
                }}
                className="group cursor-pointer bg-[#FAF6EF] hover:bg-[#FAF6EF]/90 p-4 sm:p-5 rounded-xl border border-[#E4D6C2] hover:border-[#B95032] transition-all duration-200 hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                aria-label={`View ${dish.name} details`}
              >
                {/* Left: Thumbnail & Name & Description */}
                <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
                  {/* Photo Accent */}
                  {dish.image && (
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden shrink-0 bg-[#302019]/5 border border-[#E4D6C2] relative">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#302019] group-hover:text-[#B95032] transition-colors">
                        {dish.name}
                      </h3>
                      {dish.isSignature && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#B95032]/10 text-[#B95032] border border-[#B95032]/20">
                          Signature
                        </span>
                      )}
                      {dish.isJainAvailable && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#728064]/10 text-[#728064] border border-[#728064]/20">
                          Jain Option
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#8C7E74] leading-relaxed max-w-2xl line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Right: Price & Quick View Cue */}
                <div className="flex items-center justify-between sm:justify-end space-x-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E4D6C2]/40 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#B95032]">
                      {dish.price}
                    </span>
                    {dish.priceNote && (
                      <p className="text-[10px] text-[#8C7E74] font-medium hidden lg:block">
                        {dish.priceNote}
                      </p>
                    )}
                  </div>

                  <div className="p-2 rounded-full bg-[#E4D6C2]/30 text-[#8C7E74] group-hover:bg-[#B95032] group-hover:text-[#F7F1E7] transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Required Bottom Notes & Disclaimers */}
        <div className="mt-12 p-6 rounded-xl bg-[#FAF6EF] border border-[#E4D6C2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#8C7E74]">
          <div className="flex items-start space-x-3">
            <Info className="w-4 h-4 text-[#B95032] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-[#302019]/90">
                Indicative menu and prices. Please confirm current availability in store.
              </p>
              <p>
                Jain preparations available upon request—please check with the team before ordering.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#728064]/10 text-[#728064] font-semibold text-xs border border-[#728064]/20">
              100% Pure Vegetarian Kitchen
            </span>
          </div>
        </div>

      </div>

      {/* Accessible Detail Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onViewFullMenu={() => {}}
      />
    </section>
  );
};
