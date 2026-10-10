import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock } from 'lucide-react';
import { ABOUT_CONTENT } from '../../constants/content';

const AboutMission = () => {
  const { mission } = ABOUT_CONTENT;

  const features = [
    {
      icon: Users,
      title: "Équipe Professionnelle",
      description: "Des consultants expérimentés dédiés à votre réussite."
    },
    {
      icon: Clock,
      title: "Réponse sous 24h",
      description: "Chaque demande reçoit une réponse d'un conseiller dans les 24 heures qui suivent."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden h-[350px] md:h-[420px]">
              <img
                src="/assets/images/about/mission.webp"
                alt="Notre mission"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Heading */}
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
              Ce que nous changeons concrètement
            </h2>

            {/* Description */}
            <p className="text-base text-text-muted leading-relaxed mb-8">
              {mission.text}
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <feature.icon size={22} className="text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-primary mb-1">{feature.title}</h4>
                    <p className="text-sm text-text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
