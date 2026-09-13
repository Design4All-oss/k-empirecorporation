import { useQuery } from '@tanstack/react-query'
import { client, portableTextToHtml } from '../config/sanity'

const EVENEMENT_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  status,
  excerpt,
  type,
  lieu,
  startDateTime,
  endDateTime,
  duration,
  format,
  price,
  "category": category->name,
  "image": coverImage.asset->url,
  intervenants[] { nom, fonction, "photo": photo.asset->url },
  capacity,
  registered,
  registerLink,
  content,
  programme
}`

const dateToTime = (dateTime) => (dateTime ? dateTime.slice(11, 16) : '')

const transformEvenement = (evenement) => ({
  id: evenement._id,
  slug: evenement.slug,
  title: evenement.title,
  excerpt: evenement.excerpt || '',
  description: evenement.description || '',
  type: evenement.type || '',
  location: evenement.lieu || '',
  duration: evenement.duration || '',
  format: evenement.format || '',
  price: evenement.price || '',
  category: evenement.category || '',
  image: evenement.image || '',
  date: evenement.startDateTime || '',
  time: dateToTime(evenement.startDateTime),
  endTime: dateToTime(evenement.endDateTime),
  spots: evenement.capacity,
  registered: evenement.registered,
  registerLink: evenement.registerLink || '',
  intervenants: (evenement.intervenants || []).map((i) => ({
    nom: i.nom || '',
    fonction: i.fonction || '',
    photo: i.photo || '',
  })),
  content: portableTextToHtml(evenement.content),
  programme: portableTextToHtml(evenement.programme),
})

export const useEvenements = () =>
  useQuery({
    queryKey: ['evenements'],
    queryFn: () =>
      client
        .fetch(`*[_type == "evenement" && status == "publié"] | order(startDateTime asc) ${EVENEMENT_PROJECTION}`)
        .then((docs) => (docs || []).map(transformEvenement)),
  })

export const useEvenement = (slug) =>
  useQuery({
    queryKey: ['evenement', slug],
    queryFn: () =>
      client
        .fetch(`*[_type == "evenement" && status == "publié" && slug.current == $slug][0] ${EVENEMENT_PROJECTION}`, { slug })
        .then((evenement) => (evenement ? transformEvenement(evenement) : null)),
    enabled: !!slug,
  })