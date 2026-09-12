import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'soumissionDevis',
  title: 'Soumission devis',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Nom complet',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Organisation',
      type: 'string',
    }),
    defineField({
      name: 'function',
      title: 'Fonction',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Pays',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Objet',
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
      initialValue: 'nouveau',
      options: {
        list: [
          { title: 'Nouveau', value: 'nouveau' },
          { title: 'En cours', value: 'en cours' },
          { title: 'Traité', value: 'traité' },
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
      title: 'fullName',
      subject: 'subject',
      submittedAt: 'submittedAt',
    },
    prepare({ title, subject, submittedAt }) {
      return {
        title: title || 'Soumission',
        subtitle: [subject, submittedAt].filter(Boolean).join(' · '),
      }
    },
  },
})