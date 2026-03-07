import Link from 'next/link';
import { Utensils, Clock, IndianRupee, Flame } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import HomeBestsellers from './HomeBestsellers';
import { supabase } from '@/lib/supabase';
import { menuItems as fallbackItems } from '@/lib/menu-data';
import { MenuItem } from '@/types';

const highlights = [
  {
    icon: Flame,
    title: 'Fresh Batter Daily',
    description: 'Our dosa batter is prepared fresh every morning — no shortcuts, no preservatives.',
  },
  {
    icon: Utensils,
    title: 'Made with Butter',
    description: 'All our dosas and uttapams are made with butter for that rich, authentic taste.',
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Hot food, served fast. Most orders are ready within 10–15 minutes.',
  },
  {
    icon: IndianRupee,
    title: 'Affordable Prices',
    description: "Great food shouldn't break the bank. Dosas starting at just ₹60.",
  },
];

async function getBestsellers(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_bestseller', true)
      .eq('is_available', true)
      .limit(6);

    if (error || !data || data.length === 0) {
      return fallbackItems.filter((item) => item.is_bestseller).slice(0, 6);
    }

    return data;
  } catch {
    return fallbackItems.filter((item) => item.is_bestseller).slice(0, 6);
  }
}

export default async function HomePage() {
  const bestsellers = await getBestsellers();

  return (
    <>
      <HeroSection />

      {/* Why Dosa Darbar */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-brown-dark mb-3">
              Why Dosa Darbar?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              What makes us Jaipur&apos;s most loved South Indian restaurant
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-saffron" size={28} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-brown-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-brown-dark mb-2">
                Our Bestsellers
              </h2>
              <p className="text-gray-500">
                The dishes our customers can&apos;t stop ordering
              </p>
            </div>
            <Link
              href="/menu"
              className="mt-4 sm:mt-0 text-saffron hover:text-saffron-dark font-medium transition-colors"
            >
              View Full Menu →
            </Link>
          </div>

          <HomeBestsellers items={bestsellers} />
        </div>
      </section>

      {/* Dosa Preparation Video */}
      <section className="py-16 sm:py-20 bg-brown-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-white mb-3">
              The Art of Dosa Making
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Watch our skilled chefs craft the perfect crispy dosa — from fresh batter to your plate
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <iframe
                src="https://www.youtube.com/embed/ei4cLt0mRKA?rel=0&modestbranding=1"
                title="Dosa Preparation at Dosa Darbar"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Fresh batter, hot griddle, perfect crisp — every single time
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Location & Hours */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-brown-dark mb-3">
              Visit Us
            </h2>
            <p className="text-gray-500">Find us at Amrapali Nagar, Dhawas, Lalarpura, Jaipur</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md h-[350px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d75.7!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDosa%20Darbar%2C%20Amrapali%20Nagar%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dosa Darbar location on Google Maps"
              />
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-6">
                Restaurant Hours
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-cream-dark">
                  <span className="text-gray-600">Monday – Sunday</span>
                  <span className="font-semibold text-brown-dark">8:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-cream-dark">
                  <span className="text-gray-600">Delivery Hours</span>
                  <span className="font-semibold text-brown-dark">10:00 AM – 10:30 PM</span>
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-4">
                Address
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Shop No. G4, Amrapali Nagar,<br />
                Dhawas, Lalarpura,<br />
                Landmark: Meghraj Hospital,<br />
                Gandhipath West, Jaipur
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Dosa+Darbar+Amrapali+Nagar+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-saffron hover:bg-saffron-dark text-white text-center py-3 rounded-lg font-medium transition-colors"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+919785132125"
                  className="flex-1 bg-white border-2 border-saffron text-saffron hover:bg-saffron hover:text-white text-center py-3 rounded-lg font-medium transition-colors"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="banana-leaf-bg py-16">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl mb-4">
            Craving a Hot, Crispy Dosa?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Order now and get it delivered to your doorstep — or pick it up fresh from our kitchen!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-saffron hover:bg-saffron-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Order Online
            </Link>
            <a
              href="https://wa.me/919785132125?text=Hi!%20I%20would%20like%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur-sm"
            >
              WhatsApp Order
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
