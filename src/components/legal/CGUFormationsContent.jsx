import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Users, Building2, BookOpen, CreditCard, XCircle,
  Shield, Lock, Globe, Eye, Mail, Phone, ArrowRight, Scale,
  UserCheck, Briefcase, AlertTriangle, Clock
} from 'lucide-react';

const CGUFormationsContent = () => {
  const sections = [
    {
      icon: FileText,
      title: "Article 1 — Objet et champ d'application",
      content: `Les présentes Conditions Générales de Formation (ci-après les « CGF ») régissent l'ensemble des relations contractuelles entre la société K-EMPIRE CORPORATION SARL U (ci-après « K-EMPIRE »), prestataire de formation professionnelle, et les personnes physiques ou morales (ci-après les « Clients » ou « Participants ») qui souscrivent aux formations proposées par K-EMPIRE, que celles-ci soient dispensées en présentiel, en visioconférence ou en modalité hybride.

Les CGF s'appliquent sans réserve à toute commande de formation. Toute condition contraire, même mentionnée dans les documents du Client, est inopposable à K-EMPIRE sauf acceptation écrite et préalable de celle-ci.`,
      columns: false,
      hasList: false
    },
    {
      icon: Users,
      title: "Article 2 — Conditions particulières aux formations inter-entreprises",
      content: `Les formations inter-entreprises sont organisées par K-EMPIRE et ouvertes à tout professionnel ou organismes intéressé. Elles se déroulent dans les locaux désignés par K-EMPIRE ou en modalité visioconférence.

Les conditions suivantes s'appliquent spécifiquement à ces formations :`,
      columns: false,
      hasList: true,
      subSections: [
        {
          title: "Inscription et confirmation",
          content: `L'inscription est effective dès réception du formulaire de pré-inscription dûment complété et validé par K-EMPIRE. Une confirmation écrite est adressée au Participant dans un délai de cinq (5) jours ouvrés, accompagnée des modalités pratiques (lieu, horaires, programme détaillé).`
        },
        {
          title: "Nombre de Participants",
          content: `Le nombre de Participants par session est limité et précisé dans l'offre de formation. K-EMPIRE se réserve le droit de refuser ou de reporter un Participant si le nombre minimum requis n'est pas atteint, dans un délai de dix (10) jours ouvrés avant le début de la session.`
        },
        {
          title: "Prérequis",
          content: `Chaque formation peut comporter des prérequis techniques, linguistiques ou de niveau de qualification. Le Client est tenu de s'assurer que les Participants remplissent ces conditions avant l'inscription.`
        }
      ]
    },
    {
      icon: Building2,
      title: "Article 3 — Conditions particulières aux formations intra-entreprises",
      content: `Les formations intra-entreprises sont organisées à la demande du Client, dans les locaux de celui-ci ou dans un lieu convenu entre les parties. Elles sont exclusivement dédiées aux collaborateurs du Client.

Les conditions suivantes s'appliquent spécifiquement à ces formations :`,
      columns: false,
      hasList: true,
      subSections: [
        {
          title: "Définition du besoin et proposition",
          content: `Un diagnostic préalable est réalisé par K-EMPIRE afin d'identifier les besoins spécifiques du Client. Sur la base de ce diagnostic, K-EMPIRE établit une proposition de formation personnalisée précisant les objectifs pédagogiques, le programme, la durée, le nombre de Participants et le tarif.`
        },
        {
          title: "Adaptation du programme",
          content: `Le programme est adapté aux besoins spécifiques du Client. Toutefois, K-EMPIRE conserve la liberté pédagogique quant aux méthodes et supports utilisés, afin de garantir la qualité et la cohérence de la prestation.`
        },
        {
          title: "Validation préalable",
          content: `La formation est considérée comme validée par le Client dès la signature du bon de commande ou de la proposition commerciale. Toute modification substantielle du programme ou du nombre de Participants peut donner lieu à une révision du tarif.`
        }
      ]
    },
    {
      icon: BookOpen,
      title: "Article 4 — Dispositions communes à tous les types de formations",
      content: `Les dispositions suivantes s'appliquent indépendamment du type de formation choisi :`,
      columns: false,
      hasList: true,
      subSections: [
        {
          title: "Obligations de K-EMPIRE",
          content: `K-EMPIRE s'engage à dispenser la formation conformément au programme validé, à mettre à disposition des supports pédagogiques adaptés, à délivrer une attestation de formation à chaque Participant ayant suivi la session intégralement, et à respecter les horaires convenus.`
        },
        {
          title: "Obligations des Participants",
          content: `Les Participants s'engagent à participer activement aux sessions, à respecter le règlement intérieur communiqué en début de formation, à se conformer aux consignes de sécurité le cas échéant, et à signaler tout empêchement en amont.`
        },
        {
          title: "Évaluation et suivi",
          content: `Un questionnaire d'évaluation est distribué en fin de formation. Les résultats sont exploités par K-EMPIRE dans le seul but d'améliorer la qualité de ses prestations.`
        },
        {
          title: "Validation et certification",
          content: `L'attestation de formation est délivrée à l'issue de chaque session. Elle mentionne les objectifs, la durée, les dates et le nom du Participant. Cette attestation ne constitue pas un diplôme ni une certification au sens de la réglementation en vigueur, sauf mention contraire expresse.`
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Article 5 — Facturation et modalités de paiement",
      content: `Les formations sont facturées selon les modalités suivantes :`,
      columns: false,
      hasList: true,
      subSections: [
        {
          title: "Tarification",
          content: `Les tarifs sont exprimés en Francs CFA (FCFA) ou en Euros (EUR), toutes taxes comprises, sauf indication contraire. Ils incluent la prestation pédagogique, les supports de formation et, le cas échéant, les équipements mis à disposition. Les déplacements, hébergement et restauration ne sont pas inclus sauf accord écrit contraire.`
        },
        {
          title: "Facturation et échéancier",
          content: `Un acompte de trente pour cent (30%) du montant total est exigé à la confirmation de la commande. Le solde est facturé à l'issue de la formation. Un règlement par virement bancaire est attendu dans un délai de trente (30) jours à compter de la date de facture.`
        },
        {
          title: "Pénalités de retard",
          content: `Tout retard de paiement entraîne l'application de pénalités au taux de trois fois le taux d'intérêt légal en vigueur au Togo, ainsi qu'une indemnité forfaitaire de recouvrement de cinquante mille (50 000) FCFA.`
        },
        {
          title: "Contestation",
          content: `Toute contestation relative à une facture doit être adressée par écrit à K-EMPIRE dans un délai de dix (10) jours à compter de sa réception. Passé ce délai, la facture est réputée acceptée.`
        }
      ]
    },
    {
      icon: XCircle,
      title: "Article 6 — Annulation, report et désistement",
      content: `Les conditions d'annulation et de report varient selon le type de formation :`,
      columns: false,
      hasList: true,
      subSections: [
        {
          title: "Formations inter-entreprises",
          content: `Toute annulation par le Participant doit être notifiée par écrit. Si l'annulation intervient plus de vingt (20) jours ouvrés avant le début de la session, l'acompte versé est intégralement remboursé. Si l'annulation intervient entre dix (10) et vingt (20) jours ouvrés avant le début de la session, cinquante pour cent (50%) du montant total est retenu. Si l'annulation intervient moins de dix (10) jours ouvrés avant le début de la session, le montant total est dû intégralement.`
        },
        {
          title: "Formations intra-entreprises",
          content: `Toute annulation ou report doit faire l'objet d'un accord écrit entre les parties. En cas d'annulation par le Client moins de dix (10) jours ouvrés avant le début de la formation, le montant total est dû intégralement, sauf force majeure dûment justifiée.`
        },
        {
          title: "Report de session",
          content: `Le report d'une session est possible sous réserve de disponibilité et doit être demandé au moins cinq (5) jours ouvrés à l'avance. K-EMPIRE se réserve le droit de refuser un report et de proposer une date alternative dans un délai de trois (3) mois.`
        },
        {
          title: "Substitution de Participant",
          content: `Le Client peut substituer un Participant à tout moment, à condition de communiquer les informations du nouveau Participant au moins deux (2) jours ouvrés avant le début de la formation, sans incidence tarifaire.`
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Article 7 — Force majeure",
      content: `Aucune des parties ne saurait être tenue responsable de l'inexécution ou du retard dans l'exécution de ses obligations lorsque celui-ci résulte d'un événement de force majeure, au sens de l'article 1218 du Code civil togolais, y compris mais sans s'y limiter : catastrophe naturelle, épidémie, pandémie, conflit armé, decision administrative ou judiciaire, panne de réseau informatique indépendante de la volonté des parties, ou interruption des moyens de communication.

La partie affectée doit en informer l'autre partie dans les meilleurs délais et mettre en œuvre tous les moyens raisonnables pour limiter les conséquences de l'événement. Si l'événement de force majeure persiste pendant une période supérieure à trente (30) jours, chaque partie pourra résilier le contrat de droit et sans formalité, sans indemnité, et les sommes versées seront remboursées dans un délai de trente (30) jours.`,
      columns: false,
      hasList: false
    },
    {
      icon: Shield,
      title: "Article 8 — Propriété intellectuelle",
      content: `L'ensemble des supports de formation (supports de cours, exercices, études de cas, vidéos, logiciels, bases de données, et tout autre document ou outil pédagogique) est la propriété exclusive de K-EMPIRE ou de ses concédants et est protégé par le droit d'auteur, l'Accord de Bangui (OAPI) et les conventions internationales.

Le Client et les Participants s'engagent à ne pas reproduire, copier, diffuser, modifier ou exploiter ces supports à des fins autres que la formation interne de l'entreprise, sans l'autorisation écrite préalable de K-EMPIRE. Toute contrefaçon ou utilization non autorisée pourra donner lieu à des poursuites judiciaires.

Les enregistrements audio ou vidéo des sessions de formation sont strictement interdits, sauf autorisation expresse et écrite de K-EMPIRE.`,
      columns: false,
      hasList: false
    },
    {
      icon: Lock,
      title: "Article 9 — Confidentialité et secret professionnel",
      content: `Chaque partie s'engage à considérer comme strictement confidentiels tous les informations, documents, données et contenus auxquels elle accède dans le cadre de l'exécution du contrat de formation, et à ne pas les divulguer à des tiers sans l'accord écrit préalable de l'autre partie.

K-EMPIRE s'engage en particulier à ne pas divulguer les informations stratégiques, organisationnelles ou techniques du Client auxquelles elle pourrait avoir accès durant la formation, conformément à l'article 226-13 du Code pénal togolais.

Cette obligation de confidentialité survit à la résiliation ou à l'expiration du contrat de formation pour une durée de cinq (5) ans.`,
      columns: false,
      hasList: false
    },
    {
      icon: Globe,
      title: "Article 10 — Communication et diffusion de contenus",
      content: `K-EMPIRE peut, à des fins de communication et de valorisation de ses activités, utiliser les informations non confidentielles relatives à la relation commerciale avec le Client, sous réserve du consentement préalable écrit de celui-ci.

Le Client autorise expressément K-EMPIRE à :
  • Réaliser des photographies ou des enregistrements vidéo lors des sessions de formation, à des fins de communication institutionnelle et de promotion de ses activités ;
  • Diffuser lesdits supports sur son site internet, ses réseaux sociaux, ses publications professionnelles et ses supports de communication, sans limitation géographique ni temporelle ;
  • Mentionner le nom commercial du Client, son logo et la nature des prestations réalisées dans le cadre de ses références clients.

Le Client peut à tout moment retirer son consentement en notifiant sa décision par écrit à K-EMPIRE. Le retrait de consentement n'a pas d'effet rétroactif sur les contenus déjà diffusés.`,
      columns: false,
      hasList: false
    },
    {
      icon: Eye,
      title: "Article 11 — Protection des données à caractère personnel",
      content: `K-EMPIRE collecte et traite les données à caractère personnel des Participants (nom, prénom, adresse courriel, fonction, photo de profil) aux seules fins d'exécution du contrat de formation, de gestion administrative, de délivrance des attestations et, le cas échéant, de communication institutionnelle conformément à l'article 10.

Ce traitement repose sur l'exécution du contrat, le consentement de la personne concernée et la légitimité de l'intérêt de K-EMPIRE. Les données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la loi n°2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République togolaise (LPDCP) et au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) pour les résidents européens.

Les données ne sont transmises qu'aux prestataires techniques liés par contrat de sous-traitance conforme à l'article 20 de la LPDCP. Chaque Participant dispose d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de ses données, qu'il peut exercer en écrivant à contact@k-empirecorporation.com.`,
      columns: false,
      hasList: false
    },
    {
      icon: UserCheck,
      title: "Article 12 — Exigences linguistiques et qualité de prestation",
      content: `Les formations sont dispensées en français, en anglais ou dans toute autre langue convenue entre les parties. K-EMPIRE s'engage à mettre à disposition des formateurs qualifiés et disposant d'une expertise reconnue dans le domaine concerné.

En cas de prestation en langue étrangère, des supports complémentaires (glossaires, traductions, sous-titrages) peuvent être fournis sur demande, sans surcoût, sous réserve de délai raisonnable. Le Client est seul responsable du niveau de compréhension linguistique de ses Participants.

K-EMPIRE se réserve le droit de suspendre ou d'interrompre une session de formation si un Participant se rend coupable de comportement inapproprié, de perturbation de l'ordre ou de manquement grave au règlement intérieur, sans remboursement.`,
      columns: false,
      hasList: false
    },
    {
      icon: Scale,
      title: "Article 13 — Droit applicable et résolution des litiges",
      content: `Les présentes CGF sont régies par le droit togolais, notamment le Code civil, le Code de commerce, la loi n°2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel (LPDCP), le RGPD (Règlement UE 2016/679) pour les traitements concernant des résidents européens, et l'Acte uniforme OHADA relatif au droit des sociétés commerciales (AUSCGIE).

Tout litige né de l'interprétation ou de l'exécution des présentes CGF fera l'objet d'une tentative de résolution amiable entre les parties. À défaut d'accord amiable dans un délai de trente (30) jours à compter de la notification écrite du litige, celui-ci sera soumis à la compétence exclusive des juridictions compétentes de Lomé, République du Togo.

Dernière mise à jour : 16 septembre 2026.`,
      columns: false,
      hasList: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
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
            Conditions Générales de Formation
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mx-auto">
            Dispositions applicables à l'ensemble des formations dispensées par K-EMPIRE CORPORATION
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

                    {section.subSections && section.subSections.map((sub, subIndex) => (
                      <div key={subIndex} className="mb-6">
                        <h3 className="text-base font-semibold text-primary mb-3">{sub.title}</h3>
                        <p className="text-justify">{sub.content}</p>
                      </div>
                    ))}
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
                  Des questions sur nos conditions de formation ?
                </h3>
                <p className="text-white/70 mb-6">
                  Notre équipe est disponible pour répondre à toutes vos interrogations.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                  <a href="mailto:contact@k-empirecorporation.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-accent hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                    <span>Nous écrire</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="tel:+22890108075" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all">
                    <Phone className="w-5 h-5" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CGUFormationsContent;
