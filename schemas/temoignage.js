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
    defineField({
      name: 'consentement',
      title: 'Consentement du client',
      type: 'boolean',
      initialValue: false,
      description:
        'Le client a donné son accord écrit pour la publication de ce témoignage. Obligatoire avant toute publication.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'nom',
      structure: 'structure',
      consentement: 'consentement',
    },
    prepare({ title, structure, consentement }) {
      return {
        title: title || 'Témoignage',
        subtitle: [structure, consentement ? 'consentement OK' : 'sans consentement'].filter(Boolean).join(' · '),
      }
    },
  },
})