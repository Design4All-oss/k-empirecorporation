import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
      <PageBanner
        title="Formations"
        description="Des programmes certifiants pratiques et orientés résultats pour propulser votre carrière vers l'excellence professionnelle."
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Formations K-EMPIRE"
      />
      <FormationsHero />
      <FormationsTypes />
      <FormationsCatalog />
      <FormationsBenefits />
      <FormationsCTA />
      
      {/* Newsletter */}
      <div className="relative z-50 px-4 -mt-32">
        <HomeNewsletter />
      </div>
    </>
  );
};

export default Formations;
