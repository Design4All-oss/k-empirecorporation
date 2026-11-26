import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'session',
  title: 'Session de formation',
  type: 'document',
  fields: [
    defineField({
      name: 'formation',
      title: 'Formation',
      type: 'reference',
      to: [{ type: 'formation' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin',
      type: 'date',
      description: 'Optionnelle, si la session s’étend sur plusieurs jours',
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'Ex : Présentiel, En ligne, Hybride',
    }),
    defineField({
      name: 'places',
      title: 'Places disponibles',
      type: 'number',
    }),
    defineField({
      name: 'statut',
      title: 'Statut',
      type: 'string',
      initialValue: 'à venir',
      options: {
        list: [
          { title: 'À venir', value: 'à venir' },
          { title: 'En cours', value: 'en cours' },
          { title: 'Terminée', value: 'terminée' },
          { title: 'Annulée', value: 'annulée' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'formation.title',
      startDate: 'startDate',
      lieu: 'lieu',
    },
    prepare({ title, startDate, lieu }) {
      return {
        title: title || 'Session',
        subtitle: [startDate, lieu].filter(Boolean).join(' · '),
      }
    },
  },
})