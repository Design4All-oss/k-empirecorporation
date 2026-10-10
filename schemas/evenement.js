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
      description: "Titre public de l'événement, affiché en gros dans le héros et dans les listes d'événements.",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: "Identifiant utilisé dans l'URL (/event/...). Généré depuis le titre ; ne le modifiez que si l'URL est déjà diffusée.",
      type: 'slug',
      options: { source: 'title', maxLength: 120 },
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      description: "Brouillon = invisible sur le site. Passer à « publié » pour mettre l'événement en ligne ; seuls les événements publiés sont affichés.",
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
      description: "Résumé de deux à trois lignes utilisé pour la description SEO et les partages. Ex. : Programme intensif de trois jours sur la gouvernance des risques.",
      type: 'text',
      rows: 3,
      components: {
        input: AutoExcerptInput,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      description: "Visuel principal, affiché en arrière-plan du héros à faible opacité. Format paysage sans texte incrusté. Ex. : 1600 × 900 px.",
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
      name: 'type',
      title: 'Type',
      type: 'string',
      description: "Nature de l'événement, utilisée pour le classement interne. Non affichée sur le site. Ex. : Executive Education.",
    }),
    defineField({
      name: 'startDateTime',
      title: 'Début',
      description: "Date et heure de début, utilisées pour trier les événements et pré-remplir le formulaire d'inscription.",
      type: 'datetime',
    }),
    defineField({
      name: 'endDateTime',
      title: 'Fin',
      description: "Date et heure de fin de l'événement.",
      type: 'datetime',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: "Durée totale, donnée informative. Non affichée sur le site. Ex. : 3 jours.",
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: "Modalité de l'événement, affichée dans le récapitulatif du formulaire d'inscription. Ex. : Visioconférence.",
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      description: "Lieu de l'événement, affiché dans le formulaire d'inscription et dans les données SEO. Ex. : Lomé & Kpalimé, Togo.",
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'string',
      description: "Tarif de l'événement. Le site affiche uniquement « Événement payant » ou « Événement gratuit », jamais le montant. Ex. : payant.",
    }),
    defineField({
      name: 'registered',
      title: 'Inscrits',
      description: "Nombre de personnes déjà inscrites, affiché sur les cartes d'événement.",
      type: 'number',
    }),

    // ══ Gabarit éditorial « Page événement » ════════════════════
    // Chaque section n'est affichée que si ses données sont renseignées.
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: "Deuxième bloc de texte du héros, affiché sous le titre en corps plus grand.",
    }),
    defineField({
      name: 'tagline',
      title: 'Accroche complémentaire',
      type: 'string',
      description: "Phrase courte sous le sous-titre, en gris, qui donne le contexte de l'événement.",
    }),
    defineField({
      name: 'dateLine',
      title: 'Ligne dates & lieux',
      type: 'string',
      description: "Ligne de dates et de lieux affichée au-dessus du titre dans le héros. Ex. : 17 – 18 – 19 DÉCEMBRE 2026 · LOMÉ & KPALIMÉ, TOGO.",
    }),
    defineField({
      name: 'heroIntro',
      title: 'Introduction (hero)',
      description: "Chapeau affiché juste sous le héros, en début de page. Un paragraphe de deux à quatre phrases.",
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'ctas',
      title: 'Boutons (hero)',
      type: 'array',
      description: "Boutons du héros. Le premier bouton est le bouton principal ; un bouton sans lien ouvre le formulaire d'inscription.",
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Libellé', type: 'string' }),
            defineField({ name: 'url', title: 'Lien', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'regard',
      title: 'L\'événement en un regard',
      description: "Tableau affiché à droite du titre dans le héros : paires libellé / valeur. Ex. : Format — Présentiel.",
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Information', type: 'string' }),
            defineField({ name: 'valeur', title: 'Détail', type: 'text', rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'L\'événement en chiffres',
      description: "Section 01 · Chiffres : valeurs et libellés des statistiques de l'événement. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Chiffres',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Valeur', type: 'string' }),
                defineField({ name: 'label', title: 'Libellé', type: 'string' }),
              ],
            }),
          ],
        }),
        defineField({ name: 'note', title: 'Note de bas de bloc', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'pourquoi',
      title: 'Pourquoi ce programme ?',
      description: "Section 02 · Pourquoi ce programme : accroche et avantages numérotés. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Accroche', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Blocs',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'titre', title: 'Titre', type: 'string' }),
                defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 4 }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'gouvernance',
      title: 'Gouvernance scientifique',
      description: "Section 03 · Gouvernance scientifique : rôles et membres du comité. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 4 }),
        defineField({
          name: 'items',
          title: 'Fonctions',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'titre', title: 'Fonction', type: 'string' }),
                defineField({ name: 'fonction', title: 'Nature de la fonction', type: 'string' }),
                defineField({ name: 'texte', title: 'Description', type: 'text', rows: 5 }),
              ],
            }),
          ],
        }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'faculty',
      title: 'The Faculty',
      description: "Section 04 · The Faculty : accroche, paragraphe et liste des intervenants. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Accroche', type: 'string' }),
        defineField({ name: 'texte', title: 'Paragraphe', type: 'text', rows: 4 }),
        defineField({
          name: 'noms',
          title: 'Liste des formateurs',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
        defineField({ name: 'ctaLabel', title: 'Libellé du bouton', type: 'string' }),
      ],
    }),
    defineField({
      name: 'parcours',
      title: 'Le programme',
      description: "Section 05 · Le programme : un bloc par jour, avec horaires, séances et note de clôture. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3 }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 4 }),
        defineField({
          name: 'jours',
          title: 'Journées',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Titre du jour', type: 'string' }),
                defineField({ name: 'lieu', title: 'Lieu', type: 'string' }),
                defineField({ name: 'date', title: 'Date', type: 'string' }),
                defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 4 }),
                defineField({
                  name: 'items',
                  title: 'Modules / points',
                  type: 'array',
                  of: [
                    defineField({
                      type: 'object',
                      fields: [
                        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
                        defineField({ name: 'texte', title: 'Transformation / texte', type: 'text', rows: 4 }),
                      ],
                    }),
                  ],
                }),
                defineField({
                  name: 'points',
                  title: 'Points (liste à puces)',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({ name: 'pied', title: 'Note de fin de journée', type: 'text', rows: 3 }),
                defineField({ name: 'closing', title: 'Événement de clôture', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'pedagogie',
      title: 'Pédagogie',
      description: "Section 06 · Pédagogie : modes de travail et note de bas de bloc. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Piliers méthodologiques',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'participer',
      title: 'Qui participe ?',
      description: "Section 07 · Qui participe : profils admis à l'événement. Laisser vide pour masquer la section.",
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({ name: 'titre', title: 'Profil', type: 'string' }),
            defineField({ name: 'texte', title: 'Description', type: 'text', rows: 3 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'experience',
      title: 'L\'expérience K-EMPIRE',
      description: "Section 08 · L'expérience K-EMPIRE : caractéristiques de l'expérience vécue. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Introduction', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Temps forts',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'titre', title: 'Titre', type: 'string' }),
                defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'livrables',
      title: 'Livrables & bénéfices',
      description: "Section 09 · Livrables & bénéfices : ce que le participant repart avec. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({ name: 'intro', title: 'Introduction', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Livrables',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'partenaires',
      title: 'Partenaires & institutions',
      description: "Section 10 · Partenaires & institutions : organismes associés, classés par catégorie. Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Partenaires',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'categorie', title: 'Catégorie', type: 'string' }),
                defineField({ name: 'titre', title: 'Nom', type: 'string' }),
                defineField({ name: 'texte', title: 'Description', type: 'text', rows: 3 }),
              ],
            }),
          ],
        }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'infosPratiques',
      title: 'Informations pratiques',
      description: "Section 11 · Informations pratiques : paires libellé / valeur (dates, lieux, inscriptions). Laisser vide pour masquer la section.",
      type: 'object',
      fields: [
        defineField({
          name: 'rows',
          title: 'Lignes',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Information', type: 'string' }),
                defineField({ name: 'valeur', title: 'Détail', type: 'text', rows: 2 }),
              ],
            }),
          ],
        }),
        defineField({ name: 'note', title: 'Note', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Foire aux questions',
      description: "Section 12 · Foire aux questions : questions et réponses dépliables. Laisser vide pour masquer la section.",
      type: 'array',
      of: [
        defineField({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 4 }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaFinal',
      title: 'Appel à l\'action final',
      description: "Bandeau final de la page : titre et texte d'appel à l'action, affichés juste avant le formulaire d'inscription.",
      type: 'object',
      fields: [
        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
        defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'internalNotes',
      title: 'Notes internes (jamais affichées)',
      type: 'text',
      rows: 8,
      description: "Points de vigilance à arbitrer avant diffusion. Jamais affiché sur le site ni envoyé au navigateur.",
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      description: "Date et heure de publication, utilisées pour classer les événements du plus récent au plus ancien.",
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