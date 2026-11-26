import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  GraduationCap,
  Landmark,
  MapPin,
  Menu,
  Monitor,
  Clock,
  X,
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import { useEvenement, useEvenements } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';
import { submitDossier } from '../api/forms';
import { useToast } from '../context/ToastContext';
import { withCdnParams } from '../config/sanity';
import './EvenementSingle.css';

// Gabarit fidèle à la maquette « Page événement — refonte immersive » (D:\DESIGN-UI).
// Tout le style est dans EvenementSingle.css, préfixé .ke- sous .ke-event.

const COVER_FALLBACK = '/assets/images/services/hero.webp';
// Visuels thématiques par événement (photos Freepik / Magnific), prioritaires sur la couverture Sanity.
const EVENT_VISUALS = {
  'gouvernance-entites-extractives-energetiques': {
    hero: '/assets/images/evenements/geee-hero-mine.webp',
    cta: '/assets/images/evenements/geee-cta-raffinerie.webp',
  },
};
// Inscriptions : le client utilise un Tally dédié à cet événement.
const SIGNUP_URL = 'https://bit.ly/KEC_GEEE';
// shortcut: URL du dossier à fournir par Ivan ; la mini-modale prend le relais tant qu'elle est vide.
const DOSSIER_URL = '';

// Accroche courte du hero ; le texte d'introduction (heroIntro) a sa propre section.
const HERO_HOOK = 'Maîtriser les risques. Sécuriser la valeur. Gouverner avec autorité.';
// Lignes de « L'essentiel » trop longues pour l'encart : elles restent détaillées plus bas.
const ASIDE_HIDDEN = /portage|gouvernance|scientifique/i;

const pad2 = (n) => String(n).padStart(2, '0');
const capitalize = (s = '') => s.charAt(0).toUpperCase() + s.slice(1);
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

// CARPEM est un sigle : le nom officiel l'accompagne, une seule fois.
const CARPEM = 'Centre Africain de Recherche sur les Politiques Énergétiques et Minières';
const sigle = (value = '') =>
  String(value).replace(/CARPEM/g, (m, offset, s) => (s[offset - 1] === '(' ? m : `${CARPEM} (CARPEM)`));
// Une information par ligne : les valeurs saisies séparent parfois les blocs par « · ».
const toLines = (value = '') =>
  sigle(value)
    .split(/\n|\s+·\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
// Un tiret de liaison devient un deux-points, plus sobre.
const colon = (value = '') => String(value).replace(/\s+[-–]\s+/g, ' : ');
// Coupe « Titre - détail » (ou « Titre : détail ») en deux.
const splitPair = (value = '') => {
  const m = /^(.+?)\s+(?:[-–]|:)\s+(.+)$/.exec(String(value));
  return m ? [m[1], m[2]] : [String(value), ''];
};

// Titres du programme : l'horaire est saisi dans le titre.
const TIME_SLOT = /^(\d{2}h\d{2})\s*[-–]\s*(\d{2}h\d{2})\s*·\s*(.+)$/;
const WORD_SLOT = /^(Matinée|Déjeuner|Après-midi|Fin de journée|Soirée)\s+-\s+(.+)$/;
const programRow = (item = {}) => {
  const titre = item.titre || '';
  const time = TIME_SLOT.exec(titre);
  if (time) return { heure: `${time[1]} – ${time[2]}`, titre: colon(time[3]), texte: item.texte || '' };
  const word = WORD_SLOT.exec(titre);
  if (word) return { heure: word[1], titre: colon(word[2]), texte: item.texte || '' };
  return { heure: '', titre: colon(titre), texte: item.texte || '' };
};
const sessionKind = (titre = '') => {
  const t = titre.toLowerCase();
  if (/dîner|diner|gala|graduation/.test(t)) return 'Soirée';
  if (/pause|déjeuner|dejeuner/.test(t)) return 'Pause';
  if (/^module/.test(t)) return 'Module';
  if (/ouverture|clôture|cloture|allocution/.test(t)) return 'Plénière';
  if (/networking|immersion|découverte/.test(t)) return 'Immersion';
  return 'Atelier';
};

// Icône de l'encart « L'essentiel » selon le libellé saisi dans Sanity.
const asideIcon = (label = '') => {
  const l = label.toLowerCase();
  if (/date/.test(l)) return Calendar;
  if (/lieu/.test(l)) return MapPin;
  if (/format/.test(l)) return Monitor;
  if (/portage|organis/.test(l)) return Landmark;
  if (/gouvernance|scientifique/.test(l)) return GraduationCap;
  return Clock;
};
const CLOSING = /cl[ôo]ture/i;
// Adresse retirée de l'affichage public (encore présente dans Sanity tant que l'événement n'est pas republié).
const HIDDEN_EMAIL = /\s*k-empirecorporation@gmail\.com\s*(·\s*)?/gi;
// Le lien « Consulter les CGF » remplace la mention du site web.
const CGF_TAIL = /\s*de K-EMPIRE CORPORATION,?\s*disponibles sur www\.k-empirecorporation\.com\.?/gi;
const CGF_PATH = '/cgf-k-empire';
const PRICE = /fcfa|paiement|montant|tarif/i;

function Lines({ value }) {
  const values = toLines(value);
  return values.map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));
}

function Eyebrow({ num, children, light = false }) {
  return (
    <div className={`ke-eyebrow${light ? ' ke-eyebrow--light' : ''}`}>
      {num ? `${num} — ` : ''}
      {children}
    </div>
  );
}

// CTA : URL Sanity si renseignée, sinon « dossier » → mini-formulaire, sinon inscription Tally.
function Cta({ label, url, className, onDossier, arrow = false }) {
  const content = (
    <>
      {label}
      {arrow && <ArrowRight size={18} aria-hidden="true" />}
    </>
  );
  if (url) {
    return (
      <a className={className} href={url} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  if (/dossier|brochure/i.test(label || '')) {
    if (DOSSIER_URL) {
      return (
        <a className={className} href={DOSSIER_URL} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }
    return (
      <button type="button" className={className} onClick={onDossier}>
        {content}
      </button>
    );
  }
  return (
    <a className={className} href={SIGNUP_URL} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

export default function EvenementSingle() {
  const { slug } = useParams();
  const { data: evenement, isLoading, isError } = useEvenement(slug);
  const { data: autresEvenements = [] } = useEvenements();
  const reduced = useReducedMotion();
  const toast = useToast();

  const [day, setDay] = useState(0);
  const [open, setOpen] = useState(0);
  const [anchorsOpen, setAnchorsOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [dossierSent, setDossierSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dossier, setDossier] = useState({ nom: '', structure: '', email: '', message: '' });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !evenement) {
    return (
      <div className="ke-event">
        <div className="ke-wrap ke-notfound">
          <h1 className="ke-h2">Événement introuvable</h1>
          <p className="ke-lead">
            <Link to="/blog">Voir les actualités et événements</Link>
          </p>
        </div>
      </div>
    );
  }

  const cover = evenement.image || COVER_FALLBACK;
  const visuals = EVENT_VISUALS[evenement.slug] || {};
  const heroImage = visuals.hero || cover;
  const ctaImage = visuals.cta || cover;
  const titleParts = String(evenement.title || '').split(/(\bExtractives\b)/);
  const ctas = evenement.ctas || [];
  const signupCta = ctas.find((c) => !/dossier|brochure/i.test(c.label || '')) || { label: 'Candidater' };
  const dossierCta = ctas.find((c) => /dossier|brochure/i.test(c.label || '')) || { label: 'Demander le dossier' };
  const regard = evenement.regard || [];
  const closingRow = regard.find((r) => CLOSING.test(r.label || ''));
  const asideRows = regard.filter((r) => r !== closingRow && !ASIDE_HIDDEN.test(r.label || ''));
  const stats = evenement.stats?.items || [];
  const pourquoi = evenement.pourquoi;
  const tickerWords = pourquoi?.intro
    ? String(pourquoi.intro).split('→').map((s) => s.trim()).filter(Boolean)
    : [];
  // Comme les logos : assez de mots pour que la série doublée couvre l'écran sans vide en fin de boucle.
  const tickerRun = tickerWords.length
    ? Array.from({ length: Math.ceil(12 / tickerWords.length) }, () => tickerWords).flat()
    : [];
  const gouvernance = evenement.gouvernance;
  const faculty = evenement.faculty;
  const parcours = evenement.parcours;
  const jours = parcours?.jours || [];
  const jour = jours[day] || jours[0];
  const pedagogie = evenement.pedagogie;
  const participer = evenement.participer || [];
  const experience = evenement.experience;
  const livrables = evenement.livrables;
  const partenaires = evenement.partenaires;
  const infos = (evenement.infosPratiques?.rows || [])
    .filter((row) => !PRICE.test(`${row.label || ''} ${row.valeur || ''}`))
    .map((row) => ({ ...row, valeur: String(row.valeur || '').replace(HIDDEN_EMAIL, '').replace(CGF_TAIL, '').trim() }))
    .filter((row) => row.valeur);
  const partnerLogos = (partenaires?.logos || []).filter((l) => l?.logo);
  // Avec peu de logos, la ligne serait plus courte que l'écran : on répète la série (au moins 8 éléments).
  const logoRun = partnerLogos.length
    ? Array.from({ length: Math.ceil(8 / partnerLogos.length) }, () => partnerLogos).flat()
    : [];
  const faq = evenement.faq || [];
  const others = Array.isArray(autresEvenements)
    ? autresEvenements.filter((e) => e.slug !== evenement.slug).slice(0, 3)
    : [];

  const anchorLinks = [
    evenement.heroIntro && ['#introduction', 'Introduction'],
    pourquoi && ['#pourquoi', 'Pourquoi'],
    gouvernance && ['#scientifique', 'Gouvernance scientifique'],
    faculty?.groupes?.length && ['#faculty', 'Faculty'],
    jours.length > 0 && ['#agenda', 'Agenda'],
    participer.length > 0 && ['#participants', 'Participants'],
    infos.length > 0 && ['#infos', 'Infos pratiques'],
    faq.length > 0 && ['#faq', 'FAQ'],
  ].filter(Boolean);

  const facultyList =(faculty?.groupes || []).flatMap((g) =>
    (g.intervenants || []).map((p) => ({ ...p, groupe: g.groupe }))
  );
  const modules = jours.reduce(
    (acc, j) => acc + (j.items || []).filter((i) => /module\s*\d/i.test(i.titre || '')).length,
    0
  );
  const NUMBER_WORDS = ['Zéro', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit'];
  const agendaTitle =
    jours.length > 0 && modules > 0
      ? `${NUMBER_WORDS[jours.length] || jours.length} jours, ${(NUMBER_WORDS[modules] || String(modules)).toLowerCase()} modules.`
      : 'Le programme.';

  // Numérotation continue des sections présentes, comme dans la maquette (01 — …, 02 — …).
  let sectionIndex = 0;
  const nextNum = () => pad2(++sectionIndex);

  function openDossier() {
    setDossierSent(false);
    setDossierOpen(true);
  }

  function closeDossier() {
    setDossierOpen(false);
    setDossierSent(false);
    setSubmitting(false);
  }

  async function submitDossierForm(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitDossier({ ...dossier, evenement: evenement.title });
      setDossierSent(true);
    } catch {
      toast("L'envoi a échoué. Réessayez.", 'error');
    } finally {
      setSubmitting(false);
    }
  }

  const fade = reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };
  const sessions = jour
    ? [
        ...(jour.items || []).map(programRow),
        ...(jour.closing ? [programRow({ titre: jour.closing })] : []),
      ]
    : [];

  return (
    <>
      <SEO title={evenement.title} description={evenement.excerpt || evenement.tagline} image={evenement.image} />

      <motion.div {...fade} className="ke-event">
        {/* ================= HERO ================= */}
        <header className="ke-hero" id="top">
          {/* Couverture en fond, voilée de marine pour garder le texte lisible. */}
          <img className="ke-hero__bg" src={heroImage} alt="" fetchPriority="high" />
          <div className="ke-hero__veil" aria-hidden="true" />

          <div className="ke-hero__inner">
            <div className="ke-hero__main">
              <div className="ke-hero__kicker">{evenement.subtitle || evenement.type}</div>
              <h1 className="ke-hero__title">
                {titleParts.map((part, i) =>
                  part === 'Extractives' ? (
                    <span className="ke-gold-italic" key={i}>
                      {part}
                    </span>
                  ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                  )
                )}
              </h1>
              <p className="ke-hero__hook">{HERO_HOOK}</p>
              <div className="ke-btn-row ke-hero__ctas">
                <Cta {...signupCta} className="ke-btn ke-btn--gold ke-btn--lg" onDossier={openDossier} arrow />
                <Cta {...dossierCta} className="ke-btn ke-btn--ghost ke-btn--lg" onDossier={openDossier} />
              </div>
            </div>

            {asideRows.length > 0 && (
              <aside className="ke-aside" aria-label="L'essentiel">
                <div className="ke-aside__head">
                  <span>L'essentiel</span>
                  {closingRow && (
                    <span className="ke-aside__badge">
                      Clôture : {closingRow.valeur}
                    </span>
                  )}
                </div>
                <dl className="ke-aside__list">
                  {asideRows.map((row, i) => {
                    const Icon = asideIcon(row.label);
                    return (
                      <div className="ke-aside__row" key={`${row.label}-${i}`}>
                        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                        <div>
                          <dt>{row.label}</dt>
                          <dd>
                            <Lines value={row.valeur} />
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </aside>
            )}
          </div>

          {stats.length > 0 && (
            <div className="ke-stats">
              <div className="ke-stats__grid">
                {stats.map((item, i) => (
                  <div className="ke-stat" key={`${item.label}-${i}`}>
                    <div className="ke-stat__value">{pad2(Number(item.value) || 0)}</div>
                    <div className="ke-stat__label">{colon(item.label)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* ================= ANCHOR BAR ================= */}
        <nav className={`ke-anchors${anchorsOpen ? ' is-open' : ''}`} aria-label="Sections de la page">
          <div className="ke-anchors__inner">
            {/* Mobile / tablette : les ancres passent dans un menu déroulant. */}
            <button
              type="button"
              className="ke-anchors__toggle"
              aria-expanded={anchorsOpen}
              aria-controls="ke-anchors-links"
              onClick={() => setAnchorsOpen((v) => !v)}
            >
              {anchorsOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              <span>Sommaire</span>
            </button>
            <div className="ke-anchors__links" id="ke-anchors-links">
              {anchorLinks.map(([href, label]) => (
                <a className="ke-anchor" href={href} key={href} onClick={() => setAnchorsOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
            <Cta {...signupCta} className="ke-btn ke-btn--gold ke-btn--sm ke-anchors__cta" onDossier={openDossier} />
          </div>
        </nav>

        {/* ================= INTRODUCTION ================= */}
        {evenement.heroIntro && (
          <section id="introduction" className="ke-section ke-wrap ke-intro">
            <div className="ke-split">
              <div className="ke-split__head">
                <Eyebrow num={nextNum()}>Introduction</Eyebrow>
                <h2 className="ke-h2">Le programme en bref.</h2>
              </div>
              <div className="ke-split__body ke-prose ke-intro__text">
                {String(evenement.heroIntro)
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= POURQUOI ================= */}
        {pourquoi && (
          <section id="pourquoi" className="ke-section ke-wrap ke-why">
            <div className="ke-split">
              <div className="ke-split__head">
                <Eyebrow num={nextNum()}>Pourquoi ce programme</Eyebrow>
                <h2 className="ke-h2">{evenement.tagline || evenement.title}</h2>
              </div>
              <div className="ke-split__body ke-prose">
                {String(evenement.excerpt || '')
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            </div>

            {tickerRun.length > 0 && (
              <div className="ke-ticker" aria-hidden="true">
                {/* Série doublée : l'animation glisse d'une série puis boucle sans à-coup. */}
                <div className="ke-ticker__track">
                  {[...tickerRun, ...tickerRun].map((s, i) => {
                    const first = i < tickerRun.length;
                    return (
                      <React.Fragment key={i}>
                        <span aria-hidden={!first}>{s}</span>
                        <span className="ke-ticker__sep" aria-hidden={!first}>◆</span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="ke-cards">
              {(pourquoi.items || []).map((item, i, all) => (
                <article className={`ke-card${i === all.length - 1 ? ' ke-card--navy' : ''}`} key={i}>
                  <div className="ke-card__num">{ROMAN[i] || pad2(i + 1)}</div>
                  <h3 className="ke-card__title">{item.titre}</h3>
                  <p className="ke-card__text">{item.texte}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ================= GOUVERNANCE SCIENTIFIQUE ================= */}
        {gouvernance && (
          <section id="scientifique" className="ke-band ke-band--sand">
            <div className="ke-section ke-wrap">
              <Eyebrow num={nextNum()}>Gouvernance scientifique</Eyebrow>
              <h2 className="ke-h2 ke-h2--block">Un programme garanti par un comité scientifique.</h2>
              {gouvernance.intro && <p className="ke-lead">{gouvernance.intro}</p>}
              <div className="ke-gov-grid">
                {(gouvernance.items || []).map((item, i) => {
                  const [role, name] = splitPair(item.titre);
                  return (
                    <article className={`ke-gov${i % 2 === 1 ? ' ke-gov--navy' : ''}`} key={i}>
                      <div className="ke-gov__body">
                        <div className="ke-gov__role">{name ? role : ''}</div>
                        <h3 className="ke-gov__name">{name || role}</h3>
                        {item.fonction && <p className="ke-gov__fn">{sigle(item.fonction)}</p>}
                        {item.texte && <p className="ke-gov__text">{item.texte}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
              {gouvernance.note && <p className="ke-note">{gouvernance.note}</p>}
            </div>
          </section>
        )}

        {/* ================= FACULTY ================= */}
        {facultyList.length > 0 && (
          <section id="faculty" className="ke-band ke-grid-bg ke-band--navy">
            <div className="ke-section ke-section--lg ke-wrap">
              <div className="ke-head">
                <div className="ke-head__main">
                  <Eyebrow num={nextNum()} light>
                    The Faculty
                  </Eyebrow>
                  <h2 className="ke-h2 ke-h2--xl">
                    Des praticiens qui ont <span className="ke-gold-italic">dirigé, régulé et négocié</span> au plus
                    haut niveau.
                  </h2>
                </div>
                {(faculty.intro || faculty.texte) && <p className="ke-head__side">{faculty.intro || faculty.texte}</p>}
              </div>

              <div className="ke-fgrid">
                {facultyList.map((person, i) => (
                  <article className="ke-fcard" key={`${person.nom}-${i}`}>
                    {person.photo ? (
                      <img className="ke-fcard__photo" src={withCdnParams(person.photo, 320)} alt={person.nom} loading="lazy" />
                    ) : (
                      <div className="ke-fcard__num">{pad2(i + 1)}</div>
                    )}
                    {person.groupe && <div className="ke-fcard__tag">{person.groupe}</div>}
                    <h3 className="ke-fcard__name">{person.nom}</h3>
                    {person.bio && <p className="ke-fcard__bio">{sigle(person.bio)}</p>}
                  </article>
                ))}
              </div>
              {faculty.note && <p className="ke-note ke-note--light">{faculty.note}</p>}
            </div>
          </section>
        )}

        {/* ================= AGENDA ================= */}
        {jour && (
          <section id="agenda" className="ke-section ke-section--lg ke-wrap">
            <div className="ke-head">
              <div className="ke-head__main">
                <Eyebrow num={nextNum()}>Le programme</Eyebrow>
                <h2 className="ke-h2">{agendaTitle}</h2>
              </div>
              <div className="ke-tabs" role="tablist" aria-label="Choisir le jour">
                {jours.map((j, i) => (
                  <button
                    type="button"
                    className="ke-tab"
                    key={i}
                    role="tab"
                    id={`tab-jour-${i}`}
                    aria-selected={day === i}
                    aria-controls="panel-jour"
                    onClick={() => setDay(i)}
                  >
                    <span className="ke-tab__label">{j.label}</span>
                    <span className="ke-tab__theme">{j.lieu}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ke-agenda" role="tabpanel" id="panel-jour" aria-labelledby={`tab-jour-${day}`}>
              <div className="ke-agenda__side">
                <div className="ke-daypanel">
                  <div className="ke-daypanel__num">{pad2(day + 1)}</div>
                  <div className="ke-daypanel__date">
                    {[jour.date, jour.lieu].filter(Boolean).join(' · ')}
                  </div>
                  {jour.intro && <h3 className="ke-daypanel__theme">{jour.intro}</h3>}
                  {(jour.pied || (day === 0 && parcours.intro)) && (
                    <p className="ke-daypanel__intro">{jour.pied || parcours.intro}</p>
                  )}
                </div>
              </div>
              <ol className="ke-sessions">
                {sessions.map((s, i) => {
                  const kind = sessionKind(s.titre);
                  const mod =
                    kind === 'Soirée' ? ' ke-session--highlight' : kind === 'Pause' ? ' ke-session--pause' : '';
                  return (
                    <li className={`ke-session${mod}`} key={i}>
                      <div className="ke-session__time">{s.heure}</div>
                      <div className="ke-session__body">
                        <div className="ke-session__title">{s.titre}</div>
                        <div className="ke-session__sub">{s.texte || '—'}</div>
                      </div>
                      <span className="ke-tag">{kind}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
            {parcours.note && <p className="ke-note">{parcours.note}</p>}
          </section>
        )}

        {/* ================= PÉDAGOGIE ================= */}
        {pedagogie && (pedagogie.items || []).length > 0 && (
          <section className="ke-band ke-band--navy">
            <div className="ke-section ke-wrap ke-pedago">
              <div className="ke-pedago__head">
                <Eyebrow num={nextNum()} light>
                  Pédagogie
                </Eyebrow>
                <h2 className="ke-h2">
                  Une pédagogie orientée <span className="ke-gold-italic">décision</span>.
                </h2>
                {/* La « répartition indicative » sert de chapeau, les autres entrées de grille. */}
                {pedagogie.items
                  .filter((it) => /répartition/i.test(typeof it === 'string' ? it : it?.titre || ''))
                  .map((it, i) => (
                    <p className="ke-pedago__lead" key={i}>
                      {typeof it === 'string' ? it : it.titre}
                    </p>
                  ))}
                {pedagogie.note && <p className="ke-pedago__lead">{pedagogie.note}</p>}
              </div>
              <div className="ke-pedago__grid">
                {pedagogie.items
                  .filter((it) => !/répartition/i.test(typeof it === 'string' ? it : it?.titre || ''))
                  .map((it, i) => {
                    const value = typeof it === 'string' ? it : it?.titre || '';
                    const [titre, texte] = splitPair(value);
                    return (
                      <div className="ke-pedago__item" key={i}>
                        <div className="ke-pedago__num">{pad2(i + 1)}</div>
                        <h3 className="ke-pedago__title">{titre}</h3>
                        {(texte || it?.texte) && <p>{capitalize(texte || it.texte)}</p>}
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* ================= PARTICIPANTS ================= */}
        {participer.length > 0 && (
          <section id="participants" className="ke-section ke-section--lg ke-wrap ke-section--tail">
            <Eyebrow num={nextNum()}>Qui participe ?</Eyebrow>
            <h2 className="ke-h2 ke-h2--block">Un cercle restreint de décideurs.</h2>
            <div className="ke-people">
              {participer.map((item, i) => (
                <div className="ke-person" key={i}>
                  <span className="ke-person__num">{pad2(i + 1)}</span>
                  <div>
                    <h3 className="ke-person__title">{item.titre}</h3>
                    {item.texte && <p className="ke-person__text">{item.texte}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= EXPÉRIENCE + LIVRABLES ================= */}
        {(experience || livrables) && (
          <section className="ke-wrap ke-duo-section">
            <div className="ke-duo">
              {experience && (
                <div className="ke-panel ke-panel--sand">
                  <Eyebrow num={nextNum()}>L'expérience K-EMPIRE</Eyebrow>
                  <h2 className="ke-panel__title">{experience.intro || 'Plus qu’une formation.'}</h2>
                  <ul className="ke-checklist">
                    {(experience.items || []).map((item, i) => {
                      const titre = typeof item === 'string' ? item : item.titre;
                      const texte = typeof item === 'string' ? '' : item.texte;
                      return (
                        <li key={i}>
                          <Check size={20} strokeWidth={2} aria-hidden="true" />
                          <span>
                            <strong>{colon(titre)}</strong>
                            {texte && <> : {texte}</>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {livrables && (
                <div className="ke-panel ke-panel--white">
                  <Eyebrow num={nextNum()}>Livrables &amp; bénéfices</Eyebrow>
                  <h2 className="ke-panel__title">Ce que vous emportez.</h2>
                  {livrables.intro && <p className="ke-panel__intro">{livrables.intro}</p>}
                  <div className="ke-deliverables">
                    {(livrables.items || []).map((item, i) => {
                      const value = typeof item === 'string' ? item : item.titre || '';
                      return (
                        <div className="ke-deliverable" key={i}>
                          <span className="ke-deliverable__key">{pad2(i + 1)}</span>
                          <span className="ke-deliverable__value">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                  {livrables.note && <p className="ke-note">{livrables.note}</p>}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= PARTENAIRES ================= */}
        {partenaires && (partenaires.items || []).length > 0 && (
          <section className="ke-wrap ke-duo-section">
            <Eyebrow num={nextNum()}>Partenaires</Eyebrow>
            <h2 className="ke-h2 ke-h2--block">Partenaires du programme.</h2>
            <div className="ke-partners">
              {partenaires.items.map((item, i) => (
                <article className="ke-partner" key={i}>
                  <div className="ke-partner__cat">{item.categorie}</div>
                  <h3 className="ke-partner__title">{sigle(item.titre)}</h3>
                  {item.texte && <p className="ke-partner__text">{sigle(item.texte)}</p>}
                </article>
              ))}
            </div>
            {partnerLogos.length > 0 && (
              <div className="ke-logos" aria-label="Logos des partenaires">
                {/* Liste doublée : l'animation glisse de -50 % puis boucle sans à-coup. */}
                <div className="ke-logos__track">
                  {[...logoRun, ...logoRun].map((item, i) => {
                    const first = i < partnerLogos.length;
                    return (
                      <div className="ke-logos__item" key={`${item.nom}-${i}`} aria-hidden={!first}>
                        <img src={withCdnParams(item.logo, 320)} alt={first ? item.nom : ''} loading="lazy" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {partenaires.note && <p className="ke-note">{partenaires.note}</p>}
          </section>
        )}

        {/* ================= INFOS PRATIQUES ================= */}
        {infos.length > 0 && (
          <section id="infos" className="ke-band ke-band--sand">
            <div className="ke-section ke-wrap">
              <Eyebrow num={nextNum()}>Informations pratiques</Eyebrow>
              <h2 className="ke-h2 ke-h2--block">Tout pour préparer votre venue.</h2>
              <div className="ke-info-grid">
                {infos.map((row, i) => (
                  <div className="ke-info" key={i}>
                    <div className="ke-info__label">{row.label}</div>
                    <p className="ke-info__value">
                      <Lines value={row.valeur} />
                    </p>
                    {/annulation|report|cgf/i.test(row.label || '') && (
                      <Link className="ke-info__link" to={CGF_PATH}>
                        Consulter les CGF
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              {evenement.infosPratiques?.note && <p className="ke-note">{evenement.infosPratiques.note}</p>}
            </div>
          </section>
        )}

        {/* ================= FAQ ================= */}
        {faq.length > 0 && (
          <section id="faq" className="ke-section ke-section--lg ke-wrap ke-faq">
            <div className="ke-faq__head">
              <Eyebrow num={nextNum()}>FAQ</Eyebrow>
              <h2 className="ke-h2">Foire aux questions</h2>
              <p className="ke-faq__hint">
                Une autre question ? <Link to="/contact">Écrivez-nous</Link>.
              </p>
            </div>
            <div className="ke-faq__list">
              {faq.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div className="ke-faq__item" key={i}>
                    <button
                      type="button"
                      className="ke-faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span>{item.question}</span>
                      <span className="ke-faq__icon" aria-hidden="true">
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <p className="ke-faq__a" id={`faq-${i}`}>
                        {item.reponse}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= CTA ================= */}
        <section id="inscription" className="ke-wrap ke-cta-section">
          <div className="ke-cta">
            <div className="ke-cta__body">
              <div className="ke-cta__kicker">Rejoignez l'édition 2026</div>
              <h2 className="ke-cta__title">{evenement.ctaFinal?.titre || 'Participation, Partenariat, Sponsoring.'}</h2>
              {evenement.ctaFinal?.texte && <p className="ke-cta__text">{evenement.ctaFinal.texte}</p>}
              <div className="ke-btn-row">
                <Cta {...signupCta} className="ke-btn ke-btn--navy ke-btn--lg" onDossier={openDossier} />
                <Cta {...dossierCta} className="ke-btn ke-btn--navy-outline ke-btn--lg" onDossier={openDossier} />
              </div>
            </div>
            <div className="ke-cta__media">
              <img src={ctaImage} alt="" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ================= AUTRES ÉVÉNEMENTS ================= */}
        {others.length > 0 && (
          <section className="ke-wrap ke-related">
            <Eyebrow>Autres événements</Eyebrow>
            <div className="ke-related__list">
              {others.map((other) => (
                <Link className="ke-related__item" to={`/event/${other.slug}`} key={other.id || other.slug}>
                  <span className="ke-related__title">{other.title}</span>
                  <span className="ke-related__date">{other.dateLine || other.location}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </motion.div>

      {/* ================= MODALE DOSSIER ================= */}
      <AnimatePresence>
        {dossierOpen && (
          <motion.div
            className="ke-event ke-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="ke-modal__backdrop" onClick={closeDossier} />
            <motion.div
              className="ke-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dossier-title"
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: 12 }}
            >
              <button type="button" className="ke-modal__close" onClick={closeDossier} aria-label="Fermer">
                <X size={20} />
              </button>
              {dossierSent ? (
                <>
                  <h2 className="ke-modal__title" id="dossier-title">
                    Merci
                  </h2>
                  <p className="ke-modal__text">
                    Votre demande a bien été transmise. Notre équipe vous répondra rapidement.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="ke-modal__title" id="dossier-title">
                    Demander le dossier
                  </h2>
                  <p className="ke-modal__text">Renseignez vos coordonnées pour recevoir le dossier de ce programme.</p>
                  <form onSubmit={submitDossierForm} className="ke-modal__form">
                    <label>
                      <span>Nom et prénom</span>
                      <input
                        className="ke-modal__field"
                        type="text"
                        required
                        autoComplete="name"
                        value={dossier.nom}
                        onChange={(e) => setDossier({ ...dossier, nom: e.target.value })}
                      />
                    </label>
                    <label>
                      <span>Structure</span>
                      <input
                        className="ke-modal__field"
                        type="text"
                        autoComplete="organization"
                        value={dossier.structure}
                        onChange={(e) => setDossier({ ...dossier, structure: e.target.value })}
                      />
                    </label>
                    <label>
                      <span>Adresse e-mail</span>
                      <input
                        className="ke-modal__field"
                        type="email"
                        required
                        autoComplete="email"
                        value={dossier.email}
                        onChange={(e) => setDossier({ ...dossier, email: e.target.value })}
                      />
                    </label>
                    <label>
                      <span>Message (facultatif)</span>
                      <textarea
                        className="ke-modal__field"
                        rows="3"
                        value={dossier.message}
                        onChange={(e) => setDossier({ ...dossier, message: e.target.value })}
                      />
                    </label>
                    <button className="ke-btn ke-btn--gold ke-btn--lg ke-modal__submit" type="submit" disabled={submitting}>
                      {submitting ? 'Envoi en cours…' : 'Envoyer la demande'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
