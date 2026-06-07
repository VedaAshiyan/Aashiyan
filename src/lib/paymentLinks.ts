export const UPI_ID = 'UJJBB83981756929@UJJIVAN';
export const UPI_NAME = 'Aashiyan NGO';
export const DONATION_NOTE = 'Donation to Aashiyan NGO';
export const DONATION_QR = '/donation_qr_clean.png';

export function buildUpiQuery(amount: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_NAME,
    cu: 'INR',
    tn: DONATION_NOTE,
  });
  if (amount > 0) params.set('am', String(amount));
  return params.toString();
}

export function buildUpiLink(amount: number) {
  return `upi://pay?${buildUpiQuery(amount)}`;
}

export function buildAppUpiLink(scheme: string, amount: number) {
  return `${scheme}?${buildUpiQuery(amount)}`;
}
