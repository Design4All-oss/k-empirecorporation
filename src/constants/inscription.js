// Options du formulaire d'inscription unique (validé par le client)
// Source de vérité : spec "FORMULAIRE D'INSCRIPTION — MODÈLE UNIQUE"

export const CIVILITES = ['M.', 'Mme'];

export const NIVEAUX_ETUDES = ['Licence', 'Master', 'Doctorat'];

// Échelle numérique 0 → 5 (choix unique)
export const EXPERIENCES = [0, 1, 2, 3, 4, 5];

export const MOYENS_PAIEMENT_INDIVIDUEL = [
  'Dépôt/virement bancaire',
  'Chèque (ordre K-EMPIRE CORPORATION)',
  'Transfert monétaire (Ria, MoneyGram, Western Union)',
  'Mobile money (Moov Money, Mix by Yas, Orange Money)',
  'Espèce au siège K-EMPIRE (Kara)',
  'Espèce au siège Cabinet CEC (Lomé)',
  'Espèce auprès partenaires OHADA',
];

export const MOYENS_PAIEMENT_INSTITUTION = [
  'Virement bancaire',
  'Chèque',
  'Transfert monétaire',
  'Espèce siège K-EMPIRE',
  'Espèce partenaires OHADA',
];

export const SOURCES = ['LinkedIn', 'Facebook', 'Google', 'Newsletter', 'Autres'];

export const OUI_NON = ['Oui', 'Non'];

export const CONDITIONS = ['J’accepte', 'Je n’ai pas encore lu'];
