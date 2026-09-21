import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Award, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStatistiques } from '../../hooks/useSiteContent';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
};

const fallbackStats = [
  { icon: TrendingUp, value: "98%+", label: "Taux de satisfaction" },
  { icon: Award, value: "2000+", label: "Professionnels formés" },
  { icon: GraduationCap, value: "25+", label: "Nationalités" },
];

const statsIcons = [TrendingUp, Award, GraduationCap];

const FormationsHero = () => {
  const { data: statsData } = useStatistiques();
  const stats = (statsData?.formations?.length ? statsData.formations : fallbackStats).map(
    (s, i) => ({ ...s, icon: s.icon || statsIcons[i % statsIcons.length] })
  );

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(14,64,99,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,64,99,0.04)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="absolute -top-40 right-[-10rem] w-[42rem] h-[42rem] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left — Editorial typography */}
          <div className="lg:col-span-7">
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.08 }}
              className="mt-8 font-display font-bold text-primary leading-[0.95] tracking-[-0.02em] text-[2.75rem] sm:text-6xl xl:text-[4.5rem]"
            >
              Orchestrez votre{" "}
              <span className="relative inline-block text-accent">
                montée en compétence
                <span className="absolute left-0 -bottom-2 w-full h-[3px] rounded-full bg-accent/30" aria-hidden="true" />
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.16 }}
              className="mt-8 max-w-xl text-lg text-text-muted leading-relaxed"
            >
              Des formations professionnelles et certifiantes conçues par des experts pour développer
              vos compétences, faire grandir vos équipes et accélérer votre carrière.
              Chaque programme est adapté à votre contexte organisationnel pour une application concrète et immédiate.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.24 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-pill bg-accent px-8 py-4 text-small font-semibold tracking-tight text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Demander un devis
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 group-hover:translate-x-1">
                  <ArrowRight size={15} />
                </span>
              </Link>
              <Link
                to="/formations#formations"
                className="inline-flex items-center justify-center gap-2 rounded-pill border border-primary/15 px-8 py-4 text-small font-semibold tracking-tight text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Parcourir le catalogue
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.32 }}
              className="mt-14 flex items-center gap-10 border-t border-border pt-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="text-xl font-bold text-primary font-display">{stat.value}</span>
                    </div>
                    <span className="mt-1 text-xs text-text-muted">{stat.label}</span>
                    {index < stats.length - 1 && <span className="sr-only">|</span>}
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative rounded-[2rem] overflow-hidden">
              <img
                src="/assets/images/formations/orchestrez.png"
                alt="Session de formation K-EMPIRE"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormationsHero;
