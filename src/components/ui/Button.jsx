import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-normal transition-all duration-300 rounded-pill select-none px-6 py-3 md:px-8 md:py-4 text-small tracking-tight hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-dark",
    accent: "bg-primary text-white hover:bg-primary-hover",
    ghost: "bg-transparent text-accent hover:text-primary hover:bg-transparent",
    outline: "bg-transparent text-primary hover:bg-primary/10",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
