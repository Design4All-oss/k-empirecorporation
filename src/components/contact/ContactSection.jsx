import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

const subjects = [
  { value: '', label: 'Sélectionnez un objet' },
  { value: 'conseil', label: 'Conseil & stratégie' },
  { value: 'formation', label: 'Formation' },
  { value: 'audit', label: 'Audit & diagnostic' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'autre', label: 'Autre' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    function: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.subject) newErrors.subject = 'Veuillez sélectionner un objet';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (submitStatus === 'error') {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('success');
    setIsSubmitted(true);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden !mb-0">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 xl:gap-12 items-center">
          {/* Left Side - Info Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 lg:pt-8"
          >
            {/* Badge */}
            <div className="flex items-center gap-2 bg-accent/10 text-accent border border-accent pr-4 w-fit p-1 rounded-full">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">Contact</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-display mb-2">
              Parlons de votre projet
            </h1>

            {/* Description */}
            <p className="text-text-muted text-base md:text-lg max-w-xl">
              Vous avez un projet, une question ou un besoin spécifique ? 
              Remplissez le formulaire ou contactez-nous directement pour démarrer une conversation.
            </p>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-primary">+228 90 00 00 00</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-primary">Kara, Togo</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-primary">contact@k-empirecorporation.com</span>
              </div>
            </div>

            {/* Quote/CTA Box */}
            <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-2xl mt-6">
              <div className="flex-1">
                <p className="text-lg text-primary font-medium leading-snug">
                  "Transformez vos ambitions en résultats concrets. Parlons de votre projet dès aujourd'hui et créons ensemble l'avenir que vous méritez."
                </p>
              </div>
              <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <img 
                  src="/assets/images/contactImage.webp" 
                  alt="K-EMPIRE" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary rounded-3xl p-8 md:p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Message envoyé avec succès !</h3>
                <p className="text-white/70">
                  Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-primary rounded-3xl p-8 md:p-10"
              >
                {/* Error/Success Message */}
                <AnimatePresence>
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 mb-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">Veuillez remplir tous les champs obligatoires correctement.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm mb-2 text-white">
                      Nom et prénom *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom complet"
                        className={`w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all ${errors.fullName ? 'ring-2 ring-red-500' : ''}`}
                      />
                      {errors.fullName && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Organization & Function Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="organization" className="block text-sm mb-2 text-white">
                        Organisation / Entreprise
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Nom de votre entreprise"
                        className="w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="function" className="block text-sm mb-2 text-white">
                        Fonction
                      </label>
                      <input
                        type="text"
                        id="function"
                        name="function"
                        value={formData.function}
                        onChange={handleChange}
                        placeholder="Votre poste"
                        className="w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 text-white">
                        Adresse e-mail *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="votre@email.com"
                          className={`w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.email && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-400">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-2 text-white">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+228 90 00 00 00"
                        className="w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all"
                      />
                    </div>
                  </div>

                  {/* Country & Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm mb-2 text-white">
                        Pays
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Votre pays"
                        className="w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm mb-2 text-white">
                        Objet de la demande *
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-3 rounded-2xl bg-white/35 border-none h-14 text-white focus:outline-none focus:bg-white/45 transition-all [&>option]:text-primary ${errors.subject ? 'ring-2 ring-red-500' : ''}`}
                        >
                          {subjects.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-400 pointer-events-none">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm mb-2 text-white">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Décrivez votre projet ou votre demande..."
                        className={`w-full px-4 py-3 rounded-2xl bg-white/35 border-none text-white placeholder:text-white/50 focus:outline-none focus:bg-white/45 transition-all resize-none ${errors.message ? 'ring-2 ring-red-500' : ''}`}
                      />
                      {errors.message && (
                        <div className="absolute right-3 top-4 flex items-center gap-1 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* RGPD Notice */}
                  <p className="text-xs text-white/50">
                    Vos informations ne seront utilisées que pour traiter votre demande et ne seront jamais partagées avec des tiers sans votre accord.
                  </p>

                  {/* Submit Button */}
                  <div className="mt-5">
                    <button 
                      type="submit"
                      className="group relative inline-flex items-center h-14 pl-3 pr-6 font-semibold rounded-full bg-white text-primary"
                    >
                      {/* Gradient overlay that spreads on click */}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F] via-[#2d5a8a] to-[#1E3A5F] opacity-0 group-active:opacity-100 transition-opacity duration-500 rounded-full" />
                      
                      {/* Icon */}
                      <span className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-12 relative z-10">
                        <Send className="w-4 h-4" />
                      </span>
                      
                      {/* Text */}
                      <span className="relative z-10 transition-all duration-300 group-hover:text-white">Envoyer</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;