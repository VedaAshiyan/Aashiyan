import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import BlogDetail from './BlogDetail';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  author_name: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

type View = 'list' | 'detail';

function scrollToStoriesSection() {
  window.requestAnimationFrame(() => {
    const blogSection = document.getElementById('blog');
    if (!blogSection) return;

    const headerOffset = 96;
    const top = blogSection.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

function getBlogImagePositionClass(imageUrl: string) {
  if (imageUrl.includes('daily-life-02')) return 'object-[center_45%] sm:object-[center_30%]';
  return imageUrl.includes('menstrual-awareness-girls')
    || imageUrl.includes('story-girl-hd')
    || imageUrl.includes('migrant-workers-stairs')
    ? 'object-top'
    : 'object-center';
}

const seededStories: BlogPost[] = [
  {
    id: 'seed-mental-health-migrant-children',
    title: 'Healing Beyond Classrooms: How Aashiyan Supports the Mental Health of Young Migrant Children',
    slug: 'healing-beyond-classrooms-mental-health-young-migrant-children',
    excerpt:
      'How Aashiyan creates safe spaces where young migrant children can express fear, pain, responsibility, and silence.',
    cover_image_url: '/mental-health-classroom.jpeg',
    author_name: 'Editorial Team, Aashiyan',
    published: true,
    created_at: '2026-05-28T00:00:00.000Z',
    updated_at: '2026-05-28T00:00:00.000Z',
    content: `Every child carries a school bag.

Some also carry fear, hunger, responsibility, and silence.

At Aashiyan, many of the children we work with are from migrant worker families. Their parents leave home before sunrise for construction sites, factories, or daily wage work. Childhood, for these children, often becomes secondary.

Some arrive at school sleepy because they spent the night taking care of younger siblings. Some come without food. Some quietly cry during activities because they were beaten at home the previous night. Many have seen violence, addiction, neglect, or extreme financial stress far too early in life.

And yet, they are expected to study, smile, and behave like everything is normal.

This is why mental health support is not separate from education at Aashiyan. It is a part of it.

Our teachers and volunteers are trained to notice emotional distress in children: sudden silence, aggression, withdrawal, anxiety, frequent crying, or difficulty concentrating. Instead of punishment, we begin with conversation. Instead of labeling a child "difficult", we try to understand what the child is carrying emotionally.

Sometimes, all a child needs is a safe adult who listens without judgment.

We create safe spaces where children can talk, draw, play, and express emotions they often suppress at home. Through group activities, storytelling, art, and gentle emotional support, children slowly begin to feel seen and heard.

For many girls, the burden is even heavier. They cook, clean, care for siblings, and grow up too fast. Boys too are often taught to suppress emotions and "be strong", even when they are hurting inside.

At Aashiyan, we remind them that children deserve care too.

Mental health awareness among underprivileged children is still deeply ignored in India, especially among migrant communities. But emotional wellbeing shapes confidence, learning ability, relationships, and future stability.

A hungry child may still study.

A frightened child often cannot.

Healing begins when children feel safe.

And sometimes, that healing starts with something as simple as someone asking, "What happened?" and truly listening.`,
  },
  {
    id: 'seed-menstrual-awareness-girls',
    title: 'Breaking the Silence: How Aashiyan Creates Menstrual Awareness Among Girl Students',
    slug: 'breaking-the-silence-menstrual-awareness-girl-students',
    excerpt:
      'How safe conversations, menstrual hygiene education, and emotional support help girls move from fear and silence to confidence and dignity.',
    cover_image_url: '/menstrual-awareness-girls.jpeg',
    author_name: 'Editorial Team, Aashiyan',
    published: true,
    created_at: '2026-05-28T00:00:00.000Z',
    updated_at: '2026-05-28T00:00:00.000Z',
    content: `It usually begins with silence.

A girl confused about her first period. A question she is too afraid to ask. Fear of stains, judgment, or even going to school during menstruation.

At Aashiyan, we work closely with girls from communities where periods are still treated as taboo. Many enter puberty without proper menstrual health education, and that lack of awareness often creates shame, fear, and confusion.

That is why menstrual awareness for girls has become an important part of our work.

Instead of formal lectures, we create safe and honest conversations. Girls sit together with mentors they trust and talk openly about puberty, body changes, emotional health, and menstruation in a language they understand.

We explain what menstruation is, why periods happen, how to maintain menstrual hygiene, and when symptoms may need medical attention. No question is ignored, because every doubt matters to a young girl experiencing this change for the first time.

Our menstrual hygiene awareness sessions also focus on confidence and dignity. Girls learn how to use sanitary pads, maintain hygiene during periods, and understand that menstruation is natural, not something shameful.

For many underprivileged girl students, access to sanitary products is also difficult. At Aashiyan, we try to ensure menstrual hygiene products are available whenever needed, so no child misses school because of her period.

Over time, the changes become visible. Girls start asking questions openly. School attendance improves. Confidence grows. Many even begin educating other girls around them.

At Aashiyan, menstrual health education is not a one-time workshop. It is an ongoing effort to empower girls through awareness, health education, and emotional support.

Because periods should never stand between a girl and her dreams.

## Why Menstrual Awareness Matters

Menstrual hygiene awareness among adolescent girls is essential for improving health, education, and self-esteem.

At Aashiyan, we believe every girl deserves:

- Access to menstrual hygiene education
- Safe conversations around puberty and periods
- Affordable sanitary products
- The confidence to ask questions without shame
- The right to continue education without interruption`,
  },
  {
    id: 'seed-lata-story',
    title: 'The Girl Who Chose a Story Over Silence',
    slug: 'the-girl-who-chose-a-story-over-silence',
    excerpt:
      'A story of Lata, Ruby teacher, and how a single book can become a bridge toward equal childhoods and brighter futures.',
    cover_image_url: '/daily-life/daily-life-02.png',
    author_name: 'Meghangee Chakraborty, B.A. Student, Christ University',
    published: true,
    created_at: '2026-05-24T00:00:00.000Z',
    updated_at: '2026-05-24T00:00:00.000Z',
    content: `Dust particles danced in the only beam of light that entered the tiny room. The sun pierced through the gaps in the tin roof, replacing what should have been tube lights. Lata traced the cracked, mismatched floor patterns with her bare toe while the constant hum of Bengaluru echoed outside. Across the narrow alley, her father's hammer struck iron rods at a construction site, each blow carrying a rhythm that shook the walls of their fragile home.

Inside, there was little space to move. A rolled mat in one corner. A steel plate drying against the wall. The smell of cement dust lingering in the air.

A soft knock broke the silence.

The cloth flap at the doorway shifted and Ruby teacher stepped in, ducking slightly beneath the low frame. Her bright sari brought color into the dull room, and the faint fragrance of jasmine followed her.

"Lata, you were not at the learning center today," Ruby said gently.

Lata tightened her grip around a worn wooden bird whose wings had been smoothed by years of touch.

"My mother needed me," she murmured, lowering her eyes.

Ruby stepped closer and sat beside her. "A new storybook arrived today," she said with a smile. "It is about a girl who builds bridges."

Lata looked up. "Bridges?"

"Yes," Ruby nodded. "Big, strong bridges. Like the ones your father helps build. But hers are built with words, dreams, and education."

From her bag, Ruby pulled out a colorful picture book and held it toward her.

Lata's eyes shifted between the book and the doorway where the sounds of the city pulled her back toward responsibility. Like thousands of children of migrant workers in Bengaluru, childhood for her often meant caring for siblings, helping at home, and growing up too soon.

The wooden bird in her hand suddenly felt heavier.

"Will the book wait?" she asked softly.

Ruby smiled.

"Books always wait. But the stories inside them like to be heard."

Slowly, Lata reached out. Her fingers brushed against the smooth cover of the book. For a moment, the noise outside faded away.

In its place came something rare for children growing up on construction sites and temporary settlements: possibility.

At Aashiyan, this is the reality for many children of migrant workers. Access to education, safe spaces, nutrition, and emotional support can transform not just a child's future, but generations to come. Every story heard, every page turned, becomes a bridge toward equal childhoods and brighter futures.`,
  },
  {
    id: 'seed-migrant-workers-bangalore',
    title: 'Migrant Workers in Bangalore',
    slug: 'migrant-workers-in-bangalore',
    excerpt:
      'Bengaluru runs on migrant labour, but many migrant children remain invisible inside the same city. This is why Aashiyan exists.',
    cover_image_url: '/migrant-workers-stairs.jpeg',
    author_name: 'Editorial Team, Aashiyan',
    published: true,
    created_at: '2026-05-24T00:00:00.000Z',
    updated_at: '2026-05-24T00:00:00.000Z',
    content: `Though there is no exact official number because Bengaluru has never had a full migrant worker census, most studies and government estimates suggest that migrant workers form a very large part of the city's population.

Here is the clearest picture available:

- Karnataka CM Siddaramaiah recently said migrants make up nearly 40% of Bengaluru's population.
- Bengaluru's population is around 14-15 million today.
- That means the broader migrant population could be roughly 5-6 million people.
- Out of this, estimates for low-income and interstate migrant workers, including construction workers, delivery workers, factory workers, domestic workers, gig workers, and daily wage earners, are usually placed around 1.5-3 million people, though exact numbers are unavailable.

## Children and schooling

Studies consistently show that children of migrant workers are among the most excluded from education in Bengaluru.

Key findings:

- A national study on migrant workers' children found that around 40% of children of migrant workers were not going to school.
- Another Bengaluru-focused study on migrant construction workers found about 12.3% dropout rates among migrant children surveyed.
- Karnataka's education department reported that in Bengaluru alone, 3,852 children dropped out of school recently, with migration being a major reason.

If we apply even conservative estimates, Bengaluru may have about 300,000-500,000 children from migrant worker families. If 25-40% are out of school or irregular, then roughly 75,000 to 200,000 migrant children may currently be missing regular schooling in Bengaluru.

The biggest reasons are:

- Parents shifting worksites frequently
- Lack of documents
- Language barriers
- Children helping with sibling care or labour
- No nearby affordable schools or creches
- Unstable housing around construction sites

What is heartbreaking is that Bengaluru runs on migrant labour, but migrant children often grow up invisible inside the same city.

This is where Aashiyan wants to make a difference.

Located in and around Electronic City, Aashiyan aims to create a safe learning space for children of migrant workers; a place where they can study, play, receive nutritious food, and experience emotional safety despite unstable living conditions.

Because education is not just about classrooms. It is about continuity, belonging, care, and the right to a childhood.`,
  },
];

export default function Blog() {
  const [view, setView] = useState<View>('list');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const { ref, visible } = useScrollReveal();
  const displayStories = seededStories;

  useEffect(() => {
    if (view === 'detail') {
      scrollToStoriesSection();
    }
  }, [view, selectedBlog?.id]);

  function openDetail(blog: BlogPost) {
    setSelectedBlog(blog);
    setView('detail');
  }

  function goBack() {
    setView('list');
    setSelectedBlog(null);
  }

  if (view === 'detail' && selectedBlog) {
    return <BlogDetail blog={selectedBlog} onBack={goBack} />;
  }

  return (
    <section id="blog" className="py-12 px-5 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display mb-5 text-4xl font-black leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl">
            Stories and Blogs
          </h2>
          <p className="mx-auto max-w-3xl text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
            Read moments from the children, teachers, volunteers, and community around Aashiyan.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStories.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} onClick={() => openDetail(blog)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  blog,
  index,
  onClick,
}: {
  blog: BlogPost;
  index: number;
  onClick: () => void;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  const date = new Date(blog.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onClick}
      className={`group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Cover image */}
      {blog.cover_image_url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className={`w-full h-full object-cover ${getBlogImagePositionClass(blog.cover_image_url)} group-hover:scale-105 transition-transform duration-500`}
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center">
          <BookOpen size={36} className="text-sky-300" />
        </div>
      )}

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {blog.author_name}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="mb-5 line-clamp-3 text-lg font-medium leading-relaxed text-slate-800">
            {blog.excerpt}
          </p>
        )}

        {/* Read more */}
        <span className="inline-flex items-center gap-1 text-amber-500 text-sm font-semibold group-hover:gap-2 transition-all">
          Read more
          <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
