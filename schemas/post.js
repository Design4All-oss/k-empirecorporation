import { defineField, defineType } from 'sanity'
import AutoExcerptInput from '../components/AutoExcerptInput.jsx'

export default defineType({
  name: 'post',
  title: 'Article',
  type: 'document',
  orderings: [
    {
      title: 'Date de publication',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
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
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'author',
      title: 'Auteur·rice',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Ex : 5 min',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, subtitle, media, publishedAt }) {
      const status = subtitle === 'publié' ? '✓ Publié' : '○ Brouillon'
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('fr-FR') : ''
      return {
        title: title || 'Article',
        subtitle: [status, date].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})