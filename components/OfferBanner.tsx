'use client';

import { useState, useEffect } from 'react';
import { X, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: string;
  discount_value: number;
  code: string | null;
  valid_until: string | null;
}

export default function OfferBanner() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch('/api/offers');
        const data = await res.json();
        if (data.offers && data.offers.length > 0) {
          setOffers(data.offers);
        }
      } catch {
        // No offers
      }
    }
    fetchOffers();
  }, []);

  useEffect(() => {
    if (offers.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  if (dismissed || offers.length === 0) return null;

  const offer = offers[current];

  return (
    <div className="bg-gradient-to-r from-saffron via-curry-red to-saffron text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 relative z-10">
        <div className="flex items-center justify-center gap-3 text-sm">
          {offers.length > 1 && (
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + offers.length) % offers.length)}
              className="p-0.5 hover:bg-white/20 rounded transition-colors hidden sm:block"
              aria-label="Previous offer"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <div className="flex items-center gap-2 text-center">
            <Tag size={16} className="shrink-0" />
            <span className="font-semibold">{offer.title}</span>
            <span className="hidden sm:inline">—</span>
            <span className="hidden sm:inline text-white/90">{offer.description}</span>
            {offer.code && (
              <span className="bg-white/20 text-white px-2 py-0.5 rounded font-mono text-xs font-bold tracking-wider">
                {offer.code}
              </span>
            )}
          </div>
          {offers.length > 1 && (
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % offers.length)}
              className="p-0.5 hover:bg-white/20 rounded transition-colors hidden sm:block"
              aria-label="Next offer"
            >
              <ChevronRight size={16} />
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Dismiss offers"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
