import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';

const ServicesCTA = ({ title, description, buttonText }) => {
  const { openBookingModal } = useBookingModal();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsSubmitted(false), 3000);
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Colonne 1 : Titre et texte */}
            <div className="text-left">
              <h2 className="text-h2-m md:text-h2-d text-primary font-semibold mb-6 leading-tight">
                {title}
              </h2>
              
              <p className="text-body text-text-muted leading-relaxed">
                {description}
              </p>
            </div>

            {/* Colonne 2 : Réservation */}
            <div className="space-y-4">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Rendez-vous confirmé !</h3>
                  <p className="text-green-700 text-sm">Nous vous contacterons pour confirmer votre réservation.</p>
                </motion.div>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary">
                      Prendre rendez-vous
                    </h3>
                    <p className="text-sm text-text-muted">
                      Reservez un créneau pour discuter de votre projet avec nos experts
                    </p>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={() => openBookingModal()}
                    className="w-full max-w-[280px]"
                  >
                    Réserver un rendez-vous
                    <ArrowRight className="ml-2" size={18} strokeWidth={3} />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <span className="text-sm text-text-muted">ou</span>
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96, y: 0 }}
                      type="button"
                      className="text-sm font-medium text-primary hover:text-accent transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Phone size={16} strokeWidth={2} />
                        Nous appeler
                      </span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTA;
