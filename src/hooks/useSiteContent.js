import { useQuery } from '@tanstack/react-query'
import { client } from '../config/sanity'

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
