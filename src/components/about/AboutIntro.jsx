import React from 'react';
import { motion } from 'framer-motion';

const AboutIntro = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <h1 className="text-h1-m md:text-h1-d text-primary font-bold font-display mb-8 leading-tight">
            Notre Histoire
          </h1>

          {/* Opening Paragraph - Storytelling */}
          <div className="space-y-5 text-base md:text-lg text-text-muted leading-relaxed text-justify">
            <p>
              Tout a commencé par une conviction profonde : <span className="text-primary font-semibold">chaque organisation mérite d'exceler.</span>
            </p>
            <p>
              Née à Kara, au cœur du Togo, <span className="text-primary font-medium">K-EMPIRE CORPORATION</span> est née de la rencontre d'experts passionnés : juristes, comptables, fiscalistes et spécialistes des questions sociales; unis par un même engagement : accompagner les entreprises vers leur plein potentiel.
            </p>
            <p>
              Aujourd'hui, nous nous tenons aux côtés des entreprises, des administrations publiques, des institutions financières et des organisations internationales qui osent ambitionner plus. Des PME audacieuses aux grands groupes en quête de performance durable, nous devenons le partenaire de celles et ceux qui refusent la médiocrité.
            </p>
            <p>
              Notre parcours nous a transformés. De cabinet local, nous sommes devenus une référence en expertise juridique, comptable, fiscale et sociale. <span className="text-primary font-semibold">Mais notre mission reste la même</span> : voir nos partenaires grandir, prospérer et à leur tour, inspirer d'autres succès.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntro;
