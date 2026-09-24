import { defineField, defineType } from 'sanity'

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