import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';
import Button from '../ui/Button';

const AboutHero = () => {
  const { hero } = ABOUT_CONTENT;

  const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 1
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-primary/3 via-white to-accent/2 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230E4063' fill-rule='nonzero'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
            <span className="text-label text-accent">
              Cabinet International
            </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-h1-m md:text-h1-d text-primary font-bold mb-6 leading-tight"
            >
              {hero.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-lg text-text-muted mb-4 leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base text-text-muted leading-relaxed mb-8"
            >
              {hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
              >
                <Button variant="primary" className="shadow-lg shadow-accent/25">
                  Découvrir notre expertise
                  <ArrowRight size={18} className="ml-2" strokeWidth={2} />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative lg:pl-8"
          >
            {/* Main image container */}
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-accent/20 to-primary/10 rounded-3xl" />

              {/* Image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/50"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                  alt="Équipe K-EMPIRE CORPORATION"
                  className="w-full h-[400px] md:h-[480px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating stats badge - top right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -top-6 -right-4 md:-right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-white shadow-primary/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/30">
                    <Target size={22} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">2018</p>
                    <p className="text-xs text-text-muted font-display">Depuis</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating info badge - bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -bottom-6 -left-4 md:-left-6 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-xl border border-white shadow-primary/10 min-w-[200px]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-3xl font-bold text-primary mb-0.5">+20</p>
                    <p className="text-xs text-text-muted font-display mb-2">Entreprises accompagnées</p>
                    <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Expertise consolidée
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

export default AboutHero;
