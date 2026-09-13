/**
 * Seed 6 blog articles into Sanity.
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=<your-token> node scripts/seed-blog.mjs
 *
 * Token needs "Editor" role on the dataset.
 * Get a token at: https://www.sanity.io/manage/personal/api
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

// Categories to reference (must exist in Sanity)
const CATEGORIES = {
  gouvernance: null,
  fiscalite: null,
  management: null,
  droit: null,
  comptabilite: null,
  negociation: null,
}

// Category name → slug mapping (adjust if your slugs differ)
const CATEGORY_SLUGS = {
  gouvernance: 'gouvernance',
  fiscalite: 'fiscalite',
  management: 'management',
  droit: 'droit',
  comptabilite: 'comptabilite',
  negociation: 'negociation',
}

async function resolveCategories() {
  for (const [key, slug] of Object.entries(CATEGORY_SLUGS)) {
    const doc = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug }
    )
    if (!doc) {
      console.error(`⚠ Category "${slug}" not found in Sanity. Create it first or update CATEGORY_SLUGS.`)
    } else {
      CATEGORIES[key] = doc
    }
  }
}

const AUTHOR_NAME = 'K-EMPIRE'

async function resolveAuthor() {
  const doc = await client.fetch(
    `*[_type == "author" && name == $name][0]._id`,
    { name: AUTHOR_NAME }
  )
  if (!doc) {
    console.log(`ℹ Author "${AUTHOR_NAME}" not found — articles will be created without author.`)
  }
  return doc || null
}

const now = new Date().toISOString()

const articles = [
  {
    _type: 'post',
    title: 'Les 5 erreurs de gouvernance qui freinent la croissance des PME au Togo',
    slug: { _type: 'slug', current: '5-erreurs-gouvernance-pme-togo' },
    status: 'publié',
    excerpt: 'Les pièges les plus fréquents en gouvernance d\'entreprise et comment les éviter pour assurer une croissance durable.',
    publishedAt: now,
    featured: true,
    readTime: '7 min',
    tags: ['Gouvernance', 'PME', 'Togo', 'Croissance'],
    _rawBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'La gouvernance d\'entreprise est au cœur de la pérennité des PME au Togo. Pourtant, de nombreux dirigeants commettent des erreurs récurrentes qui freinent leur développement. Voici les 5 pièges les plus courants et comment les surmonter.' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: '1. L\'absence de séparation des rôles' }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Dans de nombreuses PME togolaises, le dirigeant cumule les fonctions de président, directeur général et trésorier. Cette confusion des rôles crée des risques de conflits d\'intérêts et empêche un contrôle interne efficace.' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: '2. Le manque de transparence financière' }],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: 'Sans états financiers réguliers et fiables, impossible de prendre des décisions éclairées ou de rassurer les investisseurs. La digitalisation de la comptabilité est un premier pas essentiel.' }],
      },
      {
        _type: 'block',
        _key: 'b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 's6', text: '3. L\'absence de conseil d\'administration' }],
      },
      {
        _type: 'block',
        _key: 'b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 's7', text: 'Un conseil d\'administration, même restreint, apporte un regard externe et une expertise précieuse. Il constitue un filet de sécurité stratégique que beaucoup de PME négligent.' }],
      },
      {
        _type: 'block',
        _key: 'b8',
        style: 'h2',
        children: [{ _type: 'span', _key: 's8', text: '4. La succession non préparée' }],
      },
      {
        _type: 'block',
        key: 'b9',
        style: 'normal',
        children: [{ _type: 'span', _key: 's9', text: 'Le départ imprévu d\'un fondateur peut mettre en péril toute l\'entreprise. Planifier la relève dès le début est un signe de maturité organisationnelle.' }],
      },
      {
        _type: 'block',
        _key: 'b10',
        style: 'h2',
        children: [{ _type: 'span', _key: 's10', text: '5. Le refus de déléguer' }],
      },
      {
        _type: 'block',
        _key: 'b11',
        style: 'normal',
        children: [{ _type: 'span', _key: 's11', text: 'Le micro-management freinit la croissance et démotive les équipes. Un bon dirigeant sait s\'entourer et faire confiance à ses collaborateurs.' }],
      },
      {
        _type: 'block',
        _key: 'b12',
        style: 'h2',
        children: [{ _type: 'span', _key: 's12', text: 'Conclusion' }],
      },
      {
        _type: 'block',
        _key: 'b13',
        style: 'normal',
        children: [{ _type: 'span', _key: 's13', text: 'La gouvernance n\'est pas un luxe réservé aux grandes entreprises. C\'est un levier de croissance accessible à toute PME prête à s\'organiser et à se professionnaliser. K-EMPIRE Corporation accompagne les dirigeants dans cette transformation.' }],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Optimisation fiscale au Togo : ce que les dirigeants doivent savoir en 2026',
    slug: { _type: 'slug', current: 'optimisation-fiscale-togo-2026' },
    status: 'publié',
    excerpt: 'Les leviers légaux d\'optimisation fiscale pour les entreprises togolaises dans le contexte OHADA actuel.',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    featured: false,
    readTime: '6 min',
    tags: ['Fiscalité', 'Togo', 'OHADA', 'PME'],
    _rawBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'L\'optimisation fiscale est un enjeu stratégique pour les entreprises togolaises. Dans un cadre juridique en constante évolution, connaître les leviers disponibles est essentiel pour rester compétitif tout en respectant la loi.' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'Comprendre le cadre fiscal togolais' }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Le Togo impose les sociétés avec un impôt sur les sociétés (IS) dont le taux varie selon le chiffre d\'affaires. Le code général des impôts prévoit également des incitations fiscales pour certains secteurs et zones géographiques.' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Les leviers légaux d\'optimisation' }],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'list',
        listItem: 'bullet',
        children: [
          { _type: 'span', _key: 's5', text: 'Les zones franches et régimes douaniers spéciaux' },
          { _type: 'span', _key: 's6', text: 'Les incitations fiscales sectorielles (agriculture, numérique)' },
          { _type: 'span', _key: 's7', text: 'La réduction d\'impôt pour investissement en immobilier' },
          { _type: 'span', _key: 's8', text: 'Les crédits d\'impôt recherche et formation' },
        ],
      },
      {
        _type: 'block',
        _key: 'b9',
        style: 'h2',
        children: [{ _type: 'span', _key: 's9', text: 'Les erreurs à éviter' }],
      },
      {
        _type: 'block',
        _key: 'b10',
        style: 'normal',
        children: [{ _type: 'span', _key: 's10', text: 'L\'évasion fiscale et la fraude sont sévèrement punies. L\'optimisation fiscale légale se distingue de l\'évasion par son respect du cadre légal. Un cabinet spécialisé peut vous guider dans cette démarche.' }],
      },
      {
        _type: 'block',
        _key: 'b11',
        style: 'normal',
        children: [{ _type: 'span', _key: 's11', text: 'K-EMPIRE Corporation vous accompagne dans l\'optimisation de votre charge fiscale en toute conformité légale.' }],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Management interculturel : diriger une équipe multinationale au Togo',
    slug: { _type: 'slug', current: 'management-interculturel-equipe-multinationale-togo' },
    status: 'publié',
    excerpt: 'Les clés du leadership efficace dans un environnement professionnel multicultural, avec des cas pratiques.',
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    featured: false,
    readTime: '8 min',
    tags: ['Management', 'Leadership', 'Multiculturel', 'Togo'],
    _rawBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'Le Togo accueille de plus en plus d\'entreprises internationales et de collaborateurs de différentes origines. Le management interculturel devient alors un compétence clé pour tout dirigeant.' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'Pourquoi le management interculturel compte' }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Une équipe diverse est une équipe plus innovante, à condition d\'être bien managée. Les malentendus culturels peuvent engendrer des conflits inutiles et réduire la productivité.' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Les piliers du leadership interculturel' }],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: '1. L\'écoute active : comprendre les codes culturels de chaque collaborateur. 2. La flexibilité : adapter son style de management selon le contexte. 3. La communication explicite : ne jamais supposer que les règles sont universelles. 4. La valorisation de la diversité : en faire un atout plutôt qu\'un obstacle.' }],
      },
      {
        _type: 'block',
        _key: 'b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 's6', text: 'Cas pratique : résoudre un conflit interculturel' }],
      },
      {
        _type: 'block',
        _key: 'b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 's7', text: 'Un manager français attend des retours directs, tandis qu\'un collaborateur togolais privilégie l\'harmonie du groupe et évite la confrontation. Le manager interprète le silence comme un désaccord, alors qu\'il s\'agit en réalité d\'un signe de respect. La formation au management interculturel permet d\'éviter ces malentendus.' }],
      },
      {
        _type: 'block',
        _key: 'b8',
        style: 'normal',
        children: [{ _type: 'span', _key: 's8', text: 'K-EMPIRE Corporation propose des formations sur mesure en management interculturel pour les équipes expatriées et locales.' }],
      },
    ],
  },
  {
    _type: 'post',
    title: 'OHADA et droit des affaires : les réformes à connaître cette année',
    slug: { _type: 'slug', current: 'ohada-droit-affaires-reformes-2026' },
    status: 'publié',
    excerpt: 'Tour d\'horizon des évolutions réglementaires OHADA et de leur impact sur la gestion des entreprises.',
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(), // 14 days ago
    featured: false,
    readTime: '6 min',
    tags: ['Droit', 'OHADA', 'Réglementation', 'Entreprise'],
    _rawBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'L\'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires (OHADA) continue d\'évoluer pour s\'adapter aux réalités économiques du continent. Voici les principales réformes à connaître.' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'L\'Acte Uniforme sur le Droit des Sociétés Commerciales' }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Les dernières mises à jour simplifient les procédures de création d\'entreprise et renforcent les obligations de transparence pour les sociétés anonymes. La gouvernance interne devient un sujet central.' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Le droit des sûretés' }],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: 'Les nouvelles dispositions élargissent les garanties mobilisables par les PME pour accéder au crédit bancaire. Le gage sur stock et le nantissement de créances deviennent plus accessibles.' }],
      },
      {
        _type: 'block',
        _key: 'b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 's6', text: 'Impact pour votre entreprise' }],
      },
      {
        _type: 'block',
        _key: 'b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 's7', text: 'Ces évolutions nécessitent une mise à jour des statuts et des pratiques de gestion. Ne pas se conformer expose à des risques juridiques et financiers. K-EMPIRE Corporation vous accompagne dans l\'adaptation de vos documents et procédures.' }],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Digitaliser la comptabilité de votre PME : guide pratique',
    slug: { _type: 'slug', current: 'digitaliser-comptabilite-pme-guide-pratique' },
    status: 'publié',
    excerpt: 'Les étapes clés pour passer à la comptabilité numérique et optimiser la gestion financière.',
    publishedAt: new Date(Date.now() - 86400000 * 21).toISOString(), // 21 days ago
    featured: false,
    readTime: '7 min',
    tags: ['Comptabilité', 'Digital', 'PME', 'Outils'],
    _rawBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'La transformation numérique de la comptabilité n\'est plus un luxe, c\'est une nécessité. Les PME qui adoptent des outils numériques gagnent en efficacité et en fiabilité.' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'Pourquoi digitaliser sa comptabilité ?' }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'Gain de temps, réduction des erreurs, accès en temps réel aux données financières, conformité fiscale simplifiée. La digitalisation permet aux dirigeants de se concentrer sur l\'essentiel : piloter leur activité.' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Les 5 étapes de la transition' }],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: '1. Évaluer l\'état actuel de votre comptabilité. 2. Choisir un logiciel adapté à votre taille et secteur. 3. Former vos équipes. 4. Migrer les données historiques. 5. Mettre en place des processus de contrôle continu.' }],
      },
      {
        _type: 'block',
        _key: 'b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 's6', text: 'Choisir le bon outil' }],
      },
      {
        _type: 'block',
        _key: 'b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 's7', text: 'Les critères de choix incluent le coût, la facilité d\'utilisation, la conformité OHADA, le support technique et la possibilité d\'évolution. Un audit préalable permet d\'identifier l\'outil le plus adapté.' }],
      },
      {
        _type: 'block',
        _key: 'b8',
        style: 'normal',
        children: [{ _type: 'span', _key: 's8', text: 'K-EMPIRE Corporation vous guide dans le choix et le déploiement de votre solution de comptabilité numérique.' }],
      },
    ],
  },
  {
    _type: 'post',
    title: 'Techniques de négociation stratégique pour les dirigeants africains',
    slug: { _type: 'slug', current: 'techniques-negociation-strategique-dirigeants-africains' },
    status: 'publié',
    excerpt: 'Les approches de négociation adaptées au marché ouest-africain, du closing à la relation client.',
    publishedAt: new Date(Date.now() - 86400000 * 28).toISOString(), // 28 days ago
    featured: false,
    readTime: '6 min',
    tags: ['Négociation', 'Vente', 'Leadership', 'Afrique'],
    _rawBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [{ _type: 'span', _key: 's1', text: 'La négociation est un art qui requiert adaptation et stratégie. Dans le contexte ouest-africain, les règles du jeu diffèrent des modèles occidentaux. Voici les techniques essentielles.' }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [{ _type: 'span', _key: 's2', text: 'Comprendre le contexte culturel' }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [{ _type: 'span', _key: 's3', text: 'En Afrique de l\'Ouest, la relation prime sur la transaction. Prendre le temps de créer du lien avant d\'aborder le fond est une étape incontournable. La confiance se construit avant le contrat.' }],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'h2',
        children: [{ _type: 'span', _key: 's4', text: 'Les 3 piliers de la négociation stratégique' }],
      },
      {
        _type: 'block',
        _key: 'b5',
        style: 'normal',
        children: [{ _type: 'span', _key: 's5', text: '1. La préparation : connaître son interlocuteur, ses enjeux et ses contraintes. 2. L\'écoute : comprendre ce que l\'autre cherche vraiment, au-delà de ce qu\'il exprime. 3. La proposition de valeur : montrer comment votre solution répond à son besoin spécifique.' }],
      },
      {
        _type: 'block',
        _key: 'b6',
        style: 'h2',
        children: [{ _type: 'span', _key: 's6', text: 'Le closing : concrétiser l\'accord' }],
      },
      {
        _type: 'block',
        _key: 'b7',
        style: 'normal',
        children: [{ _type: 'span', _key: 's7', text: 'Le closing en Afrique passe souvent par une validation hiérarchique. Identifiez toujours le décideur final et construisez un dossier solide qui facilite la validation interne.' }],
      },
      {
        _type: 'block',
        _key: 'b8',
        style: 'normal',
        children: [{ _type: 'span', _key: 's8', text: 'K-EMPIRE Corporation forme vos équipes commerciales aux techniques de négociation adaptées au marché ouest-africain.' }],
      },
    ],
  },
]

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ SANITY_AUTH_TOKEN is required.\n')
    console.error('Usage: SANITY_AUTH_TOKEN=<token> node scripts/seed-blog.mjs')
    console.error('Get a token at: https://www.sanity.io/manage/personal/api')
    process.exit(1)
  }

  if (!process.env.SANITY_PROJECT_ID) {
    console.error('❌ SANITY_PROJECT_ID is required.\n')
    process.exit(1)
  }

  console.log('🔗 Connecting to Sanity...')
  await resolveCategories()
  const authorId = await resolveAuthor()

  console.log('\n📝 Creating 6 articles...\n')

  for (const article of articles) {
    const categoryKey = article.tags[0]?.toLowerCase()
    const categoryId = CATEGORIES[categoryKey] || null

    const doc = {
      ...article,
      ...(categoryId && {
        categories: [{ _type: 'reference', _ref: categoryId }],
      }),
      ...(authorId && {
        author: { _type: 'reference', _ref: authorId },
      }),
      // Convert _rawBody to body for Sanity
      body: article._rawBody,
    }
    delete doc._rawBody

    const result = await client.create(doc)
    console.log(`✓ Created: "${result.title}" [${result._id}]`)
  }

  console.log('\n✅ Done! 6 articles published in Sanity.')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
