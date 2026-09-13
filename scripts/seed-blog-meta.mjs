/**
 * Create categories and author, then link them to the 6 blog posts.
 *
 * Usage:
 *   SANITY_AUTH_TOKEN=<token> SANITY_PROJECT_ID=<id> node scripts/seed-blog-meta.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const categories = [
  { slug: 'gouvernance', title: 'Gouvernance', color: '#0E4063' },
  { slug: 'fiscalite', title: 'Fiscalité', color: '#C99400' },
  { slug: 'management', title: 'Management', color: '#2563EB' },
  { slug: 'droit', title: 'Droit', color: '#DC2626' },
  { slug: 'comptabilite', title: 'Comptabilité', color: '#0891B2' },
  { slug: 'negociation', title: 'Négociation', color: '#7C3AED' },
]

// Post slug → category slug
const POST_CATEGORY_MAP = {
  '5-erreurs-gouvernance-pme-togo': 'gouvernance',
  'optimisation-fiscale-togo-2026': 'fiscalite',
  'management-interculturel-equipe-multinationale-togo': 'management',
  'ohada-droit-affaires-reformes-2026': 'droit',
  'digitaliser-comptabilite-pme-guide-pratique': 'comptabilite',
  'techniques-negociation-strategique-dirigeants-africains': 'negociation',
}

async function main() {
  console.log('🔗 Creating categories...\n')

  const categoryIds = {}
  for (const cat of categories) {
    const existing = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]._id`,
      { slug: cat.slug }
    )

    if (existing) {
      console.log(`  ✓ Category "${cat.title}" already exists [${existing}]`)
      categoryIds[cat.slug] = existing
    } else {
      const doc = await client.create({
        _type: 'category',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
      })
      console.log(`  + Created category "${cat.title}" [${doc._id}]`)
      categoryIds[cat.slug] = doc._id
    }
  }

  console.log('\n👤 Creating author...\n')

  let authorId = null
  const existingAuthor = await client.fetch(
    `*[_type == "author" && name == "K-EMPIRE"][0]._id`
  )

  if (existingAuthor) {
    authorId = existingAuthor
    console.log(`  ✓ Author "K-EMPIRE" already exists [${authorId}]`)
  } else {
    const doc = await client.create({
      _type: 'author',
      name: 'K-EMPIRE',
      slug: { _type: 'slug', current: 'k-empire' },
      role: 'Expert K-EMPIRE Corporation',
    })
    authorId = doc._id
    console.log(`  + Created author "K-EMPIRE" [${authorId}]`)

  }

  console.log('\n🔗 Linking posts to categories and author...\n')

  // Get all posts
  const posts = await client.fetch(
    `*[_type == "post"] { _id, slug, categories }`
  )

  for (const post of posts) {
    const categorySlug = POST_CATEGORY_MAP[post.slug?.current]
    const categoryId = categorySlug ? categoryIds[categorySlug] : null

    const patch = {}
    if (categoryId && (!post.categories || post.categories.length === 0)) {
      patch.categories = [{ _type: 'reference', _ref: categoryId }]
    }
    if (!post.author && authorId) {
      patch.author = { _type: 'reference', _ref: authorId }
    }

    if (Object.keys(patch).length > 0) {
      await client.patch(post._id).set(patch).commit()
      console.log(`  ✓ Linked "${post.slug?.current || post._id}"`)
    } else {
      console.log(`  — "${post.slug?.current || post._id}" already linked`)
    }
  }

  console.log('\n✅ Done!')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
