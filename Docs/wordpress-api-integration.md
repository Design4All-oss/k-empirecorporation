# Guide d'Intégration API WordPress - Frontend React
## K-EMPIRE CORPORATION

Ce document explique comment connecter le Frontend React à WordPress pour récupérer et afficher les données en temps réel.

---

# SECTION 1 : CONFIGURATION DE BASE

## 1.1 Variables d'environnement

**IMPORTANT** : L'URL de l'API ne doit JAMAIS être codée en dur. Utiliser des variables d'environnement Vite.

### Fichiers à créer à la racine du projet

**`.env.development`** (développement) :
```bash
VITE_WP_API_BASE=http://localhost:8881/wp-json/wp/v2
```

**`.env.production`** (production) :
```bash
VITE_WP_API_BASE=https://admin.k-empirecorporation.com/wp-json/wp/v2
```

> **Note** : Ces fichiers ne doivent pas être commités (ajouter `.env*` à `.gitignore`)

### Configuration dans le code

**`src/config/api.js`** :
```javascript
/**
 * Configuration de l'API WordPress
 * K-EMPIRE CORPORATION
 * 
 * L'URL de l'API provient des variables d'environnement Vite :
 * - .env.development (dev)
 * - .env.production (prod)
 */

// URL de l'API via variable d'environnement
export const WP_API_URL = import.meta.env.VITE_WP_API_BASE;

// Erreur si la variable n'est pas définie
if (!WP_API_URL) {
  console.error('ERREUR: VITE_WP_API_BASE non définie dans les variables d\'environnement');
}

// Configuration des endpoints
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

// Configuration des options par défaut
export const DEFAULT_OPTIONS = {
  _embed: true, // Inclut les données liées (auteur, image, catégories)
  per_page: 10,
};

// Clés pour le cache React Query
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
```

---

## 1.2 Structure des fichiers

```
src/
├── config/
│   └── api.js          → Configuration de l'API (via env variables)
├── api/
│   ├── index.js        → Export centralisé des services
│   ├── posts.js        → Service pour les articles
│   ├── formations.js   → Service pour les formations
│   ├── evenements.js   → Service pour les événements
│   └── pages.js        → Service pour les pages
├── hooks/
│   └── index.js        → Hooks customisés pour les données WP
└── components/
    └── ui/
        └── Loading.jsx → Composants de chargement
```

---

# SECTION 2 : INSTALLATION ET CONFIGURATION

## 2.1 Installer les dépendances

```bash
npm install @tanstack/react-query axios
```

- **@tanstack/react-query** : Gestion du cache, retry automatique, chargement performant
- **axios** : Client HTTP avec possibilité de configurer baseURL

## 2.2 Configuration React Query et Axios (App.jsx)

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { WP_API_URL } from './config/api';

// Configuration axios - baseURL via variable d'environnement
if (WP_API_URL) {
  axios.defaults.baseURL = WP_API_URL;
}

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - données considérées fraiches
      cacheTime: 30 * 60 * 1000, // 30 minutes - durée de mise en cache
      refetchOnWindowFocus: false, // Pas de refetch au retour sur la page
      retry: 2, // 2 tentatives en cas d'échec
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Vos routes */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
```

---

# SECTION 3 : SERVICES API

> **SÉCURITÉ** : Le frontend ne fait QUE des requêtes GET vers l'API WordPress publique.
> Aucune opération d'écriture (POST/PUT/DELETE) n'est effectuée depuis le front.

## 3.1 Service Articles (posts.js)

```javascript
import axios from 'axios';
import { WP_API_URL } from '../config/api';

// ============================================
// ARTICLES - WordPress Posts (LECTURE SEULEMENT)
// ============================================

/**
 * Récupérer tous les articles (avec pagination)
 * @param {number} page - Numéro de page
 * @param {number} perPage - Nombre d'articles par page
 * @returns {Promise}
 */
export const getPosts = async (page = 1, perPage = 10) => {
  const response = await axios.get('/posts', {
    params: {
      page,
      per_page: perPage,
      _embed: true, // Inclut les auteurs, images, catégories
    },
  });
  return response.data;
};

/**
 * Récupérer un article par son slug
 * @param {string} slug - Slug de l'article
 * @returns {Promise}
 */
export const getPostBySlug = async (slug) => {
  const response = await axios.get('/posts', {
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
 * @returns {Promise}
 */
export const getRecentPosts = async (limit = 3) => {
  const response = await axios.get('/posts', {
    params: {
      per_page: limit,
      _embed: true,
    },
  });
  return response.data;
};

/**
 * Transformer les données d'un article pour le frontend
 * @param {object} post - Données brutes de l'API
 * @returns {object}
 */
export const transformPost = (post) => {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];

  return {
    id: post.id,
    title: post.title?.rendered || '',
    content: post.content?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    slug: post.slug,
    date: post.date,
    image: featuredMedia?.source_url || null,
    author: author ? { id: author.id, name: author.name, avatar: author.avatar_urls?.['96'] || null } : null,
    categories: categories.map(cat => ({ id: cat.id, name: cat.name, slug: cat.slug })),
    tags: post.tags || [],
    authorRole: post.acf?.author_role || '',
    authorImage: post.acf?.author_image || null,
    readTime: post.acf?.read_time || '',
  };
};

/**
 * Récupérer les catégories
 * @returns {Promise}
 */
export const getCategories = async () => {
  const response = await axios.get('/categories');
  return response.data;
};
```

## 3.2 Service Formations (formations.js)

```javascript
import axios from 'axios';

// ============================================
// FORMATIONS - CPT "formations" (LECTURE SEULEMENT)
// ============================================

export const getFormations = async (params = {}) => {
  const response = await axios.get('/formations', {
    params: { per_page: 100, _embed: true, ...params },
  });
  return response.data;
};

export const getFormationBySlug = async (slug) => {
  const response = await axios.get('/formations', { params: { slug, _embed: true } });
  return response.data[0] || null;
};

export const getFeaturedFormations = async () => {
  const response = await axios.get('/formations', {
    params: { meta_key: 'featured', meta_value: '1', _embed: true },
  });
  return response.data;
};

export const transformFormation = (formation) => {
  const featuredMedia = formation._embedded?.['wp:featuredmedia']?.[0];
  const categories = formation._embedded?.['wp:term']?.[0] || [];

  return {
    id: formation.id,
    title: formation.title?.rendered || '',
    slug: formation.slug,
    hook: formation.acf?.hook || '',
    duration: formation.acf?.duration || '',
    format: formation.acf?.format || '',
    location: formation.acf?.location || '',
    audience: formation.acf?.audience || '',
    category: categories[0]?.name || '',
    categoryId: categories[0]?.id || null,
    level: formation.acf?.level || '',
    price: formation.acf?.price || '',
    nextSession: formation.acf?.next_session || '',
    image: featuredMedia?.source_url || null,
    objectives: formation.acf?.objectifs?.map(obj => obj.objectif) || [],
    prerequisites: formation.acf?.prerequisites || '',
    program: formation.acf?.program?.map(module => ({ title: module.module_title, content: module.module_content })) || [],
    practical: {
      duration: formation.acf?.practical_duration || '',
      schedule: formation.acf?.practical_schedule || '',
      materials: formation.acf?.practical_materials || '',
      evaluation: formation.acf?.practical_evaluation || '',
    },
    trainers: formation.acf?.trainers?.map(trainer => ({
      name: trainer.trainer_name,
      role: trainer.trainer_role,
      bio: trainer.trainer_bio,
      image: trainer.trainer_image,
    })) || [],
    featured: formation.acf?.featured || false,
    type: formation.acf?.type || 'Formation',
  };
};
```

## 3.3 Service Événements (evenements.js)

```javascript
import axios from 'axios';

// ============================================
// ÉVÉNEMENTS - CPT "evenements" (LECTURE SEULEMENT)
// ============================================

export const getEvenements = async () => {
  const response = await axios.get('/evenements', { params: { per_page: 100, _embed: true } });
  return response.data;
};

export const getEvenementBySlug = async (slug) => {
  const response = await axios.get('/evenements', { params: { slug, _embed: true } });
  return response.data[0] || null;
};

export const transformEvenement = (evenement) => {
  const featuredMedia = evenement._embedded?.['wp:featuredmedia']?.[0];
  const categories = evenement._embedded?.['wp:term']?.[0] || [];
  const spots = evenement.acf?.event_spots || 0;
  const registered = evenement.acf?.event_registered || 0;

  return {
    id: evenement.id,
    title: evenement.title?.rendered || '',
    slug: evenement.slug,
    excerpt: evenement.excerpt?.rendered || evenement.acf?.event_excerpt || '',
    content: evenement.content?.rendered || '',
    type: evenement.acf?.event_type || '',
    category: categories[0]?.name || '',
    categoryId: categories[0]?.id || null,
    date: evenement.acf?.event_date || '',
    time: evenement.acf?.event_time || '',
    location: evenement.acf?.event_location || '',
    spots,
    registered,
    spotsLeft: spots - registered,
    format: evenement.acf?.event_format || '',
    duration: evenement.acf?.event_duration || '',
    image: featuredMedia?.source_url || null,
  };
};
```

## 3.4 Service Pages (pages.js)

```javascript
import axios from 'axios';

// ============================================
// PAGES - WordPress Pages (LECTURE SEULEMENT)
// ============================================

export const getPages = async () => {
  const response = await axios.get('/pages', { params: { per_page: 100 } });
  return response.data;
};

export const getPageBySlug = async (slug) => {
  const response = await axios.get('/pages', { params: { slug } });
  return response.data[0] || null;
};

export const transformPage = (page) => ({
  id: page.id,
  title: page.title?.rendered || '',
  content: page.content?.rendered || '',
  slug: page.slug,
  heroTitle: page.acf?.hero_title || page.title?.rendered || '',
  heroSubtitle: page.acf?.hero_subtitle || '',
  heroImage: page.acf?.hero_image || null,
  stats: page.acf?.stats || [],
  expertise: page.acf?.expertise || [],
});
```

---

# SECTION 4 : HOOKS CUSTOMISÉS

## 4.1 Hook pour les articles

```javascript
import { useQuery } from '@tanstack/react-query';
import { getPosts, getPostBySlug, getRecentPosts, getCategories, transformPost } from '../api/posts';

/**
 * Hook pour récupérer tous les articles avec pagination
 */
export const usePosts = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['posts', page, perPage],
    queryFn: async () => {
      const posts = await getPosts(page, perPage);
      return posts.map(transformPost);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook pour récupérer un article par son slug
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
 * Hook pour récupérer les catégories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
  });
};
```

## 4.2 Hook pour les formations

```javascript
import { useQuery } from '@tanstack/react-query';
import { getFormations, getFormationBySlug, getFeaturedFormations, transformFormation } from '../api/formations';

export const useFormations = (params = {}) => {
  return useQuery({
    queryKey: ['formations', params],
    queryFn: async () => {
      const formations = await getFormations(params);
      return formations.map(transformFormation);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useFormation = (slug) => {
  return useQuery({
    queryKey: ['formation', slug],
    queryFn: async () => {
      const formation = await getFormationBySlug(slug);
      return formation ? transformFormation(formation) : null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedFormations = () => {
  return useQuery({
    queryKey: ['formations', 'featured'],
    queryFn: async () => {
      const formations = await getFeaturedFormations();
      return formations.map(transformFormation);
    },
    staleTime: 5 * 60 * 1000,
  });
};
```

## 4.3 Hook pour les événements

```javascript
import { useQuery } from '@tanstack/react-query';
import { getEvenements, getEvenementBySlug, transformEvenement } from '../api/evenements';

export const useEvenements = () => {
  return useQuery({
    queryKey: ['evenements'],
    queryFn: async () => {
      const evenements = await getEvenements();
      return evenements.map(transformEvenement);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

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
```

---

# SECTION 5 : CORS - CONFIGURATION WORDPRESS

## 5.1 Snippet CORS sécurisé pour functions.php

**IMPORTANT** : Ce code doit être ajouté dans le fichier `functions.php` de votre thème ou plugin WordPress.

```php
<?php
/**
 * Configuration CORS sécurisée pour l'API REST WordPress
 * Autorise uniquement les origines autorisées (dev + prod)
 * Méthodes limitées à GET uniquement
 */

add_action('rest_api_init', function () {
    // Supprimer les headers CORS par défaut de WordPress
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');

    add_filter('rest_pre_serve_request', function ($value) {
        // Liste des origines autorisées
        $allowed_origins = [
            'http://localhost:5173',              // Frontend développement (Vite)
            'https://www.k-empirecorporation.com' // Frontend production
        ];

        // Vérifier si l'origine est autorisée
        if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
            header('Access-Control-Allow-Methods: GET');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');
        }

        return $value;
    });
});
```

### Points importants :
- **PAS** de `Access-Control-Allow-Origin: *` (sécurité)
- **UNIQUEMENT** la méthode GET autorisée pour l'API publique
- Origins spécifiques pour dev et prod

---

# SECTION 6 : SÉCURITÉ

## 6.1 Règles fondamentales

1. **Lecture uniquement** : Le frontend ne fait QUE des requêtes GET
   - `/posts` - Articles
   - `/formations` - Formations
   - `/evenements` - Événements
   - `/pages` - Pages
   - `/media` - Images

2. **Pas de tokens dans le frontend** : L'API publique n'a pas besoin d'authentification

3. **Écriture via autre canal** : Les formulaires (inscription, contact) doivent utiliser un backend séparé ou des endpoints protégés

## 6.2 Durcissement WordPress en production

### Séparation de domaines
| Environnement | URL |
|--------------|-----|
| Frontend | `https://www.k-empirecorporation.com` |
| Backend (WP) | `https://admin.k-empirecorporation.com` |

### Sécurisation du back-office
- **HTTPS obligatoire** sur admin.k-empirecorporation.com
- **2FA** via plugin (Wordfence, iThemes Security, etc.)
- **Mots de passe forts** pour tous les utilisateurs
- **Limitation des tentatives de connexion** (protège contre brute force)
- **Changer l'URL de login** avec WPS Hide Login (ex: `/wp-login.php` → `/login`)

### Plugins et maintenance
- **Core, thèmes et plugins à jour** régulièrement
- **Éviter les plugins inutiles** - chacun est une surface d'attaque potentielle
- **Plugins de sécurité recommandés** :
  - Wordfence Security
  - iThemes Security
  - Sucuri Security

### Endpoints REST sensibles
- **Désactiver les endpoints inutiles** :
  - `/wp-json/wp/v2/users` - Ne pas exposer la liste des utilisateurs publiquement
  - Si des endpoints custom contiennent des données sensibles, ajouter `permission_callback` restrictifs

### Exemple de restriction d'endpoint敏感

```php
// Dans votre plugin ou functions.php
add_filter('rest_endpoints', function($endpoints) {
    // Désactiver l'accès public aux utilisateurs
    if (isset($endpoints['/wp/v2/users'])) {
        unset($endpoints['/wp/v2/users']);
    }
    if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
        unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    }
    return $endpoints;
});
```

---

# SECTION 7 : PERFORMANCES

## 7.1 Optimisations incluses (React Query)

| Feature | Benefit |
|---------|---------|
| **Caching automatique** | Évite les requêtes redondantes |
| **Deduping** | Une seule requête pour plusieurs composants |
| **Stale-while-revalidate** | Affiche les données en cache pendant le refresh |
| **Retry automatique** | Gère les échecs réseau |

## 7.2 Optimisations recommandées

### Limiter les données chargées
```javascript
// Limiter le nombre d'articles par page
const { data } = usePosts(1, 6); // Charge 6 articles max

// Pagination côté UI pour les longues listes
const { data } = usePosts(page, perPage);
```

### _embed avec modération
L'option `_embed` est pratique mais peut alourdir les réponses :
- Privilégier `per_page` petit sur les listes
- Prévoir pagination si beaucoup de contenu

### Cache côté WordPress (optionnel mais recommandé)
Installer un plugin de cache pour les réponses API :
- **WP REST API Cache** (WP Rocket ou équivalent)
- Configure une expiration des réponses API pour réduire la charge serveur

---

# SECTION 8 : CHECKLIST POUR DÉMARRER

## WordPress (côté backend)

- [ ] Installer WordPress sur le serveur
- [ ] Installer et configurer ACF
- [ ] Créer les CPT `formations` et `evenements` (Custom Post Type UI ou code)
- [ ] Créer les champs ACF comme spécifié dans `wordpress-cpt-spec.md`
- [ ] Ajouter le snippet CORS dans `functions.php`
- [ ] Configurer HTTPS sur le domaine admin
- [ ] Tester l'API : `curl http://localhost:8881/wp-json/wp/v2/posts`

## Frontend React (côté frontend)

- [ ] Créer les fichiers `.env.development` et `.env.production`
- [ ] Vérifier que `VITE_WP_API_BASE` est utilisé dans `src/config/api.js`
- [ ] Installer : `npm install @tanstack/react-query axios`
- [ ] Créer les services API (`src/api/`)
- [ ] Créer les hooks customisés (`src/hooks/`)
- [ ] Intégrer React Query dans App.jsx
- [ ] Mettre à jour les pages pour utiliser les données dynamiques
- [ ] Tester en local avec `npm run dev`

---

# SECTION 9 : DÉPANNAGE

## Problèmes courants

| Problème | Solution |
|----------|----------|
| CORS error | Vérifier le snippet CORS dans functions.php |
| 404 sur l'API | Vérifier les permaliens WP (Settings > Permaliens > Enregistrer) |
| Données vides | Vérifier `_embed` dans les params |
| Images non chargées | Vérifier que `featured_media` est bien un ID |
| Champs ACF non visibles | Installer "ACF to REST API" |

## Tester l'API manuellement

```bash
# Articles (avec _embed pour avoir les relations)
curl "http://localhost:8881/wp-json/wp/v2/posts?_embed"

# Une formation spécifique
curl "http://localhost:8881/wp-json/wp/v2/formations?slug=ma-formation"

# Vérifier les headers CORS
curl -I -H "Origin: http://localhost:5173" http://localhost:8881/wp-json/wp/v2/posts
```

---

# SECTION 10 : NOTES IMPORTANTES

1. **Variables d'environnement** : Toujours utiliser `VITE_WP_API_BASE`, jamais coder d'URL en dur
2. **Lecture seule** : Le front ne fait que des GET, pas de POST/PUT/DELETE
3. **CORS** : Configuré côté WordPress, pas côté React
4. **Fallback** : Les données locales peuvent servir de repli si l'API n'est pas disponible

---

*Document technique pour K-EMPIRE CORPORATION*
*Guide d'intégration API WordPress vers React Frontend*
*Dernière mise à jour : Avril 2026*