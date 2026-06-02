import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import WhatWeDoDetail from './components/WhatWeDoDetail';

import Gallery from './components/Gallery';

import Blog from './components/Blog';
import Impact from './components/Impact';
import Partners from './components/Partners';
import Wishlist from './components/Wishlist';

import GetInvolved from './components/GetInvolved';
import Donate from './components/Donate';

import CtaStrip from './components/CtaStrip';
import Footer from './components/Footer';
import type { ServiceType } from './components/WhatWeDoDetail';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [returnToWhatWeDo, setReturnToWhatWeDo] = useState(false);

  useEffect(() => {
    if (selectedService) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [selectedService]);

  useEffect(() => {
    if (!selectedService && returnToWhatWeDo) {
      window.requestAnimationFrame(() => {
        const section = document.getElementById('whatwedo');
        if (!section) return;

        const headerOffset = 96;
        const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
        setReturnToWhatWeDo(false);
      });
    }
  }, [selectedService, returnToWhatWeDo]);

  if (selectedService) {
    return (
      <div className="min-h-screen font-sans antialiased">
        <Navbar />
        <WhatWeDoDetail
          service={selectedService}
          onBack={() => {
            setReturnToWhatWeDo(true);
            setSelectedService(null);
          }}
        />
        <CtaStrip />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <GetInvolved />
      <WhatWeDo onServiceClick={setSelectedService} />
      <Gallery />
      <Blog />
      <Impact />
      <Wishlist />
      <Partners />

      <Donate />

      <CtaStrip />
      <Footer />
</div>
  );
}
