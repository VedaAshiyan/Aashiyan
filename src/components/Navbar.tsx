import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#whatwedo' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Impact', href: '#impact' },
  { label: 'Stories', href: '#blog' },
  { label: 'Get Involved', href: '#getinvolved' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between gap-4 px-4 sm:h-[92px] sm:px-8 lg:h-[88px]">
        {/* Logo */}
        <a href="#" className="flex items-center group shrink-0">
          <img
            src="/aashiyan-logo.png"
            alt="Aashiyan Logo"
            className="h-14 w-auto object-contain transition-transform group-hover:scale-105 sm:h-[72px] lg:h-20"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-end gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-bold text-slate-800 transition-colors hover:text-amber-500"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#donate"
            className="rounded-lg bg-[#c96757] px-6 py-3 text-[15px] font-black uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-[#b95a4b] hover:shadow-lg"
          >
            Donate Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-800 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block min-h-11 py-2.5 font-semibold text-slate-700 transition-colors hover:text-amber-500"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#donate"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg bg-[#c96757] px-6 py-3 text-center font-black uppercase tracking-wide text-white transition-all hover:bg-[#b95a4b]"
          >
            Donate Now
          </a>
        </div>
      )}
    </header>
  );
}
