import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Sparkles, Coffee, Info, Eye, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, type MenuItem } from '../data/tapriwalaData';
import { DishDetailModal } from '../components/DishDetailModal';
import { SwiggyOrderModal } from '../components/SwiggyOrderModal';
import { ScrollReveal } from '../components/ScrollReveal';

type CategoryFilter = 'All' | 'Chai & Hot Brews' | 'Cold Sips' | 'Street Food & Chaat' | 'Sandwiches & Wraps' | 'Maggi';

export const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [jainOnly, setJainOnly] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isSwiggyModalOpen, setIsSwiggyModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (jainOnly && !item.isJainAvailable) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, jainOnly]);

  return (
    <div className="pt-24 pb-20 bg-[#F7F1E7] min-h-screen relative bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dedicated Page Hero Header */}
        <ScrollReveal animation="fade-down" delay={0.1} className="py-12 border-b border-[#E4D6C2] mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
            <span className="w-6 h-[1px] bg-[#B95032]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              Authentic Contemporary Cafe Menu
            </span>
            <span className="w-6 h-[1px] bg-[#B95032]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#302019] tracking-tight mb-4">
            Our Menu & Recipes
          </h1>

          <p className="text-base sm:text-lg text-[#8C7E74] leading-relaxed">
            All prices verified from in-store and Swiggy menus. Prepared fresh with zero artificial food colours in our 100% pure vegetarian kitchen.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#728064]/10 text-[#728064] text-xs font-semibold border border-[#728064]/20">
              100% Pure Vegetarian
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D49A3D]/15 text-[#302019] text-xs font-semibold border border-[#D49A3D]/30">
              Jain Options On Request
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#B95032]/10 text-[#B95032] text-xs font-semibold border border-[#B95032]/20">
              Click Any Dish For Taste Profile
            </span>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsSwiggyModalOpen(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FC8019] hover:bg-[#e26e10] text-white text-xs uppercase tracking-wider font-semibold rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Order on Swiggy (3 Outlets)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Filter Controls Bar */}
        <div className="bg-[#FAF6EF] p-4 sm:p-6 rounded-2xl border border-[#E4D6C2] shadow-sm mb-10">
          
          {/* Top Search & Toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E4D6C2]/70">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C7E74] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by dish name, taste or ingredient..."
                className="w-full pl-10 pr-10 py-2.5 bg-[#F7F1E7] border border-[#E4D6C2] rounded-lg text-sm text-[#302019] placeholder-[#8C7E74] focus:outline-none focus:ring-2 focus:ring-[#B95032] transition-all"
                aria-label="Search menu"
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

            {/* Jain Toggle & Item Counter */}
            <div className="flex items-center space-x-4 justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => setJainOnly(!jainOnly)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
                  jainOnly
                    ? 'bg-[#D49A3D] text-[#302019] border-[#D49A3D] shadow-xs'
                    : 'bg-[#F7F1E7] text-[#8C7E74] hover:text-[#302019] border-[#E4D6C2]'
                }`}
                aria-pressed={jainOnly}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Jain Available On Request</span>
              </button>

              <span className="text-xs text-[#8C7E74] font-semibold hidden md:inline">
                {filteredItems.length} items
              </span>
            </div>
          </div>

          {/* Category Tabs */}
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

        {/* Menu Grid / Rows */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#FAF6EF] rounded-2xl border border-dashed border-[#E4D6C2] p-8">
            <Coffee className="w-10 h-10 text-[#8C7E74] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#302019] mb-1">
              No matching treats found
            </h3>
            <p className="text-sm text-[#8C7E74] mb-4">
              Try searching for "chai", "pav", "maggi", or clear your filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setJainOnly(false);
              }}
              className="px-5 py-2.5 bg-[#B95032] text-[#F7F1E7] text-xs uppercase font-semibold tracking-wider rounded-md shadow-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${jainOnly}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              {filteredItems.map((dish) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, borderColor: '#B95032' }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedDish(dish)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDish(dish);
                    }
                  }}
                  className="group cursor-pointer bg-[#FAF6EF] hover:bg-[#FAF6EF]/90 p-5 rounded-2xl border border-[#E4D6C2] transition-all duration-200 hover:shadow-lg flex items-center justify-between gap-4 h-full"
                  aria-label={`View ${dish.name} details`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Photo Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#302019]/5 border border-[#E4D6C2] relative">
                      <img
                        src={dish.image || '/images/kulhad-chai.jpg'}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <h3 className="font-serif text-lg font-bold text-[#302019] group-hover:text-[#B95032] transition-colors leading-tight">
                          {dish.name}
                        </h3>
                        {dish.isSignature && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#B95032]/10 text-[#B95032] border border-[#B95032]/20">
                            Signature
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8C7E74] leading-relaxed line-clamp-2 max-w-sm">
                        {dish.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-[11px] font-semibold text-[#728064]">
                          ● Pure Veg
                        </span>
                        {dish.isJainAvailable && (
                          <span className="text-[11px] font-semibold text-[#8C7E74]">
                            ● Jain on request
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#B95032]">
                      {dish.price}
                    </span>
                    <span className="text-[10px] text-[#8C7E74] uppercase font-bold mt-1 group-hover:text-[#B95032] transition-colors flex items-center space-x-0.5">
                      <span>Inspect</span>
                      <Eye className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Bottom Delivery & Order Information */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#FAF6EF] border border-[#E4D6C2] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-[#F7F1E7] border border-[#E4D6C2] text-[#B95032] shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#302019] mb-1">
                Ordering & Takeaway Across Coimbatore
              </h4>
              <p className="text-xs sm:text-sm text-[#8C7E74] leading-relaxed max-w-xl">
                Enjoy hot cutting chai and fresh snacks in store, or order directly for doorstep delivery via Swiggy and Zomato from R.S. Puram, Saibaba Colony, or Peelamedu.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsSwiggyModalOpen(true)}
              className="px-6 py-3 bg-[#FC8019] hover:bg-[#e26e10] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>Order on Swiggy (3 Outlets)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 3-Outlet Swiggy Selection Modal */}
      <SwiggyOrderModal
        isOpen={isSwiggyModalOpen}
        onClose={() => setIsSwiggyModalOpen(false)}
      />

      {/* Accessible Detail Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onOrderSwiggy={() => setIsSwiggyModalOpen(true)}
      />
    </div>
  );
};
