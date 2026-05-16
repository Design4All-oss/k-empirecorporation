import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const features = [
  { icon: Zap, label: 'Innovation' },
  { icon: Shield, label: 'Sécurité' },
  { icon: TrendingUp, label: 'Croissance' },
  { icon: Users, label: 'Expertise' },
];

const ServicesHero = ({ content }) => {
  const { title, subtitle, description } = content;

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <img 
                src="/assets/images/services/coverImage.png" 
                alt="Services K-EMPIRE"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-2xl -z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full -z-10"
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="order-2 lg:order-2"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-h1-m md:text-h1-d text-primary font-semibold"
            >
              {title}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-body-lg text-text-muted leading-relaxed mb-8"
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2"
                >
                  <feature.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-primary">{feature.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Demander un devis
                  <ArrowRight className="ml-2" size={18} strokeWidth={3} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  En savoir plus
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-10 flex items-center gap-6 text-sm text-text-muted"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Devis gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Réponse sous 24h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
