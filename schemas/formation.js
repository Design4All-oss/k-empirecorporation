import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'formation',
  title: 'Formation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 120 },
    }),
    defineField({
      name: 'hook',
      title: 'Accroche',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'content',
      title: 'Contenu détaillé',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      options: {
        disableNew: false,
      },
    }),
    defineField({
      name: 'reconnaissance',
      title: 'Type de reconnaissance',
      type: 'string',
      description: "Ce qui est délivré à l'issue de ce programme",
      options: {
        list: [
          { title: 'Certification reconnue', value: 'certification' },
          { title: 'Attestation de participation', value: 'attestation' },
        ],
      },
    }),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      options: {
        list: [
          { title: 'Débutant', value: 'Débutant' },
          { title: 'Intermédiaire', value: 'Intermédiaire' },
          { title: 'Avancé', value: 'Avancé' },
        ],
      },
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'Ex : Présentiel, En ligne, Hybride',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex : 2 jours',
    }),
    defineField({
      name: 'audience',
      title: 'Public concerné',
      type: 'string',
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prérequis',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'trainers',
      title: 'Formateur·rices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nom', type: 'string' }),
            defineField({ name: 'role', title: 'Rôle', type: 'string' }),
            defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'program',
      title: 'Programme',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'module',
          fields: [
            defineField({ name: 'title', title: 'Titre du module', type: 'string' }),
            defineField({
              name: 'content',
              title: 'Contenu',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'objectives',
      title: 'Objectifs pédagogiques',
      type: 'array',
      of: [
        defineField({
          name: 'objective',
          title: 'Objectif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'practical',
      title: 'Informations pratiques',
      type: 'object',
      fields: [
        defineField({
          name: 'location',
          title: 'Lieu',
          type: 'string',
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
        }),
        defineField({
          name: 'price',
          title: 'Prix',
          type: 'string',
          description: 'Ex : 250 € / tarif réduit, ou « payant·e ou gratuit·e »',
        }),
        defineField({
          name: 'capacity',
          title: 'Places disponibles',
          type: 'number',
        }),
        defineField({
          name: 'duration',
          title: 'Durée (précision)',
          type: 'string',
        }),
        defineField({
          name: 'schedule',
          title: 'Planning',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'materials',
          title: 'Matériel fourni',
          type: 'string',
        }),
        defineField({
          name: 'evaluation',
          title: 'Évaluation',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'registerLink',
      title: 'Lien d’inscription',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'coverImage',
    },
  },
})