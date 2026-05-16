# Documentation des Formulaires - K-EMPIRE CORPORATION

Ce document recense tous les formulaires utilisés sur le site web K-EMPIRE CORPORATION.

---

## 1. Formulaire "Rejoindre la communauté gratuite"

**Emplacement:** `src/components/home/HomePopup.jsx` (Popup d'accueil)

**Déclencheur:** Affiché automatiquement après 8 secondes sur la page d'accueil (si aucune formation mise en avant n'existe)

**Champs:**

| Champ | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | text | Oui | Prénom de l'utilisateur |
| `lastName` | text | Oui | Nom de l'utilisateur |
| `profession` | text | Oui | Profession / Fonction |
| `email` | email | Oui | Email professionnel |
| `country` | text | Oui | Pays de résidence |

**Action:** Bouton "Rejoindre la communauté" - Soumet les données (actuellement juste logué en console)

**Usage:** Permet aux visiteurs de s'inscrire à la communauté gratuite pour accéder aux ressources, formations exclusives et réseau d'experts.

---

## 2. Formulaire Newsletter (Page d'accueil)

**Emplacement:** `src/components/home/HomeNewsletter.jsx`

**Emplacement secondaire:** `src/components/about/AboutNewsletter.jsx`  
**Emplacement tertiaire:** `src/components/contact/ContactNewsletter.jsx`

**Champs:**

| Champ | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | email | Oui | Adresse email |

**Action:** Bouton "S'inscrire" - Soumet l'email pour la newsletter

**Usage:** Inscription à la newsletter pour recevoir les actualités de K-EMPIRE.

---

## 3. Formulaire Demande de devis / Contact

**Emplacement:** `src/components/contact/ContactForm.jsx`

**Page:** `/contact` (Page Contact)

**Champs:**

| Champ | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName` | text | Oui | Nom et prénom complets |
| `organization` | text | Non | Organisation / Entreprise |
| `function` | text | Non | Fonction / Poste |
| `email` | email | Oui | Adresse email |
| `phone` | tel | Non | Numéro de téléphone |
| `country` | text | Non | Pays |
| `subject` | select | Oui | Objet de la demande |
| `message` | textarea | Oui | Message / Description du projet |

**Options du champ "subject":**
- Demande de devis
- Information sur les formations
- Demande de partenariat
- Autre

**Action:** Bouton "Envoyer" - Soumet le formulaire de contact

**Usage:** Permet aux visiteurs de soumettre une demande de devis ou une demande d'information.

---

## 4. Formulaire Réservation de rendez-vous (Modal)

**Emplacement:** `src/components/ui/BookingModal.jsx`

**Déclencheur:** Boutons "Prendre rendez-vous" / "Réserver un rendez-vous" à travers tout le site

**Champs:**

| Champ | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | text | Oui | Nom de la personne |
| `email` | email | Oui | Adresse email |
| `phone` | tel | Non | Numéro de téléphone |
| `date` | datepicker | Oui | Date souhaitée (via calendrier) |
| `time` | select | Oui | Créneau horaire |
| `message` | textarea | Non | Message ou motif du rendez-vous |

**Options du champ "time" (crénaux):**
- 09:00 - 10:00
- 10:00 - 11:00
- 11:00 - 12:00
- 14:00 - 15:00
- 15:00 - 16:00
- 16:00 - 17:00

**Action:** Bouton "Réserver" - Soumet la demande de rendez-vous

**Usage:** Permet de planifier un rendez-vous avec les experts K-EMPIRE pour discuter d'un projet.

---

## 5. Formulaire Inscription aux formations

**Emplacement:** `src/pages/FormationSingle.jsx`

**Page:** Page détail d'une formation (`/formations/:slug`)

**Champs:**

| Champ | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | text | Oui | Nom complet |
| `email` | email | Oui | Adresse email |
| `phone` | tel | Non | Numéro de téléphone |
| `organization` | text | Non | Organisation / Entreprise |
| `message` | textarea | Non | Message supplémentaire |

**Action:** Bouton "S'inscrire" - Soumet l'inscription à la formation

**Usage:** Permet aux visiteurs de s'inscrire à une formation spécifique.

---

## 6. Formulaire Inscription aux événements (Page Événement)

**Emplacement:** `src/pages/FormationSingle.jsx` (même composant que ci-dessus)

**Note:** Ce formulaire utilise la même structure que le formulaire d'inscription aux formations, visible sur les pages d'événements.

**Champs:** Identiques au formulaire d'inscription aux formations

**Usage:** Permet de s'inscrire à un événement spécifique.

---

## Récapitulatif des Types de Champs

| Type HTML | Description |
|-----------|-------------|
| `text` | Champ texte libre |
| `email` | Champ email avec validation |
| `tel` | Champ téléphone |
| `textarea` | Zone de texte multiligne |
| `select` | Liste déroulante |
| `date` | Sélecteur de date (personnalisé) |
| `submit` | Bouton de soumission |

---

## Notes Techniques

- **Validation:** Les champs marqués "Required" sont obligatoires et validés par HTML5
- **State Management:** Les formulaires utilisent React `useState` pour gérer les données
- **Soumission:** Actuellement, les données sont loguées en console (`console.log`). À implémenter: envoi vers API WordPress ou service externe
- **UX:** Les formulaires incluent des indicateurs visuels (placeholders, icônes, messages de validation)
- **BookingModal:** Accessible globallement via le contexte `BookingModalContext`

---

## Emplacement des fichiers sources

```
src/
├── components/
│   ├── home/
│   │   ├── HomePopup.jsx          # Popup communauté
│   │   └── HomeNewsletter.jsx     # Newsletter homepage
│   ├── about/
│   │   └── AboutNewsletter.jsx    # Newsletter about
│   ├── contact/
│   │   ├── ContactForm.jsx        # Formulaire contact
│   │   └── ContactNewsletter.jsx  # Newsletter contact
│   └── ui/
│       └── BookingModal.jsx        # Modal rendez-vous
├── context/
│   └── BookingModalContext.jsx     # Contexte pour la modal
└── pages/
    └── FormationSingle.jsx        # Formulaires inscription
```
