import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AboutAlumni = () => {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div variants={itemVariants}>
            <span className="block w-12 h-px bg-accent mb-6" />

            <h2 className="text-h2-m md:text-h2-d text-white font-bold mb-6 leading-tight">
              K-Empire Alumni Club
            </h2>

            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Un cercle d'influence panafricain et international réservé aux
              diplômés de l'Académie K-EMPIRE.
            </p>

            <p className="text-base text-white/70 leading-relaxed">
              L'appartenance au cercle est une marque d'engagement et de
              rayonnement, nourrie par les 7 Piliers de l'Engagement du
              Manifeste de l'Excellence.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative border border-accent/30 rounded-3xl p-10 md:p-12 text-center overflow-hidden">
              <GraduationCap
                size={220}
                strokeWidth={0.75}
                className="absolute -top-8 -right-8 text-accent/10 pointer-events-none"
              />

              <div className="relative w-20 h-20 mx-auto mb-8 rounded-full border-2 border-accent/40 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-accent/20 flex items-center justify-center">
                  <GraduationCap
                    size={28}
                    className="text-accent"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <p className="text-2xl md:text-3xl text-accent font-display italic mb-6">
                Doctrina, Integritas, Imperium
              </p>

              <span className="block w-10 h-px bg-accent/50 mx-auto mb-6" />

              <p className="text-small text-white/70 uppercase tracking-[0.25em]">
                Savoir, Intégrité, Pouvoir d'agir
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAlumni;