import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-normal transition-all duration-300 rounded-pill select-none px-8 py-4 text-small tracking-tight hover:cursor-pointer";
  
  const variants = {
    primary: "bg-[#E5A81A] text-white hover:bg-[#D49810]",
    accent: "bg-primary text-white hover:bg-primary-hover",
    ghost: "bg-transparent text-[#E5A81A] hover:text-primary hover:bg-transparent",
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
