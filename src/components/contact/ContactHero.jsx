import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactHero = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <span className="text-label text-accent mb-4 block">
              Contact & rendez-vous
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-h1-m md:text-h1-d font-bold text-primary font-display mb-6"
          >
            Une question ? Un projet ?<br />
            <span className="text-accent">Parlons‑en.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed mb-8"
          >
            Vous avez un projet, une question ou un besoin spécifique ? 
            Écrivez‑nous et nous vous répondrons dans les plus brefs délais.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <a href="mailto:contact@k-empirecorporation.com" className="flex items-center gap-3 text-text hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Mail size={18} className="text-accent" />
              </div>
              <span className="text-sm font-medium">contact@k-empirecorporation.com</span>
            </a>
            <a href="tel:+22890000000" className="flex items-center gap-3 text-text hover:text-accent transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Phone size={18} className="text-accent" />
              </div>
              <span className="text-sm font-medium">+228 90 00 00 00</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;