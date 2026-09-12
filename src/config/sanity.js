import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

/**
 * Configuration Sanity
 * K-EMPIRE CORPORATION
 */

export const PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'xxxxxxxx';
export const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2026-01-01';

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: import.meta.env.PROD,
});

const builder = createImageUrlBuilder(client);

/**
 * Générer l'URL d'une image Sanity (auto-optimisée à la volée)
 * @param {Object} source - Référence de l'image Sanity
 */
export const urlFor = (source) => builder.image(source);

const renderSpan = (child, block) => {
  if (child._type !== 'span' || !child.text) return '';
  let text = child.text;
  (child.marks || []).forEach((mark) => {
    if (mark === 'strong') text = `<strong>${text}</strong>`;
    else if (mark === 'em') text = `<em>${text}</em>`;
    else if (mark === 'code') text = `<code>${text}</code>`;
    else if (mark === 'underline') text = `<u>${text}</u>`;
    else if (mark === 'strike-through') text = `<s>${text}</s>`;
    else {
      const def = block.markDefs && block.markDefs.find((d) => d._key === mark);
      if (def && def._type === 'link') {
        const rel = def.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
        text = `<a href="${def.href || '#'}"${rel}>${text}</a>`;
      }
    }
  });
  return text;
};

/**
 * Convertit un Portable Text Sanity en HTML (blocks, listes, liens, images)
 * Permet aux composants utilisant dangerouslySetInnerHTML de fonctionner inchangés
 * @param {Array} blocks - Contenu Portable Text
 */
export const portableTextToHtml = (blocks) => {
  if (!Array.isArray(blocks)) return '';
  const parts = [];
  let listTag = null;
  const closeList = () => {
    if (listTag) { parts.push(`</${listTag}>`); listTag = null; }
  };
  blocks.forEach((block) => {
    if (block._type === 'image') {
      closeList();
      const imgUrl = urlFor(block).url();
      if (imgUrl) parts.push(`<img src="${imgUrl}" alt="${block.alt || ''}" />`);
      return;
    }
    if (block._type !== 'block') return;
    const inner = (block.children || []).map((c) => renderSpan(c, block)).join('');
    if (block.listItem) {
      const tag = block.listItem === 'number' ? 'ol' : 'ul';
      if (tag !== listTag) { closeList(); parts.push(`<${tag}>`); listTag = tag; }
      parts.push(`<li>${inner}</li>`);
    } else {
      closeList();
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style)) {
        parts.push(`<${block.style}>${inner}</${block.style}>`);
      } else if (block.style === 'blockquote') {
        parts.push(`<blockquote>${inner}</blockquote>`);
      } else {
        parts.push(`<p>${inner}</p>`);
      }
    }
  });
  closeList();
  return parts.join('');
};

export const QUERY_KEYS = {
  posts: ['posts'],
  post: (slug) => ['post', slug],
  formations: ['formations'],
  formation: (slug) => ['formation', slug],
  evenements: ['evenements'],
  evenement: (slug) => ['evenement', slug],
};