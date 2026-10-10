import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Monitor, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FORMATION_TYPES } from '../../constants/content';

const iconMap = { Users, Building2, Monitor };

const FormationsTypes = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-tight mb-6">
            Une offre adaptée à vos besoins
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Choisissez le format qui convient le mieux à votre organisation et à vos objectifs de développement des compétences.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FORMATION_TYPES.map((type, index) => {
            const IconComponent = iconMap[type.icon];
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: index * 0.12 }}
                className="group relative flex flex-col bg-white rounded-3xl p-8 ring-1 ring-border hover:ring-accent/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(14,64,99,0.12)]"
              >
                {/* Number */}
                <span className="absolute top-8 right-8 font-display text-5xl font-bold text-primary/5 group-hover:text-accent/20 transition-colors duration-500" aria-hidden="true">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <IconComponent size={26} className="text-accent" />
                </div>

                <h3 className="text-xl font-bold text-primary font-display mb-3">
                  {type.title}
                </h3>
                <p className="text-text-muted mb-7 leading-relaxed flex-1">
                  {type.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-success" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent group/link transition-colors hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-pill"
                >
                  Demander un programme
                  <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FormationsTypes;
