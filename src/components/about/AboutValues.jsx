import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';
import { useValeurs } from '../../hooks';
import { CHARTE_VALEURS } from '../../constants/charte';

const valueIcons = [Award, ShieldCheck, HeartHandshake, Zap];

const AboutValues = () => {
  const { values } = ABOUT_CONTENT;
  const { data } = useValeurs();
  const charte = data && (data.groupe1 || []).length ? data : CHARTE_VALEURS;
  const groupe1 = charte.groupe1 || [];
  const groupe2 = charte.groupe2 || [];

  const renderGroup = (group) => (
    <div className="grid grid-cols-2 gap-0">
      {group.map((value, index) => {
        const Icon = valueIcons[index % valueIcons.length];
        const isLastRow = index >= group.length - 2;
        const isLastCol = index % 2 === 1;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`group relative p-8 rounded-none ${!isLastRow ? 'border-b border-white/30' : ''} ${!isLastCol ? 'border-r border-white/30' : ''} hover:border-white/50 transition-all duration-300 cursor-pointer`}
          >
            {/* Icon container */}
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-all duration-500">
                <Icon
                  size={28}
                  className="text-accent group-hover:text-white transition-colors duration-500"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Value title */}
            <h3 className="relative text-xl md:text-2xl text-white font-bold mb-4 group-hover:text-accent transition-colors duration-300">
              {value.titre}
            </h3>

            {/* Value description */}
            <p className="relative text-sm text-white/70 leading-relaxed group-hover:text-white transition-colors duration-300">
              {value.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  return (
    <section className="py-16 md:py-24 bg-primary relative z-0">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          {/* Eyebrow label */}
          <span className="text-label text-accent">
            Nos principes fondamentaux
          </span>

          {/* Main heading */}
          <h2 className="text-h2-m md:text-h2-d text-white font-bold mb-6">
            {values.title}
          </h2>

          {/* Intro text */}
          <p className="text-lg text-white/80 leading-relaxed">
            {values.intro}
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {renderGroup(groupe1)}
          {groupe2.length > 0 && (
            <>
              <div className="border-y border-white/30 py-6 flex items-center justify-center">
                <span className="text-label text-accent uppercase tracking-widest font-semibold">
                  {charte.titreGroupe2}
                </span>
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
