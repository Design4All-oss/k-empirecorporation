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
  role: t.structure || t.fonction || '',
  image: t.image || '',
})

export const useTemoignages = () =>
  useQuery({
    queryKey: ['temoignages'],
    queryFn: () =>
      client
        .fetch(`*[_type == "temoignage" && consentement == true] | order(_createdAt asc) ${TEMOIGNAGE_PROJECTION}`)
        .then((docs) => (docs || []).filter((t) => t.texte).map(transformTemoignage)),
  })

const TEMOIGNAGE_FORMATION_PROJECTION = `{
  nom,
  formationSuivie,
  texte,
  "photo": photo.asset->url
}`

const transformTemoignageFormation = (t) => ({
  name: t.nom || '',
  formation: t.formationSuivie || '',
  content: t.texte || '',
  avatar: t.photo || '',
})

export const useTemoignagesFormation = () =>
  useQuery({
    queryKey: ['temoignagesFormation'],
    queryFn: () =>
      client
        .fetch(`*[_type == "temoignageFormation" && consentement == true] | order(_createdAt asc) ${TEMOIGNAGE_FORMATION_PROJECTION}`)
        .then((docs) => (docs || []).filter((t) => t.texte).map(transformTemoignageFormation)),
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
