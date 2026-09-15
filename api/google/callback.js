import { createClient } from '@sanity/client';

const sanityClient = () =>
  createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_SUBMISSIONS_DATASET || 'production',
    apiVersion: '2026-01-01',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
  });

export default async function handler(req, res) {
  const { code, error } = req.query;
  if (error || !code) {
    return res.status(400).send(`<h2>Erreur : ${error || 'Code manquant'}</h2><p><a href="/">Retour</a></p>`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'https://k-empirecorporation.com/api/google/callback',
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.json().catch(() => ({}));
      console.error('[google/callback] Token exchange failed:', tokenRes.status, err);
      return res.status(500).send('<h2>Échec de l\'authentification Google</h2><p>Le code n\'a pas pu être échangé.</p>');
    }

    const tokens = await tokenRes.json();
    const email = process.env.GOOGLE_CALENDAR_EMAIL || 'contact.kempirecorporation@gmail.com';

    // Get user info to verify email
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const user = userRes.ok ? await userRes.json() : { email };

    // Save tokens to Sanity
    const client = sanityClient();
    const docType = 'googleTokens';
    const docEmail = user.email || email;

    const existing = await client.fetch(
      `*[_type == "${docType}" && email == $email][0]._id`,
      { email: docEmail }
    );

    const doc = {
      _type: docType,
      email: docEmail,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiry: Date.now() + (tokens.expires_in - 60) * 1000,
    };

    if (existing) {
      await client.patch(existing).set(doc).commit();
    } else {
      await client.create(doc);
    }

    res.send(`
      <html><body style="font-family:system-ui;text-align:center;padding:80px 20px;">
        <h1 style="color:#1A2744;">✅ Connexion Google Calendar réussie</h1>
        <p style="color:#6B7280;">Compte : <strong>${docEmail}</strong></p>
        <p style="color:#6B7280;">Les rendez-vous seront maintenant ajoutés à ton agenda.</p>
        <p><a href="https://k-empirecorporation.com" style="color:#C99400;">Retour au site</a></p>
      </body></html>
    `);
  } catch (err) {
    console.error('[google/callback] Error:', err);
    res.status(500).send('<h2>Erreur interne</h2>');
  }
}
