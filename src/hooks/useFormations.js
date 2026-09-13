import { useQuery } from '@tanstack/react-query'
import { client, portableTextToHtml } from '../config/sanity'

const FORMATION_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  hook,
  description,
  featured,
  format,
  level,
  duration,
  audience,
  prerequisites,
  reconnaissance,
  "category": category->name,
  "image": coverImage.asset->url,
  objectives[],
  trainers[] { name, role, bio, "image": image.asset->url },
  program[] { title, content },
  practical { location, startDate, endDate, price, capacity, duration, schedule, materials, evaluation },
  "sessions": *[_type == "session" && formation._ref == ^._id && statut != "annulée"] | order(startDate asc) { _id, startDate, endDate, lieu, format, places, statut },
  content
}`

const transformFormation = (formation) => ({
  id: formation._id,
  slug: formation.slug,
  title: formation.title,
  hook: formation.hook || '',
  description: formation.description || '',
  format: formation.format || '',
  location: (formation.practical && formation.practical.location) || '',
  category: formation.category || '',
  level: formation.level || '',
  duration: formation.duration || '',
  audience: formation.audience || '',
  reconnaissance: formation.reconnaissance || '',
  nextSession: (formation.sessions && formation.sessions[0] && formation.sessions[0].startDate) ||
    (formation.practical && formation.practical.startDate) || '',
  price: (formation.practical && formation.practical.price) || '',
  objectives: (formation.objectives || []).map((o) => o.objective || '').filter(Boolean),
  prerequisites: formation.prerequisites || '',
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
    duration: (formation.practical && formation.practical.duration) || '',
    location: (formation.practical && formation.practical.location) || '',
    schedule: (formation.practical && formation.practical.schedule) || '',
    materials: (formation.practical && formation.practical.materials) || '',
    evaluation: (formation.practical && formation.practical.evaluation) || '',
  },
  content: portableTextToHtml(formation.content),
})

export const useFormations = () =>
  useQuery({
    queryKey: ['formations'],
    queryFn: () =>
      client
        .fetch(`*[_type == "formation"] | order(featured desc, title asc) ${FORMATION_PROJECTION}`)
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

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      client
        .fetch(`*[_type == "category"] | order(order asc, name asc) {
          _id,
          name,
          "slug": slug.current,
          description,
          order,
          programType,
          programCode
        }`)
        .then((docs) => docs || []),
  })