import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ABOUT_CONTENT } from '../../constants/content';
import { useStatistiques } from '../../hooks/useSiteContent';

const AnimatedCounter = ({ target, suffix = '', duration = 2, keepZeros = false }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !target || target === 0) return;
    setHasStarted(true);
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(target * easeOutExpo));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  if (!target || target === 0) return null;
  const displayValue = hasStarted ? count : 0;
  const displayStr = keepZeros ? String(displayValue).padStart(2, '0') : String(displayValue);
  return <span ref={ref}>{displayStr}{suffix}</span>;
};

const AboutStats = () => {
  const { data: statsData } = useStatistiques();
  const { stats } = ABOUT_CONTENT;
  const items = statsData?.apropos?.length ? statsData.apropos : stats.items;

  const getNumber = (value) => {
    const match = value.replace(/\s/g, '').replace(/%|\+/g, '').match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const getSuffix = (value) => {
    if (value.includes('%') && value.includes('+')) return '%+';
    if (value.includes('+')) return '+';
    if (value.includes('%')) return '%';
    return '';
  };

  const shouldAnimate = (value) => getNumber(value) > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="bg-primary py-8 relative z-30 -mt-12 md:-mt-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
            {items.map((item, index) => {
              const numericValue = getNumber(item.value);
              const suffix = getSuffix(item.value);
              const shouldShowAnimated = shouldAnimate(item.value);
              const keepZeros = /^0\d/.test(item.value.replace(/\s/g, ''));

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center text-center py-8 px-4"
                >
                  <div className="flex items-baseline gap-0.5 mb-2">
                    {shouldShowAnimated ? (
                      <>
                        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display">
                          <AnimatedCounter target={numericValue} duration={2 + index * 0.3} keepZeros={keepZeros} />
                        </span>
                        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent font-display">{suffix}</span>
                      </>
                    ) : (
                      <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display">
                        {item.value}
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-white/70 font-normal">{item.label}</p>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
