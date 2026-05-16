import axios from 'axios';
import { WP_API_URL } from '../config/api';

// ============================================
// ÉVÉNEMENTS - CPT "evenements"
// ============================================

/**
 * Récupérer tous les événements
 */
export const getEvenements = async () => {
  try {
    const response = await axios.get(`${WP_API_URL}/evenements`, {
      params: { per_page: 100, _embed: true },
    });
    return response.data || [];
  } catch (error) {
    console.error('❌ Evenements error:', error.message);
    return [];
  }
};

/**
 * Récupérer un événement par son slug
 */
export const getEvenementBySlug = async (slug) => {
  try {
    const response = await axios.get(`${WP_API_URL}/evenements`, {
      params: { slug, _embed: true },
    });
    return response.data?.[0] || null;
  } catch (error) {
    return null;
  }
};

/**
 * Récupérer les événements à venir
 */
export const getUpcomingEvenements = async (limit = 3) => {
  try {
    const response = await axios.get(`${WP_API_URL}/evenements`, {
      params: { per_page: limit, _embed: true },
    });
    return response.data || [];
  } catch (error) {
    return [];
  }
};

/**
 * Decode HTML entities
 */
const decodeHtmlEntities = (str) => {
  if (!str) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

/**
 * Transformer les données d'un événement pour le frontend
 */
export const transformEvenement = (evenement) => {
  const featuredMedia = evenement._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = featuredMedia?.source_url || null;
  const categories = evenement._embedded?.['wp:term']?.[0] || [];

  const spots = evenement.acf?.event_spots || 0;
  const registered = evenement.acf?.event_registered || 0;
  const spotsLeft = spots - registered;

  // Decode HTML entities
  const decodedTitle = decodeHtmlEntities(evenement.title?.rendered || '');
  const decodedExcerpt = decodeHtmlEntities(evenement.excerpt?.rendered || '');
  const decodedContent = decodeHtmlEntities(evenement.content?.rendered || '');

  // Strip HTML tags from excerpt for description
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const cleanDescription = stripHtml(decodedExcerpt);

  return {
    id: evenement.id,
    title: decodedTitle,
    slug: evenement.slug,
    excerpt: decodedExcerpt,
    content: decodedContent,
    description: cleanDescription,
    type: evenement.acf?.event_type || '',
    category: categories[0]?.name || '',
    categoryId: categories[0]?.id || null,
    date: evenement.acf?.event_date || '',
    time: evenement.acf?.event_time || '',
    location: evenement.acf?.event_location || '',
    spots: spots,
    registered: registered,
    spotsLeft: spotsLeft,
    format: evenement.acf?.event_format || evenement.acf?.format || '',
    duration: evenement.acf?.event_duration || evenement.acf?.duration || '',
    price: evenement.acf?.event_price || '',
    programme: evenement.acf?.event_programme || '',
    intervenants: evenement.acf?.event_intervenants || [],
    inscriptionUrl: evenement.acf?.event_inscription_url || '',
    image: imageUrl,
  };
};