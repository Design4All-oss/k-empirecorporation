import { randomBytes } from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'https://k-empirecorporation.com/api/google/callback';
  const scopes = ['https://www.googleapis.com/auth/calendar.events'];

  // Jeton anti-CSRF porté par un cookie httpOnly et vérifié au retour de
  // Google : sans lui, un tiers peut faire valider SON code d'autorisation
  // dans le callback et remplacer les jetons de l'agenda.
  const state = randomBytes(16).toString('hex');
  res.setHeader(
    'Set-Cookie',
    `gstate=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
  );

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    state,
  })}`;

  res.redirect(authUrl);
}
