import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Calendar, MapPin, Users, Mail, User, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useBookingModal } from '../../context/BookingModalContext';
import { useFeaturedFormations } from '../../hooks';

const HomePopup = () => {
  const { openBookingModal } = useBookingModal();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    email: '',
    country: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
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
                    <p className="text-text-muted mb-6">
                      Vous souhaitez developper les competences de vos equipes ou beneficier d'un accompagnement personnalise ? Parlons de vos besoins.
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
                        <Users className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Bienvenue dans la communaute !</h3>
                        <p className="text-text-muted">Vous recevrez nos actualites et opportunities par email.</p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-3">
                            COMMUNAUTE K-EMPIRE
                          </span>
                          <h3 className="text-xl font-bold text-primary font-display mb-2">
                            Rejoignez 5 000+ Professionnels
                          </h3>
                          <p className="text-text-muted text-sm">
                            Accedez a nos ressources gratuites, formations exclusives et reseau d'experts.
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Prenom"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                              />
                            </div>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                              <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Nom"
                                required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="text"
                              name="profession"
                              value={formData.profession}
                              onChange={handleChange}
                              placeholder="Profession / Fonction"
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Email professionnel"
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                            />
                          </div>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Pays"
                              required
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                            />
                          </div>

                          <Button
                            type="submit"
                            variant="primary"
                            className="w-full justify-center mt-4"
                          >
                            Rejoindre la communaute
                            <ArrowRight size={18} className="ml-2" />
                          </Button>
                        </form>

                        <p className="text-xs text-text-muted text-center mt-4">
                          Gratuit. Sans spam. Des opportunites reelles.
                        </p>
                      </>
                    )}
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