import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target,
  Building2,
  ClipboardCheck,
  TrendingUp,
  FileSearch,
  ShieldCheck,
  AlertTriangle,
  ListChecks,
  FileText,
  Calculator,
  Landmark,
  Users,
  BookOpen,
  Award,
  MonitorPlay
} from 'lucide-react';

// Context-specific icons for each service's bullet points
const servicePointIcons = {
  // Service 1: Conseil & stratégie d'entreprise
  0: [Target, Building2, ClipboardCheck, TrendingUp],
  // Service 2: Audit & diagnostic
  1: [FileSearch, ShieldCheck, AlertTriangle, ListChecks],
  // Service 3: Assistance juridique, comptable & fiscale
  2: [FileText, Calculator, Landmark, ShieldCheck],
  // Service 4: Formations & renforcement de capacités
  3: [Users, BookOpen, Award, MonitorPlay]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const ServicesGrid = ({ services }) => {
  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E5A81A]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0E4063]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-small text-accent">
            Nos expertises
          </span>
          <h2 className="text-h2-m md:text-h2-d text-primary mt-4 mb-6">
            Des solutions complètes pour<br className="hidden md:block" /> votre réussite
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#0E4063]/10 ${
                  isLarge ? 'md:row-span-1' : ''
                }`}
              >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0E4063] via-[#E5A81A] to-[#0E4063] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0E4063] to-[#1a5276] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card Content */}
                <div className="relative z-10 p-8 md:p-10 overflow-hidden">
                  {/* Header with icon and number */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon container */}
                    <div className="w-14 h-14 rounded-2xl bg-[#0E4063] flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110">
                      <Icon 
                        size={26} 
                        className="text-white transition-colors duration-500" 
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    {/* Service number - decorative background */}
                    <span className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-[#0E4063]/[0.03] font-display transition-colors duration-500 group-hover:text-white/[0.08] leading-none absolute -top-16 -right-10 select-none pointer-events-none">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 leading-tight text-primary transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body leading-relaxed mb-6 text-text-muted transition-colors duration-500 group-hover:text-white/80">
                    {service.description}
                  </p>

                  {/* Points with animated reveal and context icons */}
                  <ul className="space-y-3 mb-8">
                    {service.points.slice(0, 3).map((point, idx) => {
                      const PointIcon = servicePointIcons[index]?.[idx] || Target;
                      return (
                        <li 
                          key={idx} 
                          className="flex items-start gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#E5A81A]/10 flex items-center justify-center mt-0.5 transition-all duration-500 group-hover:bg-white/20">
                            <PointIcon 
                              size={14} 
                              className="text-[#E5A81A]" 
                              strokeWidth={2}
                            />
                          </div>
                          <span className="text-body leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-white/90">
                            {point}
                          </span>
                        </li>
                      );
                    })}
                  </ul>


                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#E5A81A]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
