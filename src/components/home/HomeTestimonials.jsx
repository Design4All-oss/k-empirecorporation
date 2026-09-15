import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';
import { usePartenaires } from '../../hooks/useSiteContent';

const imageSrc = (testimonial) => {
  if (!testimonial.image) return '';
  return testimonial.image.startsWith('http') || testimonial.image.startsWith('/')
    ? testimonial.image
    : `/assets/images/testamonials/${testimonial.image}`;
};

const HomeTestimonials = () => {
  const { testimonials } = HOME_CONTENT;
  const citations = testimonials.citations;
  const { data: partenaires = [] } = usePartenaires();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % citations.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + citations.length) % citations.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = citations[currentIndex];

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
        className="absolute inset-0 w-full h-full pointer-events-none bg-[url('/assets/images/testamonials/pattern.png')] bg-[length:1200px] bg-[position:center_100px] bg-no-repeat"
      ></div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-tight max-w-5xl mb-8">
            {testimonials.title}
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto px-8 sm:px-12 lg:px-0">
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
              <div className="flex-shrink-0 w-[160px] sm:w-[240px]">
                {imageSrc(currentTestimonial) ? (
                  <img
                    src={imageSrc(currentTestimonial)}
                    alt={`Photo de ${currentTestimonial.name}`}
                    className="w-full h-[160px] sm:h-[280px] object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[160px] sm:h-[280px] rounded-lg bg-primary/5 flex items-center justify-center">
                    <span className="text-4xl sm:text-6xl font-bold text-primary/20 font-display">
                      {(currentTestimonial.name || 'K')[0]}
                    </span>
                  </div>
                )}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all shadow-md"
            aria-label="Précédent"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all shadow-md"
            aria-label="Suivant"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {citations.map((_, idx) => (
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
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 80s linear infinite;
            }
          `}</style>
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex gap-10 items-center shrink-0">
              {[...partenaires, ...partenaires].map((partner, index) => (
                <div
                  key={`${partner.nom}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-24 h-14 md:w-32 md:h-18 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.nom}
                      className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
