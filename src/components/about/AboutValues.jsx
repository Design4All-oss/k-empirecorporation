import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Timer,
  Lock,
  Award,
  HeartHandshake,
  Target,
  Gem,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';
import { CHARTE_VALEURS } from '../../constants/charte';

const valueIcons = {
  Intégrité: ShieldCheck,
  Célérité: Timer,
  Sécurité: Lock,
  Professionnalisme: Award,
  Proximité: HeartHandshake,
  Pragmatisme: Target,
  Qualité: Gem,
  Innovation: Lightbulb,
};

const AboutValues = () => {
  const { values } = ABOUT_CONTENT;
  const charte = CHARTE_VALEURS;
  
  const groupe1 = charte.groupe1 || [];
  const groupe2 = charte.groupe2 || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

  const renderGroup = (group) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {group.map((value, index) => {
        const Icon = valueIcons[value.titre] || valueIcons.Professionnalisme;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative bg-[#13223e] p-8 md:p-10 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
          >
            {/* Circular Icon with Yellow bg */}
            <div className="w-20 h-20 rounded-full bg-accent/10 group-hover:bg-accent flex items-center justify-center mb-6 transition-colors duration-300">
              <Icon
                size={36}
                className="text-accent group-hover:text-primary transition-colors duration-300"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-4">
              {value.titre}
            </h3>

            <p className="text-sm text-white/60 leading-relaxed mb-6 flex-grow">
              {value.description}
            </p>

            <a href="#contact" className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:text-white transition-colors duration-300">
              En savoir plus
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-primary relative overflow-hidden z-10">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-sm font-bold uppercase tracking-wider text-accent">
              Nos principes fondamentaux
            </span>
            <span className="w-8 h-0.5 bg-accent"></span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold font-display mb-6 leading-tight">
            {values.title || "Ce que nous offrons"}
          </h2>

          <p className="text-lg text-white/60 leading-relaxed">
            {values.intro}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {renderGroup(groupe1)}

          {groupe2.length > 0 && (
            <>
              <div className="flex items-center justify-center gap-4 my-16">
                <span className="h-px w-24 bg-white/10" />
                <span className="text-sm uppercase tracking-widest font-semibold text-white/40">
                  {charte.titreGroupe2}
                </span>
                <span className="h-px w-24 bg-white/10" />
              </div>
              {renderGroup(groupe2)}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutValues;