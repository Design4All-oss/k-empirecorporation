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

export const useValeurs = () =>
  useQuery({
    queryKey: ['valeurs'],
    queryFn: () => client.fetch(`*[_type == "valeurs"][0]`),
  })
