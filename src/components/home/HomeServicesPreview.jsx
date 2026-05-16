import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';

const HomeServicesPreview = () => {
  const { services } = HOME_CONTENT;

  const serviceImage = '/assets/images/serviceImage.png';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'out-expo' },
    },
  };

  return (
    <section className="py-8 md:py-12 bg-white relative">
      <div className="max-w-container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]"
        >
          {/* Header Card - Orange background */}
          <motion.div
            variants={itemVariants}
            className="bg-accent rounded-l-3xl p-8 flex flex-col justify-between md:col-span-1 md:row-span-1"
          >
            <div>
              <h2 className="text-h2-m md:text-h2-d font-bold text-white leading-tight font-display">
                {services.title}
              </h2>
              <p className="text-white/80 text-body mt-4 leading-relaxed">
                Innovation, rigueur et impact durable pour votre organisation.
              </p>
            </div>
          </motion.div>

          {/* Service Cards */}
          {services.items.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden cursor-pointer ${
                index === 1 ? 'md:col-span-1 md:row-span-2' : 'md:col-span-1 md:row-span-1'
              } ${index === 0 ? 'rounded-tl-none rounded-bl-none' : index === 1 ? 'rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' : index === 2 ? 'rounded-b-3xl' : ''}`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${serviceImage})`,
                }}
              />

              {/* Gradient Overlay - intensifies on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80 group-hover:via-black/40" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Title - always visible */}
                <h3 className="text-xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">
                  {service.title}
                </h3>

                {/* Description & Button - reveal on hover */}
                <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <p className="text-white/80 text-sm leading-relaxed mt-3 mb-4">
                    {service.text}
                  </p>
                  <Link to="/services" className="flex items-center gap-2 text-white font-semibold text-sm group/btn">
                    En savoir plus
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServicesPreview;
