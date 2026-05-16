import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox, CheckCircle2 } from 'lucide-react';

const ContactNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-accent rounded-3xl p-8 md:p-16 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-label text-white/80 mb-3 block">
                Restez informé
              </span>
              <h2 className="text-h2-m md:text-h2-d font-bold text-white font-display mb-4">
                Ne manquez aucune Actualité
              </h2>
              <p className="text-body text-white/80">
                Inscrivez-vous à notre newsletter pour recevoir nos actualités, invitations à des événements et nouveaux programmes de formation.
              </p>
            </div>

            <div className="flex-shrink-0 w-full max-w-md">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <p className="text-white font-medium">Merci pour votre inscription !</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                        <Inbox size={24} strokeWidth={1.5} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse e-mail"
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-lg focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                        required
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    S'inscrire
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactNewsletter;