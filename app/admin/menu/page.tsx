'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2 } from 'lucide-react';
import { categories as fallbackCategories } from '@/lib/menu-data';
import { MenuItem, MenuCategory } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Dosa',
    image_url: '',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
  });

  // Derive categories from actual items
  const categories = [...new Set(items.map((i) => i.category))].sort((a, b) => {
    const order = [...fallbackCategories];
    const ai = order.indexOf(a as typeof order[number]);
    const bi = order.indexOf(b as typeof order[number]);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  // Fetch menu items from database
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch {
      // Items remain empty
    } finally {
      setLoading(false);
    }
  }

  const filtered = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'Dosa',
      image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
      is_veg: true,
      is_available: true,
      is_bestseller: false,
    });
    setShowForm(true);
  };

  const openEditForm = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        // Update existing item
        const res = await fetch('/api/menu', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...formData }),
        });
        const data = await res.json();
        if (data.item) {
          setItems((prev) => prev.map((i) => (i.id === editingItem.id ? data.item : i)));
        }
      } else {
        // Create new item
        const res = await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.item) {
          setItems((prev) => [...prev, data.item]);
        }
      }
      setShowForm(false);
    } catch {
      alert('Failed to save item. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await fetch(`/api/menu?id=${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      alert('Failed to delete item.');
    }
  };

  const toggleAvailability = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    try {
      const res = await fetch('/api/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_available: !item.is_available }),
      });
      const data = await res.json();
      if (data.item) {
        setItems((prev) => prev.map((i) => (i.id === id ? data.item : i)));
      }
    } catch {
      // Optimistic toggle on failure
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, is_available: !i.is_available } : i))
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-saffron" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
          />
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedCategory === 'All' ? 'bg-saffron text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat ? 'bg-saffron text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500 bg-gray-50">
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className={item.is_veg ? 'veg-dot' : 'nonveg-dot'} />
                      <div>
                        <div className="font-medium text-brown-dark">{item.name}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[200px]">
                          {item.description}
                        </div>
                      </div>
                      {item.is_bestseller && (
                        <span className="bg-curry-red/10 text-curry-red text-[10px] px-1.5 py-0.5 rounded font-medium">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{item.category}</td>
                  <td className="px-5 py-3 font-medium">{formatPrice(item.price)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.is_available
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-1.5 text-gray-400 hover:text-saffron transition-colors"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-gray-400 hover:text-curry-red transition-colors"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-sm text-gray-400 border-t border-gray-100">
          Showing {filtered.length} of {items.length} items
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-semibold text-brown-dark">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category || 'Dosa'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                  >
                    {[...fallbackCategories].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.is_veg ?? true}
                    onChange={(e) => setFormData({ ...formData, is_veg: e.target.checked })}
                    className="accent-leaf-green"
                  />
                  Vegetarian
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.is_available ?? true}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    className="accent-saffron"
                  />
                  Available
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.is_bestseller ?? false}
                    onChange={(e) => setFormData({ ...formData, is_bestseller: e.target.checked })}
                    className="accent-curry-red"
                  />
                  Bestseller
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-saffron hover:bg-saffron-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
