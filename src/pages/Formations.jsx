import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import FormationsHero from '../components/formations/FormationsHero';
import FormationsTypes from '../components/formations/FormationsTypes';
import FormationsCatalog from '../components/formations/FormationsCatalog';
import FormationsBenefits from '../components/formations/FormationsBenefits';
import FormationsCTA from '../components/formations/FormationsCTA';
import HomeNewsletter from '../components/home/HomeNewsletter';

const Formations = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash === '#formations') {
      const element = document.getElementById('formations');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <SEO
        title="L'Académie Exécutive | K-EMPIRE Corporation"
        description="L'Académie Exécutive K-EMPIRE : formations certifiantes, programmes inter-entreprises, intra-entreprise et en ligne pour développer les compétences de vos équipes au Togo."
        url="/formations"
        image="/assets/images/formations/hero.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Académie Exécutive K-EMPIRE Corporation",
          "description": "Formations certifiantes et programmes sur mesure au Togo.",
          "url": "https://www.k-empirecorporation.com/formations"
        }}
      />
      <PageBanner
        title="L'Académie Exécutive"
        description="Nous développons des capacités d'action mesurables, immédiatement mobilisables dans les environnements institutionnels et économiques complexes."
        imageUrl="/assets/images/formations/hero.webp"
        imageAlt="Formations K-EMPIRE"
      />
      <FormationsHero />
      <FormationsTypes />
      <FormationsCatalog />
      <FormationsBenefits />
      <FormationsCTA />
      
      <HomeNewsletter />
    </>
  );
};

export default Formations;
