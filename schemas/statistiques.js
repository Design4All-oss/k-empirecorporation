import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statistiques',
  title: 'Statistiques',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Chiffres clés',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Valeur',
              type: 'string',
              description: 'Ex : 2000+, 25+, 98%',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
            },
            prepare({ value, label }) {
              return { title: `${value || '—'} ${label || ''}` }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Statistiques', subtitle: 'Chiffres officiels du cabinet' }
    },
  },
})