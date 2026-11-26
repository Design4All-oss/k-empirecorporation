import DOMPurify from 'dompurify';

/**
 * Assainit un fragment HTML (contenu Sanity, texte légal) juste avant son
 * injection via dangerouslySetInnerHTML. Le profil HTML interdit SVG/MathML
 * et tout script, gestionnaire d'événement ou URI javascript:.
 * Dernière étape du rendu : ne plus jamais retoucher le HTML après cet appel,
 * cela pourrait annuler la protection.
 */
export const sanitizeHtml = (html) =>
  DOMPurify.sanitize(html ?? '', { USE_PROFILES: { html: true } });
