const WP_BASE = import.meta.env.VITE_WP_API_BASE || 'http://localhost:8881/wp-json/wp/v2';

// En dev : URL relative → Vite proxy gère CORS
// En prod : URL absolue dérivée de la base WP
const ADMIN_API_URL = import.meta.env.VITE_WP_ADMIN_API_URL || (
  import.meta.env.PROD
    ? WP_BASE.replace('/wp/v2', '/kempire/v1')
    : '/wp-json/kempire/v1'
);

let csrfNonce = null;
let csrfPromise = null;

async function fetchCsrfNonce() {
  if (csrfNonce) return csrfNonce;
  if (csrfPromise) return csrfPromise;

  csrfPromise = (async () => {
    try {
      const res = await fetch(`${ADMIN_API_URL}/csrf`, { credentials: 'same-origin' });
      if (res.ok) {
        const json = await res.json();
        csrfNonce = json.nonce || null;
        return csrfNonce;
      }
    } catch {}
    return null;
  })();

  const result = await csrfPromise;
  csrfPromise = null;
  return result;
}

async function submitForm(endpoint, data) {
  const url = `${ADMIN_API_URL}/${endpoint}`;
  const nonce = await fetchCsrfNonce();

  const headers = { 'Content-Type': 'application/json' };
  if (nonce) headers['X-WP-Nonce'] = nonce;

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error('Erreur réseau — vérifiez que le serveur WordPress est accessible');
  }

  if (!response.ok) {
    let body = '';
    try { body = await response.text(); } catch {}
    throw new Error(`Le serveur a répondu ${response.status} — contactez l'administrateur`);
  }

  const json = await response.json();

  if (json.success === false) {
    throw new Error(json.message || 'Erreur inconnue côté serveur');
  }

  return json;
}

export function submitNewsletter(data) {
  return submitForm('newsletter', data);
}

export function submitFormationInscription(data) {
  return submitForm('inscription-formation', data);
}

export function submitEvenementInscription(data) {
  return submitForm('inscription-evenement', data);
}

export function submitDevis(data) {
  return submitForm('devis', data);
}

export function submitRdv(data) {
  return submitForm('rdv', data);
}

export function submitCommunaute(data) {
  return submitForm('communaute', data);
}
