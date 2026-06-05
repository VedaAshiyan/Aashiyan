import { useScrollReveal } from '../hooks/useScrollReveal';
import { GOOGLE_FORM_URL } from '../lib/contactLinks';

const partners = [
  {
    name: 'The She Saga',
    logo: '/the-she-saga-logo.jpeg',
  },
  {
    name: "Veda's",
    logo: '/vedas-logo.jpeg',
  },
];

type Partner = (typeof partners)[number];

export default function Partners() {
  const { ref, visible } = useScrollReveal();

  function openGoogleForm(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="py-24 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Our Network
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Partner & supporters
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Aashiyan is stronger because of our partners who share our vision for every child.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
          {partners.map((partner, i) => (
            <PartnerCard key={partner.name} partner={partner} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-slate-600 text-base mb-5">
            Interested in partnering with Aashiyan? We'd love to hear from you!
          </p>
          <a
            href={GOOGLE_FORM_URL}
            onClick={openGoogleForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-700 p-8 flex items-center justify-center min-h-[300px] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="w-full max-w-[85%] max-h-56 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
}
