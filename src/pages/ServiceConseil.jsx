import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '../components/ui/PageBanner';
import AboutNewsletter from '../components/about/AboutNewsletter';
import Button from '../components/ui/Button';
import { Compass, ArrowRight, CheckCircle, Users, TrendingUp, Target, Shield, Clock, MapPin, BookOpen, Award, Briefcase, Zap, ChevronRight, Rocket, Globe, Lightbulb, Star, Sparkles, BarChart3, Handshake, PhoneCall, Mail, MessageCircle } from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';

const ServiceConseil = () => {
  const { openBookingModal } = useBookingModal();
  const stats = [
    { value: "200+", label: "Entreprises accompagnées", icon: Briefcase },
    { value: "98%", label: "Taux de satisfaction", icon: Star },
    { value: "15+", label: "Années d'expertise", icon: Award },
    { value: "50+", label: "Experts consultants", icon: Users }
  ];

  const services = [
    {
      icon: Target,
      title: "Stratégie de croissance",
      desc: "Définissez votre trajectoire de croissance avec des objectifs clairs et atteignables."
    },
    {
      icon: Zap,
      title: "Transformation digitale",
      desc: "Modernisez vos processus et adoptez les technologies de demain."
    },
    {
      icon: Globe,
      title: "Expansion internationale",
      desc: "Conquérez de nouveaux marchés avec une stratégie d'internationalisation solide."
    },
    {
      icon: Handshake,
      title: "Conseil en gouvernance",
      desc: "Optimisez votre structure de gouvernance pour une meilleure performance."
    },
    {
      icon: BarChart3,
      title: "Performance financière",
      desc: "Améliorez votre rentabilité avec des analyses et recommandations sur mesure."
    },
    {
      icon: Sparkles,
      title: "Innovation & RSE",
      desc: "Intégrez l'innovation et la responsabilité sociale dans votre stratégie."
    }
  ];

  const process = [
    { num: "01", title: "Diagnostic", desc: "Analyse approfondie de votre situation actuelle" },
    { num: "02", title: "Stratégie", desc: "Élaboration de solutions personnalisées" },
    { num: "03", title: "Déploiement", desc: "Mise en œuvre avec accompagnement continu" },
    { num: "04", title: "Suivi", desc: "Évaluation et optimisation des résultats" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/assets/images/services/coverImage.png"
          alt="Conseil stratégique d'entreprise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-h2-m md:text-h2-d font-bold font-display mb-4 leading-tight">
              Conseil & Stratégie
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Transformez vos ambitions en résultats concrets avec un accompagnement stratégique personnalisé. Nous accompagnons les entreprises qui changent le monde.
            </p>
          </div>
        </div>
      </div>

      {/* About / Stats Section with Image Collage */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" 
                      alt="Team collaboration"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-primary p-6 flex flex-col justify-center">
                    <p className="text-4xl font-bold text-accent mb-1">15+</p>
                    <p className="text-white/80 text-sm">Années d'expertise</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-accent p-6 flex flex-col justify-center">
                    <p className="text-4xl font-bold text-primary mb-1">200+</p>
                    <p className="text-primary/80 text-sm">Entreprises accompagnées</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop" 
                      alt="Team meeting"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl px-6 py-3 flex items-center gap-3"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">+50 experts</span>
              </motion.div>
            </motion.div>
            
            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-h2-m md:text-h2-d text-primary mt-3 mb-6 leading-tight">
                Votre partenaire stratégique pour la réussite
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chez K-EMPIRE CORPORATION, nous croyons que chaque entreprise mérite un accompagnement 
                sur mesure. Notre équipe d'experts combine expertise sectorielle et vision stratégique 
                pour vous aider à atteindre vos objectifs.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Que vous soyez une startup en phase de croissance ou un groupe établi, 
                nous mettons notre savoir-faire au service de votre réussite.
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <stat.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              Services que nous proposons
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Des solutions complètes pour accompagner votre entreprise à chaque étape de sa croissance
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
              Notre processus de travail
            </h2>
          </motion.div>
          
          <div className="relative">
            {/* Connecting line */}
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
                  Prêt à transformer votre entreprise ?
                </h2>
                <p className="text-body text-text-muted leading-relaxed">
                  Chaque grand voyage commence par un premier pas. Parlons de votre projet et découvrons ensemble comment atteindre vos objectifs avec un accompagnement stratégique sur mesure.
                </p>
              </motion.div>

              {/* Colonne 2 : Image */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center relative">
                <div className="w-full max-w-[360px] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop" 
                    alt="Business meeting"
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
                    <span className="text-small">Consultation stratégique gratuite</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Target size={18} className="text-accent flex-shrink-0" />
                    <span className="text-small">Stratégie personnalisée</span>
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
                    Échanger avec un expert
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

export default ServiceConseil;
