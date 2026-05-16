import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '../components/ui/PageBanner';
import AboutNewsletter from '../components/about/AboutNewsletter';
import Button from '../components/ui/Button';
import { Scale, ArrowRight, CheckCircle, Shield, FileText, Calculator, Briefcase, Building, UserCheck, Stamp, Globe, AlertTriangle, Lock, Award, ChevronRight, PenTool, FileCheck, Microscope, BriefcaseIcon, Gavel, Users, Clock, Heart, PhoneCall, Mail, MessageCircle } from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';

const ServiceJuridique = () => {
  const { openBookingModal } = useBookingModal();
  const story = {
    intro: "Votre entreprise est exposée à des risques juridiques constants. Un contrat mal rédigé, une clause abusive, un contrôle fiscal imprévu... Et soudain, ce qui semblait secondaire devient une menace majeure pour votre activité.",
    guarantee: "Nos experts vous protègent avant qu'il ne soit trop tard. Nous anticipons les risques, sécurisons vos décisions et vous accompagnent au quotidien pour que vous puissiez vous concentrer sur votre cœur de métier en toute sérénité."
  };

  const commitments = [
    { title: "Prévention", desc: "Nous anticipons les risques avant qu'ils ne se matérialisent. Diagnostic, mise en conformité, veille juridique.", icon: Shield },
    { title: "Protection", desc: "Nous sécurisons vos décisions et vos contrats. Défense de vos intérêts en cas de litige.", icon: Lock },
    { title: "Optimisation", desc: "Nous optimisons votre situation fiscale et comptable. Légèreté fiscale dans le respect de la loi.", icon: Calculator },
    { title: "Accompagnement", desc: "Nous restons à vos côtés au quotidien. Un partenaire disponible pour répondre à vos questions.", icon: Heart }
  ];

  const domains = [
    {
      title: "Droit des affaires",
      desc: "De la création de votre société à sa restructuration, nous vous accompagnons dans toutes les étapes clés : rédaction de statuts, négociation de contrats, fusions-acquisitions, procédures collectives.",
      keywords: ["Création de société", "Contrats commerciaux", "Fusions-Acquisitions", "Restructuration"]
    },
    {
      title: "Fiscalité des entreprises",
      desc: "Optimisation fiscale légitime, déclarations, accompagnement lors des contrôles. Nous optimisons votre charge fiscale tout en garantissant votre conformité.",
      keywords: ["Optimisation fiscale", "Déclarations", "Contrôles fiscaux", "Planification"]
    },
    {
      title: "Droit du travail",
      desc: "Contrats de travail, réglementation, gestion des conflits sociaux. Nous vous aidons à construire une relation de travail solide et conforme.",
      keywords: ["Contrats de travail", "Réglementation", "Conflits sociaux", "Formation"]
    },
    {
      title: "Propriété intellectuelle",
      desc: "Protection de vos marques, brevets, droits d'auteur. Nous défendons vos actifs immatériels contre toute contrefaçon.",
      keywords: ["Marques", "Brevets", "Droits d'auteur", "Litiges"]
    },
    {
      title: "Droit bancaire & financier",
      desc: "Accompagnement dans vos relations avec les établissements bancaires, levée de fonds, émissions obligataires.",
      keywords: ["Relations bancaires", "Levée de fonds", "Obligations", "Financement"]
    },
    {
      title: "Contentieux & arbitration",
      desc: "Représentation devant les tribunaux, médiation, arbitration. Nous défendons vos intérêts avec efficacité.",
      keywords: ["Contentieux", "Médiation", "Arbitrage", "Négociation"]
    }
  ];

  const stats = [
    { number: "500+", label: "Entreprises accompagnées", icon: Building },
    { number: "15+", label: "Années d'expérience", icon: Clock },
    { number: "98%", label: "Taux de réussite", icon: Award },
    { number: "24/7", label: "Support disponible", icon: Users }
  ];

  const situations = [
    { title: "Créer ou modifier une société", urgent: false },
    { title: "Rédiger ou négocier un contrat important", urgent: false },
    { title: "Anticiper un contrôle fiscal", urgent: true },
    { title: "Résoudre un litige avec un partenaire", urgent: true },
    { title: "Optimiser sa structure fiscale", urgent: false },
    { title: "Mettre en conformité son entreprise (RGPD, etc.)", urgent: false }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <PageBanner
        title="Assistance Juridique, Comptable & Fiscale"
        description="La complexité juridique, comptable et fiscale ne doit pas être un obstacle. Nos experts vous accompagnent pour sécuriser votre activité et optimiser votre performance."
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Assistance juridique et fiscale"
      />

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-h2-m md:text-h2-d text-primary mt-4">
                "Votre entreprise est exposée. Nous la protégeons."
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-body text-text-muted text-center leading-relaxed mb-12">
              {story.intro}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-body text-text text-center leading-relaxed">
              {story.guarantee}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Commitments - 4 columns */}
      <section className="py-24 bg-bg-alt">
        <div className="max-w-container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-h2-m md:text-h2-d text-primary mt-4">Ce que nous faisons pour vous</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all text-left">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mr-auto mb-4">
                  <item.icon size={28} className="text-accent" />
                </div>
                <h3 className="text-h3-m md:text-h3-d font-bold text-primary mb-2 break-words">{item.title}</h3>
                <p className="text-text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="max-w-container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <item.icon size={32} className="text-accent" />
                  <p className="text-4xl md:text-5xl font-bold text-white font-display">{item.number}</p>
                </div>
                <p className="text-white/70 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains of Expertise */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-h2-m md:text-h2-d text-primary mt-4">Nos domaines d'intervention</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.05 }} className="group bg-white border-2 border-gray-100 hover:border-accent/30 rounded-3xl p-8 transition-all hover:shadow-lg">
                <h3 className="text-h3-m md:text-h3-d font-bold text-primary mb-3 group-hover:text-accent transition-colors">{domain.title}</h3>
                <p className="text-text-muted mb-4">{domain.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {domain.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-bg-alt text-text-muted text-xs rounded-md">{keyword}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* When to contact us */}
      <section className="py-24 bg-bg-alt">
        <div className="max-w-container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4 mb-6">Quand nous contacter ?</h2>
              <p className="text-text-muted mb-8">Chaque situation nécessite une expertise spécifique. N'attendez pas qu'un problème devienne une crise pour solliciter nos services.</p>
              <div className="space-y-3">
                {situations.map((situation, index) => (
                  <div key={index} className={`flex items-center justify-between gap-3 p-4 bg-white rounded-xl ${situation.urgent ? 'border-l-4 border-red-500' : ''}`}>
                    <span className="text-text-muted flex-1">{situation.title}</span>
                    {situation.urgent ? (
                      <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
                    ) : (
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="bg-primary rounded-3xl p-8 text-white h-full">
                <h3 className="text-h3-m md:text-h3-d font-bold mb-6">Pourquoi nous faire confiance ?</h3>
                <div className="space-y-4 mb-8">
                  {[
                    "Une équipe pluridisciplinaire (avocats, experts-comptables, fiscalistes)",
                    "Une approche proactive qui anticipe les risques",
                    "Une disponibilité totale pour répondre à vos besoins",
                    "Une confidentialité absolue sur vos informations"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-accent flex-shrink-0 mt-1" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-white/80 italic border-t border-white/20 pt-6">
                  "Chaque situation est unique. Parlons de votre projet pour trouver la meilleure solution."
                </p>
              </div>
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
                  Protégez votre entreprise dès aujourd'hui
                </h2>
                <p className="text-body text-text-muted leading-relaxed">
                  Nos experts sont prêts à vous accompagner. Prenez rendez-vous pour une consultation gratuite et sécurisez votre activité avec des conseils juridiques, comptables et fiscaux personnalisés.
                </p>
              </motion.div>

              {/* Colonne 2 : Image */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center relative">
                <div className="w-full max-w-[360px] relative">
                  <img 
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cee95?w=600&h=400&fit=crop" 
                    alt="Legal services"
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
                    <span className="text-small">Consultation gratuite</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Shield size={18} className="text-accent flex-shrink-0" />
                    <span className="text-small">Confidentialité assurée</span>
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

export default ServiceJuridique;
