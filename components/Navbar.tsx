'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order Online' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-saffron rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-brown-dark leading-tight">
                Dosa Darbar
              </span>
              <span className="text-[10px] md:text-xs text-brown-light tracking-wider uppercase">
                South Indian Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brown hover:text-saffron transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="hidden sm:flex items-center gap-1 text-sm text-brown hover:text-saffron transition-colors"
            >
              <Phone size={16} />
              <span className="hidden lg:inline">+91 98765 43210</span>
            </a>

            <button
              onClick={toggleCart}
              className="relative p-2 text-brown hover:text-saffron transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-curry-red text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-brown"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-cream-dark">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-brown hover:bg-cream rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-3 py-2.5 text-saffron font-medium"
            >
              <Phone size={16} />
              +91 98765 43210
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
