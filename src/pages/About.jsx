import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import AboutIntro from '../components/about/AboutIntro';
import AboutMission from '../components/about/AboutMission';
import AboutVision from '../components/about/AboutVision';
import AboutValues from '../components/about/AboutValues';
import AboutTeam from '../components/about/AboutTeam';
import AboutStats from '../components/about/AboutStats';
import AboutContactCta from '../components/about/AboutContactCta';
import AboutNewsletter from '../components/about/AboutNewsletter';

const About = () => {
  return (
    <>
      <SEO
        title="À propos"
        description="Découvrez K-EMPIRE Corporation - Cabinet international d'études, de conseil et de formation spécialisé dans l'accompagnement des organisations vers l'excellence managériale au Togo."
        url="/a-propos"
        image="/assets/images/about/coverImage.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "À propos de K-EMPIRE Corporation",
          "description": "Cabinet international d'études, de conseil et de formation spécialisé dans l'accompagnement des organisations vers l'excellence managériale.",
          "url": "https://kempirecorporation.com/a-propos"
        }}
      />
      <PageBanner
        title="À propos de nous"
        description="Au fil des années, notre engagement envers l'excellence et notre passion pour l'accompagnement de nos clients ont été reconnus."
        imageUrl="/assets/images/about/coverImage.png"
        imageAlt="Équipe K-EMPIRE CORPORATION"
      />
      <AboutIntro />
      <AboutMission />
      <AboutVision />
      <AboutValues />
      <AboutTeam />
      <AboutStats />
      <AboutContactCta />
      <AboutNewsletter />
    </>
  );
};

export default About;
