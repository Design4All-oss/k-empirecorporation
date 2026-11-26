import { useQuery } from '@tanstack/react-query'
import { client, portableTextToHtml, withCdnParams } from '../config/sanity'

const FORMATION_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  hook,
  description,
  featured,
  format,
  formationType,
  duration,
  audience,
    methodology[],
  "image": coverImage.asset->url,
  objectives[],
  trainers[] { name, role, bio, "image": image.asset->url },
  program[] { title, content },
  practical { location, startDate, priceIndividual, priceInstitution, capacity, placesLabel, schedule, materials, admission, certification, attestation, registrationDeadline },
  "sessions": *[_type == "session" && formation._ref == ^._id && statut != "annulée"] | order(startDate asc) { _id, startDate, endDate, lieu, format, places, statut },
  content,
  lienPresentation,
  publishedAt
}`

const formatDateFr = (value) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}/.test(value)) return value || '';
  return new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const transformFormation = (formation) => ({
  id: formation._id,
  slug: formation.slug,
  title: formation.title,
  hook: formation.hook || '',
  description: formation.description || '',
  format: formation.format || '',
  location: (formation.practical && formation.practical.location) || '',
  image: withCdnParams(formation.image),
  formationType: formation.formationType || '',
  duration: formation.duration || '',
  audience: formation.audience || '',
  nextSession: formatDateFr(
    (formation.sessions && formation.sessions[0] && formation.sessions[0].startDate) ||
    (formation.practical && formation.practical.startDate) || ''
  ),
  priceIndividual: Number((formation.practical && formation.practical.priceIndividual) || 0),
  priceInstitution: Number((formation.practical && formation.practical.priceInstitution) || 0),
  objectives: (formation.objectives || [])
    .map((o) => (typeof o === 'string' ? o : o?.objective || o?.objectif || ''))
    .filter(Boolean),
  methodology: (formation.methodology || []).filter(Boolean),
  featured: !!formation.featured,
  date: (formation.practical && formation.practical.startDate) || '',
  time: '',
  spots: (formation.practical && formation.practical.capacity) || undefined,
  trainers: (formation.trainers || []).map((t) => ({
    name: t.name || '',
    role: t.role || '',
    bio: t.bio || '',
    image: t.image || '',
  })),
  program: (formation.program || []).map((m) => ({
    title: m.title || '',
    content: portableTextToHtml(m.content),
  })),
  sessions: (formation.sessions || []).map((s) => ({
    id: s._id,
    startDate: s.startDate || '',
    endDate: s.endDate || '',
    location: s.lieu || '',
    format: s.format || '',
    spots: s.places,
    status: s.statut || '',
  })),
  practical: {
    location: (formation.practical && formation.practical.location) || '',
    schedule: (formation.practical && formation.practical.schedule) || '',
    materials: (formation.practical && formation.practical.materials) || '',
    admission: (formation.practical && formation.practical.admission) || '',
    certification: (formation.practical && formation.practical.certification) || '',
    attestation: (formation.practical && formation.practical.attestation) || '',
    placesLabel: (formation.practical && formation.practical.placesLabel) || '',
    registrationDeadline: (formation.practical && formation.practical.registrationDeadline) || '',
    startDate: (formation.practical && formation.practical.startDate) || '',
  },
  content: portableTextToHtml(formation.content),
  lienPresentation: formation.lienPresentation || '',
})

export const useFormations = () =>
  useQuery({
    queryKey: ['formations'],
    queryFn: () =>
      client
        .fetch(`*[_type == "formation"] | order(publishedAt desc, title asc) ${FORMATION_PROJECTION}`)
        .then((docs) => (docs || []).map(transformFormation)),
  })

export const useFormation = (slug) =>
  useQuery({
    queryKey: ['formation', slug],
    queryFn: () =>
      client
        .fetch(`*[_type == "formation" && slug.current == $slug][0] ${FORMATION_PROJECTION}`, { slug })
        .then((formation) => (formation ? transformFormation(formation) : null)),
    enabled: !!slug,
  })

export const useFeaturedFormations = () =>
  useQuery({
    queryKey: ['formations', 'featured'],
    queryFn: () =>
      client
        .fetch(`*[_type == "formation" && featured == true] | order(title asc) ${FORMATION_PROJECTION}`)
        .then((docs) => (docs || []).map(transformFormation)),
  })