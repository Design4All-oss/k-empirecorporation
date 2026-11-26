/**
 * Seed du contenu éditorial de l'Accueil/À propos dans Sanity.
 *
 * Usage (PowerShell) :
 *   $env:SANITY_PROJECT_ID="xxxx"; $env:SANITY_TOKEN="sk..."; npm run seed
 *
 * Idempotent : n'écrase jamais un document déjà présent (createIfNotExists),
 * pour préserver les modifications faites dans le Studio.
 */
import { createClient } from '@sanity/client'
import { CHARTE_VALEURS, STATISTIQUES_DEFAULT, TEMOIGNAGES_SEED } from '../src/constants/charte.js'

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Variables manquantes. Requis : SANITY_PROJECT_ID (ou VITE_SANITY_PROJECT_ID) et SANITY_TOKEN.')
  console.error('Exemple (PowerShell) : $env:SANITY_PROJECT_ID="xxx"; $env:SANITY_TOKEN="sk..."; npm run seed')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-01-01',
  token,
  useCdn: false,
})

const documents = [
  { _id: 'site.statistiques', _type: 'statistiques', items: STATISTIQUES_DEFAULT.items },
  { _id: 'site.valeurs', _type: 'valeurs', ...CHARTE_VALEURS },
  ...TEMOIGNAGES_SEED.map((t, i) => ({
    _id: `site.temoignage-${i + 1}`,
    _type: 'temoignage',
    nom: t.nom,
    fonction: t.fonction,
    structure: t.structure,
    texte: t.texte,
    consentement: t.consentement,
  })),
]

const run = async () => {
  console.log(`Seed vers ${projectId}/${dataset}…`)
  for (const doc of documents) {
    const exists = await client.fetch('count(*[_id == $id]) > 0', { id: doc._id })
    if (exists) {
      console.log(`- ${doc._type} ${doc._id} : déjà présent, ignoré`)
      continue
    }
    await client.createIfNotExists(doc)
    console.log(`- ${doc._type} ${doc._id} : créé`)
  }
  console.log('Seed terminé.')
}

run().catch((err) => {
  console.error('Échec du seed :', err.message)
  process.exit(1)
})
