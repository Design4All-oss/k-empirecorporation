import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import CGUFormationsContent from '../components/legal/CGUFormationsContent';

const CGUFormations = () => {
  return (
    <>
      <SEO
        title="Conditions Générales de Formation"
        description="Conditions générales applicables aux formations inter et intra-entreprises de K-EMPIRE Corporation au Togo."
        url="/cgu-formations"
      />
      <PageBanner
        title="Conditions Générales de Formation"
        description="Dispositions applicables à l'ensemble de nos formations"
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="CGU Formations K-EMPIRE CORPORATION"
      />
      
      <CGUFormationsContent />
    </>
  );
};

export default CGUFormations;
