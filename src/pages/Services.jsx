import React from 'react';
import { 
  Compass, 
  BrainCircuit, 
  Scale, 
  GraduationCap,
  Building2,
  Users,
  FileText,
  Gavel
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicesProcess from '../components/services/ServicesProcess';
import HomeValuesMarquee from '../components/home/HomeValuesMarquee';
import ServicesTestimonials from '../components/services/ServicesTestimonials';
import ServicesFormationsCatalog from '../components/services/ServicesFormationsCatalog';
import ServicesCTA from '../components/services/ServicesCTA';
import HomeNewsletter from '../components/home/HomeNewsletter';

// Services content - updated per spec
const SERVICES_CONTENT = {
  hero: {
    label: "Nos expertises",
    title: "Développez et libérez votre potentiel",
    subtitle: "Nous vous accompagnons dans la conception, la sécurisation et la mise en œuvre de vos projets à haute valeur ajoutée.",
    description: "K‑EMPIRE CORPORATION propose un ensemble de services structurés pour répondre aux besoins des entreprises, des administrations et des institutions, qu'il s'agisse de conseil stratégique, d'intelligence stratégique, d'ingénierie juridique ou de formation exécutive."
  },
  services: [
    {
      id: 1,
      icon: Scale,
      title: "Droit des Affaires, Fiscalité & Ingénierie Contractuelle",
      description: "Sécurisation juridique et fiscale des opérations complexes : droit des affaires, droit social, propriété intellectuelle, fiscalité des entreprises, prix de transfert, fiscalité minière, pétrolière et gazière. Négociation et structuration des contrats miniers, pétroliers et énergétiques, financement de projets, partenariats public-privé, audit et management des contrats complexes.",
      points: [
        "Droit des affaires, droit social, propriété intellectuelle",
        "Fiscalité des entreprises, prix de transfert, fiscalité minière/pétrolière/gazière",
        "Négociation et structuration de contrats complexes",
        "Audit et management des contrats, PPP, financement de projets"
      ]
    },
    {
      id: 2,
      icon: Building2,
      title: "Stratégie, Gouvernance & Capital Humain",
      description: "Élaboration de stratégies d'entreprise, business plans, études de marché et gouvernance des entités. Management stratégique du capital humain : organisation et performance RH, recrutement, pilotage des ressources humaines.",
      points: [
        "Stratégies d'entreprise, business plans, études de marché",
        "Gouvernance des entités et management stratégique",
        "Organisation et performance RH, recrutement",
        "Pilotage des ressources humaines"
      ]
    },
    {
      id: 3,
      icon: GraduationCap,
      title: "Formation Exécutive & Certifiante — Académie K-EMPIRE",
      description: "Executive Certificates, programmes INTER et INTRA-entreprise, Parcours Executive Signature : le cœur de l'offre pédagogique de l'Académie K-EMPIRE.",
      points: [
        "Executive Certificates et programmes certifiants",
        "Programmes INTER et INTRA-entreprise sur mesure",
        "Parcours Executive Signature",
        "Catalogue de programmes détaillé disponible"
      ]
    },
    {
      id: 4,
      icon: Gavel,
      title: "Services Stratégiques Intégrés",
      description: "Externalisation de l'audit et du management des contrats, recouvrement stratégique de créances, financement de procédures contentieuses.",
      points: [
        "Externalisation de l'audit et management des contrats",
        "Recouvrement stratégique de créances",
        "Financement de procédures contentieuses",
        "Accompagnement juridique global"
      ]
    }
  ],
  cta: {
    title: "Un besoin spécifique ?",
    description: "Vous ne trouvez pas exactement le service que vous recherchez ou vous avez un projet particulier ? Contactez‑nous pour co‑concevoir une intervention sur mesure.",
    button: "Discuter de votre projet"
  }
};

const Services = () => {
  const { hero, services, cta } = SERVICES_CONTENT;

  return (
    <>
      <SEO
        title="Nos Expertises"
        description="K-EMPIRE Corporation propose des expertises en conseil stratégique, intelligence stratégique, ingénierie juridique et formation exécutive au Togo."
        url="/services"
        image="/assets/images/services/coverImage.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Expertises K-EMPIRE Corporation",
          "description": "Conseil stratégique, intelligence stratégique, ingénierie juridique et formation exécutive au Togo.",
          "url": "https://kempirecorporation.com/services",
          "provider": {
            "@type": "Organization",
            "name": "K-EMPIRE Corporation"
          }
        }}
      />
      <PageBanner
        title="Nos expertises"
        description="Nous vous accompagnons dans la conception, la sécurisation et la mise en œuvre de vos projets à haute valeur ajoutée."
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Expertises K-EMPIRE CORPORATION"
      />
      <ServicesHero content={hero} />
      <ServicesGrid services={services} />
      <ServicesProcess />
      <HomeValuesMarquee />
      <ServicesTestimonials />
      <ServicesFormationsCatalog />
      <ServicesCTA 
        title={cta.title}
        description={cta.description}
        buttonText={cta.button}
      />
      <HomeNewsletter />
    </>
  );
};

export default Services;
