import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';
import Button from '../ui/Button';

const ease = [0.32, 0.72, 0, 1];

const HomeExpertise = () => {
  const { expertise } = HOME_CONTENT;

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {expertise.subtitle}
            </span>
            <h2 className="text-h2-m md:text-h2-d text-primary mt-5 mb-5 leading-[1.05]">
              {expertise.title}
            </h2>
            <p className="text-text-muted leading-relaxed max-w-xl">
              {expertise.intro}
            </p>
          </div>
          <Link to="/services" className="hidden md:inline-flex shrink-0">
            <Button variant="outline" className="group">
              Découvrir nos expertises
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {expertise.items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease }}
              className="group relative rounded-3xl bg-bg-alt ring-1 ring-border p-8 hover:bg-white hover:ring-accent/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <span className="absolute top-6 right-7 text-5xl font-display font-bold text-primary/5 group-hover:text-accent/20 transition-colors duration-500 select-none pointer-events-none">
                0{item.id}
              </span>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white ring-1 ring-border flex items-center justify-center mb-6 group-hover:bg-accent group-hover:ring-accent transition-colors duration-500">
                  <Sparkles size={22} className="text-accent group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg md:text-xl text-primary font-semibold mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  {item.text}
                </p>
                <div className="w-12 h-[3px] bg-accent transition-all duration-300 ease-out group-hover:w-24" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mt-12 flex justify-center md:hidden"
        >
          <Link to="/services">
            <Button variant="primary" className="group">
              Découvrir nos expertises
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeExpertise;
