export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Utensils, Clock, IndianRupee, Flame } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import HomeBestsellers from './HomeBestsellers';
import { supabase } from '@/lib/supabase';
import { MenuItem } from '@/types';
import { getSiteSettings, getTestimonials, getHighlights, Highlight } from '@/lib/site-settings';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Utensils,
  Clock,
  IndianRupee,
};

async function getBestsellers(): Promise<MenuItem[]> {
  try {
    const result = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_bestseller', true)
      .eq('is_available', true)
      .limit(6);

    if (result.error) {
      console.error('Failed to fetch bestsellers:', result.error.message);
      return [];
    }

    return result.data ?? [];
  } catch (error) {
    console.error('Failed to fetch bestsellers:', error);
    return [];
  }
}

export default async function HomePage() {
  const [bestsellers, settings, testimonials, highlights] = await Promise.all([
    getBestsellers(),
    getSiteSettings(),
    getTestimonials(),
    getHighlights(),
  ]);

  const whatsappNumber = settings.whatsapp_number || '';
  const videoUrl = settings.youtube_video_url || '';
  const mapsEmbedUrl = settings.google_maps_embed || '';
  const mapsUrl = settings.google_maps_url || '';
  const phoneNumber = settings.phone_number || '';
  const address = settings.address || '';
  const openingHours = settings.opening_hours || '';
  const deliveryHours = settings.delivery_hours || '';

  return (
    <>
      <HeroSection settings={settings} />

      {/* Why Dosa Darbar */}
      {highlights.length > 0 && (
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
              {highlights.map((item: Highlight, index: number) => {
                const Icon = iconMap[item.icon_name];
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow animate-fade-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {Icon && <Icon className="text-saffron" size={28} />}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg text-brown-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
      {videoUrl && (
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
                  src={videoUrl}
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
      )}

      {/* Testimonials */}
      <TestimonialCarousel initialTestimonials={testimonials} />

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
              {mapsEmbedUrl && (
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dosa Darbar location on Google Maps"
                />
              )}
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-6">
                Restaurant Hours
              </h3>
              <div className="space-y-4 mb-8">
                {openingHours && (
                  <div className="flex justify-between items-center py-2 border-b border-cream-dark">
                    <span className="text-gray-600">Monday – Sunday</span>
                    <span className="font-semibold text-brown-dark">{openingHours}</span>
                  </div>
                )}
                {deliveryHours && (
                  <div className="flex justify-between items-center py-2 border-b border-cream-dark">
                    <span className="text-gray-600">Delivery Hours</span>
                    <span className="font-semibold text-brown-dark">{deliveryHours}</span>
                  </div>
                )}
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-4">
                Address
              </h3>
              {address && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {address.split(', ').map((line, i, arr) => (
                    <span key={i}>
                      {line}{i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-saffron hover:bg-saffron-dark text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    Get Directions
                  </a>
                )}
                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="flex-1 bg-white border-2 border-saffron text-saffron hover:bg-saffron hover:text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    Call Us
                  </a>
                )}
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
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi!%20I%20would%20like%20to%20place%20an%20order`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur-sm"
              >
                WhatsApp Order
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
