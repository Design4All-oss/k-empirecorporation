import { useQuery } from '@tanstack/react-query'
import { client, portableTextToHtml } from '../config/sanity'

const POST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  status,
  excerpt,
  featured,
  publishedAt,
  _updatedAt,
  readTime,
  tags,
  categories[]->{name, slug},
  author->{name, role, "image": image.asset->url},
  "image": coverImage.asset->url,
  body
}`

const transformPost = (post) => ({
  id: post._id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt || '',
  category: post.categories && post.categories[0] ? post.categories[0].name : '',
  categories: post.categories || [],
  author: post.author
    ? { name: post.author.name || '', avatar: post.author.image || '' }
    : { name: '', avatar: '' },
  authorRole: post.author && post.author.role ? post.author.role : '',
  date: post.publishedAt || '',
  modified: post._updatedAt || '',
  readTime: post.readTime || '',
  tags: post.tags || [],
  image: post.image || '',
  content: portableTextToHtml(post.body),
})

const fetchPosts = (page, perPage) =>
  client.fetch(
    `*[_type == "post" && status == "publié"] | order(coalesce(publishedAt, _updatedAt) desc) [${(page - 1) * perPage}...${page * perPage}] ${POST_PROJECTION}`
  )

export const usePosts = (page = 1, perPage = 10) =>
  useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: () => fetchPosts(page, perPage).then((docs) => (docs || []).map(transformPost)),
  })

export const usePostsCount = () =>
  useQuery({
    queryKey: ['postsCount'],
    queryFn: () => client.fetch(`count(*[_type == "post" && status == "publié"])`),
  })

export const usePost = (slug) =>
  useQuery({
    queryKey: ['post', slug],
    queryFn: () =>
      client
        .fetch(`*[_type == "post" && status == "publié" && slug.current == $slug][0] ${POST_PROJECTION}`, { slug })
        .then((post) => (post ? transformPost(post) : null)),
    enabled: !!slug,
  })