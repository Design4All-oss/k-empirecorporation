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

const submissionsClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_SUBMISSIONS_DATASET || 'production',
    apiVersion: '2026-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });

// ── Google Calendar helpers ─────────────────────────────────────
async function getGoogleTokens() {
  const email = process.env.GOOGLE_CALENDAR_EMAIL;
  if (!email) return null;
  try {
    const doc = await contentClient().fetch(
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
  const existing = await contentClient().fetch(
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
    fields: ['nom', 'email', 'telephone', 'fonction', 'entreprise', 'formation_slug', 'formation_id', 'session_id', 'message'],
  },
  'inscription-evenement': {
    type: 'inscriptionEvenement',
    label: 'Inscription événement',
    fields: ['nom', 'email', 'telephone', 'fonction', 'entreprise', 'evenement_slug', 'evenement_id', 'type', 'message'],
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
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bgAlt};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.text};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bgAlt};padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <!-- Header -->
      <tr><td style="background:${BRAND.primary};padding:28px 40px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="margin:0;color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:0.5px;">K-EMPIRE CORPORATION</h1>
        <p style="margin:6px 0 0;color:${BRAND.accentLight};font-size:13px;">${title}</p>
      </td></tr>
      <!-- Body -->
      <tr><td style="background:${BRAND.bg};padding:36px 40px;">
        ${bodyHtml}
      </td></tr>
      <!-- Footer -->
      <tr><td style="background:${BRAND.bg};padding:0 40px 28px;">
        <hr style="border:none;border-top:1px solid ${BRAND.border};margin:0 0 20px;">
        <p style="margin:0;font-size:12px;color:${BRAND.textLight};text-align:center;line-height:1.6;">
          K-EMPIRE CORPORATION &mdash; Conseil &amp; Formation<br>
          Lomé, Togo &bull; <a href="mailto:contact@k-empirecorporation.com" style="color:${BRAND.accent};">contact@k-empirecorporation.com</a><br>
          <a href="https://k-empirecorporation.com" style="color:${BRAND.accent};">k-empirecorporation.com</a>
        </p>
      </td></tr>
      <!-- Accent bar -->
      <tr><td style="height:4px;background:linear-gradient(90deg,${BRAND.primary},${BRAND.accent},${BRAND.primary});border-radius:0 0 12px 12px;"></td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function fieldRow(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:8px 0;font-size:13px;color:${BRAND.textLight};width:140px;vertical-align:top;">${label}</td><td style="padding:8px 0;font-size:14px;color:${BRAND.text};font-weight:500;">${value}</td></tr>`;
}

function fieldsTable(rows) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 20px;">${rows.join('')}</table>`;
}

// ── Email builders ──────────────────────────────────────────────
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
  };

  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => fieldRow(fieldLabels[k] || k, v));

  return emailShell(labels[type] || 'Nouvelle soumission', `
    <p style="margin:0 0 8px;font-size:15px;color:${BRAND.text};">
      Une nouvelle soumission a été enregistrée sur le site.
    </p>
    <p style="margin:0 0 20px;font-size:13px;color:${BRAND.textLight};">
      Type : <strong>${labels[type] || type}</strong> &bull; ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
    </p>
    ${fieldsTable(rows)}
    <a href="https://k-empirecorporation.com" style="display:inline-block;padding:12px 28px;background:${BRAND.accent};color:#fff;font-weight:600;font-size:14px;text-decoration:none;border-radius:8px;margin-top:8px;">Voir dans le Studio</a>
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

  return emailShell('Confirmation', `
    <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:${BRAND.text};">
      Bonjour${fields.nom ? ' ' + fields.nom : ''} 👋
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:${BRAND.textLight};line-height:1.7;">
      ${messages[type] || 'Merci pour votre soumission. Nous vous recontacterons très rapidement.'}
    </p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="text-align:center;">
        <a href="https://k-empirecorporation.com" style="display:inline-block;padding:14px 36px;background:${BRAND.primary};color:#fff;font-weight:600;font-size:14px;text-decoration:none;border-radius:8px;">
          Découvrir nos services
        </a>
      </td></tr>
    </table>
  `);
}

// ── Send email ──────────────────────────────────────────────────
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

// ── Handler ─────────────────────────────────────────────────────
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
    console.error('[forms] Missing env vars:', { projectId: !!projectId, token: !!token });
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
    return res.status(500).json({ success: false, message: 'Erreur de stockage — réessayez', detail: err.message });
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
