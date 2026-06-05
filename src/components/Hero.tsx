import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/hero-girls-portrait.png',
    alt: 'Two girls from Aashiyan standing together',
    imageClass: 'object-cover object-[center_16%] lg:object-[center_18%]',
  },
  {
    src: '/hero-aashiyan-crafts.png',
    alt: 'Children at Aashiyan holding handmade paper craft',
    imageClass: 'object-contain object-center bg-white',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative mt-[92px] overflow-hidden bg-[#F7F8FA] px-5 py-14 lg:mt-[88px] lg:min-h-[calc(100vh-88px)] lg:py-0"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[calc(100vh-88px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="relative z-10 max-w-xl pt-4 text-center sm:text-left lg:pt-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-sky-700 ring-1 ring-sky-100">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Community School &amp; Daycare
          </div>

          <h1 className="font-display mb-6 text-5xl font-bold leading-[0.98] tracking-normal text-slate-950 sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
            A Safe Space to
            <br />
            <span className="font-black text-amber-400">Learn, Grow</span>
            <br />
            &amp; Dream
          </h1>

          <p className="mx-auto mb-8 max-w-lg text-base font-semibold leading-relaxed text-slate-600 sm:mx-0 sm:text-lg">
            Supporting children of migrant workers with education, meals, care, and community,
            because every child deserves a warm place to belong.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/#donate"
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-base font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-xl"
            >
              Donate Now
            </a>
            <a
              href="/#getinvolved"
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-black text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 hover:shadow-md"
            >
              Volunteer With Us
            </a>
          </div>
        </div>

        <div className="relative min-h-[380px] lg:min-h-[calc(100vh-88px)]">
          <div className="absolute -inset-y-14 left-8 right-[-25vw] hidden bg-gradient-to-r from-[#F7F8FA] via-white/80 to-transparent lg:block" />
          <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-300/60 sm:h-[520px] lg:h-[calc(100vh-88px)] lg:rounded-none lg:shadow-none">
            {slides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${slide.imageClass} ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#F7F8FA] via-transparent to-transparent lg:rounded-none" />
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show hero slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
