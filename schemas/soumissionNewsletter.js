import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'soumissionNewsletter',
  title: 'Soumission newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Page ou bloc d’où provient l’inscription',
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
      title: 'email',
      source: 'source',
      submittedAt: 'submittedAt',
    },
    prepare({ title, source, submittedAt }) {
      return {
        title: title || 'Soumission',
        subtitle: [source, submittedAt].filter(Boolean).join(' · '),
      }
    },
  },
})