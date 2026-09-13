import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import ContactSection from '../components/contact/ContactSection';
import ContactMap from '../components/contact/ContactMap';


const Contact = () => {
  return (
    <>
      <SEO
        title="Contact"
        description="Contactez K-EMPIRE Corporation pour vos besoins en conseil stratégique, intelligence stratégique, ingénierie juridique et formation exécutive au Togo. Réponse sous 24h."
        url="/contact"
        image="/assets/images/contact/coverImage.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact K-EMPIRE Corporation",
          "description": "Contactez-nous pour vos besoins en conseil stratégique, intelligence stratégique, ingénierie juridique et formation exécutive au Togo.",
          "url": "https://www.k-empirecorporation.com/contact"
        }}
      />
      <PageBanner
        title="Contactez-nous"
        description="Une question, un projet ou un besoin spécifique ? Notre équipe est à votre disposition pour vous accompagner."
        imageUrl="/assets/images/contact/coverImage.png"
        imageAlt="Contact K-EMPIRE CORPORATION"
      />
      <ContactSection />
      <ContactMap />
    </>
  );
};

export default Contact;