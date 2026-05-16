import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const values = [
  "Excellence",
  "Intégrité",
  "Innovation",
  "Proximité",
  "Résultat",
  "Qualité",
  "Confidentialité"
];

const HomeValuesMarquee = () => {
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
      <div className="relative max-w-container mx-auto px-4">
        {/* Fade edges - inside the container */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-primary to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-primary to-transparent pointer-events-none z-20" />
        
        <div className="flex overflow-hidden relative z-10">
          <motion.div
            className="flex gap-8 md:gap-12 whitespace-nowrap"
            animate={{
              x: [0, -50 * values.length * 2],
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
            {[...values, ...values, ...values, ...values].map((value, index) => (
              <span
                key={index}
                className="text-lg md:text-xl lg:text-2xl font-medium text-white flex items-center gap-6 md:gap-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {value}
                <span className="flex gap-1">
                  <Star size={14} className="text-accent fill-accent flex-shrink-0" />
                  <Star size={14} className="text-accent fill-accent flex-shrink-0" />
                  <Star size={14} className="text-accent fill-accent flex-shrink-0" />
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeValuesMarquee;
