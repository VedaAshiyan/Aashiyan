import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
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
    id: '11',
    src: '/gallery/moment-11.png',
    alt: 'Children standing together at Aashiyan',
    caption: 'Together at Aashiyan',
    span: 'md:col-span-2',
    created_at: '',
  },
  {
    id: '12',
    src: '/gallery/moment-12.png',
    alt: 'Young children gathered outside the learning space',
    caption: 'Smiles in community',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '13',
    src: '/gallery/moment-13.png',
    alt: 'Children sitting together on the steps',
    caption: 'Faces of hope',
    span: 'md:col-span-1 md:row-span-2',
    created_at: '',
  },
  {
    id: '1',
    src: '/gallery/moment-01.png',
    alt: 'Child practicing writing in a workbook',
    caption: 'Learning with focus',
    span: 'md:col-span-1 md:row-span-2',
    created_at: '',
  },
  {
    id: '2',
    src: '/gallery/moment-02.png',
    alt: 'Children making colorful paper flowers together',
    caption: 'Creative hands',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '3',
    src: '/gallery/moment-03.png',
    alt: 'Children showing handmade paper flowers',
    caption: 'Proud creations',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '4',
    src: '/gallery/moment-04.png',
    alt: 'Child coloring in an activity book',
    caption: 'Color and care',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '5',
    src: '/gallery/moment-05.png',
    alt: 'Children holding handmade paper craft',
    caption: 'Together in activity',
    span: 'md:col-span-1 md:row-span-2',
    created_at: '',
  },
  {
    id: '6',
    src: '/gallery/moment-06.png',
    alt: 'Smiling child at Aashiyan',
    caption: 'A joyful pause',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '7',
    src: '/gallery/moment-07.png',
    alt: 'Child building with colorful blocks',
    caption: 'Play that teaches',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '8',
    src: '/gallery/moment-08.png',
    alt: 'Child smiling with handmade flower craft',
    caption: 'Creative confidence',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '9',
    src: '/gallery/moment-09.png',
    alt: 'Children showing handmade pencil toppers',
    caption: 'Learning together',
    span: 'md:col-span-1',
    created_at: '',
  },
  {
    id: '10',
    src: '/gallery/moment-10.png',
    alt: 'Handmade paper craft puppets on a table',
    caption: 'Handmade joy',
    span: 'md:col-span-2',
    created_at: '',
  },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const displayPhotos = [...momentPhotos, ...photos];
  const [loading, setLoading] = useState(true);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPhotos(data);
    }
    setLoading(false);
  }
  return (
    <section id="gallery" className="relative overflow-hidden py-24 px-5 bg-gradient-to-b from-amber-50 via-white to-sky-50">
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-white text-rose-500 text-xs font-bold px-5 py-2 rounded-full mb-6 tracking-widest uppercase shadow-sm ring-1 ring-rose-100">
            Daily Life at Aashiyan
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
            Moments that matter
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Every day at Aashiyan is filled with laughter, learning, and the joy of being cared for.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Masonry-style grid */}
        {!loading && displayPhotos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {displayPhotos.map((p, i) => (
              <GalleryItem key={p.id} photo={p} delay={i * 100} />
            ))}
          </div>
        )}

        {/* Quote below gallery */}
        <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-amber-100/60 border border-white px-8 py-8 text-center max-w-2xl mx-auto">
          <p className="font-display text-xl text-slate-800 italic leading-relaxed mb-4">
            "When a child walks into Aashiyan, they leave their worries at the door and carry hope on their shoulders."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-amber-300" />
            <span className="text-slate-400 text-sm font-semibold">Priya Didi, Lead Teacher</span>
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
}: {
  photo: GalleryPhoto;
  delay: number;
}) {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative group overflow-hidden rounded-3xl border-4 border-white shadow-xl shadow-slate-200/70 transition-all duration-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-100 ${photo.span || 'md:col-span-1'} ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-56 md:h-full object-cover saturate-110 contrast-105 group-hover:scale-105 transition-transform duration-500"
        style={{ minHeight: '220px' }}
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
