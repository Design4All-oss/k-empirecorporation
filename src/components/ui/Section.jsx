import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, intro, children, variant = 'white', className = '', id }) => {
  const isAlt = variant === 'alt';
  
  return (
    <section 
      id={id}
      className={`py-8 md:py-12 ${isAlt ? 'bg-bg-alt' : 'bg-bg'} ${className}`}
    >
      <div className="max-w-container mx-auto px-4">
        {(title || intro) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 max-w-3xl mx-auto"
          >
            {title && <h2 className="text-h2-m md:text-h2-d text-primary font-semibold mb-4">{title}</h2>}
            {intro && <p className="text-body-lg text-text-muted">{intro}</p>}
          </motion.div>
        )}
        <div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
