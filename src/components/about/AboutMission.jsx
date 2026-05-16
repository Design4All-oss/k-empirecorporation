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
      title: "Disponibilité 24/7",
      description: "Un accompagnement continu pour répondre à vos besoins."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          
          {/* Left Column - Images & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Images Stack */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 bg-white p-3 rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                  alt="Notre mission"
                  className="w-full h-[350px] md:h-[420px] object-cover rounded"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Image - Right */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 z-20 bg-white p-2 rounded-lg shadow-xl w-40 md:w-48">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400"
                  alt="Équipe"
                  className="w-full h-28 md:h-32 object-cover rounded"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Image - Bottom Left */}
              <div className="absolute -bottom-4 left-0 md:left-4 z-30 bg-white p-2 rounded-lg shadow-xl w-36 md:w-44">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62a4a70?auto=format&fit=crop&q=80&w=400"
                  alt="Collaboration"
                  className="w-full h-24 md:h-28 object-cover rounded"
                  loading="lazy"
                />
              </div>
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
              Notre Mission
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
