'use client';

import Image from 'next/image';
import { Plus, Check } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  const { addItem, items } = useCartStore();
  const cartItem = items.find((i) => i.item.id === item.id);
  const isInCart = !!cartItem;

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 sizzle-hover animate-fade-slide-up group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {item.is_bestseller && (
            <span className="bg-curry-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Bestseller
            </span>
          )}
          {item.is_chefs_special && (
            <span className="bg-saffron text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Chef&apos;s Special
            </span>
          )}
        </div>
        {/* Veg indicator */}
        <div className="absolute top-2 right-2">
          <div className={item.is_veg ? 'veg-dot bg-white' : 'nonveg-dot bg-white'} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-brown-dark mb-1">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-brown-dark">
            {formatPrice(item.price)}
          </span>
          {!item.is_available ? (
            <span className="text-sm text-gray-400 italic">Unavailable</span>
          ) : isInCart ? (
            <div className="flex items-center gap-1 bg-leaf-green text-white px-3 py-1.5 rounded-lg text-sm font-medium">
              <Check size={16} />
              <span>Added ({cartItem.quantity})</span>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="flex items-center gap-1 bg-saffron hover:bg-saffron-dark text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
