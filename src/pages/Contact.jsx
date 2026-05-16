import React from 'react';
import PageBanner from '../components/ui/PageBanner';
import ContactSection from '../components/contact/ContactSection';
import ContactMap from '../components/contact/ContactMap';
import HomeNewsletter from '../components/home/HomeNewsletter';

const Contact = () => {
  return (
    <>
      <PageBanner
        title="Contactez-nous"
        description="Une question, un projet ou un besoin spécifique ? Notre équipe est à votre disposition pour vous accompagner."
        imageUrl="/assets/images/contact/coverImage.png"
        imageAlt="Contact K-EMPIRE CORPORATION"
      />
      <ContactSection />
      
      {/* Map with Newsletter floating over */}
      <div className="relative" style={{ height: '70vh' }}>
        <ContactMap />
        
        {/* Newsletter - absolute, flotte entre MAP et FOOTER */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[5%] z-50 w-full max-w-container px-4">
          <HomeNewsletter />
        </div>
      </div>
    </>
  );
};

export default Contact;