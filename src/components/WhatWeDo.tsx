import { useScrollReveal } from '../hooks/useScrollReveal';
import { BookOpen, Smile, Apple, Heart, ArrowRight } from 'lucide-react';
import type { ServiceType } from './WhatWeDoDetail';

type Offering = { key: ServiceType; icon: typeof BookOpen; title: string; desc: string; color: string; iconColor: string; iconBg: string; image?: string };

const offerings: Offering[] = [
  {
    key: 'education',
    icon: BookOpen,
    title: 'Education',
    desc: 'We provide basic education for children aged 4-9 years, especially those unable to access mainstream schooling. Every child learns at their own pace with customized teaching, building confidence, discipline, and curiosity.',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-100',
    image: '/education-cover.png',
  },
  {
    key: 'daycare',
    icon: Smile,
    title: 'Day Care',
    desc: 'We support younger siblings aged 1.5-3.5 years with a safe, nurturing environment. Children receive care, attention, play-based learning, and early childhood development support while parents work.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    image: '/daycare-children-hd.jpeg',
  },
  {
    key: 'nutrition',
    icon: Apple,
    title: 'Nutrition',
    desc: 'Good nutrition is essential for learning and growth. We provide freshly prepared lunch and daily snacks to ensure children receive healthy, nourishing meals in a consistent and caring environment.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    image: '/nutrition-children.jpeg',
  },
  {
    key: 'wellbeing',
    icon: Heart,
    title: 'Mental & Physical Well-being',
    desc: 'A child learns better when they feel safe, healthy, and emotionally supported. We have in-house counselors and doctors who regularly support emotional well-being, health, hygiene, and overall development.',
    color: 'bg-rose-50',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
    image: '/wellbeing-cover.png',
  },
];

export default function WhatWeDo({ onServiceClick }: { onServiceClick?: (service: ServiceType) => void }) {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="whatwedo" className="py-12 px-5 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display mb-5 text-4xl font-black leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl">
            Our Approach
          </h2>
          <p className="font-display mb-6 text-2xl font-bold leading-[1.05] text-slate-800 sm:text-3xl lg:text-4xl">
            What We Do
          </p>
          <p className="mx-auto max-w-3xl text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
            A complete support system designed for the whole child — mind, body, and spirit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {offerings.map((offering, i) => (
            <OfferingCard
              key={offering.title}
              offering={offering}
              index={i}
              onServiceClick={onServiceClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferingCard({
  offering,
  index,
  onServiceClick,
}: {
  offering: Offering;
  index: number;
  onServiceClick?: (service: ServiceType) => void;
}) {
  const Icon = offering.icon;
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div ref={ref}>
      <button
        onClick={() => onServiceClick?.(offering.key)}
        style={{ transitionDelay: `${index * 100}ms` }}
        className={`w-full group ${offering.color} rounded-3xl p-8 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {offering.image && (
          <div className="mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-white">
            <img
              src={offering.image}
              alt={offering.title}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className={`${offering.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
          <Icon size={24} className={offering.iconColor} />
        </div>
        <h3 className="text-slate-800 font-bold text-xl mb-3 group-hover:text-slate-900 transition-colors">{offering.title}</h3>
        <p className="mb-5 text-lg font-medium leading-relaxed text-slate-800">{offering.desc}</p>
        <span className="inline-flex items-center gap-2 text-sky-600 font-semibold text-sm group-hover:gap-3 transition-all">
          Learn More
          <ArrowRight size={16} />
        </span>
      </button>
    </div>
  );
}
