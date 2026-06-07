import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check, Smartphone } from 'lucide-react';
import {
  type WishItem,
  DEFAULT_WISHLIST_ITEMS,
  buildItemDonationWhatsAppLink,
} from '../lib/wishlistData';

interface WishlistItemCardProps {
  item: WishItem;
  index: number;
  isSelected: boolean;
  onToggleSelection: (itemId: string) => void;
}

function WishlistItemCard({
  item,
  index,
  isSelected,
  onToggleSelection,
}: WishlistItemCardProps) {
  const { ref: itemRef, visible: itemVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={itemRef}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`${item.bg_color} rounded-3xl p-6 cursor-pointer transition-all duration-700 border-2 hover:shadow-lg hover:-translate-y-1 ${
        itemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isSelected ? 'border-sky-400 ring-2 ring-sky-100' : 'border-transparent'}`}
    >
      {/* Header with checkbox and actions */}
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{item.icon}</div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleSelection(item.id)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-sky-400 border-sky-400'
                : 'border-slate-300 hover:border-sky-400'
            }`}
          >
            {isSelected && <Check size={16} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display font-bold text-slate-800 text-lg mb-2">{item.name}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
    </div>
  );
}

export default function Wishlist() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const items = DEFAULT_WISHLIST_ITEMS;

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const selectedList = items.filter((item) => selectedItems.has(item.id));
  const whatsAppHref =
    selectedList.length > 0 ? buildItemDonationWhatsAppLink(selectedList) : undefined;

  const handleWhatsAppPing = () => {
    if (!whatsAppHref) {
      alert('Please select at least one item you would like to donate.');
      return;
    }
    window.open(whatsAppHref, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display mb-5 text-4xl font-black leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl">
            Monthly Needs
          </h2>
          <p className="font-display mb-6 text-2xl font-bold leading-[1.05] text-slate-800 sm:text-3xl lg:text-4xl">
            Our needs change every month
          </p>
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto">
            We may not need every item listed below at all times. Before donating, please message us
            on WhatsApp so we can share what the children need most this month.
          </p>
        </div>

        {/* Wishlist items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {items.map((item, i) => (
            <WishlistItemCard
              key={item.id}
              item={item}
              index={i}
              isSelected={selectedItems.has(item.id)}
              onToggleSelection={toggleSelection}
            />
          ))}
        </div>

        {/* WhatsApp — ping after selecting items */}
        <div
          id="wishlist-whatsapp"
          className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 p-8 text-center shadow-sm"
        >
          {selectedList.length > 0 ? (
            <p className="text-sky-700 text-sm font-semibold mb-4">
              {selectedList.length} item{selectedList.length !== 1 ? 's' : ''} selected — ready to
              message us
            </p>
          ) : (
            <p className="text-slate-500 text-sm mb-4">
              Select the items you would like to donate, then message us to confirm this
              month&apos;s needs.
            </p>
          )}
          <button
            type="button"
            onClick={handleWhatsAppPing}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-10 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#20ba59] hover:shadow-lg sm:w-auto"
          >
            <Smartphone size={18} />
            Ping us on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
