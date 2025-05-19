import React from 'react';
    import HeroSection from '@/components/sections/HeroSection';
    import ServicesSection from '@/components/sections/ServicesSection';
    import AboutSection from '@/components/sections/AboutSection';
    import PortfolioSection from '@/components/sections/PortfolioSection';
    import FaqSection from '@/components/sections/FaqSection';
    import TipsSection from '@/components/sections/TipsSection';
    import ContactSection from '@/components/sections/ContactSection';

    const HomePage = () => {
      return (
        <>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <PortfolioSection />
          <FaqSection />
          <TipsSection />
          <ContactSection />
        </>
      );
    };

    export default HomePage;