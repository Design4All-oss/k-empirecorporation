import { useQuery, useQueries } from '@tanstack/react-query';
import { getPosts, getPostBySlug, getRecentPosts, getCategories, transformPost } from '../api/posts';

/**
 * Hook pour récupérer tous les articles avec pagination
 * @param {number} page - Numéro de page
 * @param {number} perPage - Articles par page
 */
export const usePosts = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: async () => {
      const posts = await getPosts(page, perPage);
      if (!posts || !Array.isArray(posts)) return [];
      return posts.map(transformPost);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

/**
 * Hook pour récupérer un article par son slug
 * @param {string} slug - Slug de l'article
 */
export const usePost = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const post = await getPostBySlug(slug);
      return post ? transformPost(post) : null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les articles récents
 * @param {number} limit - Nombre d'articles
 */
export const useRecentPosts = (limit = 3) => {
  return useQuery({
    queryKey: ['posts', 'recent', limit],
    queryFn: async () => {
      const posts = await getRecentPosts(limit);
      return posts.map(transformPost);
    },
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook pour récupérer les articles par catégorie
 * @param {number} categoryId - ID de la catégorie
 */
export const usePostsByCategory = (categoryId) => {
  return useQuery({
    queryKey: ['posts', 'category', categoryId],
    queryFn: async () => {
      const posts = await getPostsByCategory(categoryId);
      return posts.map(transformPost);
    },
    enabled: !!categoryId,
  });
};

/**
 * Hook pour récupérer les catégories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook pour récupérer plusieurs articles par leurs slugs
 * @param {string[]} slugs - Tableau de slugs
 */
export const useMultiplePosts = (slugs = []) => {
  const queries = useQueries({
    queries: slugs.map(slug => ({
      queryKey: ['post', slug],
      queryFn: async () => {
        const post = await getPostBySlug(slug);
        return post ? transformPost(post) : null;
      },
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
    }))
  });
  
  return {
    posts: queries.map(q => q.data).filter(Boolean),
    isLoading: queries.some(q => q.isLoading),
    isError: queries.some(q => q.isError),
  };
};