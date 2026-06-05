import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, BookOpen, Briefcase, QrCode, Smartphone } from 'lucide-react';
import { buildUpiLink, DONATION_QR, UPI_ID } from '../lib/paymentLinks';

type ModalView = 'volunteer' | 'internship' | 'donate' | null;
type InvolvedCardData = {
  icon: typeof BookOpen;
  title: string;
  desc: string;
  img: string;
  modal: Exclude<ModalView, null>;
  button: string;
};
const APPLICATION_EMAIL = 'vedaprana.p@gmail.com';

function openApplicationEmail(subject: string, body: string) {
  window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function GetInvolved() {
  const { ref, visible } = useScrollReveal();
  const [activeModal, setActiveModal] = useState<ModalView>(null);

  const cards: InvolvedCardData[] = [
    {
      icon: BookOpen,
      title: 'Volunteer',
      desc: 'Share your skills and time with the children',
      img: '/gallery/moment-03.png',
      modal: 'volunteer' as const,
      button: 'Become a Volunteer',
    },
    {
      icon: Heart,
      title: 'Donate',
      desc: 'Support education, meals, and care',
      img: '/donate-card-children.png',
      modal: 'donate' as const,
      button: 'Give Now',
    },
    {
      icon: Briefcase,
      title: 'Internship',
      desc: 'Gain meaningful experience in community work',
      img: '/gallery/moment-09.png',
      modal: 'internship' as const,
      button: 'Apply Now',
    },
  ];

  return (
    <section id="getinvolved" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Get Involved
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Be part of their journey
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Every contribution creates a safer and brighter childhood. Give your time, skills, resources, or ideas.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 max-w-6xl mx-auto items-center">
          {cards.map((card, i) => (
            <InvolvedCard
              key={card.title}
              card={card}
              index={i}
              onClick={() => setActiveModal(card.modal)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <FormModal modal={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}

function InvolvedCard({
  card,
  index,
  onClick,
}: {
  card: InvolvedCardData;
  index: number;
  onClick: () => void;
}) {
  const Icon = card.icon;
  const { ref, visible } = useScrollReveal(0.1);
  const isDonate = card.modal === 'donate';

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative overflow-hidden rounded-[2rem] shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
        isDonate
          ? 'sm:col-span-2 h-[420px] lg:h-[460px]'
          : 'h-[300px] sm:h-[320px] lg:h-[340px]'
      } ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={onClick}
    >
      <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className={`absolute inset-0 flex flex-col justify-end text-white ${isDonate ? 'p-8 lg:p-10' : 'p-5'}`}>
        <div
          className={`bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
            isDonate ? 'w-12 h-12' : 'w-10 h-10'
          }`}
        >
          <Icon size={isDonate ? 24 : 20} className="text-white" />
        </div>
        <h3 className={`font-display font-bold mb-1 ${isDonate ? 'text-4xl' : 'text-2xl'}`}>
          {card.title}
        </h3>
        <p className={`text-white/80 mb-4 ${isDonate ? 'text-base max-w-md' : 'text-sm'}`}>
          {card.desc}
        </p>
        <span className={`inline-flex font-bold text-amber-300 group-hover:gap-1.5 gap-1 transition-all ${isDonate ? 'text-base' : 'text-sm'}`}>
          {card.button}
          <span>→</span>
        </span>
      </div>
    </div>
  );
}

function FormModal({
  modal,
  onClose,
}: {
  modal: ModalView;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-5 py-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {modal === 'volunteer' && <VolunteerForm />}
        {modal === 'internship' && <InternshipForm />}
        {modal === 'donate' && <DonateForm />}

        <div className="p-8 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function VolunteerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    openApplicationEmail(
      `Aashiyan Volunteer Application - ${name}`,
      [
        'Volunteer Application',
        '',
        `Full Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Area of Interest: ${interest}`,
        '',
        'Message:',
        message || 'Not provided',
      ].join('\n')
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Become a Volunteer</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Area of Interest</label>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="">Select an area</option>
          <option value="teaching">Teaching basic subjects</option>
          <option value="storytelling">Storytelling & reading</option>
          <option value="arts">Art, dance, music, yoga</option>
          <option value="english">Spoken English & communication</option>
          <option value="events">Events & activities</option>
          <option value="mentoring">Mentoring & confidence</option>
          <option value="social">Social media & content</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
          placeholder="Tell us about yourself and why you want to volunteer..."
        />
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Thank you! We'll contact you soon.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}

function InternshipForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    openApplicationEmail(
      `Aashiyan Internship Application - ${name}`,
      [
        'Internship Application',
        '',
        `Full Name: ${name}`,
        `Email: ${email}`,
        `College: ${college || 'Not provided'}`,
        `Major/Course: ${major || 'Not provided'}`,
        `Area of Interest: ${area}`,
      ].join('\n')
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Apply for Internship</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-slate-700 text-sm font-bold mb-2 block">College</label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
            placeholder="Your college"
          />
        </div>
        <div>
          <label className="text-slate-700 text-sm font-bold mb-2 block">Major/Course</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
            placeholder="Your field"
          />
        </div>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Area of Interest</label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="">Select an area</option>
          <option value="psychology">Psychology</option>
          <option value="social-work">Social Work</option>
          <option value="creative-writing">Creative Writing</option>
          <option value="education">Education & Teaching</option>
          <option value="content">Content & Communication</option>
        </select>
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Application received! We'll be in touch.
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-2xl transition-colors"
      >
        Submit Application
      </button>
    </form>
  );
}


function DonateForm() {
  const [donationType, setDonationType] = useState('funds');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  const payableAmount = finalAmount || 100;
  const upiLink = buildUpiLink(payableAmount);

  async function copyUpiId() {
    await navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    window.setTimeout(() => setCopiedUpi(false), 1800);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (donationType === 'funds') {
      setShowQR(true);
    } else {
      // Format donation type for message
      const typeMap: Record<string, string> = {
        books: 'Books & stationery',
        toys: 'Toys & learning materials',
        clothes: 'Clothes & essentials',
        food: 'Food supplies & snacks',
        other: 'Other items'
      };
      
      const typeLabel = typeMap[donationType] || donationType;
      const whatsappNumber = '919886262255';
      const text = `Namaste Aashiyan! I would like to enquire about donating ${typeLabel}.%0A%0ADetails: ${message || 'No additional details provided.'}%0A%0AI would like to know what is actually needed and the number of units.`;
      
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Make a Donation</h2>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">What would you like to donate?</label>
        <select
          value={donationType}
          onChange={(e) => {
            setDonationType(e.target.value);
            setSubmitted(false);
          }}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors"
        >
          <option value="funds">Funds</option>
          <option value="books">Books & stationery</option>
          <option value="toys">Toys & learning materials</option>
          <option value="clothes">Clothes & essentials</option>
          <option value="food">Food supplies & snacks</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 text-sm font-bold mb-2 block">Additional Details</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full border-2 border-slate-200 focus:border-sky-400 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
          placeholder="Tell us more about what you'd like to donate..."
        />
      </div>

      {donationType === 'funds' && (
        <div className="space-y-4">
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">Donation Amount</label>
            <div className="grid grid-cols-3 gap-3">
              {[100, 300, 500].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`rounded-xl border-2 px-4 py-3 font-bold transition-colors ${
                    selectedAmount === amount && !customAmount
                      ? 'border-amber-400 bg-amber-50 text-amber-700'
                      : 'border-slate-200 text-slate-700 hover:border-amber-300'
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">Or enter custom amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl pl-8 pr-4 py-3 text-slate-700 font-semibold outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowQR(true)}
            className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all"
          >
            <QrCode size={16} />
            Scan QR to Pay
          </button>
        </div>
      )}

      <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3">
        <p className="text-sky-700 text-sm leading-relaxed">
          {donationType === 'funds' 
            ? <>For monetary donations, choose an amount and scan the <strong>UPI QR code</strong>. You can message us after payment if you need help.</>
            : <>For item donations, click the button below to <strong>Enquire on WhatsApp</strong> about current requirements and quantity.</>
          }
        </p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 text-emerald-700 text-sm font-semibold px-4 py-3 rounded-xl">
          Thank you! We'll contact you to finalize the donation.
        </div>
      )}

      <button
        type="submit"
        className={`w-full ${donationType === 'funds' ? 'bg-amber-400 hover:bg-amber-500' : 'bg-[#25D366] hover:bg-[#20ba59]'} text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2`}
      >
        {donationType === 'funds' ? (
          <>
            <QrCode size={18} />
            Scan QR to Pay
          </>
        ) : (
          <>
            Enquire on WhatsApp
            <span>→</span>
          </>
        )}
      </button>

      {showQR && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 px-5 py-6 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode size={22} className="text-amber-600" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-xl mb-1">Scan to Donate</h3>
            <p className="text-slate-500 text-sm mb-5">
              Scan with Paytm, GPay, PhonePe, BHIM, or any UPI app.
            </p>
            <a
              href={upiLink}
              className="block"
              aria-label={`Open UPI payment for ₹${payableAmount}`}
            >
              <div className="mb-4 inline-block rounded-2xl bg-slate-50 p-3 shadow-inner transition-shadow hover:shadow-md">
                <img
                  src={DONATION_QR}
                  alt="Aashiyan donation QR code"
                  className="max-h-[58vh] w-full rounded-xl bg-white object-contain"
                />
              </div>
            </a>
            <p className="text-slate-400 text-xs mb-1">
              UPI ID: <span className="font-mono font-semibold text-slate-600">{UPI_ID}</span>
            </p>
            <p className="text-slate-400 text-[10px] mb-5">
              Scan with any UPI app and enter the amount, or tap Open UPI App on mobile to pay ₹{payableAmount}.
            </p>
            <a
              href={upiLink}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3 font-bold text-white transition-colors hover:bg-emerald-600"
            >
              <Smartphone size={18} />
              Open UPI App
            </a>
            <button
              type="button"
              onClick={copyUpiId}
              className="mb-3 w-full rounded-2xl bg-amber-100 py-3 font-bold text-amber-800 transition-colors hover:bg-amber-200"
            >
              {copiedUpi ? 'UPI ID Copied' : 'Copy UPI ID'}
            </button>
            <button
              type="button"
              onClick={() => setShowQR(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
