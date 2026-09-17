import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Users, Building2, BookOpen, CreditCard, XCircle,
  Shield, Lock, Globe, Eye, Mail, Phone, ArrowRight, Scale,
  UserCheck, Briefcase, AlertTriangle, Clock, Handshake, AlertCircle
} from 'lucide-react';

const CGUFormationsContent = () => {
  const sections = [
    {
      icon: FileText,
      title: "Préambule",
      content: `K-EMPIRE CORPORATION, cabinet de conseil, d'audit et de formations professionnelles certifiantes, est une société à responsabilité limitée unipersonnelle de droit togolais au capital d'un million (1 000 000) de francs CFA, dont le siège social est établi au quartier Dongoyo à Kara, en République togolaise, immatriculée au registre du commerce et du crédit mobilier de Lomé sous le numéro TG-LRL-01-2024-B13-00035. Le cabinet est représenté par Monsieur KOUDADJE Kouami Emmanuel, gérant associé, habilité à l'engager.

Contact : +228 98 78 95 31 et +228 90 10 80 75 — contact@k-empirecorporation.com et k.empirecorporation@gmail.com.

Objet et champ d'application. Les présentes conditions générales de formation, ci-après « les Conditions générales », s'appliquent à toutes les offres de formation de K-EMPIRE CORPORATION, qu'elles soient inter-entreprises ou intra-entreprises, réalisées en présentiel ou en ligne.

Définition. « Le Client » désigne indifféremment toute personne physique ou morale qui commande une formation à K-EMPIRE CORPORATION. Le terme est employé au masculin par simple convention de rédaction. « Les participants » désigne les personnes physiques qui suivent la formation.

Documents contractuels et ordre de priorité. La relation contractuelle est régie par les documents suivants. En cas de contradiction entre eux, ils prévalent dans l'ordre décroissant ci-après :
• la proposition commerciale et technique signée des deux parties ;
• le bon de commande ou le bulletin d'inscription signé par le Client ;
• les présentes Conditions générales.

Acceptation. En passant commande, le Client accepte sans réserve l'intégralité des présentes Conditions générales. Toute condition particulière ou contraire émise par le Client est inopposable à K-EMPIRE CORPORATION, sauf acceptation expresse et écrite de cette dernière. Le fait pour K-EMPIRE CORPORATION de ne pas se prévaloir à un moment donné de l'une des stipulations des présentes Conditions générales ne peut être interprété comme une renonciation à s'en prévaloir ultérieurement.

Devoir d'information. Avant toute commande, le Client reconnaît avoir reçu de la part de K-EMPIRE CORPORATION toutes les informations et tous les conseils nécessaires pour évaluer l'adéquation de l'offre de services à ses besoins.

Modification et versions. K-EMPIRE CORPORATION peut modifier ou mettre à jour les présentes Conditions générales. Les Conditions générales applicables sont celles en vigueur à la date de la commande ; les modifications n'affectent ni les contrats en cours, ni les offres déjà acceptées. Chaque version est identifiée par son numéro et sa date d'entrée en vigueur. Les versions successives sont archivées et disponibles sur le site www.k-empirecorporation.com.`
    },
    {
      icon: BookOpen,
      title: "1. FORMATION",
      content: null,
      subSections: [
        {
          title: "1.1. FORMATIONS INTER-ENTREPRISES",
          content: null,
          subSubSections: [
            {
              title: "1.1.1. Descriptif",
              content: `Les formations inter-entreprises proposées par K-EMPIRE CORPORATION sont disponibles à la fois en présentiel, dans les locaux de K-EMPIRE CORPORATION ou dans des lieux adaptés mis à disposition, et en ligne via une plateforme numérique dédiée. Ces formations, issues du catalogue officiel, sont conçues pour répondre aux besoins des participants grâce à une approche flexible et adaptée.`
            },
            {
              title: "1.1.2. Conditions financières",
              content: `Le bulletin d'inscription, dûment complété, signé par le responsable de l'entité Cliente ou tout représentant habilité, cacheté et transmis à K-EMPIRE CORPORATION, fait office de bon de commande ferme. Le règlement du prix de la formation est effectué à l'ordre de K-EMPIRE CORPORATION, au plus tard dix (10) jours avant le début de la session, dans les conditions de l'article 2.10.3.

Les tarifs comprennent :
• pour les formations en présentiel, les pauses café, les déjeuners et la documentation, à l'exclusion des frais de transport, d'hébergement et de dîner, qui demeurent à la charge des participants ;
• pour les formations en ligne, l'accès à la plateforme, les supports numériques et l'assistance technique définie à l'article 2.2.2.

K-EMPIRE CORPORATION peut réviser ses tarifs en cas de variation des coûts externes entrant dans la composition du prix, notamment les coûts de déplacement, d'hébergement, de restauration, de location de salle, de licences et d'hébergement de plateforme, dès lors que cette variation atteint dix pour cent (10 %). La révision est notifiée par écrit au Client au moins trente (30) jours avant son entrée en vigueur. Elle ne s'applique ni aux sessions déjà commandées, ni aux offres déjà acceptées.`
            },
            {
              title: "1.1.3. Remplacement d'un participant",
              content: `Un participant empêché peut être remplacé par une autre personne ayant le même profil et des besoins similaires, sur notification préalable adressée à K-EMPIRE CORPORATION dans les conditions de l'article 2.18.`
            },
            {
              title: "1.1.4. Effectif minimum",
              content: `Chaque session inter-entreprises est ouverte sous réserve d'un effectif minimum, indiqué sur la fiche de la session ou sur le programme. À défaut d'indication, cet effectif minimum est de vingt-cinq (25) participants.

Si l'effectif minimum n'est pas atteint, K-EMPIRE CORPORATION peut reporter la session dans les conditions de l'article 2.8.`
            },
            {
              title: "1.1.5. Remise relative au nombre de participants",
              content: `Lorsqu'un Client inscrit plus de cinq (5) personnes à une même formation, qu'elle soit en présentiel ou en ligne, il bénéficie d'une remise de dix pour cent (10 %) sur le montant total dû.`
            }
          ]
        },
        {
          title: "1.2. FORMATIONS INTRA-ENTREPRISE",
          content: null,
          subSubSections: [
            {
              title: "1.2.1. Description",
              content: `Les formations intra-entreprises proposées par K-EMPIRE CORPORATION sont conçues sur mesure pour répondre aux besoins spécifiques du Client. Elles peuvent être réalisées :
• en présentiel, dans les locaux de K-EMPIRE CORPORATION, dans ceux du Client, ou dans des locaux mis à disposition par l'une ou l'autre des parties après accord préalable ;
• en ligne, via une plateforme dédiée, offrant flexibilité et accessibilité tout en maintenant les standards de qualité et d'interactivité.

Le contenu, le format et les modalités d'exécution sont établis en concertation avec le Client et conformément aux termes de la proposition commerciale et technique de K-EMPIRE CORPORATION. Le Client s'engage à fournir à K-EMPIRE CORPORATION toutes les informations nécessaires à l'élaboration d'un programme sur mesure, notamment les objectifs spécifiques, le profil des participants et toute contrainte opérationnelle particulière. Tout retard dans la transmission de ces informations pourra entraîner un report des échéances convenues sans indemnité pour le Client.`
            },
            {
              title: "1.2.2. Proposition commerciale et validation",
              content: `Toute formation intra-entreprise, qu'elle soit en présentiel ou en ligne, fait l'objet d'une proposition commerciale et financière écrite, précisant les coûts, les modalités d'exécution et les délais. La formation est réputée acceptée à réception, par K-EMPIRE CORPORATION, de la proposition signée par un représentant dûment habilité du Client.`
            },
            {
              title: "1.2.3. Acompte",
              content: `Sauf disposition contraire expressément mentionnée dans la proposition, le Client verse un acompte minimum de cinquante pour cent (50 %) du montant total de la formation lors de l'acceptation de l'offre. Ce paiement conditionne la réservation des dates, le démarrage des préparatifs de la formation et, le cas échéant, l'accès aux ressources en ligne.`
            },
            {
              title: "1.2.4. Règlement du solde",
              content: `Le solde est réglé de telle sorte que le montant total soit acquitté au plus tard dix (10) jours avant le début de la formation, dans les conditions de l'article 2.10.3.`
            },
            {
              title: "1.2.5. Modalités de paiement",
              content: `Les paiements peuvent être effectués par chèque, virement bancaire, règlement domicilié ou tout autre mode convenu. Les frais bancaires ou de transaction restent à la charge exclusive du Client.`
            },
            {
              title: "1.2.6. Pénalités de retard",
              content: `En cas de retard de paiement, les articles 2.10.6 à 2.10.9 s'appliquent.`
            },
            {
              title: "1.2.7. Annulation ou modification",
              content: `Toute annulation ou modification de la commande par le Client est notifiée par écrit à K-EMPIRE CORPORATION dans les conditions de l'article 2.18. Les indemnités applicables sont celles de l'article 2.7.7.`
            },
            {
              title: "1.2.8. Accessibilité pour les formations en ligne",
              content: `Pour les formations en ligne, K-EMPIRE CORPORATION garantit l'accès aux plateformes dédiées dès le paiement de l'acompte, dans les conditions de l'article 2.2. Le Client s'engage à fournir les informations nécessaires à l'inscription des participants dans les délais impartis.`
            }
          ]
        }
      ]
    },
    {
      icon: Building2,
      title: "2. DISPOSITIONS COMMUNES AUX FORMATIONS",
      content: null,
      subSections: [
        {
          title: "2.1. Nature des obligations de K-EMPIRE CORPORATION",
          content: null,
          subSubSections: [
            {
              title: "2.1.1. Obligations de résultat",
              content: `K-EMPIRE CORPORATION s'oblige à un résultat quant à la tenue de la session aux dates convenues, sous réserve des articles 2.7, 2.8 et 2.13, quant à la conformité de la session au programme annoncé, quant à la mise à disposition des supports pédagogiques et quant à la délivrance des attestations prévues à l'article 2.5.`
            },
            {
              title: "2.1.2. Obligations de moyens",
              content: `K-EMPIRE CORPORATION met en œuvre les moyens pédagogiques, humains et matériels appropriés à l'atteinte des objectifs annoncés. Elle ne garantit ni le niveau atteint par chaque participant, ni l'acquisition d'une compétence déterminée, ni les résultats professionnels, commerciaux ou opérationnels que le Client entend retirer de la formation.`
            },
            {
              title: "2.1.3. Adaptations pédagogiques",
              content: `Les adaptations apportées en cours de session à l'ordre des séquences, aux méthodes ou aux illustrations retenues ne constituent pas une inexécution dès lors que les objectifs pédagogiques annoncés sont poursuivis.`
            }
          ]
        },
        {
          title: "2.2. Exécution des formations en ligne",
          content: null,
          subSubSections: [
            {
              title: "2.2.1. Prérequis techniques",
              content: `La participation à une formation en ligne suppose que chaque participant dispose d'une connexion internet suffisante, d'un équipement compatible, d'un navigateur à jour et d'un environnement permettant de suivre la session. Ces prérequis, communiqués avant la session, sont à la charge exclusive du Client.`
            },
            {
              title: "2.2.2. Portée de l'assistance technique",
              content: `L'assistance technique incluse dans le tarif est limitée à l'accès à la plateforme et à son fonctionnement, pendant les heures de session. Elle ne couvre ni les équipements, ni les réseaux, ni les logiciels du Client ou des participants.

Une défaillance imputable au Client, à un participant ou à leur environnement technique ne donne droit ni à remboursement, ni à report, ni à session de rattrapage.`
            },
            {
              title: "2.2.3. Enregistrement et accès",
              content: `Le Client et les participants s'interdisent tout enregistrement audio, vidéo ou photographique des sessions, toute capture d'écran des contenus diffusés, toute retransmission ou diffusion, en direct ou en différé, ainsi que toute communication ou partage des identifiants de connexion, lesquels sont strictement personnels.

Cette interdiction s'applique aux formations en présentiel comme aux formations en ligne. Tout manquement autorise l'exclusion immédiate prévue à l'article 2.3.2, sans préjudice de l'article 2.14.5.`
            },
            {
              title: "2.2.4. Durée d'accès",
              content: `L'accès à la plateforme et aux supports numériques est ouvert pour une durée d'un (1) an à compter de la fin de la session. À l'expiration de ce délai, la mise à disposition prend fin de plein droit.`
            }
          ]
        },
        {
          title: "2.3. Déroulement des sessions",
          content: null,
          subSubSections: [
            {
              title: "2.3.1. Règles applicables aux participants",
              content: `Les participants respectent les règles de fonctionnement du lieu d'accueil ou de la plateforme, les horaires annoncés et les consignes de sécurité qui leur sont communiquées.`
            },
            {
              title: "2.3.2. Exclusion d'un participant",
              content: `K-EMPIRE CORPORATION peut exclure immédiatement d'une session tout participant dont le comportement perturbe gravement son déroulement, porte atteinte à la sécurité des personnes ou méconnaît l'article 2.2.3. Le Client en est informé par écrit. L'exclusion n'ouvre droit à aucun remboursement ni à aucune indemnité.`
            }
          ]
        },
        {
          title: "2.4. Intervenants",
          content: null,
          subSubSections: [
            {
              title: "2.4.1. Substitution d'intervenant",
              content: `K-EMPIRE CORPORATION se réserve la faculté de substituer à tout intervenant annoncé un intervenant de qualification et d'expérience équivalentes. Cette substitution ne constitue pas une modification du contrat et n'ouvre droit ni à annulation, ni à réduction de prix, ni à indemnité.`
            },
            {
              title: "2.4.2. Non-sollicitation des intervenants",
              content: `Pendant l'exécution du contrat et pendant vingt-quatre (24) mois à compter de la dernière prestation, le Client s'interdit de solliciter, d'engager ou de faire intervenir, directement ou par personne interposée, tout intervenant présenté par K-EMPIRE CORPORATION à l'occasion d'une formation, en vue de prestations de même nature, sans l'accord écrit préalable de K-EMPIRE CORPORATION.

En cas de manquement, le Client verse une indemnité forfaitaire égale à cinq (5) fois le montant hors taxes de la dernière prestation à laquelle l'intervenant concerné a participé.

La présente stipulation ne fait obstacle ni à un recrutement résultant d'une candidature spontanée non sollicitée, ni à la poursuite d'une relation antérieure dont le Client justifie.`
            }
          ]
        },
        {
          title: "2.5. Documents délivrés",
          content: null,
          subSubSections: [
            {
              title: "2.5.1. Nature des documents",
              content: `Selon le programme suivi et son positionnement, K-EMPIRE CORPORATION délivre à chaque participant, à l'issue de la formation réalisée en présentiel ou en ligne, l'un des documents suivants :
• une attestation ou un certificat de participation ;
• un certificat de compétences ;
• un certificat exécutif.

Le document délivré est celui indiqué sur la fiche de la session, sur le programme ou dans la proposition commerciale.`
            },
            {
              title: "2.5.2. Conditions de délivrance",
              content: `La délivrance d'un certificat de compétences ou d'un certificat exécutif est subordonnée à l'assiduité du participant et, lorsque le programme le prévoit, à la satisfaction des modalités d'évaluation qui y sont décrites. À défaut, une attestation de participation est délivrée.`
            },
            {
              title: "2.5.3. Attestation de présence",
              content: `Une attestation de présence peut être fournie à chaque partie, Client ou organisme financeur, sur demande écrite préalable adressée à K-EMPIRE CORPORATION.`
            }
          ]
        },
        {
          title: "2.6. Règlement par un organisme de financement de la formation continue",
          content: null,
          subSubSections: [
            {
              title: "2.6.1. Demande préalable de prise en charge",
              content: `Le Client est responsable d'effectuer la demande de prise en charge auprès de l'organisme financeur avant le début de la formation. L'accord de financement obtenu doit être communiqué à K-EMPIRE CORPORATION au moment de l'inscription, accompagné de la convention de formation signée.`
            },
            {
              title: "2.6.2. Prise en charge partielle",
              content: `En cas de prise en charge partielle par l'organisme, le Client s'engage à régler la différence directement à K-EMPIRE CORPORATION dans les délais impartis, conformément aux modalités de paiement définies dans la convention de formation.`
            },
            {
              title: "2.6.3. Absence d'accord de financement",
              content: `Si l'accord de prise en charge ne parvient pas à K-EMPIRE CORPORATION au plus tard le premier jour de la formation, sauf accord contraire, la totalité des frais de formation est facturée au Client, indépendamment des démarches entreprises auprès de l'organisme financeur.`
            },
            {
              title: "2.6.4. Défaillance de l'organisme financeur",
              content: `Le Client s'assure que l'organisme financeur procède au règlement des sommes dues dans les délais convenus. À défaut, K-EMPIRE CORPORATION peut exiger le paiement intégral des frais directement auprès du Client, sans préjudice des éventuels recours exercés par le Client auprès de l'organisme financeur.`
            }
          ]
        },
        {
          title: "2.7. Annulation et report à l'initiative du Client",
          content: null,
          subSubSections: [
            {
              title: "2.7.1. Fixation des dates",
              content: `Les dates de formation sont déterminées d'un commun accord entre K-EMPIRE CORPORATION et le Client, puis confirmées par écrit. Une fois validées, elles sont fermes et engageantes pour les deux parties.`
            },
            {
              title: "2.7.2. Notification préalable",
              content: `Toute demande d'annulation ou de report d'une session déjà planifiée est communiquée par écrit à K-EMPIRE CORPORATION, dans les conditions de l'article 2.18, au moins quinze (15) jours ouvrés avant la date prévue de la session.`
            },
            {
              title: "2.7.3. Force majeure et raison médicale",
              content: `Aucune indemnité n'est due en cas d'annulation ou de report résultant d'un cas de force majeure au sens de l'article 2.13, ou d'une raison médicale dûment justifiée.`
            },
            {
              title: "2.7.4. Justificatifs requis",
              content: `Le Client fournit à K-EMPIRE CORPORATION un document officiel en cas de force majeure, ou un certificat médical en cas de raison médicale, dans un délai maximum de cinq (5) jours calendaires.`
            },
            {
              title: "2.7.5. Conséquences du non-respect des obligations",
              content: `À défaut de respecter les délais ou de fournir les justificatifs, le Client est tenu au paiement des indemnités d'annulation ou de report prévues à l'article 2.7.7.`
            },
            {
              title: "2.7.6. Engagement collaboratif",
              content: `K-EMPIRE CORPORATION s'engage à examiner de bonne foi toute demande d'annulation ou de report et à proposer, dans la mesure du possible, une reprogrammation de la session à une date ultérieure convenant aux deux parties.`
            },
            {
              title: "2.7.7. Indemnités applicables",
              content: `Les indemnités suivantes sont calculées sur les honoraires de la session concernée :
• annulation notifiée plus de quinze (15) jours ouvrés avant la session : sans frais ;
• annulation notifiée entre quinze (15) et huit (8) jours ouvrés avant la session : vingt pour cent (20 %) ;
• annulation notifiée entre sept (7) jours ouvrés et quarante-huit (48) heures avant la session : trente pour cent (30 %) ;
• annulation notifiée moins de quarante-huit (48) heures avant la session, ou non-présentation sans notification écrite : cent pour cent (100 %).

Le report est soumis au même barème que l'annulation. Lorsque les parties conviennent par écrit d'une nouvelle date située dans les trente (30) jours suivant la date initiale, l'indemnité applicable est réduite de moitié.`
            },
            {
              title: "2.7.8. Modification par accord mutuel",
              content: `Toute modification des dispositions du présent article peut être envisagée sous réserve d'un accord écrit préalable entre K-EMPIRE CORPORATION et le Client.`
            }
          ]
        },
        {
          title: "2.8. Annulation et report à l'initiative de K-EMPIRE CORPORATION",
          content: null,
          subSubSections: [
            {
              title: "2.8.1. Cas d'ouverture",
              content: `K-EMPIRE CORPORATION peut reporter ou annuler une session en cas d'effectif insuffisant au sens de l'article 1.1.4, de survenance d'un cas de force majeure au sens de l'article 2.13, d'indisponibilité d'un intervenant à laquelle la substitution prévue à l'article 2.4.1 ne permet pas de remédier, ou de circonstance affectant la sécurité des personnes.`
            },
            {
              title: "2.8.2. Délai de notification",
              content: `La décision est notifiée par écrit au Client au plus tard sept (7) jours calendaires avant la date prévue de la session, sauf lorsque la cause survient postérieurement, auquel cas la notification intervient sans délai.`
            },
            {
              title: "2.8.3. Priorité au report",
              content: `K-EMPIRE CORPORATION propose en priorité une nouvelle date, située dans les soixante (60) jours suivant la date initialement prévue.`
            },
            {
              title: "2.8.4. Remboursement",
              content: `À défaut d'accord des parties sur une nouvelle date, K-EMPIRE CORPORATION rembourse au Client, dans les trente (30) jours, les sommes versées au titre de la session annulée.`
            },
            {
              title: "2.8.5. Limitation",
              content: `Ce remboursement constitue la seule indemnisation due au Client au titre de l'annulation ou du report, à l'exclusion de tout autre préjudice, notamment les frais de transport, d'hébergement ou de restauration, l'immobilisation de personnel, la perte d'exploitation et la perte de chance.`
            }
          ]
        },
        {
          title: "2.9. Modalités de passation des commandes",
          content: null,
          subSubSections: [
            {
              title: "2.9.1. Durée de validité de l'offre",
              content: `Les propositions et prix indiqués par K-EMPIRE CORPORATION sont valables pendant une durée de trente (30) jours calendaires à compter de la date de soumission de l'offre au Client.`
            },
            {
              title: "2.9.2. Acceptation de l'offre",
              content: `L'offre de formation est réputée acceptée dès réception, par K-EMPIRE CORPORATION, d'un bon de commande ou d'un bulletin d'inscription dûment complété, signé et daté par un représentant légal ou tout autre mandataire habilité du Client.`
            },
            {
              title: "2.9.3. Acceptation des Conditions générales",
              content: `La signature du bon de commande ou du bulletin d'inscription, ou tout accord exprès donné par le Client, emporte acceptation irrévocable et sans réserve des présentes Conditions générales, dans l'ordre de priorité défini au préambule.`
            },
            {
              title: "2.9.4. Modification des Conditions générales",
              content: `K-EMPIRE CORPORATION peut modifier les présentes Conditions générales. Les modifications s'appliquent exclusivement aux contrats conclus après la publication des nouvelles conditions et n'affectent en aucun cas les contrats en cours ou les offres déjà acceptées.`
            }
          ]
        },
        {
          title: "2.10. Facturation et règlement",
          content: null,
          subSubSections: [
            {
              title: "2.10.1. Expression des prix et taxes",
              content: `Tous les prix sont exprimés en francs CFA (XOF). K-EMPIRE CORPORATION ne facture pas de taxe sur la valeur ajoutée. Toute taxe qui viendrait à être légalement exigible serait facturée en sus, au taux en vigueur à la date de facturation.

Le Client demeure exclusivement responsable des taxes locales, droits de douane et autres prélèvements éventuellement applicables dans son pays ou dans sa juridiction.`
            },
            {
              title: "2.10.2. Frais bancaires et de transaction",
              content: `Tous les frais bancaires, frais de transaction ou coûts associés au mode de paiement choisi par le Client sont entièrement à la charge de ce dernier.`
            },
            {
              title: "2.10.3. Modalités générales de paiement",
              content: `Quelle que soit la formation concernée, inter-entreprises ou intra-entreprises, en présentiel ou en ligne, le règlement du montant total dû par le Client est effectué au plus tard dix (10) jours avant le début de la formation. Cette règle s'applique sans préjudice de l'acompte prévu à l'article 1.2.3, qui conditionne la réservation des dates.`
            },
            {
              title: "2.10.4. Moyens de paiement",
              content: `• chèque bancaire émis par une banque située sur le territoire national ;
• virement bancaire ;
• transfert monétaire, les frais de transaction étant intégralement à la charge du Client.`
            },
            {
              title: "2.10.5. Escompte",
              content: `Aucun escompte n'est accordé en cas de paiement anticipé, sauf mention expresse sur la facture.`
            },
            {
              title: "2.10.6. Retard de paiement",
              content: `Toute somme non payée à l'échéance convenue entraîne, de plein droit et sans mise en demeure préalable, l'exigibilité de pénalités de retard calculées au taux de un et demi pour cent (1,5 %) par mois de retard.

Les pénalités courent à compter du jour suivant la date d'exigibilité et jusqu'au complet paiement, tout mois commencé étant décompté au prorata des jours écoulés.`
            },
            {
              title: "2.10.7. Indemnité de recouvrement",
              content: `Une indemnité forfaitaire de vingt-cinq mille (25 000) francs CFA pour frais de recouvrement est due pour chaque échéance impayée. Lorsque les frais de recouvrement réellement exposés par K-EMPIRE CORPORATION dépassent ce montant, une indemnité complémentaire peut être réclamée sur présentation des justificatifs.`
            },
            {
              title: "2.10.8. Suspension des prestations",
              content: `K-EMPIRE CORPORATION peut suspendre toute prestation ou commande en cours en cas de retard de paiement, sans préjudice des autres voies de recours disponibles.`
            },
            {
              title: "2.10.9. Recouvrement contentieux",
              content: `Tout défaut de paiement persistant malgré les relances de K-EMPIRE CORPORATION peut donner lieu aux procédures prévues à l'article 2.19.4, les frais afférents étant à la charge du Client.`
            }
          ]
        },
        {
          title: "2.11. Satisfaction du Client et amélioration continue",
          content: null,
          subSubSections: [
            {
              title: "2.11.1. Suivi qualité des prestations",
              content: `Afin de garantir un haut niveau de qualité dans ses prestations, K-EMPIRE CORPORATION met en place des outils d'évaluation systématique de la satisfaction des participants à l'issue de chaque formation. Les retours obtenus sont utilisés pour améliorer l'offre pédagogique.

Le Client peut soumettre toute réclamation par écrit à l'adresse contact@k-empirecorporation.com. Toute réclamation est traitée dans un délai de cinq (5) jours ouvrables suivant sa réception.`
            }
          ]
        },
        {
          title: "2.12. Limitation de responsabilité",
          content: null,
          subSubSections: [
            {
              title: "2.12.1. Responsabilité limitée aux dommages directs",
              content: `K-EMPIRE CORPORATION ne peut être tenue responsable qu'au titre des dommages directs subis par le Client, à condition que ces derniers soient dûment prouvés et résultent d'une faute ou d'une inexécution qui lui est imputable dans le cadre de l'exécution de ses obligations contractuelles, appréciées conformément à l'article 2.1.`
            },
            {
              title: "2.12.2. Plafonnement de la responsabilité",
              content: `La responsabilité globale de K-EMPIRE CORPORATION, toutes causes confondues, est limitée au montant total effectivement payé par le Client pour la formation concernée.`
            },
            {
              title: "2.12.3. Exclusion des dommages indirects",
              content: `K-EMPIRE CORPORATION ne saurait être tenue responsable des dommages indirects, incluant, sans que cette liste soit exhaustive :
• la perte de données ou de fichiers ;
• la perte d'exploitation ;
• le préjudice commercial ;
• le manque à gagner ;
• l'atteinte à l'image ou à la réputation.`
            },
            {
              title: "2.12.4. Réserve",
              content: `Les limitations et exclusions prévues au présent article ne s'appliquent pas en cas de faute lourde ou dolosive de K-EMPIRE CORPORATION, ni dans les cas où la loi les écarte.`
            },
            {
              title: "2.12.5. Obligation d'information du Client",
              content: `Le Client s'engage à informer K-EMPIRE CORPORATION, dans les conditions de l'article 2.18, de tout dommage dont il pourrait demander réparation, afin de permettre une gestion rapide et efficace de la situation.`
            }
          ]
        },
        {
          title: "2.13. Force majeure",
          content: null,
          subSubSections: [
            {
              title: "2.13.1. Définition",
              content: `Aucune des parties ne peut être tenue responsable envers l'autre de l'inexécution totale ou partielle de ses obligations contractuelles lorsque cette inexécution résulte d'un cas de force majeure ou d'un cas fortuit.

Constituent des cas de force majeure ou cas fortuits, outre ceux habituellement reconnus par la jurisprudence des juridictions compétentes, et sans que cette liste soit exhaustive :
• les grèves ou conflits sociaux internes ou externes à K-EMPIRE CORPORATION ;
• les désastres naturels, notamment inondations, tempêtes et tremblements de terre ;
• les incendies ;
• la non-obtention de visas, autorisations de travail ou autres permis nécessaires ;
• la promulgation de nouvelles lois ou de nouveaux règlements postérieurs à la conclusion du contrat ;
• l'interruption des télécommunications ou des approvisionnements en énergie ;
• l'interruption des communications ou des transports de tout type ;
• tout autre événement échappant au contrôle raisonnable de la partie affectée.

L'indisponibilité d'un intervenant ne constitue un cas de force majeure que lorsque la substitution prévue à l'article 2.4.1 se révèle impossible.`
            },
            {
              title: "2.13.2. Procédure",
              content: `La partie affectée par un cas de force majeure s'engage à informer l'autre partie de la survenance de l'événement dans un délai de cinq (5) jours ouvrables à compter de sa connaissance, dans les conditions de l'article 2.18, puis à fournir, dans un délai de dix (10) jours ouvrables suivant cette notification, les justificatifs attestant de la réalité et des conséquences de l'événement.`
            },
            {
              title: "2.13.3. Effets",
              content: `L'exécution des obligations affectées est suspendue pendant toute la durée de l'événement, sans que cette suspension puisse donner lieu à des pénalités ou à une quelconque indemnisation.

Si l'événement se prolonge au-delà de trente (30) jours calendaires, chaque partie peut résilier le contrat par anticipation, par notification écrite, sans indemnité, à l'exception du règlement des prestations déjà réalisées et des frais déjà engagés qui leur sont directement rattachables.`
            },
            {
              title: "2.13.4. Mesures raisonnables",
              content: `Chaque partie s'engage à prendre toutes les mesures raisonnables pour limiter les effets de l'événement de force majeure et reprendre l'exécution de ses obligations dans les meilleurs délais.`
            }
          ]
        },
        {
          title: "2.14. Propriété intellectuelle",
          content: null,
          subSubSections: [
            {
              title: "2.14.1. Titularité des droits",
              content: `Le programme, le référentiel pédagogique, la marque, le logotype et la maquette des certificats de K-EMPIRE CORPORATION constituent sa propriété exclusive.

Les supports pédagogiques sont, selon le cas, la propriété de K-EMPIRE CORPORATION ou celle de l'intervenant qui les a conçus. Dans ce dernier cas, K-EMPIRE CORPORATION dispose des droits nécessaires à leur reproduction, à leur communication aux participants, à leur archivage, à leur usage lors des sessions ultérieures du programme et à l'utilisation d'extraits à des fins de promotion.

Les enregistrements des sessions réalisés par K-EMPIRE CORPORATION lui appartiennent.

Dans tous les cas, le Client ne dispose sur ces éléments que du droit d'usage défini à l'article 2.14.2.`
            },
            {
              title: "2.14.2. Usage des contenus",
              content: `Le Client bénéficie uniquement d'un droit d'utilisation personnel, non exclusif et non transférable des contenus et supports pédagogiques, strictement limité à ses propres besoins internes. Ces contenus ne peuvent en aucun cas être utilisés à d'autres fins sans l'autorisation préalable, écrite et expresse de K-EMPIRE CORPORATION.

En particulier, le Client s'interdit :
• de reproduire, représenter, modifier, adapter, publier, transmettre ou dénaturer, en tout ou en partie, les contenus ou supports pédagogiques, quel que soit le procédé ou le support utilisé ;
• d'utiliser les contenus des formations pour former des tiers ou des personnes autres que son personnel ;
• de céder, communiquer ou mettre à disposition les contenus ou supports pédagogiques à des tiers, à titre gratuit ou onéreux ;
• de supprimer ou d'altérer la mention du nom de l'auteur figurant sur un support, qui est conservée sur toute copie autorisée.`
            },
            {
              title: "2.14.3. Engagement de responsabilité",
              content: `Le Client reconnaît que tout manquement à ces obligations, comme tout manquement à l'article 2.2.3, constitue une atteinte aux droits de propriété intellectuelle de K-EMPIRE CORPORATION et engage sa responsabilité conformément aux dispositions applicables.`
            },
            {
              title: "2.14.4. Maintien des droits préexistants",
              content: `K-EMPIRE CORPORATION demeure propriétaire de ses outils, méthodes, savoir-faire et innovations développés antérieurement ou à l'occasion de l'exécution des prestations réalisées chez le Client. Ces éléments ne peuvent être appropriés, reproduits ou exploités par le Client sans autorisation expresse.`
            },
            {
              title: "2.14.5. Sanctions",
              content: `Toute violation des présentes dispositions expose le Client aux sanctions civiles et pénales prévues par les textes applicables en matière de propriété littéraire et artistique et de propriété industrielle, notamment l'Accord de Bangui instituant l'Organisation africaine de la propriété intellectuelle (OAPI), ainsi qu'au paiement de dommages et intérêts pour les préjudices subis par K-EMPIRE CORPORATION.`
            }
          ]
        },
        {
          title: "2.15. Confidentialité",
          content: null,
          subSubSections: [
            {
              title: "2.15.1. Engagement général",
              content: `Les parties s'engagent mutuellement à préserver la confidentialité de toutes les informations sensibles ou confidentielles, de nature économique, technique, commerciale ou autre, auxquelles elles pourraient avoir accès dans le cadre de l'exécution du contrat ou à l'occasion des échanges intervenus avant sa conclusion. Ces informations incluent, sans s'y limiter, celles figurant dans la proposition commerciale et financière transmise par K-EMPIRE CORPORATION au Client.`
            },
            {
              title: "2.15.2. Obligations spécifiques",
              content: `• chaque partie s'engage à ne pas divulguer, communiquer ou rendre accessibles à des tiers, directement ou indirectement, tout ou partie des informations confidentielles reçues de l'autre partie, sans son autorisation préalable, écrite et expresse ;
• chaque partie prend toutes les mesures raisonnables pour protéger ces informations avec le même niveau de soin qu'elle accorde à ses propres informations confidentielles, et au minimum avec un niveau de soin raisonnable.`
            },
            {
              title: "2.15.3. Exceptions",
              content: `L'obligation de confidentialité ne s'applique pas aux informations qui :
a) sont ou deviennent publiquement accessibles autrement que par une violation de la présente clause ;
b) ont été légalement obtenues auprès d'un tiers sans violation d'une obligation de confidentialité ;
c) sont déjà connues de la partie réceptrice avant leur divulgation, comme en attestent ses dossiers écrits ;
d) doivent être divulguées en vertu de la loi, d'un règlement ou d'une décision judiciaire ou administrative, sous réserve d'en informer l'autre partie dans les meilleurs délais, sauf interdiction légale.

L'article 2.16 constitue une exception expresse au présent article, dans les limites qu'il fixe.`
            },
            {
              title: "2.15.4. Engagements spécifiques de K-EMPIRE CORPORATION",
              content: `K-EMPIRE CORPORATION s'engage à ne communiquer les informations transmises par le Client qu'à ses sociétés affiliées, partenaires, intervenants ou fournisseurs, exclusivement dans la mesure où cela est nécessaire à l'exécution des prestations prévues par le contrat, et sous réserve que ces tiers soient également tenus à une obligation de confidentialité équivalente.`
            },
            {
              title: "2.15.5. Durée",
              content: `L'obligation de confidentialité reste en vigueur pendant toute la durée du contrat et pendant une période de cinq (5) ans après son expiration ou sa résiliation, sauf disposition contraire convenue par écrit entre les parties.`
            },
            {
              title: "2.15.6. Sanctions",
              content: `En cas de violation intentionnelle des obligations du présent article, la partie fautive verse à l'autre une indemnité forfaitaire d'un million (1 000 000) de francs CFA, sans préjudice du droit de réclamer la réparation du préjudice excédant ce montant.

Par exception, la responsabilité de K-EMPIRE CORPORATION au titre du présent article demeure soumise au plafond et à la réserve des articles 2.12.2 et 2.12.4.`
            }
          ]
        },
        {
          title: "2.16. Communication et références",
          content: null,
          subSubSections: [
            {
              title: "2.16.1. Acceptation de principe",
              content: `Par exception à l'article 2.15 et dans les seules limites du présent article, le Client accepte d'être cité par K-EMPIRE CORPORATION comme référence dans le cadre de ses offres de services. Cette mention inclut l'utilisation de son nom, de son logo et d'une description objective des prestations réalisées, à l'exclusion de toute information couverte par l'article 2.15 qui ne serait pas nécessaire à cette description.`
            },
            {
              title: "2.16.2. Modalités d'utilisation",
              content: `K-EMPIRE CORPORATION peut mentionner ces informations dans les supports suivants :
• son site internet, ses brochures commerciales et ses propositions adressées à ses prospects ou clients ;
• ses communications internes, telles que des présentations à son personnel ou des documents de gestion ;
• ses rapports externes, tels que les rapports annuels ou autres documents adressés à ses associés ;
• toute communication imposée par des dispositions légales, réglementaires ou comptables.`
            },
            {
              title: "2.16.3. Conditions et limitations",
              content: `Toute utilisation des éléments d'identité visuelle du Client, logo ou marque, est effectuée aux frais de K-EMPIRE CORPORATION et dans le respect des standards de présentation définis par le Client.

Le Client peut demander à tout moment, par écrit motivé adressé dans les conditions de l'article 2.18, la limitation ou la cessation de l'utilisation de son nom ou de son logo dans certains supports ou contextes, sauf lorsque cette utilisation est requise par la loi. K-EMPIRE CORPORATION y donne suite dans un délai raisonnable.`
            },
            {
              title: "2.16.4. Engagement de K-EMPIRE CORPORATION",
              content: `K-EMPIRE CORPORATION s'engage à utiliser les informations du Client de manière loyale, objective et dans le strict respect de leur nature confidentielle.`
            }
          ]
        },
        {
          title: "2.17. Données à caractère personnel",
          content: null,
          subSubSections: [
            {
              title: "2.17.1. Responsable du traitement",
              content: `K-EMPIRE CORPORATION agit en qualité de responsable du traitement au sens de la loi n° 2019-014 du 29 octobre 2019 relative à la protection des données à caractère personnel en République togolaise et de l'Acte additionnel A/SA.1/01/10 de la Communauté économique des États de l'Afrique de l'Ouest relatif à la protection des données à caractère personnel.

Lorsque la personne concernée réside hors de l'espace communautaire ouest-africain, les réglementations applicables dans son pays de résidence sont respectées dans les conditions précisées par la Politique visée à l'article 2.17.2.`
            },
            {
              title: "2.17.2. Politique applicable",
              content: `Le traitement des données à caractère personnel des participants et des interlocuteurs du Client est régi par les Mentions légales et la Politique de protection des données à caractère personnel et de gestion des cookies publiées sur www.k-empirecorporation.com, auxquelles les présentes Conditions générales renvoient.

En cas de divergence entre les présentes Conditions générales et cette Politique, celle-ci prévaut pour tout ce qui concerne les données à caractère personnel.`
            },
            {
              title: "2.17.3. Finalités",
              content: `Dans le cadre des formations, les données sont traitées aux fins d'exécution du contrat et de gestion de la relation client, d'inscription et d'organisation des sessions, de suivi pédagogique, de délivrance des documents prévus à l'article 2.5, d'évaluation de la satisfaction, de facturation et de respect des obligations légales, dans les conditions précisées par la Politique.`
            },
            {
              title: "2.17.4. Durée de conservation",
              content: `Les données des Clients sont conservées pendant la durée de la relation contractuelle, augmentée du délai de prescription applicable en matière commerciale, conformément à la Politique.`
            },
            {
              title: "2.17.5. Droits des personnes concernées",
              content: `Toute personne concernée dispose d'un droit d'accès, de rectification, d'effacement, d'opposition, de portabilité et de limitation, qu'elle exerce par demande écrite accompagnée d'un justificatif d'identité adressée à contact@k-empirecorporation.com. K-EMPIRE CORPORATION y répond dans le délai d'un mois. Toute personne dispose également du droit d'introduire une réclamation auprès de l'Instance de protection des données à caractère personnel (IPDCP).`
            },
            {
              title: "2.17.6. Rôle du Client",
              content: `Lorsque le Client transmet à K-EMPIRE CORPORATION les données de ses collaborateurs, il garantit les avoir préalablement informés et disposer du fondement l'autorisant à procéder à cette transmission.`
            }
          ]
        },
        {
          title: "2.18. Notifications",
          content: null,
          subSubSections: [
            {
              title: "2.18.1. Formes admises",
              content: `Toute notification prévue par les présentes Conditions générales est valablement effectuée par tout support laissant une trace écrite, notamment le courriel, la lettre remise contre décharge, le courrier avec accusé de réception ou tout message électronique dont la réception peut être établie.`
            },
            {
              title: "2.18.2. Adresses",
              content: `Les notifications sont adressées au Client à l'adresse figurant sur le bon de commande ou le bulletin d'inscription, et à K-EMPIRE CORPORATION à l'adresse contact@k-empirecorporation.com ou à son siège social. Les réclamations et les demandes relatives aux données à caractère personnel sont adressées à la même adresse.`
            },
            {
              title: "2.18.3. Computation des délais",
              content: `Les délais prévus par les présentes Conditions générales courent à compter de la réception de la notification. Chaque partie informe l'autre, sans délai, de tout changement de ses coordonnées.`
            }
          ]
        },
        {
          title: "2.19. Droit applicable et règlement des différends",
          content: null,
          subSubSections: [
            {
              title: "2.19.1. Droit applicable",
              content: `Le contrat est régi par le droit togolais, en ce compris les actes uniformes de l'OHADA qui lui sont applicables.`
            },
            {
              title: "2.19.2. Règlement amiable",
              content: `En cas de différend relatif à l'exécution ou à l'interprétation du contrat, les parties s'engagent à rechercher en priorité une solution amiable par voie de négociation directe, puis par médiation. Cette démarche est entreprise dans un délai maximum de trente (30) jours à compter de la notification écrite du litige.`
            },
            {
              title: "2.19.3. Arbitrage",
              content: `Si la négociation directe et la médiation échouent, tout litige relatif à la validité, à l'interprétation, à l'exécution ou à la résiliation du contrat est tranché définitivement suivant le règlement d'arbitrage de la Cour d'arbitrage du Togo (CATO).

Le siège de l'arbitrage est fixé à Lomé, en République togolaise. La procédure se déroule en langue française. Le nombre d'arbitres et les modalités de leur désignation sont déterminés conformément au règlement de la CATO.`
            },
            {
              title: "2.19.4. Exception — recouvrement et mesures urgentes",
              content: `Par exception aux articles 2.19.2 et 2.19.3, et sans préalable amiable, relèvent des juridictions compétentes de Lomé :
• le recouvrement des créances certaines, liquides et exigibles, notamment par voie d'injonction de payer ;
• les mesures conservatoires et les procédures d'urgence ;
• l'exécution forcée des décisions de justice et des sentences arbitrales.`
            },
            {
              title: "2.19.5. Engagement de collaboration",
              content: `Les parties s'engagent à collaborer de bonne foi tout au long de la procédure, en fournissant dans les délais impartis tous les documents, informations et éléments nécessaires à son bon déroulement.`
            },
            {
              title: "2.19.6. Caractère définitif et frais",
              content: `La sentence arbitrale est définitive, contraignante et immédiatement exécutoire, sans possibilité d'appel, sauf dans les limites prévues par la loi. Les frais d'arbitrage sont répartis à parts égales entre les parties, sauf décision contraire du tribunal arbitral.`
            }
          ]
        },
        {
          title: "2.20. Dispositions finales",
          content: null,
          subSubSections: [
            {
              title: "2.20.1. Divisibilité",
              content: `Si l'une des stipulations des présentes Conditions générales est déclarée nulle, inapplicable ou réduite, les autres stipulations demeurent pleinement en vigueur. Les parties lui substituent une stipulation d'effet économique équivalent.`
            },
            {
              title: "2.20.2. Intégralité de l'accord",
              content: `Les documents visés au préambule constituent l'intégralité de l'accord des parties relatif à son objet. Toute modification fait l'objet d'un écrit signé des deux parties.`
            }
          ]
        }
      ]
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

  const renderSubSubSection = (subSub, depth = 0) => (
    <div key={subSub.title} className={`${depth > 0 ? 'ml-4 md:ml-8' : ''} mb-6`}>
      <h4 className="text-sm font-semibold text-accent mb-2">{subSub.title}</h4>
      {subSub.content && (
        <p className="text-body text-text-muted leading-relaxed text-justify whitespace-pre-wrap mb-4">{subSub.content}</p>
      )}
      {subSub.subSubSections && subSub.subSubSections.map(sub => renderSubSubSection(sub, depth + 1))}
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-h1-m md:text-h1-d text-primary font-semibold mb-4">
            CONDITIONS GENERALES
          </h1>
          <h2 className="text-h2-m md:text-h2-d text-primary font-semibold mb-6">
            DE FORMATION
          </h2>
          <p className="text-sm text-text-muted mb-4">
            K-EMPIRE CORPORATION — Version 3, en vigueur depuis le 17 septembre 2026
          </p>
          <p className="text-sm text-text-muted max-w-2xl mx-auto">
            Les Conditions générales applicables sont celles en vigueur à la date de la commande.
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
                  <div className="text-body text-text-muted leading-relaxed pl-0 md:pl-16">
                    {section.content && (
                      <div className="text-justify whitespace-pre-wrap mb-6">{section.content}</div>
                    )}

                    {section.subSections && section.subSections.map((sub, subIndex) => (
                      <div key={subIndex} className="mb-8">
                        <h3 className="text-lg font-semibold text-primary mb-4">{sub.title}</h3>
                        {sub.content && (
                          <p className="text-body text-text-muted leading-relaxed text-justify whitespace-pre-wrap mb-4">{sub.content}</p>
                        )}
                        {sub.subSubSections && sub.subSubSections.map(subSub => renderSubSubSection(subSub, 0))}
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