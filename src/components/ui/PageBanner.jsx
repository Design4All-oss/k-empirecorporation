import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageBanner - A reusable banner component for page headers
 * @param {string} title - The main title (displayed in italic/script style)
 * @param {string} description - The description text (displayed on the right)
 * @param {string} imageUrl - The background image URL
 * @param {string} imageAlt - Alt text for the background image
 */
const PageBanner = ({ title, description, imageUrl, imageAlt = "" }) => {
  return (
    <section className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />

      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-container mx-auto px-4">
        <div className="h-full flex flex-col md:flex-row md:items-end md:justify-between pb-12 md:pb-16 gap-6">
          {/* Left side - Title in italic/script style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl text-white font-bold font-display"
            >
              {title}
            </h1>
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:max-w-md lg:max-w-lg"
          >
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
