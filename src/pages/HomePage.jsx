import { useEffect } from 'react';
import Contact from '../components/sections/Contact/Contact';
import Faq from '../components/sections/Faq/Faq';
import Features from '../components/sections/Features/Features';
import Hero from '../components/sections/Hero/Hero';
import HowItWorks from '../components/sections/HowItWorks/HowItWorks';
import LogoCloud from '../components/sections/LogoCloud/LogoCloud';
import Pricing from '../components/sections/Pricing/Pricing';
import Testimonials from '../components/sections/Testimonials/Testimonials';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function HomePage() {
  useDocumentTitle('Rowline | Task management for small teams');

  // Arriving from another page with a hash (for example /#pricing): scroll to that section.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
