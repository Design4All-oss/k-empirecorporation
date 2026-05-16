import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS_LOGOS = [
  { id: 1, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 2, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 3, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 4, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 5, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 6, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 7, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 8, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
];

const HomePartners = () => {
  return (
    <section className="py-16 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-small text-accent mb-2">
            Ils nous font confiance
          </p>
          <h2 className="text-h2-m md:text-h2-d text-primary font-display">
            Nos partenaires et sponsors
          </h2>
        </motion.div>

        <div className="relative">
          {/* Fade effect left */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Fade effect right */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -50 * PARTNERS_LOGOS.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear',
                },
              }}
            >
              {[...PARTNERS_LOGOS, ...PARTNERS_LOGOS, ...PARTNERS_LOGOS].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                    <img 
                      src={partner.src} 
                      alt={partner.alt} 
                      className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePartners;
