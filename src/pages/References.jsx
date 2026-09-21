import React from 'react';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import HomePartners from '../components/home/HomePartners';
import HomeNewsletter from '../components/home/HomeNewsletter';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Handshake, Star, Users, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import { useBookingModal } from '../context/BookingModalContext';

const REFERENCES = [
  {
    icon: Building2,
    title: 'Entreprises',
    text: 'PME et grandes entreprises accompagnées dans leur stratégie, leur gouvernance et leur développement.',
    count: '150+',
  },
  {
    icon: Briefcase,
    title: 'Institutions & ONG',
    text: 'Institutions publiques, organisations internationales et ONG pour des missions de conseil et de formation.',
    count: '30+',
  },
  {
    icon: Handshake,
    title: 'Partenariats',
    text: 'Un réseau de partenaires institutionnels et techniques au Togo, en Afrique et à l’international.',
    count: '25+',
  },
];

const REFERENCES_LIST = [
  { name: 'Entreprises privées', type: 'Conseil stratégique, ingénierie juridique, formation exécutive' },
  { name: 'Institutions publiques', type: 'Accompagnement institutionnel et renforcement de capacités' },
  { name: 'Organisations internationales', type: 'Missions de conseil et études' },
  { name: 'ONG & associations', type: 'Gouvernance, formation et structuration' },
  { name: 'PME & entrepreneurs', type: 'Accompagnement sur mesure et montée en compétences' },
  { name: 'Institutions financières', type: 'Intelligence stratégique et analyse' },
];

const References = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Nos Références & Partenariats"
        description="Entreprises, institutions, ONG et partenaires qui nous font confiance : découvrez les références et partenariats de K-EMPIRE CORPORATION au Togo et en Afrique."
        url="/references-partenariats"
        image="/assets/images/references/hero.webp"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'K-EMPIRE CORPORATION',
          description:
            'Références et partenariats du cabinet K-EMPIRE CORPORATION.',
        }}
      />

      <PageBanner
        title="Nos Références & Partenariats"
        description="Entreprises, institutions, organisations et partenaires qui nous font confiance pour conduire leurs projets vers la performance."
        imageUrl="/assets/images/references/hero.webp"
        imageAlt="Références et partenariats K-EMPIRE CORPORATION"
      />

      {/* Stats / counts */}
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {REFERENCES.map((ref) => (
              <motion.div
                key={ref.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <ref.icon className="mb-3 h-8 w-8 text-accent" />
                <span className="text-4xl font-bold text-white">{ref.count}</span>
                <span className="mt-1 text-sm font-semibold text-white">{ref.title}</span>
                <p className="mt-2 max-w-xs text-sm text-white/60">{ref.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* References list */}
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
              Des missions variées, une exigence constante
            </h2>
            <p className="mt-4 text-gray-600">
              Nous intervenons auprès de profils d'organisations variés, toujours
              avec la même rigueur et le même engagement qualité.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REFERENCES_LIST.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <Award className="mb-4 h-8 w-8 text-accent" />
                <h3 className="mb-2 font-bold text-primary">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <HomePartners />

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-primary p-8 text-center md:p-14"
          >
            <Star className="mx-auto mb-4 h-10 w-10 text-accent" />
            <h2 className="text-h2-m md:text-h2-d text-white font-bold font-display mb-6 leading-tight">
              Rejoignez nos références
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Confiez-nous vos enjeux stratégiques, juridiques ou de formation :
              notre équipe vous accompagne avec une exigence de qualité reconnue.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button onClick={openBookingModal} size="lg" className="bg-accent font-bold text-primary hover:bg-orange-300">
                <Users className="mr-2 h-5 w-5" />
                Devenir partenaire
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <HomeNewsletter />
    </div>
  );
};

export default References;
