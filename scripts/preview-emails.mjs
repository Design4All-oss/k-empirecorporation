import { writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildAdminEmail, buildUserConfirmation } from '../api/forms.js';

const sample = {
  nom: 'Kouami Emmanuel',
  email: 'client@exemple.com',
  phone: '+228 90 00 00 00',
  date: '15 octobre 2026',
  time: '10h00',
  message: "Je souhaite discuter d'un accompagnement stratégique pour mon entreprise.",
  organization: 'Entreprise Exemple SARL',
  country: 'Togo',
  motivations: 'Renforcer la gouvernance et la conformité',
  nbParticipants: '12',
  moyenPaiement: 'Virement bancaire',
};

const dir = join(tmpdir(), 'kempire-emails');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'admin.html'), buildAdminEmail('rdv', sample));
writeFileSync(join(dir, 'confirmation.html'), buildUserConfirmation('rdv', sample));
console.log('Apercus ecrits dans', dir);
