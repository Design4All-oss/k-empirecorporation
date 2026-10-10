import { defineField, defineType } from 'sanity'
import AutoExcerptInput from '../components/AutoExcerptInput.jsx'

export default defineType({
  name: 'formation',
  title: 'Formation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: "Titre public de la formation. Affiché dans le catalogue, en haut de la page de la formation et dans les résultats de recherche.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Identifiant utilisé dans l'URL (/formations/...). Généré automatiquement depuis le titre ; ne le modifiez que si l'URL n'a pas encore été diffusée.",
      options: { source: 'title', maxLength: 120 },
    }),
    defineField({
      name: 'hook',
      title: 'Accroche',
      type: 'text',
      rows: 3,
      description: "Phrase d'accroche de deux à trois lignes, affichée sous le titre et sur les cartes du catalogue. Ex. : Renforcer les capacités de vos équipes en gestion des risques.",
      components: {
        input: AutoExcerptInput,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: "Texte de présentation affiché dans le bloc « Contexte » de la page de la formation.",
    }),
    defineField({
      name: 'content',
      title: 'Contenu détaillé',
      type: 'array',
      description: "Corps de la page : texte enrichi et images insérés après la présentation de la formation.",
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      description: "Visuel principal de la formation, utilisé sur les cartes et en partage. Format paysage sans texte incrusté. Ex. : 1600 × 900 px.",
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
      name: 'formationType',
      title: 'Type de formation',
      type: 'string',
      description: "Catégorie de programme délivré, affichée en badge sur les cartes et utilisée par le filtre du catalogue. Ex. : Executive Certificate.",
      options: {
        list: [
          { title: 'Executive Master Class', value: 'Executive Master Class' },
          { title: 'Executive Certificate', value: 'Executive Certificate' },
          { title: 'Séminaire International', value: 'Séminaire International' },
        ],
      },
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: "Modalité de déroulement, affichée sur les cartes et dans le bloc d'informations pratiques.",
      options: {
        list: [
          { title: 'Visioconférence', value: 'Visioconférence' },
          { title: 'Présentiel', value: 'Présentiel' },
          { title: 'Hybride', value: 'Hybride' },
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: "Durée totale de la formation, affichée sur les cartes et dans le bloc d'informations pratiques. Ex. : 02 mois.",
    }),
    defineField({
      name: 'audience',
      title: 'Public concerné',
      type: 'string',
      description: "Profils auxquels la formation s'adresse. Ex. : Décideurs, juristes, responsables conformité.",
    }),
    defineField({
      name: 'methodology',
      title: 'Méthodologie',
      type: 'array',
      description: "Modes de travail employés pendant la formation, listés un par ligne. Ex. : Études de cas.",
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      description: "Cochez pour afficher la formation en tête de catalogue et sur la page d'accueil.",
      initialValue: false,
    }),
    defineField({
      name: 'trainers',
      title: 'Profil des intervenants',
      type: 'array',
      description: "Personnes qui interviennent pendant la formation : nom, rôle, biographie et photo.",
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
      title: 'Architecture du programme',
      type: 'array',
      description: "Détail de chaque module de la formation, affiché dans le bloc « Architecture du programme » de la page.",
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
      description: "Ce que le participant saura faire à la fin de la formation. Un objectif par ligne, affiché avec une coche.",
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
      description: "Bloc à compléter en priorité : dates, tarifs et modalités affichés sur la page et lus par le formulaire d'inscription. Les tarifs restent masqués sur le site public.",
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
          name: 'registrationDeadline',
          title: 'Date limite d\'inscription',
          type: 'date',
        }),
        defineField({
          name: 'priceIndividual',
          title: 'Tarif individuel (XOF)',
          type: 'number',
          description: 'Montant en XOF par participant en inscription individuelle. Laisser vide si la formation est gratuite.',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'priceInstitution',
          title: 'Tarif institutionnel (XOF, par participant)',
          type: 'number',
          description: 'Montant en XOF par participant en inscription institutionnelle. Laisser vide si la formation est gratuite.',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'capacity',
          title: 'Places disponibles',
          type: 'number',
        }),
        defineField({
          name: 'placesLabel',
          title: 'Places (texte)',
          type: 'string',
          description: 'Ex : Cohorte exécutive limitée',
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
          name: 'admission',
          title: 'Admission',
          type: 'string',
          description: 'Ex : Sur étude de dossier',
        }),
        defineField({
          name: 'certification',
          title: 'Certification',
          type: 'string',
        }),
        defineField({
          name: 'attestation',
          title: 'Attestation',
          type: 'string',
          options: {
            list: [
              'Executive Certificate',
              'certificat de compétence',
              'Attestation de participation',
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'lienPresentation',
      title: 'Lien de présentation (PDF)',
      type: 'url',
      description: "Lien Google Drive vers la brochure PDF de la formation. Le bouton de téléchargement n'apparaît pas si le champ est laissé vide.",
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      description: "Date et heure de publication. Sert à classer les formations de la plus récente à la plus ancienne.",
      initialValue: () => new Date().toISOString(),
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