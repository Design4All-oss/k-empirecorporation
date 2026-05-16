import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

const subjects = [
  { value: '', label: 'Sélectionnez un objet' },
  { value: 'conseil', label: 'Conseil & stratégie' },
  { value: 'formation', label: 'Formation' },
  { value: 'audit', label: 'Audit & diagnostic' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'autre', label: 'Autre' },
];

const ContactForm = () => {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="text-label text-accent mb-4 block">
            Formulaire de contact
          </span>
          <h2 className="text-h2-m md:text-h2-d font-bold text-primary font-display mb-4">
            Une demande ? Un projet ?
          </h2>
          <p className="text-text-muted mb-8">
            Remplissez ce formulaire pour toute demande d'information, de devis ou de rendez-vous.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Message envoyé !</h3>
              <p className="text-text-muted">
                Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="fullName" className="text-small font-medium text-primary mb-2 block">
                  Nom et prénom *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text"
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div>
                <label htmlFor="organization" className="text-small font-medium text-primary mb-2 block">
                  Organisation / Entreprise
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              
              <div>
                <label htmlFor="function" className="text-small font-medium text-primary mb-2 block">
                  Fonction
                </label>
                <input
                  type="text"
                  id="function"
                  name="function"
                  value={formData.function}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text"
                  placeholder="Votre poste"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-small font-medium text-primary mb-2 block">
                  Adresse e-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="text-small font-medium text-primary mb-2 block">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text"
                  placeholder="+228 90 00 00 00"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="text-small font-medium text-primary mb-2 block">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text"
                  placeholder="Votre pays"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="text-small font-medium text-primary mb-2 block">
                Objet de la demande *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text bg-white"
              >
                {subjects.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="text-small font-medium text-primary mb-2 block">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-text resize-none"
                placeholder="Décrivez votre projet ou votre demande..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-text-muted">
                Vos informations ne seront utilisées que pour traiter votre demande et ne seront jamais partagées avec des tiers sans votre accord.
              </p>
              <Button type="submit" variant="primary" className="flex items-center gap-2">
                <Send size={18} />
                Envoyer le message
              </Button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;