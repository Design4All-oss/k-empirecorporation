import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import HomeNewsletter from '../components/home/HomeNewsletter';
import { motion } from 'framer-motion';
import { Scale, GraduationCap, Compass, BrainCircuit, Users, Globe, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useBookingModal } from '../context/BookingModalContext';

const DOMAINES = [
  {
    icon: Scale,
    title: 'Experts juridiques',
    text: 'Avocats, juristes et fiscalistes pour l’ingénierie juridique, comptable et fiscale.',
  },
  {
    icon: Compass,
    title: 'Conseils en stratégie',
    text: 'Consultants seniors en stratégie, gouvernance et développement des organisations.',
  },
  {
    icon: BrainCircuit,
    title: 'Spécialistes de l’intelligence stratégique',
    text: 'Analystes de la veille, de la prospective et de l’intelligence économique.',
  },
  {
    icon: GraduationCap,
    title: 'Formateurs exécutifs',
    text: 'Experts pédagogiques pour la formation des dirigeants et des équipes.',
  },
  {
    icon: Users,
    title: 'Professionnels métiers',
    text: 'Comptables, auditeurs, RH, managers et spécialistes de la négociation.',
  },
  {
    icon: Globe,
    title: 'Réseau international',
    text: 'Un vivier d’experts nationaux et internationaux mobilisable selon les missions.',
  },
];

const METHODE = [
  'Sélection rigoureuse des experts selon l’expertise et l’expérience terrain',
  'Mise en relation directe entre votre organisation et le bon expert',
  'Supervision qualité de chaque mission par l’équipe K-EMPIRE CORPORATION',
  'Engagement de confidentialité et de déontologie professionnelle',
];

const Ecosysteme = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Notre Écosystème d'Experts"
        description="Découvrez l'écosystème d'experts de K-EMPIRE CORPORATION : juristes, consultants en stratégie, formateurs exécutifs et spécialistes de l'intelligence stratégique au service de votre performance."
        url="/ecosysteme-experts"
        image="/assets/images/ecosysteme/hero.webp"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'K-EMPIRE CORPORATION',
          description: "L'écosystème d'experts de K-EMPIRE CORPORATION.",
        }}
      />

      <PageBanner
        title="Notre Écosystème d'Experts"
        description="Un réseau d'experts nationaux et internationaux mobilisés autour de vos enjeux : droit, stratégie, formation et intelligence économique."
        imageUrl="/assets/images/ecosysteme/hero.webp"
        imageAlt="Écosystème d'experts K-EMPIRE CORPORATION"
      />

      {/* Domaines */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
              Des experts complémentaires et engagés
            </h2>
            <p className="mt-4 text-gray-600">
              Chaque mission mobilise les meilleures compétences, issues de notre
              réseau d'experts de haut niveau.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DOMAINES.map((domaine, index) => (
              <motion.div
                key={domaine.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent">
                  <domaine.icon className="h-7 w-7 text-accent transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-primary">{domaine.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{domaine.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
                Une mise en relation rigoureuse
              </h2>
              <div className="mt-8 space-y-5">
                {METHODE.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-bold text-accent">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button onClick={openBookingModal} size="lg">
                  Rejoindre notre réseau d'experts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center rounded-full border-2 border-primary px-8 font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Nous contacter
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
                alt="Équipe d'experts en réunion"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <HomeNewsletter />
    </div>
  );
};

export default Ecosysteme;
