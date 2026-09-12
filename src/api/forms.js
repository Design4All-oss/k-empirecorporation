async function submitForm(endpoint, data) {
  let response;
  try {
    response = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint, ...data }),
    });
  } catch {
    throw new Error('Erreur réseau — veuillez réessayer');
  }

  const json = await response.json().catch(() => ({ success: false, message: 'Réponse invalide du serveur' }));

  if (!response.ok || json.success === false) {
    throw new Error(json.message || `Le serveur a répondu ${response.status} — contactez l'administrateur`);
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