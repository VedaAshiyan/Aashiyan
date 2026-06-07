import { HeartHandshake, Lightbulb } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-12 px-5 bg-[#FAFAF8]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="grid items-start gap-7 md:grid-cols-2 lg:gap-10">
          <div className="relative">
            <img
              src="/about-community-school.png"
              alt="Aashiyan community school and daycare overview"
              className="w-full rounded-3xl shadow-xl shadow-slate-200/70 border border-white object-cover"
            />
          </div>

          {/* Text side */}
          <div>
            <h2 className="font-display mb-5 whitespace-nowrap text-4xl font-black leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl">
              ABOUT US
            </h2>

            <p className="font-display mb-7 text-2xl font-bold leading-[1.05] text-slate-800 sm:text-3xl lg:text-4xl">
              <span className="sm:whitespace-nowrap">A home away from home,</span><br />
              <span className="text-sky-500 italic font-black">built on love.</span>
            </p>

            <p className="mb-5 max-w-2xl text-xl font-medium leading-relaxed text-slate-700 sm:text-2xl">
              <strong className="text-slate-800">Aashiyan</strong> — At Aashiyan, we believe every child deserves a place to learn, grow, and feel safe. Many children of migrant workers are left out of formal education due to language barriers, lack of documents like Aadhaar cards, or constant relocation.


            </p>

            <p className="mb-4 max-w-2xl text-xl font-medium leading-relaxed text-slate-700 sm:text-2xl">
              Aashiyan was created to give these children a space to sit, learn, and belong. Along with basic education, we focus on discipline, life skills, confidence, and creating a nurturing environment where every child feels seen and valued.


            </p>
          </div>

          <div className="grid gap-5 md:col-span-2 md:-mt-10 md:grid-cols-2 lg:-mt-14">
            <div className="group relative overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-sm shadow-sky-100/70">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-200/25" />
              <div className="relative flex h-full flex-col gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-400 text-white shadow-lg shadow-sky-200">
                  <HeartHandshake size={25} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="mb-2 text-lg font-black text-slate-900">Our Mission</div>
                  <p className="text-base font-medium leading-relaxed text-slate-700">
                    To provide a safe, inclusive, and nurturing space through education, care, nutrition, and emotional support.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-yellow-50 p-6 shadow-sm shadow-amber-100/70">
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-200/30" />
              <div className="relative flex h-full flex-col gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-white shadow-lg shadow-amber-200">
                  <Lightbulb size={25} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="mb-2 text-lg font-black text-slate-900">Our Vision</div>
                  <p className="text-base font-medium leading-relaxed text-slate-700">
                    A world where every child has access to safety, learning, dignity, and opportunities to grow.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
