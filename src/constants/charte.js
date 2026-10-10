/**
 * Contenu officiel du cabinet — source unique pour le seed Sanity ET les fallbacks.
 * Module ESM pur (sans dépendance React/Vite) afin d'être importable par
 * l'application (fallback quand Sanity n'est pas configuré) et par
 * scripts/seed-site-content.mjs (import en base).
 */

export const CHARTE_VALEURS = {
  titreGroupe1: 'Nos valeurs',
  groupe1: [
    {
      titre: 'Intégrité',
      description:
        'Nous agissons avec éthique, transparence et respect de nos engagements.',
    },
    {
      titre: 'Célérité',
      description:
        'Nous répondons vite et agissons avec réactivité, sans jamais sacrifier la qualité.',
    },
    {
      titre: 'Sécurité',
      description:
        'Nous sécurisons vos opérations, vos données et vos décisions stratégiques.',
    },
    {
      titre: 'Professionnalisme',
      description:
        'Une exigence constante dans nos analyses, nos conseils et nos formations.',
    },
  ],
  titreGroupe2: 'Notre engagement à vos côtés',
  groupe2: [
    {
      titre: 'Proximité',
      description:
        'Une équipe à l’écoute, disponible et impliquée à chaque étape de votre projet.',
    },
    {
      titre: 'Pragmatisme',
      description:
        'Des recommandations concrètes, adaptées à votre réalité et tournées vers des résultats mesurables.',
    },
    {
      titre: 'Qualité',
      description:
        'La rigueur et l’excellence au cœur de chaque mission et de chaque formation.',
    },
    {
      titre: 'Innovation',
      description:
        'Des contenus, méthodes et outils en phase avec les enjeux économiques, juridiques et managériaux.',
    },
  ],
}
