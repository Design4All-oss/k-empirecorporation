import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES_CONTENT, PARTNERS_LOGOS } from '../../constants/content';
import { useStatistiques } from '../../hooks/useSiteContent';

const Counter = ({ value, inView }) => {
  const [count, setCount] = useState(null);

  const numericValue = parseInt(value.replace(/[^\d]/g, ''), 10);
  const suffix = value.replace(/[\d]/g, '');

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(numericValue * easeOutExpo));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, numericValue]);

  return <span>{(count === null ? numericValue : count)}{suffix}</span>;
};

const imageSrc = (testimonial) => {
  if (!testimonial.image) return '';
  return testimonial.image.startsWith('http') || testimonial.image.startsWith('/')
    ? testimonial.image
    : `/assets/images/testamonials/${testimonial.image}`;
};

const ServicesTestimonials = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const { data: statsData } = useStatistiques();
  const stats = statsData?.services?.length
    ? statsData.services
    : SERVICES_CONTENT.testimonials.stats;
  const { citations } = SERVICES_CONTENT.testimonials;
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
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-tight max-w-5xl mb-8"
          >
            {SERVICES_CONTENT.testimonials.title}
          </motion.h2>
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
                  &ldquo;{currentTestimonial.quote}&rdquo;
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

        {/* Stats Counters */}
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 md:gap-0"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center relative">
                <div className="text-4xl md:text-5xl font-bold text-accent font-display">
                  <Counter
                    value={stat.value}
                    inView={isStatsInView}
                  />
                </div>
                <p className="text-sm md:text-base font-semibold text-[#0E4063] mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partners Logos */}
        <div className="mt-6 pt-4">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-12 items-center"
                animate={{ x: [0, -50 * 8 * 3] }}
                transition={{
                  x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
                }}
              >
                {[...PARTNERS_LOGOS, ...PARTNERS_LOGOS, ...PARTNERS_LOGOS].map((partner, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center justify-center">
                    <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
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
      </div>
    </section>
  );
};

export default ServicesTestimonials;
