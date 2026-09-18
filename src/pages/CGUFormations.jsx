import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import CGUFormationsContent from '../components/legal/CGUFormationsContent';

const CGUFormations = () => {
  return (
    <>
      <SEO
        title="CGF K-EMPIRE | Conditions Générales de Formation"
        description="Conditions générales applicables aux formations inter et intra-entreprises de K-EMPIRE Corporation au Togo."
        url="/cgf-k-empire"
      />
      <PageBanner
        title="CGF K-EMPIRE"
        description="Conditions Générales de Formation — Dispositions applicables à l'ensemble de nos formations"
        imageUrl="/assets/images/cgu-formations/hero.png"
        imageAlt="CGF K-EMPIRE Corporation"
      />
      
      <CGUFormationsContent />
    </>
  );
};

export default CGUFormations;
