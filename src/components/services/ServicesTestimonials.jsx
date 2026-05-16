import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const statsData = [
  { value: 150, suffix: '+', label: 'Projets réalisés', sublabel: 'Depuis 2018' },
  { value: 98, suffix: '%', label: 'Taux de satisfaction', sublabel: 'Clients satisfaits' },
  { value: 500, suffix: '+', label: 'Stagiaires formés', sublabel: 'Chaque année' },
  { value: 50, suffix: '+', label: 'Experts partenaires', sublabel: 'À votre service' },
];

const Counter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
};

// Testimonials data with African professional avatars from Unsplash
const testimonials = [
  {
    id: 1,
    name: "Sarah Koné",
    role: "Directrice Générale",
    company: "@techafrica",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    content: "L'accompagnement de K-EMPIRE a transformé notre approche stratégique. Leur expertise nous a permis de structurer notre croissance avec sérénité.",
    date: "14:30 • 15 Mars 2024"
  },
  {
    id: 2,
    name: "Marc Dubois",
    role: "Fondateur",
    company: "@dubois_conseil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "Un audit complet et des recommandations pertinentes. L'équipe a su identifier des leviers d'amélioration que nous n'avions pas perçus.",
    date: "09:15 • 22 Février 2024"
  },
  {
    id: 3,
    name: "Aminata Diallo",
    role: "Responsable RH",
    company: "@groupesogea",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    content: "Les formations dispensées par K-EMPIRE ont considérablement renforcé les compétences de nos équipes. Une approche pédagogique excellente.",
    date: "16:45 • 10 Janvier 2024"
  },
  {
    id: 4,
    name: "Jean-Pierre Mensah",
    role: "CEO",
    company: "@mensah_holdings",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Leur expertise juridique nous a été précieuse lors de notre restructuration. Un partenaire de confiance pour les décisions critiques.",
    date: "11:20 • 05 Décembre 2023"
  },
  {
    id: 5,
    name: "Fatima Benali",
    role: "Directrice Financière",
    company: "@financespro",
    avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face",
    content: "Optimisation fiscale réussie et accompagnement de qualité. Ils maîtrisent parfaitement les enjeux complexes des entreprises.",
    date: "08:50 • 18 Novembre 2023"
  },
  {
    id: 6,
    name: "Kofi Asante",
    role: "Entrepreneur",
    company: "@asantecorp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "De la stratégie à la mise en œuvre, K-EMPIRE nous a accompagnés à chaque étape. Un investissement qui a porté ses fruits.",
    date: "13:10 • 03 Octobre 2023"
  }
];

// Duplicate testimonials for seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-6 border border-[#E5E7EB] mx-3">
      {/* Header with avatar and info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#1F2933] text-sm truncate">
            {testimonial.name}
          </h4>
          <p className="text-xs text-[#6B7280]">
            {testimonial.role}{' '}
            <span className="text-[#E5A81A]">{testimonial.company}</span>
          </p>
        </div>
      </div>

      {/* Quote icon */}
      <div className="mb-3">
        <Quote size={20} className="text-[#E5A81A]/40" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
        {testimonial.content}
      </p>

      {/* Date */}
      <p className="text-xs text-[#9CA3AF]">
        {testimonial.date}
      </p>
    </div>
  );
};

const ServicesTestimonials = () => {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-container mx-auto px-4 mb-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-small text-accent">
            Témoignages
          </span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            Découvrez les retours d'expérience de ceux qui nous ont fait confiance
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        {/* Scrolling row 1 - Left to Right */}
        <div className="flex mb-6 animate-marquee-left">
          <div className="flex">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`row1-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="flex">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`row1-dup-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Scrolling row 2 - Right to Left */}
        <div className="flex animate-marquee-right">
          <div className="flex">
            {[...duplicatedTestimonials].reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          <div className="flex">
            {[...duplicatedTestimonials].reverse().map((testimonial, index) => (
              <TestimonialCard key={`row2-dup-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Counters - After testimonials */}
      <div className="max-w-container mx-auto px-4 mt-8">
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
        >
          {statsData.map((stat, index) => (
            <div key={index} className={`text-center relative ${index !== 3 ? 'md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-16 md:after:w-px md:after:bg-[#E5E7EB]' : ''}`}>
              <div className="text-4xl md:text-5xl font-bold text-accent font-display">
                <Counter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  inView={isStatsInView} 
                />
              </div>
              <p className="text-sm md:text-base font-semibold text-[#0E4063] mt-2">{stat.label}</p>
              <p className="text-xs md:text-sm text-[#6B7280]">{stat.sublabel}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Partners Logos - Without title/label */}
      <div className="mt-6 pt-4">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, -50 * 8 * 3] }}
              transition={{
                x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
              }}
            >
              {[...Array(8), ...Array(8), ...Array(8)].map((_, index) => (
                <div key={index} className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                    <img 
                      src="/assets/logos/Logo_kempire.svg" 
                      alt="Partner" 
                      className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTestimonials;
