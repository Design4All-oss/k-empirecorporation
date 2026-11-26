import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'soumissionRdv',
  title: 'Soumission rendez-vous',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
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
      name: 'date',
      title: 'Date souhaitée',
      type: 'date',
    }),
    defineField({
      name: 'time',
      title: 'Heure souhaitée',
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
      title: 'name',
      date: 'date',
      submittedAt: 'submittedAt',
    },
    prepare({ title, date, submittedAt }) {
      return {
        title: title || 'Soumission',
        subtitle: [date, submittedAt].filter(Boolean).join(' · '),
      }
    },
  },
})