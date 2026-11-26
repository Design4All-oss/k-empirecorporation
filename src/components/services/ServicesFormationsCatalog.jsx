import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { useFormations } from '../../hooks';
import Button from '../ui/Button';

const ease = [0.22, 1, 0.36, 1];

const ServicesFormationsCatalog = () => {
  const { data: apiFormations } = useFormations();
  const formations = (apiFormations || []).slice(0, 6);

  const IMG = (f) => f.image;

  if (formations.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-tight mb-6">
            Nos formations disponibles
          </h2>
          <p className="text-text-muted max-w-2xl">
            Découvrez nos programmes certifiants conçus pour développer les compétences clés de vos équipes.
          </p>
        </motion.div>

        {/* ── Grid 6 formations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {formations.map((f, idx) => (
            <motion.div
              key={f.id || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease }}
            >
              <Link
                to={`/formations/${f.slug || f.id}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-border/40 hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {IMG(f) && (
                    <img
                      src={IMG(f)}
                      alt={f.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {f.formationType && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-accent text-white text-[11px] font-semibold rounded-full">
                      {f.formationType}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-base font-bold text-primary mb-2 group-hover:text-accent-dark transition-colors duration-300 leading-tight font-display line-clamp-2">
                    {f.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-4">
                    {f.hook || 'Formation professionnelle pour développer vos compétences.'}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock size={13} className="text-accent" />
                      {f.duration || '2 jours'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent transition-colors duration-300">
                      Voir
                      <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link to="/formations">
            <Button variant="outline" className="group">
              Toutes nos formations
              <ChevronRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesFormationsCatalog;
