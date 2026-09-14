import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const hubs = [
  {
    city: 'Lomé – Abidjan',
    region: 'Afrique de l\'Ouest',
    tagline: 'Ancrage stratégique & Influence panafricaine',
    description: 'De Lomé à Abidjan, notre Hub Afrique de l\'Ouest constitue le socle régional de K-EMPIRE, au cœur des dynamiques économiques, institutionnelles et stratégiques du continent.',
    accent: 'bg-[#C99400]',
    span: 'md:col-span-5',
  },
  {
    city: 'Monaco',
    region: 'Europe',
    tagline: 'Excellence académique & Standards internationaux',
    description: 'Notre Hub Europe, avec Monaco comme point d\'ancrage, connecte K-EMPIRE aux standards internationaux, aux expertises d\'excellence et aux réseaux décisionnels internationaux.',
    accent: 'bg-[#1E3A5F]',
    span: 'md:col-span-7',
  },
  {
    city: 'Dubaï',
    region: 'Moyen-Orient',
    tagline: 'Innovation stratégique & Rayonnement mondial',
    description: 'Depuis Dubaï, notre Hub Moyen-Orient crée des passerelles entre l\'Afrique et les grands centres internationaux de décision, d\'innovation et d\'investissement.',
    accent: 'bg-[#0F2A4A]',
    span: 'md:col-span-12',
  },
];

const HubCard = ({ hub, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-primary text-white ${hub.span} cursor-default`}
    >
      {/* Background city name — large, faded */}
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-12 pointer-events-none select-none overflow-hidden">
        <span className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-display font-bold text-white/[0.03] leading-none whitespace-nowrap -translate-x-4 md:translate-x-0">
          {hub.city}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[320px]">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3">
              {hub.region}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">
              {hub.city}
            </h3>
          </div>
          <div className={`flex-shrink-0 w-2 h-2 rounded-full ${hub.accent} mt-3`} />
        </div>

        {/* Tagline */}
        <p className="text-accent font-semibold text-sm md:text-base mb-4">
          {hub.tagline}
        </p>

        {/* Description */}
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
          {hub.description}
        </p>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const AboutHubs = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const taglineRef = useRef(null);
  const taglineInView = useInView(taglineRef, { once: true, margin: '-60px' });

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header — cinematic center */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mx-auto text-center mb-16 md:mb-20"
        >
          <h2 className="text-h2-m md:text-h2-d font-display text-primary font-bold leading-tight mb-6">
            Nos Hubs Stratégiques
          </h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            Trois pôles stratégiques pour connecter les talents, les expertises et les décideurs, de l'Afrique aux grands centres internationaux.
          </p>
        </motion.div>

        {/* Hub cards — asymmetric bento */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-5 mb-16 md:mb-20">
          {hubs.map((hub, index) => (
            <HubCard key={hub.city} hub={hub} index={index} />
          ))}
        </div>

        {/* Closing tagline */}
        <motion.div
          ref={taglineRef}
          initial={{ opacity: 0, y: 20 }}
          animate={taglineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-12 h-px bg-accent mx-auto mb-8" />
          <p className="text-lg md:text-xl font-display font-semibold text-primary leading-relaxed">
            3 Hubs. Une même exigence : former localement, rayonner régionalement, influencer durablement.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHubs;
