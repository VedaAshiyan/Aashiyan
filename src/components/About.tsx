import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-24 px-5 bg-[#FAFAF8]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <img
              src="/about-community-school.png"
              alt="Aashiyan community school and daycare overview"
              className="w-full rounded-3xl shadow-xl shadow-slate-200/70 border border-white object-cover"
            />
          </div>

          {/* Text side */}
          <div>
            <div className="inline-block bg-amber-50 text-amber-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
              About Us
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-6">
              A home away from home,<br />
              <span className="text-sky-500 italic">built on love.</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed mb-5">
              <strong className="text-slate-800">Aashiyan</strong> — At Aashiyan, we believe every child deserves a place to learn, grow, and feel safe. Many children of migrant workers are left out of formal education due to language barriers, lack of documents like Aadhaar cards, or constant relocation.


            </p>

            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Aashiyan was created to give these children a space to sit, learn, and belong. Along with basic education, we focus on discipline, life skills, confidence, and creating a nurturing environment where every child feels seen and valued.


            </p>

            <div className="bg-sky-50 rounded-2xl px-6 py-4 mb-8 border-l-4 border-sky-400">
              <div className="text-slate-800 text-sm font-bold mb-1">Our Mission</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                To provide a safe, inclusive, and nurturing space for children from underserved communities through education, care, nutrition, and emotional support, helping them move towards mainstream learning and a better future.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl px-6 py-4 border-l-4 border-amber-400">
              <div className="text-slate-800 text-sm font-bold mb-1">Our Vision</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                A world where every child, regardless of background or circumstance, has access to safety, learning, dignity, and opportunities to grow with confidence and hope.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-sky-50 rounded-2xl px-5 py-4">
                <span className="text-2xl">🌱</span>
                <div>
                  <div className="text-slate-800 font-bold text-sm">Community-Led</div>
                  <div className="text-slate-500 text-xs">Rooted in local care</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 rounded-2xl px-5 py-4">
                <span className="text-2xl">🤝</span>
                <div>
                  <div className="text-slate-800 font-bold text-sm">NGO Registered</div>
                  <div className="text-slate-500 text-xs">Transparent &amp; trusted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
