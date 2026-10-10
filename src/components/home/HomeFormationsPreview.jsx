import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, BookOpen } from 'lucide-react';
import Button from '../ui/Button';
import { useFormations } from '../../hooks';

const ease = [0.22, 1, 0.36, 1];

const HomeFormationsPreview = () => {
  const { data: apiFormations } = useFormations();

  const formations = apiFormations && apiFormations.length > 0
    ? apiFormations.slice(0, 3)
    : [
        { id: 1, slug: 'inter-entreprises', title: "Formations inter-entreprises", hook: "Des sessions ouvertes réunissant des professionnels de divers horizons pour favoriser les échanges d'expériences et monter en compétences ensemble.", format: "Présentiel", duration: "3 jours", objectives: [1, 2, 3, 4, 5] },
        { id: 2, slug: 'intra-entreprise', title: "Formations intra-entreprise", hook: "Des programmes conçus spécifiquement pour votre organisation, adaptés à vos enjeux et à vos équipes.", format: "En ligne", duration: "2 jours", objectives: [1, 2, 3, 4] },
        { id: 3, slug: 'en-ligne', title: "Formations en ligne", hook: "Des formations accessibles à distance via visioconférence, pour toucher vos équipes où qu'elles se trouvent.", format: "En ligne", duration: "1 jour", objectives: [1, 2, 3] }
      ];

  const [hero, c2, c3] = formations;

  // Bento 2×2 seulement quand la grille est réellement remplie (3 formations).
  const compact = formations.length < 3;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  const IMG = (f) => f.image;

  return (
    <section className="py-14 md:py-20 bg-bg-alt">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 md:mb-10"
        >
          <div>
            <h2 className="text-h2-m md:text-h2-d font-bold text-primary font-display leading-tight mb-6">
              Formations certifiantes et sur mesure
            </h2>
            <p className="text-body text-text-muted leading-relaxed max-w-2xl">
              Nos formations sont conçues pour apporter des compétences immédiatement mobilisables sur le terrain, en combinant apports théoriques, études de cas et mises en situation.
            </p>
          </div>
          <Link to="/formations" className="shrink-0">
            <Button variant="outline" className="group whitespace-nowrap">
              Toutes nos formations
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[1fr_1fr] gap-4"
        >
          {/* ── Hero Card — 2 cols × 2 rows ── */}
          {hero && (
            <motion.div variants={item} className={compact ? '' : 'lg:col-span-2 lg:row-span-2'}>
              <Link
                to={`/formations/${hero.slug || hero.id}`}
                className="group relative flex flex-col h-full min-h-[300px] rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                {/* Couverture — visuel du graphiste, jamais voilé */}
                <div className="relative h-[180px] sm:h-[220px] lg:h-[250px] shrink-0 overflow-hidden bg-bg-alt">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundImage: IMG(hero) && `url(${IMG(hero)})` }}
                  />
                </div>

                {/* Textes sous la couverture */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {hero.formationType && (
                    <span className="self-start mb-3 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                      {hero.formationType}
                    </span>
                  )}

                  {/* Title + description */}
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary font-display leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
                      {hero.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                      {hero.hook || hero.description || 'Formation professionnelle pour développer vos compétences.'}
                    </p>

                    {/* Meta */}
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-gray-100">
                      {hero.program && hero.program.length > 0 && (
                        <div className="flex items-center gap-1.5 text-text-muted text-xs">
                          <BookOpen size={13} />
                          <span>{hero.program.length} modules</span>
                        </div>
                      )}
                      {hero.trainers && hero.trainers.length > 0 && (
                        <div className="flex items-center gap-1.5 text-text-muted text-xs">
                          <Users size={13} />
                          <span>
                            {hero.trainers.length} intervenant{hero.trainers.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      {hero.duration && (
                        <div className="flex items-center gap-1.5 text-text-muted text-xs">
                          <Clock size={13} />
                          <span>{hero.duration}</span>
                        </div>
                      )}
                      <span className="ml-auto flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-accent transition-colors duration-300">
                        Découvrir
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── Card 2 — right column top ── */}
          {c2 && (
            <motion.div variants={item}>
              <Link
                to={`/formations/${c2.slug || c2.id}`}
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                {/* Square image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ backgroundImage: IMG(c2) && `url(${IMG(c2)})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-accent text-white text-[11px] font-semibold rounded-full">
                    {c2.format || 'En ligne'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-primary mb-2 group-hover:text-accent-dark transition-colors duration-300 leading-tight font-display">
                    {c2.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                    {c2.hook || c2.description || 'Formation professionnelle pour développer vos compétences.'}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock size={13} className="text-accent" />
                      {c2.duration || '2 jours'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent transition-colors duration-300">
                      Voir
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── Card 3 — right column bottom ── */}
          {c3 && (
            <motion.div variants={item}>
              <Link
                to={`/formations/${c3.slug || c3.id}`}
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ backgroundImage: IMG(c3) && `url(${IMG(c3)})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-accent text-white text-[11px] font-semibold rounded-full">
                    {c3.format || 'En ligne'}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-primary mb-2 group-hover:text-accent-dark transition-colors duration-300 leading-tight font-display">
                    {c3.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                    {c3.hook || c3.description || 'Formation professionnelle pour développer vos compétences.'}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock size={13} className="text-accent" />
                      {c3.duration || '2 jours'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent transition-colors duration-300">
                      Voir
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default HomeFormationsPreview;
