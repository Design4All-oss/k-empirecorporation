/**
 * Configuration de l'API WordPress
 * K-EMPIRE CORPORATION
 */

export const WP_API_URL = import.meta.env.VITE_WP_API_BASE || 'http://localhost:8881/wp-json/wp/v2';

export const ENDPOINTS = {
  posts: '/posts',
  pages: '/pages',
  formations: '/formations',
  evenements: '/evenements',
  categories: '/categories',
  tags: '/tags',
  media: '/media',
  authors: '/users',
};

export const DEFAULT_OPTIONS = {
  _embed: true,
  per_page: 10,
};

export const QUERY_KEYS = {
  posts: ['posts'],
  post: (slug) => ['post', slug],
  formations: ['formations'],
  formation: (slug) => ['formation', slug],
  evenements: ['evenements'],
  evenement: (slug) => ['evenement', slug],
  pages: ['pages'],
  page: (slug) => ['page', slug],
};