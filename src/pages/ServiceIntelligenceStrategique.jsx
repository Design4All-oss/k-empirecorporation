import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/ui/SEO';
import PageBanner from '../components/ui/PageBanner';
import HomeNewsletter from '../components/home/HomeNewsletter';
import Button from '../components/ui/Button';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Users,
  Plus,
  Minus,
  Radar,
  BrainCircuit,
  Eye,
  TrendingUp,
  LineChart,
  Globe,
  PhoneCall,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { useBookingModal } from '../context/BookingModalContext';

const ServiceIntelligenceStrategique = () => {
  const { openBookingModal } = useBookingModal();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stats = [
    {
      value: '50+',
      label: 'Missions réalisées',
      icon: BrainCircuit,
    },
    {
      value: '98%',
      label: 'Satisfaction client',
      icon: CheckCircle,
    },
    {
      value: '15+',
      label: "Années d'expérience",
      icon: Clock,
    },
    {
      value: '20+',
      label: 'Secteurs analysés',
      icon: Globe,
    },
  ];

  const services = [
    {
      icon: Radar,
      title: 'Veille stratégique',
      desc: "Nous surveillons en continu votre environnement : réglementation, évolutions sectorielles, innovations et signaux faibles, pour anticiper plutôt que subir.",
    },
    {
      icon: TrendingUp,
      title: 'Analyse prospective & scénarios',
      desc: 'Nous construisons des trajectoires futures crédibles et hiérarchisons vos options pour éclairer vos décisions structurantes.',
    },
    {
      icon: LineChart,
      title: 'Études de marché & sectorielles',
      desc: 'Nous analysons marchés, opportunités et menaces pour fonder votre expansion sur des données fiables et actionnables.',
    },
    {
      icon: Eye,
      title: 'Intelligence économique',
      desc: "Nous sécurisons l'information stratégique de votre organisation et valorisons vos actifs immatériels face à la concurrence.",
    },
    {
      icon: Users,
      title: 'Analyse concurrentielle',
      desc: 'Nous décryptons le positionnement de vos concurrents pour identifier vos avantages différenciants et vos axes de progression.',
    },
    {
      icon: Globe,
      title: 'Monitoring & tableaux de bord',
      desc: 'Nous mettons en place des dispositifs de pilotage qui transforment les signaux faibles en alertes exploitables au quotidien.',
    },
  ];

  const process = [
    {
      num: '01',
      title: 'Cadrage des enjeux',
      desc: 'Nous clarifions vos objectifs et les questions stratégiques auxquelles votre organisation doit répondre.',
    },
    {
      num: '02',
      title: 'Collecte & analyse des données',
      desc: 'Nous mobilisons des sources fiables et croisons les informations pour établir un diagnostic complet.',
    },
    {
      num: '03',
      title: 'Scénarios & recommandations',
      desc: 'Nous formalisons des scénarios contrastés et des recommandations opérationnelles hiérarchisées.',
    },
    {
      num: '04',
      title: 'Accompagnement à la décision',
      desc: 'Nous vous accompagnons dans la mise en œuvre et le suivi des décisions pour garantir leur impact.',
    },
  ];

  const faqs = [
    {
      question: "Qu'est-ce que l'intelligence stratégique ?",
      answer:
        "L'intelligence stratégique est un processus organisé de collecte, d'analyse et de diffusion d'informations utiles à la prise de décision. Elle permet d'anticiper les évolutions de votre environnement et de réduire l'incertitude stratégique.",
    },
    {
      question: 'En quoi se distingue-t-elle d\'une étude classique ?',
      answer:
        "Contrairement à une étude ponctuelle, l'intelligence stratégique s'inscrit dans la durée. Elle installe des dispositifs de veille continue, des boucles d'apprentissage et une capacité d'anticipation permanente au service de vos dirigeants.",
    },
    {
      question: 'Quels types de données analysez-vous ?',
      answer:
        "Nous mobilisons des sources ouvertes (réglementation, presse, données publiques), des données sectorielles, des études terrain et des entretiens d'experts. Toutes les informations sont recoupées et sourcées avant d'être partagées.",
    },
    {
      question: 'Combien de temps dure une mission ?',
      answer:
        "Une mission de veille stratégique se déploie généralement sur 2 à 3 mois pour la phase initiale, puis se poursuit en accompagnement continu. Les modalités sont ajustées à vos enjeux et à votre calendrier.",
    },
    {
      question: 'Les informations restent-elles confidentielles ?',
      answer:
        'Absolument. La confidentialité est au cœur de notre pratique : chaque mission est couverte par un engagement de discrétion et les données sensibles sont protégées à toutes les étapes du processus.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Intelligence Stratégique"
        description="Veille stratégique, analyses prospectives et intelligence économique pour éclairer vos décisions : anticipez les évolutions de votre environnement grâce à K-EMPIRE CORPORATION."
        url="/services/intelligence-strategique"
        image="/assets/images/services/coverImage.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Intelligence Stratégique",
          provider: {
            "@type": "Organization",
            name: "K-EMPIRE CORPORATION",
          },
          description:
            "Veille stratégique, analyse prospective, études de marché et intelligence économique au service de la décision.",
          areaServed: "Togo",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Intelligence Stratégique",
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.desc,
              },
            })),
          },
        }}
      />

      <PageBanner
        title="Intelligence Stratégique"
        description="Anticipez, décidez, gagnez : veille stratégique, analyses prospectives et intelligence économique pour éclairer chacune de vos décisions."
        imageUrl="/assets/images/services/coverImage.png"
        imageAlt="Intelligence Stratégique K-EMPIRE CORPORATION"
      />

      {/* Stats */}
      <section className="bg-primary py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                <stat.icon className="mb-3 h-8 w-8 text-accent" />
                <span className="text-4xl font-bold text-white">{stat.value}</span>
                <span className="mt-1 text-sm text-white/60">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Nos prestations
            </span>
            <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
              Des dispositifs d'intelligence sur mesure
            </h2>
            <p className="mt-4 text-gray-600">
              De la veille continue aux analyses prospectives, nous construisons
              une capacité d'anticipation durable au service de votre performance.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent">
                  <service.icon className="h-7 w-7 text-accent transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-primary">{service.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Méthodologie
            </span>
            <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
              Un processus éprouvé en 4 étapes
            </h2>
            <p className="mt-4 text-gray-600">
              Une démarche rigoureuse et transparente, de la définition des enjeux
              jusqu'à l'accompagnement de vos décisions.
            </p>
          </motion.div>

          <div className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="absolute left-[12%] right-[12%] top-12 hidden h-0.5 bg-gray-200 lg:block" />
            {process.map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                  <span className="text-2xl font-bold text-accent">{step.num}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Questions fréquentes
              </span>
              <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
                Vos questions sur l'intelligence stratégique
              </h2>
              <p className="mt-4 text-gray-600">
                Une question spécifique sur votre dispositif de veille ou votre
                démarche prospective ? Notre équipe vous répond sous 24h.
              </p>
              <Button
                onClick={openBookingModal}
                className="mt-8 rounded-full bg-accent font-bold text-primary hover:bg-orange-300"
              >
                Échanger avec un expert
              </Button>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="overflow-hidden rounded-2xl bg-primary"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-accent" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-white/70">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-8 shadow-lg md:p-12"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-primary md:text-4xl">
                  Anticipez les évolutions de votre environnement
                </h2>
                <p className="mt-4 text-gray-600">
                  Mettez en place un dispositif d'intelligence stratégique qui
                  transforme l'information en avantage décisif.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-sm text-gray-700">Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-accent" />
                    <span className="text-sm text-gray-700">Premier échange gratuit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent" />
                    <span className="text-sm text-gray-700">Confidentialité totale</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href="mailto:contact@k-empirecorporation.com"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
                  >
                    <Mail className="h-5 w-5" />
                    contact@k-empirecorporation.com
                  </a>
                  <a
                    href="tel:+22892664550"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
                  >
                    <PhoneCall className="h-5 w-5" />
                    +228 92 66 45 50
                  </a>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button onClick={openBookingModal} size="lg">
                    Planifier une mission
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <a
                    href="tel:+22892664550"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary transition-colors hover:bg-orange-300"
                  >
                    <PhoneCall className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="Réunion de travail"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HomeNewsletter />
    </div>
  );
};

export default ServiceIntelligenceStrategique;
