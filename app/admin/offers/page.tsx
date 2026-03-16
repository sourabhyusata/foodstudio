'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Send, X, Loader2, Megaphone, Tag, Calendar, CheckCircle } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: string;
  discount_value: number;
  min_order: number;
  code: string | null;
  is_active: number;
  valid_from: string;
  valid_until: string | null;
  created_at: string;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [saving, setSaving] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<{ id: string; message: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 10,
    min_order: 0,
    code: '',
    is_active: true,
    valid_until: '',
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const res = await fetch('/api/offers?all=true');
      const data = await res.json();
      if (data.offers) setOffers(data.offers);
    } catch {
      // Offers unavailable
    } finally {
      setLoading(false);
    }
  }

  const openAddForm = () => {
    setEditingOffer(null);
    setFormData({ title: '', description: '', discount_type: 'percentage', discount_value: 10, min_order: 0, code: '', is_active: true, valid_until: '' });
    setShowForm(true);
  };

  const openEditForm = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount_type: offer.discount_type,
      discount_value: offer.discount_value,
      min_order: offer.min_order,
      code: offer.code || '',
      is_active: Boolean(offer.is_active),
      valid_until: offer.valid_until || '',
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingOffer) {
        const res = await fetch('/api/offers', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingOffer.id, ...formData }),
        });
        const data = await res.json();
        if (data.offer) {
          setOffers((prev) => prev.map((o) => (o.id === editingOffer.id ? data.offer : o)));
        }
      } else {
        const res = await fetch('/api/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.offer) {
          setOffers((prev) => [data.offer, ...prev]);
        }
      }
      setShowForm(false);
    } catch {
      alert('Failed to save offer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this offer?')) return;
    try {
      await fetch(`/api/offers?id=${id}`, { method: 'DELETE' });
      setOffers((prev) => prev.filter((o) => o.id !== id));
    } catch {
      alert('Failed to delete offer');
    }
  };

  const handleSendAlert = async (offer: Offer) => {
    setSendingId(offer.id);
    setSendResult(null);
    try {
      const res = await fetch('/api/offers/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offer_id: offer.id,
          message: `🎉 ${offer.title}\n${offer.description}\n${offer.code ? `Use code: ${offer.code}` : ''}`,
        }),
      });
      const data = await res.json();
      setSendResult({ id: offer.id, message: data.message });
    } catch {
      setSendResult({ id: offer.id, message: 'Failed to send alerts' });
    } finally {
      setSendingId(null);
    }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      const res = await fetch('/api/offers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: offer.id, is_active: !offer.is_active }),
      });
      const data = await res.json();
      if (data.offer) {
        setOffers((prev) => prev.map((o) => (o.id === offer.id ? data.offer : o)));
      }
    } catch {
      alert('Failed to update offer');
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{offers.length} offer(s)</p>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-saffron hover:bg-saffron-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Create Offer
        </button>
      </div>

      {/* Offers Grid */}
      {offers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-16 text-center">
          <Megaphone className="mx-auto mb-3 text-gray-300" size={40} />
          <p className="text-gray-400 text-lg">No offers yet</p>
          <p className="text-gray-300 text-sm">Create your first promotional offer</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${offer.is_active ? 'border-leaf-green' : 'border-gray-300'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-brown-dark">{offer.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{offer.description}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openEditForm(offer)} className="p-1.5 text-gray-400 hover:text-saffron transition-colors" aria-label="Edit offer">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(offer.id)} className="p-1.5 text-gray-400 hover:text-curry-red transition-colors" aria-label="Delete offer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="flex items-center gap-1 bg-saffron/10 text-saffron text-xs px-2 py-1 rounded-full font-medium">
                    <Tag size={12} />
                    {offer.discount_value}{offer.discount_type === 'percentage' ? '%' : '₹'} OFF
                  </span>
                  {offer.code && (
                    <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full font-mono font-medium">
                      {offer.code}
                    </span>
                  )}
                  {offer.min_order > 0 && (
                    <span className="text-xs text-gray-400">Min order: ₹{offer.min_order}</span>
                  )}
                </div>

                {offer.valid_until && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                    <Calendar size={12} />
                    Valid until {new Date(offer.valid_until).toLocaleDateString('en-IN')}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => toggleActive(offer)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      offer.is_active
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {offer.is_active ? '✓ Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleSendAlert(offer)}
                    disabled={sendingId === offer.id}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 bg-leaf-green/10 text-leaf-green hover:bg-leaf-green/20 rounded-full font-medium transition-colors disabled:opacity-50"
                  >
                    {sendingId === offer.id ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                    Send Alert
                  </button>
                </div>

                {sendResult?.id === offer.id && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-leaf-green">
                    <CheckCircle size={12} />
                    {sendResult.message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-semibold text-brown-dark">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 🎉 Weekend Special!"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details about the offer..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select
                    value={formData.discount_type}
                    onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    value={formData.discount_value}
                    onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={formData.min_order}
                    onChange={(e) => setFormData({ ...formData, min_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. DOSA20"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until (optional)</label>
                <input
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-saffron text-sm"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="accent-leaf-green"
                />
                Active (visible to customers)
              </label>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-saffron hover:bg-saffron-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : editingOffer ? 'Save Changes' : 'Create Offer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
