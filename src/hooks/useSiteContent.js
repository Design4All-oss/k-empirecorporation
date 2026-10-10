import { useQuery } from '@tanstack/react-query'
import { client } from '../config/sanity'

const TEMOIGNAGE_PROJECTION = `{
  nom,
  fonction,
  structure,
  texte,
  "image": photo.asset->url
}`

const transformTemoignage = (t) => ({
  quote: t.texte || '',
  name: t.nom || '',
  role: [t.fonction, t.structure].filter(Boolean).join(' — ') || '',
  image: t.image || '',
})

export const useTemoignages = () =>
  useQuery({
    queryKey: ['temoignages'],
    queryFn: () =>
      client
        .fetch(`*[_type == "temoignage"] | order(_createdAt asc) ${TEMOIGNAGE_PROJECTION}`)
        .then((docs) => (docs || []).filter((t) => t.texte).map(transformTemoignage)),
  })

export const useStatistiques = () =>
  useQuery({
    queryKey: ['statistiques'],
    queryFn: () => client.fetch(`*[_type == "statistiques"][0]`),
  })

export const usePartenaires = () =>
  useQuery({
    queryKey: ['partenaires'],
    queryFn: () =>
      client
        .fetch(`*[_type == "partenaires"][0]{ logos[]{ nom, "logo": logo.asset->url } }`)
        .then((doc) => (doc?.logos || []).filter((p) => p.logo)),
  })

// Paramètres globaux du site (mode maintenance).
// retry désactivé volontairement : si Sanity ne répond pas, le site doit
// s'afficher quand même plutôt que de rester bloqué sur un écran de chargement.
export const useSiteSettings = () =>
  useQuery({
    queryKey: ['siteSettings'],
    queryFn: () =>
      client
        .fetch(`*[_type == "siteSettings"][0]{ maintenance, maintenanceMessage }`)
        .then((doc) => ({
          maintenance: !!doc?.maintenance,
          message: (doc?.maintenanceMessage || '').trim(),
        })),
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  })
