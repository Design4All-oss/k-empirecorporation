import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, Globe, Lock, FileText, Users, Mail, Phone, ArrowRight, ExternalLink, HelpCircle, Building2, Database, Clock, CheckCircle, Eye } from 'lucide-react';

const LegalNoticesContent = () => {
  const sections = [
    {
      icon: FileText,
      title: "Préambule",
      content: `Les présentes Mentions Légales (ci-après la « Politique ») s'appliquent au site internet www.k-empirecorporation.com (ci-après le « Site »), édité par K-EMPIRE CORPORATION SARL U (ci-après « K-EMPIRE »). L'accès et l'utilisation du Site emportent acceptation pleine et entière des dispositions qui suivent. K-EMPIRE invite tout utilisateur (ci-après l'« Utilisateur ») à en prendre connaissance avant toute navigation.`,
      columns: false,
      hasList: false
    },
    {
      icon: Building2,
      title: "Article 1 - Identification de l'éditeur et responsable du traitement",
      content: `Le Site est édité par K-EMPIRE CORPORATION SARL U, Société à Responsabilité Limitée Unipersonnelle de droit togolais au capital social de 1 000 000 FCFA, immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM) du Togo sous le numéro TG-LRL-01-204-B13-00035, titulaire du numéro d'identification fiscale (NIF) 1001957840 et du numéro CNSS 189389, dont le siège social est établi Quartier Dongoyo, Kara, Togo, représentée par son Gérant, Monsieur KOUDADJE Kouami Emmanuel.

Téléphone : +228 98 78 95 31
Courriel : contact@k-empirecorporation.com

K-EMPIRE agit en qualité de Responsable du Traitement au sens de la loi n°2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République togolaise (ci-après la « LPDCP ») et du Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) pour les traitement concernant des résidents de l'Union européenne. Elle détermine à ce titre les finalités et les moyens des traitements mis en œuvre dans le cadre de l'exploitation du Site et garantit le respect des droits des personnes concernées. Toute question relative à la présente Politique ou à l'exercice des droits qu'elle institue est adressée à contact@k-empirecorporation.com.`,
      columns: false,
      hasList: false
    },
    {
      icon: Globe,
      title: "Article 2 - Hébergement",
      content: `Le Site est hébergé par Hostinger International Limited, société de droit chypriote dont le siège est établi 61 Lordou Vironos str., 6023 Larnaca, Chypre. L'hébergeur met en œuvre des mesures de sécurité reconnues, notamment le chiffrement des transmissions, des sauvegardes régulières et des engagements contractuels conformes au Règlement Général sur la Protection des Données applicables aux transferts vers l'Union européenne. Ces garanties ne dispensent pas K-EMPIRE de ses propres obligations de Responsable du Traitement.`,
      columns: false,
      hasList: false
    },
    {
      icon: Shield,
      title: "Article 3 - Propriété Intellectuelle",
      content: `L'ensemble des éléments composant le Site - textes, images, logos, marques, vidéos, codes sources, contenus pédagogiques et bases de données - est la propriété exclusive de K-EMPIRE ou de ses partenaires et concédants, et est protégé notamment par l'Accord de Bangui instituant l'Organisation Africaine de la Propriété Intellectuelle (OAPI), dont le Togo est État membre. Toute reproduction, représentation, modification ou distribution de ces éléments, totale ou partielle, par quelque procédé que ce soit, est interdite sans l'autorisation écrite préalable de K-EMPIRE, sous réserve des exceptions légales de courte citation et de copie strictement personnelle.`,
      columns: false,
      hasList: false
    },
    {
      icon: ExternalLink,
      title: "Article 4 - Liens Hypertextes",
      content: `Le Site peut comporter des liens vers des sites tiers, fournis à titre purement informatif. K-EMPIRE n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de protection des données. Toute création d'un lien vers le Site requiert l'autorisation écrite préalable de K-EMPIRE, à l'exception des liens simples respectant son image et n'induisant aucune confusion sur l'origine des contenus.`,
      columns: false,
      hasList: false
    },
    {
      icon: Lock,
      title: "Article 5 - Responsabilité",
      content: `K-EMPIRE ne saurait être tenue responsable des contenus publiés par des tiers, des dommages indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le Site, des défaillances imputables à des tiers, ni des événements constitutifs de force majeure. Les présentes limitations ne trouvent toutefois pas à s'appliquer en cas de faute lourde ou de dol imputable à K-EMPIRE, ni ne sauraient porter atteinte aux droits que la loi reconnaît impérativement aux personnes concernées. K-EMPIRE assume en toute hypothèse sa responsabilité en cas de violation avérée de la LPDCP, de manquement à ses obligations de sécurité ou d'atteinte intentionnelle aux droits de propriété intellectuelle de tiers.`,
      columns: false,
      hasList: false
    },
    {
      icon: Database,
      title: "Article 6 - Collecte et finalités des données à caractère personnel",
      content: `Dans le cadre de son activité, K-EMPIRE est amenée à collecter des données d'identification, de contact, contractuelles, de candidature et de navigation, exclusivement dans la mesure nécessaire aux finalités suivantes : l'exécution des contrats et la gestion de la relation client, la prospection commerciale sous réserve du consentement requis, la gestion des candidatures et des recrutements, le respect des obligations légales et fiscales applicables, la sécurité du Site et la prévention de la fraude, ainsi que l'amélioration des services proposés.

Conformément à l'article 14 de la LPDCP et à l'article 6 du RGPD, chaque traitement repose sur le consentement de la personne concernée, sur l'exécution d'un contrat, sur le respect d'une obligation légale, ou sur la sauvegarde des intérêts et droits fondamentaux de la personne concernée. Le Site ne s'adresse pas aux personnes âgées de moins de dix-huit ans ; K-EMPIRE ne collecte pas sciemment de données les concernant.`,
      columns: false,
      hasList: false
    },
    {
      icon: Users,
      title: "Article 7 - Destinataires et transferts internationaux",
      content: `Les données collectées sont destinées aux services internes de K-EMPIRE, à ses prestataires techniques liés par un contrat de sous-traitance conforme à l'article 20 de la LPDCP et à l'article 28 du RGPD, à ses partenaires commerciaux sur consentement exprès, et aux autorités publiques compétentes sur réquisition légale. Les données hébergées par Hostinger sont susceptibles d'être localisées au sein de l'Union européenne ; conformément aux articles 28 à 31 de la LPDCP et aux exigences du RGPD en matière de transferts internationaux, K-EMPIRE s'assure que ces transferts bénéficient d'un niveau de protection suffisant. Certains transferts vers l'espace CEDEAO peuvent intervenir dans le cadre de la prospection régionale, dans le respect de l'Acte additionnel A/SA.1/01/10.`,
      columns: false,
      hasList: false
    },
    {
      icon: Clock,
      title: "Article 8 - Durée de conservation",
      content: `Les données clients sont conservées pendant la durée de la relation contractuelle, augmentée du délai de prescription applicable en matière commerciale. Les données de prospection sont conservées trois ans à compter du dernier contact utile, les données de candidature deux ans après la décision de recrutement, et les cookies treize mois au maximum. À l'expiration de ces durées, les données sont supprimées de manière sécurisée ou anonymisées.`,
      columns: false,
      hasList: false
    },
    {
      icon: Shield,
      title: "Article 9 - Sécurité des données",
      content: `K-EMPIRE met en œuvre les mesures techniques et organizationnelles appropriées à la protection des données qui lui sont confiées : chiffrement des échanges et des données sensibles, authentification renforcée des accès administrateurs, sauvegardes régulières, tests de sécurité et sensibilisation du personnel habilité. En cas de violation de données susceptible d'engendrer un risque pour les droits et libertés des personnes concernées, K-EMPIRE s'engage à en informer l'Instance de Protection des Données à Caractère Personnel (IPDCP) et, le cas échéant, les personnes concernées, dans les meilleurs délais.`,
      columns: false,
      hasList: false
    },
    {
      icon: Eye,
      title: "Article 10 - Exercice des droits des personnes",
      content: `Toute personne concernée dispose d'un droit d'accès, de rectification, d'effacement, d'opposition, de portabilité et de limitation sur ses données, qu'elle peut exercer en adressant une demande écrite, accompagnée d'un justificatif d'identité, à contact@k-empirecorporation.com. K-EMPIRE y répond dans le délai d'un mois prévu à l'article 46 de la LPDCP et à l'article 12 du RGPD. L'exercice de ces droits est gratuit, sauf demande manifestement infondée ou excessive. Toute personne dispose également du droit d'introduire une réclamation auprès de l'IPDCP et, pour les résidents européens, auprès de l'autorité de contrôle compétente de l'Union européenne.`,
      columns: false,
      hasList: false
    },
    {
      icon: Lock,
      title: "Article 11 - Gestion des Cookies",
      content: `Le Site dépose des cookies essentiels à son fonctionnement, ainsi que, sous réserve du consentement de l'Utilisateur, des cookies de mesure d'audience et, le cas échéant, des cookies marketing. Lors de sa première visite, l'Utilisateur est informé par un bandeau lui permettant d'accepter, de refuser ou de paramétrer ces cookies, et de modifier son choix à tout moment. Aucun cookie non essentiel n'est déposé avant le recueil de ce consentement.`,
      columns: false,
      hasList: false
    },
    {
      icon: Scale,
      title: "Article 12 - Modification, droit applicable et juridiction",
      content: `K-EMPIRE peut modifier la présente Politique à tout moment, notamment pour se conformer à l'évolution du cadre légal applicable ; la date de mise à jour figurant en tête du présent document fait foi. La présente Politique est régie par le droit togolais, notamment la LPDCP, le RGPD pour les traitements concernant des résidents européens, la loi n°2017-007 relative aux transactions électroniques, l'Acte uniforme OHADA relatif au droit des sociétés commerciales (AUSCGIE) et l'Accord de Bangui (OAPI).

Tout différend né de l'interprétation ou de l'exécution de la présente Politique fait préalablement l'objet d'une tentative de résolution amiable entre les parties, engagée par notification écrite adressée à contact@k-empirecorporation.com. À défaut d'accord amiable dans un délai de trente (30) jours à compter de cette notification, le différend est soumis à la compétence exclusive des juridictions de Lomé. K-EMPIRE reconnaît par ailleurs la compétence de l'IPDCP pour veiller au respect de la réglementation applicable en matière de protection des données.`,
      columns: false,
      hasList: false
    }
  ];

  const faqItems = [
    {
      question: "Qu'est-ce qu'une donnée à caractère personnel ?",
      answer: "Toute information se rapportant à une personne physique identifiée ou identifiable, directement ou indirectement (nom, courriel, téléphone, adresse IP, etc.)."
    },
    {
      question: "K-EMPIRE vend-elle mes données ?",
      answer: "Non. Vos données ne sont jamais vendues. Elles ne sont partagées qu'avec les prestataires strictement nécessaires à la fourniture des services, dans le cadre de contrats conformes à la LPDCP."
    },
    {
      question: "Combien de temps mes données sont-elles conservées ?",
      answer: "Cela dépend de leur nature : durée du contrat augmentée du délai de prescription pour les données clients, trois ans pour les données de prospection, deux ans pour les candidatures, treize mois pour les cookies (voir Article 8)."
    },
    {
      question: "Comment mes données sont-elles sécurisées ?",
      answer: "Par un ensemble de mesures techniques et organizationnelles : chiffrement, authentification renforcée des accès, sauvegardes régulières et tests de sécurité (voir Article 9)."
    },
    {
      question: "Comment exercer mes droits ou demander la suppression de mes données ?",
      answer: "En écrivant à contact@k-empirecorporation.com, accompagné d'un justificatif d'identité. K-EMPIRE répond dans le délai d'un mois prévu par la LPDCP et le RGPD."
    },
    {
      question: "Comment me désabonner des communications commerciales ?",
      answer: "En utilisant le lien de désinscription figurant dans chaque communication, ou en écrivant à contact@k-empirecorporation.com."
    },
    {
      question: "Où mes données sont-elles stockées ?",
      answer: "Principalement au sein de l'Union européenne, chez notre hébergeur Hostinger. Certains transferts vers l'espace CEDEAO peuvent intervenir dans le cadre de la prospection régionale."
    },
    {
      question: "Qui contacter en cas de question ou de réclamation ?",
      answer: "K-EMPIRE à contact@k-empirecorporation.com, ou l'Instance de Protection des Données à Caractère Personnel (IPDCP) du Togo en cas de difficulté persistante. Pour les résidents européens, vous pouvez également adresser une réclamation à l'autorité de protection des données de votre État membre."
    },
    {
      question: "Le site est-il conforme au RGPD ?",
      answer: "Oui. K-EMPIRE applique les principes du RGPD (Règlement UE 2016/679) pour tous les traitements concernant des résidents de l'Union européenne : minimisation des données, limitation des finalités, sécurité renforcée, et respect des droits des personnes concernées."
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-h1-m md:text-h1-d text-primary font-semibold mb-6">
            Mentions Légales
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
            Mentions Légales, Politique de Protection des Données Personnelles et de Gestion des Cookies
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
                  <div className={`text-body text-text-muted leading-relaxed pl-0 md:pl-16 ${section.columns ? 'md:columns-2 md:gap-16' : ''}`}>
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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              Foire aux Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-[#F5F7FA] rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-base md:text-lg font-semibold text-primary mb-3">
                  {item.question}
                </h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
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
                  <a href="tel:+22898789531" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all">
                    <Phone className="w-5 h-5" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Last Update & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-small text-text-muted">
            Dernière mise à jour : 14 septembre 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LegalNoticesContent;
