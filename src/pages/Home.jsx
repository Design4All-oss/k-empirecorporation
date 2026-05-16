import React from 'react';
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
