import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Dosa Darbar',
  description: 'Learn about Dosa Darbar — our story, our passion for South Indian cuisine, and our mission to bring authentic flavors to Jaipur.',
};

const gallery = [
  { src: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600', alt: 'Masala Dosa being served' },
  { src: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600', alt: 'South Indian thali spread' },
  { src: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600', alt: 'Fresh ingredients preparation' },
  { src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600', alt: 'Restaurant kitchen in action' },
  { src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600', alt: 'Paneer curry closeup' },
  { src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', alt: 'Biryani being plated' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-r from-brown-dark to-brown overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-white mb-4">
            Our Story
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From a humble kitchen to Jaipur&apos;s most loved dosa destination
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-brown-dark mb-6">
                How It All Started
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Dosa Darbar was born from a simple idea: bring the authentic taste of
                South India to the heart of Rajasthan. What started as a small eatery
                on Ajmer Highway has grown into one of Jaipur&apos;s most popular restaurants
                for South Indian cuisine.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our founder&apos;s love for dosas dates back to his travels through
                Karnataka, Tamil Nadu, and Kerala — where he discovered that the secret
                to a perfect dosa lies not just in the recipe, but in the passion behind
                it. Every dosa at Dosa Darbar is made with freshly ground batter,
                prepared daily in-house, just the way it&apos;s done in traditional South
                Indian kitchens.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we serve over 30 varieties of dosas alongside a full menu of
                South Indian, North Indian, and Chinese favorites — all at prices that
                keep our customers coming back, meal after meal.
              </p>
            </div>

            {/* Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-saffron/5 border border-saffron/20 rounded-2xl p-8">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-brown-dark mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To make authentic, freshly prepared South Indian food accessible and
                  affordable to everyone in Jaipur — from families and students to
                  highway travelers and dosa enthusiasts.
                </p>
              </div>
              <div className="bg-leaf-green/5 border border-leaf-green/20 rounded-2xl p-8">
                <div className="text-3xl mb-3">❤️</div>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-brown-dark mb-3">
                  Our Promise
                </h3>
                <p className="text-gray-600">
                  Fresh batter every day, no frozen ingredients, no compromise on taste.
                  Every dish that leaves our kitchen carries the warmth of South Indian
                  hospitality and the authenticity of generations-old recipes.
                </p>
              </div>
            </div>

            {/* What sets us apart */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-brown-dark mb-6">
                What Sets Us Apart
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { emoji: '🌾', title: 'Fresh Daily Batter', desc: 'Ground fresh every morning using traditional stone grinders' },
                  { emoji: '🍳', title: '30+ Dosa Varieties', desc: 'From classic to creative — the widest dosa selection in Jaipur' },
                  { emoji: '⚡', title: 'Lightning Fast Service', desc: 'Most orders prepared in under 15 minutes' },
                  { emoji: '💰', title: 'Unbeatable Value', desc: 'Premium quality food at prices everyone can enjoy' },
                  { emoji: '🧑‍🍳', title: 'Skilled Chefs', desc: 'Trained in South Indian cooking traditions' },
                  { emoji: '🚚', title: 'Quick Delivery', desc: 'Hot food delivered to your doorstep' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-brown-dark">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-brown-dark mb-3">
              Gallery
            </h2>
            <p className="text-gray-500">A glimpse into our kitchen and flavors</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-brown-dark mb-3">
            Meet Our Team
          </h2>
          <p className="text-gray-500 mb-12">The people behind every delicious plate</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { name: 'Head Chef', role: 'Master of Dosas', emoji: '👨‍🍳' },
              { name: 'Manager', role: 'Operations & Hospitality', emoji: '🧑‍💼' },
              { name: 'Kitchen Team', role: 'The Heart of Dosa Darbar', emoji: '👩‍🍳' },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-20 h-20 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.emoji}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-brown-dark">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
