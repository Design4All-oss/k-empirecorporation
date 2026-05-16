import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Users } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';

const teamExpertises = [
  "Juristes d'affaires",
  "Fiscalistes",
  "Experts-comptables",
  "Spécialistes management",
  "Ressources humaines",
  "Stratégie & Marketing"
];

const AboutTeam = () => {
  const { team } = ABOUT_CONTENT;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow label */}
            <span className="text-label text-accent mb-4 block">
              Notre équipe
            </span>

            {/* Main heading */}
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold mb-6 leading-tight">
              Une équipe multidisciplinaire à votre service
            </h2>

            {/* Main text */}
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              {team.text}
            </p>

            {/* Expertises list with checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {teamExpertises.map((expertise, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Check size={12} className="text-accent" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-text">{expertise}</span>
                </motion.div>
              ))}
            </div>

            {/* Accordion card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-[#1E3A5F]"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-start gap-4 p-6 text-left"
              >
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Users size={24} className="text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white">
                    Une diversité de profils
                  </h4>
                </div>
                <div className="text-accent text-2xl font-light">
                  {isOpen ? '−' : '+'}
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-sm text-white/80 leading-relaxed">
                        {team.highlight}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Images Section - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image - top */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden shadow-xl mb-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600"
                  alt="Équipe K-EMPIRE"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Bottom images row */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
                    alt="Collaboration"
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
                    alt="Expertise"
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="text-xs text-accent font-semibold">Expertise</p>
                  <p className="text-sm text-primary font-bold">Multidisciplinaire</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
