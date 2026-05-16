import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Shield,
  Star,
  CheckCircle
} from 'lucide-react';
import Button from '../ui/Button';

const benefits = [
  {
    icon: Award,
    title: "Formations certifiantes",
    description: "Obtenez des certifications reconnues qui valorisent votre parcours professionnel."
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
  "Attestation de participation délivrée",
  "Accès aux ressources post-formation",
  "Suivi personnalisé disponible"
];

const FormationsBenefits = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-alt relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-label text-accent">
              Pourquoi nous choisir
            </span>
            <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-6">
              Une approche pragmatique et orientée résultats
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Nos formations sont conçues pour apporter des compétences immédiatement mobilisables sur le terrain, en combinant apports théoriques, études de cas et mises en situation.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <IconComponent size={24} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{benefit.title}</h4>
                      <p className="text-sm text-text-muted">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button variant="primary">
                Demander un programme détaillé
              </Button>
            </div>
          </motion.div>

          {/* Right - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg relative">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      fill={i === 4 ? "none" : "#E5A81A"} 
                      className={i === 4 ? "text-accent" : "text-accent"}
                    />
                  ))}
                </div>
                <span className="text-sm text-text-muted">4.9/5 satisfaction participant</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-0 mb-8 relative bg-primary rounded-2xl p-6">
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
                {/* Horizontal line */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20" />
                
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-white font-display">2000+</div>
                  <div className="text-sm text-accent mt-1">Participants formés</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-white font-display">98%</div>
                  <div className="text-sm text-accent mt-1">Taux de satisfaction</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-white font-display">50+</div>
                  <div className="text-sm text-accent mt-1">Programmes</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-white font-display">6+</div>
                  <div className="text-sm text-accent mt-1">Années d'expérience</div>
                </div>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormationsBenefits;
