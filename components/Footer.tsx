import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-saffron via-curry-red to-saffron" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Dosa Darbar Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-[family-name:var(--font-display)] text-2xl">
                Dosa Darbar
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bringing authentic South Indian flavors to the heart of Rajasthan.
              Fresh batter daily, 30+ dosa varieties, and a whole lot of love on
              every plate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-4 text-saffron-light">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Our Menu' },
                { href: '/order', label: 'Order Online' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-saffron-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-4 text-saffron-light">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-saffron shrink-0" />
                <span>Ajmer Highway, Jaipur, Rajasthan 302001, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-saffron shrink-0" />
                <a href="tel:+919785132125" className="hover:text-saffron-light">
                  +91 97851 32125
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-saffron shrink-0" />
                <a href="mailto:hello@dosadarbar.in" className="hover:text-saffron-light">
                  hello@dosadarbar.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-saffron shrink-0" />
                <span>Open Daily: 8:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Social & Links */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-4 text-saffron-light">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/explore/locations/1491334574210545/dosa-darbar/recent/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-saffron transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.zomato.com/jaipur/dosa-darbar-1-ajmer-highway"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-saffron transition-colors"
                aria-label="Zomato"
              >
                <span className="font-bold text-sm">Z</span>
              </a>
            </div>
            <a
              href="https://wa.me/919785132125?text=Hi%20Dosa%20Darbar!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-leaf-green hover:bg-leaf-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.768-6.258-2.066l-.438-.332-3.275 1.098 1.098-3.275-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dosa Darbar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
