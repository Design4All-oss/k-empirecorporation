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

export const STATISTIQUES_DEFAULT = {
  items: [
    {
      value: '2000+',
      label: 'Professionnels formés',
      text: 'Plus de 2000 professionnels ont renforcé leurs compétences lors de nos formations et programmes certifiants.',
    },
    {
      value: '25+',
      label: 'Nationalités représentées',
      text: 'Des entreprises, institutions et professionnels issus de plus de 25 pays nous font confiance.',
    },
    {
      value: '98%',
      label: 'Taux de satisfaction',
      text: 'La grande majorité de nos clients recommandent nos services et nos formations.',
    },
  ],
}

/**
 * Témoignages provisoires (placeholders de mise en page).
 * consentement = false : ils ne sont donc jamais publiés via Sanity (le GROQ
 * filtre consentement == true) et ne servent que de fallback d'affichage.
 */
export const TEMOIGNAGES_SEED = [
  {
    nom: 'Herman Miller',
    fonction: '',
    structure: 'Herman Miller',
    texte:
      "L'accompagnement de K-EMPIRE a transformé notre approche stratégique. Une équipe rigoureuse et à l'écoute de nos enjeux.",
    image: 'testimonials-01.png',
    consentement: false,
  },
  {
    nom: 'Monday',
    fonction: '',
    structure: 'Monday',
    texte:
      'Un partenaire de confiance qui a su structurer notre croissance tout en sécurisant nos opérations juridiques.',
    image: 'testimonials-02.png',
    consentement: false,
  },
  {
    nom: 'Invision',
    fonction: '',
    structure: 'Invision',
    texte:
      'Des recommandations concrètes et immédiatement applicables. Leur pragmatisme fait toute la différence.',
    image: 'testimonials-03.png',
    consentement: false,
  },
]
