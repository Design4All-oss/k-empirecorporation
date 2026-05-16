import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, Trophy } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';

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
      
      // Easing function ease-out-expo
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
  
  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
};

const HomeHero = () => {
  const { hero } = HOME_CONTENT;
  const { openBookingModal } = useBookingModal();

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
      transition: { duration: 0.8, ease: "out-expo" } 
    },
  };

  return (
    <section className="min-h-screen h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#F5F7FA]">
      {/* Background Soft Decoration (Optional, very light) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-8 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:pr-6"
          >
            {/* Eyebrow Header */}
            <motion.div variants={itemVariants}></motion.div>

            {/* Massive Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-h1-m md:text-h1-d text-primary font-semibold"
            >
              Votre succès <br />
              <span className="text-primary">Structurez</span>{' '}
              <br /> l'avenir.
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-body-lg text-text-muted leading-relaxed max-w-[480px]"
            >
              Nous accompagne les entreprises, institutions et professionnels avec des solutions sur mesure en management, droit, comptabilité, fiscalité et disciplines connexes.
            </motion.p>

            {/* Call to Actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-2">
              <Link to="/formations">
                <Button variant="primary" className="group">
                  Nos Formations
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                </Button>
              </Link>
              <button 
                onClick={() => openBookingModal()}
                className="group"
              >
                <Button variant="ghost" className="group">
                  <Calendar size={18} className="mr-2" />
                  Rendez-vous
                </Button>
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-row flex-wrap items-center gap-3 mt-4"
            >
                <div className="flex flex-col">
                  <div className="flex items-baseline -mr-2">
                    <span className="text-3xl md:text-4xl font-bold text-primary font-display">
                      <AnimatedCounter target={2000} duration={2.5} />
                    </span>
                    <span className="text-lg md:text-xl font-bold text-accent font-display">+</span>
                  </div>
                  <span className="text-small font-normal text-text-muted mt-1">Experts formés</span>
                </div>
                <div className="w-px h-6 bg-border/60 hidden sm:block" />
                <div className="flex flex-col">
                  <div className="flex items-baseline -mr-2">
                    <span className="text-3xl md:text-4xl font-bold text-primary font-display">
                      <AnimatedCounter target={98} duration={2} />
                    </span>
                    <span className="text-lg md:text-xl font-bold text-accent font-display">%</span>
                  </div>
                  <span className="text-small font-normal text-text-muted mt-1">Satisfaction</span>
                </div>
                <div className="w-px h-6 bg-border/60 hidden lg:block" />
                <div className="flex flex-col">
                  <div className="flex items-baseline -mr-2">
                    <span className="text-3xl md:text-4xl font-bold text-primary font-display">
                      <AnimatedCounter target={50} duration={1.8} />
                    </span>
                    <span className="text-lg md:text-xl font-bold text-accent font-display">+</span>
                  </div>
                  <span className="text-small font-normal text-text-muted mt-1">Partenaires</span>
                </div>
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL COLUMN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "ease-out", delay: 0.2 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center mt-12 lg:mt-0"
          >
            {/* Background Geometric Abstract Shapes - Fixed Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 translate-y-[15%]">
              {/* Massive Primary Circle */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "ease-out" }}
                className="w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] rounded-full bg-primary relative shadow-md overflow-hidden"
              >
                  
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-[2rem] rotate-12 -z-10" />
                  
                  
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 border-[1.5px] border-dashed border-white/20 rounded-full" 
                  />
              </motion.div>
              
              {/* Decorative Ring - bottom and right cut */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "ease-out", delay: 0.3 }}
                className="absolute w-[400px] h-[400px] lg:w-[480px] lg:h-[480px] rounded-full border-2 border-dashed border-primary/30"
                style={{ clipPath: 'inset(0 5% 30% 0)' }}
              />
            </div>

            {/* Image Layer - Independent from circles */}
            <div className="absolute inset-0 flex items-end justify-center z-10 overflow-visible">
              <img 
                src="/assets/images/heroImg.png" 
                alt="Expert K-EMPIRE" 
                className="w-[135%] lg:w-[160%] h-auto max-h-[150%] object-contain object-bottom translate-y-[18%]"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -8, 0, -6, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.5 },
                scale: { duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute bottom-1/3 -left-8 lg:-left-8 w-20 h-20 rounded-full bg-[#E5A81A] flex items-center justify-center z-20 shadow-lg shadow-accent/30"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Trophy size={28} className="text-white" />
              </motion.div>
            </motion.div>

             <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, 8, 0, 6, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.7 },
                scale: { duration: 0.6, delay: 0.7, type: "spring", stiffness: 200 },
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
              }}
              className="absolute top-[35%] right-0 lg:right-2 w-16 h-16 rounded-full bg-[#E5A81A] flex items-center justify-center z-20 shadow-lg shadow-accent/30"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              >
                <CheckCircle2 size={24} className="text-white" />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
