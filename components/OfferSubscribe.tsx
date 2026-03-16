'use client';

import { useState } from 'react';
import { Bell, CheckCircle, Loader2 } from 'lucide-react';

export default function OfferSubscribe() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, subscribe: true }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-leaf-green/10 to-saffron/10 rounded-2xl p-8 text-center border border-leaf-green/20">
        <CheckCircle className="mx-auto text-leaf-green mb-3" size={48} />
        <h3 className="font-[family-name:var(--font-display)] text-xl text-brown-dark mb-2">
          You&apos;re Subscribed! 🎉
        </h3>
        <p className="text-gray-500 text-sm">
          We&apos;ll notify you about exclusive offers, discounts, and new menu items.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-saffron/5 via-cream to-leaf-green/5 rounded-2xl p-8 border border-saffron/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center">
          <Bell className="text-saffron" size={24} />
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-xl text-brown-dark">
            Get Offer Alerts
          </h3>
          <p className="text-sm text-gray-500">Be the first to know about our deals</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-2.5 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron text-sm"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number (e.g. 9876543210)"
          required
          className="w-full px-4 py-2.5 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron text-sm"
        />
        {error && <p className="text-sm text-curry-red">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-dark text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 text-sm"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Bell size={16} />}
          {loading ? 'Subscribing...' : 'Subscribe to Offers'}
        </button>
        <p className="text-xs text-gray-400 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
