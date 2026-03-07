'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1630383249896-424e482df921?w=1600"
          alt="Sizzling dosa on a hot griddle"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/90 via-brown-dark/70 to-brown-dark/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-saffron/20 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-saffron/10 rounded-full hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-saffron/20 text-saffron-light px-4 py-1.5 rounded-full mb-6 border border-saffron/30">
            <span className="w-2 h-2 bg-saffron-light rounded-full animate-pulse" />
            <span className="text-sm font-medium">Now accepting online orders</span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
            Jaipur&apos;s Favorite{' '}
            <span className="text-saffron-light">Dosa</span>{' '}
            Destination
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
            Fresh batter, hot griddle, 30+ varieties — from the classic Masala Dosa to
            our legendary Family Dosa. Authentic South Indian flavors, right here on
            Ajmer Highway.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-saffron/25"
            >
              🛒 Order Now
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm"
            >
              📋 View Menu
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: '30+', label: 'Dosa Varieties' },
              { value: '5000+', label: 'Happy Customers' },
              { value: '4.3★', label: 'Zomato Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-saffron-light">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
