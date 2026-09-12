import { createClient } from '@sanity/client';

const ENDPOINTS = {
  newsletter: {
    type: 'soumissionNewsletter',
    label: 'Newsletter',
    fields: ['email', 'nom', 'source'],
  },
  'inscription-formation': {
    type: 'inscription',
    label: 'Inscription formation',
    fields: ['nom', 'email', 'telephone', 'fonction', 'entreprise', 'formation_slug', 'formation_id', 'message'],
  },
  'inscription-evenement': {
    type: 'inscriptionEvenement',
    label: 'Inscription événement',
    fields: ['nom', 'email', 'telephone', 'fonction', 'entreprise', 'evenement_slug', 'evenement_id'],
  },
  devis: {
    type: 'soumissionDevis',
    label: 'Demande de devis',
    fields: ['fullName', 'organization', 'function', 'email', 'phone', 'country', 'subject', 'message'],
  },
  rdv: {
    type: 'soumissionRdv',
    label: 'Demande de rendez-vous',
    fields: ['name', 'email', 'phone', 'date', 'time', 'message'],
  },
};

const getClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2026-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });

async function sendEmail({ label, fields }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;
  if (!key || !from || !to) return;

  const lines = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}: ${v}`);
  const text = [`Nouvelle soumission — ${label}`, '', ...lines].join('\n');

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: `[K-EMPIRE] ${label}`, text }),
    });
  } catch {
    console.error('[forms] Échec envoi e-mail (soumission déjà enregistrée)');
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Méthode non autorisée' });

  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ success: false, message: 'Corps JSON invalide' });
  }

  const { endpoint, ...raw } = data || {};
  const config = ENDPOINTS[endpoint];
  if (!config) return res.status(400).json({ success: false, message: 'Type de formulaire inconnu' });

  const projectId = process.env.SANITY_PROJECT_ID;
  const token = process.env.SANITY_TOKEN;
  if (!projectId || !token) {
    return res.status(500).json({ success: false, message: 'Stockage non configuré côté serveur' });
  }

  const fields = {};
  for (const key of config.fields) {
    if (raw[key] !== undefined && raw[key] !== null) fields[key] = raw[key];
  }

  const doc = {
    _type: config.type,
    ...fields,
    submittedAt: new Date().toISOString(),
  };

  const client = getClient();

  if (config.type === 'inscription') {
    if (raw.formation_id && /^[a-zA-Z0-9_\-]+$/.test(String(raw.formation_id))) {
      doc.formation = { _ref: String(raw.formation_id) };
    }
    if (raw.session_id && /^[a-zA-Z0-9_\-]+$/.test(String(raw.session_id))) {
      const sessionId = String(raw.session_id);
      try {
        const session = await client.getDocument(sessionId);
        if (!session || session._type !== 'session' || session.statut === 'annulée') {
          delete doc.session;
        } else {
          doc.session = { _ref: sessionId };
        }
      } catch {
        delete doc.session;
      }
    }
  }
  if (config.type === 'inscriptionEvenement') {
    if (raw.evenement_id && /^[a-zA-Z0-9_\-]+$/.test(String(raw.evenement_id))) {
      doc.evenement = { _ref: String(raw.evenement_id) };
    }
  }

  try {
    await client.create(doc);
  } catch (err) {
    console.error(`[forms] Sanity create échec (${config.type})`, err.message);
    return res.status(500).json({ success: false, message: 'Erreur de stockage — réessayez' });
  }

  await sendEmail({ label: config.label, fields });
  return res.status(200).json({ success: true });
}