# Documentation K-EMPIRE CORPORATION

Site vitrine React pour K-EMPIRE CORPORATION, cabinet d'études, de conseil et de formation basé à Lomé (Togo).

---

## 1. Stack Technique

| Technologie | Version | Usage |
|---|---|---|
| React | 19.2.4 | UI |
| Vite | 8.0.1 | Build / Dev server |
| React Router DOM | 7.13.2 | Routage client |
| TanStack React Query | 5.96.2 | Data fetching / cache |
| Framer Motion | 12.38.0 | Animations |
| GSAP | 3.14.2 | Animations avancées (marquee, curseur) |
| Tailwind CSS v4 | 4.2.2 | Styles utilitaires |
| Axios | 1.14.0 | HTTP client WordPress API |
| Lucide React | 0.477.0 | Icônes |

---

## 2. Architecture des fichiers

```
kempire/
├── index.html
├── vite.config.js
├── .env.development
├── .env.production
├── DOCUMENTATION.md
└── src/
    ├── main.jsx                    # Point d'entrée React
    ├── App.jsx                     # Routes, providers (Query, Toast, BookingModal)
    ├── index.css                   # Design system (@theme Tailwind v4)
    ├── config/
    │   └── api.js                  # URL base WP + endpoints + query keys
    ├── constants/
    │   └── content.js              # Contenus statiques (home, about, footer, nav)
    ├── context/
    │   ├── ToastContext.jsx        # Système de toasts (success/error)
    │   └── BookingModalContext.jsx # Contexte modal RDV
    ├── hooks/
    │   ├── index.js                # Re-export des hooks
    │   ├── usePosts.js             # Articles (posts)
    │   ├── useFormations.js        # Formations (CPT)
    │   └── useEvenements.js        # Événements (CPT)
    ├── api/
    │   ├── forms.js                # Soumission formulaires (newsletter, devis, rdv, inscriptions)
    │   ├── posts.js                # Articles — getPosts, getPostBySlug, transformPost
    │   ├── pages.js                # Pages WordPress
    │   ├── formations.js           # Formations — getFormations, transformFormation
    │   └── evenements.js           # Événements — getEvenements, transformEvenement
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Services.jsx
    │   ├── ServiceConseil.jsx
    │   ├── ServiceAudit.jsx
    │   ├── ServiceJuridique.jsx
    │   ├── Formations.jsx
    │   ├── FormationSingle.jsx     # Détail formation + modal inscription 4 étapes
    │   ├── EvenementSingle.jsx     # Détail événement + modal inscription 3 étapes
    │   ├── Blog.jsx                # Actualités combinées (events + posts)
    │   ├── BlogSingle.jsx          # Article détaillé
    │   ├── Contact.jsx
    │   ├── LegalNotices.jsx
    │   └── NotFound.jsx
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx
    │   │   ├── Header.jsx          # Navigation fixe avec dropdown Services
    │   │   └── Footer.jsx          # Footer visible sur toutes les routes
    │   ├── ui/
    │   │   ├── Button.jsx          # Design system (rounded-pill, px-8 py-4, variants)
    │   │   ├── Card.jsx
    │   │   ├── Slider.jsx          # Carrousel générique avec dots + navigation
    │   │   ├── Section.jsx
    │   │   ├── PageBanner.jsx      # Bannière de page
    │   │   ├── Loading.jsx
    │   │   ├── BookingModal.jsx    # Modal RDV (devis)
    │   │   └── CustomCursor.jsx    # Curseur personnalisé
    │   ├── home/                   # 12 composants Home
    │   │   ├── HomeHero.jsx
    │   │   ├── HomePopup.jsx       # Popup 8s → Telegram/WhatsApp
    │   │   ├── HomeExpertise.jsx
    │   │   ├── HomeStats.jsx
    │   │   ├── HomeValuesMarquee.jsx
    │   │   ├── HomeServicesPreview.jsx
    │   │   ├── HomeFormationsPreview.jsx
    │   │   ├── HomeWhyUs.jsx
    │   │   ├── HomeTestimonials.jsx
    │   │   ├── HomeNewsletter.jsx
    │   │   ├── HomeContactCta.jsx
    │   │   └── HomePartners.jsx
    │   ├── about/                  # 8 composants About
    │   ├── services/               # 5 composants Services
    │   ├── formations/             # 5 composants Formations
    │   ├── blog/                   # 3 composants Blog
    │   ├── contact/                # 5 composants Contact
    │   └── legal/
    │       └── LegalNoticesContent.jsx
    └── ErrorBoundary.jsx
```

---

## 3. Routage

| Route | Page | Description |
|---|---|---|
| `/` | Home | Accueil avec sections imbriquées |
| `/a-propos` | About | Présentation du cabinet |
| `/services` | Services | Grille des 3 services |
| `/services/conseil-strategie` | ServiceConseil | Conseil & stratégie |
| `/services/audit-diagnostic` | ServiceAudit | Audit & diagnostic |
| `/services/assistance-juridique` | ServiceJuridique | Assistance juridique |
| `/formations` | Formations | Catalogue + featured + newsletter |
| `/formations/:slug` | FormationSingle | Détail d'une formation |
| `/event/:slug` | EvenementSingle | Détail d'un événement |
| `/blog` | Blog | Actualités + slider |
| `/blog/:slug` | BlogSingle | Article détaillé |
| `/contact` | Contact | Formulaire + newsletter + carte |
| `/mentions-legales` | LegalNotices | Mentions légales |
| `*` | NotFound | 404 |

**Header** : visible sur toutes les routes sauf 404.

**Footer** : visible si la route est connue (vérifiée via `knownRoutes` dans `App.jsx`).

---

## 4. Design System (Tailwind CSS v4 @theme)

### 4.1 Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--color-primary` | `#0E4063` | Texte, fonds foncés |
| `--color-primary-hover` | `#15517C` | Hover primary |
| `--color-accent` | `#E5A81A` | CTA, highlights, orange |
| `--color-accent-light` | `#F5C75D` | Hover accent clair |
| `--color-accent-dark` | `#B8860B` | Hover accent foncé |
| `--color-bg` | `#FFFFFF` | Fond principal |
| `--color-bg-alt` | `#F5F7FA` | Fond alternatif |
| `--color-text` | `#1F2933` | Texte principal |
| `--color-text-muted` | `#6B7280` | Texte secondaire |
| `--color-success` | `#0F9F6E` | Vert succès |
| `--color-error` | `#D64545` | Rouge erreur |

### 4.2 Typographie

| Utilité | Mobile | Desktop | Poids | Font |
|---|---|---|---|---|
| `text-h1-m/d` | 3rem | 4rem | 700 | Space Grotesk |
| `text-h2-m/d` | 2.25rem | 3rem | 600 | Space Grotesk |
| `text-h3-m/d` | 1.75rem | 2rem | 600 | Space Grotesk |
| `text-label` | 0.75rem | — | 500 | Space Grotesk |
| `text-small` | 0.875rem | — | 400 | Space Grotesk |
| `text-body` | 1rem | — | 400 | Poppins |

Headlines : `font-display` (Space Grotesk) — tracking négatif.

Corps : `font-sans` (Poppins).

### 4.3 Bouton (Button.jsx)

`rounded-pill` (`9999px`), `px-8 py-4`, `tracking-tight`.

Variants :
- **primary** : fond `#E5A81A`, texte blanc
- **accent** : fond `primary`, texte blanc
- **ghost** : transparent, texte `#E5A81A`
- **outline** : transparent, bordure primaire

Comportement : `whileHover={{ y: -2 }}`, `whileTap={{ scale: 0.96 }}` (Framer Motion).

**Règle stricte** : jamais `w-full`. Toujours utiliser le composant `Button` pour les actions principales.

### 4.4 Icônes dans les cartes d'information

Toujours `w-10 h-10 rounded-full` avec fond `bg-accent/10` et icône `text-accent`.

Pour le texte long, combinaison obligatoire :
- `flex-shrink-0` sur l'icône
- `truncate` sur le texte
- `min-w-0` sur le conteneur texte à l'intérieur d'une flex row

---

## 5. API WordPress

### 5.1 Configuration

Fichiers `.env` :

```
# .env.development
VITE_WP_API_BASE=http://localhost:8881/wp-json/wp/v2

# .env.production
VITE_WP_API_BASE=https://admin.k-empirecorporation.com/wp-json/wp/v2
```

**Dev** : Vite proxy (`/wp-json` → `localhost:8881`) évite le CORS.

**Prod** : CORS configuré côté WordPress — le plugin `kempire-cpt` définit les en-têtes CORS dans `rest-forms.php` :

- `Access-Control-Allow-Origin` : domaine frontend (lu depuis l'option `kempire_frontend_url`, fallback `https://k-empirecorporation.com`)
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Methods : POST, OPTIONS`
- `Access-Control-Allow-Headers : Content-Type, Authorization`

Les endpoints `/kempire/v1/*` utilisent `permission_callback: '__return_true'` (pas d'authentification requise).

### 5.2 API base (`src/config/api.js`)

```js
WP_API_URL = import.meta.env.VITE_WP_API_BASE || 'http://localhost:8881/wp-json/wp/v2';
```

Endpoints : `posts`, `pages`, `formations`, `evenements`, `categories`, `tags`, `media`, `users`.

### 5.3 Transformers

Chaque CPT a son propre fichier API avec un `transform*()` qui nettoie les données :

- **formations.js** : `transformFormation(formation)` — décode HTML entities, extrait `_embedded` media, traite `kempire_trainers` (images via `getMediaUrl`), transforme le programme (ACF repeater `program` → tableau plat), champs `objectives`, `prerequisites`, `practical`.
- **evenements.js** : `transformEvenement(evenement)` — nettoie excerpt (strip HTML), calcule `spotsLeft`, gère `event_date` (format français), `event_format`.
- **posts.js** : `transformPost(post)` — extrait featured image, auteur, catégories, champs ACF `author_role`, `author_image`, `read_time`.

### 5.4 Hooks React Query

Hooks disponibles :

| Hook | Fn API | Cache key |
|---|---|---|
| `usePosts(page, perPage)` | `getPosts()` | `['posts', page, perPage]` |
| `usePost(slug)` | `getPostBySlug()` | `['post', slug]` |
| `useRecentPosts(limit)` | `getRecentPosts()` | `['posts', 'recent', limit]` |
| `usePostsByCategory(id)` | `getPostsByCategory()` | `['posts', 'category', id]` |
| `useCategories()` | `getCategories()` | `['categories']` |
| `useMultiplePosts(slugs)` | — | `['post', slug]` × N |
| `useFormations(params)` | `getFormations()` | `['formations', params]` |
| `useFormation(slug)` | `getFormationBySlug()` | `['formation', slug]` |
| `useFeaturedFormations()` | `getFeaturedFormations()` | `['formations', 'featured']` |
| `useFormationsByCategory(id)` | `getFormationsByCategory()` | `['formations', 'category', id]` |
| `useMultipleFormations(slugs)` | — | `['formation', slug]` × N |
| `useEvenements()` | `getEvenements()` | `['evenements']` |
| `useEvenement(slug)` | `getEvenementBySlug()` | `['evenement', slug]` |
| `useUpcomingEvenements(limit)` | `getUpcomingEvenements()` | `['evenements', 'upcoming', limit]` |
| `useMultipleEvenements(slugs)` | — | `['evenement', slug]` × N |

Config globale : `staleTime: 5min`, `cacheTime: 30min`, `retry: 2`, `refetchOnWindowFocus: false`.

---

## 6. Système de Formulaires

### 6.1 API (`src/api/forms.js`)

Fonction générique `submitForm(endpoint, data)` → `fetch()` POST avec `Content-Type: application/json`.

Construction de l'URL admin :

```js
ADMIN_API_URL = import.meta.env.VITE_WP_ADMIN_API_URL || (
  import.meta.env.PROD
    ? WP_BASE.replace('/wp/v2', '/kempire/v1')
    : '/wp-json/kempire/v1'
);
```

En dev : URL relative ⇒ Vite proxy. En prod : URL absolue.

Logging : préfixe `[forms]` pour tous les logs (debug, error).

Endpoints disponibles :

| Fn | Endpoint `/kempire/v1/` | Usage |
|---|---|---|
| `submitNewsletter(data)` | `newsletter` | Inscription newsletter |
| `submitFormationInscription(data)` | `inscription-formation` | Inscription formation |
| `submitEvenementInscription(data)` | `inscription-evenement` | Inscription événement |
| `submitDevis(data)` | `devis` | Demande de devis |
| `submitRdv(data)` | `rdv` | Demande de rendez-vous |
| `submitCommunaute(data)` | `communaute` | Rejoindre communauté |

Chaque appel vérifie `response.ok` puis `json.success`, et throw une erreur avec le message du serveur si échec.

### 6.2 Toast System (`src/context/ToastContext.jsx`)

Provider `<ToastProvider>` + hook `useToast()`.

```js
const toast = useToast();
toast('Message de succès');       // type='success' par défaut (vert)
toast("Message d'erreur", 'error'); // type='error' (rouge)
```

Position : fixed bottom-6 right-6, z-[200]. Animation d'entrée/sortie via Framer Motion. Durée : 4s. Bouton X pour fermer.

### 6.3 Modal d'inscription Formation (FormationSingle.jsx)

4 étapes avec barre de progression :

1. **Type d'inscription** : Radio `individuelle` / `institutionnelle`
2. **Informations** : Nom, Email, Téléphone, Fonction, Pays (requis)
3. **Format & Objectif** : Radio `en ligne` / `présentiel` / `intra-entreprise` + textarea objectif
4. **Confirmation** : Message rassurant ("Un conseiller vous contactera sous 24h..."), case à cocher acceptContact, récapitulatif, bouton Envoyer

À l'envoi : `submitFormationInscription()` avec les données + `formation_slug` + `formation_id`.

Message de succès toast : "Inscription envoyée ! Un conseiller vous contactera sous 24h."

### 6.4 Modal d'inscription Événement (EvenementSingle.jsx)

3 étapes :

1. **Présentation** : Icône, phrase d'accroche, 3 bénéfices (connaissances pratiques, networking, attestation)
2. **Informations** : Nom, Email, Téléphone, Organisation, Fonction, Pays
3. **Confirmation** : Message rassurant, case à cocher, récapitulatif + bouton Confirmer

À l'envoi : `submitEvenementInscription()` avec `evenement_slug` + `evenement_id`.

### 6.5 Newsletter

Champs : `email` (required), `nom`, `source` (optionnel — identifie la provenance : `home`, `about`, `contact`, `formation-sidebar`, `event-sidebar`).

Présente dans :
- HomeNewsletter (home + formations)
- AboutNewsletter (about)
- ContactNewsletter (contact)
- Sidebar FormationSingle
- Sidebar EvenementSingle

### 6.6 Devis et RDV

- `ContactSection.jsx` → `submitDevis()` avec nom+email+phone+message
- `BookingModal.jsx` → `submitRdv()` (context `BookingModalContext`)

---

## 7. Pages détaillées

### 7.1 FormationSingle.jsx

URL : `/formations/:slug`

Structure :
- Hero image 400-500px avec dégradé
- Main content (col-span-2) : catégorie + niveau → titre → description (hook) → contenu Gutenberg (content.rendered) → infos clés (2-col grid avec icônes circulaires) → objectifs → public → prérequis → formateurs → programme → modalités pratiques → CTA inscription + WhatsApp
- Sidebar (col-span-1) : autres formations → newsletter

**Règles prix** : jamais de montant. Si `formation.price` est truthy → "Formation payante" (couleur accent), sinon "Formation gratuite" (couleur green). Appliqué en 3 endroits : infos clés, CTA, récapitulatif modal.

**Bouton WhatsApp** : cercle vert (`w-12 h-12 bg-green-500 rounded-full`) avec icône `MessageCircle` de Lucide. Lien `https://wa.me/228` (placeholder).

### 7.2 EvenementSingle.jsx

URL : `/event/:slug`

Structure similaire à FormationSingle mais :
- Contenu Gutenberg affiché sous "Détails"
- Programme (HTML) + Intervenants (ACF repeater)
- Prix → block "Événement payant" (accent) ou "Événement gratuit" (vert)
- Infos en 2-col grid : date, heure, durée, lieu, places (registered/spots), format (avec icône `MapPinHouse` si présentiel, `Monitor` si visioconférence)
- Bouton S'inscrire désactivé si complet (registered >= spots)
- "Autres formations" remplacé par "Événements à venir"
- Pas de HomeNewsletter bottom (déjà dans la sidebar)
- Footer visible

### 7.3 Blog.jsx

URL : `/blog`

Logique de tri dans `Blog.jsx` :

1. Récupère les 10 derniers posts + tous les événements + formations featured
2. Combine events + posts en `allNews`
3. Trie par `dateTimestamp` décroissant (`parseDate()` gère ISO et format français "20 Avril 2026")
4. Slice `allNews.slice(0, 4)` pour le slider `BlogRecentNews`
5. `isFeatured = index === 0 && currentSlide === 0` → premier item du premier slide occupe 2 colonnes (`lg:col-span-2`)

Slider : `itemsPerSlide = 5` (pagination par 5, affichage en grille 2+3 colonnes).

Section `BlogArticles` : pagination par 3 items.

### 7.4 Formations.jsx (catalogue)

URL : `/formations`

Composants : Hero → Types → Catalog (avec recherche + filtres + slider) → Benefits → CTA → Newsletter.

Catalogue `FormationsCatalog.jsx` :
- Barre de recherche avec icône orange dans cercle
- Filtre par niveau (Tous niveaux, Intermédiaire, Avancé)
- Filtre par catégorie
- Formation featured (full-width, gradient primary)
- Formations régulières en slider (3 par slide) ou grille si < 6
- **Règle** : le prix dans la carte du catalogue utilise `formation.price` truthy → "Formation payante" (accent) / "Formation gratuite" (green-600)

---

## 8. HomePopup

Déclenché après 8 secondes (`setTimeout`), une seule fois par session (`hasShown`).

2 modes :
- **Avec formation featured** : affiche l'image + titre + lien "Voir le programme" + boutons Telegram/WhatsApp
- **Sans formation featured** : design dégradé primary + message "Rejoignez 5000+ Professionnels" + boutons communautés

Liens :
- Telegram : `https://t.me/kempirecorporation`
- WhatsApp : `https://wa.me/228`

---

## 9. WordPress Plugin Requis (`kempire-cpt`)

Le site dépend d'un plugin WordPress qui expose :

### CPT personnalisés
- **`formations`** : avec ACF fields (hook, description, format, location, audience, level, price, next_session, objectives, prerequisites, program, practical_*, featured, kempire_trainers)
- **`evenements`** : avec ACF fields (event_date, event_time, event_location, event_spots, event_registered, event_format, event_duration, event_price, event_programme, event_intervenants)

### Routes API REST personnalisées (`/kempire/v1/*`)
- `POST /kempire/v1/newsletter`
- `POST /kempire/v1/inscription-formation`
- `POST /kempire/v1/inscription-evenement`
- `POST /kempire/v1/devis`
- `POST /kempire/v1/rdv`
- `POST /kempire/v1/communaute`

### Filtres CORS (`rest-forms.php`)
- Hook `allowed_http_origins` : ajoute le domaine frontend aux origines WP autorisées
- Hook `rest_pre_serve_request` : définit `Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials: true`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`
- Gère les pré-requêtes OPTIONS (retour 204)
- L'origine frontend est lue depuis l'option WP `kempire_frontend_url` ou la constante `KEMPIRE_FRONTEND_URL` (wp-config.php)

### Page de réglages (`integrations.php`)
- Menu "K-Empire Intégrations" dans Réglages WordPress
- Champ "URL du frontend" pour configurer l'origine CORS sans modifier le code

---

## 10. Contenu Statique

`src/constants/content.js` exporte :

- `HOME_CONTENT` : hero, stats, expertise, services, formations, whyUs, testimonials, contact
- `ABOUT_CONTENT` : hero, mission, vision, values, team, stats, cta
- `COMMON_CONTENT` : header (nav + cta Button), footer (about, contact, socialLinks)
  - X : `https://x.com/K_E_CORPORATION`
  - LinkedIn : `https://www.linkedin.com/company/kempirecorporation-tg/`
  - Facebook : `https://www.facebook.com/AideJuridique7.0`

---

## 11. Conventions et Règles

### Gutenberg (content.rendered)

Le contenu éditeur Gutenberg (champ `content.rendered` de l'API WP) est affiché via `dangerouslySetInnerHTML` avec des classes Tailwind `[&_p]:mb-4`, `[&_ul]:list-disc`, etc.

**Pas de `prose`** : Tailwind v4 ne fournit pas `@tailwindcss/typography` par défaut.

### Prix — jamais de montant affiché

Remplacé par "Formation payante" / "Formation gratuite" / "Événement payant" / "Événement gratuit".

Présent dans : FormationSingle (3 endroits), EvenementSingle, FormationsCatalog (carte + featured), FormationCard.

### Pas de "Sur demande"

Remplacé par la logique `payant/gratuit` basée sur le champ `price` (truthy = payant, falsy = gratuit).

### WhatsApp

Bouton cercle vert avec `MessageCircle` → `https://wa.me/228`.

### News — tri et affichage

- Les événements (ACF `event_date`) et les posts (WP `date`) sont combinés en un seul tableau
- Trié par `dateTimestamp` (timestamp numérique) descendant
- `parseDate()` gère ISO (new Date()) et dates françaises (regex `(\d{1,2})\s+(\w+)\s+(\d{4})` avec mois français)
- Le premier item du premier slide reçoit un traitement "featured" (2 colonnes)
- `BlogRecentNews` prend `allNews.slice(0, 4)`

---

## 12. Dev vs Production

| Aspect | Dev | Production |
|---|---|---|
| API base | `localhost:8881` | `admin.k-empirecorporation.com` |
| CORS | Vite proxy (aucun) | WordPress plugin `kempire-cpt` |
| Formulaires | URL relative `/wp-json/kempire/v1/...` | Absolute `https://admin.k-empire.../kempire/v1/...` |
| Commandes | `npm run dev` | `npm run build` + déploiement statique |
| Port | `localhost:5173` (Vite) | Domaine frontend (`k-empirecorporation.com`) |

---

## 13. WordPress Idées reçues et rappels

- Les événements utilisent la date ACF `event_date` (format français), pas `post.date`
- Les posts utilisent `post.date` (ISO) ou `post.modified`
- L'API REST WP trie les événements par `event_date` (futur), les posts par date de publication
- Les endpoints `/kempire/v1/*` sont en `permission_callback: '__return_true'` (pas de cookie WP requis)
- Le CORS avec credentials est activé pour préparer d'éventuelles routes protégées futures
- La constante `KEMPIRE_FRONTEND_URL` dans `wp-config.php` est prioritaire sur l'option DB

---

## 14. Fichiers WordPress (côté plugin)

```
wp-content/plugins/kempire-cpt/
├── kempire-cpt.php               # Plugin header + initialisation
├── includes/
│   ├── cpt-formations.php        # CPT Formations + ACF fields
│   ├── cpt-evenements.php        # CPT Evenements + ACF fields
│   ├── rest-forms.php            # Routes API /kempire/v1/* + CORS
│   └── integrations.php          # Page de réglages WP Admin
```

### rest-forms.php

Filtre `allowed_http_origins` → ajoute `KEMPIRE_FRONTEND_URL` aux origines autorisées.

Hook `rest_pre_serve_request` :
- OPTIONS → 204 No Content
- `Access-Control-Allow-Origin: {frontend_url}`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Methods: POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

### integrations.php

Menu "K-Empire Intégrations" dans Réglages WordPress.

Champ : "URL du frontend" (stocké dans option `kempire_frontend_url`).

### wp-config.php (alternative recommandée)

```php
define('KEMPIRE_FRONTEND_URL', 'https://k-empirecorporation.com');
```

Prioritaire sur l'option DB, plus sécurisé (pas modifiable depuis l'admin).
