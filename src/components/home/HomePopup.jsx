import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Calendar, MapPin, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useFeaturedFormations } from '../../hooks';

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const HomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const { data: featuredFormations, isLoading } = useFeaturedFormations();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const featuredEvent = featuredFormations && featuredFormations.length > 0 ? featuredFormations[0] : null;
  const hasFeatured = featuredEvent && featuredEvent.title;

  if (isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] cursor-pointer"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors z-10"
              >
                <X size={16} className="text-white" />
              </button>

              {hasFeatured ? (
                <>
                  <div className="relative">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                        {featuredEvent.type || featuredEvent.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-white text-lg font-bold font-display mb-2 line-clamp-2">
                        {featuredEvent.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/80 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {featuredEvent.nextSession || featuredEvent.date || 'Voir les details'}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {featuredEvent.location || featuredEvent.format || 'Presentiel / En ligne'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-text-muted mb-4 text-sm">
                      Formation a la une - Ne manquez pas cette opportunite !
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={`/formations/${featuredEvent.slug}`} onClick={handleClose}>
                        <Button variant="primary" className="w-full sm:w-auto">
                          Voir le programme
                          <ArrowRight size={18} className="ml-2" />
                        </Button>
                      </Link>
                      <Link to="/formations" onClick={handleClose}>
                        <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent text-accent font-semibold rounded-pill transition-colors text-small tracking-tight">
                          Voir les formations
                        </button>
                      </Link>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-center text-sm text-text-muted mb-4">
                        Rejoignez notre communauté
                      </p>
                      <div className="flex justify-center gap-4">
                        <a
                          href="https://t.me/kempirecorporation"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-full hover:bg-[#0077b5] transition-colors"
                        >
                          <TelegramIcon />
                          <span className="font-medium text-sm">Telegram</span>
                        </a>
                        <a
                          href="https://wa.me/228"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle size={20} />
                          <span className="font-medium text-sm">WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative h-56 bg-gradient-to-br from-primary via-primary to-[#0a2d47] overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <Send className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                      COMMUNAUTE K-EMPIRE
                    </span>
                    <h3 className="text-xl font-bold text-primary font-display mb-2">
                      Rejoignez 5 000+ Professionnels
                    </h3>
                    <p className="text-text-muted text-sm mb-6">
                      Accedez a nos ressources gratuites, formations exclusives et reseau d'experts sur Telegram et WhatsApp.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <a
                        href="https://t.me/kempirecorporation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-full hover:bg-[#0077b5] transition-colors"
                      >
                        <TelegramIcon />
                        <span className="font-medium text-sm">Rejoindre Telegram</span>
                      </a>
                      <a
                        href="https://wa.me/228"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      >
                        <MessageCircle size={20} />
                        <span className="font-medium text-sm">Rejoindre WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-xs text-text-muted mt-6">
                      Gratuit. Sans spam. Des opportunites reelles.
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HomePopup;
