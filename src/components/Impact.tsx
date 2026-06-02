import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Users, UtensilsCrossed, Shield, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 55,
    suffix: '+',
    label: 'Kids',
    description: 'Across 3 locations in the city',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    iconBg: 'bg-sky-100',
  },
  {
    icon: UtensilsCrossed,
    value: 400,
    suffix: '',
    label: 'Meals',
    description: 'Hot, nutritious meals every day',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Shield,
    value: 1,
    suffix: ' Safe Space',
    label: 'Safe Learning Space',
    description: 'A warm nest for every child',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: Globe,
    value: 30,
    suffix: '+',
    label: 'Volunteers and Supporters',
    description: 'Neighbours who show up with love',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    iconBg: 'bg-rose-100',
  },
];

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const { ref, visible } = useScrollReveal(0.2);
  const count = useCounter(stat.value, visible);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className={`${stat.bg} rounded-3xl p-7 text-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className={`${stat.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
        <Icon size={24} className={stat.color} />
      </div>
      <div className={`font-display text-4xl font-bold ${stat.color} mb-1`}>
        {stat.value >= 1000
          ? `${(count / 1000).toFixed(count >= stat.value ? 0 : 1)}k`
          : stat.value === 1
          ? count
          : count}
        <span className="text-2xl">{stat.suffix}</span>
      </div>
      <div className="text-slate-800 font-bold text-base mb-1">{stat.label}</div>
      <div className="text-slate-500 text-sm">{stat.description}</div>
    </div>
  );
}

export default function Impact() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="impact" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Our Impact
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Small numbers. Enormous lives.
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Each number below is a child who ate, learned, laughed, and felt safe — because of you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* Founder Section */}
        <div className="mt-20 overflow-hidden rounded-[2rem] bg-[#F7F3EF] border border-slate-100 shadow-sm">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] min-h-[520px]">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-sky-600 text-xs font-bold mb-7 tracking-widest uppercase">
                A Message From Our Founder
              </div>
              <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.95] mb-6 uppercase">
                Safe Space.
                <span className="block">Bright Futures.</span>
                <span className="block">Every Child.</span>
              </h3>
              <p className="max-w-xl text-slate-700 text-base sm:text-lg leading-relaxed mb-8">
                Years ago, I dreamt of creating a safe and happy space for children of migrant
                workers; a place where they could learn, play, laugh, feel heard, and simply be
                children.
              </p>
              <p className="max-w-xl text-slate-600 text-base leading-relaxed mb-8">
                What began with one room, one teacher, a few children, and a lot of hope has grown
                through consistency, trust, and the kindness of people who believed in the dream.
              </p>
              <div className="space-y-3">
                <div className="font-display text-2xl font-bold text-slate-900">
                  Vedaprana Purkayastha
                </div>
                <div className="text-slate-700 font-bold text-sm tracking-wide uppercase">
                  Founder & Visionary
                </div>
                <div className="text-slate-500 text-sm font-medium">
                  M.A. Psychology | M.Sc. Statistics | B.Ed
                </div>
              </div>
            </div>

            <div className="bg-sky-500 p-8 sm:p-10 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100 shadow-xl border border-sky-400">
                <img
                  src="/founder-vedaprana-clean.png"
                  alt="Vedaprana Purkayastha - Founder"
                  className="w-full aspect-[4/5] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
