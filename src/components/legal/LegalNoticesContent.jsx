import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, Globe, Lock, FileText, Users, Mail, Phone, ArrowRight, ExternalLink } from 'lucide-react';

const LegalNoticesContent = () => {
  const sections = [
    {
      icon: Scale,
      title: "1. Éditeur du site",
      content: `K-EMPIRE CORPORATION est une structure de conseil et d'accompagnement basée au Togo, active dans les domaines du droit, de la comptabilité, de la fiscalité et du management. Le site web accessible à l'adresse www.k-empirecorporation.com est édité par :

K-EMPIRE CORPORATION
Quartier Kara Centre, Togo
Email : contact@k-empirecorporation.com
Téléphone : +228 90 00 00 00

Le directeur de la publication est le représentant légal de K-EMPIRE CORPORATION, personne morale dûment enregistrée auprès des autorités compétentes togolaises.`,
      hasList: false
    },
    {
      icon: Globe,
      title: "2. Hébergement & Technologies",
      content: `Le site est hébergé par des serveurs sécurisés situés dans des centres de données conformes aux normes internationales. L'infrastructure technique assure une disponibilité continue et une protection optimale des données.

Les technologies utilisées incluent React pour le frontend, avec une architecture moderne garantissant des temps de chargement rapides et une expérience utilisateur fluide sur tous les appareils.

Le design responsive s'adapte parfaitement aux ordinateurs, tablettes et smartphones, offrant une navigation optimale quelque soit le device utilisé.`,
      hasList: false
    },
    {
      icon: Shield,
      title: "3. Propriété Intellectuelle",
      content: `L'intégralité du contenu de ce site constitue une œuvre protégée par les droits de propriété intellectuelle. ceci incluant, de manière non exhaustive : les textes, graphiques, images, vidéos, logos, icônes, éléments sonores, logiciels, bases de données et tout autre élément présent sur le site.

Toute reproduction, représentation, modification, publication, transmission, ou dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, sans autorisation préalable et écrite de K-EMPIRE CORPORATION, est interdite et constitutive de contrefaçon.

Les marques K-EMPIRE CORPORATION et tous autres signes distinctifs présents sur le site sont protégés. Toute utilisation non autorisée engagerait la responsabilité civile et pénale du contrevenant.`,
      columns: true,
      hasList: false
    },
    {
      icon: FileText,
      title: "4. Responsabilité & Limitation",
      content: `K-EMPIRE CORPORATION s'attache à fournir des informations exactes, complètes et actuelles. Toutefois, nous ne pouvons garantir l'exactitude absolue de toutes les informations publiées.

Les contenus presentés sur ce site sont fournis à titre purement informatif et ne constituent en aucun cas un conseil juridique, fiscal, comptable ou de gestion personnalisé. Les visiteurs sont invités à consulter des professionnels qualifiés pour toute décision importante.

Nous declinons toute responsabilité pour tout dommage direct ou indirect pouvant résulter de l'utilisation des informations contenues sur ce site, y compris les décisions prises sur la base de ces informations sans consultation préalable d'un professionnel.`,
      columns: true,
      hasList: false
    },
    {
      icon: ExternalLink,
      title: "5. Liens Hypertextes & Partenariats",
      content: `Le site peut contenir des liens vers des sites externes, partenaires ou non. K-EMPIRE CORPORATION n'exerce aucun contrôle sur ces sites tiers et décline toute responsabilité quant à leur contenu, leur disponibilité, leur politique de confidentialité, ou les dommages pouvant résulter de leur consultation.

L'établissement d'un lien hypertexte vers le site K-EMPIRE CORPORATION nécessite une autorisation préalable et écrite de notre part. Les sites souhaitant créer un lien doivent soumettre leur demande à : contact@k-empirecorporation.com

K-EMPIRE CORPORATION peut presenter des références à des partenaires commerciaux. Ces partenariats ne constituent pas une endorsement ou une garantie de leurs services.`,
      columns: true,
      hasList: false
    },
    {
      icon: Lock,
      title: "6. Protection des Données Personnelles",
      listItems: [
        {
          title: "DONNÉES COLLECTÉES",
          items: [
            "Identité (nom, prénom)",
            "Coordonnées (email, téléphone)",
            "Informations professionnelles",
            "Contenu de vos messages"
          ]
        },
        {
          title: "FINALITÉS",
          items: [
            "Répondre à vos demandes",
            "Vous envoyer des informations sur nos services",
            "Améliorer notre offre",
            "Maintenir une relation professionnelle avec nos clients"
          ]
        },
        {
          title: "CONSERVATION",
          items: [
            "Vos données sont conservées pour une durée limitée",
            "Proportionnelle aux finalités du traitement",
            "Maximum de 3 ans sans activité"
          ]
        },
        {
          title: "VOS DROITS",
          items: [
            "Droit d'accès",
            "Droit de rectification",
            "Droit d'effacement",
            "Droit de limitation",
            "Droit d'opposition",
            "Droit de portabilité"
          ]
        }
      ],
      contact: "Pour exercer vos droits, contactez-nous à : contact@k-empirecorporation.com",
      columns: true
    },
    {
      icon: Users,
      title: "7. Cookies & Technologies similaires",
      listItems: [
        {
          title: "TYPES DE COOKIES",
          items: [
            "Cookies essentiels : nécessaires au fonctionnement technique du site (authentification, panier, préférences linguistiques)",
            "Cookies analytiques : pour comprendre comment les visiteurs utilisent notre site (pages visitées, temps passé, sources de trafic)",
            "Cookies fonctionnels : pour mémoriser vos préférences et améliorer votre expérience"
          ]
        },
        {
          title: "GESTION DES COOKIES",
          items: [
            "Vous pouvez configurer votre navigateur pour refuser les cookies",
            "Cela peut affecter certaines fonctionnalités du site",
            "Vous pouvez également supprimer les cookies déjà enregistrés sur votre appareil",
            "Pour plus d'informations sur notre politique de cookies détaillée, contactez-nous"
          ]
        }
      ],
      columns: true
    },
    {
      icon: Scale,
      title: "8. Droit Applicable & Juridiction",
      content: `Les présentes mentions légales sont régies par le droit togolais, en vigueur à la date de leur publication.

En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux de Kara (Togo) seront seuls compétents, sauf dispositions impératives contraire.

K-EMPIRE CORPORATION se réserve le droit de modifier les présentes mentions légales à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.

Pour toute question concernant ces mentions légales ou pour exercer vos droits, contactez-nous :
Email : contact@k-empirecorporation.com
Téléphone : +228 90 00 00 00
Adresse : Kara, Togo`,
      columns: false,
      hasList: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-label text-accent mb-4 block">Cadre Légal</span>
          <h1 className="text-h1-m md:text-h1-d text-primary font-semibold mb-6">
            Politique Légale
          </h1>
          <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
            La présente page détaille les conditions d'utilisation de notre site web, nos engagements en matière de protection des données, ainsi que le cadre juridique applicable à nos services de conseil et d'accompagnement.
          </p>
        </motion.div>

        {/* Legal Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-16"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="flex flex-col gap-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-primary">
                      {section.title}
                    </h2>
                  </div>
                  
                  {/* Content */}
                  <div className={`text-body text-text-muted leading-relaxed pl-16 ${section.columns ? 'md:columns-2 md:gap-16' : ''}`}>
                    {section.content && (
                      <div className="text-justify whitespace-pre-wrap mb-6">{section.content}</div>
                    )}
                    
                    {section.listItems && section.listItems.map((listGroup, listIndex) => (
                      <div key={listIndex} className="mb-6">
                        <h3 className="text-base font-semibold text-primary mb-3">{listGroup.title}</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-justify">
                          {listGroup.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    {section.contact && (
                      <p className="mt-4 text-justify">{section.contact}</p>
                    )}
                  </div>
                </div>
                
                {/* Divider */}
                {index < sections.length - 1 && (
                  <div className="mt-16 border-t border-gray-100" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-primary to-[#1a5276] rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-title text-white font-semibold mb-3">
                  Une question sur nos mentions légales ?
                </h3>
                <p className="text-white/70 mb-6">
                  Notre équipe est disponible pour répondre à toutes vos questions.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                  <a href="mailto:contact@k-empirecorporation.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-accent hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                    <span>Nous écrire</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="tel:+22890000000" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all">
                    <Phone className="w-5 h-5" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Last Update */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-small text-text-muted">
            Dernière mise à jour : Avril 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalNoticesContent;