import React from 'react';
import { motion } from 'framer-motion';

const AboutIntro = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <h2 className="text-h1-m md:text-h1-d text-primary font-bold font-display mb-8 leading-tight">
            Notre Histoire
          </h2>

          {/* Opening Paragraph - Storytelling */}
          <div className="space-y-5 text-base md:text-lg text-text-muted leading-relaxed text-justify">
            <p>
              Tout est né d'une conviction simple : <span className="text-primary font-semibold">l'excellence n'est pas une destination, mais une exigence permanente.</span>
            </p>
            <p>
              Née à Kara, au cœur du Togo, <span className="text-primary font-medium">K-EMPIRE CORPORATION</span> s'est construite autour d'une ambition : réunir expertise, intelligence stratégique et exigence professionnelle pour accompagner celles et ceux qui prennent des décisions et construisent l'avenir.
            </p>
            <p>
              Au fil de son développement, le cabinet a élargi son champ d'intervention pour accompagner <span className="text-primary font-medium">entreprises, institutions publiques, organisations financières et acteurs internationaux</span> dans des environnements où la maîtrise du droit, de la gouvernance, de la stratégie et des enjeux réglementaires constitue un véritable levier de performance.
            </p>
            <p>
              Notre parcours nous a conduits d'une expertise de proximité à une ambition panafricaine ouverte sur le monde. Aujourd'hui, <span className="text-primary font-medium">K-EMPIRE CORPORATION articule conseil, expertise et Executive Education</span> pour renforcer les capacités des organisations et développer les compétences de professionnels appelés à exercer des responsabilités croissantes.
            </p>
            <p>
              À travers son <span className="text-primary font-medium">Executive Education, K-EMPIRE développe une approche fondée sur l'excellence académique, l'impact opérationnel et le partage d'expériences, afin de former des professionnels capables <span className="text-primary font-bold">d'analyser avec rigueur, de décider avec discernement et d'agir avec responsabilité.</span></span>
            </p>
            <p>
              Notre mission demeure au cœur de notre identité : créer de la valeur, sécuriser la décision et contribuer à faire émerger une nouvelle génération de leaders africains, capables de transformer durablement leur environnement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntro;
