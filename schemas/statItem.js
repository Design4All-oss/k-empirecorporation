import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statItem',
  title: 'Statistique',
  type: 'object',
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
})