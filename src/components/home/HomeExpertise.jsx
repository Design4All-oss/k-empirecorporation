import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';
import Button from '../ui/Button';

const HomeExpertise = () => {
  const { expertise } = HOME_CONTENT;
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(expertise.items.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = expertise.items.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-16 md:py-32 bg-[#FFFFFF] relative overflow-hidden">
      <div className="absolute -bottom-32 -right-80 w-[600px] h-[700px] pointer-events-none" style={{ clipPath: 'inset(0 0 50% 0)', transform: 'rotate(-90deg)' }}>
        <div className="w-full h-full rounded-full border-[160px] border-primary/10" />
      </div>
      <div className="absolute -bottom-32 -right-80 w-[600px] h-[700px] pointer-events-none" style={{ clipPath: 'inset(0 0 50% 0)', transform: 'rotate(-90deg)', background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)' }} />

      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="lg:flex lg:gap-24 items-stretch">
          {/* Left Column */}
          <div className="lg:w-1/2 lg:flex-1 mb-12 lg:mb-0 flex flex-col">
            <div className="flex flex-col items-start pr-0 lg:pr-8 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary shadow-sm">
                   <Award size={16} />
                </div>
                <span className="text-small text-accent">Excellence garantie</span>
              </div>
              
              <h2 className="text-h2-m md:text-h2-d font-semibold text-primary mb-4 leading-[1.05]">
                Une expertise multidisciplinaire à chaque niveau.
              </h2>
              
              <p className="text-body text-text-muted mb-4 leading-relaxed">
                Notre équipe regroupe des experts nationaux et internationaux en droit, comptabilité, fiscalité, management, négociation, BTP, marketing & communication, banque, gestion des ressources humaines et stratégies.
              </p>
               
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-auto">
                <Link to="/a-propos">
                  <Button variant="primary" className="px-6 py-3 rounded-full whitespace-nowrap">
                    En savoir plus <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-4">
                    <img src="https://i.pravatar.cc/100?img=11" className="w-14 h-14 rounded-full border-4 border-white shadow-sm" alt="Expert 1" />
                    <img src="https://i.pravatar.cc/100?img=33" className="w-14 h-14 rounded-full border-4 border-white shadow-sm" alt="Expert 2" />
                    <div className="w-14 h-14 rounded-full border-4 border-white shadow-sm bg-bg-alt flex items-center justify-center text-sm font-bold text-text-muted">
                      +2000
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-text-muted leading-none">Accompagné par</span>
                    <span className="text-xs font-bold text-primary leading-none">nos experts.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Slider */}
          <div className="w-full lg:w-auto lg:flex-1 flex flex-col">
            <div className="relative flex flex-col flex-1">
              {/* Cards */}
              <div className="flex flex-col gap-3 h-[220px] lg:h-[260px] mb-6">
                {currentItems.map((item, idx) => {
                  const itemNumber = currentIndex * itemsPerPage + idx + 1;
                  
                  return (
                    <div
                      key={item.id}
                      className="group relative rounded-xl lg:rounded-2xl p-4 lg:p-6 transition-all duration-500 w-full max-w-md mx-auto lg:mx-0 flex-1 flex flex-col"
                    >
                      <div className="expertise-number absolute -top-3 -left-2 lg:-top-4 lg:-left-3 text-[100px] lg:text-[140px] font-bold text-accent/15 leading-none font-display select-none pointer-events-none group-hover:text-accent/25 transition-colors duration-500">
                        0{itemNumber}
                      </div>
                      
                      <div className="relative z-10 flex flex-col flex-1">
                        <h3 className="text-base lg:text-lg text-primary font-semibold mb-2 group-hover:text-primary/80 transition-colors">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm lg:text-base text-text-muted leading-relaxed flex-1">
                          {item.text}
                        </p>
                        
                        <div className="w-12 h-[3px] bg-accent mt-3 group-hover:w-24 transition-all duration-300 ease-out" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-12 pt-6 border-t border-border/30">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors group"
                  aria-label="Précédent"
                >
                  <ChevronLeft size={24} className="text-primary group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                          ? 'w-6 bg-accent' 
                          : 'bg-border hover:bg-accent/50'
                      }`}
                      aria-label={`Aller à la page ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent/10 transition-colors group"
                  aria-label="Suivant"
                >
                  <ChevronRight size={24} className="text-primary group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeExpertise;
