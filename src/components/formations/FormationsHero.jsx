import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, TrendingUp, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
};

const stats = [
  { icon: TrendingUp, value: "2000+", label: "Professionnels formés" },
  { icon: Award, value: "50+", label: "Programmes certifiants" },
  { icon: GraduationCap, value: "98%", label: "Taux de satisfaction" },
];

const FormationsHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(14,64,99,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,64,99,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          }}
        />
        <div className="absolute -top-40 right-[-10rem] w-[42rem] h-[42rem] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-container mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left — Editorial typography */}
          <div className="lg:col-span-7">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                L'Académie Exécutive
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.08 }}
              className="mt-8 font-display font-bold text-primary leading-[0.95] tracking-[-0.02em] text-[2.75rem] sm:text-6xl xl:text-[4.5rem]"
            >
              Maîtrisez votre{" "}
              <span className="relative inline-block text-accent">
                avenir professionnel
                <span className="absolute left-0 -bottom-2 w-full h-[3px] rounded-full bg-accent/30" aria-hidden="true" />
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.16 }}
              className="mt-8 max-w-xl text-lg text-text-muted leading-relaxed"
            >
              Des formations certifiantes conçues par des experts pour développer
              vos compétences, faire grandir vos équipes et accélérer votre carrière.
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

          {/* Right — Double-bezel visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative">
              {/* Outer shell */}
              <div className="p-1.5 rounded-[2rem] bg-bg-alt ring-1 ring-border">
                <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b04b6ed6?w=900&h=700&fit=crop"
                    alt="Session de formation K-EMPIRE"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-primary text-white rounded-2xl p-5 shadow-[0_24px_48px_-12px_rgba(14,64,99,0.4)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm">Certifié & reconnu</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="#F5C75D" className="text-accent-light" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormationsHero;
