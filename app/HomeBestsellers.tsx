'use client';

import MenuCard from '@/components/MenuCard';
import { MenuItem } from '@/types';

export default function HomeBestsellers({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <MenuCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
