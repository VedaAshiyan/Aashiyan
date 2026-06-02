import { supabase } from './supabase';

export interface WishItem {
  id: string;
  name: string;
  description: string;
  quantity_needed: number;
  unit: string;
  icon: string;
  color: string;
  bg_color: string;
  is_default?: boolean;
}

export const DEFAULT_WISHLIST_ITEMS: WishItem[] = [
  {
    id: '1',
    name: 'Books & Story Books',
    description: 'Colorful picture books and story books in Hindi and English for all ages',
    quantity_needed: 0,
    unit: 'item',
    icon: '📚',
    color: 'text-sky-600',
    bg_color: 'bg-sky-50',
  },
  {
    id: '2',
    name: 'Stationery Supplies',
    description: 'Pencils, crayons, notebooks, coloring books, and drawing supplies',
    quantity_needed: 0,
    unit: 'item',
    icon: '✏️',
    color: 'text-amber-600',
    bg_color: 'bg-amber-50',
  },
  {
    id: '3',
    name: 'Educational Toys',
    description: 'Age-appropriate toys for learning, play, and development (blocks, puzzles, etc.)',
    quantity_needed: 0,
    unit: 'item',
    icon: '🧩',
    color: 'text-rose-600',
    bg_color: 'bg-rose-50',
  },
  {
    id: '4',
    name: 'Clothes & Shoes',
    description: 'School uniforms, shoes, and seasonal clothing in various sizes (2-9 years)',
    quantity_needed: 0,
    unit: 'item',
    icon: '👕',
    color: 'text-emerald-600',
    bg_color: 'bg-emerald-50',
  },
  {
    id: '5',
    name: 'Nutritious Food',
    description: 'Rice, lentils, vegetables, milk, and other essentials for daily meals',
    quantity_needed: 0,
    unit: 'item',
    icon: '🍎',
    color: 'text-green-600',
    bg_color: 'bg-green-50',
  },
  {
    id: '6',
    name: 'Medical Supplies',
    description: 'First aid kits, hygiene products, vitamins, and health essentials',
    quantity_needed: 0,
    unit: 'item',
    icon: '🏥',
    color: 'text-red-600',
    bg_color: 'bg-red-50',
  },
];

export async function fetchWishlistItems(): Promise<WishItem[]> {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .order('is_default', { ascending: false })
    .order('created_at');

  if (error) throw error;
  return data?.length ? data : DEFAULT_WISHLIST_ITEMS;
}

export const WHATSAPP_NUMBER = '919886262255';

export function buildItemDonationWhatsAppLink(items: WishItem[]): string {
  const list = items.map((i) => `• ${i.name}: ${i.description}`).join('\n');
  const text = [
    'Namaste Aashiyan!',
    '',
    'I would like to donate the following items:',
    '',
    list,
    '',
    'Please let me know what you currently need. Thank you!',
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
