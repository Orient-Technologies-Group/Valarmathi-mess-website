import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, MenuCategory } from '../../../shared/types.js';
import { formatPrice } from '../utils/helpers.js';
import { Search, Flame, Utensils, CheckCircle2, X } from 'lucide-react';

interface MenuPageProps {
  categories: MenuCategory[];
  items: MenuItem[];
  onOpenReservation: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ categories, items, onOpenReservation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [selectedImageItem, setSelectedImageItem] = useState<MenuItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && item.category_id !== cat.id) return false;
      }

      // Diet filter
      if (dietFilter === 'veg' && item.is_veg !== 1) return false;
      if (dietFilter === 'non-veg' && item.is_veg === 1) return false;

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = item.name.toLowerCase().includes(q);
        const tamilMatch = item.tamil_name ? item.tamil_name.includes(q) : false;
        const descMatch = item.description.toLowerCase().includes(q);
        if (!nameMatch && !tamilMatch && !descMatch) return false;
      }

      return true;
    });
  }, [items, categories, selectedCategory, dietFilter, searchQuery]);

  // Group filtered items by category for editorial layout
  const groupedItems = useMemo(() => {
    const groups: { category: MenuCategory; items: MenuItem[] }[] = [];

    categories.forEach((cat) => {
      const catItems = filteredItems.filter((i) => i.category_id === cat.id);
      if (catItems.length > 0) {
        groups.push({ category: cat, items: catItems });
      }
    });

    return groups;
  }, [categories, filteredItems]);

  const soldOutCount = items.filter((i) => i.is_available_today === 0).length;

  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>Daily Kitchen Register</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F131C] tracking-tight">
            Valarmathi Mess Menu
          </h1>
          <div className="font-tamil text-lg text-[#C8861B] font-semibold mt-1">
            உணவுப் பட்டியல்
          </div>
          <p className="text-sm sm:text-base text-[#6B6661] mt-3 font-light">
            All dishes cooked daily with cold-pressed gingelly oil, freshly pounded Kongu spices, and uncompromised
            home recipes.
          </p>
        </div>

        {/* Today's Availability Alert Strip */}
        <div className="mb-8 p-4 rounded bg-[#F4EFE7] border border-[#6B1D28]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[#4F131C] font-semibold">
              Today's Service Status:
            </span>
            <span className="text-[#6B6661]">
              Fresh lunch preparations ready from 12:00 PM. Seeraga Samba Biryani available till stocks last.
            </span>
          </div>

          {soldOutCount > 0 ? (
            <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200 font-medium">
              {soldOutCount} items marked sold-out today
            </span>
          ) : (
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All 30+ items available</span>
            </span>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded border border-[#6B1D28]/15 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#7A736C] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, Tamil name, or spice..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-[#6B1D28]/20 rounded focus:outline-none focus:border-[#4F131C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Diet Switcher */}
            <div className="flex items-center space-x-1 bg-[#F4EFE7] p-1 rounded border border-[#6B1D28]/10 text-xs w-full sm:w-auto justify-center">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  dietFilter === 'all'
                    ? 'bg-[#4F131C] text-white shadow-sm'
                    : 'text-[#554E48] hover:text-[#4F131C]'
                }`}
              >
                All ({items.length})
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center space-x-1.5 ${
                  dietFilter === 'non-veg'
                    ? 'bg-[#4F131C] text-white shadow-sm'
                    : 'text-[#554E48] hover:text-[#4F131C]'
                }`}
              >
                <span className="nonveg-badge shrink-0" />
                <span>Non-Veg</span>
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center space-x-1.5 ${
                  dietFilter === 'veg'
                    ? 'bg-[#4F131C] text-white shadow-sm'
                    : 'text-[#554E48] hover:text-[#4F131C]'
                }`}
              >
                <span className="veg-badge shrink-0" />
                <span>Pure Veg</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin pt-2 border-t border-[#6B1D28]/10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#C8861B] text-white'
                  : 'bg-[#F4EFE7] text-[#554E48] hover:bg-[#EFE8DD]'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-[#C8861B] text-white'
                    : 'bg-[#F4EFE7] text-[#554E48] hover:bg-[#EFE8DD]'
                }`}
              >
                <span>{cat.name}</span>
                {cat.tamil_name && (
                  <span className="font-tamil text-[11px] opacity-80">({cat.tamil_name})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Listings with AnimatePresence for Smooth Transition */}
        <AnimatePresence mode="wait">
          {groupedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-16 bg-[#FAF7F2] rounded border border-[#6B1D28]/15"
            >
              <p className="text-base text-[#6B6661] font-light">
                No dishes found matching your current filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setDietFilter('all');
                }}
                className="mt-3 text-xs font-bold uppercase tracking-wider text-[#4F131C] hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${selectedCategory}-${dietFilter}-${searchQuery}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="space-y-14"
            >
              {groupedItems.map(({ category, items: catItems }) => (
                <div key={category.id} className="relative">
                  {/* Category Header */}
                  <div className="pb-3 border-b-2 border-[#4F131C]/30 mb-6 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4F131C]">
                        {category.name}
                      </h2>
                      {category.tamil_name && (
                        <span className="font-tamil text-sm text-[#C8861B] font-semibold ml-2">
                          {category.tamil_name}
                        </span>
                      )}
                    </div>
                    {category.description && (
                      <span className="text-xs text-[#7A736C] font-light max-w-md text-right hidden sm:block">
                        {category.description}
                      </span>
                    )}
                  </div>

                  {/* Editorial Menu Rows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        className={`group p-3 rounded transition-all duration-200 ${
                          item.is_available_today === 0
                            ? 'opacity-60 bg-stone-100/60'
                            : 'hover:bg-[#F3EDE2]/70'
                        }`}
                      >
                        {/* Dish Name & Price Header */}
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="flex items-center space-x-2">
                            <span className={item.is_veg ? 'veg-badge shrink-0' : 'nonveg-badge shrink-0'} />
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4F131C] group-hover:text-[#6B1D28] transition-colors">
                              {item.name}
                            </h3>
                            {item.is_featured === 1 && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-[#C8861B] text-white px-1.5 py-0.5 rounded">
                                Fav
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <span className="font-serif text-lg sm:text-xl font-bold text-[#4F131C]">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>

                        {/* Tamil Name */}
                        {item.tamil_name && (
                          <div className="font-tamil text-xs text-[#C8861B] font-medium pl-6 mb-1">
                            {item.tamil_name}
                          </div>
                        )}

                        {/* Description & Portion */}
                        <p className="text-xs text-[#554E48] font-light leading-relaxed pl-6 mt-1">
                          {item.description}
                        </p>

                        {/* Meta details */}
                        <div className="pl-6 mt-2 flex flex-wrap items-center justify-between text-[11px] text-[#7A736C] gap-2">
                          <div className="flex items-center space-x-3">
                            {item.is_spicy === 1 && (
                              <span className="inline-flex items-center text-rose-700">
                                {Array.from({ length: item.spice_level || 1 }).map((_, i) => (
                                  <Flame key={i} className="w-3 h-3 fill-rose-600" />
                                ))}
                                <span className="ml-1 text-[10px]">Kongu Spice</span>
                              </span>
                            )}

                            {item.portion_detail && (
                              <span className="text-[#8C847B]">
                                ({item.portion_detail})
                              </span>
                            )}

                            {item.image_url && (
                              <button
                                onClick={() => setSelectedImageItem(item)}
                                className="text-[#C8861B] hover:underline text-[10px] uppercase font-semibold"
                              >
                                View Photo
                              </button>
                            )}
                          </div>

                          {item.is_available_today === 0 && (
                            <span className="text-rose-700 text-[10px] font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Sold Out Today
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Bottom Callout */}
        <div className="mt-16 p-8 rounded bg-[#4F131C] text-[#FAF7F2] text-center max-w-3xl mx-auto shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2] mb-2">
            Planning a Group or Family Feast?
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light max-w-lg mx-auto mb-6">
            Reserve seating in advance or let us know about special orders such as fresh Kola Urundai batches or
            weekend Seeraga Samba mutton biryani.
          </p>
          <button
            onClick={onOpenReservation}
            className="px-6 py-3 rounded bg-[#C8861B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#E09E2B] transition-colors shadow"
          >
            Submit Dining Enquiry
          </button>
        </div>
      </div>

      {/* Dish Image Modal */}
      {selectedImageItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedImageItem(null)}
        >
          <div
            className="bg-[#FAF7F2] rounded overflow-hidden max-w-lg w-full border border-[#6B1D28]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-black">
              <img
                src={selectedImageItem.image_url || ''}
                alt={selectedImageItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImageItem(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-baseline">
                <h4 className="font-serif text-2xl font-bold text-[#4F131C]">
                  {selectedImageItem.name}
                </h4>
                <span className="font-serif text-xl font-bold text-[#4F131C]">
                  {formatPrice(selectedImageItem.price)}
                </span>
              </div>
              {selectedImageItem.tamil_name && (
                <div className="font-tamil text-sm text-[#C8861B] font-semibold mb-2">
                  {selectedImageItem.tamil_name}
                </div>
              )}
              <p className="text-xs text-[#554E48] font-light leading-relaxed mt-2">
                {selectedImageItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
