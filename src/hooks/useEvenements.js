import { useQuery } from '@tanstack/react-query'
import { client, withCdnParams } from '../config/sanity'

const EVENEMENT_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  type,
  lieu,
  startDateTime,
  endDateTime,
  duration,
  format,
  price,
  "image": coverImage.asset->url,
  registered,
  publishedAt,
  subtitle,
  tagline,
  dateLine,
  heroIntro,
  ctas[] { label, url },
  regard[] { label, valeur },
  stats { items[] { value, label }, note },
  pourquoi { intro, items[] { titre, texte } },
  gouvernance { intro, items[] { titre, fonction, texte }, note },
  faculty { intro, texte, noms[], note, ctaLabel },
  parcours {
    intro,
    note,
    jours[] {
      label,
      lieu,
      date,
      intro,
      items[] { titre, texte },
      points[],
      pied,
      closing
    }
  },
  pedagogie { items[], note },
  participer[] { titre, texte },
  experience { intro, items[] { titre, texte } },
  livrables { intro, items[], note },
  partenaires { items[] { categorie, titre, texte }, note },
  infosPratiques { rows[] { label, valeur }, note },
  faq[] { question, reponse },
  ctaFinal { titre, texte }
}`

const dateToTime = (dateTime) => (dateTime ? dateTime.slice(11, 16) : '')

const transformEvenement = (evenement) => ({
  id: evenement._id,
  slug: evenement.slug,
  title: evenement.title,
  excerpt: evenement.excerpt || '',
  type: evenement.type || '',
  location: evenement.lieu || '',
  duration: evenement.duration || '',
  format: evenement.format || '',
  price: evenement.price || '',
  image: withCdnParams(evenement.image),
  date: evenement.startDateTime || '',
  time: dateToTime(evenement.startDateTime),
  endTime: dateToTime(evenement.endDateTime),
  registered: evenement.registered,
  // Gabarit éditorial « Page événement »
  subtitle: evenement.subtitle || '',
  tagline: evenement.tagline || '',
  dateLine: evenement.dateLine || '',
  heroIntro: evenement.heroIntro || '',
  ctas: evenement.ctas || [],
  regard: evenement.regard || [],
  stats: evenement.stats || null,
  pourquoi: evenement.pourquoi || null,
  gouvernance: evenement.gouvernance || null,
  faculty: evenement.faculty || null,
  parcours: evenement.parcours || null,
  pedagogie: evenement.pedagogie || null,
  participer: evenement.participer || [],
  experience: evenement.experience || null,
  livrables: evenement.livrables || null,
  partenaires: evenement.partenaires || null,
  infosPratiques: evenement.infosPratiques || null,
  faq: evenement.faq || [],
  ctaFinal: evenement.ctaFinal || null,
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