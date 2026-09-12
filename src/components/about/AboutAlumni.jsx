import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const AboutAlumni = () => {
  return (
    <section className="py-16 md:py-24 bg-[#1E3A5F] relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/15 flex items-center justify-center">
            <GraduationCap size={32} className="text-accent" strokeWidth={1.5} />
          </div>

          <h2 className="text-h2-m md:text-h2-d text-white font-bold mb-6 leading-tight">
            K-Empire Alumni Club
          </h2>

          <p className="text-lg text-white/80 leading-relaxed mb-8">
            Un cercle d'influence panafricain et international réservé aux diplômés de l'Académie K-EMPIRE.
          </p>

          <div className="relative bg-white/5 border border-accent/20 rounded-2xl p-8 mb-8">
            <p className="text-2xl md:text-3xl text-accent font-display italic mb-3">
              Doctrina, Integritas, Imperium
            </p>
            <p className="text-sm text-white/70 tracking-wide uppercase font-semibold">
              Savoir, Intégrité, Pouvoir d'agir
            </p>
          </div>

          <p className="text-base text-white/70 leading-relaxed">
            L'appartenance au cercle est une marque d'engagement et de rayonnement, nourrie par les 7 Piliers de l'Engagement du Manifeste de l'Excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAlumni;