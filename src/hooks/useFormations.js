import { useQuery, useQueries } from '@tanstack/react-query';
import { getFormations, getFormationBySlug, getFeaturedFormations, getFormationsByCategory, transformFormation } from '../api/formations';

/**
 * Hook pour récupérer toutes les formations
 * @param {Object} params - Paramètres de filtrage
 */
export const useFormations = (params = {}) => {
  return useQuery({
    queryKey: ['formations', params],
    queryFn: async () => {
      const result = await getFormations(params);
      if (!result || !Array.isArray(result)) return [];
      return Promise.all(result.map(transformFormation));
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook pour récupérer une formation par son slug
 * @param {string} slug - Slug de la formation
 */
export const useFormation = (slug) => {
  return useQuery({
    queryKey: ['formation', slug],
    queryFn: async () => {
      const formation = await getFormationBySlug(slug);
      return formation ? await transformFormation(formation) : null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les formations mises en avant
 */
export const useFeaturedFormations = () => {
  return useQuery({
    queryKey: ['formations', 'featured'],
    queryFn: async () => {
      const formations = await getFeaturedFormations();
      if (!formations || !Array.isArray(formations)) return [];
      return Promise.all(formations.map(transformFormation));
    },
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les formations par catégorie
 * @param {number} categoryId - ID de la catégorie
 */
export const useFormationsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ['formations', 'category', categoryId],
    queryFn: async () => {
      const formations = await getFormationsByCategory(categoryId);
      return Promise.all(formations.map(transformFormation));
    },
    enabled: !!categoryId,
  });
};

/**
 * Hook pour récupérer plusieurs formations par leurs slugs
 * @param {string[]} slugs - Tableau de slugs
 */
export const useMultipleFormations = (slugs = []) => {
  const queries = useQueries({
    queries: slugs.map(slug => ({
      queryKey: ['formation', slug],
      queryFn: async () => {
        const formation = await getFormationBySlug(slug);
        return formation ? await transformFormation(formation) : null;
      },
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
    }))
  });
  
  return {
    formations: queries.map(q => q.data).filter(Boolean),
    isLoading: queries.some(q => q.isLoading),
    isError: queries.some(q => q.isError),
  };
};