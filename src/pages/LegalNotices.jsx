import React from 'react';
import PageBanner from '../components/ui/PageBanner';
import LegalNoticesContent from '../components/legal/LegalNoticesContent';

const LegalNotices = () => {
  return (
    <>
      <PageBanner
        title="Mentions légales"
        description="Informations légales relatives à l'utilisation de notre site web"
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Mentions légales K-EMPIRE CORPORATION"
      />
      
      <LegalNoticesContent />
    </>
  );
};

export default LegalNotices;