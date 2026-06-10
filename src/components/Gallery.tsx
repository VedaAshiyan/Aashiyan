import { useState } from 'react';
import { ArrowUp, Images } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  span?: string;
  created_at: string;
}

const momentPhotos: GalleryPhoto[] = [
  {
    id: 'study-writing',
    src: '/daily-life/daily-life-04.png',
    alt: 'Child writing carefully in a notebook at Aashiyan',
    caption: 'Writing with focus',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'block-learning',
    src: '/daily-life/daily-life-11.png',
    alt: 'Child building with colorful blocks at Aashiyan',
    caption: 'Play that teaches',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'early-learning',
    src: '/daily-life/daily-life-15.png',
    alt: 'Young child stacking colorful blocks at Aashiyan',
    caption: 'Creative Minds at Work',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'craft-learning',
    src: '/daily-life/daily-life-08.png',
    alt: 'Children showing handmade classroom craft at Aashiyan',
    caption: 'Hands-on learning',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'smiling-child',
    src: '/daily-life/daily-life-01.png',
    alt: 'Smiling child at Aashiyan',
    caption: 'Joyful moments',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'chair-portrait',
    src: '/daily-life/daily-life-02.png',
    alt: 'Young child smiling at Aashiyan',
    caption: 'Bright beginnings',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'two-girls',
    src: '/daily-life/daily-life-03.png',
    alt: 'Two girls seated in the Aashiyan classroom',
    caption: 'Together at Aashiyan',
    span: 'md:col-span-2',
    created_at: '',
  },
  {
    id: 'friends-smiling',
    src: '/daily-life/daily-life-05.png',
    alt: 'Two children smiling together at Aashiyan',
    caption: 'Friendship and care',
    span: 'md:col-span-2',
    created_at: '',
  },
  {
    id: 'craft-group',
    src: '/daily-life/daily-life-06.png',
    alt: 'Children holding colorful handmade paper crafts',
    caption: 'Proud creations',
    span: 'md:col-span-1 md:row-span-2',
    created_at: '',
  },
  {
    id: 'three-girls',
    src: '/daily-life/daily-life-07.png',
    alt: 'Three girls standing together at Aashiyan',
    caption: 'Community and care',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'close-smiles',
    src: '/daily-life/daily-life-09.png',
    alt: 'Two smiling children in the Aashiyan classroom',
    caption: 'Smiles in class',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: 'sticker-hands',
    src: '/daily-life/daily-life-10.png',
    alt: 'Children showing stickers on their hands',
    caption: 'Little joys',
    span: 'md:col-span-1',
    created_at: '',
  },

];

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const educationPhotoIds = ['study-writing', 'block-learning', 'early-learning', 'craft-learning'];
  const educationPhotos = educationPhotoIds
    .map((id) => momentPhotos.find((photo) => photo.id === id))
    .filter((photo): photo is GalleryPhoto => Boolean(photo));
  const extraPhotos = momentPhotos.filter((photo) => !educationPhotoIds.includes(photo.id));
  const displayPhotos = showAll ? [...educationPhotos, ...extraPhotos] : educationPhotos;
  const { ref, visible } = useScrollReveal();

  return (
    <section id="gallery" className="relative overflow-hidden py-12 px-5 bg-gradient-to-b from-amber-50 via-white to-sky-50">
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display mb-5 text-4xl font-black leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl">
            Daily Life at Aashiyan
          </h2>
          <p className="font-display mb-6 text-2xl font-bold leading-[1.05] text-slate-800 sm:text-3xl lg:text-4xl">
            Moments that matter
          </p>
          <p className="text-slate-600 text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed">
            Every day at Aashiyan is filled with laughter, learning, and the joy of being cared for.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {displayPhotos.map((p, i) => (
            <GalleryItem key={p.id} photo={p} delay={i * 100} compact={!showAll} />
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-base font-black text-white shadow-lg shadow-slate-300/60 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl sm:w-auto"
            >
              <Images size={20} />
              Click and see more
            </button>
          </div>
        )}

        {showAll && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                setShowAll(false);
                window.requestAnimationFrame(() => {
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                });
              }}
              className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-black text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:text-amber-600 hover:shadow-md sm:w-auto"
            >
              <ArrowUp size={20} />
              Show fewer images
            </button>
          </div>
        )}

        {/* Quote below gallery */}
        <div className="mt-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-amber-100/60 border border-white px-8 py-8 text-center max-w-2xl mx-auto">
          <p className="font-display mb-4 text-xl font-bold italic leading-relaxed text-slate-800">
            "When a child walks into Aashiyan, they leave their worries at the door and carry hope on their shoulders."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-amber-300" />
            <span className="text-slate-400 text-sm font-semibold">Sowmya Ma'am, Lead Teacher</span>
            <div className="w-8 h-px bg-amber-300" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  photo,
  delay,
  compact,
}: {
  photo: GalleryPhoto;
  delay: number;
  compact: boolean;
}) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative group overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl shadow-slate-200/70 transition-all duration-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-100 ${
        compact ? 'md:col-span-1' : photo.span || 'md:col-span-1'
      } ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="h-80 w-full object-contain object-center brightness-110 saturate-125 contrast-105 transition-transform duration-500 group-hover:scale-[1.02] md:h-full"
        style={{ minHeight: compact ? '340px' : '360px' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 opacity-100 transition-all duration-300">
        <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1.5 rounded-full shadow-sm">
          {photo.caption}
        </span>
      </div>
    </div>
  );
}
