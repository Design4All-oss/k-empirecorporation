import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SERVICES_CONTENT, PARTNERS_LOGOS } from '../../constants/content';

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

// Duplicate testimonials for seamless loop
const duplicate = (arr) => [...arr, ...arr];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-6 border border-[#E5E7EB] mx-3">
      {/* Header with avatar and info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#1F2933] text-sm truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs text-[#6B7280]">
            {testimonial.role}{' '}
            <span className="text-[#E5A81A]">{testimonial.company}</span>
          </p>
          {testimonial.formation && (
            <p className="text-xs text-[#E5A81A] font-medium mt-0.5">
              {testimonial.formation}
            </p>
          )}
        </div>
      </div>

      {/* Quote icon */}
      <div className="mb-3">
        <Quote size={20} className="text-[#E5A81A]/40" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
        {testimonial.content}
      </p>
    </div>
  );
};

const ServicesTestimonials = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const { stats, items } = SERVICES_CONTENT.testimonials;
  const duplicated = duplicate(items);

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-small text-accent">
            Témoignages Formation
          </span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-4">
            Ce que disent nos apprenants
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Retours d'expérience de professionnels ayant suivi nos formations certifiantes
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        {/* Scrolling row 1 - Left to Right */}
        <div className="flex mb-6 animate-marquee-left">
          <div className="flex">
            {duplicated.map((testimonial, index) => (
              <TestimonialCard key={`row1-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="flex">
            {duplicated.map((testimonial, index) => (
              <TestimonialCard key={`row1-dup-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Scrolling row 2 - Right to Left */}
        <div className="flex animate-marquee-right">
          <div className="flex">
            {[...duplicated].reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="flex">
            {[...duplicated].reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-dup-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Counters - After testimonials */}
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

      {/* Partners Logos - Without title/label */}
      <div className="mt-6 pt-4">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          
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
    </section>
  );
};

export default ServicesTestimonials;
