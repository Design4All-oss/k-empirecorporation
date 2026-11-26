// Publie l'evenement « Gouvernance des Entites Extractives et Energetiques » dans Sanity.
// Le token n'est lu que dans l'environnement de la commande : il ne transite jamais par le depot.
//
//   PowerShell : $env:SANITY_TOKEN="sk..."; npm run publish:event
//   Ou avec une session CLI Sanity ouverte (npx sanity login, une seule fois) :
//   npx sanity exec scripts/publish-event.mjs --with-user-token
//
// Idempotent : recree le document s'il existe deja (mise a jour du contenu).
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
delete doc.coverImage // geree ci-dessous : le JSON (coverImage: null) ne doit jamais ecraser la couverture

const existing = await client.getDocument(doc._id)

// Couverture : on preserve un choix fait dans Studio, on reparer une reference invalide,
// et on n'uploade la photo du site que s'il n'y a vraiment pas d'asset.
let coverImage
const existingAssetId = existing?.coverImage?.asset?._ref || existing?.coverImage?.asset?._id
if (!existingAssetId) {
  const asset = await client.assets.upload(
    'image',
    fs.readFileSync(new URL('../public/assets/images/services/hero.webp', import.meta.url)),
    { filename: 'event-cover-extractives.webp' },
  )
  coverImage = {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: 'Programme intensif — gouvernance des entités extractives et énergétiques',
  }
} else if (!existing.coverImage.asset._ref) {
  // Version precedente : asset._id au lieu de asset._ref. Reparer sans re-uploader.
  coverImage = {
    ...existing.coverImage,
    asset: { _type: 'reference', _ref: existingAssetId },
  }
}

// Studio exige une _key unique sur chaque objet membre d'un tableau, sinon la liste est
// illisible ("Missing keys"). Les tableaux de chaines n'en ont pas besoin.
function withKeys(value) {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === 'object' && !Array.isArray(item)
        ? { ...withKeys(item), _key: item._key || `k${i}` }
        : withKeys(item),
    )
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, withKeys(v)]))
  }
  return value
}

const { _id, _type, ...fields } = withKeys(doc) // _id et _type sont immuables
if (coverImage) fields.coverImage = coverImage

// Photos : cercle pour les experts, portrait rectangle pour les deux directeurs.
const PHOTO_FILES = {
  'Dr Victor Stéphane ESSAGA': 'C:/Users/Charles Design/Pictures/GEEE EXPERTS/DR ESSAGA.png',
  'Dr Achille NGWANZA': 'C:/Users/Charles Design/Pictures/GEEE EXPERTS/DR ACHILLE NGWANZA.png',
  'M. Léonard SANON': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/M. SANON.png',
  'Dr Me Samuel Ibrahim GUITANGA': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/Me GUITANGA.png',
  'Me Bobson COULIBALY': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/Me COULIBALY.png',
  'Me Hamidou DRAMÉ': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/M. DRAME.png',
  'Me Daniel Blaise NGOS': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/Me NGOS.png',
  'M. Ismaël ITOUA': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/M. ITOUA.png',
  'M. Diakalya TRAORÉ': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/M. DIAKALYA.png',
  'M. Farid BOUKARI': 'C:/Users/Charles Design/Pictures/PHOTO EXPERT/BOUKARI.png',
}
const photoRefs = {}
for (const [nom, file] of Object.entries(PHOTO_FILES)) {
  const filename = file.split(/[\\/]/).pop()
  const assetId =
    (await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id', { filename })) ||
    (await client.assets.upload('image', fs.readFileSync(file), { filename }))._id
  photoRefs[nom] = { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}
for (const groupe of fields.faculty.groupes) {
  for (const intervenant of groupe.intervenants || []) {
    if (photoRefs[intervenant.nom]) intervenant.photo = photoRefs[intervenant.nom]
  }
}

if (existing) {
  await client.patch(doc._id).set(fields).commit()
  console.log('Mis a jour :', doc._id)
} else {
  await client.create({ _id, _type, ...fields })
  console.log('Publie :', doc._id)
}
console.log('Statut :', doc.status, '| slug :', doc.slug.current)
console.log('Apercu : https://k-empirecorporation.com/event/' + doc.slug.current)
