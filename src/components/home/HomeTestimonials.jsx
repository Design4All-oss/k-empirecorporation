import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';

const HomeTestimonials = () => {
  const { testimonials } = HOME_CONTENT;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.citations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.citations.length) % testimonials.citations.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials.citations[currentIndex];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <section className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ backgroundImage: 'url(/assets/images/testamonials/pattern.png)', backgroundSize: '1200px', backgroundPosition: 'center 100px', backgroundRepeat: 'no-repeat' }}
      ></div>

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-small text-accent mb-6">Voix de nos Partenaires</span>
          <h2 className="text-h2-m md:text-h2-d text-primary font-semibold max-w-5xl mb-8">
            {testimonials.title}
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-full sm:w-[240px]">
                <img 
                  src={`/assets/images/testamonials/${currentTestimonial.image}`}
                  alt="Testimonial"
                  className="w-full h-[240px] sm:h-[280px] object-contain rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 max-w-md text-center lg:text-left px-4">
                <p className="text-base sm:text-lg text-primary/80 leading-relaxed mb-6">
                  "{currentTestimonial.quote}"
                </p>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-primary">{currentTestimonial.name}</span>
                  <span className="text-sm text-accent">{currentTestimonial.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all -translate-x-8 lg:translate-x-0 shadow-md"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all translate-x-8 lg:translate-x-0 shadow-md"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.citations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-accent' : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Aller au témoignage ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Partners Logos Scroll */}
        <div className="relative mt-16">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -50 * 8],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear',
                },
              }}
            >
              {[...PARTNERS_LOGOS, ...PARTNERS_LOGOS, ...PARTNERS_LOGOS].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-32 h-20 flex items-center justify-center">
                    <img 
                      src={partner.src} 
                      alt={partner.alt} 
                      className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PARTNERS_LOGOS = [
  { id: 1, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 2, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 3, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 4, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 5, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 6, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 7, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
  { id: 8, src: '/assets/logos/Logo_kempire.svg', alt: 'K-EMPIRE' },
];

export default HomeTestimonials;
