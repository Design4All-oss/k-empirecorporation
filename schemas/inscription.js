import { defineField, defineType } from 'sanity'

// Union des moyens de paiement des deux branches (individuelle / institutionnelle)
const MOYENS_PAIEMENT = [
  'Dépôt/virement bancaire',
  'Chèque (ordre K-EMPIRE CORPORATION)',
  'Transfert monétaire (Ria, MoneyGram, Western Union)',
  'Mobile money (Moov Money, Mix by Yas, Orange Money)',
  'Espèce au siège K-EMPIRE (Kara)',
  'Espèce au siège Cabinet CEC (Lomé)',
  'Espèce auprès partenaires OHADA',
  'Virement bancaire',
  'Chèque',
  'Transfert monétaire',
  'Espèce siège K-EMPIRE',
  'Espèce partenaires OHADA',
]

export default defineType({
  name: 'inscription',
  title: 'Inscription formation',
  type: 'document',
  fields: [
    defineField({
      name: 'formation',
      title: 'Formation',
      type: 'reference',
      to: [{ type: 'formation' }],
      description: 'Rempli automatiquement via le formulaire du site',
    }),
    defineField({
      name: 'session',
      title: 'Session choisie',
      type: 'reference',
      to: [{ type: 'session' }],
      description: 'Rempli automatiquement via le formulaire du site',
    }),
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'telephone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'fonction',
      title: 'Fonction',
      type: 'string',
    }),
    defineField({
      name: 'entreprise',
      title: 'Entreprise',
      type: 'string',
    }),
    defineField({
      name: 'formation_slug',
      title: 'Slug formation (source)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'formation_id',
      title: 'ID formation (source)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'session_id',
      title: 'ID session (source)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'type',
      title: "Type d'inscription",
      type: 'string',
      options: {
        list: [
          { title: 'Individuelle', value: 'individuelle' },
          { title: 'Institutionnelle', value: 'institutionnelle' },
        ],
      },
    }),
    defineField({
      name: 'denomination',
      title: "Dénomination de l'institution",
      type: 'string',
    }),
    defineField({
      name: 'rccm',
      title: 'RCCM',
      type: 'string',
    }),
    defineField({
      name: 'nif',
      title: 'NIF',
      type: 'string',
    }),
    defineField({
      name: 'siegeSocial',
      title: 'Siège social',
      type: 'string',
    }),
    defineField({
      name: 'responsableNom',
      title: "Nom du responsable de l'inscription",
      type: 'string',
    }),
    // ── CAS 1 — Individuelle ──────────────────────────────────
    defineField({
      name: 'civilite',
      title: 'Civilité',
      type: 'string',
      options: { list: ['M.', 'Mme'] },
    }),
    defineField({ name: 'prenom', title: 'Prénom(s)', type: 'string' }),
    defineField({ name: 'anniversaire', title: 'Anniversaire', type: 'date' }),
    defineField({ name: 'paysResidence', title: 'Pays de résidence', type: 'string' }),
    defineField({
      name: 'niveauEtudes',
      title: "Niveau d'études",
      type: 'string',
      options: { list: ['Licence', 'Master', 'Doctorat'] },
    }),
    defineField({
      name: 'experience',
      title: 'Expérience professionnelle (échelle 0-5)',
      type: 'string',
      options: { list: ['0', '1', '2', '3', '4', '5'] },
    }),
    defineField({ name: 'motivations', title: 'Motivations', type: 'text', rows: 4 }),
    defineField({ name: 'objectifsPro', title: 'Objectifs professionnels', type: 'text', rows: 4 }),
    defineField({ name: 'attentes', title: 'Attentes particulières', type: 'text', rows: 3 }),
    defineField({
      name: 'moyenPaiement',
      title: 'Moyen de paiement',
      type: 'string',
      options: { list: MOYENS_PAIEMENT },
    }),
    defineField({
      name: 'source',
      title: 'Comment avez-vous connu la formation ?',
      type: 'string',
      options: { list: ['LinkedIn', 'Facebook', 'Google', 'Newsletter', 'Autres'] },
    }),
    defineField({
      name: 'recevoirInfos',
      title: "Recevoir l'info sur d'autres formations",
      type: 'string',
      options: { list: ['Oui', 'Non'] },
    }),
    // ── CAS 2 — Institutionnelle ──────────────────────────────
    defineField({ name: 'raisonSociale', title: 'Raison sociale', type: 'string' }),
    defineField({ name: 'secteurActivite', title: "Secteur d'activité", type: 'string' }),
    defineField({ name: 'adressePostale', title: 'Adresse postale complète', type: 'text', rows: 3 }),
    defineField({ name: 'siteWeb', title: 'Site web', type: 'url' }),
    defineField({ name: 'responsableFonction', title: 'Fonction / Titre du responsable', type: 'string' }),
    defineField({ name: 'adresseFacturation', title: 'Adresse de facturation', type: 'text', rows: 3 }),
    defineField({ name: 'nbParticipants', title: 'Nombre total de participants', type: 'number' }),
    defineField({
      name: 'participants',
      title: 'Liste nominative des participants',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({ name: 'nom', title: 'Nom / prénom', type: 'string' }),
            defineField({ name: 'fonction', title: 'Fonction', type: 'string' }),
            defineField({ name: 'email', title: 'E-mail', type: 'string' }),
            defineField({ name: 'telephone', title: 'Téléphone', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'coordonneesBancaires',
      title: "Coordonnées bancaires de l'institution",
      type: 'text',
      rows: 3,
    }),
    // ── Conditions (commun aux deux cas) ──────────────────────
    defineField({
      name: 'conditionsGenerales',
      title: 'Conditions générales',
      type: 'string',
      options: { list: ['J’accepte', 'Je n’ai pas encore lu'] },
    }),
    defineField({
      name: 'autorisationDonnees',
      title: 'Autorisation de traitement des données',
      type: 'boolean',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Soumis le',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      initialValue: 'en attente',
      options: {
        list: [
          { title: 'En attente', value: 'en attente' },
          { title: 'Confirmée', value: 'confirmée' },
          { title: 'Annulée', value: 'annulée' },
        ],
      },
    }),
    defineField({
      name: 'internalNotes',
      title: 'Notes internes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      formationTitle: 'formation.title',
      submittedAt: 'submittedAt',
    },
    prepare({ title, formationTitle, submittedAt }) {
      return {
        title: title || 'Inscription',
        subtitle: [formationTitle, submittedAt].filter(Boolean).join(' · '),
      }
    },
  },
})