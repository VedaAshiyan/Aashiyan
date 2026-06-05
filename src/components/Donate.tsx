import { useState } from 'react';
import { Heart, QrCode, Smartphone, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import logoGpay from '../assets/payment-logos/logo_gpay.png';
import logoPhonepe from '../assets/payment-logos/logo_phonepe.png';
import logoPaytm from '../assets/payment-logos/logo_paytm.png';
import logoBhim from '../assets/payment-logos/logo_bhim.png';
import { buildAppUpiLink, buildUpiLink, DONATION_QR, UPI_ID } from '../lib/paymentLinks';

const amounts = [
  { value: 100, desc: 'School Supplies', icon: '📚' },
  { value: 300, desc: 'Meals for a Child', icon: '🍱' },
  { value: 500, desc: 'Monthly Support', icon: '🌟' },
];

// UPI app logos (bundled assets — official brand images)
const GPay = () => (
  <img
    src={logoGpay}
    alt="Google Pay"
    className="w-full h-full rounded-lg object-contain"
  />
);

const PhonePeLogo = () => (
  <img
    src={logoPhonepe}
    alt="PhonePe"
    className="w-full h-full rounded-full object-cover"
  />
);

const PaytmLogo = () => (
  <img
    src={logoPaytm}
    alt="Paytm"
    className="w-full h-full rounded-lg object-contain"
  />
);

const BhimLogo = () => (
  <img
    src={logoBhim}
    alt="BHIM UPI"
    className="w-full h-full rounded-lg object-contain"
  />
);

const upiApps = [
  { name: 'Google Pay', Logo: GPay, border: 'hover:border-blue-200', scheme: 'tez://upi/pay' },
  { name: 'PhonePe', Logo: PhonePeLogo, border: 'hover:border-purple-200', scheme: 'phonepe://pay' },
  { name: 'Paytm', Logo: PaytmLogo, border: 'hover:border-sky-200', scheme: 'paytmmp://pay' },
  { name: 'BHIM', Logo: BhimLogo, border: 'hover:border-slate-300', scheme: 'bhim://pay' },
];

export default function Donate() {
  const { ref, visible } = useScrollReveal();
  const [selected, setSelected] = useState(300);
  const [custom, setCustom] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const finalAmount = custom ? parseInt(custom) || 0 : selected;
  const payableAmount = finalAmount || 100;
  const upiLink = buildUpiLink(payableAmount);

  async function copyUpiId() {
    await navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    window.setTimeout(() => setCopiedUpi(false), 1800);
  }

  return (
    <section id="donate" className="py-24 px-5 bg-[#FAFAF8]">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-rose-50 text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Donate Now
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Give a child their brightest tomorrow
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Your contribution — however small — provides meals, books, safety, and love to a child who needs it most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Amount selection */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
              <Heart size={18} className="text-rose-400 fill-rose-400" />
              Choose your support
            </h3>

            {/* Preset amounts */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  onClick={() => { setSelected(a.value); setCustom(''); }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    selected === a.value && !custom
                      ? 'border-amber-400 bg-amber-50 shadow-sm'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <span className="text-2xl mb-2">{a.icon}</span>
                  <span className="font-bold text-slate-800 text-sm text-center leading-tight">{a.desc}</span>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <label className="text-slate-500 text-xs font-semibold mb-2 block uppercase tracking-widest">
                Or enter custom amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl pl-8 pr-4 py-3 text-slate-700 font-semibold outline-none transition-colors"
                />
              </div>
            </div>

            {finalAmount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-5">
                <div className="text-amber-700 text-sm font-semibold">
                  You are donating to Aashiyan NGO
                </div>
                <div className="text-amber-600 text-xs mt-0.5">100% reaches the children</div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowQR(true)}
              className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg"
            >
              <QrCode size={18} />
              Scan QR to Pay
            </button>
            <a
              href={`https://wa.me/919886262255?text=${encodeURIComponent(
                `Namaste Aashiyan! I would like to support your cause with a donation of ₹${finalAmount}. Please guide me on how to proceed.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-3 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg"
            >
              <Smartphone size={18} />
              Confirm on WhatsApp
            </a>
          </div>

          {/* Right: UPI apps */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h3 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
              <Smartphone size={18} className="text-sky-500" />
              Pay directly via UPI
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Open your preferred UPI app and donate instantly.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {upiApps.map((app) => (
                <a
                  key={app.name}
                  href={buildAppUpiLink(app.scheme, payableAmount)}
                  className={`bg-white border-2 border-slate-200 ${app.border} rounded-2xl px-4 py-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer`}
                >
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center overflow-hidden">
                    <app.Logo />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">{app.name}</span>
                  <ChevronRight size={14} className="text-slate-400 ml-auto" />
                </a>
              ))}
            </div>

            {/* Ujjivan Pay scanner — same QR as physical standee */}
            <button
              type="button"
              onClick={() => setShowQR(true)}
              className="w-full mb-5 rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/50 p-4 text-left transition-all hover:border-sky-300 hover:bg-sky-50"
            >
              <p className="text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
                Ujjivan Pay scanner
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={DONATION_QR}
                  alt="Ujjivan Pay UPI QR — scan with any UPI app"
                  className="w-20 h-20 rounded-lg bg-white p-1 shadow-sm object-cover object-center"
                />
                <div>
                  <p className="text-slate-700 text-sm font-semibold leading-snug">
                    Scan &amp; pay using any UPI app
                  </p>
                  <p className="text-slate-500 text-xs mt-1 font-mono break-all">{UPI_ID}</p>
                </div>
              </div>
            </button>

            <div className="bg-sky-50 rounded-2xl px-5 py-4">
              <div className="text-sky-800 text-xs font-semibold mb-1">UPI ID</div>
              <div className="text-sky-700 font-bold text-base font-mono">{UPI_ID}</div>
              <div className="text-sky-600 text-xs mt-1">Name: Aashiyan NGO</div>
            </div>

            <div className="mt-5 flex items-start gap-3 bg-slate-50 rounded-2xl px-5 py-4">
              <span className="text-lg">🔒</span>
              <p className="text-slate-500 text-xs leading-relaxed">
                All payments are processed directly through your UPI app. We never store your payment details. Your contribution is completely secure.
              </p>
            </div>
          </div>
        </div>

        {/* QR Modal — shows the actual Ujjivan Pay QR code */}
        {showQR && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-5 py-6 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <div
              className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode size={22} className="text-amber-600" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-xl mb-1">Ujjivan Pay — Scan to Donate</h3>
              <p className="text-slate-500 text-sm mb-5">
                Same scanner as our standee. Works with Paytm, GPay, PhonePe, BHIM &amp; all UPI apps.
              </p>

              <a
                href={upiLink}
                className="block"
                aria-label={`Open UPI payment for ₹${payableAmount}`}
              >
                <div className="mb-4 inline-block rounded-2xl bg-slate-50 p-3 shadow-inner transition-shadow hover:shadow-md">
                  <img
                    src={DONATION_QR}
                    alt="Ujjivan Pay UPI QR Code"
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
                onClick={() => setShowQR(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
