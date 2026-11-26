import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ 
  children, 
  currentSlide, 
  setCurrentSlide, 
  totalSlides,
  itemsPerSlide = 5,
  className = "",
  actions = null
}) => {
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Slider Content */}
      <div className="overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          animate={{ x: `-${currentSlide * (100 / itemsPerSlide)}%` }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full"
              style={{ width: `${100 / itemsPerSlide}%` }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          disabled={totalSlides <= 1}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            totalSlides <= 1 
              ? 'border border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-accent hover:scale-110'
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        
        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-6 bg-accent' 
                  : 'w-2 bg-gray-300 hover:bg-accent/50'
              } h-2 rounded-full`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          disabled={totalSlides <= 1}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            totalSlides <= 1 
              ? 'border border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-accent hover:scale-110'
          }`}
        >
          <ChevronRight size={18} />
        </button>

        {actions && <div className="ml-4">{actions}</div>}
      </div>
    </div>
  );
};

export default Slider;