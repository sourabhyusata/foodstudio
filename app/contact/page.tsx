'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brown-dark to-brown py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-white mb-3">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg">
            We&apos;d love to hear from you — questions, feedback, or catering inquiries
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 mb-6">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="text-saffron font-medium hover:text-saffron-dark transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brown-dark mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brown-dark mb-1.5">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 97851 32125"
                          className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">
                        Message *
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we help you?"
                        rows={5}
                        className="w-full px-4 py-3 border border-cream-dark rounded-lg focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-saffron hover:bg-saffron-dark text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-brown-dark mb-6">
                  Get in Touch
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-saffron" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-brown-dark">Address</h4>
                      <p className="text-gray-500 text-sm mt-0.5">
                        Dosa Darbar, Ajmer Highway,<br />
                        Jaipur, Rajasthan 302001, India
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="text-saffron" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-brown-dark">Phone</h4>
                      <a href="tel:+919785132125" className="text-gray-500 text-sm hover:text-saffron mt-0.5 block">
                        +91 97851 32125
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="text-saffron" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-brown-dark">Email</h4>
                      <a href="mailto:hello@dosadarbar.in" className="text-gray-500 text-sm hover:text-saffron mt-0.5 block">
                        hello@dosadarbar.in
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="text-saffron" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-brown-dark">Operating Hours</h4>
                      <p className="text-gray-500 text-sm mt-0.5">
                        Every day: 8:00 AM – 11:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/919785132125?text=Hi%20Dosa%20Darbar!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-leaf-green text-white p-4 rounded-xl hover:bg-leaf-dark transition-colors"
                >
                  <MessageCircle size={22} />
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-xs text-green-100">Chat with us</div>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/explore/locations/1491334574210545/dosa-darbar/recent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Instagram size={22} />
                  <div>
                    <div className="font-medium">Instagram</div>
                    <div className="text-xs text-pink-100">Follow us</div>
                  </div>
                </a>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-sm h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d75.7!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDosa%20Darbar%2C%20Ajmer%20Highway%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dosa Darbar on Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
