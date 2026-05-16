import axios from 'axios';
import { WP_API_URL } from '../config/api';

// ============================================
// PAGES - WordPress Pages
// ============================================

/**
 * Récupérer toutes les pages
 * @returns {Promise<Array>}
 */
export const getPages = async () => {
  const response = await axios.get(`${WP_API_URL}/pages`, {
    params: {
      per_page: 100,
    },
  });
  return response.data;
};

/**
 * Récupérer une page par son slug
 * @param {string} slug - Slug de la page
 * @returns {Promise<Object|null>}
 */
export const getPageBySlug = async (slug) => {
  const response = await axios.get(`${WP_API_URL}/pages`, {
    params: {
      slug,
    },
  });
  return response.data[0] || null;
};

/**
 * Transformer les données d'une page pour le frontend
 * @param {Object} page - Données brutes de l'API
 * @returns {Object}
 */
export const transformPage = (page) => {
  return {
    id: page.id,
    title: page.title?.rendered || '',
    content: page.content?.rendered || '',
    slug: page.slug,
    // Champs ACF spécifiques selon la page
    heroTitle: page.acf?.hero_title || page.title?.rendered || '',
    heroSubtitle: page.acf?.hero_subtitle || '',
    heroImage: page.acf?.hero_image || null,
    stats: page.acf?.stats || [],
    expertise: page.acf?.expertise || [],
  };
};