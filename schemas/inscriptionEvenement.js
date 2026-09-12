import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inscriptionEvenement',
  title: 'Inscription événement',
  type: 'document',
  fields: [
    defineField({
      name: 'evenement',
      title: 'Événement',
      type: 'reference',
      to: [{ type: 'evenement' }],
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
      name: 'evenement_slug',
      title: 'Slug événement (source)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'evenement_id',
      title: 'ID événement (source)',
      type: 'string',
      readOnly: true,
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
      evenementTitle: 'evenement.title',
      submittedAt: 'submittedAt',
    },
    prepare({ title, evenementTitle, submittedAt }) {
      return {
        title: title || 'Inscription',
        subtitle: [evenementTitle, submittedAt].filter(Boolean).join(' · '),
      }
    },
  },
})