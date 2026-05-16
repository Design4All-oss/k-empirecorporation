import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageBanner from '../components/ui/PageBanner';
import AboutNewsletter from '../components/about/AboutNewsletter';
import Button from '../components/ui/Button';
import { Search, ArrowRight, CheckCircle, FileCheck, Shield, TrendingUp, AlertCircle, BarChart3, Microscope, PenTool, Clock, Users, Eye, Target, Zap, ChevronRight, Activity, Crosshair, Compass, ChevronDown, Plus, Minus, FileSearch, Calculator, Building2, LineChart, PhoneCall, Mail, MessageCircle } from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';

const ServiceAudit = () => {
  const { openBookingModal } = useBookingModal();
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { value: "500+", label: "Audits réalisés", icon: FileSearch },
    { value: "98%", label: "Satisfaction client", icon: CheckCircle },
    { value: "15+", label: "Années d'expérience", icon: Clock },
    { value: "50M€", label: "Risques identifiés", icon: Shield }
  ];

  const services = [
    {
      icon: FileSearch,
      title: "Audit juridique",
      desc: "Analyse complète de votre conformité statutaire, réglementaire et contractuelle."
    },
    {
      icon: Calculator,
      title: "Audit fiscal & comptable",
      desc: "Examen approfondi de votre situation fiscale avec optimisation et détection d'anomalies."
    },
    {
      icon: Building2,
      title: "Audit organisationnel",
      desc: "Analyse de votre structure, processus et pratiques managériales pour optimiser la performance."
    },
    {
      icon: LineChart,
      title: "Audit financier",
      desc: "Évaluation complète de votre santé financière avec analyse des indicateurs clés."
    },
    {
      icon: Users,
      title: "Audit RH",
      desc: "Diagnostic de vos ressources humaines, compétences et organisation du travail."
    },
    {
      icon: Shield,
      title: "Audit conformité",
      desc: "Vérification de votre conformité aux normes OHADA et réglementations en vigueur."
    }
  ];

  const process = [
    { num: "01", title: "Diagnostic initial", desc: "Analyse approfondie de votre situation actuelle" },
    { num: "02", title: "Investigation", desc: "Examen détaillé de tous les aspects de votre organisation" },
    { num: "03", title: "Rapport", desc: "Livraison d'un rapport complet avec recommandations" },
    { num: "04", title: "Accompagnement", desc: "Suivi dans la mise en œuvre des actions correctives" }
  ];

  const faqs = [
    {
      question: "Qu'est-ce qu'un audit d'entreprise ?",
      answer: "Un audit d'entreprise est un examen systématique et indépendant de vos processus, finances, conformité juridique et organisation. Il permet d'identifier les forces, faiblesses, risques et opportunités de votre structure."
    },
    {
      question: "Combien de temps dure un audit ?",
      answer: "La durée dépend de la taille de votre entreprise et du type d'audit. En général, un audit complet prend entre 2 et 6 semaines, incluant la phase d'investigation, l'analyse et la rédaction du rapport."
    },
    {
      question: "Quels sont les bénéfices d'un audit ?",
      answer: "Un audit permet d'identifier les risques cachés, d'optimiser vos processus, d'améliorer votre conformité réglementaire, de réduire les coûts et de prendre des décisions éclairées basées sur des données concrètes."
    },
    {
      question: "L'audit est-il confidentiel ?",
      answer: "Absolument. Toutes les informations recueillies lors de l'audit sont strictement confidentielles. Nos équipes signent des accords de confidentialité et nous respectons les normes les plus strictes en matière de protection des données."
    },
    {
      question: "Comment se déroule un audit ?",
      answer: "L'audit se déroule en 4 phases : 1) Diagnostic initial et définition du périmètre, 2) Investigation sur le terrain avec collecte de données, 3) Analyse et rédaction du rapport, 4) Présentation des résultats et accompagnement."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="Audit & Diagnostic"
        description="Ce que vous ne pouvez pas voir vous coûte cher. Nous mettons la lumière sur les risques cachés et les opportunités que vous ignorez."
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Audit et diagnostic d'entreprise"
      />

      {/* Stats Row */}
      <section className="py-16 bg-primary">
        <div className="max-w-container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary mt-3">
              Services d'audit complets
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Des audits rigoureux pour identifier les risques et optimiser la performance de votre entreprise
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: index * 0.1 }} 
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-300">
                  <service.icon size={28} className="text-accent group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-h3-m md:text-h3-d font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary mt-3">
              Notre processus en 4 étapes
            </h2>
          </motion.div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }} 
                  className="relative text-center"
                >
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                    <span className="text-accent font-bold text-xl">{item.num}</span>
                  </div>
                  <h3 className="text-h3-m md:text-h3-d font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-h2-m md:text-h2-d text-primary mt-3 mb-6">
                Questions fréquemment posées
              </h2>
              <p className="text-gray-600 mb-8">
                Vous avez des questions sur nos services d'audit ? Retrouvez ici les réponses aux questions les plus courantes.
              </p>
              <button onClick={() => openBookingModal()} className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-full hover:bg-orange-300 transition-all">
                Poser une question <ArrowRight size={18} />
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-primary overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-accent font-bold text-sm">0{index + 1}</span>
                      <span className="font-semibold text-white">{faq.question}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === index ? 'bg-white' : 'bg-accent/10'}`}>
                      {openFaq === index ? (
                        <Minus size={16} className="text-primary" />
                      ) : (
                        <Plus size={16} className="text-accent" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-14">
                          <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'ease-out' }}
            className="bg-white rounded-3xl relative overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">
              {/* Colonne 1 : Titre et texte */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-left">
                <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
                  Faites la lumière sur votre organisation
                </h2>
                <p className="text-body text-text-muted leading-relaxed">
                  Chaque problème non identifié est une bombe à retardement. Planifiez votre audit dès aujourd'hui et prenez les devants avec un diagnostic complet et précis.
                </p>
              </motion.div>

              {/* Colonne 2 : Image */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center relative">
                <div className="w-full max-w-[360px] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop" 
                    alt="Business audit"
                    className="w-full h-auto object-contain rounded-3xl"
                  />
                </div>
              </motion.div>

              {/* Colonne 3 : Items de rassurance + contact + boutons */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-6">
                {/* Items de rassurance */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Clock size={18} className="text-accent flex-shrink-0" />
                    <span className="text-small">Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <MessageCircle size={18} className="text-accent flex-shrink-0" />
                    <span className="text-small">Diagnostic gratuit</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Shield size={18} className="text-accent flex-shrink-0" />
                    <span className="text-small">Confidentialité totale</span>
                  </div>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-border" />

                {/* Contact info */}
                <div className="space-y-3">
                  <a href="mailto:contact@k-empirecorporation.com" className="flex items-center gap-3 text-primary hover:text-accent transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail size={18} className="text-accent" />
                    </div>
                    <span className="text-body-sm font-medium">contact@k-empirecorporation.com</span>
                  </a>
                  <a href="tel:+228XXXXXXXX" className="flex items-center gap-3 text-primary hover:text-accent transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <PhoneCall size={18} className="text-accent" />
                    </div>
                    <span className="text-body-sm font-medium">+228 XX XX XX XX</span>
                  </a>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-border" />

                {/* Boutons */}
                <div className="flex items-center gap-3">
                  <Button variant="primary" size="lg" onClick={() => openBookingModal()} className="group cursor-pointer justify-center">
                    Planifier un audit
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} strokeWidth={3} />
                  </Button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96, y: 0 }}
                    className="w-12 h-12 rounded-full border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary cursor-pointer flex items-center justify-center flex-shrink-0 bg-transparent transition-all duration-300"
                    aria-label="Contact Direct"
                  >
                    <PhoneCall size={20} strokeWidth={2} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <AboutNewsletter />
    </div>
  );
};

export default ServiceAudit;
