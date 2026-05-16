import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const HomeWhyUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  const items = [
    { title: "Une approche globale", description: "Nous accompagnons votre organisation de manière holistique, en prenant en compte tous les aspects de votre développement." },
    { title: "Une expertise pointue", description: "Notre équipe dispose de compétences reconnues dans les domaines du droit, de la finance, du management et de la stratégie." },
    { title: "Un partenariat durable", description: "Nous construisons des relations long terme avec nos clients, fondées sur la confiance et la résultats mesurables." },
    { title: "Une méthodologie agile", description: "Nos méthodes s'adaptent à votre contexte et evoluent avec vos besoins pour une efficacité optimale." }
  ];

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/assets/images/whyImage.png" 
              alt="Pourquoi K-EMPIRE" 
              className="w-full h-[300px] lg:h-[500px] object-contain"
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <span className="text-small text-accent mb-3">
              Pourquoi nous choisir ?
            </span>
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-none mb-4">
              Votre partenaire pour l'excellence
            </h2>
            <p className="text-body text-text-muted mb-8 max-w-lg">
              Nous accompagnons les organisations vers la réussite grâce à une expertise multidisciplinary et une approche centrée sur vos résultats.
            </p>

            {/* Accordion Items - 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {items.map((item, index) => (
                <div key={index} className="relative">
                  <div className={`bg-primary transition-all duration-300 ${openIndex === index ? 'bg-primary' : 'bg-primary/80'}`}>
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-semibold text-white pr-2">
                        {item.title}
                      </span>
                      {openIndex === index ? (
                        <Minus size={20} className="text-accent flex-shrink-0" />
                      ) : (
                        <Plus size={20} className="text-accent flex-shrink-0" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-4 pb-4">
                        <p className="text-small text-white/80">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeWhyUs;
