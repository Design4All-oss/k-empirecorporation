import { useQuery, useQueries } from '@tanstack/react-query';
import { getEvenements, getEvenementBySlug, getUpcomingEvenements, transformEvenement } from '../api/evenements';

/**
 * Hook pour récupérer tous les événements
 */
export const useEvenements = () => {
  return useQuery({
    queryKey: ['evenements'],
    queryFn: async () => {
      const result = await getEvenements();
      if (!result || !Array.isArray(result)) return [];
      return result.map(transformEvenement);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook pour récupérer un événement par son slug
 * @param {string} slug - Slug de l'événement
 */
export const useEvenement = (slug) => {
  return useQuery({
    queryKey: ['evenement', slug],
    queryFn: async () => {
      const evenement = await getEvenementBySlug(slug);
      return evenement ? transformEvenement(evenement) : null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les événements à venir
 * @param {number} limit - Nombre d'événements
 */
export const useUpcomingEvenements = (limit = 3) => {
  return useQuery({
    queryKey: ['evenements', 'upcoming', limit],
    queryFn: async () => {
      const evenements = await getUpcomingEvenements(limit);
      if (!evenements || !Array.isArray(evenements)) return [];
      return evenements.map(transformEvenement);
    },
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer plusieurs événements par leurs slugs
 * @param {string[]} slugs - Tableau de slugs
 */
export const useMultipleEvenements = (slugs = []) => {
  const queries = useQueries({
    queries: slugs.map(slug => ({
      queryKey: ['evenement', slug],
      queryFn: async () => {
        const evenement = await getEvenementBySlug(slug);
        return evenement ? transformEvenement(evenement) : null;
      },
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
    }))
  });
  
  return {
    evenements: queries.map(q => q.data).filter(Boolean),
    isLoading: queries.some(q => q.isLoading),
    isError: queries.some(q => q.isError),
  };
};