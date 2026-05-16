import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Building2, Users, GraduationCap, CalendarDays } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';

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

const HomeStats = () => {
  const { stats } = HOME_CONTENT;
  
  const icons = [Building2, Users, GraduationCap, CalendarDays];
  
  // Extraire les valeurs numériques pour l'animation
  const extractNumber = (value) => {
    if (value.includes('Depuis')) return 0;
    const cleanValue = value.replace(/\s/g, '').replace(/\+/g, '');
    const match = cleanValue.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  
  const getSuffix = (value) => {
    if (value.includes('+')) return '+';
    if (value.includes('%')) return '%';
    return '';
  };
  
  const shouldAnimate = (value) => {
    const num = extractNumber(value);
    return num > 0 && !value.includes('Depuis');
  };

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-container mx-auto px-4">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16"
        >
          {/* Left side - Title */}
          <motion.div variants={itemVariants} className="lg:w-[280px] flex-shrink-0">
            <h2 className="text-h2-m md:text-h2-d font-bold text-primary font-display mb-3">
              Nos Stats
            </h2>
            <p className="text-text-muted text-sm md:text-base leading-relaxed">
              Nous vous aidons à libérer le potentiel de votre entreprise
            </p>
          </motion.div>

          {/* Right side - Stats */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.items.map((item, index) => {
              const Icon = icons[index] || icons[0];
              const numericValue = extractNumber(item.value);
              const suffix = getSuffix(item.value);
              const shouldShowAnimated = shouldAnimate(item.value);
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-left"
                >
                  {/* Value with icon and animation */}
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="text-accent/60" size={24} strokeWidth={2.5} />
                    {item.value.includes('Depuis') ? (
                      <h3 className="text-3xl md:text-4xl font-bold text-accent font-display">2018</h3>
                    ) : shouldShowAnimated ? (
                      <h3 className="text-3xl md:text-4xl font-bold text-accent font-display">
                        <AnimatedCounter target={numericValue} duration={2 + index * 0.3} suffix={suffix} />
                      </h3>
                    ) : (
                      <h3 className="text-3xl md:text-4xl font-bold text-accent font-display">
                        {item.value}
                      </h3>
                    )}
                  </div>
                  
                  {/* Label */}
                  <p className="text-sm text-text-muted">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeStats;
