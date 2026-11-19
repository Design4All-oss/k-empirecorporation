import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, CheckCircle2, X } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { useEvenement, useEvenements } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';
import { submitDossier } from '../api/forms';
import { useToast } from '../context/ToastContext';
import { FACULTE_GEEE } from '../constants/faculte-geee';

// Verrou de forme : rounded-full = interactifs · rounded-2xl = conteneurs, cartes, images,
// modale · rounded-xl = champs de formulaire (modale uniquement).
const BTN_PRIMARY =
  'inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:bg-accent-dark active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';
const BTN_LIGHT_OUTLINE =
  'inline-flex items-center rounded-full border border-accent px-7 py-3.5 text-sm font-semibold text-accent transition-transform duration-150 ease-out hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';
// Visuel du bandeau CTA : la couverture Sanity peut manquer sur un evenement cree a la main
const COVER_FALLBACK = '/assets/images/services/hero.webp';
// CTA sur carte accent : navy pour rester lisible sur le doré
const BTN_ON_ACCENT =
  'inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:bg-primary-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
const BTN_ON_ACCENT_OUTLINE =
  'inline-flex items-center rounded-full border border-primary px-7 py-3.5 text-sm font-semibold text-primary transition-transform duration-150 ease-out hover:bg-primary hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

// Inscriptions : le client utilise un Tally dédié à cet événement.
const SIGNUP_URL = 'https://bit.ly/KEC_GEEE';
// shortcut: le dossier de présentation est encore chez Ivan, coller son URL ici dès réception.
const DOSSIER_URL = '';

// CARPEM est un sigle : le nom officiel l'accompagne, une seule fois.
const CARPEM = 'Centre Africain de Recherche sur les Politiques Énergétiques et Minières';
const sigle = (value = '') =>
  String(value).replace(/CARPEM/g, (m, offset, s) =>
    s[offset - 1] === '(' ? m : `${CARPEM} (CARPEM)`
  );
// Une information par ligne : les valeurs saisies séparent parfois les blocs par « · ».
const lines = (value = '') => sigle(value).replace(/\s+·\s+/g, '\n');
// Un tiret de liaison devient un deux-points, plus sobre.
const colon = (value = '') => String(value).replace(/\s+[-–]\s+/g, ' : ');
// Même règle, mais sur une seule ligne (titres).
const commas = (value = '') => String(value).replace(/\s*·\s*/g, ', ');
// Titres du programme : l'horaire était saisi dans le titre.
const TIME_SLOT = /^(\d{2}h\d{2})\s*[-–]\s*(\d{2}h\d{2})\s*·\s*(.+)$/;
const WORD_SLOT = /^(Matinée|Déjeuner|Après-midi|Fin de journée)\s+-\s+(.+)$/;
const programRow = (item) => {
  if (item.heure) return item;
  const time = TIME_SLOT.exec(item.titre || '');
  if (time) return { ...item, heure: `${time[1]} – ${time[2]}`, titre: colon(time[3]) };
  const word = WORD_SLOT.exec(item.titre || '');
  return word ? { ...item, heure: word[1], titre: colon(word[2]) } : item;
};
// Faculty : « Nom - Fonction » sur une seule ligne à l'origine.
const splitName = (entry) => {
  if (typeof entry === 'object') return entry;
  const [nom, ...rest] = String(entry).split(/\s+-\s+/);
  return { nom, fonction: rest.join(' : ') };
};

const Lines = ({ value, className = '' }) => (
  <span className={`whitespace-pre-line ${className}`}>{lines(value)}</span>
);

// CTA : URL Sanity si renseignée, sinon dossier → mini-formulaire, sinon inscription Tally.
const Cta = ({ cta, className, onDossier }) => {
  const label = cta.label || '';
  if (cta.url) {
    return (
      <a href={cta.url} className={className}>
        {label}
      </a>
    );
  }
  if (/dossier/i.test(label)) {
    return (
      <button type="button" onClick={onDossier} className={className}>
        {label}
      </button>
    );
  }
  return (
    <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
};

// Section : conteneur géré en interne pour que des blocs puissent sortir en pleine largeur.
const Section = ({ id, title, children }) => {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="scroll-mt-36 py-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 max-w-4xl font-display text-2xl font-semibold leading-[1.1] tracking-tight text-primary md:mb-12 md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  );
};

// Grille de définitions : deux colonnes, sans filet par ligne
const RowsTable = ({ rows }) => (
  <dl className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
    {rows.map((row, i) => (
      <div key={i} className="border-t border-gray-100 pt-5">
        <dt className="text-xs font-semibold text-text-muted">{row.label}</dt>
        <dd className="mt-2 font-display text-lg leading-snug text-primary md:text-xl">
          <Lines value={row.valeur} />
        </dd>
      </div>
    ))}
  </dl>
);

// Bios du DOCX : aucun normaliseur (sigle/lines/colon) ne doit les transformer.
const FacultyDocx = () => (
  <div className="border-t border-gray-100">
    {FACULTE_GEEE.map((groupe) => (
      <div key={groupe.groupe}>
        <h3 className="mb-4 mt-8 font-display text-sm font-semibold uppercase tracking-wide text-accent">
          {groupe.groupe}
        </h3>
        <ul>
          {groupe.intervenants.map(({ nom, bio }) => (
            <li key={nom} className="border-b border-gray-100 py-4 md:py-5">
              <span className="font-display text-base text-primary md:text-xl">{nom}</span>
              <p className="mt-2 max-w-[70ch] whitespace-pre-line text-sm leading-relaxed text-text-muted">
                {bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const EvenementSingle = () => {
  const { slug } = useParams();
  const isGeee = slug === 'gouvernance-entites-extractives-energetiques';
  const { data: evenement, isLoading, error } = useEvenement(slug);
  const { data: allEvenements } = useEvenements();

  const relatedEvenements = allEvenements 
    ? allEvenements.filter(e => e.slug !== slug).slice(0, 3)
    : [];

  const [dossierOpen, setDossierOpen] = useState(false);
  const [dossierSent, setDossierSent] = useState(false);
  const [dossier, setDossier] = useState({ email: '', fonction: '', entreprise: '' });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleDossier = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitDossier({ ...dossier, evenement_slug: slug });
      setDossierSent(true);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const closeDossier = () => {
    setDossierOpen(false);
    setDossierSent(false);
    setDossier({ email: '', fonction: '', entreprise: '' });
  };

  const {
    subtitle = '',
    tagline = '',
    dateLine = '',
    heroIntro = '',
    ctas = [],
    regard = [],
    stats = null,
    pourquoi = null,
    gouvernance = null,
    faculty = null,
    parcours = null,
    pedagogie = null,
    participer = [],
    experience = null,
    livrables = null,
    partenaires = null,
    infosPratiques = null,
    faq = [],
    ctaFinal = null,
  } = evenement || {};

  const reduce = useReducedMotion();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner text="Chargement de l'événement..." />
      </div>
    );
  }

  if (error || !evenement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Événement non trouvé</h2>
          <Link to="/blog" className="text-accent hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <SEO
        title={evenement.title}
        description={evenement.excerpt || `Événement ${evenement.title} - K-EMPIRE Corporation`}
        url={`/event/${slug}`}
        image={evenement.image}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Event",
          "name": evenement.title,
          "description": evenement.excerpt,
          "url": `https://www.k-empirecorporation.com/event/${slug}`,
          "location": {
            "@type": "Place",
            "name": evenement.location
          },
          "organizer": {
            "@type": "Organization",
            "name": "K-EMPIRE Corporation"
          }
        }}
      />

      {/* ═══ Hero — image + dégradé navy, titre en carte blanche (motif FormationSingle / BlogSingle) ═══ */}
      <div className="relative h-[400px] overflow-hidden bg-primary md:h-[500px]">
        {evenement.image && (
          <img
            src={evenement.image}
            alt={evenement.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white p-8 shadow-lg md:p-12"
        >
          {subtitle && (
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 font-display text-sm font-semibold text-accent">
              {subtitle}
            </span>
          )}

          <h1 className="text-h2-m font-bold leading-tight text-primary md:text-h2-d">
            {evenement.title}
          </h1>

          {dateLine && (
            <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-accent md:text-base">
              <Calendar size={16} className="mt-0.5 shrink-0" />
              <Lines value={dateLine} />
            </p>
          )}

          {tagline && (
            <p className="mt-4 max-w-[65ch] leading-relaxed text-text-muted">
              {tagline}
            </p>
          )}

          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta, i) => (
                <Cta
                  key={i}
                  cta={cta}
                  className={i === 0 ? BTN_PRIMARY : BTN_LIGHT_OUTLINE}
                  onDossier={() => setDossierOpen(true)}
                />
              ))}
            </div>
          )}

          {regard.length > 0 && (
            <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {regard.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs font-semibold text-text-muted">{row.label}</dt>
                  <dd className="mt-1 font-display text-base text-primary">
                    <Lines value={row.valeur} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </motion.div>
      </div>

      {/* ═══ Sous-menu collant ═══ */}
      <nav className="sticky top-16 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
          {[
            { href: '#chiffres', label: 'Chiffres' },
            { href: '#programme', label: 'Programme' },
            { href: '#faculty', label: 'Faculty' },
            { href: '#infos', label: 'Infos pratiques' },
            { href: '#faq', label: 'FAQ' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-bg-alt hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Candidater
          </a>
        </div>
      </nav>

      {/* ═══ Chapeau ═══ */}
      {heroIntro && (
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 md:pt-20 lg:px-8">
          <p className="max-w-[65ch] text-base leading-relaxed text-text-muted md:text-lg">
            {heroIntro}
          </p>
        </div>
      )}

      <main>
        {/* ═══ 01 · Chiffres ═══ */}
        {stats && stats.items && stats.items.length > 0 && (
          <Section id="chiffres" title="L’événement en chiffres">
            <div className="grid grid-cols-2 border-t border-gray-100 md:grid-cols-4">
              {stats.items.map((s, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 py-8 pr-6 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <p className="font-display text-4xl font-medium leading-none tracking-tight text-primary md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 max-w-[18ch] text-sm leading-snug text-text-muted">{colon(s.label)}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ 02 · Pourquoi ce programme ? ═══ */}
        {pourquoi && pourquoi.items && pourquoi.items.length > 0 && (
          <Section title="Pourquoi ce programme ?">
            {pourquoi.intro && (
              <p className="mb-10 max-w-[50ch] font-display text-xl font-medium text-primary md:mb-14 md:text-2xl">
                {pourquoi.intro}
              </p>
            )}
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {pourquoi.items.map((item, i) => (
                <div key={i}>
                  <h3 className="font-display text-lg font-bold text-primary md:text-xl">
                    {item.titre}
                  </h3>
                  <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-text-muted">
                    {item.texte}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ Gouvernance scientifique ═══ */}
        {gouvernance && gouvernance.items && gouvernance.items.length > 0 && (
          <Section title="Gouvernance scientifique">
            {gouvernance.intro && (
              <p className="mb-10 max-w-[65ch] text-text-muted md:mb-14">{gouvernance.intro}</p>
            )}
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              {gouvernance.items.map((item, i) => (
                <div key={i}>
                  <p>
                    <span className="block whitespace-pre-line font-display text-lg font-bold text-primary md:text-xl">
                      {colon(item.titre)}
                    </span>
                    {item.fonction && (
                      <span className="mt-1.5 block text-sm italic text-accent">{sigle(item.fonction)}</span>
                    )}
                  </p>
                  <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-text-muted">
                    {item.texte}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ The Faculty ═══ */}
        {faculty && faculty.noms && faculty.noms.length > 0 && (
          <Section id="faculty" title="The Faculty">
            {faculty.intro && (
              <p className="mb-4 max-w-[50ch] font-display text-xl font-medium text-primary md:text-2xl">
                {faculty.intro}
              </p>
            )}
            {faculty.texte && (
              <p className="mb-10 max-w-[65ch] text-text-muted">{faculty.texte}</p>
            )}
            {isGeee ? (
              <FacultyDocx />
            ) : (
              <ul className="border-t border-gray-100">
                {faculty.noms.map((entry, i) => {
                  const { nom, fonction } = splitName(entry);
                  return (
                    <li
                      key={i}
                      className="group border-b border-gray-100 py-4 md:py-5"
                    >
                      <span className="font-display text-base text-primary transition-colors group-hover:text-accent md:text-xl">
                        {nom}
                      </span>
                      {fonction && (
                        <span className="mt-1 block text-sm text-text-muted">{sigle(fonction)}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            {faculty.ctaLabel && (
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN_LIGHT_OUTLINE} mt-8`}
              >
                {faculty.ctaLabel}
              </a>
            )}
          </Section>
        )}

        {/* ═══ Le programme — jour collant ═══ */}
        {parcours && parcours.jours && parcours.jours.length > 0 && (
          <Section id="programme" title="Le programme">
            {parcours.intro && (
              <p className="mb-6 max-w-[50ch] font-display text-xl font-medium text-primary md:mb-8 md:text-2xl">
                {parcours.intro}
              </p>
            )}

            <div className="mt-12 space-y-14 md:mt-16 md:space-y-24">
              {parcours.jours.map((jour, i) => (
                <div key={i} className="md:grid md:grid-cols-[15rem_1fr] md:gap-12">
                  <div className="mb-6 md:sticky md:top-40 md:mb-0 md:self-start">
                    <p className="font-display text-xl font-bold leading-tight text-primary md:text-2xl">
                      {jour.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                      {jour.lieu}
                    </p>
                    {jour.date && (
                      <p className="mt-1 text-sm text-text-muted">{jour.date}</p>
                    )}
                  </div>

                  <div className="md:pt-1">
                    {jour.intro && (
                      <p className="mb-6 max-w-[65ch] leading-relaxed text-text-muted">
                        {jour.intro}
                      </p>
                    )}

                    {jour.items && jour.items.length > 0 && (
                      <div className="space-y-6">
                        {jour.items.map((item, j) => {
                          const row = programRow(item);
                          return (
                            <div key={j} className="flex gap-5 md:gap-8">
                              {row.heure && (
                                <span className="w-28 shrink-0 font-display text-xs font-semibold text-accent md:w-32 md:text-sm">
                                  {row.heure}
                                </span>
                              )}
                              <div>
                                <h4 className="font-display text-base font-bold text-primary md:text-lg">
                                  {row.titre}
                                </h4>
                                {row.texte && (
                                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-text-muted">
                                    {row.texte}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {jour.points && jour.points.length > 0 && (
                      <ul className="space-y-3 pt-6">
                        {jour.points.map((point, j) => (
                          <li key={j} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {jour.pied && (
                      <p className="mt-6 text-sm italic text-text-muted">{jour.pied}</p>
                    )}

                    {jour.closing && (
                      <div className="mt-6 bg-primary px-6 py-5 md:px-8 md:py-6">
                        <p className="whitespace-pre-line font-display text-sm font-bold uppercase tracking-[0.14em] text-accent">
                          {lines(jour.closing)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ Pédagogie ═══ */}
        {pedagogie && pedagogie.items && pedagogie.items.length > 0 && (
          <Section title="Une pédagogie orientée décision">
            <ul className="space-y-5">
              {pedagogie.items.map((item, i) => (
                <li key={i} className="max-w-[75ch] font-display text-base leading-snug text-primary md:text-lg">
                  {colon(item)}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ═══ Qui participe ? ═══ */}
        {participer.length > 0 && (
          <Section title="Qui participe ?">
            <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
              {participer.map((item, i) => (
                <div key={i}>
                  <h3 className="font-display font-bold text-primary md:text-lg">{item.titre}</h3>
                  <p className="mt-3 max-w-[45ch] text-sm leading-relaxed text-text-muted">
                    {item.texte}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ L’expérience K-EMPIRE ═══ */}
        {experience && experience.items && experience.items.length > 0 && (
          <Section title="L’expérience K-EMPIRE">
            {experience.intro && (
              <p className="mb-10 max-w-[50ch] font-display text-xl font-medium text-primary md:mb-14 md:text-2xl">
                {experience.intro}
              </p>
            )}
            <div className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-12">
              {experience.items.map((item, i) => (
                <div key={i}>
                  <h3 className="font-display text-sm font-semibold text-primary md:text-base">
                    {colon(item.titre)}
                  </h3>
                  <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-text-muted">
                    {item.texte}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ Livrables & bénéfices ═══ */}
        {livrables && livrables.items && livrables.items.length > 0 && (
          <Section title="Livrables & bénéfices">
            {livrables.intro && (
              <p className="mb-8 max-w-[65ch] text-text-muted">{livrables.intro}</p>
            )}
            <ul className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-12">
              {livrables.items.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span className="max-w-[45ch] text-sm leading-relaxed text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ═══ Partenaires & institutions ═══ */}
        {partenaires && partenaires.items && partenaires.items.length > 0 && (
          <Section title="Partenaires & institutions">
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {partenaires.items.map((item, i) => (
                <div key={i} className="py-8 md:grid md:grid-cols-[14rem_1fr] md:gap-10">
                  <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent md:mb-0">
                    {item.categorie}
                  </p>
                  <div>
                    <p className="font-display text-lg font-bold text-primary md:text-xl">
                      {item.titre}
                    </p>
                    {item.texte && (
                      <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-text-muted">
                        {item.texte}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ Informations pratiques ═══ */}
        {infosPratiques && infosPratiques.rows && infosPratiques.rows.length > 0 && (
          <Section id="infos" title="Informations pratiques">
            <RowsTable rows={infosPratiques.rows} />
          </Section>
        )}

        {/* ═══ Foire aux questions ═══ */}
        {faq.length > 0 && (
          <Section id="faq" title="Foire aux questions">
            <div className="border-t border-gray-100">
              {faq.map((item, i) => (
                <details key={i} className="group border-b border-gray-100">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-base font-medium leading-snug text-primary transition-colors hover:text-accent md:py-6 md:text-xl [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="mt-1 flex-shrink-0 text-lg leading-none text-accent transition-transform duration-200 ease-out group-open:rotate-45 md:text-xl">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[70ch] pb-7 text-sm leading-relaxed text-text-muted md:pb-9 md:text-base">
                    {item.reponse}
                  </p>
                </details>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ Événements à venir ═══ */}
        {relatedEvenements.length > 0 && (
          <Section title="Restez informé">
            <ol className="border-t border-gray-100">
              {relatedEvenements.map((event) => (
                <li key={event.id} className="border-b border-gray-100">
                  <Link
                    to={`/event/${event.slug}`}
                    className="group flex items-center gap-5 py-5"
                  >
                    {event.image && (
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden md:h-20 md:w-20">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-sm font-bold leading-snug text-primary transition-colors group-hover:text-accent md:text-base">
                        {event.title}
                      </h4>
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-text-muted">
                        <Calendar size={12} />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </main>

      {/* ═══ Candidature — carte accent en dégradé, image révélée à droite ═══ */}
      {(ctaFinal || ctas.length > 0) && (
        <section id="candidature" className="scroll-mt-36 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-accent">
              <img
                src={evenement.image || COVER_FALLBACK}
                alt=""
                aria-hidden="true"
                className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-3/5"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light via-accent to-accent/90 md:to-transparent" />
              <div className="relative z-10 max-w-xl p-8 md:p-14">
                <span className="mb-6 block h-1 w-12 bg-primary" />
                <h2 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-primary md:text-4xl lg:text-5xl">
                  {commas(ctaFinal?.titre || 'Prendre part à l’expérience')}
                </h2>
                {ctaFinal?.texte && (
                  <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-primary md:text-base">
                    {ctaFinal.texte}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  {ctas.map((cta, i) => (
                    <Cta
                      key={i}
                      cta={cta}
                      className={i === 0 ? BTN_ON_ACCENT : BTN_ON_ACCENT_OUTLINE}
                      onDossier={() => setDossierOpen(true)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dossier de présentation — capture avant téléchargement */}
      <AnimatePresence>
        {dossierOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={closeDossier}
            />
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={closeDossier}
                aria-label="Fermer"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <X size={20} />
              </button>

              {dossierSent ? (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-primary">Merci</h2>
                  {DOSSIER_URL ? (
                    <>
                      <p className="mt-3 text-sm text-text-muted">
                        Le dossier de présentation est prêt.
                      </p>
                      <a href={DOSSIER_URL} download className={`${BTN_PRIMARY} mt-6`}>
                        Télécharger le dossier
                      </a>
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-text-muted">
                      Le dossier de présentation vous sera adressé par e-mail.
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleDossier}>
                  <h2 className="font-display text-2xl font-semibold text-primary">Demander le dossier</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    Le dossier de présentation détaille le programme, la faculty et les modalités de participation.
                  </p>

                  <label className="mt-6 block text-sm font-medium text-primary">
                    Adresse e-mail *
                    <input
                      type="email"
                      required
                      value={dossier.email}
                      onChange={(e) => setDossier({ ...dossier, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal text-text focus:border-accent focus:outline-none"
                      placeholder="vous@organisation.com"
                    />
                  </label>
                  <label className="mt-4 block text-sm font-medium text-primary">
                    Fonction
                    <input
                      type="text"
                      value={dossier.fonction}
                      onChange={(e) => setDossier({ ...dossier, fonction: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal text-text focus:border-accent focus:outline-none"
                      placeholder="Directeur, chargé de mission..."
                    />
                  </label>
                  <label className="mt-4 block text-sm font-medium text-primary">
                    Entreprise de provenance
                    <input
                      type="text"
                      value={dossier.entreprise}
                      onChange={(e) => setDossier({ ...dossier, entreprise: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 font-normal text-text focus:border-accent focus:outline-none"
                      placeholder="Organisation, ministère, société"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${BTN_PRIMARY} mt-6 w-full justify-center disabled:opacity-60`}
                  >
                    {submitting ? 'Envoi...' : 'Recevoir le dossier'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvenementSingle;