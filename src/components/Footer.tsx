import { Heart, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/aashiyan-logo.png"
                alt="Aashiyan Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Your support helps provide learning materials, meals, care, and a safe space for every child at Aashiyan.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/people/The-She-Saga-Foundation/100076034050193/?rdid=nH96HtjLARysQVf9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ApZHnDe8t%2F%3Fref%3D1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={15} className="text-slate-300" />
              </a>
              <a
                href="https://www.instagram.com/theshesagafoundation?igsh=YWFsbThiZWZ6ZXdo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} className="text-slate-300" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Explore</h4>
            <ul className="space-y-3">
              {['About Us', 'What We Provide', 'Daily Life', 'Impact', 'Support', 'Volunteer'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>No. 58, Basapura, Maruthi Layout,<br />1st main, Opp Building, Electronic city post,<br />Bangalore-560 100</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  <Phone size={15} className="text-amber-400 flex-shrink-0" />
                  +91 9886262255
                </a>
              </li>
              <li>
                <a href="mailto:info@theshesaga.com?subject=Aashiyan%20Contact%20Enquiry" className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors">
                  <Mail size={15} className="text-amber-400 flex-shrink-0" />
                  info@theshesaga.com
                </a>
              </li>
            </ul>
          </div>

          {/* Support CTA */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Give Today</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Your support helps provide learning materials, meals, care, and a safe space for every child at Aashiyan.
            </p>
            <a
              href="/#donate"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-4 font-bold text-white transition-all hover:bg-amber-500 hover:shadow-lg sm:w-auto"
            >
              Donate Now
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center sm:justify-start">
              <span>Registration No: BGR-4-00134-2021-22</span>
              <span>80G Certified</span>
              <span>12A Registered</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:justify-end">
              <span className="inline-flex items-center gap-1">
                Built with
                <Heart size={12} className="text-rose-400 fill-rose-400 mx-0.5" />
                community support
              </span>
              <span>© 2026 Aashiyan</span>
              <span>
                Website by{' '}
                <a
                  href="https://karaodigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-300 transition-colors hover:text-amber-300"
                >
                  Karao.digital
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
