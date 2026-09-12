import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useValeurs } from '../../hooks';
import { CHARTE_VALEURS } from '../../constants/charte';

const HomeValuesMarquee = () => {
  const { data } = useValeurs();
  const charte = data && (data.groupe1 || []).length ? data : CHARTE_VALEURS;

  const items = [
    ...(charte.groupe1 || []).map((v) => ({ text: v.titre, label: false })),
    { text: charte.titreGroupe2, label: true },
    ...(charte.groupe2 || []).map((v) => ({ text: v.titre, label: false })),
  ];

  return (
    <section className="py-6 md:py-8 bg-primary relative overflow-hidden">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span 
          className="text-[70px] md:text-[90px] lg:text-[120px] font-bold text-white/[0.05] whitespace-nowrap tracking-tight px-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          K-EMPIRE CORPORATION
        </span>
      </div>

      {/* Marquee container with fade edges */}
      <div className="relative max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fade edges - inside the container */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-primary to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-primary to-transparent pointer-events-none z-20" />
        
        <div className="flex overflow-hidden relative z-10">
          <motion.div
            className="flex gap-8 md:gap-12 whitespace-nowrap"
            animate={{
              x: [0, -50 * items.length * 2],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Double the values for seamless loop */}
            {[...items, ...items, ...items, ...items].map((item, index) => (
              <span
                key={index}
                className={`text-lg md:text-xl lg:text-2xl font-medium flex items-center gap-6 md:gap-8 ${item.label ? 'text-accent uppercase tracking-widest text-base md:text-lg' : 'text-white'}`}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {item.text}
                {!item.label && (
                  <span className="flex gap-1">
                    <Star size={14} className="text-accent fill-accent flex-shrink-0" />
                    <Star size={14} className="text-accent fill-accent flex-shrink-0" />
                    <Star size={14} className="text-accent fill-accent flex-shrink-0" />
                  </span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeValuesMarquee;
