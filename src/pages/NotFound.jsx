import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import Button from '../components/ui/Button';
import { useBookingModal } from '../context/BookingModalContext';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
  }
};

const numberVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -10 },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function NotFound() {
  const { openBookingModal } = useBookingModal();
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="max-w-container relative z-10 text-center px-6 py-20"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="relative inline-flex gap-2 mb-8"
          variants={contentVariants}
        >
          {['4', '0', '4'].map((digit, index) => (
            <motion.span
              key={index}
              className="text-[8rem] md:text-[12rem] leading-none font-display font-bold text-primary"
              initial={{ opacity: 0, scale: 0.5, rotate: -15, y: 50 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -8, 0] }}
              transition={{ 
                type: "spring", 
                stiffness: 120, 
                damping: 12,
                delay: index * 0.15,
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 + 0.5 }
              }}
            >
              {digit}
            </motion.span>
          ))}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle 
                cx="100" 
                cy="100" 
                r="90" 
                fill="none" 
                stroke="#E5A81A" 
                strokeWidth="2"
                strokeDasharray="565"
                strokeDashoffset="565"
                initial={{ strokeDashoffset: 565 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-h2-m md:text-h2-d text-text mb-4"
          variants={contentVariants}
        >
          Page non trouvée
        </motion.h1>

        <motion.p 
          className="text-body text-text-muted max-w-md mx-auto mb-10"
          variants={contentVariants}
        >
          La page que vous recherchez n'existe pas ou a été déplacée.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={contentVariants}
        >
          <Link to="/">
            <Button variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <button onClick={() => openBookingModal()} className="cursor-pointer">
            <Button variant="outline">
              Nous contacter
            </Button>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;
