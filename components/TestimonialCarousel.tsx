'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCarouselProps {
  initialTestimonials?: Testimonial[];
}

export default function TestimonialCarousel({ initialTestimonials }: TestimonialCarouselProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials || []);
  const [loading, setLoading] = useState(!initialTestimonials);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (initialTestimonials) return;

    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, [initialTestimonials]);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-brown-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-white" />
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 sm:py-20 bg-brown-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-white mb-2">
          What Our Customers Say
        </h2>
        <p className="text-saffron-light mb-12">Real reviews from real food lovers</p>

        <div className="relative">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/10 min-h-[220px] flex flex-col justify-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < testimonials[current].rating
                      ? 'fill-saffron-light text-saffron-light'
                      : 'text-gray-500'
                  }
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-6 italic">
              &ldquo;{testimonials[current].comment}&rdquo;
            </p>

            {/* Author */}
            <div>
              <div className="font-semibold text-white">
                {testimonials[current].name}
              </div>
              <div className="text-sm text-gray-400">
                {new Date(testimonials[current].date).toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 bg-saffron hover:bg-saffron-dark text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 bg-saffron hover:bg-saffron-dark text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? 'bg-saffron' : 'bg-white/20'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
