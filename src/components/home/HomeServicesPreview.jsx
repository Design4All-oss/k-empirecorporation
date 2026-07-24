import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';

const HomeServicesPreview = () => {
  const { services } = HOME_CONTENT;
  const [s1, s2, s3, s4] = services.items;

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-h2-m md:text-h2-d font-bold text-primary font-display leading-[1.05] mb-5">
            {services.title}
          </h2>
          <p className="text-body text-text-muted leading-relaxed max-w-2xl mx-auto">
            {services.intro}
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5">
          {/* ── Card 1: Conseil — accent bg, large ── */}
          <motion.div
            custom={0}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-2 md:row-span-1 rounded-2xl p-7 md:p-9 bg-accent/8 flex flex-col justify-between min-h-[220px] md:min-h-[260px] group hover:bg-accent/12 transition-colors duration-500"
          >
            <div>
              <span className="inline-block text-label font-semibold text-accent tracking-widest uppercase mb-3">01</span>
              <h3 className="text-h3-m md:text-h3-d font-bold text-primary font-display leading-[1.1] mb-3">
                {s1.title}
              </h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-lg">
                {s1.text}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5 group-hover:text-accent-dark transition-colors"
            >
              En savoir plus
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* ── Card 2: Audit — primary bg, white text ── */}
          <motion.div
            custom={1}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-1 md:row-span-1 rounded-2xl p-7 md:p-9 bg-primary flex flex-col justify-between min-h-[200px] md:min-h-[260px] group hover:bg-primary-hover transition-colors duration-500"
          >
            <div>
              <span className="inline-block text-label font-semibold text-accent tracking-widest uppercase mb-3">02</span>
              <h3 className="text-lg md:text-xl font-bold text-white font-display leading-[1.15] mb-3">
                {s2.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {s2.text}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent mt-5 group-hover:text-white transition-colors"
            >
              En savoir plus
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* ── Card 3: Juridique — white bg, thin border ── */}
          <motion.div
            custom={2}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-1 md:row-span-1 rounded-2xl p-7 md:p-9 bg-white border border-border/60 flex flex-col justify-between min-h-[200px] md:min-h-[260px] group hover:border-accent/40 transition-colors duration-500"
          >
            <div>
              <span className="inline-block text-label font-semibold text-accent tracking-widest uppercase mb-3">03</span>
              <h3 className="text-lg md:text-xl font-bold text-primary font-display leading-[1.15] mb-3">
                {s3.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {s3.text}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5 group-hover:text-accent-dark transition-colors"
            >
              En savoir plus
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* ── Card 4: Formations — bg-alt, large ── */}
          <motion.div
            custom={3}
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-2 md:row-span-1 rounded-2xl p-7 md:p-9 bg-bg-alt flex flex-col justify-between min-h-[220px] md:min-h-[260px] group hover:bg-[#edf1f5] transition-colors duration-500"
          >
            <div>
              <span className="inline-block text-label font-semibold text-accent tracking-widest uppercase mb-3">04</span>
              <h3 className="text-h3-m md:text-h3-d font-bold text-primary font-display leading-[1.1] mb-3">
                {s4.title}
              </h3>
              <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-lg">
                {s4.text}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5 group-hover:text-accent-dark transition-colors"
            >
              En savoir plus
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link to="/services">
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors text-small">
              {services.cta}
              <ArrowRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServicesPreview;
