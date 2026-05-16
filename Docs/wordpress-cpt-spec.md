# WordPress - Spécification complète des champs pour le Frontend
## K-EMPIRE CORPORATION

Ce document détaille chaque champ utilisé dans le code React pour les formations, événements et articles. Pour chaque champ, j'explique :
1. **Ce qu'il fait** dans le Frontend
2. **Comment il est utilisé** dans le code
3. **Comment le créer** dans WordPress avec ACF

---

# SECTION 1 : FORMATIONS (FormationSingle.jsx)

## Structure des données dans le code React

```javascript
{
  id: 1,
  title: "Sécurisation des contrats d'affaires en droit OHADA",
  hook: "Maîtrisez les principes juridiques essentiels pour sécuriser vos contrats et réduire les risques...",
  duration: "3 jours",
  format: "Présentiel / En ligne",
  location: "Lomé, Togo",
  audience: "Juristes, responsables juridiques, cadres dirigeants, entrepreneurs",
  category: "Droit",
  level: "Intermédiaire",
  price: "450 000FCFA",
  nextSession: "15 Avril 2026",
  image: "https://...",
  objectives: ["...", "..."],
  prerequisites: "Aucun prérequis particulier...",
  program: [{ title: "...", content: "..." }],
  practical: { duration, schedule, materials, evaluation },
  trainers: [{ name, role, bio, image }],
  featured: true,
  type: "Formation"
}
```

---

## CHAMPS DES FORMATIONS

### 1. title (Titre)
- **Description** : Titre principal de la formation
- **Utilisation frontend** : `<h1>{formation.title}</h1>` - Affiche le titre en grand sur la page détail
- **WordPress** : Champ natif `title` du post
- **Comment le créer** : Pas besoin de crééer - c'est le titre natif du CPT `formations`
- **API** : `title.rendered`

---

### 2. hook (Accroche/Sous-titre)
- **Description** : Phrase d'accroche qui apparaît sous le titre pour donner envie
- **Utilisation frontend** : `<p className="text-lg text-text-muted">{formation.hook}</p>` - Texte gris sous le titre
- **WordPress** : ACF - `hook`
- **Comment le créer** :
  - Type : Text Area
  - Nom du champ : `hook`
  - Label : "Accroche / Sous-titre"
  - Instructions : "Entrez une phrase d'accroche qui s'affiche sous le titre"
  - Exemple : "Maîtrisez les principes juridiques essentiels pour sécuriser vos contrats et réduire les risques."
- **API** : `acf.hook`

---

### 3. duration (Durée)
- **Description** : Durée totale de la formation
- **Utilisation frontend** : Affiché dans la grille d'informations clés avec icône Clock
  ```jsx
  <div className="flex items-center gap-3">
    <Clock size={18} className="text-accent" />
    <div><p className="text-xs text-text-muted">Durée</p><p className="text-sm font-semibold">{formation.duration}</p></div>
  </div>
  ```
- **WordPress** : ACF - `duration`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `duration`
  - Label : "Durée"
  - Instructions : "Entrez la durée (ex: 3 jours, 2 jours)"
  - Exemple : "3 jours"
- **API** : `acf.duration`

---

### 4. format (Format)
- **Description** : Format de la formation (Présentiel, En ligne, ou les deux)
- **Utilisation frontend** : Affiché dans la grille d'informations clés avec icône Video, aussi dans le badge de la card
  ```jsx
  <div className="flex items-center gap-3">
    <Video size={18} className="text-accent" />
    <div><p className="text-xs text-text-muted">Format</p><p className="text-sm font-semibold">{formation.format}</p></div>
  </div>
  ```
- **WordPress** : ACF - `format`
- **Comment le créer** :
  - Type : Select (ou Text si自由)
  - Nom du champ : `format`
  - Label : "Format"
  - Choices : Présentiel, En ligne, Présentiel / En ligne
  - Instructions : "Sélectionnez le format de la formation"
  - Exemple : "Présentiel / En ligne"
- **API** : `acf.format`

---

### 5. location (Lieu)
- **Description** : Lieu où se déroule la formation
- **Utilisation frontend** : Affiché dans la grille d'informations clés avec icône MapPin
  ```jsx
  <div className="flex items-center gap-3">
    <MapPin size={18} className="text-accent" />
    <div><p className="text-xs text-text-muted">Lieu</p><p className="text-sm font-semibold">{formation.location}</p></div>
  </div>
  ```
- **WordPress** : ACF - `location`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `location`
  - Label : "Lieu"
  - Instructions : "Entrez le lieu (ex: Lomé, Togo)"
  - Exemple : "Lomé, Togo"
- **API** : `acf.location`

---

### 6. audience (Public cible)
- **Description** : Description du public cible / audience
- **Utilisation frontend** : 
  1. Affiché dans la grille d'informations clés avec icône Users
  2. Affiché dans une section dédiée "Public cible" avec titre H2 et icône
  ```jsx
  <div className="flex items-center gap-3">
    <Users size={18} className="text-accent" />
    <div><p className="text-xs text-text-muted">Public</p><p className="text-sm font-semibold">{formation.audience}</p></div>
  </div>
  ```
- **WordPress** : ACF - `audience`
- **Comment le créer** :
  - Type : Text (ou Text Area si texte long)
  - Nom du champ : `audience`
  - Label : "Public cible"
  - Instructions : "Décrivez le public cible (ex: Juristes, responsables juridiques, cadres dirigeants, entrepreneurs)"
  - Exemple : "Juristes, responsables juridiques, cadres dirigeants, entrepreneurs"
- **API** : `acf.audience`

---

### 7. category (Catégorie)
- **Description** : Catégorie de la formation (Droit, Fiscalité, Management...)
- **Utilisation frontend** : 
  1. Badge affiché sous le titre : `<span className="bg-accent text-white">{formation.category}</span>`
  2. Utilisé pour filtrer les formations dans la page liste
- **WordPress** : Taxonomie WordPress - `categorie_formation`
- **Comment le créer** :
  - Créer une taxonomie `categorie_formation` pour le CPT `formations`
  - Termes possibles : Droit, Fiscalité, Management, Comptabilité, etc.
  - Utiliser les catégories WordPress natives ou taxonomie personnalisée
- **API** : `categories` (tableau d'IDs) ou taxonomie personnalisée

---

### 8. level (Niveau)
- **Description** : Niveau de la formation (Débutant, Intermédiaire, Avancé, Tous niveaux)
- **Utilisation frontend** : Badge affiché à côté de la catégorie
  ```jsx
  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
    {formation.level}
  </span>
  ```
- **WordPress** : ACF - `level`
- **Comment le créer** :
  - Type : Select
  - Nom du champ : `level`
  - Label : "Niveau"
  - Choices : Débutant, Intermédiaire, Avancé, Tous niveaux
  - Instructions : "Sélectionnez le niveau de la formation"
  - Exemple : "Intermédiaire"
- **API** : `acf.level`

---

### 9. price (Prix)
- **Description** : Prix de la formation
- **Utilisation frontend** : 
  1. Grille d'informations clés avec icône GraduationCap
  2. Section CTA : `<p className="text-2xl font-bold text-primary">{formation.price}</p>`
  3. Banner Featured Formation : `<span className="text-2xl font-bold text-white">{formation.price}</span>`
- **WordPress** : ACF - `price`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `price`
  - Label : "Prix"
  - Instructions : "Entrez le prix (ex: 450 000FCFA)"
  - Exemple : "450 000FCFA"
- **API** : `acf.price`

---

### 10. nextSession (Prochaine session)
- **Description** : Date de la prochaine session de formation
- **Utilisation frontend** : 
  1. Grille d'informations clés avec icône Calendar
  2. Section CTA : `<p className="text-sm text-text-muted">Prochaine session : {formation.nextSession}</p>`
- **WordPress** : ACF - `next_session` (ou `nextSession`)
- **Comment le créer** :
  - Type : Text (ou Date Picker avec ACF Pro)
  - Nom du champ : `next_session`
  - Label : "Prochaine session"
  - Instructions : "Entrez la date de la prochaine session (ex: 15 Avril 2026)"
  - Exemple : "15 Avril 2026"
- **API** : `acf.next_session`

---

### 11. image (Image de couverture)
- **Description** : Image principale de la formation
- **Utilisation frontend** : 
  1. Hero Banner : `<img src={formation.image} className="w-full h-full object-cover" />`
  2. Card dans les listes
  3. Featured Formation Banner
- **WordPress** : Champ natif `featured_media`
- **Comment le créer** :
  - Pas de champ ACF - utiliser le champ natif WordPress "Image mise en avant"
  - Le frontend récupère l'URL via l'API `/wp/v2/media/{id}`
- **API** : `featured_media` (ID à transformer en URL)

---

### 12. objectives (Objectifs)
- **Description** : Liste des objectifs d'apprentissage de la formation
- **Utilisation frontend** : Section "Objectifs de la formation" avec icône Target et liste à puces
  ```jsx
  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
    <Target className="text-accent" />
    Objectifs de la formation
  </h2>
  <ul className="space-y-3">
    {formation.objectives.map((objective, index) => (
      <li key={index} className="flex items-start gap-3">
        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-1" />
        <span className="text-text-muted">{objective}</span>
      </li>
    ))}
  </ul>
  ```
- **WordPress** : ACF - `objectives` (Repeater)
- **Comment le créer** :
  - Type : Repeater
  - Nom du champ : `objectives`
  - Label : "Objectifs"
  - Instructions : "Ajoutez les objectifs de la formation"
  - Min rows : 1
  - Sous-champ :
    - Nom : `objectif`
    - Type : Text
    - Label : "Objectif"
    - Exemple de valeurs :
      - "Maîtriser les fondamentaux du droit des contrats OHADA"
      - "Sécuriser vos opérations commerciales grâce à des clauses adaptées"
- **API** : `acf.objectifs` (tableau d'objets avec clé 'objectif')

---

### 13. prerequisites (Prérequis)
- **Description** : Prérequis nécessaires pour suivre la formation
- **Utilisation frontend** : Section "Prérequis" avec icône FileText
  ```jsx
  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
    <FileText className="text-accent" />
    Prérequis
  </h2>
  <p className="text-text-muted">{formation.prerequisites}</p>
  ```
- **WordPress** : ACF - `prerequisites`
- **Comment le créer** :
  - Type : Text Area
  - Nom du champ : `prerequisites`
  - Label : "Prérequis"
  - Instructions : "Décrivez les prérequis nécessaires"
  - Exemple : "Aucun prérequis particulier. Cette formation est accessible à tous les professionnels souhaitant renforcer leurs connaissances en droit des contrats."
- **API** : `acf.prerequisites`

---

### 14. program (Programme/Modules)
- **Description** : Liste des modules du programme avec titre et contenu
- **Utilisation frontend** : Section "Programme" avec cards pour chaque module
  ```jsx
  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
    <GraduationCap className="text-accent" />
    Programme
  </h2>
  <div className="space-y-4">
    {formation.program.map((module, index) => (
      <div key={index} className="p-4 bg-bg-alt rounded-xl">
        <h3 className="font-semibold text-primary mb-2">{module.title}</h3>
        <p className="text-sm text-text-muted">{module.content}</p>
      </div>
    ))}
  </div>
  ```
- **WordPress** : ACF - `program` (Repeater)
- **Comment le créer** :
  - Type : Repeater
  - Nom du champ : `program`
  - Label : "Programme"
  - Instructions : "Ajoutez les modules du programme"
  - Min rows : 1
  - Sous-champs :
    1. `module_title`
       - Type : Text
       - Label : "Titre du module"
       - Exemple : "Module 1 : Cadre juridique OHADA"
    2. `module_content`
       - Type : Text Area
       - Label : "Contenu du module"
       - Exemple : "Présentation du traité OHADA, des Actes uniformes et de leur applicabilité"
- **API** : `acf.program` (tableau d'objets avec title et content)

---

### 15. practical (Informations pratiques)
- **Description** : Bloc d'informations pratiques sur la formation (Durée détaillée, Horaires, Supports, Évaluation)
- **Utilisation frontend** : Bloc "Modalités pratiques" avec fond bleu primaire
  ```jsx
  <div className="mb-8 p-6 bg-primary rounded-2xl text-white">
    <h2 className="text-xl font-bold mb-4">Modalités pratiques</h2>
    <div className="grid md:grid-cols-2 gap-4">
      <div><p className="text-white/70 text-sm">Durée</p><p className="font-semibold">{formation.practical.duration}</p></div>
      <div><p className="text-white/70 text-sm">Horaires</p><p className="font-semibold">{formation.practical.schedule}</p></div>
      <div><p className="text-white/70 text-sm">Supports</p><p className="font-semibold">{formation.practical.materials}</p></div>
      <div><p className="text-white/70 text-sm">Évaluation</p><p className="font-semibold">{formation.practical.evaluation}</p></div>
    </div>
  </div>
  ```
- **WordPress** : 3 champs ACF séparés (ou un repeater)
- **Comment le créer** - Option 1 (3 champs séparés) :

  **Champ 1 : practical_duration**
  - Nom : `practical_duration`
  - Type : Text
  - Label : "Durée détaillée"
  - Instructions : "Durée totale (ex: 3 jours (24 heures))"
  - Exemple : "3 jours (24 heures)"

  **Champ 2 : practical_schedule**
  - Nom : `practical_schedule`
  - Type : Text
  - Label : "Horaires"
  - Instructions : "Horaire quotidien (ex: 09:00 - 17:00)"
  - Exemple : "09:00 - 17:00"

  **Champ 3 : practical_materials**
  - Nom : `practical_materials`
  - Type : Text Area
  - Label : "Supports"
  - Instructions : "Supports fournis aux participants"
  - Exemple : "Support de formation, cas pratiques, attestations"

  **Champ 4 : practical_evaluation**
  - Nom : `practical_evaluation`
  - Type : Text
  - Label : "Évaluation"
  - Instructions : "Type d'évaluation ou certification"
  - Exemple : "Quiz final + attestation de formation"

- **Comment le créer** - Option 2 (Un seul champ texte)** :
  - Nom : `modalites`
  - Type : Text Area
  - Label : "Modalités pratiques"
  - Instructions : "Entrez toutes les infos pratiques (durée, horaires, supports, évaluation)"
  - Le Frontend parses ce texte (plus simple)

- **API** : `acf.practical_duration`, `acf.practical_schedule`, `acf.practical_materials`, `acf.evaluation`

---

### 16. trainers (Formateurs)
- **Description** : Liste des formateurs avec nom, rôle, bio et photo
- **Utilisation frontend** : Section "Formateurs" avec cards
  ```jsx
  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
    <Users className="text-accent" />
    Formateurs
  </h2>
  <div className="grid md:grid-cols-2 gap-6">
    {formation.trainers.map((trainer, index) => (
      <div key={index} className="p-4 bg-bg-alt rounded-xl">
        <div className="flex items-center gap-4 mb-3">
          <img src={trainer.image} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-primary">{trainer.name}</h3>
            <p className="text-sm text-accent font-medium">{trainer.role}</p>
          </div>
        </div>
        <p className="text-sm text-text-muted">{trainer.bio}</p>
      </div>
    ))}
  </div>
  ```
- **WordPress** : ACF - `trainers` (Repeater)
- **Comment le créer** :
  - Type : Repeater
  - Nom du champ : `trainers`
  - Label : "Formateurs"
  - Instructions : "Ajoutez les formateurs de la formation"
  - Min rows : 1
  - Sous-champs :
    1. `trainer_name`
       - Type : Text
       - Label : "Nom du formateur"
       - Exemple : "Dr. Kodjo Amegah"
    2. `trainer_role`
       - Type : Text
       - Label : "Fonction / Rôle"
       - Exemple : "Expert en droit OHADA"
    3. `trainer_bio`
       - Type : Text Area
       - Label : "Biographie"
       - Exemple : "Dr. Kodjo Amegah est un expert reconnu en droit des affaires OHADA..."
    4. `trainer_image`
       - Type : Image
       - Label : "Photo du formateur"
       - Return Format : Image URL
       - Exemple : https://i.pravatar.cc/150?img=11
- **API** : `acf.trainers` (tableau d'objets avec name, role, bio, image)

---

### 17. featured (Mise en avant)
- **Description** : Booléen pour indiquer si la formation doit apparaître dans le banner "Formation à la une"
- **Utilisation frontend** : Filtré pour affichage dans le Featured Formation Banner en bas des pages
  ```jsx
  {featuredFormation.featured && <FeaturedFormationBanner formation={featuredFormation} />}
  ```
- **WordPress** : ACF - `featured` (True/False)
- **Comment le créer** :
  - Type : True/False (Checkbox)
  - Nom du champ : `featured`
  - Label : "Formation mise en avant"
  - Instructions : "Cochez pour afficher cette formation dans le banner 'Formation à la une'"
  - Default Value : Unchecked
- **API** : `acf.featured`

---

### 18. type (Type de contenu)
- **Description** : Toujours égal à "Formation" (utilisé pour le badge dans le banner Featured)
- **Utilisation frontend** : Badge "FORMATION" dans le banner Featured
  ```jsx
  <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
    {featuredFormation.type}
  </span>
  ```
- **WordPress** : ACF - `type` (Text - Hidden)
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `type`
  - Label : "Type de contenu"
  - Default Value : "Formation"
  - Visible : Non (ou utiliser une valeur fixe dans le code)
- **API** : `acf.type`

---

# SECTION 2 : ÉVÉNEMENTS (EventSingle.jsx)

## Structure des données dans le code React

```javascript
{
  id: 'event-1',
  type: 'Séminaire',
  title: "Gouvernance d'entreprise & conformité OHADA",
  excerpt: "Apprenez les meilleures pratiques de gouvernance d'entreprise...",
  content: "<p>...</p><h2>...</h2><ul>...</ul>",
  category: "Gouvernance",
  date: "25 Avril 2026",
  time: "09:00 - 17:00",
  location: "Hôtel Sarakawa, Lomé",
  spots: 30,
  registered: 18,
  image: "https://...",
  format: "Présentiel",
  duration: "1 jour"
}
```

---

## CHAMPS DES ÉVÉNEMENTS

### 1. type (Type d'événement)
- **Description** : Type d'événement (Séminaire, Webinaire, Atelier, Conférence)
- **Utilisation frontend** : Badge affiché sous le titre
  ```jsx
  <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
    {event.type}
  </span>
  ```
- **WordPress** : ACF - `event_type`
- **Comment le créer** :
  - Type : Select
  - Nom du champ : `event_type`
  - Label : "Type d'événement"
  - Choices : Séminaire, Webinaire, Atelier, Conférence
  - Instructions : "Sélectionnez le type d'événement"
  - Exemple : "Séminaire"
- **API** : `acf.event_type`

---

### 2. title (Titre)
- **Description** : Titre de l'événement
- **Utilisation frontend** : `<h1>{event.title}</h1>`
- **WordPress** : Champ natif `title` du post
- **API** : `title.rendered`

---

### 3. excerpt (Résumé)
- **Description** : Résumé court de l'événement (utilisé dans les cards de la liste)
- **Utilisation frontend** : 
  1. Liste des événements (cards avec excerpt)
  2. Meta description SEO
- **WordPress** : Champ natif `excerpt` (ou ACF si nécessaire)
- **Comment le créer** :
  - Utiliser le champ natif WordPress "Excerpt" dans le panneau Document
  - Ou créer ACF `excerpt` si besoin de plus de contrôle
- **API** : `excerpt.rendered` ou `acf.excerpt`

---

### 4. content (Contenu)
- **Description** : Contenu HTML complet de l'événement
- **Utilisation frontend** : 
  ```jsx
  <div className="prose prose-lg max-w-none text-text-muted" dangerouslySetInnerHTML={{ __html: event.content }} />
  ```
  Affiche le contenu avec styles (balises h2, ul, li, p stylisées par Tailwind Typography)
- **WordPress** : Champ natif `content`
- **API** : `content.rendered`

---

### 5. category (Catégorie)
- **Description** : Catégorie de l'événement
- **Utilisation frontend** : Badge à côté du type
  ```jsx
  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
    {event.category}
  </span>
  ```
- **WordPress** : Catégories WordPress natives
- **Comment le créer** : Créer des catégories dans WordPress (Gouvernance, Fiscalité, Droit, etc.) et les assigner aux événements
- **API** : `categories` (tableau d'IDs)

---

### 6. date (Date)
- **Description** : Date de l'événement
- **Utilisation frontend** : Dans la barre d'informations de l'événement avec icône Calendar
  ```jsx
  <div className="flex items-center gap-2 text-text-muted">
    <Calendar size={18} className="text-accent" />
    <span>{event.date}</span>
  </div>
  ```
- **WordPress** : ACF - `event_date`
- **Comment le créer** :
  - Type : Text (ou Date Picker avec ACF Pro)
  - Nom du champ : `event_date`
  - Label : "Date"
  - Instructions : "Entrez la date (ex: 25 Avril 2026)"
  - Exemple : "25 Avril 2026"
- **API** : `acf.event_date`

---

### 7. time (Horaire)
- **Description** : Horaires de l'événement
- **Utilisation frontend** : Dans la barre d'informations avec icône Clock
  ```jsx
  <div className="flex items-center gap-2 text-text-muted">
    <Clock size={18} className="text-accent" />
    <span>{event.time}</span>
  </div>
  ```
- **WordPress** : ACF - `event_time`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `event_time`
  - Label : "Horaire"
  - Instructions : "Entrez l'horaire (ex: 09:00 - 17:00)"
  - Exemple : "09:00 - 17:00"
- **API** : `acf.event_time`

---

### 8. location (Lieu)
- **Description** : Lieu de l'événement
- **Utilisation frontend** : Dans la barre d'informations avec icône MapPin
  ```jsx
  <div className="flex items-center gap-2 text-text-muted">
    <MapPin size={18} className="text-accent" />
    <span>{event.location}</span>
  </div>
  ```
- **WordPress** : ACF - `event_location`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `event_location`
  - Label : "Lieu"
  - Instructions : "Entrez le lieu (ex: Hôtel Sarakawa, Lomé)"
  - Exemple : "Hôtel Sarakawa, Lomé"
- **API** : `acf.event_location`

---

### 9. spots (Nombre de places)
- **Description** : Nombre total de places disponibles pour l'événement
- **Utilisation frontend** : 
  1. Affiché dans la section "Places disponibles"
  2. Calcul des places restantes : `spotsLeft = event.spots - event.registered`
  ```jsx
  <h3 className="font-bold text-primary mb-1">Places disponibles</h3>
  <p className="text-text-muted text-sm">{spotsLeft > 0 ? `${spotsLeft} places restantes` : 'Complet'}</p>
  ```
- **WordPress** : ACF - `event_spots`
- **Comment le créer** :
  - Type : Number
  - Nom du champ : `event_spots`
  - Label : "Nombre de places"
  - Min : 0
  - Instructions : "Nombre total de places disponibles"
  - Exemple : 30
- **API** : `acf.event_spots`

---

### 10. registered (Places réservées)
- **Description** : Nombre de places déjà réservées (pour calculer les places restantes)
- **Utilisation frontend** : 
  1. Calcul des places restantes
  2. Affichage des avatars des participants inscrits
  ```jsx
  <div className="flex -space-x-2">
    {[...Array(3)].map((_, i) => (
      <img key={i} src={`https://i.pravatar.cc/150?img=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-white" />
    ))}
    <div className="w-8 h-8 rounded-full bg-accent border-2 border-white flex items-center justify-center">
      <span className="text-white text-xs font-medium">+{event.registered}</span>
    </div>
  </div>
  ```
- **WordPress** : ACF - `event_registered`
- **Comment le créer** :
  - Type : Number
  - Nom du champ : `event_registered`
  - Label : "Places réservées"
  - Min : 0
  - Instructions : "Nombre de places déjà réservées"
  - Exemple : 18
- **API** : `acf.event_registered`

---

### 11. format (Format)
- **Description** : Format de l'événement (Présentiel ou Visioconférence)
- **Utilisation frontend** : Dans la barre d'informations avec icône Video
  ```jsx
  <div className="flex items-center gap-2 text-text-muted">
    <Video size={18} className="text-accent" />
    <span>{event.format}</span>
  </div>
  ```
- **WordPress** : ACF - `event_format`
- **Comment le créer** :
  - Type : Select
  - Nom du champ : `event_format`
  - Label : "Format"
  - Choices : Présentiel, Visioconférence
  - Instructions : "Sélectionnez le format"
  - Exemple : "Présentiel"
- **API** : `acf.event_format`

---

### 12. duration (Durée)
- **Description** : Durée de l'événement
- **Utilisation frontend** : Utilisé dans le contexte de l'événement (peut être affiché ailleurs)
- **WordPress** : ACF - `event_duration`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `event_duration`
  - Label : "Durée"
  - Instructions : "Durée de l'événement (ex: 1 jour, 2 heures)"
  - Exemple : "1 jour"
- **API** : `acf.event_duration`

---

### 13. image (Image de couverture)
- **Description** : Image principale de l'événement
- **Utilisation frontend** : Hero Banner et cards
- **WordPress** : Champ natif `featured_media`
- **Comment le créer** : Utiliser le champ natif "Image mise en avant"
- **API** : `featured_media` (ID à transformer en URL)

---

# SECTION 3 : ARTICLES (BlogSingle.jsx)

> **IMPORTANT** : Les articles utilisent le **type de contenu natif "Articles" de WordPress** (Post). Ils ne nécessitent PAS de CPT personnalisé. On ajoute uniquement des champs personnalisés via ACF pour les informations qui n'existent pas nativement.

## Pourquoi utiliser les Posts natifs ?

WordPress propose nativement ces champs pour les Articles :

| Champ natif | Disponible nativement | Utilisé dans le frontend |
|-------------|----------------------|-------------------------|
| Title | ✅ Oui | ✅ title |
| Content | ✅ Oui | ✅ content |
| Excerpt | ✅ Oui | ✅ excerpt |
| Featured Image | ✅ Oui | ✅ image |
| Author | ✅ Oui | ✅ author |
| Date | ✅ Oui | ✅ date |
| Categories | ✅ Oui | ✅ category |
| Tags | ✅ Oui | ✅ tags |

**Champs manquants** (à créer via ACF) :

- authorRole - Fonction de l'auteur
- authorImage - Photo de l'auteur
- readTime - Temps de lecture

## Structure des données dans le code React

```javascript
{
  id: 'post-1',
  isEvent: false,
  title: "L'importance de la gouvernance d'entreprise dans le contexte africain",
  excerpt: "Découvrez comment une bonne gouvernance peut transformer les entreprises...",
  content: "<p>...</p><h2>...</h2><ul>...</ul>",
  category: "Gouvernance",
  author: "Dr. Kodjo Amegah",
  authorRole: "Expert en gouvernance d'entreprise",
  authorImage: "https://...",
  date: "15 Mars 2026",
  readTime: "8 min",
  image: "https://...",
  tags: ["Entreprise", "Stratégie"]
}
```

---

## CHAMPS DES ARTICLES

### 1. title (Titre)
- **Description** : Titre de l'article
- **Utilisation frontend** : `<h1>{post.title}</h1>`
- **WordPress** : Champ natif `title`
- **API** : `title.rendered`

---

### 2. excerpt (Résumé)
- **Description** : Résumé/accroche de l'article
- **Utilisation frontend** : 
  1. Cards dans la liste des articles
  2. Meta description
- **WordPress** : Champ natif `excerpt`
- **Comment le créer** : Utiliser le champ "Excerpt" dans le panneau Document de WordPress
- **API** : `excerpt.rendered`

---

### 3. content (Contenu)
- **Description** : Contenu HTML complet de l'article
- **Utilisation frontend** : 
  ```jsx
  <div className="prose prose-lg max-w-none text-text-muted" dangerouslySetInnerHTML={{ __html: post.content }} />
  ```
- **WordPress** : Champ natif `content`
- **API** : `content.rendered`

---

### 4. category (Catégorie)
- **Description** : Catégorie de l'article
- **Utilisation frontend** : Badge sous le titre
  ```jsx
  <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full mb-4">
    {post.category}
  </span>
  ```
- **WordPress** : Catégories WordPress natives
- **API** : `categories` (tableau d'IDs)

---

### 5. author (Auteur)
- **Description** : Nom de l'auteur de l'article
- **Utilisation frontend** : Section meta avec photo et nom
  ```jsx
  <div className="flex items-center gap-3">
    <img src={post.authorImage} className="w-10 h-10 rounded-full" />
    <div>
      <div className="font-semibold text-primary">{post.author}</div>
      <div className="text-sm text-text-muted">{post.authorRole}</div>
    </div>
  </div>
  ```
- **WordPress** : Champ natif `author` (ID) + ACF pour le rôle
- **Comment le créer** :
  - WordPress gère les auteurs nativement (champ "Auteur" dans le panneau Document)
  - Pour le rôle : ACF `author_role` (voir ci-dessous)
- **API** : `author` (ID à transformer en objet avec `_embed`)

---

### 6. authorRole (Fonction de l'auteur)
- **Description** : Fonction ou rôle de l'auteur
- **Utilisation frontend** : Sous le nom de l'auteur dans la section meta
  ```jsx
  <div className="text-sm text-text-muted">{post.authorRole}</div>
  ```
- **WordPress** : ACF - `author_role`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `author_role`
  - Label : "Fonction de l'auteur"
  - Instructions : "Entrez la fonction de l'auteur (ex: Expert en gouvernance)"
  - Exemple : "Expert en gouvernance d'entreprise"
- **API** : `acf.author_role`

---

### 7. authorImage (Photo de l'auteur)
- **Description** : Photo de l'auteur (différente de l'avatar WordPress)
- **Utilisation frontend** : Photo à côté du nom dans la section meta
  ```jsx
  <img src={post.authorImage} className="w-10 h-10 rounded-full object-cover" />
  ```
- **WordPress** : ACF - `author_image`
- **Comment le créer** :
  - Type : Image
  - Nom du champ : `author_image`
  - Label : "Photo de l'auteur"
  - Return Format : Image URL
  - Library : All
  - Instructions : "Téléchargez la photo de l'auteur"
  - Exemple : https://i.pravatar.cc/150?img=11
- **API** : `acf.author_image`

---

### 8. date (Date)
- **Description** : Date de publication de l'article
- **Utilisation frontend** : Section meta avec icône Calendar
  ```jsx
  <div className="flex items-center gap-1 text-text-muted">
    <Calendar size={16} />
    <span className="text-sm">{post.date}</span>
  </div>
  ```
- **WordPress** : Champ natif `date`
- **API** : `date` (ISO format)

---

### 9. readTime (Temps de lecture)
- **Description** : Temps de lecture estimé
- **Utilisation frontend** : Section meta avec icône Clock
  ```jsx
  <div className="flex items-center gap-1 text-text-muted">
    <Clock size={16} />
    <span className="text-sm">{post.readTime} de lecture</span>
  </div>
  ```
- **WordPress** : ACF - `read_time`
- **Comment le créer** :
  - Type : Text
  - Nom du champ : `read_time`
  - Label : "Temps de lecture"
  - Instructions : "Entrez le temps de lecture (ex: 8 min)"
  - Exemple : "8 min"
- **API** : `acf.read_time`

---

### 10. image (Image de couverture)
- **Description** : Image principale de l'article
- **Utilisation frontend** : Hero Banner
- **WordPress** : Champ natif `featured_media`
- **API** : `featured_media` (ID à transformer en URL)

---

### 11. tags (Étiquettes)
- **Description** : Mots-clés de l'article
- **Utilisation frontend** : Tags affichés en bas de l'article
  ```jsx
  <div className="flex flex-wrap gap-2 mt-8">
    {post.tags.map((tag, index) => (
      <span className="px-3 py-1 bg-gray-100 text-text-muted text-sm rounded-full">
        #{tag}
      </span>
    ))}
  </div>
  ```
- **WordPress** : Tags WordPress natifs
- **Comment le créer** : Créer des étiquettes dans WordPress et les assigner aux articles
- **API** : `tags` (tableau d'IDs)

---

# SECTION 4 : RÉCAPITULATIF POUR CRÉATION WORDPRESS

## CPT à créer

| CPT |slug | Taxonomies |
|-----|-----|------------|
| Formations | `formations` | categories (categorie_formation), tags |
| Événements | `evenements` | categories, tags |

## Groupes de champs ACF à créer

### 1. Groupe : Formations - Informations
- Location : Post Type = formations
- Champs :
  - `hook` (Text Area)
  - `duration` (Text)
  - `format` (Select)
  - `location` (Text)
  - `audience` (Text)
  - `level` (Select)
  - `price` (Text)
  - `next_session` (Text)
  - `objectifs` (Repeater - sous-champ: objectif)
  - `prerequisites` (Text Area)
  - `program` (Repeater - sous-champs: module_title, module_content)
  - `practical_duration` (Text)
  - `practical_schedule` (Text)
  - `practical_materials` (Text Area)
  - `practical_evaluation` (Text)
  - `trainers` (Repeater - sous-champs: trainer_name, trainer_role, trainer_bio, trainer_image)
  - `featured` (True/False)
  - `type` (Text - Default: "Formation")

### 2. Groupe : Événements - Informations
- Location : Post Type = evenements
- Champs :
  - `event_type` (Select)
  - `event_date` (Text)
  - `event_time` (Text)
  - `event_location` (Text)
  - `event_spots` (Number)
  - `event_registered` (Number)
  - `event_format` (Select)
  - `event_duration` (Text)
  - `event_excerpt` (Text - optionnel, sinon utiliser excerpt natif)

### 3. Groupe : Articles - Informations supplémentaires
- Location : Post Type = post
- Champs :
  - `author_role` (Text)
  - `author_image` (Image - URL)
  - `read_time` (Text)

---

# SECTION 5 : MAPPING API → FRONTEND

## Formation (Comment le frontend récupère les données)

```javascript
// Dans le composant React
const response = await fetch('https://admin.kempire.com/wp-json/wp/v2/formations?slug=' + slug);
const data = await response.json();
const wp = data[0];

// Mapping des champs
const formation = {
  id: wp.id,
  title: wp.title.rendered,
  hook: wp.acf?.hook,
  duration: wp.acf?.duration,
  format: wp.acf?.format,
  location: wp.acf?.location,
  audience: wp.acf?.audience,
  category: wp.categories?.[0]?.name || wp.acf?.category, // ou taxonomy
  level: wp.acf?.level,
  price: wp.acf?.price,
  nextSession: wp.acf?.next_session,
  image: wp.featured_media ? await getMediaUrl(wp.featured_media) : null,
  objectives: wp.acf?.objectifs?.map(o => o.objectif) || [],
  prerequisites: wp.acf?.prerequisites,
  program: wp.acf?.program?.map(p => ({
    title: p.module_title,
    content: p.module_content
  })) || [],
  practical: {
    duration: wp.acf?.practical_duration,
    schedule: wp.acf?.practical_schedule,
    materials: wp.acf?.practical_materials,
    evaluation: wp.acf?.practical_evaluation
  },
  trainers: wp.acf?.trainers?.map(t => ({
    name: t.trainer_name,
    role: t.trainer_role,
    bio: t.trainer_bio,
    image: t.trainer_image
  })) || [],
  featured: wp.acf?.featured,
  type: wp.acf?.type || "Formation"
};
```

---

*Document basé sur le code source React de K-EMPIRE CORPORATION*
* Champs extraits de FormationSingle.jsx, EventSingle.jsx, BlogSingle.jsx*