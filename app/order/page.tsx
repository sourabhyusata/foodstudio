'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, MessageCircle, Bike, ShoppingBag, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface OrderChannel {
  id: string;
  name: string;
  href: string;
  description: string;
  icon_name: string;
  style: string;
}

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  ShoppingBag,
  Bike,
};

export default function OrderPage() {
  const [channels, setChannels] = useState<OrderChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const res = await fetch('/api/order-channels');
        if (res.ok) {
          const data = await res.json();
          setChannels(data);
        }
      } catch (err) {
        console.error('Failed to fetch order channels:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchChannels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-4xl text-brown-dark mb-3">Order Dosa Darbar Online</h1>
        <p className="text-gray-600">Choose any platform below to place your order.</p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-4">
        {channels.map((channel) => {
          const Icon = iconMap[channel.icon_name];
          return (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${channel.style} text-white rounded-2xl p-6 text-left transition-colors`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon size={22} />}
                    <h2 className="text-2xl font-semibold">{channel.name}</h2>
                  </div>
                  <p className="text-white/90">{channel.description}</p>
                </div>
                <ExternalLink size={20} className="shrink-0" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
