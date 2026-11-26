import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nom A→Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 120 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Pour organiser les catégories dans l\'ordre souhaité (plus petit = plus haut)',
      initialValue: 100,
    }),
    defineField({
      name: 'programType',
      title: 'Type de programme',
      type: 'string',
      description: 'Catégorie principale du programme',
      options: {
        list: [
          { title: 'Executive Certificate', value: 'Executive Certificate' },
          { title: 'INTRA / INTER', value: 'INTRA / INTER' },
          { title: 'Executive Masterclass', value: 'Executive Masterclass' },
          { title: 'Formation complémentaire', value: 'Formation complémentaire' },
        ],
      },
    }),
    defineField({
      name: 'programCode',
      title: 'Code du programme',
      type: 'string',
      description: 'Ex : EC-01, DA, BNQ, IEX, SPE, MSL, AGF, AME, EM-01',
    }),
  ],
  preview: {
    select: { title: 'name', programType: 'programType', programCode: 'programCode', order: 'order' },
    prepare({ title, programType, programCode, order }) {
      return {
        title: title || 'Catégorie',
        subtitle: [programCode, programType, order != null ? `#${order}` : ''].filter(Boolean).join(' · '),
      }
    },
  },
})