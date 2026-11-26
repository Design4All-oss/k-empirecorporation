import React from 'react';
import { motion } from 'framer-motion';
import { usePartenaires } from '../../hooks/useSiteContent';

const HomePartners = () => {
  const { data: partenaires = [] } = usePartenaires();

  if (!partenaires.length) return null;

  return (
    <section className="py-12 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
      `}</style>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-tight mb-6">
            Ils nous font confiance
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <div className="animate-marquee flex gap-10 items-center shrink-0">
              {[...partenaires, ...partenaires].map((partner, index) => (
                <div
                  key={`${partner.nom}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-24 h-14 md:w-32 md:h-18 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.nom}
                      className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePartners;
