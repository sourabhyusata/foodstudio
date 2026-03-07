'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { menuItems as fallbackMenuItems, categories as fallbackCategories } from '@/lib/menu-data';
import { MenuItem } from '@/types';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(fallbackMenuItems);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [vegOnly, setVegOnly] = useState(false);

  // Fetch menu items from Supabase via API
  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu?available=true');
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setMenuItems(data.items);
        }
      } catch {
        // Fallback data is already set
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Derive categories from actual menu items
  const categories = useMemo(() => {
    const cats = [...new Set(menuItems.map((item) => item.category))];
    // Sort by the fallback order if possible
    const order = [...fallbackCategories];
    return cats.sort((a, b) => {
      const ai = order.indexOf(a as typeof order[number]);
      const bi = order.indexOf(b as typeof order[number]);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesVeg = !vegOnly || item.is_veg;
      return matchesSearch && matchesCategory && matchesPrice && matchesVeg && item.is_available;
    });
  }, [menuItems, search, selectedCategory, priceRange, vegOnly]);

  const groupedItems = useMemo(() => {
    if (selectedCategory !== 'All') {
      return { [selectedCategory]: filteredItems };
    }
    const grouped: Record<string, typeof filteredItems> = {};
    filteredItems.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });
    return grouped;
  }, [filteredItems, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-brown-dark to-brown py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
            Our Menu
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Explore our wide selection of authentic South Indian dishes and more
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for dosas, idli, uttapam..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-cream-dark rounded-xl hover:border-saffron transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-cream-dark animate-fade-slide-up">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-brown-dark">Veg Only</label>
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    vegOnly ? 'bg-leaf-green' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={vegOnly}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${
                      vegOnly ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-brown-dark">Max Price: ₹{priceRange[1]}</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-32 accent-saffron"
                />
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-saffron text-white'
                : 'bg-white text-brown border border-cream-dark hover:border-saffron'
            }`}
          >
            All ({menuItems.filter((i) => i.is_available).length})
          </button>
          {categories.map((cat) => {
            const count = menuItems.filter(
              (i) => i.category === cat && i.is_available
            ).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-saffron text-white'
                    : 'bg-white text-brown border border-cream-dark hover:border-saffron'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-saffron mx-auto mb-4" />
            <p className="text-gray-500">Loading menu...</p>
          </div>
        ) : Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-[family-name:var(--font-display)] text-xl text-brown-dark mb-2">
              No items found
            </h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                {selectedCategory === 'All' && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark">
                      {category}
                    </h2>
                    <div className="flex-1 h-px bg-cream-dark" />
                    <span className="text-sm text-gray-400">{items.length} items</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((item, index) => (
                    <MenuCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
