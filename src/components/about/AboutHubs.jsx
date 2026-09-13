import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Compass, Scale } from 'lucide-react';

const AboutHubs = () => {
  const hubs = [
    {
      icon: Landmark,
      city: 'Monaco',
      focus: 'Gouvernance financière & compliance',
      description: 'Notre antenne monégasque assure le lien entre nos clients et les standards internationaux de conformité, de gouvernance et de gestion financière.',
    },
    {
      icon: Compass,
      city: 'Dubaï',
      focus: 'Agilité stratégique & innovation',
      description: 'Au carrefour de l\'Europe, de l\'Asie et de l\'Afrique, notre hub de Dubaï pilote l\'innovation stratégique et les partenariats internationaux de l\'Académie.',
    },
    {
      icon: Scale,
      city: 'Abidjan – Lomé',
      focus: 'Droit des affaires OHADA & finance régionale',
      description: 'Notre ancrage ouest-africain nous permet d\'accompagner les organisations sur les enjeux juridiques et financiers de la zone OHADA.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-h2-m md:text-h2-d font-display text-primary font-bold leading-tight mb-6">
            Nos hubs internationaux
          </h2>
          <p className="text-body-lg text-text-muted">
            Une présence stratégique en Europe, au Moyen-Orient et en Afrique pour servir l'excellence au plus près des territoires.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {hubs.map((hub, index) => {
            const Icon = hub.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-[#F5F7FA] rounded-2xl p-8 hover:bg-[#1E3A5F] transition-colors duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-accent/15 flex items-center justify-center mb-6 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                  {hub.city}
                </h3>
                <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                  {hub.focus}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {hub.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHubs;
