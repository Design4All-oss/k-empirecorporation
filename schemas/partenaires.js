import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partenaires',
  title: 'Partenaires',
  type: 'document',
  fields: [
    defineField({
      name: 'logos',
      title: 'Logos des partenaires',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'nom',
              title: 'Nom du partenaire',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'nom', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Partenaires' }
    },
  },
})
