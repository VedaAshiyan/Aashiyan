import { ArrowLeft, BookOpen, Smile, Apple, Heart, Clock, CheckCircle } from 'lucide-react';

export type ServiceType = 'education' | 'daycare' | 'nutrition' | 'wellbeing';

interface ServiceDetail {
  title: string;
  icon: typeof BookOpen;
  shortDesc: string;
  fullDesc: string;
  ageGroup: string;
  highlights: string[];
  impact: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  coverImage: string;
  coverImagePosition?: string;
}

const serviceDetails: Record<ServiceType, ServiceDetail> = {
  education: {
    title: 'Education',
    icon: BookOpen,
    shortDesc: 'Basic education for children aged 4-9 years',
    fullDesc: `We provide foundational education specifically for children who are unable to access mainstream schooling due to language barriers, lack of documents, or constant relocation. Our approach is child-centered and flexible.

Every child learns at their own pace. We customize teaching methods based on current level and gradually help them move forward with confidence. We focus not just on academics, but on building discipline, curiosity, and a love for learning.

Our curriculum includes:
- Basic literacy and numeracy
- Language development (local and Hindi)
- Life skills and communication
- Creative thinking and problem-solving
- Social and emotional learning

Teachers are trained to be patient, nurturing, and responsive to each child's unique learning style.`,
    ageGroup: '4-9 years',
    highlights: [
      'Customized pace-based learning',
      'Trained and caring teachers',
      'Focus on confidence and discipline',
      'Curriculum adapted to migrant children\'s needs',
      'Play-based learning for younger kids',
      'Bridging to mainstream schooling',
    ],
    impact: 'Children gain foundational skills, confidence in learning, and are better prepared to transition to regular schools.',
    bgColor: 'bg-sky-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    coverImage: '/education-cover.png',
    coverImagePosition: 'object-[center_35%]',
  },
  daycare: {
    title: 'Day Care',
    icon: Smile,
    shortDesc: 'Safe, nurturing care for younger siblings aged 1.5-3.5 years',
    fullDesc: `Many of our students come to Aashiyan with younger siblings. While older kids learn, these little ones need supervision and care. Our daycare is designed to be a safe, loving environment where young children can grow.

We provide:
- Safe, supervised space with trained caregivers
- Play-based learning activities
- Early childhood development support
- Age-appropriate sensory and motor activities
- Healthy snacks and water throughout the day
- Emotional comfort and attachment-building

Our caregivers understand early childhood development and create an environment where children feel secure while exploring, playing, and learning.`,
    ageGroup: '1.5-3.5 years',
    highlights: [
      'Safe, supervised environment',
      'Trained caregivers',
      'Play-based learning',
      'Early development support',
      'Healthy snacks provided',
      'Emotional attachment and comfort',
    ],
    impact: 'Young children develop in a safe space while parents work. Older siblings can focus on education without worry.',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    coverImage: '/daycare-children-new.png',
    coverImagePosition: 'object-[center_25%]',
  },
  nutrition: {
    title: 'Nutrition',
    icon: Apple,
    shortDesc: 'Freshly prepared, healthy meals for every child every day',
    fullDesc: `Good nutrition is essential for learning, growth, and development. Many children at Aashiyan don't have access to regular, healthy meals at home. We believe a well-fed child is a learning child.

Every day we provide:
- Freshly cooked lunch prepared with fresh ingredients
- Nutritious morning and evening snacks
- Meals designed by nutrition experts
- Special attention to dietary needs and preferences
- Clean, hygienic food preparation

Our nutrition program ensures:
- Balanced meals with proteins, vegetables, and grains
- Culturally familiar foods that children enjoy
- Consistent, reliable meals every day
- Growth monitoring for each child
- Education on healthy eating habits`,
    ageGroup: 'All children (1.5 years+)',
    highlights: [
      'Fresh, home-cooked meals daily',
      'Nutritionally balanced',
      'Hygienically prepared',
      'Morning and evening snacks',
      'Growth monitoring',
      'Teaches healthy eating habits',
    ],
    impact: 'Children are better nourished, more energetic, and able to focus on learning. Growth and health improve visibly.',
    bgColor: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    coverImage: '/nutrition-children-new.jpeg',
    coverImagePosition: 'object-[center_30%]',
  },
  wellbeing: {
    title: 'Mental & Physical Well-being',
    icon: Heart,
    shortDesc: 'Emotional support, healthcare, and holistic development',
    fullDesc: `A child can only learn well when they feel safe, healthy, and emotionally supported. We recognize that children from migrant families often face trauma, stress, and instability. We have dedicated support.

Our wellness team includes:
- In-house counselor for emotional support and talk therapy
- Visiting doctor for health check-ups and basic medical care
- Health and hygiene education
- Trauma-informed care practices
- Safe, supportive relationships with all staff

We address:
- Emotional well-being and mental health
- Physical health and growth
- Hygiene and self-care habits
- Building resilience and coping skills
- Creating a sense of safety and belonging
- Family counseling when needed

Every child is seen as a whole person, not just a student.`,
    ageGroup: 'All children',
    highlights: [
      'In-house counselor available',
      'Regular health check-ups',
      'Trauma-informed practices',
      'Hygiene and health education',
      'Safe, supportive relationships',
      'Focus on emotional resilience',
    ],
    impact: 'Children feel safe and supported. Emotional barriers to learning are reduced. Health improves and children thrive.',
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    coverImage: '/wellbeing-cover.png',
    coverImagePosition: 'object-[center_30%]',
  },
};

export default function WhatWeDoDetail({
  service,
  onBack,
}: {
  service: ServiceType;
  onBack: () => void;
}) {
  const details = serviceDetails[service];
  const Icon = details.icon;

  return (
    <section className="bg-[#FAFAF8] pt-40 sm:pt-44 pb-16 px-5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="relative z-10 inline-flex items-center gap-2 bg-white text-slate-600 hover:text-sky-700 hover:bg-sky-50 text-sm font-bold px-5 py-3 rounded-full shadow-sm border border-slate-200 mb-8 transition-all"
        >
          <ArrowLeft size={16} />
          Back to What We Do
        </button>

        {/* Cover image */}
        <div className="rounded-3xl overflow-hidden shadow-lg mb-10">
          <img
            src={details.coverImage}
            alt={details.title}
            className={`w-full aspect-[3/4] object-cover ${details.coverImagePosition || 'object-center'}`}
          />
        </div>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <div className={`${details.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon size={32} className={details.iconColor} />
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
              {details.title}
            </h1>
            <p className="text-slate-500 text-lg">{details.shortDesc}</p>
          </div>
        </div>

        {/* Age group */}
        <div className="bg-white rounded-2xl border border-slate-100 px-6 py-4 mb-10 inline-flex items-center gap-3">
          <Clock size={18} className="text-slate-400" />
          <div>
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Age Group</span>
            <div className="text-slate-800 font-bold text-lg">{details.ageGroup}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 px-7 py-8 sm:px-10 sm:py-10 mb-10">
          <div className="space-y-5 font-sans">
            {details.fullDesc.split('\n').map((paragraph, i) => {
              if (!paragraph.trim()) return null;

              if (paragraph.startsWith('- ')) {
                return (
                  <div key={i} className="flex items-start gap-3 pl-2">
                    <CheckCircle size={17} className={`${details.iconColor} mt-1 flex-shrink-0`} />
                    <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                      {paragraph.replace('- ', '')}
                    </p>
                  </div>
                );
              }

              return (
                <p key={i} className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-10">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
            What We Provide
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {details.highlights.map((h, i) => (
              <div
                key={i}
                className={`${details.bgColor} rounded-2xl px-6 py-5 flex items-center gap-4 border border-white shadow-sm`}
              >
                <CheckCircle size={22} className={`${details.iconColor} flex-shrink-0`} />
                <span className="font-sans text-slate-800 font-semibold text-base leading-snug">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Impact section */}
        <div className={`${details.bgColor} rounded-3xl border-l-4 border-sky-400 px-8 py-7 shadow-sm`}>
          <h3 className="font-sans text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Impact
          </h3>
          <p className="font-sans text-slate-700 text-lg leading-relaxed">{details.impact}</p>
        </div>
      </div>
    </section>
  );
}
