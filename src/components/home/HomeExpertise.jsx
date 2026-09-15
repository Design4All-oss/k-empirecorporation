import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Scale, Calculator, Building2, Handshake, Users, GraduationCap } from 'lucide-react';
import { HOME_CONTENT } from '../../constants/content';

const ease = [0.32, 0.72, 0, 1];

const ICONS = [Scale, Calculator, Building2, Handshake, Users, GraduationCap];

const AccordionItem = ({ item, icon: Icon, isOpen, onToggle }) => (
  <div className={`bg-primary transition-all duration-300 ${isOpen ? 'bg-primary' : 'bg-primary/80'}`}>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 text-left"
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-accent shrink-0" strokeWidth={1.5} />
        <span className="font-semibold text-white pr-2">{item.title}</span>
      </div>
      {isOpen ? (
        <Minus size={20} className="text-accent flex-shrink-0" />
      ) : (
        <Plus size={20} className="text-accent flex-shrink-0" />
      )}
    </button>
    {isOpen && (
      <div className="px-4 pb-4 pl-11">
        <p className="text-small text-white/80">{item.text}</p>
      </div>
    )}
  </div>
);

const HomeExpertise = () => {
  const { expertise } = HOME_CONTENT;
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const current = expertise.items[active];
  const CurrentIcon = ICONS[active];

  const toggleAccordion = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section className="py-20 md:py-36 bg-bg-alt">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 md:mb-24"
        >
          <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display leading-tight mb-6">
            {expertise.title}
          </h2>
          <p className="text-text-muted leading-relaxed max-w-2xl">
            {expertise.intro}
          </p>
        </motion.div>

        {/* Mobile — accordion */}
        <div className="lg:hidden flex flex-col gap-3">
          {expertise.items.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              icon={ICONS[index]}
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
            />
          ))}
        </div>

        {/* Desktop — split interactif */}
        <div className="hidden lg:grid grid-cols-[320px_1fr] gap-16 items-start">
          {/* Left — navigation list */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col gap-1 relative"
          >
            <motion.div
              className="absolute left-0 top-0 w-[3px] bg-accent rounded-full"
              animate={{ top: active * 52, height: 44 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />

            {expertise.items.map((item, index) => (
              <button
                key={item.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`
                  relative text-left py-3 pl-6 pr-4 rounded-xl transition-colors duration-300 cursor-pointer
                  ${active === index ? 'bg-white shadow-sm' : 'hover:bg-white/50'}
                `}
              >
                <span className={`
                  text-base font-medium transition-colors duration-300
                  ${active === index ? 'text-primary' : 'text-text-muted'}
                `}>
                  {item.title}
                </span>
              </button>
            ))}
          </motion.nav>

          {/* Right — detail panel */}
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease }}
                className="sticky top-28"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-border flex items-center justify-center">
                    <CurrentIcon size={30} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-text-muted tracking-wider">
                    0{active + 1} / 0{expertise.items.length}
                  </span>
                </div>

                <h3 className="text-4xl lg:text-5xl text-primary font-bold font-display leading-tight mb-6">
                  {current.title}
                </h3>

                <p className="text-text-muted leading-relaxed text-lg lg:text-xl">
                  {current.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeExpertise;
