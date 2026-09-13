import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Calendar, Phone } from 'lucide-react';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';

const secondaryCTAs = [
  { icon: FileText, title: "Programme détaillé", description: "Recevez le programme complet de la formation qui vous intéresse." },
  { icon: Calendar, title: "Réserver une session", description: "Choisissez votre date et réservez votre place pour une prochaine session." },
  { icon: Phone, title: "Échanger avec un conseiller", description: "Besoin d'aide pour choisir ? Nos conseillers sont à votre disposition." }
];

const FormationsCTA = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-24 md:py-32 bg-bg-alt relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="relative bg-primary rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-24px_rgba(14,64,99,0.4)]"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-accent/15 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
            <div
              className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]"
            />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
              >
                <h2 className="text-h2-m md:text-h2-d text-white font-bold font-display leading-tight mb-6">
                  Des formations taillées{" "}
                  <span className="text-accent-light">sur mesure</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-10">
                  Vous souhaitez une formation adaptée à votre secteur, à vos équipes ou à un projet spécifique ?
                  Nous concevons des programmes sur mesure alignés sur vos objectifs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" onClick={() => openBookingModal()} className="group">
                    <span>Formation sur mesure</span>
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Link
                    to="/formations#formations"
                    className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/20 px-8 py-4 text-small font-semibold tracking-tight text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Parcourir le catalogue
                  </Link>
                </div>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.25 }}
                className="hidden lg:block"
              >
                <div className="p-1.5 rounded-[2rem] bg-white/10 ring-1 ring-white/15">
                  <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b04b6ed6?w=700&h=500&fit=crop"
                      alt="Formation sur mesure K-EMPIRE"
                      className="w-full h-[340px] object-cover"
                    />
                  </div>
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
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {secondaryCTAs.map((cta, index) => {
            const Icon = cta.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 ring-1 ring-border hover:ring-accent/40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(14,64,99,0.12)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_8px_24px_-8px_rgba(201,148,0,0.6)]">
                  <Icon size={22} className="text-accent transition-colors duration-500 group-hover:text-white" />
                </div>
                <h4 className="font-bold text-primary font-display mb-2">{cta.title}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{cta.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsCTA;
