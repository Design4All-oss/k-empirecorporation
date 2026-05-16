import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, ArrowRight, Clock, Shield, MessageCircle, MapPin } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';
import Button from '../ui/Button';
import contactImage from '/assets/images/contactImage.webp';

const AboutContactCta = () => {
  const { cta } = ABOUT_CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'ease-out' } },
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white rounded-3xl relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">
            {/* Colonne 1 : Titre et texte */}
            <motion.div variants={itemVariants} className="text-left">
              <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
                {cta.title}
              </h2>
              
              <p className="text-body text-text-muted leading-relaxed">
                {cta.text}
              </p>
            </motion.div>

            {/* Colonne 2 : Image */}
            <motion.div variants={itemVariants} className="flex justify-center relative">
              <div className="w-full max-w-[360px] relative">
                <img 
                  src={contactImage} 
                  alt="Contact" 
                  className="w-full h-auto object-contain rounded-3xl"
                />
              </div>
            </motion.div>

            {/* Colonne 3 : Items de rassurance + contact + boutons */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Items de rassurance */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Clock size={18} className="text-accent flex-shrink-0" />
                  <span className="text-small">Réponse sous 24h</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <MessageCircle size={18} className="text-accent flex-shrink-0" />
                  <span className="text-small">Consultation gratuite</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Shield size={18} className="text-accent flex-shrink-0" />
                  <span className="text-small">Confidentialité assurée</span>
                </div>
              </div>

              {/* Séparateur */}
              <div className="h-px bg-border" />

              {/* Contact info */}
              <div className="space-y-3">
                <a href="mailto:contact@k-empirecorporation.com" className="flex items-center gap-3 text-primary hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <span className="text-body-sm font-medium">contact@k-empirecorporation.com</span>
                </a>
                <a href="tel:+228XXXXXXXX" className="flex items-center gap-3 text-primary hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <PhoneCall size={18} className="text-accent" />
                  </div>
                  <span className="text-body-sm font-medium">+228 XX XX XX XX</span>
                </a>
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <span className="text-body-sm font-medium">Kara, Togo</span>
                </div>
              </div>

              {/* Séparateur */}
              <div className="h-px bg-border" />

              {/* Boutons */}
              <div className="flex items-center gap-3">
                <Button variant="primary" size="lg" className="group cursor-pointer justify-center">
                  {cta.button}
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} strokeWidth={3} />
                </Button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96, y: 0 }}
                  className="w-12 h-12 rounded-full border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary cursor-pointer flex items-center justify-center flex-shrink-0 bg-transparent transition-all duration-300"
                  aria-label="Contact Direct"
                >
                  <PhoneCall size={20} strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContactCta;