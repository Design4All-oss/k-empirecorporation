import { defineField, defineType } from 'sanity'

const valeur = {
  type: 'object',
  name: 'valeur',
  fields: [
    defineField({
      name: 'titre',
      title: 'Valeur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { titre: 'titre' },
    prepare({ titre }) {
      return { title: titre || 'Valeur' }
    },
  },
}

export default defineType({
  name: 'valeurs',
  title: 'Valeurs',
  type: 'document',
  fields: [
    defineField({
      name: 'titreGroupe1',
      title: 'Titre du groupe 1',
      type: 'string',
      initialValue: 'Nos valeurs',
    }),
    defineField({
      name: 'groupe1',
      title: 'Groupe 1 — valeurs fondamentales',
      type: 'array',
      of: [valeur],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'titreGroupe2',
      title: 'Titre du groupe 2',
      type: 'string',
      initialValue: 'Notre engagement à vos côtés',
    }),
    defineField({
      name: 'groupe2',
      title: 'Groupe 2 — notre engagement à vos côtés',
      type: 'array',
      of: [valeur],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Valeurs', subtitle: 'Charte officielle en deux groupes' }
    },
  },
})