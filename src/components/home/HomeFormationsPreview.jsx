import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen, Calendar } from 'lucide-react';
import { useFormations } from '../../hooks';
import Button from '../ui/Button';

const HomeFormationsPreview = () => {
  const { data: apiFormations } = useFormations();

  const formations = apiFormations && apiFormations.length > 0
    ? apiFormations.slice(0, 3)
    : [
        { id: 1, slug: 'inter-entreprises', title: "Formations inter-entreprises", hook: "Des sessions ouvertes réunissant des professionnels de divers horizons pour favoriser les échanges d'expériences et monter en compétences ensemble.", format: "Présentiel", duration: "3 jours", objectives: [1, 2, 3, 4, 5] },
        { id: 2, slug: 'intra-entreprise', title: "Formations intra-entreprise", hook: "Des programmes conçus spécifiquement pour votre organisation, adaptés à vos enjeux et à vos équipes.", format: "En ligne", duration: "2 jours", objectives: [1, 2, 3, 4] },
        { id: 3, slug: 'en-ligne', title: "Formations en ligne", hook: "Des formations accessibles à distance via visioconférence, pour toucher vos équipes où qu'elles se trouvent.", format: "En ligne", duration: "1 jour", objectives: [1, 2, 3] }
      ];

  const featured = formations[0];
  const rest = formations.slice(1, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-bg-alt relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <BookOpen size={18} className="text-accent" />
            </div>
            <span className="text-small font-medium text-accent tracking-wide uppercase">Formations</span>
          </div>

          <h2 className="text-h2-m md:text-h2-d font-bold text-primary font-display leading-[1.05] mb-5">
            Formations certifiantes et sur mesure
          </h2>

          <p className="text-body text-text-muted leading-relaxed max-w-2xl mx-auto">
            Nos formations sont conçues pour apporter des compétences immédiatement mobilisables sur le terrain, en combinant apports théoriques, études de cas et mises en situation.
          </p>
        </motion.div>

        {/* ── Grid: Featured + 2 Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-5"
        >
          {/* Featured Card — spans 3 cols */}
          {featured && (
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-border/40 hover:shadow-lg transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featured.image || '/assets/images/formationImage.png'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                    {featured.format || 'Présentiel'}
                  </span>
                  <span className="px-3 py-1 bg-white/90 text-primary text-xs font-semibold rounded-full flex items-center gap-1.5">
                    <Clock size={12} />
                    {featured.duration || '3 jours'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 group-hover:text-accent-dark transition-colors duration-300 font-display">
                  {featured.title}
                </h3>

                <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
                  {featured.hook || featured.description || 'Formation professionnelle pour développer vos compétences et booster votre carrière.'}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-5 mb-6 text-xs text-text-muted">
                  {featured.objectives && (
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="text-accent" />
                      <span>{featured.objectives.length} modules</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-accent" />
                    <span>Groupes à taille humaine</span>
                  </div>
                </div>

                <Link to={`/formations/${featured.slug || featured.id}`}>
                  <Button variant="primary" className="rounded-full">
                    Découvrir cette formation
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Side Cards — span 2 cols, stacked */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((formation, index) => (
              <motion.div
                key={formation.id || index}
                variants={itemVariants}
                className="group relative flex flex-col sm:flex-row lg:flex-col xl:flex-row rounded-2xl overflow-hidden bg-white shadow-sm border border-border/40 hover:shadow-lg transition-shadow duration-500 flex-1"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-40 lg:w-full xl:w-40 h-40 sm:h-auto lg:h-44 xl:h-auto flex-shrink-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${formation.image || '/assets/images/formationImage.png'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 sm:bg-gradient-to-r lg:bg-gradient-to-t xl:bg-gradient-to-r" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-accent text-white text-[11px] font-semibold rounded-full">
                      {formation.format || 'En ligne'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-primary mb-2 group-hover:text-accent-dark transition-colors duration-300 leading-tight">
                      {formation.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                      {formation.hook || formation.description || 'Formation professionnelle pour développer vos compétences.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock size={13} className="text-accent" />
                      <span>{formation.duration || '2 jours'}</span>
                    </div>
                    <Link
                      to={`/formations/${formation.slug || formation.id}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
                    >
                      Voir
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 md:mt-14"
        >
          <Link to="/formations">
            <Button variant="outline" className="rounded-full">
              Consulter le catalogue de formations
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFormationsPreview;
