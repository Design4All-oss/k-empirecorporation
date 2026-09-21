import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import HomeNewsletter from '../components/home/HomeNewsletter';
import Button from '../components/ui/Button';
import { ArrowRight, Users, Target, Shield, Clock, Briefcase, Star, Award, Zap, Globe, Handshake, BarChart3, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';
import { useStatistiques } from '../hooks/useSiteContent';

const fallbackStats = [
  { value: "200+", label: "Entreprises accompagnées", icon: Briefcase },
  { value: "98%", label: "Taux de satisfaction", icon: Star },
  { value: "15+", label: "Années d'expertise", icon: Award },
  { value: "50+", label: "Experts consultants", icon: Users }
];

const statsIcons = [Briefcase, Star, Award, Users];

const ServiceConseil = () => {
  const { openBookingModal } = useBookingModal();
  const { data: statsData } = useStatistiques();
  const stats = (statsData?.conseilStrategie?.length ? statsData.conseilStrategie : fallbackStats).map(
    (s, i) => ({ ...s, icon: s.icon || statsIcons[i % statsIcons.length] })
  );

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
      <SEO
        title="Conseil & Stratégie"
        description="K-EMPIRE Corporation vous accompagne dans la définition et la mise en œuvre de votre stratégie de développement. Conseil stratégique pour entreprises au Togo."
        url="/services/conseil-strategie"
        image="/assets/images/services/hero.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Conseil & Stratégie d'entreprise",
          "description": "Accompagnement stratégique pour entreprises au Togo.",
          "url": "https://www.k-empirecorporation.com/services/conseil-strategie",
          "provider": {
            "@type": "Organization",
            "name": "K-EMPIRE Corporation"
          }
        }}
      />
      <PageBanner
        title="Conseil & Stratégie"
        description="Transformez vos ambitions en résultats concrets avec un accompagnement stratégique personnalisé. Nous accompagnons les entreprises qui changent le monde."
        imageUrl="/assets/images/services/hero.png"
        imageAlt="Conseil stratégique d'entreprise"
      />

{/* Hero Section with Image */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/assets/images/services/strategie.png"
                  alt="Conseil stratégique d'entreprise"
                  className="w-full h-full object-cover"
                />
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
                  {[
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=afro1&skinColor=darkbrown&hairColor=brown&hairColor=black&facialHair=beardMagestic&facialHairColor=black",
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=afro2&skinColor=darkbrown&hairColor=brown&hairColor=black&facialHair=beardMedium&facialHairColor=black",
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=afro3&skinColor=darkbrown&hairColor=brown&hairColor=black&eyes=happy&facialHair=beardLight&facialHairColor=black"
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Expert"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover"
                    />
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
              <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
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
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
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
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="text-h2-m md:text-h2-d text-primary font-bold font-display mb-6 leading-tight">
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
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                    src="/assets/images/services/cta.jpg"
                    alt="Équipe conseil stratégique"
                    className="w-full h-auto object-cover rounded-3xl"
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
      <HomeNewsletter />
    </div>
  );
};

export default ServiceConseil;
