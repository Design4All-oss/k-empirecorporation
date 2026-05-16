import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const processSteps = [
  { step: "01", title: "Diagnostic", desc: "Analyse approfondie de votre situation et de vos enjeux" },
  { step: "02", title: "Stratégie", desc: "Élaboration de recommandations personnalisées" },
  { step: "03", title: "Déploiement", desc: "Mise en œuvre des solutions avec votre équipe" },
  { step: "04", title: "Suivi", desc: "Accompagnement continu et optimisation" }
];

const ServicesProcess = () => {
  return (
    <section className="py-20 md:py-32 bg-[#F5F7FA] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#0E4063]/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#E5A81A]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span 
            variants={itemVariants}
            className="text-small text-accent"
          >
            Notre méthodologie
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-h2-m md:text-h2-d text-primary mt-4 mb-6"
          >
            Comment nous travaillons
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-body-lg text-text-muted max-w-2xl mx-auto"
          >
            Une approche structurée et collaborative pour garantir des résultats mesurables
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {processSteps.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < 3 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/30 to-transparent" />
              )}
              
              {/* Step Number */}
              <div className="w-24 h-24 mx-auto rounded-full bg-white border-2 border-accent/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-accent group-hover:shadow-lg">
                <span className="text-3xl font-bold text-accent font-display">{item.step}</span>
              </div>
              
              <h3 className="text-title text-primary font-semibold mb-3">{item.title}</h3>
              <p className="text-body text-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesProcess;
