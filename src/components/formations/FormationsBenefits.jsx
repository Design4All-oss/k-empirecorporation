import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';

const benefits = [
  {
    icon: Award,
    title: "Formations certifiantes",
    description: "Certifications reconnues ou attestations de participation délivrées selon le programme suivi."
  },
  {
    icon: Users,
    title: "Formateurs experts",
    description: "Des praticiens et experts reconnus dans leurs domaines respectifs."
  },
  {
    icon: BookOpen,
    title: "Pédagogie active",
    description: "Études de cas, mises en situation et exercices pratiques pour un apprentissage efficace."
  },
  {
    icon: TrendingUp,
    title: "Résultats mesurables",
    description: "Des compétences immédiatement applicables avec un impact réel sur votre performance."
  }
];

const guarantees = [
  "Supports de formation complets fournis",
  "Certification ou attestation délivrée selon le programme",
  "Accès aux ressources post-formation",
  "Suivi personnalisé disponible"
];

const experienceYears = new Date().getFullYear() - 2018;

const stats = [
  { value: "98%+", label: "Taux de satisfaction" },
  { value: "2000+", label: "Professionnels formés" },
  { value: `${experienceYears}+`, label: "Années d'expérience" }
];

const FormationsBenefits = () => {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Pourquoi nous choisir
            </span>
            <h2 className="text-h2-m md:text-h2-d text-primary mt-6 mb-6">
              Une approche pragmatique et orientée résultats
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-10">
              Nos formations sont conçues pour apporter des compétences immédiatement mobilisables sur le terrain, en combinant apports théoriques, études de cas et mises en situation.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
                    className="group"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_8px_24px_-8px_rgba(201,148,0,0.6)]">
                        <IconComponent size={22} className="text-accent transition-colors duration-500 group-hover:text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{benefit.title}</h4>
                        <p className="text-sm text-text-muted leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Button variant="primary" onClick={openBookingModal} className="group">
                <span>Demander un programme détaillé</span>
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          {/* Right - Stats & Guarantees */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
          >
            <div className="relative">
              {/* Outer shell */}
              <div className="p-2 rounded-[2rem] bg-bg-alt ring-1 ring-border">
                <div className="bg-white rounded-[calc(2rem-0.5rem)] p-8 md:p-10">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill="#C99400"
                          className="text-accent"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-text-muted ml-2">4.9/5 satisfaction participant</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-px bg-primary rounded-2xl overflow-hidden mb-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-primary p-6 text-center">
                        <div className="text-3xl font-bold text-accent font-display">{stat.value}</div>
                        <div className="text-sm text-white/80 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Guarantees */}
                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                      <Shield size={20} className="text-success" />
                      Nos garanties
                    </h4>
                    <ul className="space-y-3">
                      {guarantees.map((guarantee, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-text">
                          <CheckCircle size={16} className="text-success flex-shrink-0" />
                          <span>{guarantee}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormationsBenefits;
