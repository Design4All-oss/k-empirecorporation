import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ABOUT_CONTENT } from '../../constants/content';

// Composant compteur animé
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView || !target || target === 0) return;
    
    setHasStarted(true);
    let startTime = null;
    const startValue = 0;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutExpo);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);
  
  const displayValue = hasStarted ? count : target;
  
  if (!target || target === 0) return null;
  
  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const AboutStats = () => {
  const { stats } = ABOUT_CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  const getNumber = (value) => {
    const match = value.replace(/\s/g, '').replace(/%|\+/g, '').match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  
  const getSuffix = (value) => {
    if (value.includes('+')) return '+';
    if (value.includes('%')) return '%';
    return '';
  };
  
  const shouldAnimate = (value) => {
    const num = getNumber(value);
    return num > 0 && !value.includes('Depuis');
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        {/* Stats Grid - 4 columns avec séparateurs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {stats.items.map((item, index) => {
            const isLast = index === stats.items.length - 1;
            const hasRightBorder = index < 3;
            const numericValue = getNumber(item.value);
            const suffix = getSuffix(item.value);
            const shouldShowAnimated = shouldAnimate(item.value);
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative py-8 px-4 text-center ${hasRightBorder ? 'border-r border-gray-200' : ''} ${index < 2 ? 'border-b lg:border-b-0 border-gray-200' : ''} lg:border-b-0`}
              >
                {/* Stat value avec suffixe */}
                <div className="flex items-start justify-center gap-1 mb-2">
                  {item.value.includes('Depuis') ? (
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent font-display">2018</h3>
                  ) : shouldShowAnimated ? (
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent font-display">
                      <AnimatedCounter target={numericValue} suffix={suffix} duration={2 + index * 0.3} />
                    </h3>
                  ) : (
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent font-display">
                      {item.value}
                    </h3>
                  )}
                </div>

                {/* Stat label */}
                <p className="text-sm text-text-muted">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStats;
