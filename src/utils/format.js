// Montants en XOF : « 600 000 XOF ». Vide ou négatif = formation gratuite.
export const formatXOF = (amount) => {
  const n = Number(amount);
  if (!Number.isFinite(n) || n <= 0) return '';
  return `${new Intl.NumberFormat('fr-FR').format(n)} XOF`;
};

export const isPaidFormation = (formation) =>
  Boolean(formation && (formation.priceIndividual || formation.priceInstitution));
