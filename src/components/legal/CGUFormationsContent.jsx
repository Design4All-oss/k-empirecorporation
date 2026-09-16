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
      title: "Introduction",
      content: `K-EMPIRE CORPORATION, basé à Kara, en République du Togo, est un cabinet
international de référence spécialisé dans les études, le conseil et les formations
professionnelles certifiantes. Fort de son expertise et de son engagement envers
l'excellence, le cabinet accompagne ses partenaires à travers des programmes
de formation de haut niveau, conçus pour répondre aux exigences des
professionnels et des organisations évoluant dans un environnement globalisé
et compétitif.

Les présentes conditions générales de vente (CGV) s'appliquent à toutes les
offres de formation de K-EMPIRE CORPORATION.

K-EMPIRE CORPORATION se réserve le droit de modifier ou de mettre à jour les
présentes Conditions Générales de Vente (CGV) à tout moment, sans préavis.
Les CGV applicables sont celles en vigueur à la date de la commande. Elles
sont disponibles sur le site internet officiel de K-EMPIRE CORPORATION : www.kempirecorporation.com.

En passant commande, le Client accepte sans réserve l'intégralité des
présentes CGV. Toute condition particulière ou contraire émise par le Client, sauf
acceptation expresse et écrite de K- EMPIRE CORPORATION, est inopposable. Le
fait que K-EMPIRE CORPORATION ne fasse pas valoir à un moment donné l'une des
clauses des présentes CGV ne pourra être interprété comme une renonciation à
s'en prévaloir ultérieurement. Avant toute commande, le Client reconnaît avoir
reçu de la part de K-EMPIRE CORPORATION toutes les informations et conseils
nécessaires pour évaluer l'adéquation de l'offre de services à ses besoins.`,
      columns: false,
      hasList: false
    },
    {
      icon: BookOpen,
      title: "1. FORMATION",
      content: null,
      columns: false,
      hasList: false,
      subSections: [
        {
          title: "1.1. FORMATIONS INTER-ENTREPRISES",
          content: null,
          subSubSections: [
            {
              title: "1.1.1. Descriptif",
              content: `Les formations inter-entreprises proposées par K-EMPIRE CORPORATION sont
disponibles à la fois en présentiel, dans les locaux de K-EMPIRE CORPORATION
ou dans des lieux adaptés mis à disposition, et en ligne via une plateforme
numérique dédiée. Ces formations, issues du catalogue officiel, sont conçues
pour répondre aux besoins des participants grâce à une approche flexible et
adaptée.`
            },
            {
              title: "1.1.2. Conditions financières",
              content: `Le bulletin d'inscription, dûment complété, signé par le Responsable de
l'entreprise Cliente ou tout représentant habilité, cacheté et transmis à K-EMPIRE
CORPORATION, fait office de bon de commande ferme. Le règlement du prix de
la formation est à effectuer comptant, lors de l'inscription, à l'ordre de K-EMPIRE
CORPORATION.

K-EMPIRE CORPORATION se réserve le droit d'appliquer une révision tarifaire en
cas de variation significative des coûts externes. Cette révision sera notifiée par
écrit au Client au moins trente (30) jours avant son entrée en vigueur

Tous les prix sont exprimés hors taxes et majorés du taux de TVA en vigueur.

• Pour les formations en présentiel, les tarifs incluent les pauses café, les
déjeuners et la documentation. Les frais de transport, d'hébergement et
de dîner sont à la charge des participants.

• Pour les formationsenligne, les tarifs incluent l'accès à la plateforme, les
supports numériques et une assistance technique.`
            },
            {
              title: "1.1.3. Remplacementd'unparticipant",
              content: `Un participant empêché peut être remplacé par une autre personne ayant
le même profil et des besoins similaires, sur notification préalable adressée à
K-EMPIRE CORPORATION.`
            },
            {
              title: "1.1.4. Insuffisance dunombrede participants",
              content: `En cas d'un nombre insuffisant de participants, K-EMPIRE CORPORATION se
réserve le droit de reporter la session au plus tard sept (07) jours calendaires
avant la date prévue, sans indemnité pour le Client.`
            },
            {
              title: "1.1.5. Remise relativeaunombre de participants",
              content: `Lorsqu'un Client inscrit plus de cinq (5) personnes à une même formation, qu'elle
soit en présentiel ou en ligne, il bénéficie d'une remise de 20% sur le montant
total dû.`
            }
          ]
        },
        {
          title: "1.2. FORMATION INTRA-ENTREPRISE",
          content: null,
          subSubSections: [
            {
              title: "1.2.1. Description",
              content: `Les formations intra-entreprises proposées par K-EMPIRE CORPORATION sont
conçues sur mesure pour répondre aux besoins spécifiques du Client. Elles
peuvent être réalisées :

• En présentiel, dans les locaux de K-EMPIRE CORPORATION, du Client, ou
dans des locaux mis à disposition par l'une ou l'autre des parties après
accord préalable ;

• Enligne, via une plateforme dédiée, offrant flexibilité et accessibilité, tout
en maintenant les standards de qualité et d'interactivité.

Le contenu, le format, et les modalités d'exécution sont établis en concertation
avec le Client et conformément aux termes de la proposition commerciale et
technique de K-EMPIRE CORPORATION. Le Client s'engage à fournir à K-EMPIRE
CORPORATION toutes les informations nécessaires à l'élaboration d'un
programme sur mesure, notamment les objectifs spécifiques, le profil des
participants et toute contrainte opérationnelle particulière. Tout retard dans
la transmission de ces informations pourra entraîner un report des échéances
convenues sans indemnité pour le Client.`
            },
            {
              title: "1.2.2. Conditions financières",
              content: null,
              subSubSections: [
                {
                  title: "1.2.2.1. Propositioncommerciale et validation",
                  content: `Toute formation intra-entreprise, qu'elle soit en présentiel ou en ligne, fera l'objet
d'une proposition commerciale et financière écrite, précisant les coûts, les
modalités d'exécution, et
les délais. La formation sera réputée acceptée à réception, par K-EMPIRE
CORPORATION, de la proposition signée par un représentant dûment habilité du
Client.`
                },
                {
                  title: "1.2.2.2. Acompte",
                  content: `Sauf disposition contraire expressément mentionnée dans la proposition,
le Client s'engage à verser un acompte minimum de 50 % du montant total
de la formation lors de l'acceptation de l'offre. Ce paiement conditionne la
réservation des dates, le démarrage des préparatifs de la formation, et, le cas
échéant, l'accès aux ressources en ligne.`
                },
                {
                  title: "1.2.2.3. Règlement dusolde",
                  content: `Le solde devra être réglé par le Client au plus tard 7 jours avant le début de la
formation, sauf stipulation contraire dans la proposition commerciale.`
                },
                {
                  title: "1.2.2.4. Modalitésde paiement",
                  content: `Les paiements peuvent être effectués par chèque, virement bancaire, règlement
domicilié ou tout autre mode convenu. Les frais bancaires ou de transaction
restent à la charge exclusive du Client.`
                },
                {
                  title: "1.2.2.5. Pénalitésde retard",
                  content: `En cas de retard de paiement, les dispositions de l'article 2.3.2.6. Relatif aux
pénalités financières s'appliquent.`
                },
                {
                  title: "1.2.2.6. Annulationoumodification",
                  content: `Toute annulation ou modification de la commande par le Client doit être notifiée
par écrit à K- EMPIRE CORPORATION. Les frais y afférents seront déterminés
conformément aux conditions prévues dans la proposition commerciale ou
dans les présentes CGV.`
                },
                {
                  title: "1.2.2.7. Accessibilité pour les formations enligne",
                  content: `Pour les formations en ligne, K-EMPIRE CORPORATION garantit l'accès aux
plateformes dédiées dès le paiement de l'acompte. Le Client s'engage à fournir
les informations nécessaires à l'inscription des participants dans les délais
impartis.`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      icon: Building2,
      title: "2. DISPOSITIONS COMMUNES AUX FORMATIONS",
      content: null,
      columns: false,
      hasList: false,
      subSections: [
        {
          title: "2.1. Documents contractuels",
          content: `Une attestation de participation est délivrée à chaque participant à l'issue de la
formation soit réalisée en présentiel ou en ligne.
Une attestation de présence peut être fournie à chaque partie (Client ou
organisme financeur) sur demande écrite préalable adressée à K-EMPIRE
CORPORATION.`
        },
        {
          title: "2.2. Règlementparun Organisme de financement de formationcontinue",
          content: null,
          subSubSections: [
            {
              title: "2.2.1. Demandepréalable deprise encharge",
              content: `Le Client est responsable d'effectuer la demande de prise en charge auprès de
l'organisme financeur avant le début de la formation. L'accord de financement
obtenu doit être communiqué à K-EMPIRE CORPORATION au moment de
l'inscription, accompagné de la convention de formation signée.`
            },
            {
              title: "2.2.2. Prise enchargepartielle",
              content: `En cas de prise en charge partielle par l'organisme, le Client s'engage à régler
la différence directement à K-EMPIRE CORPORATION dans les délais impartis,
conformément aux modalités de paiement définies dans la convention de
formation`
            },
            {
              title: "2.2.3. Absence d'accord de financement",
              content: `Si l'accord de prise en charge ne parvient pas à K-EMPIRE CORPORATION au
plus tard le premier jour de la formation, sauf accord contraire, la totalité des
frais de formation sera facturée au Client, indépendamment des démarches
entreprises auprès de l'organisme financeur.`
            },
            {
              title: "2.2.4. Modalités depaiement encas deprise encharge",
              content: `Le Client s'assure que l'organisme financeur procède au règlement des sommes
dues dans les délais convenus. À défaut, K-EMPIRE CORPORATION pourra exiger
le paiement intégral des frais directement auprès du Client, sans préjudice des
éventuels recours exercés par le Client auprès de l'organisme financeur.`
            }
          ]
        },
        {
          title: "2.3. Annulationet report des formationsà l'initiativedu Client",
          content: null,
          subSubSections: [
            {
              title: "2.3.1. Fixationdes dates",
              content: `Les dates de formation sont déterminées d'un commun accord entre K-EMPIRE
CORPORATION et le Client, puis confirmées par écrit.
Une fois validées, elles sont considérées comme fermes et engageantes pour
les deux parties.`
            },
            {
              title: "2.3.2. Conditions d'annulationoude report par le Client",
              content: null,
              subSubSections: [
                {
                  title: "2.3.2.1. Notificationpréalable",
                  content: `Toute demande d'annulation ou de report d'une session de formation déjà
planifiée doit être communiquée par écrit à K-EMPIRE CORPORATION au moins
quinze (15) jours ouvrés avant la date prévue de la session. Toute communication
en dehors de ce délai entraînera l'application des pénalités prévues dans les
présentes conditions générales, sauf cas de force majeure ou raison médicale.`
                },
                {
                  title: "2.3.2.2. Cas de forcemajeure ouraisonmédicale",
                  content: `Aucune pénalité ne sera appliquée en cas d'annulation ou de report pour
des raisons de force majeure, telles que définies par l'Acte uniforme relatif au
droit commercial général de l'OHADA, ou pour des raisons médicales dûment
justifiées.`
                },
                {
                  title: "2.3.2.3. Justificatifs requis",
                  content: `Le Client devra fournir à K-EMPIRE CORPORATION un document officiel en cas de
force majeure, ou un certificat médical en cas de raison médicale, dans un délai
maximum de cinq
(5) jours calendaires.`
                },
                {
                  title: "2.3.2.4. Conséquences encas denon-respectdes obligations",
                  content: `À défaut de respecter les délais ou de fournir les justificatifs, le Client sera tenu
au paiement des frais d'annulation ou de report.`
                },
                {
                  title: "2.3.2.5. Engagement collaboratif",
                  content: `K-EMPIRE CORPORATION s'engage à examiner de bonne foi toute demande
d'annulation ou de report et à proposer, dans la mesure du possible, une
reprogrammation de la session à une date ultérieure convenant aux deux
parties.`
                },
                {
                  title: "2.3.2.6. Conditions et pénalitésapplicables",
                  content: `• Annulation notifiée entre 15 et 7 jours ouvrés avant la session : une
indemnité de 20% des honoraires sera facturée.

• Annulation notifiée moins de 7 jours ouvrés avant la session : une
indemnité de 30% des honoraires sera facturée.

• Report notifié moins de 48 heures avant la session : une indemnité de 50%
des honoraires sera facturée.

• Toute annulation ou report ne respectant pas les délais sera considérée
comme tardive et soumis aux indemnités prévues.

• En cas de non-présentation du Client
sans préavis écrit, K-EMPIRE CORPORATION se réserve le
droit de facturer l'intégralité des honoraires.`
                },
                {
                  title: "2.3.2.7. Modificationpar accordmutuel",
                  content: `Toute modification des dispositions ci-dessus peut être envisagée à condition
d'un accord écrit préalable entre K-EMPIRE CORPORATION et la Cliente.`
                }
              ]
            }
          ]
        },
        {
          title: "2.4. Modalités depassationdes Commandes",
          content: null,
          subSubSections: [
            {
              title: "2.4.1. Durée de validitéde l'offre",
              content: `Les propositions et prix indiqués par K-EMPIRE CORPORATION sont valables
pendant une durée de 30 jours calendaires à compter de la date de soumission
de l'offre au Client.`
            },
            {
              title: "2.4.2. Acceptationde l'offre",
              content: `L'offre de formation est réputée acceptée dès réception, par K-EMPIRE
CORPORATION, d'un bon de commande dûment complété, signé et daté par un
représentant légal ou tout autre mandataire habilité de la Cliente.`
            },
            {
              title: "2.4.3. Acceptationdes conditions générales",
              content: `La signature du bon de commande ou tout accord exprès donné par le Client
implique l'acceptation irrévocable et sans réserve des présentes conditions
générales de vente et d'exécution des services. Ces conditions générales
prévalent sur tout autre document, sauf accord écrit contraire convenu entre
les parties.`
            },
            {
              title: "2.4.4. Modificationdes conditionsgénérales",
              content: `K-EMPIRE CORPORATION se réserve le droit de modifier les présentes conditions
générales à tout moment. Les modifications s'appliquent exclusivement aux
contrats conclus après la publication des nouvelles conditions. Les modifications
n'affectent en aucun cas les contrats en cours ou les offres déjà acceptées.`
            }
          ]
        },
        {
          title: "2.5. Facturation- Règlement",
          content: null,
          subSubSections: [
            {
              title: "2.5.1. Prix et conditionsde facturation",
              content: null,
              subSubSections: [
                {
                  title: "2.5.1.1. Expression des prix",
                  content: `Tous les prix sont exprimés en Francs CFA (XOF) et s'entendent hors taxes (HT).`
                },
                {
                  title: "2.5.1.2. Applicationdes taxes",
                  content: `Les prix seront majorés de la Taxe sur la Valeur Ajoutée (TVA) ou de toute autre
taxe applicable, au taux en vigueur au moment de la facturation, conformément
à la réglementation en vigueur.`
                },
                {
                  title: "2.5.1.3. Charges supplémentaires",
                  content: `Le Client sera exclusivement responsable des taxes locales, droits de douane,
ou autres prélèvements éventuels applicables dans son pays ou à sa juridiction.`
                },
                {
                  title: "2.5.1.4. Fraisbancaires et de transaction",
                  content: `Tous les frais bancaires, frais de transaction ou coûts associés au mode de
paiement choisi par le Client sont entièrement à la charge de ce dernier.`
                }
              ]
            },
            {
              title: "2.5.2. Paiement",
              content: null,
              subSubSections: [
                {
                  title: "2.5.2.1. Modalitésgénérales depaiement",
                  content: `Sauf convention contraire précisée dans une offre spécifique ou sur la facture,
le règlement du montant total dû par le Client doit être effectué au plus tard dix
(10) jours avant le début de la formation.`
                },
                {
                  title: "2.5.2.2. Moyens de paiement",
                  content: `• Chèque bancaire émis par une banque située sur le territoire national ;

• Virement bancaire ;

• Transfert monétaire, les frais de transaction étant intégralement à la
charge du Client.`
                },
                {
                  title: "2.5.2.3. Escompte",
                  content: `Aucun escompte ne sera accordé en cas de paiement anticipé, sauf mention
expresse sur la facture.`
                },
                {
                  title: "2.5.2.4. Retard depaiement",
                  content: null,
                  subSubSections: [
                    {
                      title: "2.5.2.4.1. Intérêtsde retard",
                      content: `Toute somme non payée à l'échéance entraîne de plein droit et sans mise en
demeure préalable, l'application de pénalités de retard calculées à un taux
de 10% par mois de retard, conformément à l'article 291 du droit commercial
de l'OHADA. Le calcul des pénalités s'effectue à partir du jour suivant la date
d'exigibilité jusqu'à paiement complet.`
                    },
                    {
                      title: "2.5.2.4.2. Suspensiondesprestations",
                      content: `K-EMPIRE CORPORATION se réserve le droit de suspendre toute prestation ou
commande en cours en cas de retard de paiement, sans préjudice des autres
voies de recours disponibles.`
                    },
                    {
                      title: "2.5.2.4.3. Recouvrement et indemnités",
                      content: `Une indemnité forfaitaire de cent mille franc cfa (100.000 FCFA) pour frais de
recouvrement sera appliquée à chaque retard de paiement. Si les frais de
recouvrement réellement exposés par K-EMPIRE CORPORATION dépassent
ce montant, une indemnité complémentaire pourra être réclamée, sur
présentation des justificatifs`
                    }
                  ]
                },
                {
                  title: "2.5.2.5. Résolutiondulitige",
                  content: `Tout défaut de paiement persistant malgré les relances de K-EMPIRE
CORPORATION pourra donner lieu à une procédure contentieuse, les frais
afférents étant à la charge exclusive du Client.`
                }
              ]
            }
          ]
        },
        {
          title: "2.6. Satisfaction Client et améliorationcontinue",
          content: null,
          subSubSections: [
            {
              title: "2.6.1. Suivi qualité des prestations",
              content: `Afin de garantir un haut niveau de qualité dans ses prestations, K-EMPIRE
CORPORATION met en place des outils d'évaluation systématique de la
satisfaction des participants à l'issue de chaque formation.
Les retours obtenus seront utilisés pour améliorer l'offre pédagogique. Le Client
peut également soumettre toute réclamation par écrit à l'adresse suivante :
reclamation@k- empirecorporation.com
Toute réclamation sera traitée dans un délai de cinq (5) jours ouvrables suivant
sa réception.`
            }
          ]
        },
        {
          title: "2.7. Limitationsde responsabilitésde K-EMPIRE CORPORATION",
          content: null,
          subSubSections: [
            {
              title: "2.7.1. Responsabilité limitée aux dommagesdirects",
              content: `K-EMPIRE CORPORATION ne pourra être tenue responsable qu'au titre des
dommages directs subis par la Cliente, à condition que ces derniers soient
dûment prouvés et résultent d'une faute ou d'une inexécution imputable
à K-EMPIRE CORPORATION dans le cadre de l'exécution de ses obligations
contractuelles.`
            },
            {
              title: "2.7.2. Plafonnement de la responsabilité",
              content: `La responsabilité globale de K-EMPIRE CORPORATION, toutes causes confondues,
est strictement limitée au montant total effectivement payé par le Client pour
la formation concernée.`
            },
            {
              title: "2.7.3. Exclusiondes dommages indirects",
              content: `En aucun cas, K-EMPIRE CORPORATION ne saurait être tenue responsable des
dommages indirects, incluant, sans que cette liste soit exhaustive :

a. Perte de données ou de fichier(s) ;

b. Perte d'exploitation(s) ;

c. Préjudice commercial ;

d. Manque à gagner ;

e. Atteinte à l'image ou à la réputation.`
            },
            {
              title: "2.7.4. Obligationdu Client",
              content: `Le Client s'engage à informer immédiatement K-EMPIRE CORPORATION de tout
dommage dont il pourrait demander réparation, afin de permettre une gestion
rapide et efficace de la situation.`
            }
          ]
        },
        {
          title: "2.8. Forcemajeure",
          content: null,
          subSubSections: [
            {
              title: "2.8.1. Définitionde laforcemajeure",
              content: `K-EMPIRE CORPORATION ne pourra être tenue responsable envers le Client de
l'inexécution totale ou partielle de ses obligations contractuelles lorsque cette
inexécution résulte d'un cas de force majeure ou d'un cas fortuit.

Constituent des cas de force majeure ou cas fortuits, outre ceux habituellement
reconnus par la jurisprudence des Cours et Tribunaux compétents, et sans que
cette liste soit exhaustive :

• La maladie ou l'accident d'un consultant ou animateur de formation ;

• Les grèves ou conflits sociaux internes ou externes à K-EMPIRE
CORPORATION ;

• Les désastres naturels (inondations, tempêtes, tremblements de terre,
etc.) ;

• Les incendies ;

• La non-obtention de visas, autorisations de travail ou autres permis
nécessaires ;

• La promulgation de nouvelles lois ou règlements postérieurs à la
signature du contrat ;

• L'interruption des télécommunications ou des approvisionnements en
énergie ;

• L'interruption des communications ou des transports de tout type ;

• Tout autre événement échappant
au contrôle raisonnable de K-EMPIRE CORPORATION`
            },
            {
              title: "2.8.2. Procédure encasde forcemajeure",
              content: `La partie affectée par un cas de force majeure s'engage à :

Informer l'autre partie de la survenance de l'événement dans un délai de cinq
(5) jours ouvrables à compter de sa connaissance, par courriel ou par lettre
recommandée avec accusé de réception.

Fournir, dans un délai de dix (10) jours ouvrables suivant cette notification,
les justificatifs appropriés attestant de la réalité et des conséquences de
l'événement.`
            },
            {
              title: "2.8.3. Effets de laforcemajeure",
              content: `En cas de force majeure, l'exécution des obligations affectées sera suspendue
pendant toute la durée de l'événement, sans que cette suspension puisse
donner lieu à des pénalités ou à une quelconque indemnisation.

Si l'événement de force majeure se prolonge au-delà de trente (30) jours
calendaires, chaque partie aura la faculté de résilier le contrat de manière
anticipée, par notification écrite, sans indemnité, à l'exception des frais déjà
engagés au titre des prestations réalisées`
            },
            {
              title: "2.8.4. Mesures raisonnables",
              content: `Chaque partie s'engage à prendre toutes les mesures raisonnables pour limiter
les effets de l'événement de force majeure et reprendre l'exécution de ses
obligations dans les meilleurs délais.`
            }
          ]
        },
        {
          title: "2.9. Propriété intellectuelle",
          content: null,
          subSubSections: [
            {
              title: "2.9.1. Titularité desdroits",
              content: `K-EMPIRE CORPORATION est seule titulaire des droits de propriété intellectuelle
relatifs à l'ensemble des formations qu'elle propose à ses Clients. À ce titre,
tous les contenus, supports pédagogiques et outils, quelle qu'en soit la forme
(papier, électronique, numérique, oraux, visuelle, etc.), utilisés dans le cadre des
formations demeurent la propriété exclusive de K- EMPIRE CORPORATION.`
            },
            {
              title: "2.9.2. Usage des contenus",
              content: `Le Client bénéficie uniquement d'un droit d'utilisation personnel, non exclusif
et non transférable des contenus et supports pédagogiques, strictement
limité à ses propres besoins internes. Ces contenus ne peuvent en aucun cas
être utilisés à d'autres fins sans l'autorisation préalable, écrite et expresse de
K-EMPIRE CORPORATION.

En particulier, le Client s'interdit :

• De reproduire, représenter, modifier, adapter, publier, transmettre ou
dénaturer, en tout ou en partie, les contenus ou supports pédagogiques,
quel que soit le procédé ou le support utilisé ;

• D'utiliser les contenus des formations pour former des tiers ou des
personnes autres que son personnel ;

• De céder, communiquer ou mettre à disposition les contenus ou supports
pédagogiques à des tiers, à titre gratuit ou onéreux.`
            },
            {
              title: "2.9.3. Engagementde responsabilité",
              content: `Le Client reconnaît que tout manquement à ces obligations constitue une
violation des droits de propriété intellectuelle de K-EMPIRE CORPORATION. En cas
de cession ou de communication non autorisée des contenus, la responsabilité
du Client sera engagée conformément aux dispositions légales applicables,
notamment celles relatives à la protection du droit d'auteur et des droits voisins
de l'OAPI.`
            },
            {
              title: "2.9.4. Maintiendes droits préexistants",
              content: `En toute hypothèse, K-EMPIRE CORPORATION demeure propriétaire de ses
outils, méthodes, savoir-faire et innovations développés antérieurement
ou à l'occasion de l'exécution des prestations réalisées chez le Client. Ces
éléments ne peuvent être appropriés, reproduits ou exploités par le Client sans
autorisation expresse.`
            },
            {
              title: "2.9.5. Sanctions",
              content: `Toute violation des présentes dispositions expose le Client à des sanctions civiles
et pénales prévues par l'accord de Bangui instituant l'Organisation Africaine de
la Propriété Intellectuelle (OAPI), ainsi qu'au paiement de dommages et intérêts
pour les préjudices subis par K-EMPIRE CORPORATION.`
            }
          ]
        },
        {
          title: "2.10. Confidentialité",
          content: null,
          subSubSections: [
            {
              title: "2.10.1. Engagementgénéralde confidentialité",
              content: `Les parties s'engagent mutuellement à préserver la confidentialité de toutes
les informations sensibles ou confidentielles de nature économique, technique,
commerciale ou autre, auxquelles elles pourraient avoir accès dans le cadre
de l'exécution du contrat ou à l'occasion des échanges intervenus avant sa
conclusion. Ces informations incluent, sans s'y limiter, celles figurant dans la
proposition commerciale et financière transmise par K-EMPIRE CORPORATION à
la Cliente.`
            },
            {
              title: "2.10.2. Obligations spécifiques",
              content: `• Chaque partie s'engage à ne pas divulguer, communiquer ou rendre
accessibles à des tiers, directement ou indirectement, tout ou partie des
informations confidentielles reçues de l'autre partie, sans l'autorisation
préalable, écrite et expresse de celle-ci.

• Chaque partie prendra toutes les mesures raisonnables pour protéger
ces informations avec le même niveau de soin qu'elle accorde à ses
propres informations confidentielles, et au minimum avec un niveau de
soin raisonnable.`
            },
            {
              title: "2.10.3. Exceptions",
              content: `L'obligation de confidentialité ne s'applique pas aux informations qui :

a) Sont ou deviennent publiquement accessibles autrement que par une
violation de la présente clause ;

b) Ont été légalement obtenues auprès d'un tiers sans violation d'une obligation
de confidentialité ;

c) Sont déjà connues de la partie réceptrice avant leur divulgation, comme en
attestent ses dossiers écrits ;

d) Doivent être divulguées en vertu de la loi, d'un règlement ou d'une décision
judiciaire ou administrative, sous réserve d'en informer l'autre partie dans les
meilleurs délais, sauf interdiction légale.`
            },
            {
              title: "2.10.4. Engagements spécifiques de K-EMPIRE CORPORATION",
              content: `K-EMPIRE CORPORATION s'engage à ne communiquer les informations
transmises par le Client qu'à ses sociétés affiliées, partenaires ou fournisseurs,
exclusivement dans la mesure où cela est nécessaire à l'exécution des
prestations prévues par le contrat et sous réserve que ces tiers soient également
tenus à une obligation de confidentialité équivalente.`
            },
            {
              title: "2.10.5. Durée de l'obligationde confidentialité",
              content: `L'obligation de confidentialité prévue par la présente clause restera en vigueur
pendant toute la durée du contrat et pour une période de cinq (5) ans après son
expiration ou sa résiliation, sauf disposition contraire convenue par écrit entre
les parties.`
            },
            {
              title: "2.10.6. Sanctions encas de violation",
              content: `En cas de violation des obligations de confidentialité, la Partie fautive sera
tenue de verser à l'autre Partie une indemnité forfaitaire d'un million (1.000.000)
FCFA. Ce montant est sans préjudice du droit de l'autre Partie de réclamer des
dommages et intérêts complémentaires en cas de préjudice avéré.`
            }
          ]
        },
        {
          title: "2.11. Communication",
          content: null,
          subSubSections: [
            {
              title: "2.11.1. Acceptationde principe",
              content: `Le Client accepte d'être cité par K-EMPIRE CORPORATION comme référence dans
le cadre de ses offres de services. Cette mention inclut l'utilisation de son nom,
de son logo et d'une description objective des prestations réalisées.`
            },
            {
              title: "2.11.2. Modalités d'utilisation",
              content: `• K-EMPIRE CORPORATION pourra mentionner ces informations dans les
supports suivants : Son site internet, ses brochures commerciales et ses
propositions adressées à ses prospects ou Clientes.

• Ses communications internes, telles que des présentations à son
personnel ou des documents de gestion.

• Ses rapports externes, comme les rapports annuels ou autres documents
adressés à ses actionnaires.

• Toute communication imposée par des dispositions légales,
réglementaires ou comptables.`
            },
            {
              title: "2.11.3. Conditions et limitations",
              content: `Toute utilisation des éléments d'identité visuelle du Client (logo, marque, etc.)
sera effectuée aux frais de K-EMPIRE CORPORATION et dans le respect des
standards de présentation définis par la Cliente.

Le Client pourra demander à tout moment, par écrit motivé, la limitation ou la
cessation de l'utilisation de son nom ou de son logo dans certains supports ou
contextes spécifiques, sauf si cette utilisation est requise par la loi.`
            },
            {
              title: "2.11.4. Engagementde K-EMPIRE CORPORATION",
              content: `K-EMPIRE CORPORATION s'engage à utiliser les informations du Client de manière
loyale, objective et dans le strict respect de leur nature confidentielle.`
            }
          ]
        },
        {
          title: "2.12. Protectiondes donnéespersonnelles desparticipants",
          content: `Dans le cadre de ses activités, K-EMPIRE CORPORATION collecte et traite les
données personnelles des Clientes pour l'organisation et le suivi des formations.
Ces données seront conservées et traitées conformément à notre politique de
traitement de données personnelles disponibles sur notre site officiel : www.kempirecorporation.com

Chaque Cliente dispose d'un droit d'accès, de rectification, de suppression
et d'opposition qu'il peut exercer en contactant le délégué à la protection
des données (DPO) de K-EMPIRE CORPORATION à l'adresse suivante : dpo@kempirecorporation.com`,
          columns: false,
          hasList: false
        },
        {
          title: "2.13. Droitapplicable - Attributionde compétence",
          content: null,
          subSubSections: [
            {
              title: "2.13.1. Droit applicable",
              content: `Le présent contrat est régi par l'Acte uniforme relatif au droit commercial
général de l'OHADA.`
            },
            {
              title: "2.13.2. Règlement amiabledes litiges",
              content: `En cas de différend relatif à l'exécution ou à l'interprétation du présent contrat,
les parties s'engagent à rechercher, en priorité, une solution amiable par voie de
négociation directe, puis par médiation. Cette démarche devra être entreprise
dans un délai maximum de trente (30) jours à compter de la notification écrite
du litige par lettre recommandée avec accusé de réception.`
            },
            {
              title: "2.13.3. Recoursà l'arbitrage",
              content: `Si la négociation directe et la médiation échouent, tout litige relatif à la validité,
l'interprétation, l'exécution ou la résiliation du présent contrat sera soumis
exclusivement à l'arbitrage, à l'exception de l'exécution forcée de la sentence
arbitrale.`
            },
            {
              title: "2.13.4. Arbitrage adhoc,désignation, lieu, langue et procédure arbitrale.",
              content: `Tout différend né de l'exécution ou de l'interprétation du présent contrat sera
définitivement tranché par la Cour d'Arbitrage du Togo (CATO),, conformément
au règlement de procédure et d'arbitrage de la CCJA.

Le lieu de l'arbitrage est fixé à Lomé en République du Togo. La procédure se
déroulera en langue française. Le nombre d'arbitres sera déterminé par
compromis. Tout désaccord relatif à la désignation ou au nombre d'arbitres
sera soumis au président du tribunal de commerce de Lomé.`
            },
            {
              title: "2.13.5. Engagementde collaboration",
              content: `Les parties s'engagent à collaborer de bonne foi tout au long de la procédure
arbitrale, en fournissant, dans les délais impartis, tous les documents,
informations et éléments nécessaires à son bon déroulement.`
            },
            {
              title: "2.13.6. Caractère définitif et répartitiondes frais",
              content: `La sentence arbitrale sera définitive, contraignante et immédiatement
exécutoire, sans possibilité d'appel, sauf dans les limites prévues par la loi. Les
frais d'arbitrage seront répartis à parts égales entre les parties, sauf décision
contraire de l'arbitre.`
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
