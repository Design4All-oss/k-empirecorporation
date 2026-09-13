import { defineField, defineType } from 'sanity'
import AutoExcerptInput from '../components/AutoExcerptInput.jsx'

export default defineType({
  name: 'evenement',
  title: 'Événement',
  type: 'document',
  orderings: [
    {
      title: 'Date de début',
      name: 'startDateTimeAsc',
      by: [{ field: 'startDateTime', direction: 'asc' }],
    },
    {
      title: 'Titre A→Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
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
      name: 'status',
      title: 'Statut',
      type: 'string',
      initialValue: 'brouillon',
      options: {
        list: [
          { title: 'Brouillon', value: 'brouillon' },
          { title: 'Publié', value: 'publié' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      components: {
        input: AutoExcerptInput,
      },
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
      name: 'programme',
      title: 'Programme',
      type: 'array',
      of: [{ type: 'block' }],
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
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Ex : Atelier, Conférence, Séminaire, Webinaire',
    }),
    defineField({
      name: 'startDateTime',
      title: 'Début',
      type: 'datetime',
    }),
    defineField({
      name: 'endDateTime',
      title: 'Fin',
      type: 'datetime',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex : 2 h',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'Ex : Présentiel, En ligne, Hybride',
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'intervenants',
      title: 'Intervenant·es',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'intervenant',
          fields: [
            defineField({ name: 'nom', title: 'Nom', type: 'string' }),
            defineField({ name: 'fonction', title: 'Fonction', type: 'string' }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'string',
      description: 'Ex : payant·e ou gratuit·e, tarif en €…',
    }),
    defineField({
      name: 'capacity',
      title: 'Places disponibles',
      type: 'number',
    }),
    defineField({
      name: 'registered',
      title: 'Inscrits',
      type: 'number',
    }),
    defineField({
      name: 'lienPresentation',
      title: 'Lien de présentation (PDF)',
      type: 'url',
      description: 'Lien Google Drive vers le document de présentation de l\'événement',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'coverImage',
      publishedAt: 'publishedAt',
      startDateTime: 'startDateTime',
    },
    prepare({ title, subtitle, media, publishedAt, startDateTime }) {
      const status = subtitle === 'publié' ? '✓ Publié' : '○ Brouillon'
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('fr-FR')
        : startDateTime
          ? new Date(startDateTime).toLocaleDateString('fr-FR')
          : ''
      return {
        title: title || 'Événement',
        subtitle: [status, date].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})