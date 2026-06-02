import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/hero-aashiyan-crafts.png',
    alt: 'Children at Aashiyan holding handmade craft work',
    position: 'object-center',
  },
  {
    src: '/hero-girls-portrait.png',
    alt: 'Two children smiling at Aashiyan',
    position: 'object-[center_25%]',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 pt-32 pb-24"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover ${slide.position} transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/70 via-slate-900/55 to-amber-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-7 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Community School &amp; Daycare for Migrant Children
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-7 animate-fade-in-up animate-delay-100">
          A Safe Space to<br />
          <span className="text-amber-300 font-black">Learn, Grow</span>
          <br />
          &amp; Dream
        </h1>

        <p className="text-white/85 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200">
          Supporting the children of migrant workers with education, meals,
          care, and community — because every child deserves a warm place to belong.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
          <a
            href="/#donate"
            className="bg-amber-400 hover:bg-amber-500 text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:shadow-xl hover:-translate-y-1 shadow-lg text-center"
          >
            Donate Now
          </a>
          <a
            href="/#getinvolved"
            className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white/40 hover:border-white/60 text-white font-bold text-base px-8 py-4 rounded-full transition-all hover:-translate-y-1"
          >
            Volunteer With Us
          </a>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#FAFAF8"/>
        </svg>
      </div>
    </section>
  );
}
