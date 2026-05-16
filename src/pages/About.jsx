import React from 'react';
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
