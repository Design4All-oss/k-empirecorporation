import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, GraduationCap } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';

const teamRoles = [
  "Avocats & Juristes d'affaires",
  "Magistrats & Hauts responsables publics",
  "Dirigeants & Cadres exécutifs",
  "Universitaires & Chercheurs",
  "Experts sectoriels & Consultants internationaux",
  "Praticiens et spécialistes reconnus"
];

const comiteRoles = [
  "Valide l'architecture et les contenus des programmes",
  "Veille à la qualité et à la pertinence pédagogique",
  "Garantit l'exigence académique des parcours certifiants"
];

const AboutTeam = () => {
  const { team } = ABOUT_CONTENT;
  const [comiteOpen, setComiteOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
              Une communauté d'experts d'exception
            </h2>

            {/* Main text */}
            <div className="space-y-4 text-lg text-text-muted leading-relaxed mb-8">
              <p>
                <span className="text-primary font-medium">K-EMPIRE CORPORATION s'appuie sur un réseau d'experts nationaux et internationaux</span>, réunissant avocats, magistrats, universitaires, dirigeants, hauts responsables publics, consultants et praticiens reconnus.
              </p>
              <p>
                Des profils <span className="text-primary font-medium">expérimentés, engagés et issus de différents environnements professionnels</span>, mobilisés pour apporter une expertise de haut niveau et une vision directement connectée aux réalités de la décision.
              </p>
              <p>
                <span className="text-primary font-semibold">Nos programmes Executive Education bénéficient de l'exigence et du regard de notre Comité Scientifique International.</span>
              </p>
            </div>

            {/* Expert roles list with bullet points */}
            <ul className="space-y-3 mb-8">
              {teamRoles.map((role, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent" />
                  <span className="text-base text-text">{role}</span>
                </motion.li>
              ))}
            </ul>

            {/* Comité Scientifique International */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`bg-primary transition-all duration-300 ${comiteOpen ? 'bg-primary' : 'bg-primary/80'} p-6`}
            >
              <button
                type="button"
                onClick={() => setComiteOpen(!comiteOpen)}
                aria-expanded={comiteOpen}
                className="w-full flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <GraduationCap size={24} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white">
                      Comité Scientifique International
                    </h4>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wide mt-1">
                      Collège des Sages
                    </p>
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 transition-transform duration-300 ${comiteOpen ? 'rotate-180' : ''}`}
                >
                  <ChevronDown size={20} className="text-accent" strokeWidth={2} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {comiteOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-white/80 leading-relaxed mb-5 pt-5">
                      Composé de <span className="text-accent font-semibold">hauts responsables, magistrats, universitaires et experts de référence</span>, notre Comité Scientifique International veille à l'exigence académique et à la qualité des programmes de <span className="text-accent font-bold">K-EMPIRE Executive Education</span>.
                    </p>
                    <ul className="space-y-3">
                      {comiteRoles.map((role, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent" />
                          <span className="text-sm text-white/90">{role}</span>
                        </li>
                      ))}
                    </ul>
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
              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="/assets/images/about/equipes.webp"
                  alt="Équipe K-EMPIRE"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
