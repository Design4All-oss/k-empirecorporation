// Publie l'evenement « Gouvernance des Entites Extractives et Energetiques » dans Sanity.
// Le token n'est lu que dans l'environnement de la commande : il ne transite jamais par le depot.
//
//   PowerShell : $env:SANITY_TOKEN="sk..."; npm run publish:event
//   Ou avec une session CLI Sanity ouverte (npx sanity login, une seule fois) :
//   npx sanity exec scripts/publish-event.mjs --with-user-token
//
// Idempotent : si le document existe deja, il ne fait rien.
import { createClient } from '@sanity/client'
import fs from 'node:fs'

const token = process.env.SANITY_TOKEN || process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('Token manquant.')
  console.error('  Soit : $env:SANITY_TOKEN="sk..."; npm run publish:event')
  console.error('  Soit : npx sanity login puis npx sanity exec scripts/publish-event.mjs --with-user-token')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'j5pf9fd6',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2026-01-01',
  token,
  useCdn: false,
})

const payload = JSON.parse(fs.readFileSync(new URL('./event-gouvernance-extractives.json', import.meta.url), 'utf8'))
const doc = { _id: 'evenement-gouvernance-entites-extractives', ...payload.create }

const existing = await client.getDocument(doc._id)
if (existing) {
  console.log('Deja publie :', existing._id, '| statut :', existing.status, '| slug :', existing.slug?.current)
  process.exit(0)
}

// Couverture reutilisee du site (la generation d'image etait indisponible).
const asset = await client.assets.upload(
  'image',
  fs.readFileSync(new URL('../public/assets/images/services/hero.webp', import.meta.url)),
  { filename: 'event-cover-extractives.webp' },
)
doc.coverImage = {
  _type: 'image',
  asset: { _type: 'reference', _id: asset._id },
  alt: 'Programme intensif — gouvernance des entités extractives et énergétiques',
}

const created = await client.create(doc)
console.log('Publie :', created._id)
console.log('Statut :', created.status, '| slug :', created.slug.current)
console.log('Apercu : https://k-empirecorporation.com/event/' + created.slug.current)
