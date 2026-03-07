'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { MenuItem } from '@/types';

const categoryOrder = ['Dosa', 'South Indian', 'Uttapam'];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [vegOnly, setVegOnly] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu?available=true');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load menu');
        }

        setMenuItems(data.items || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load menu';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(menuItems.map((item) => item.category))];
    return cats.sort((a, b) => {
      const ai = categoryOrder.indexOf(a);
      const bi = categoryOrder.indexOf(b);
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

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  if (error) {
    return <div className="min-h-[50vh] flex items-center justify-center text-curry-red">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-brown-dark to-brown py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl text-white mb-3">Our Menu</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">Explore our wide selection of authentic South Indian dishes and more</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search for dosas, idli, uttapam..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-colors" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-cream-dark rounded-xl hover:border-saffron transition-colors">
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-cream-dark animate-fade-slide-up">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-brown-dark">Veg Only</label>
                <button onClick={() => setVegOnly(!vegOnly)} className={`w-12 h-6 rounded-full transition-colors relative ${vegOnly ? 'bg-leaf-green' : 'bg-gray-300'}`} role="switch" aria-checked={vegOnly}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${vegOnly ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-brown-dark">Max Price: ₹{priceRange[1]}</label>
                <input type="range" min="50" max="500" step="10" value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-32 accent-saffron" />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          <button onClick={() => setSelectedCategory('All')} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-saffron text-white' : 'bg-white text-brown border border-cream-dark hover:border-saffron'}`}>
            All Items
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-saffron text-white' : 'bg-white text-brown border border-cream-dark hover:border-saffron'}`}>
              {cat}
            </button>
          ))}
        </div>

        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No items found matching your filters</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedItems).map(([category, items]) => (
              <section key={category}>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-brown-dark mb-6">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, index) => (
                    <MenuCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
