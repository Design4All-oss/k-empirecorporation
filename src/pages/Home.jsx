import React from 'react';
import SEO from '../components/ui/SEO';
import HomeHero from '../components/home/HomeHero';
import HomeValuesMarquee from '../components/home/HomeValuesMarquee';
import HomeStats from '../components/home/HomeStats';
import HomeExpertise from '../components/home/HomeExpertise';
import HomeServicesPreview from '../components/home/HomeServicesPreview';
import HomeFormationsPreview from '../components/home/HomeFormationsPreview';
import HomeWhyUs from '../components/home/HomeWhyUs';
import HomeTestimonials from '../components/home/HomeTestimonials';
import HomeNewsletter from '../components/home/HomeNewsletter';
import HomeContactCta from '../components/home/HomeContactCta';
import HomePopup from '../components/home/HomePopup';

const Home = () => {
  return (
    <>
      <SEO
        title="Accueil"
        description="K-EMPIRE Corporation - Cabinet de conseil, audit, assistance juridique et formations professionnelles au Togo. Accompagnement stratégique pour entreprises et institutions."
        url="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "K-EMPIRE Corporation - Accueil",
          "description": "Cabinet de conseil, audit, assistance juridique et formations professionnelles au Togo.",
          "url": "https://kempirecorporation.com"
        }}
      />
      <HomeHero />
      <HomeExpertise />
      <HomeValuesMarquee />
      <HomeStats />
      <HomeServicesPreview />
      <HomeFormationsPreview />
      <HomeWhyUs />
      <HomeTestimonials />
      <HomeContactCta />
      <HomeNewsletter />
      <HomePopup />
    </>
  );
};

export default Home;
