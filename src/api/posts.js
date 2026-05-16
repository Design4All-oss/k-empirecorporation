import axios from 'axios';
import { WP_API_URL } from '../config/api';

// ============================================
// ARTICLES - WordPress Posts
// ============================================

/**
 * Récupérer tous les articles (avec pagination)
 * @param {number} page - Numéro de page
 * @param {number} perPage - Articles par page
 * @returns {Promise<Array>}
 */
export const getPosts = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        page,
        per_page: perPage,
        _embed: true,
        _fields: 'id,title,excerpt,content,date,modified,slug,_links,_embedded', // Limiter les champs
      },
    });
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch posts from API:', error.message);
    return [];
  }
};

/**
 * Récupérer un article par son slug
 * @param {string} slug - Slug de l'article
 * @returns {Promise<Object|null>}
 */
export const getPostBySlug = async (slug) => {
  const response = await axios.get(`${WP_API_URL}/posts`, {
    params: {
      slug,
      _embed: true,
    },
  });
  return response.data[0] || null;
};

/**
 * Récupérer les articles récents
 * @param {number} limit - Nombre d'articles
 * @returns {Promise<Array>}
 */
export const getRecentPosts = async (limit = 3) => {
  const response = await axios.get(`${WP_API_URL}/posts`, {
    params: {
      per_page: limit,
      _embed: true,
    },
  });
  return response.data;
};

/**
 * Récupérer les articles par catégorie
 * @param {number} categoryId - ID de la catégorie
 * @returns {Promise<Array>}
 */
export const getPostsByCategory = async (categoryId) => {
  const response = await axios.get(`${WP_API_URL}/posts`, {
    params: {
      categories: categoryId,
      _embed: true,
    },
  });
  return response.data;
};

/**
 * Decode HTML entities
 * @param {string} str - String with HTML entities
 * @returns {string}
 */
const decodeHtmlEntities = (str) => {
  if (!str) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

/**
 * Transformer les données d'un article pour le frontend
 * @param {Object} post - Données brutes de l'API
 * @returns {Object}
 */
export const transformPost = (post) => {
  // Extraction de l'image
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || null;

  // Extraction de l'auteur
  const author = post._embedded?.author?.[0];

  // Extraction des catégories
  const categories = post._embedded?.['wp:term']?.[0] || [];

  // Decode HTML entities
  const decodedTitle = decodeHtmlEntities(post.title?.rendered || '');
  const decodedContent = decodeHtmlEntities(post.content?.rendered || '');
  const decodedExcerpt = decodeHtmlEntities(post.excerpt?.rendered || '');

  return {
    id: post.id,
    title: decodedTitle,
    content: decodedContent,
    excerpt: decodedExcerpt,
    slug: post.slug,
    date: post.date,
    modified: post.modified || post.date,
    image: imageUrl,
    author: author ? {
      id: author.id,
      name: author.name,
      avatar: author.avatar_urls?.['96'] || null,
    } : null,
    categories: categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
    tags: post.tags || [],
    // Champs ACF personnalisés
    authorRole: post.acf?.author_role || '',
    authorImage: post.acf?.author_image || null,
    readTime: post.acf?.read_time || '',
  };
};

/**
 * Récupérer les catégories
 * @returns {Promise<Array>}
 */
export const getCategories = async () => {
  const response = await axios.get(`${WP_API_URL}/categories`);
  return response.data;
};