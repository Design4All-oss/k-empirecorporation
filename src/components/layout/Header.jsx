import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ArrowRight, Compass, Search, Scale, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { COMMON_CONTENT } from '../../constants/content';
import Button from '../ui/Button';

const servicesItems = [
  {
    id: 1,
    icon: Compass,
    title: "Conseil & stratégie d'entreprise",
    description: "Nous aidons les dirigeants et décideurs à prendre des décisions éclairées.",
    link: "/services/conseil-strategie"
  },
  {
    id: 2,
    icon: Search,
    title: "Audit & diagnostic",
    description: "Nos audits vous permettent d'avoir une vision claire des forces et faiblesses.",
    link: "/services/audit-diagnostic"
  },
  {
    id: 3,
    icon: Scale,
    title: "Assistance juridique, comptable & fiscale",
    description: "Nous sécurisons vos décisions et opérations grâce à un accompagnement adapté.",
    link: "/services/assistance-juridique"
  },
  {
    id: 4,
    icon: GraduationCap,
    title: "Formations & renforcement de capacités",
    description: "Nous concevons des parcours de formation adaptés aux besoins des professionnels.",
    link: "/formations"
  }
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();

  const { nav } = COMMON_CONTENT.header;
  
  const isSinglePage = (location.pathname.startsWith('/blog/') && location.pathname !== '/blog') 
    || (location.pathname.startsWith('/formations/') && location.pathname !== '/formations')
    || (location.pathname.startsWith('/event/') && location.pathname !== '/event')
    || ['/a-propos', '/services', '/formations', '/blog', '/contact'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-4 bg-white/90 backdrop-blur-sm shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/assets/logos/Logo_kempire.svg" 
            alt="K-EMPIRE" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item, index) => (
            item.label === 'Services' ? (
              <div 
                key={index} 
                className="relative group"
                ref={servicesRef}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link 
                  to={item.path}
                  className={`text-small font-semibold transition-all duration-300 hover:text-accent font-display flex items-center gap-1 ${
                    location.pathname === item.path ? 'text-accent' : scrolled || !isSinglePage ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item.label}
                  <ChevronRight 
                    size={14} 
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                </Link>
                
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-white rounded-3xl shadow-2xl p-6"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        {servicesItems.map((service) => (
                          <Link 
                            key={service.id}
                            to={service.link}
                            className="flex gap-4 p-4 rounded-xl hover:bg-bg-alt transition-colors group"
                          >
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                              <service.icon size={24} className="text-primary group-hover:text-white transition-colors" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors">
                                {service.title}
                              </h3>
                              <p className="text-sm text-text-muted line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                key={index} 
                to={item.path} 
                className={`text-small font-semibold transition-all duration-300 hover:text-accent font-display ${
                  location.pathname === item.path ? 'text-accent' : scrolled || !isSinglePage ? 'text-primary' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <span className="w-8"></span>
          <Button variant="primary" size="sm" className="shadow-sm">
            Rejoindre l'élite
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden w-10 h-10 flex items-center justify-center text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-primary z-40 lg:hidden flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-white text-xl font-bold">K-EMPIRE</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {nav.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path} 
                  onClick={() => setIsOpen(false)}
                  className="text-white text-2xl font-semibold flex justify-between items-center group"
                >
                  {item.label}
                  <ChevronRight size={24} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/10">
              <Button variant="accent" size="lg" className="w-full">
                Nous Contacter
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
