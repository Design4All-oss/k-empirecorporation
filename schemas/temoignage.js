import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fonction',
      title: 'Fonction',
      type: 'string',
    }),
    defineField({
      name: 'structure',
      title: 'Structure / Entreprise',
      type: 'string',
    }),
    defineField({
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo de la personne (optionnelle)',
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      structure: 'structure',
      fonction: 'fonction',
    },
    prepare({ title, structure, fonction }) {
      return {
        title: title || 'Témoignage',
        subtitle: [fonction, structure].filter(Boolean).join(' · '),
      }
    },
  },
})