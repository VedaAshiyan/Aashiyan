import { useEffect, useState } from 'react';

const slides = [
  {
    src: '/hero-girls-portrait.png',
    alt: 'Two girls from Aashiyan standing together',
    imageClass: 'object-cover object-[center_16%] lg:object-[center_18%]',
    mobileImageClass: 'object-cover object-[center_32%]',
  },
  {
    src: '/hero-aashiyan-crafts.png',
    alt: 'Children at Aashiyan holding handmade paper craft',
    imageClass: 'object-cover object-center',
    mobileImageClass: 'object-cover object-[center_38%]',
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
      className="relative mt-[84px] overflow-hidden bg-[#F7F8FA] sm:mt-[92px] lg:mt-[88px] lg:min-h-[calc(100vh-88px)] lg:px-5 lg:py-0"
    >
      <div className="relative min-h-[calc(100svh-84px)] overflow-hidden sm:min-h-[calc(100svh-92px)] lg:hidden">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full brightness-110 saturate-125 transition-opacity duration-700 ${slide.mobileImageClass} ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/35" />

        <div className="relative z-10 flex min-h-[calc(100svh-84px)] flex-col justify-start px-5 pt-[24rem] sm:min-h-[calc(100svh-92px)] sm:px-6 sm:pt-[25rem]">
          <h1 className="font-display max-w-none text-[clamp(1.95rem,9vw,3rem)] font-bold leading-[0.98] tracking-normal text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">
            <span className="whitespace-nowrap">A Safe Space to</span>
            <br />
            <span className="font-black text-amber-300">Learn, Grow</span>
            <br />
            &amp; Dream
          </h1>
          <div className="mt-5 h-1.5 w-full max-w-[20rem] bg-[#df6f5b]" />
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
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

      <div className="mx-auto hidden max-w-7xl items-center gap-10 lg:grid lg:min-h-[calc(100vh-88px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="relative z-10 max-w-xl pt-4 text-center sm:text-left lg:pt-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-sky-700 ring-1 ring-sky-100">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Community School &amp; Daycare
          </div>

          <h1 className="font-display mb-6 text-5xl font-bold leading-[0.98] tracking-normal text-slate-950 sm:text-6xl md:text-7xl lg:text-[4.55rem] xl:text-[5.25rem]">
            <span className="whitespace-nowrap">A Safe Space to</span>
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

        <div className="relative min-h-[320px] lg:min-h-0">
          <div className="absolute -inset-y-14 left-8 right-[-25vw] hidden bg-gradient-to-r from-[#F7F8FA] via-white/40 to-transparent lg:block" />
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-300/60 sm:aspect-[16/9] lg:rounded-[2.5rem] lg:shadow-2xl">
            {slides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 h-full w-full brightness-105 saturate-110 transition-opacity duration-700 ${slide.imageClass} ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
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
