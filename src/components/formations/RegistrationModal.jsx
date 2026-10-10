import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { submitFormationInscription } from '../../api/forms';
import { formatXOF } from '../../utils/format';
import {
  CIVILITES,
  NIVEAUX_ETUDES,
  EXPERIENCES,
  MOYENS_PAIEMENT_INDIVIDUEL,
  MOYENS_PAIEMENT_INSTITUTION,
  SOURCES,
  OUI_NON,
  CONDITIONS,
} from '../../constants/inscription';

const inputCls =
  'w-full px-4 py-3 border border-gray-200 rounded-xl text-text bg-white focus:outline-none focus:border-accent';

const EMPTY_PARTICIPANT = { nom: '', fonction: '', email: '', telephone: '' };

const ALL_STEPS = [0, 1, 2, 3, 4];

const STEP_META_INDIVIDUAL = [
  { title: 'Type d’inscription', desc: 'Choisissez la formule qui vous concerne.' },
  { title: 'Vos informations', desc: 'Identité, coordonnées et parcours du participant.' },
  { title: 'Vos motivations', desc: 'Pourquoi cette formation et ce que vous en attendez.' },
  { title: 'Règlement', desc: 'Tarif, moyen de paiement et origine de votre candidature.' },
  { title: 'Conditions & confirmation', desc: 'Vérifiez vos informations, puis envoyez la demande.' },
];

const STEP_META_INSTITUTION = [
  { title: 'Type d’inscription', desc: 'Choisissez la formule qui vous concerne.' },
  { title: 'Votre institution', desc: 'Identité de l’organisme et responsable de l’inscription.' },
  { title: 'Participants', desc: 'Nombre de participants et coordonnées de chacun.' },
  { title: 'Facturation', desc: 'Tarif, mode de règlement et coordonnées bancaires.' },
  { title: 'Conditions & confirmation', desc: 'Vérifiez vos informations, puis envoyez la demande.' },
];

// Formate une date ISO ; renvoie la chaîne si elle est déjà formatée en français.
const frDate = (value) => {
  if (!value) return '';
  const s = String(value);
  if (!/^\d{4}-\d{2}-\d{2}/.test(s)) return s;
  return new Date(`${s.slice(0, 10)}T00:00:00`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const Field = ({ label, required, children, hint }) => (
  <div>
    <label className="block text-sm font-medium text-primary mb-1">
      {label}
      {required ? ' *' : ''}
    </label>
    {children}
    {hint ? <p className="text-xs text-text-muted mt-1">{hint}</p> : null}
  </div>
);

const RadioRow = ({ name, value, checked, onChange, label }) => (
  <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      required
      className="w-5 h-5 text-accent accent-accent"
    />
    <span className="text-sm text-primary">{label}</span>
  </label>
);

const StepHeading = ({ title, desc }) => (
  <div className="mb-5">
    <h2 className="text-xl font-bold text-primary">{title}</h2>
    <p className="text-sm text-text-muted">{desc}</p>
  </div>
);

const RegistrationModal = ({ formation, onClose }) => {
  const [form, setForm] = useState({
    type: '',
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    anniversaire: '',
    paysResidence: '',
    niveauEtudes: '',
    experience: '',
    fonction: '',
    entreprise: '',
    motivations: '',
    objectifsPro: '',
    attentes: '',
    moyenPaiement: '',
    source: '',
    recevoirInfos: '',
    raisonSociale: '',
    secteurActivite: '',
    adressePostale: '',
    nif: '',
    siteWeb: '',
    responsableNom: '',
    responsableFonction: '',
    adresseFacturation: '',
    nbParticipants: '',
    participants: [],
    coordonneesBancaires: '',
    conditionsGenerales: '',
    autorisation: false,
  });
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const stepRef = useRef(null);
  const boxRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const isIndividual = form.type === 'individuelle';
  const isInstitution = form.type === 'institutionnelle';
  const nbParticipants = Number(form.nbParticipants) || 0;
  const showTable = isInstitution && nbParticipants >= 1;

  const steps = form.type ? ALL_STEPS : [0];
  const meta = (isIndividual ? STEP_META_INDIVIDUAL : STEP_META_INSTITUTION)[step] || STEP_META_INSTITUTION[0];

  const goTo = (next) => {
    setStep(next);
    boxRef.current?.scrollTo({ top: 0 });
  };

  const validateStep = () => {
    const el = stepRef.current;
    if (!el) return true;
    const fields = el.querySelectorAll('input, select, textarea');
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (step === 0 && !form.type) return;
    if (!validateStep()) return;
    setError('');
    goTo(step + 1);
  };

  const goPrev = () => {
    setError('');
    goTo(step - 1);
  };

  // Tarif du type d'inscription choisi ; null = gratuit pour ce type.
  const unitPrice = (() => {
    const raw = isIndividual ? formation.priceIndividual : formation.priceInstitution;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  })();
  const tarifLabel = unitPrice ? formatXOF(unitPrice) : 'Gratuite';

  const moyens = isIndividual ? MOYENS_PAIEMENT_INDIVIDUEL : MOYENS_PAIEMENT_INSTITUTION;

  const setNbParticipants = (raw) => {
    const n = raw === '' ? '' : Math.max(0, Math.min(99, parseInt(raw, 10) || 0));
    setForm((f) => {
      const participants = [...f.participants];
      if (typeof n === 'number' && n >= 1) {
        while (participants.length < n) participants.push({ ...EMPTY_PARTICIPANT });
        if (participants.length > n) participants.length = n;
      }
      return { ...f, nbParticipants: n, participants };
    });
  };

  const setParticipant = (index, key, value) =>
    setForm((f) => ({
      ...f,
      participants: f.participants.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    }));

  const addParticipant = () =>
    setForm((f) => ({
      ...f,
      nbParticipants: (Number(f.nbParticipants) || 1) + 1,
      participants: [...f.participants, { ...EMPTY_PARTICIPANT }],
    }));

  const removeParticipant = (index) =>
    setForm((f) => {
      const participants = f.participants.filter((_, i) => i !== index);
      if (participants.length === 0) participants.push({ ...EMPTY_PARTICIPANT });
      return { ...f, participants, nbParticipants: Math.max(1, participants.length) };
    });

  const cgvAccepted = form.conditionsGenerales === CONDITIONS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cgvAccepted) {
      setError('Veuillez accepter les conditions générales pour pouvoir vous inscrire.');
      return;
    }

    const common = {
      endpoint: 'inscription-formation',
      type: form.type,
      formation_slug: formation.slug || '',
      formation_id: formation.id || '',
      email: form.email,
      telephone: form.telephone,
      conditionsGenerales: form.conditionsGenerales,
      autorisationDonnees: !!form.autorisation,
    };

    const payload = isIndividual
      ? {
          ...common,
          civilite: form.civilite,
          nom: form.nom,
          prenom: form.prenom,
          anniversaire: form.anniversaire,
          paysResidence: form.paysResidence,
          niveauEtudes: form.niveauEtudes,
          experience: form.experience,
          fonction: form.fonction,
          entreprise: form.entreprise,
          motivations: form.motivations,
          objectifsPro: form.objectifsPro,
          attentes: form.attentes,
          moyenPaiement: form.moyenPaiement,
          source: form.source,
          recevoirInfos: form.recevoirInfos,
        }
      : {
          ...common,
          nom: form.responsableNom,
          raisonSociale: form.raisonSociale,
          secteurActivite: form.secteurActivite,
          adressePostale: form.adressePostale,
          nif: form.nif,
          siteWeb: form.siteWeb,
          responsableNom: form.responsableNom,
          responsableFonction: form.responsableFonction,
          adresseFacturation: form.adresseFacturation,
          nbParticipants: Number(form.nbParticipants) || 0,
          participants: form.participants.map((p) => ({
            nom: p.nom,
            fonction: p.fonction,
            email: p.email,
            telephone: p.telephone,
          })),
          moyenPaiement: form.moyenPaiement,
          coordonneesBancaires: form.coordonneesBancaires,
        };

    setSubmitting(true);
    setError('');
    try {
      const res = await submitFormationInscription(payload);
      if (res.success) {
        setDone(true);
      } else {
        setError(res.message || 'Une erreur est survenue. Réessayez.');
      }
    } catch (err) {
      setError(err?.message || 'Une erreur est survenue. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  };

  const headerItems = [
    { label: 'Formation', value: formation.title },
    { label: 'Début', value: frDate(formation.nextSession) },
    { label: 'Durée', value: formation.duration },
    { label: 'Format', value: formation.format },
    { label: 'Clôture des inscriptions', value: frDate(formation.practical?.registrationDeadline) },
  ].filter((i) => i.value);

  const isLast = Boolean(form.type) && step === ALL_STEPS.length - 1;

  const renderTypeStep = (
    <>
      <div className="space-y-3">
        <RadioRow
          name="inscriptionType"
          value="individuelle"
          label="Inscription Individuelle"
          checked={isIndividual}
          onChange={set('type')}
        />
        <RadioRow
          name="inscriptionType"
          value="institutionnelle"
          label="Inscription Institutionnelle (Entreprise / Organisation)"
          checked={isInstitution}
          onChange={set('type')}
        />
      </div>
      {!form.type && <p className="mt-4 text-sm text-text-muted">Sélectionnez une formule pour continuer.</p>}
    </>
  );

  /* ── Étape 1 ───────────────────────────────────────────── */
  const renderIndividualStep1 = (
    <>
      <div className="mb-4">
        <span className="block text-sm font-medium text-primary mb-2">
          Civilité <span className="text-accent">*</span>
        </span>
        <div className="grid grid-cols-2 gap-3">
          {CIVILITES.map((c) => (
            <RadioRow
              key={c}
              name="civilite"
              value={c}
              label={c}
              checked={form.civilite === c}
              onChange={set('civilite')}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Nom" required>
          <input type="text" required value={form.nom} onChange={set('nom')} className={inputCls} />
        </Field>
        <Field label="Prénom(s)" required>
          <input type="text" required value={form.prenom} onChange={set('prenom')} className={inputCls} />
        </Field>
        <Field label="Adresse e-mail" required>
          <input type="email" required value={form.email} onChange={set('email')} className={inputCls} />
        </Field>
        <Field label="Numéro de téléphone" required hint="Indicatif pays + numéro">
          <input
            type="tel"
            required
            value={form.telephone}
            onChange={set('telephone')}
            className={inputCls}
            placeholder="+228 90 00 00 00"
          />
        </Field>
        <Field label="Anniversaire">
          <input type="date" value={form.anniversaire} onChange={set('anniversaire')} className={inputCls} />
        </Field>
        <Field label="Pays de résidence" required>
          <input
            type="text"
            required
            value={form.paysResidence}
            onChange={set('paysResidence')}
            className={inputCls}
          />
        </Field>
        <Field label="Niveau d'études" required>
          <select required value={form.niveauEtudes} onChange={set('niveauEtudes')} className={inputCls}>
            <option value="">Sélectionnez…</option>
            {NIVEAUX_ETUDES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Expérience professionnelle" required hint="Échelle de 0 à 5">
          <select required value={form.experience} onChange={set('experience')} className={inputCls}>
            <option value="">Sélectionnez…</option>
            {EXPERIENCES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fonction" required hint="Poste occupé">
          <input type="text" required value={form.fonction} onChange={set('fonction')} className={inputCls} />
        </Field>
        <Field label="Entreprise / Organisation" required hint="Structure de provenance">
          <input
            type="text"
            required
            value={form.entreprise}
            onChange={set('entreprise')}
            className={inputCls}
          />
        </Field>
      </div>
    </>
  );

  const renderInstitutionStep1 = (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Raison sociale" required>
          <input
            type="text"
            required
            value={form.raisonSociale}
            onChange={set('raisonSociale')}
            className={inputCls}
          />
        </Field>
        <Field label="Secteur d'activité" required hint="Domaine d'intervention">
          <input
            type="text"
            required
            value={form.secteurActivite}
            onChange={set('secteurActivite')}
            className={inputCls}
          />
        </Field>
        <Field label="Numéro d'identification fiscale" required hint="NIF ou n° d'enregistrement">
          <input type="text" required value={form.nif} onChange={set('nif')} className={inputCls} />
        </Field>
        <Field label="Site web" required>
          <input
            type="url"
            required
            value={form.siteWeb}
            onChange={set('siteWeb')}
            className={inputCls}
            placeholder="https://"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Adresse postale complète" required hint="Rue, BP, code postal, ville, pays">
          <textarea
            required
            rows={3}
            value={form.adressePostale}
            onChange={set('adressePostale')}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      <h3 className="text-base font-semibold text-primary mt-8 mb-4">
        Responsable de l&apos;inscription
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Nom et prénom" required>
          <input
            type="text"
            required
            value={form.responsableNom}
            onChange={set('responsableNom')}
            className={inputCls}
          />
        </Field>
        <Field label="Fonction / Titre" required hint="Ex. Directeur juridique, Responsable formation">
          <input
            type="text"
            required
            value={form.responsableFonction}
            onChange={set('responsableFonction')}
            className={inputCls}
          />
        </Field>
        <Field label="Adresse e-mail professionnelle" required>
          <input type="email" required value={form.email} onChange={set('email')} className={inputCls} />
        </Field>
        <Field label="Numéro de téléphone" hint="WhatsApp de préférence">
          <input type="tel" value={form.telephone} onChange={set('telephone')} className={inputCls} />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Adresse de facturation" hint="Si différente de l'adresse principale">
          <textarea
            rows={2}
            value={form.adresseFacturation}
            onChange={set('adresseFacturation')}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>
    </>
  );

  /* ── Étape 2 ───────────────────────────────────────────── */
  const renderIndividualStep2 = (
    <div className="grid gap-4">
      <Field label="Motivations" required>
        <textarea
          required
          rows={3}
          value={form.motivations}
          onChange={set('motivations')}
          className={`${inputCls} resize-none`}
          placeholder="Pourquoi suivre cette formation ?"
        />
      </Field>
      <Field label="Objectifs professionnels" required>
        <textarea
          required
          rows={3}
          value={form.objectifsPro}
          onChange={set('objectifsPro')}
          className={`${inputCls} resize-none`}
          placeholder="Objectifs visés"
        />
      </Field>
      <Field label="Attentes particulières">
        <textarea
          rows={3}
          value={form.attentes}
          onChange={set('attentes')}
          className={`${inputCls} resize-none`}
          placeholder="Vis-à-vis du contenu"
        />
      </Field>
    </div>
  );

  const renderInstitutionStep2 = (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Field label="Nombre total de participants" hint="Ex. 3 en présentiel, 2 en visio">
          <input
            type="number"
            min="1"
            max="99"
            value={form.nbParticipants}
            onChange={(e) => setNbParticipants(e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      {showTable ? (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bg-alt text-left">
                <tr>
                  <th className="px-3 py-2 font-semibold text-primary">Nom / prénom</th>
                  <th className="px-3 py-2 font-semibold text-primary">Fonction</th>
                  <th className="px-3 py-2 font-semibold text-primary">E-mail</th>
                  <th className="px-3 py-2 font-semibold text-primary">Téléphone</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {form.participants.map((p, i) => (
                  <tr key={i} className="border-t border-gray-100 align-top">
                    <td className="p-2">
                      <input
                        type="text"
                        value={p.nom}
                        onChange={(e) => setParticipant(i, 'nom', e.target.value)}
                        className="w-full min-w-32 px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={p.fonction}
                        onChange={(e) => setParticipant(i, 'fonction', e.target.value)}
                        className="w-full min-w-28 px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="email"
                        value={p.email}
                        onChange={(e) => setParticipant(i, 'email', e.target.value)}
                        className="w-full min-w-36 px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="tel"
                        value={p.telephone}
                        onChange={(e) => setParticipant(i, 'telephone', e.target.value)}
                        className="w-full min-w-28 px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                      />
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => removeParticipant(i)}
                        aria-label="Retirer ce participant"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-3 py-2 border-t border-gray-100">
            <button
              type="button"
              onClick={addParticipant}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              <Plus size={15} /> Ajouter un participant
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          Indiquez le nombre de participants pour renseigner leurs coordonnées.
        </p>
      )}
    </>
  );

  /* ── Étape 3 ───────────────────────────────────────────── */
  const renderIndividualStep3 = (
    <>
      <div className="bg-bg-alt rounded-xl p-4 mb-4">
        <p className="text-xs text-text-muted">Tarif individuel</p>
        <p className="font-semibold text-primary">{tarifLabel}</p>
      </div>

      <div className="grid gap-4">
        <Field label="Moyen de paiement" required={Boolean(unitPrice)}>
          <select
            required={Boolean(unitPrice)}
            value={form.moyenPaiement}
            onChange={set('moyenPaiement')}
            className={inputCls}
          >
            <option value="">Sélectionnez…</option>
            {moyens.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Comment avez-vous connu la formation ?" required>
          <select required value={form.source} onChange={set('source')} className={inputCls}>
            <option value="">Sélectionnez…</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Recevoir des informations sur d'autres formations ?" required>
          <select required value={form.recevoirInfos} onChange={set('recevoirInfos')} className={inputCls}>
            <option value="">Sélectionnez…</option>
            {OUI_NON.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </>
  );

  const renderInstitutionStep3 = (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-bg-alt rounded-xl p-4">
          <p className="text-xs text-text-muted">Tarif institutionnel / participant</p>
          <p className="font-semibold text-primary">{tarifLabel}</p>
        </div>
        <div className="bg-bg-alt rounded-xl p-4">
          <p className="text-xs text-text-muted">Total à payer</p>
          <p className="font-semibold text-primary">
            {unitPrice ? formatXOF(unitPrice * Math.max(1, nbParticipants)) : 'Gratuite'}
          </p>
        </div>
        <Field label="Mode de paiement souhaité">
          <select value={form.moyenPaiement} onChange={set('moyenPaiement')} className={inputCls}>
            <option value="">Sélectionnez…</option>
            {moyens.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Coordonnées bancaires de l'institution" hint="Pour prélèvement ou virement">
          <textarea
            rows={3}
            value={form.coordonneesBancaires}
            onChange={set('coordonneesBancaires')}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>
    </>
  );

  /* ── Étape 4 — conditions + récapitulatif ──────────────── */
  const recap = isIndividual
    ? [
        { label: 'Nom', value: [form.civilite, form.prenom, form.nom].filter(Boolean).join(' ') },
        { label: 'E-mail', value: form.email },
        { label: 'Téléphone', value: form.telephone },
        { label: 'Fonction', value: form.fonction },
        { label: 'Entreprise', value: form.entreprise },
      ]
    : [
        { label: 'Institution', value: form.raisonSociale },
        { label: 'Responsable', value: form.responsableNom },
        { label: 'E-mail', value: form.email },
        { label: 'Téléphone', value: form.telephone },
        {
          label: 'Participants',
          value: nbParticipants > 0 ? `${nbParticipants}` : '',
        },
      ];

  const renderFinalStep = (
    <>
      <div className="bg-bg-alt rounded-2xl p-4 mb-6">
        <p className="text-xs text-text-muted mb-3">Récapitulatif</p>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {recap.map((row) =>
            row.value ? (
              <div key={row.label}>
                <dt className="text-[11px] uppercase tracking-[0.12em] text-text-muted">{row.label}</dt>
                <dd className="text-sm font-medium text-primary break-words">{row.value}</dd>
              </div>
            ) : null,
          )}
        </dl>
      </div>

      <Field
        label={isIndividual ? 'Conditions générales' : 'Accord sur les conditions générales'}
        required
      >
        <select
          required
          value={form.conditionsGenerales}
          onChange={set('conditionsGenerales')}
          className={inputCls}
        >
          <option value="">Sélectionnez…</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-start gap-3 cursor-pointer mt-4">
        <input
          type="checkbox"
          required={isIndividual}
          checked={form.autorisation}
          onChange={(e) => setForm((f) => ({ ...f, autorisation: e.target.checked }))}
          className="w-5 h-5 mt-0.5 text-accent accent-accent rounded"
        />
        <span className="text-sm text-text-muted">
          Autorisation de traitement des données — conservation et traitement à des fins
          d&apos;organisation et de suivi.
        </span>
      </label>

      {form.conditionsGenerales === CONDITIONS[1] && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
          Vous devez accepter les conditions générales pour pouvoir vous inscrire.
        </p>
      )}
    </>
  );

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          ref={boxRef}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>

          {done ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">Demande envoyée</h2>
              <p className="text-text-muted leading-relaxed mb-6">
                Votre demande d&apos;inscription a bien été enregistrée. Un conseiller académique
                vous contactera sous 24h pour finaliser votre inscription et vous communiquer les
                détails pratiques.
              </p>
              <p className="text-sm text-text-muted mb-8">
                Places limitées — sélection basée sur la pertinence du profil.
              </p>
              <Button onClick={onClose}>
                Fermer <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {/* En-tête formation */}
              <div className="bg-bg-alt rounded-2xl p-4 md:p-5 mb-6">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {headerItems.map((item) => (
                    <div key={item.label} className="min-w-0">
                      <p className="text-xs text-text-muted">{item.label}</p>
                      <p className="font-semibold text-primary break-words">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progression */}
              <div className="flex items-center gap-1.5 mb-2" aria-hidden="true">
                {steps.map((s) => (
                  <div key={s} className="flex-1 h-1 rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-[width] duration-300 ${
                        s <= step ? 'bg-accent' : ''
                      }`}
                      style={{ width: s <= step ? '100%' : '0%' }}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs font-medium text-text-muted mb-5" aria-live="polite">
                Étape {step + 1} / {steps.length} — {meta.title}
              </p>

              <StepHeading title={meta.title} desc={meta.desc} />

              <div ref={stepRef}>
                {step === 0 && renderTypeStep}
                {step === 1 && (isIndividual ? renderIndividualStep1 : renderInstitutionStep1)}
                {step === 2 && (isIndividual ? renderIndividualStep2 : renderInstitutionStep2)}
                {step === 3 && (isIndividual ? renderIndividualStep3 : renderInstitutionStep3)}
                {step === 4 && renderFinalStep}
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
                  {error}
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goPrev}
                    disabled={submitting}
                    className="flex-1 min-w-32"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Retour
                  </Button>
                )}

                {!isLast && (
                  <Button
                    type="button"
                    onClick={goNext}
                    disabled={!form.type && step === 0}
                    className="flex-1 min-w-32"
                  >
                    Continuer <ArrowRight size={16} className="ml-2" />
                  </Button>
                )}

                {isLast && (
                  <Button type="submit" disabled={submitting} className="flex-1 min-w-32">
                    {submitting ? 'Envoi en cours…' : 'Je m’inscris'}
                  </Button>
                )}
              </div>

              <p className="text-xs text-text-muted text-center mt-3">
                Un conseiller académique vous contactera sous 24h pour finaliser votre
                inscription.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegistrationModal;
