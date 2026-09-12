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
| Sanity | 6.13.0 | Headless CMS (studio + client) |
| @sanity/client | 8.6.1 | Client GROQ |
| @sanity/image-url | 2.1.1 | Optimisation d'images |
| @sanity/vision | 6.13.0 | Explorateur GROQ (studio) |
| Lucide React | 0.477.0 | Icônes |

---

## 2. Architecture des fichiers

```
kempire/
├── index.html
├── vite.config.js
├── sanity.config.js              # Config studio Sanity
├── sanity.cli.js                 # CLI Sanity (sanity dev / deploy)
├── schemas/                      # Schémas Sanity (structure éditoriale)
│   ├── index.js
│   ├── post.js                   # Articles (posts)
│   ├── formation.js              # Formations
│   ├── evenement.js              # Événements
│   ├── author.js                 # Auteurs
│   ├── category.js               # Catégories
│   ├── temoignage.js             # Témoignages (édition site)
│   ├── statistiques.js           # Statistiques (singleton site)
│   └── valeurs.js                # Bandeau valeurs (singleton site)
├── scripts/
│   └── seed-site-content.mjs     # Seed idempotent témoignages/statistiques/valeurs
├── .env.development
├── .env.production
├── DOCUMENTATION.md
└── src/
    ├── main.jsx                    # Point d'entrée React
    ├── App.jsx                     # Routes, providers (Query, Toast, BookingModal)
    ├── index.css                   # Design system (@theme Tailwind v4)
    ├── config/
    │   └── sanity.js               # Client Sanity + urlFor + portableTextToHtml + query keys
    ├── constants/
    │   ├── content.js              # Contenus statiques (home, about, footer, nav)
    │   └── charte.js               # Charte officielle + fallbacks témoignages/statistiques/valeurs
    ├── context/
    │   ├── ToastContext.jsx        # Système de toasts (success/error)
    │   └── BookingModalContext.jsx # Contexte modal RDV
    ├── hooks/
    │   ├── index.js                # Re-export des hooks
    │   ├── usePosts.js             # Articles (posts) — GROQ
    │   ├── useFormations.js        # Formations — GROQ
    │   ├── useEvenements.js        # Événements — GROQ
    │   └── useSiteContent.js       # Témoignages / statistiques / valeurs — GROQ
    ├── api/
    │   └── forms.js                # Soumission formulaires (newsletter, devis, rdv, inscriptions)
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
    │   │   ├── Slider.jsx          # Carrousel générique avec dots + navigation
    │   │   ├── PageBanner.jsx      # Bannière de page
    │   │   ├── Loading.jsx
    │   │   ├── BookingModal.jsx    # Modal RDV (devis)
    │   │   └── CustomCursor.jsx    # Curseur personnalisé
    │   ├── home/                   # 11 composants Home
    │   │   ├── HomeHero.jsx
    │   │   ├── HomePartners.jsx    # Partenaires (marquee)
    │   │   ├── HomeExpertise.jsx
    │   │   ├── HomeStats.jsx
    │   │   ├── HomeValuesMarquee.jsx
    │   │   ├── HomeServicesPreview.jsx
    │   │   ├── HomeFormationsPreview.jsx
    │   │   ├── HomeWhyUs.jsx
    │   │   ├── HomeTestimonials.jsx
    │   │   ├── HomeNewsletter.jsx
    │   │   └── HomeContactCta.jsx
    │   ├── about/                  # 7 composants About
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

## 5. Sanity (Headless CMS)

### 5.1 Configuration

Fichiers `.env` :

```
# .env.development
VITE_SANITY_PROJECT_ID=xxxxxxxx
VITE_SANITY_DATASET=production

# .env.production
VITE_SANITY_PROJECT_ID=xxxxxxxx
VITE_SANITY_DATASET=production
```

**Studio** : `npm run studio` (`sanity dev`) — éditeur de contenu sur `localhost:3333`.

**Client** (`src/config/sanity.js`) : `createClient` avec `projectId`, `dataset`, `apiVersion: '2026-01-01'`, `useCdn: import.meta.env.PROD`.

### 5.2 Schémas (`schemas/`)

| Schéma | Contenu |
|---|---|
| `post.js` | title, slug, excerpt, coverImage, body (portable text + images), categories (réf.), author (réf.), featured, tags, readTime |
| `formation.js` | title, slug, hook, description, content (portable text), category (réf.), level, format, duration, audience, prerequisites, featured, trainers[], program[], objectives[], practical{}, registerLink, coverImage |
| `evenement.js` | title, slug, excerpt, description, content (portable text), programme, category (réf.), type, startDateTime (datetime), endDateTime, duration, format, lieu, intervenants[], price, capacity, registered, registerLink, coverImage |
| `author.js` | name, slug, role, bio, image |
| `category.js` | name, slug, description |
| `temoignage.js` | nom, fonction, structure, texte, photo (image), consentement (boolean — filtré à `true` côté front) |
| `statistiques.js` | singleton `site.statistiques` : items[] { value, label, text } |
| `valeurs.js` | singleton `site.valeurs` : titreGroupe1, groupe1[] { titre, description }, titreGroupe2, groupe2[] { titre, description } |

### 5.2.1 Contenu éditable Home (seed + fallbacks)

Les sections témoignages, statistiques et valeurs du site se lisent depuis Sanity avec **fallback statique** (`src/constants/charte.js`) tant que ces champs sont absents.

Seed idempotent (n'écrase jamais les documents existants) :

```bash
npm run seed
```

Envs : `SANITY_PROJECT_ID` (ou `VITE_SANITY_PROJECT_ID`), `SANITY_DATASET` (défaut `production`), `SANITY_TOKEN` (ou `SANITY_API_TOKEN`). Crée `site.statistiques`, `site.valeurs` et `site.temoignage-1..3` (témoignages seedés avec `consentement: false`).

### 5.3 Rendu du contenu (`portableTextToHtml`)

Le contenu éditeur Sanity (portable text, ex. `post.body`) est converti en HTML dans `src/config/sanity.js` via `portableTextToHtml(blocks)`, puis affiché avec `dangerouslySetInnerHTML` (classes Tailwind `[&_p]:mb-4`, `[&_ul]:list-disc`, etc.).

Gère : titres h1–h6, paragraphes, blockquotes, listes ul/ol, gouttes de style (strong, em, code, souligné, barré), liens (`markDefs`) et images inline.

**Pas de `prose`** : Tailwind v4 ne fournit pas `@tailwindcss/typography` par défaut.

### 5.4 Hooks React Query

Hooks GROQ disponibles :

| Hook | Query GROQ | Cache key |
|---|---|---|
| `usePosts(page, perPage)` | posts triés par `coalesce(publishedAt, _updatedAt) desc` + slice | `['posts', page, perPage]` |
| `usePost(slug)` | post par `slug.current` | `['post', slug]` |
| `useFormations()` | formations triées `featured desc, title asc` | `['formations']` |
| `useFormation(slug)` | formation par `slug.current` | `['formation', slug]` |
| `useFeaturedFormations()` | `featured == true`, triées par title | `['formations', 'featured']` |
| `useEvenements()` | événements triés `startDateTime asc` | `['evenements']` |
| `useEvenement(slug)` | événement par `slug.current` | `['evenement', slug]` |
| `useTemoignages()` | témoignages `consentement == true`, triés `_createdAt asc` | `['temoignages']` |
| `useStatistiques()` | singleton `statistiques[0]` | `['statistiques']` |
| `useValeurs()` | singleton `valeurs[0]` | `['valeurs']` |

Les hooks `useSiteContent` alimentent Accueil/À propos avec fallback : `useTemoignages` → `TEMOIGNAGES_SEED`, `useStatistiques` → `STATISTIQUES_DEFAULT`, `useValeurs` → `CHARTE_VALEURS` (importés de `src/constants/charte.js`).

Chaque hook projette via GROQ → fonction `transform*()` locale qui mappe vers la forme attendue par les composants (HTML via `portableTextToHtml`, dates, images `asset->url`).

Config globale : `staleTime: 5min`, `cacheTime: 30min`, `retry: 2`, `refetchOnWindowFocus: false`.

---

## 6. Système de Formulaires

### 6.1 API (`src/api/forms.js`)

Fonction générique `submitForm(endpoint, data)` → `fetch()` POST vers `/api/forms` (fonction serverless Vercel, même origine, marche dev + prod).

Logging : préfixe `[forms]` pour tous les logs (debug, error).

Endpoints disponibles (champ `endpoint` envoyé dans le body) :

| Fn | `endpoint` | Usage |
|---|---|---|
| `submitNewsletter(data)` | `newsletter` | Inscription newsletter |
| `submitFormationInscription(data)` | `inscription-formation` | Inscription formation |
| `submitEvenementInscription(data)` | `inscription-evenement` | Inscription événement |
| `submitDevis(data)` | `devis` | Demande de devis |
| `submitRdv(data)` | `rdv` | Demande de rendez-vous |

Côté serveur : `api/forms.js` (fonction Vercel) valide l'endpoint, ne garde que les champs attendus pour ce type, puis crée un document Sanity (`<:type>` — cf. §8) avec `submittedAt` et le statut par défaut. Pour `inscription`/`inscriptionEvenement`, il lie les références `formation`/`session`/`evenement` quand les IDs sont envoyés. Nécessite les env vars `SANITY_PROJECT_ID`, `SANITY_DATASET` et `SANITY_TOKEN` (token d'écriture, jamais exposé côté client).

Un e-mail de notification est également envoyé via **Resend** (`fetch` natif vers l'API REST, non bloquant) si `RESEND_API_KEY`, `RESEND_FROM` et `RESEND_TO` sont définies. Un échec d'envoi e-mail n'entraîne pas l'échec de la soumission.

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
- Main content (col-span-2) : catégorie + niveau → titre → description (hook) → contenu portable text Sanity (content) → infos clés (2-col grid avec icônes circulaires) → objectifs → public → prérequis → formateurs → programme → modalités pratiques → CTA inscription + WhatsApp
- Sidebar (col-span-1) : autres formations → newsletter

**Règles prix** : jamais de montant. Si `formation.price` est truthy → "Formation payante" (couleur accent), sinon "Formation gratuite" (couleur green). Appliqué en 3 endroits : infos clés, CTA, récapitulatif modal.

**Bouton WhatsApp** : cercle vert (`w-12 h-12 bg-green-500 rounded-full`) avec icône `MessageCircle` de Lucide. Lien `https://wa.me/228` (placeholder).

### 7.2 EvenementSingle.jsx

URL : `/event/:slug`

Structure similaire à FormationSingle mais :
- Contenu portable text Sanity affiché sous "Détails"
- Programme (HTML) + Intervenants (schéma)
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

## 8. Backend Formulaires (Vercel)

Les soumissions de formulaires (newsletter, inscriptions, devis, rdv) passent par une fonction serverless Vercel (`api/forms.js`), stockées dans Sanity et notifiées par email via Resend.

### API (`POST /api/forms`)

Body JSON : `{ "endpoint": "<type>", ...champs }`, `endpoint` ∈ `newsletter`, `inscription-formation`, `inscription-evenement`, `devis`, `rdv`.

Réponse : `200 {"success":true}` ou `400/500 {"success":false, "message"}`.

### Stockage (Sanity)

La fonction mappe `endpoint → type de document` :
- `newsletter` → `soumissionNewsletter`
- `inscription-formation` → `inscription`
- `inscription-evenement` → `inscriptionEvenement`
- `devis` → `soumissionDevis`
- `rdv` → `soumissionRdv`

Chaque soumission crée un document via le client `@sanity/client` (`useCdn: false`, écrire direct). Pour `inscription`, les références `formation` et `session` sont liées si leurs IDs sont envoyés. Les soumissions sont consultées/modifiées dans Sanity Studio (statuts, notes internes).

**Env vars requises** : `SANITY_PROJECT_ID`, `SANITY_DATASET` (défaut `production`), `SANITY_TOKEN` (token d'écriture — jamais exposé au navigateur).

### Notification email (Resend)

Appel non bloquant à l'API REST Resend (`POST https://api.resend.com/emails`) si `RESEND_API_KEY`, `RESEND_FROM` et `RESEND_TO` sont définies. Template HTML simple récapitulant les champs et le type. Un échec d'email n'échoue pas la soumission.

---

## 9. Contenu Statique

`src/constants/content.js` exporte :

- `HOME_CONTENT` : hero, stats, expertise, services, formations, whyUs, testimonials, contact
- `ABOUT_CONTENT` : hero, mission, vision, values, team, stats, cta
- `COMMON_CONTENT` : header (nav + cta Button), footer (about, contact, socialLinks)
  - X : `https://x.com/K_E_CORPORATION`
  - LinkedIn : `https://www.linkedin.com/company/kempirecorporation-tg/`
  - Facebook : `https://www.facebook.com/AideJuridique7.0`

---

## 10. Conventions et Règles

### Gutenberg (portable text Sanity)

Le contenu éditeur Sanity (portable text, ex. `post.body`, `formation.content`, `evenement.content`) est converti en HTML via `portableTextToHtml()` puis affiché via `dangerouslySetInnerHTML` avec des classes Tailwind `[&_p]:mb-4`, `[&_ul]:list-disc`, etc.

**Pas de `prose`** : Tailwind v4 ne fournit pas `@tailwindcss/typography` par défaut.

### Prix — jamais de montant affiché

Remplacé par "Formation payante" / "Formation gratuite" / "Événement payant" / "Événement gratuit".

Présent dans : FormationSingle (3 endroits), EvenementSingle, FormationsCatalog (carte + featured), FormationCard.

### Pas de "Sur demande"

Remplacé par la logique `payant/gratuit` basée sur le champ `price` (truthy = payant, falsy = gratuit).

### WhatsApp

Bouton cercle vert avec `MessageCircle` → `https://wa.me/228`.

### News — tri et affichage

- Les événements (datetime Sanity `startDateTime`) et les posts (datetime `publishedAt`) sont combinés en un seul tableau
- Trié par `dateTimestamp` (timestamp numérique) descendant
- `parseDate()` gère ISO (new Date()) et dates françaises (regex `(\d{1,2})\s+(\w+)\s+(\d{4})` avec mois français)
- Le premier item du premier slide reçoit un traitement "featured" (2 colonnes)
- `BlogRecentNews` prend `allNews.slice(0, 4)`

---

## 11. Dev vs Production

| Aspect | Dev | Production |
|---|---|---|
| CMS | Sanity studio (`sanity dev`, port 3333) | Sanity cloud (managed) |
| Contenu | GROQ queries (client Sanity) | GROQ queries (client Sanity) |
| Formulaires | URL relative `/api/forms` | URL relative `/api/forms` |
| CORS formulaires | Même origine (aucun CORS nécessaire) | Vercel Functions (même domaine) |
| Commandes | `npm run dev` / `npm run studio` | `npm run build` + déploiement statique |
| Port | `localhost:5173` (Vite), `localhost:3333` (studio) | Domaine frontend (`k-empirecorporation.com`) |

---

## 12. Sanity — rappels

- Les événements utilisent le champ datetime Sanity `startDateTime` (pas de champ ACF)
- Les posts utilisent `publishedAt` (SOUS forme de datetime Sanity) ou `_updatedAt`
- GROQ trie les événements par `startDateTime` (croissant), les posts par `coalesce(publishedAt, _updatedAt)`

---

## 13. Fichiers Backend (Vercel)

```
api/
└── forms.js                     # Fonction Vercel : validation + stockage KV des 5 formulaires
```
