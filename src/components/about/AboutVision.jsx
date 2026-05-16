import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lightbulb, Award, Users, Shield, Target, Star } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';

const AboutVision = () => {
  const { vision } = ABOUT_CONTENT;

  // Valeurs de K-EMPIRE CORPORATION (classées par priorité)
  const values = [
    { label: 'Excellence', icon: 'Star', priority: 1 },
    { label: 'Innovation', icon: 'Lightbulb', priority: 2 },
    { label: 'Qualité', icon: 'Award', priority: 3 },
    { label: 'Impact', icon: 'Target', priority: 4 },
    { label: 'Proximité', icon: 'Users', priority: 5 },
    { label: 'Confidentialité', icon: 'Shield', priority: 6 }
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden z-20 -mb-64">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 items-stretch rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative h-full min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                alt="Notre vision"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column - Content with dark background */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="bg-accent p-8 md:p-10 lg:p-12 flex flex-col justify-center"
          >
            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-white font-display">
                Notre ambition
              </span>
            </div>

            {/* Main heading */}
            <h2 className="text-h2-m md:text-h2-d text-white font-bold font-display mb-6 leading-tight">
              Devenir la référence en management de qualité
            </h2>

            {/* Main text */}
            <p className="text-base text-white/80 leading-relaxed mb-6">
              {vision.text}
            </p>

            {/* Values grid - 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 grid grid-cols-2 gap-3"
            >
              {values.map((value, idx) => {
                const IconComponent = { Lightbulb, Award, Users, Shield, Target, Star }[value.icon];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <IconComponent size={16} className="text-white" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-white font-medium">{value.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Highlight box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative bg-primary border border-primary/20 p-5 rounded-xl overflow-hidden"
            >
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                    <ArrowUpRight size={20} className="text-accent" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white font-medium leading-relaxed italic mb-2">
                    {vision.highlight}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-accent font-semibold font-display">
                    <span className="w-6 h-px bg-accent/50" />
                    Afrique & International
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
