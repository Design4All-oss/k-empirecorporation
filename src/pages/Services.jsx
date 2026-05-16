import React from 'react';
import { 
  Compass, 
  Search, 
  Scale, 
  GraduationCap
} from 'lucide-react';
import PageBanner from '../components/ui/PageBanner';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicesProcess from '../components/services/ServicesProcess';
import HomeValuesMarquee from '../components/home/HomeValuesMarquee';
import ServicesTestimonials from '../components/services/ServicesTestimonials';
import ServicesFormationsCatalog from '../components/services/ServicesFormationsCatalog';
import ServicesCTA from '../components/services/ServicesCTA';
import HomeNewsletter from '../components/home/HomeNewsletter';

// Services content based on content.md
const SERVICES_CONTENT = {
  hero: {
    label: "Nos services",
    title: "Développez et libérez votre potentiel",
    subtitle: "Nous vous accompagnons dans la conception, la sécurisation et la mise en œuvre de vos projets à haute valeur ajoutée.",
    description: "K‑EMPIRE CORPORATION propose un ensemble de services structurés pour répondre aux besoins des entreprises, des administrations et des institutions, qu'il s'agisse de conseil stratégique, d'audit, d'assistance juridique ou de renforcement de capacités."
  },
  services: [
    {
      id: 1,
      icon: Compass,
      title: "Conseil & stratégie d'entreprise",
      description: "Nous aidons les dirigeants et décideurs à prendre des décisions éclairées, à anticiper les risques et à saisir les opportunités de développement.",
      points: [
        "Élaboration, revue et mise en œuvre de plans stratégiques",
        "Appui à la gouvernance et à l'organisation interne",
        "Diagnostic stratégique et recommandations opérationnelles",
        "Accompagnement du changement et conduite de projets structurants"
      ]
    },
    {
      id: 2,
      icon: Search,
      title: "Audit & diagnostic",
      description: "Nos audits vous permettent d'avoir une vision claire des forces et faiblesses de votre organisation, de vos procédures et de vos risques.",
      points: [
        "Audits juridiques et fiscaux : conformité, identification des risques",
        "Diagnostics organisationnels et managériaux",
        "Audits de conformité et de gouvernance",
        "Recommandations avec plan d'actions priorisé"
      ]
    },
    {
      id: 3,
      icon: Scale,
      title: "Assistance juridique, comptable & fiscale",
      description: "Nous sécurisons vos décisions et opérations grâce à un accompagnement juridique, comptable et fiscal adapté à votre contexte.",
      points: [
        "Assistance en droit des affaires (contrats, partenariats, restructuration)",
        "Conseil en fiscalité des entreprises et optimisation",
        "Accompagnement comptable et financier",
        "Préparation et sécurisation des dossiers de contrôle"
      ]
    },
    {
      id: 4,
      icon: GraduationCap,
      title: "Formations & renforcement de capacités",
      description: "Nous concevons des parcours de formation adaptés aux besoins des cadres, dirigeants, experts et étudiants, avec une approche résolument pratique.",
      points: [
        "Formations inter-entreprises sur des thématiques clés",
        "Formations intra-entreprise sur mesure",
        "Formations certifiantes avec validation des acquis",
        "Formations en présentiel et en visioconférence"
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
      <PageBanner
        title="Nos services"
        description="Nous vous accompagnons dans la conception, la sécurisation et la mise en œuvre de vos projets à haute valeur ajoutée."
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Services K-EMPIRE CORPORATION"
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
