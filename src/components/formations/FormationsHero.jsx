import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, TrendingUp, Award, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const FormationsHero = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-primary/3 via-white to-accent/2 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-h1-m md:text-h1-d text-primary font-bold mb-6 leading-tight"
            >
              Maîtrisez votre <span className="text-accent">avenir professionnel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-lg text-text-muted mb-8 leading-relaxed"
            >
              Des formations certifiantes pour développer vos compétences et accélérer votre carrière.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold rounded-pill hover:bg-accent-light transition-colors text-small tracking-tight">
                <span>Demander devis</span>
                <ArrowRight size={20} className="ml-3" />
              </Link>
              <Link to="/formations" className="inline-flex items-center justify-center px-8 py-4 text-accent font-semibold rounded-pill hover:bg-accent/5 transition-colors text-small tracking-tight">
                <Download size={20} className="mr-3" />
                Catalogue
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="pt-6"
            >
              <div className="w-80 border-t border-border mb-6" />
              <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-lg font-bold text-primary">2000+</span>
                  </div>
                  <span className="text-text-muted text-xs mt-1">Participants</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-lg font-bold text-primary">50+</span>
                  </div>
                  <span className="text-text-muted text-xs mt-1">Programmes</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    <span className="text-lg font-bold text-primary">98%</span>
                  </div>
                  <span className="text-text-muted text-xs mt-1">Satisfaction</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl" />
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b04b6ed6?w=800&h=600&fit=crop"
                alt="Formation professionnelle"
                className="relative rounded-2xl shadow-lg w-full h-[450px] object-cover"
              />
              <motion.div
                className="absolute -bottom-6 -left-6 bg-accent text-white p-4 rounded-2xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <GraduationCap size={32} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormationsHero;
