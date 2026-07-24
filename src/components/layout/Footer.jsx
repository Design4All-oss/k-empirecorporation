import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMMON_CONTENT } from '../../constants/content';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fillRule="evenodd"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent animate-pulse">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const Footer = () => {
  const { contactInfo, socialLinks, copyright } = COMMON_CONTENT.footer;
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "ease-out" } 
    },
  };

  return (
    <footer className="pt-8 md:pt-12 bg-primary relative overflow-hidden border-t border-white/10">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-4">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/assets/logos/Logo_kempireWhite.svg" 
                alt="K-EMPIRE" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-body text-white/70 leading-relaxed">
              Structure, Excellence et Innovation pour une croissance durable au cœur de l'Afrique.
            </p>
            <div className="flex gap-3">
              {socialLinks?.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all"
                  aria-label={link.label}
                >
                  {link.name === "X" && <XIcon />}
                  {link.name === "LinkedIn" && <LinkedInIcon />}
                  {link.name === "Facebook" && <FacebookIcon />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav Columns Mockup */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h4 className="text-small font-semibold text-white">Secteurs</h4>
            <div className="flex flex-col gap-3">
              {['Génie Civil', 'Finance', 'Formations', 'Expertise Juridique'].map((link, idx) => (
                <a key={idx} href="#" className="text-body text-white/60 hover:text-accent flex items-center justify-between group w-fit">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h4 className="text-small font-semibold text-white">L'agence</h4>
            <div className="flex flex-col gap-3">
              {['À propos', 'Études de cas', 'Notre équipe', 'Contact'].map((link, idx) => (
                <a key={idx} href="#" className="text-body text-white/60 hover:text-accent flex items-center justify-between group w-fit">
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h4 className="text-small font-semibold text-white">Contact Bureau</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-accent mt-1 shrink-0" size={20} />
                <p className="text-body text-white">Agoè-Kossigan, Lomé-Togo</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <p className="text-body text-white">+228 92 66 45 50</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <p className="text-body text-white">contact@k-empirecorporation.com</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4 text-small text-white/60">
            <span>&copy; {currentYear} K-EMPIRE CORPORATION</span>
            <span className="hidden md:inline text-accent">|</span>
            <Link to="/mentions-legales" className="hidden md:inline hover:text-accent cursor-pointer">Mentions Légales</Link>
            <Link to="/mentions-legales" className="md:hidden hover:text-accent cursor-pointer">Mentions Légales</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-small text-white/60">Développé avec expérience, pour votre excellence</span>
            <HeartIcon />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
