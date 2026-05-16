import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Phone, Calendar, Download } from 'lucide-react';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';

const FormationsCTA = () => {
  const { openBookingModal } = useBookingModal();
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-container mx-auto px-4">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary via-primary to-[#0a2d47] rounded-3xl overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-h2-m md:text-h2-d text-white mb-6">
                  Des formations taillées sur mesure
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Vous souhaitez une formation adaptée à votre secteur, à vos équipes ou à un projet spécifique ? 
                  Nous concevons des programmes sur mesure alignés sur vos objectifs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" onClick={() => openBookingModal()} className="group">
                    <span>Formation sur mesure</span>
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Link to="/formations" className="inline-flex items-center justify-center px-8 py-4 text-accent font-semibold rounded-pill transition-colors text-small tracking-tight">
                    <Download size={20} className="mr-3" />
                    Catalogue
                  </Link>
                </div>
              </motion.div>

              {/* Right - Image placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/5 rounded-3xl" />
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b04b6ed6?w=600&h=400&fit=crop"
                    alt="Formation sur mesure"
                    className="relative rounded-2xl shadow-2xl w-full h-[300px] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {/* CTA 1 */}
          <div className="bg-bg-alt rounded-2xl p-6 text-center hover:bg-primary group transition-all duration-500 cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
              <FileText size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-bold text-primary group-hover:text-white font-display mb-2 transition-colors duration-300">
              Programme détaillé
            </h4>
            <p className="text-sm text-text-muted group-hover:text-white/80 transition-colors duration-300">
              Recevez le programme complet de la formation qui vous intéresse.
            </p>
          </div>

          {/* CTA 2 */}
          <div className="bg-bg-alt rounded-2xl p-6 text-center hover:bg-primary group transition-all duration-500 cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
              <Calendar size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-bold text-primary group-hover:text-white font-display mb-2 transition-colors duration-300">
              Réserver une session
            </h4>
            <p className="text-sm text-text-muted group-hover:text-white/80 transition-colors duration-300">
              Choisissez votre date et réservez votre place pour une prochaine session.
            </p>
          </div>

          {/* CTA 3 */}
          <div className="bg-bg-alt rounded-2xl p-6 text-center hover:bg-primary group transition-all duration-500 cursor-pointer">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
              <Phone size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-bold text-primary group-hover:text-white font-display mb-2 transition-colors duration-300">
              Échanger avec un conseiller
            </h4>
            <p className="text-sm text-text-muted group-hover:text-white/80 transition-colors duration-300">
              Besoin d'aide pour choisir ? Nos conseillers sont à votre disposition.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsCTA;
