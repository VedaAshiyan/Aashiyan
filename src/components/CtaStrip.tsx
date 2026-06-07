import { GOOGLE_FORM_URL } from '../lib/contactLinks';

export default function CtaStrip() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-sky-500 py-12 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug mb-6">
          Every child deserves safety, learning, and hope.<br />
          <span className="text-amber-200">Join us in making a difference.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#donate"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-amber-400 px-8 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg sm:w-auto"
          >
            Donate Now
          </a>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-white/40 bg-white/15 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/25 sm:w-auto"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
