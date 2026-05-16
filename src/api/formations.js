import axios from 'axios';
import { WP_API_URL } from '../config/api';

// ============================================
// FORMATIONS - CPT "formations"
// ============================================

/**
 * Récupérer toutes les formations
 */
export const getFormations = async (params = {}) => {
  try {
    const response = await axios.get(`${WP_API_URL}/formations`, {
      params: { per_page: 100, _embed: true, ...params },
    });
    return response.data || [];
  } catch (error) {
    console.error('❌ Formations error:', error.message);
    return [];
  }
};

/**
 * Récupérer une formation par son slug
 */
export const getFormationBySlug = async (slug) => {
  try {
    const response = await axios.get(`${WP_API_URL}/formations`, {
      params: { slug, _embed: true },
    });
    return response.data?.[0] || null;
  } catch (error) {
    return null;
  }
};

/**
 * Récupérer les formations mises en avant
 */
export const getFeaturedFormations = async () => {
  try {
    const response = await axios.get(`${WP_API_URL}/formations`, {
      params: { per_page: 50, _embed: true },
    });
    const formations = response.data || [];
    return formations.filter(f => f.acf?.featured === true);
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
 * Fetch media URL from ID
 */
const getMediaUrl = async (mediaId) => {
  if (!mediaId) return null;
  try {
    const response = await axios.get(`${WP_API_URL}/media/${mediaId}`);
    return response.data?.source_url || null;
  } catch (error) {
    return null;
  }
};

/**
 * Transformer les données d'une formation pour le frontend
 */
export const transformFormation = async (formation) => {
  let imageUrl = null;
  
  // Featured image from _embedded
  if (formation._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    imageUrl = formation._embedded['wp:featuredmedia'][0].source_url;
  } else if (formation.acf?.image) {
    if (typeof formation.acf.image === 'number') {
      imageUrl = await getMediaUrl(formation.acf.image);
    } else if (typeof formation.acf.image === 'string') {
      imageUrl = formation.acf.image;
    }
  }
  
  const categories = formation._embedded?.['wp:term']?.[0] || [];

  const decodedTitle = decodeHtmlEntities(formation.title?.rendered || '');
  const decodedHook = decodeHtmlEntities(formation.acf?.hook || '');
  const decodedContent = decodeHtmlEntities(formation.content?.rendered || '');

  // Process trainers
  const kempireTrainers = formation.acf?.kempire_trainers;
  let trainers = [];
  
  if (kempireTrainers && Array.isArray(kempireTrainers)) {
    trainers = await Promise.all(kempireTrainers.map(async (trainer) => {
      let imageUrl = null;
      const img = trainer?.kempire_trainer_image;
      
      if (img) {
        if (typeof img === 'string') {
          imageUrl = img;
        } else if (typeof img === 'number') {
          imageUrl = await getMediaUrl(img);
        }
      }
      
      return {
        name: trainer?.kempire_trainer_name || '',
        role: trainer?.kempire_trainer_role || '',
        bio: trainer?.kempire_trainer_bio || '',
        image: imageUrl,
      };
    }));
  }

  return {
    id: formation.id,
    title: decodedTitle,
    slug: formation.slug,
    hook: decodedHook,
    content: decodedContent,
    description: formation.acf?.description || '',
    format: formation.acf?.format || '',
    location: formation.acf?.location || '',
    audience: formation.acf?.audience || '',
    category: categories[0]?.name || '',
    categoryId: categories[0]?.id || null,
    level: formation.acf?.level || '',
    price: formation.acf?.price || '',
    nextSession: formation.acf?.next_session || '',
    image: imageUrl,
    objectives: formation.acf?.objectifs?.map(obj => decodeHtmlEntities(obj.objectif || '')) || [],
    prerequisites: decodeHtmlEntities(formation.acf?.prerequisites || ''),
    program: (formation.acf?.program || []).map(module => ({
      title: decodeHtmlEntities(module.module_title || ''),
      content: decodeHtmlEntities(module.module_content || ''),
    })).filter(m => m.title),
    practical: {
      duration: formation.acf?.practical_duration || '',
      schedule: formation.acf?.practical_schedule || '',
      materials: formation.acf?.practical_materials || '',
      evaluation: formation.acf?.practical_evaluation || '',
    },
    trainers: trainers,
    featured: formation.acf?.featured || false,
    type: formation.acf?.type || 'Formation',
  };
};

/**
 * Récupérer les catégories de formations
 */
export const getFormationCategories = async () => {
  const response = await axios.get(`${WP_API_URL}/categories`, {
    params: { taxonomy: 'categorie_formation' },
  });
  return response.data;
};

/**
 * Récupérer les formations par catégorie
 */
export const getFormationsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${WP_API_URL}/formations`, {
      params: { categories: categoryId, _embed: true },
    });
    return response.data || [];
  } catch (error) {
    return [];
  }
};