import { createClient } from '@sanity/client';

// ── Sanity clients ──────────────────────────────────────────────
const contentClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2026-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });

// Aucun repli sur 'production' : ce dataset est lu anonymement par le site,
// y écrire des soumissions (données personnelles) les exposerait publiquement.
const submissionsClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_SUBMISSIONS_DATASET,
    apiVersion: '2026-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });

// ── Google Calendar helpers ─────────────────────────────────────
async function getGoogleTokens() {
  const email = process.env.GOOGLE_CALENDAR_EMAIL;
  if (!email) return null;
  try {
    // Le callback écrit les jetons dans le dataset des soumissions :
    // la lecture doit cibler le même dataset, sinon jeton introuvable.
    const doc = await submissionsClient().fetch(
      `*[_type == "googleTokens" && email == $email][0]`,
      { email }
    );
    return doc || null;
  } catch { return null; }
}

async function refreshGoogleToken(tokens) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: tokens.refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) throw new Error('Google token refresh failed');
  const data = await res.json();
  return {
    ...tokens,
    accessToken: data.access_token,
    expiry: Date.now() + (data.expires_in - 60) * 1000,
  };
}

async function saveGoogleTokens(tokens) {
  const email = process.env.GOOGLE_CALENDAR_EMAIL;
  const existing = await submissionsClient().fetch(
    `*[_type == "googleTokens" && email == $email][0]._id`,
    { email }
  );
  const doc = {
    _type: 'googleTokens',
    email,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiry: tokens.expiry,
  };
  if (existing) {
    await submissionsClient().patch(existing).set(doc).commit();
  } else {
    await submissionsClient().create(doc);
  }
}

async function getGoogleAccessToken() {
  const tokens = await getGoogleTokens();
  if (!tokens) return null;
  if (tokens.expiry && Date.now() < tokens.expiry) return tokens.accessToken;
  try {
    const refreshed = await refreshGoogleToken(tokens);
    await saveGoogleTokens(refreshed);
    return refreshed.accessToken;
  } catch { return null; }
}

async function createCalendarEvent(fields) {
  const accessToken = await getGoogleAccessToken();
  if (!accessToken) {
    console.error('[forms] No Google access token — skipping calendar event');
    return;
  }

  const startDateTime = new Date(`${fields.date}T${fields.time || '09:00'}:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // +1h

  const event = {
    summary: `RDV — ${fields.name || fields.email}`,
    description: fields.message || `Rendez-vous demandé par ${fields.name} (${fields.email})`,
    start: { dateTime: startDateTime.toISOString(), timeZone: 'Africa/Lome' },
    end: { dateTime: endDateTime.toISOString(), timeZone: 'Africa/Lome' },
    attendees: [{ email: fields.email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  try {
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('[forms] Calendar event creation failed:', res.status, err);
    }
  } catch (err) {
    console.error('[forms] Calendar API error:', err.message);
  }
}

// ── Endpoint config ─────────────────────────────────────────────
const ENDPOINTS = {
  newsletter: {
    type: 'soumissionNewsletter',
    label: 'Newsletter',
    fields: ['email', 'nom', 'source', 'consentement'],
  },
  'inscription-formation': {
    type: 'inscription',
    label: 'Inscription formation',
    fields: [
      'type', 'formation_slug', 'formation_id',
      // Individuelle — I. Informations personnelles
      'civilite', 'nom', 'prenom', 'email', 'telephone', 'anniversaire', 'paysResidence',
      'niveauEtudes', 'experience', 'fonction', 'entreprise', 'motivations', 'objectifsPro', 'attentes',
      // Individuelle — II. Mode de règlement
      'moyenPaiement', 'source', 'recevoirInfos',
      // Institutionnelle — I. Informations de l'institution
      'raisonSociale', 'secteurActivite', 'adressePostale', 'nif', 'siteWeb',
      // Institutionnelle — II. Responsable de l'inscription
      'responsableNom', 'responsableFonction', 'adresseFacturation',
      // Institutionnelle — III/IV. Participation & finances
      'nbParticipants', 'participants', 'coordonneesBancaires',
      // Conditions (commun)
      'conditionsGenerales', 'autorisationDonnees',
    ],
  },
  'inscription-evenement': {
    type: 'inscriptionEvenement',
    label: 'Inscription événement',
    fields: ['nom', 'email', 'telephone', 'fonction', 'entreprise', 'evenement_slug', 'evenement_id', 'type', 'denomination', 'rccm', 'nif', 'siegeSocial', 'responsableNom'],
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

// ── Brand tokens ────────────────────────────────────────────────
const BRAND = {
  primary: '#1A2744',
  accent: '#C99400',
  accentLight: '#F5C75D',
  text: '#1A2744',
  textLight: '#6B7280',
  bg: '#FFFFFF',
  bgAlt: '#F8F9FA',
  border: '#E5E7EB',
};

// ── HTML email layout ───────────────────────────────────────────
function emailShell(title, bodyHtml) {
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bgAlt};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.text};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bgAlt};padding:32px 12px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <tr><td style="background:${BRAND.primary};padding:32px 40px 26px;border-radius:12px 12px 0 0;text-align:center;">
        <img src="https://www.k-empirecorporation.com/assets/logos/Favicon_kempire.webp" alt="K-EMPIRE CORPORATION" width="44" height="44" style="display:inline-block;width:44px;height:44px;border-radius:10px;" />
        <p style="margin:14px 0 0;color:#FFFFFF;font-size:14px;font-weight:700;letter-spacing:3px;">K-EMPIRE CORPORATION</p>
        <div style="width:28px;height:2px;background:${BRAND.accent};margin:12px auto;font-size:0;line-height:0;">&nbsp;</div>
        <p style="margin:0;color:${BRAND.accentLight};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">${title}</p>
      </td></tr>
      <tr><td style="background:${BRAND.bg};padding:36px 40px;">
        ${bodyHtml}
      </td></tr>
      <tr><td style="height:3px;background:linear-gradient(90deg,${BRAND.primary},${BRAND.accent},${BRAND.primary});font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="background:${BRAND.primary};padding:22px 40px 24px;border-radius:0 0 12px 12px;text-align:center;">
        <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.78);line-height:1.7;">
          Lomé, Togo &bull; <a href="mailto:contact@k-empirecorporation.com" style="color:${BRAND.accentLight};text-decoration:none;">contact@k-empirecorporation.com</a>
        </p>
        <p style="margin:0 0 12px;font-size:12px;">
          <a href="https://k-empirecorporation.com" style="color:${BRAND.accentLight};text-decoration:none;letter-spacing:0.5px;">k-empirecorporation.com</a>
        </p>
        <div style="width:36px;height:1px;background:rgba(255,255,255,0.25);margin:0 auto 12px;font-size:0;line-height:0;">&nbsp;</div>
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.55);">&copy; ${year} K-EMPIRE CORPORATION &middot; Tous droits réservés</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

function fieldRow(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};width:150px;font-size:11px;color:${BRAND.textLight};text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};font-size:14px;color:${BRAND.text};font-weight:500;line-height:1.5;">${escapeHtml(value)}</td></tr>`;
}

function fieldsTable(rows) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 24px;background:${BRAND.bgAlt};border-radius:10px;"><tr><td style="padding:6px 24px;"><table width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table></td></tr></table>`;
}

// ── Email builders ─────────────────────────────────────────────

function buildAdminEmail(type, fields) {
  const labels = {
    newsletter: 'Nouvelle inscription newsletter',
    'inscription-formation': 'Nouvelle inscription formation',
    'inscription-evenement': 'Nouvelle inscription événement',
    devis: 'Nouvelle demande de devis',
    rdv: 'Nouvelle demande de rendez-vous',
  };

  const fieldLabels = {
    email: 'Email', nom: 'Nom', telephone: 'Téléphone', fonction: 'Fonction',
    entreprise: 'Entreprise', formation_slug: 'Formation', evenement_slug: 'Événement',
    message: 'Message', source: 'Source', fullName: 'Nom complet',
    organization: 'Organisation', function: 'Fonction', phone: 'Téléphone',
    country: 'Pays', subject: 'Sujet', date: 'Date', time: 'Heure',
    consentement: 'RGPD',
    type: "Type d'inscription", denomination: 'Dénomination', rccm: 'RCCM',
    nif: 'NIF', siegeSocial: 'Siège social', responsableNom: 'Responsable inscription',
    civilite: 'Civilité', prenom: 'Prénom', anniversaire: 'Anniversaire',
    paysResidence: 'Pays de résidence', niveauEtudes: "Niveau d'études",
    experience: 'Expérience professionnelle (0-5)', motivations: 'Motivations',
    objectifsPro: 'Objectifs professionnels', attentes: 'Attentes particulières',
    moyenPaiement: 'Moyen de paiement',
    recevoirInfos: "Recevoir l'info sur d'autres formations",
    raisonSociale: 'Raison sociale', secteurActivite: "Secteur d'activité",
    adressePostale: 'Adresse postale', siteWeb: 'Site web',
    responsableFonction: 'Fonction / Titre du responsable',
    adresseFacturation: 'Adresse de facturation',
    nbParticipants: 'Nombre total de participants',
    participants: 'Participants', coordonneesBancaires: "Coordonnées bancaires de l'institution",
    conditionsGenerales: 'Conditions générales',
    autorisationDonnees: 'Autorisation de traitement des données',
  };

  // Normalise les valeurs pour l'e-mail : tableaux (listes / participants) et booléens.
  const formatValue = (value) => {
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    if (Array.isArray(value)) {
      if (value.every((v) => typeof v === 'string')) return value.join(' • ');
      return value
        .map((item, index) => {
          if (typeof item !== 'object' || item === null) return `${index + 1}. ${item}`;
          const parts = Object.entries(item)
            .filter(([, v]) => v !== '' && v !== null && v !== undefined)
            .map(([, v]) => v);
          return parts.length ? `${index + 1}. ${parts.join(' — ')}` : '';
        })
        .filter(Boolean)
        .join('<br>');
    }
    if (typeof value === 'object' && value !== null) return JSON.stringify(value);
    return value;
  };

  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => fieldRow(fieldLabels[k] || k, formatValue(v)));

  return emailShell(labels[type] || 'Nouvelle soumission', `
    <p style="margin:0 0 8px;font-size:15px;color:${BRAND.text};">
      Une nouvelle soumission a été enregistrée sur le site.
    </p>
    <p style="margin:0 0 20px;font-size:13px;color:${BRAND.textLight};">
      Type : <strong>${labels[type] || type}</strong> &bull; ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
    </p>
    ${fieldsTable(rows)}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;"><tr><td align="center"><table cellpadding="0" cellspacing="0"><tr><td bgcolor="${BRAND.accent}" style="border-radius:8px;"><a href="https://www.sanity.io/@ohurvf4bb/studio/szov8e3v9ao4o4p086yg1r53/kempire-content" style="display:inline-block;padding:13px 32px;background:${BRAND.accent};color:#FFFFFF;font-weight:600;font-size:13px;text-decoration:none;letter-spacing:0.5px;border-radius:8px;">OUVRIR LE STUDIO</a></td></tr></table></td></tr></table>
  `);
}

function buildUserConfirmation(type, fields) {
  const messages = {
    newsletter: 'Merci de votre inscription à notre newsletter ! Vous recevrez nos dernières actualités et conseils directement dans votre boîte mail.',
    'inscription-formation': 'Votre demande d\'inscription a bien été enregistrée. Un de nos conseillers vous contactera sous 24h pour finaliser votre inscription et vous communiquer les détails pratiques.',
    'inscription-evenement': 'Votre demande d\'inscription a bien été enregistrée. Un de nos conseillers vous contactera sous 24h pour confirmer votre participation.',
    devis: 'Votre demande de devis a bien été reçue. Notre équipe l\'analysera et vous enverra une proposition détaillée sous 48h.',
    rdv: 'Votre demande de rendez-vous a bien été reçue. Nous vous contacterons rapidement pour confirmer le créneau.',
  };

  return emailShell('Confirmation de votre demande', `
    <p style="margin:0 0 18px;font-size:17px;font-weight:600;color:${BRAND.text};">
      Bonjour${fields.nom ? ' ' + escapeHtml(fields.nom) : ''},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${BRAND.text};line-height:1.75;">
      ${messages[type] || 'Merci pour votre soumission. Nous vous recontacterons très rapidement.'}
    </p>
    <p style="margin:0;font-size:14px;color:${BRAND.textLight};line-height:1.7;">
      Nous restons à votre disposition pour toute question.<br>
      L'équipe K-EMPIRE CORPORATION
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;">
      <tr><td align="center">
        <table cellpadding="0" cellspacing="0"><tr>
          <td bgcolor="${BRAND.accent}" style="border-radius:8px;">
            <a href="https://www.k-empirecorporation.com" style="display:inline-block;padding:14px 36px;background:${BRAND.accent};color:#FFFFFF;font-weight:600;font-size:13px;text-decoration:none;letter-spacing:0.5px;border-radius:8px;">DÉCOUVRIR NOS SERVICES</a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  `);
}

async function sendEmail(to, subject, html) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html }),
    });
  } catch {
    console.error('[forms] Échec envoi e-mail');
  }
}

// ── Limitation de débit ─────────────────────────────────────────
// Fenêtre glissante en mémoire : elle borne les rafales au sein d'une
// instance. La protection forte reste le pare-feu / WAF configuré sur Vercel.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const rateHits = new Map();

function clientIp(req) {
  const forwarded = req.headers && req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateHits.set(ip, hits);
  if (rateHits.size > 5000) rateHits.clear();
  return false;
}

// ── Handler ─────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Méthode non autorisée' });

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ success: false, message: 'Trop de demandes. Réessayez dans quelques instants.' });
  }

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
  const submissionsDataset = process.env.SANITY_SUBMISSIONS_DATASET;
  if (!projectId || !token || !submissionsDataset) {
    console.error('[forms] Missing env vars:', {
      projectId: !!projectId,
      token: !!token,
      submissionsDataset: !!submissionsDataset,
    });
    return res.status(500).json({ success: false, message: 'Stockage non configuré côté serveur' });
  }

  // ── Extract fields ──
  const fields = {};
  for (const key of config.fields) {
    if (raw[key] !== undefined && raw[key] !== null) fields[key] = raw[key];
  }

  // ── Build document ──
  const doc = { _type: config.type, ...fields, submittedAt: new Date().toISOString() };

  // Note: references are NOT set here because inscriptions write to the `submissions` dataset
  // while formations/events live in `production`. Cross-dataset refs are rejected by Sanity.
  // The string IDs (formation_id, evenement_id, session_id) are kept for lookup purposes.

  // ── Newsletter dedup ──
  if (config.type === 'soumissionNewsletter' && fields.email) {
    try {
      const existing = await submissionsClient().fetch(
        `count(*[_type == "soumissionNewsletter" && email == $email])`,
        { email: fields.email }
      );
      if (existing > 0) {
        return res.status(200).json({ success: true, message: 'Vous êtes déjà inscrit(e) à la newsletter.' });
      }
    } catch { /* proceed */ }
  }

  // ── Save to Sanity ──
  try {
    await submissionsClient().create(doc);
  } catch (err) {
    console.error(`[forms] Sanity create échec (${config.type})`, {
      message: err.message,
      statusCode: err.statusCode,
      response: err.response ? JSON.stringify(err.response) : 'n/a',
      details: err.details ? JSON.stringify(err.details) : 'n/a',
    });
    return res.status(500).json({ success: false, message: 'Erreur de stockage — réessayez' });
  }

  // ── Send admin notification ──
  const adminTo = process.env.RESEND_TO;
  if (adminTo) {
    await sendEmail(adminTo, `[K-EMPIRE] ${config.label}`, buildAdminEmail(endpoint, fields));
  }

  // ── Send user confirmation ──
  if (fields.email) {
    await sendEmail(fields.email, `K-EMPIRE — ${config.label} confirmée`, buildUserConfirmation(endpoint, fields));
  }

  // ── Create Google Calendar event for RDV ──
  if (config.type === 'soumissionRdv') {
    await createCalendarEvent(fields);
  }

  return res.status(200).json({ success: true });
}

export { emailShell, buildAdminEmail, buildUserConfirmation };
