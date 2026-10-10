import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle, CheckCircle2, X } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { useEvenement, useEvenements } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';
import Button from '../components/ui/Button';
import { submitNewsletter, submitEvenementInscription } from '../api/forms';
import { useToast } from '../context/ToastContext';

// Verrou de forme : rounded-full = interactifs · rounded-2xl = conteneurs, cartes, images,
// modale · rounded-xl = champs de formulaire (modale uniquement).
const BTN_PRIMARY =
  'inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:bg-accent-dark active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';
const BTN_HERO_SECONDARY =
  'inline-flex items-center rounded-full border border-white/45 px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:border-white hover:bg-white/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary';
const BTN_LIGHT_OUTLINE =
  'inline-flex items-center rounded-full border border-accent px-7 py-3.5 text-sm font-semibold text-accent transition-transform duration-150 ease-out hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

// Section : conteneur géré en interne pour que des blocs puissent sortir en pleine largeur.
// Rubriques numérotées : le numéro remplace l'eyebrow (pas de majuscules traquées au-dessus du titre).
const Section = ({ id, num, title, children }) => {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="scroll-mt-36 border-t border-gray-100 py-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {num && (
          <div className="mb-5 flex items-center gap-4">
            <span className="font-display text-xs font-semibold text-accent">{num}</span>
            <span className="h-px flex-1 bg-accent/30" />
          </div>
        )}
        <h2 className="mb-8 max-w-4xl font-display text-2xl font-semibold leading-[1.1] tracking-tight text-primary md:mb-12 md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  );
};

// Bandeau pleine largeur (fond navy) — utilisé une seule fois : l'appel à l'action final
const Bleed = ({ children }) => <div className="bg-primary">{children}</div>;

// Grille de définitions : deux colonnes, sans filet par ligne
const RowsTable = ({ rows }) => (
  <dl className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
    {rows.map((row, i) => (
      <div key={i} className="border-t border-gray-100 pt-5">
        <dt className="text-xs font-semibold text-text-muted">{row.label}</dt>
        <dd className="mt-2 font-display text-lg leading-snug text-primary md:text-xl">{row.valeur}</dd>
      </div>
    ))}
  </dl>
);

const EvenementSingle = () => {
  const { slug } = useParams();
  const { data: evenement, isLoading, error } = useEvenement(slug);
  const { data: allEvenements } = useEvenements();

  const relatedEvenements = allEvenements 
    ? allEvenements.filter(e => e.slug !== slug).slice(0, 3)
    : [];

  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    fonction: '',
    pays: '',
    inscriptionType: '',
    denomination: '',
    rccm: '',
    nif: '',
    siegeSocial: '',
    responsableNom: '',
    acceptContact: false
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitEvenementInscription({
        nom: formData.name,
        email: formData.email,
        telephone: formData.phone,
        evenement_slug: slug,
        evenement_id: evenement?.id?.toString() || '',
        fonction: formData.fonction,
        entreprise: formData.organisation,
        type: formData.inscriptionType,
        denomination: formData.denomination,
        rccm: formData.rccm,
        nif: formData.nif,
        siegeSocial: formData.siegeSocial,
        responsableNom: formData.responsableNom,
      });
      toast('Inscription envoyée ! Un conseiller vous contactera sous 24h.');
      setShowModal(false);
      setCurrentStep(0);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        organisation: '',
        fonction: '',
        pays: '',
        inscriptionType: '',
        denomination: '',
        rccm: '',
        nif: '',
        siegeSocial: '',
        responsableNom: '',
        acceptContact: false
      });
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSidebar = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) {
      if (!newsletterConsent) toast("Vous devez accepter la politique de confidentialité.", 'error');
      return;
    }
    setNewsletterLoading(true);
    try {
      const res = await submitNewsletter({ email: newsletterEmail, nom: '', source: 'event-sidebar', consentement: true });
      toast(res.message || 'Inscription à la newsletter réussie !');
      setNewsletterEmail('');
      setNewsletterConsent(false);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setNewsletterLoading(false);
    }
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

      {/* ═══ NEW HERO DESIGN ═══ */}
      <section className="relative isolate overflow-hidden bg-[#b9e0f8] pt-28 text-center text-[#0f2136] md:pt-36 lg:pt-40">
        {evenement.image && (
          <div className="absolute inset-x-0 bottom-0 z-0 h-[400px] md:h-[600px] w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
            <img
              src={evenement.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-bottom opacity-40 mix-blend-multiply"
            />
          </div>
        )}
        
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          {subtitle && (
            <p className="mb-4 font-display text-lg md:text-xl font-bold tracking-widest text-[#0066cc] uppercase">
              {subtitle}
            </p>
          )}

          <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-[6rem]" style={{ WebkitTextStroke: '2px #0f2136' }}>
            {evenement.title}
          </h1>

          {dateLine && (
            <p className="mt-8 font-display text-lg md:text-2xl font-black tracking-widest text-[#0f2136] uppercase">
              {dateLine}
            </p>
          )}

          {tagline && (
            <p className="mt-4 max-w-[65ch] text-base font-medium leading-relaxed text-[#0f2136]/80 md:text-lg">
              {tagline}
            </p>
          )}

          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {ctas.map((cta, i) => {
                const cls = i === 0 
                  ? 'inline-flex items-center rounded-full bg-black px-10 py-4 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-black/90 uppercase tracking-widest shadow-xl' 
                  : 'inline-flex items-center rounded-full bg-white/50 backdrop-blur-sm border-2 border-black px-10 py-4 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-white/80 uppercase tracking-widest';
                return cta.url ? (
                  <a key={i} href={cta.url} className={cls}>
                    {cta.label}
                  </a>
                ) : (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setShowModal(true)}
                    className={cls}
                  >
                    {cta.label}
                  </button>
                );
              })}
            </div>
          )}

          {stats && stats.items && stats.items.length > 0 && (
            <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-20">
              {stats.items.slice(0,4).map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#0f2136]">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm md:text-base font-bold uppercase tracking-widest text-[#0f2136]/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {regard.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:flex lg:justify-center lg:gap-12 border-t border-black/10 pt-10">
              {regard.map((row) => (
                <div key={row.label} className="text-center">
                  <dt className="text-xs font-bold uppercase tracking-widest text-[#0066cc]">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-[#0f2136]">{row.valeur}</dd>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

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
            href="#candidature"
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
          <Section id="chiffres" num="01" title="L’événement en chiffres">
            <div className="grid grid-cols-2 border-t border-gray-100 md:grid-cols-4">
              {stats.items.map((s, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 py-8 pr-6 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <p className="font-display text-4xl font-medium leading-none tracking-tight text-primary md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 max-w-[18ch] text-sm leading-snug text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ 02 · Pourquoi ce programme ? ═══ */}
        {pourquoi && pourquoi.items && pourquoi.items.length > 0 && (
          <Section num="02" title="Pourquoi ce programme ?">
            {pourquoi.intro && (
              <p className="mb-10 max-w-[50ch] font-display text-xl font-medium text-primary md:mb-14 md:text-2xl">
                {pourquoi.intro}
              </p>
            )}
            <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
              {pourquoi.items.map((item, i) => (
                <div key={i}>
                  <span className="font-display text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-primary md:text-xl">
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
          <Section num="03" title="Gouvernance scientifique">
            {gouvernance.intro && (
              <p className="mb-10 max-w-[65ch] text-text-muted md:mb-14">{gouvernance.intro}</p>
            )}
            <div className="grid border-t border-gray-100 md:grid-cols-2 md:gap-0 md:divide-x md:divide-gray-100">
              {gouvernance.items.map((item, i) => (
                <div key={i} className={i === 0 ? 'md:pr-12' : 'md:pl-12'}>
                  <p className="pt-8 md:pt-10">
                    <span className="font-display text-lg font-bold text-primary md:text-xl">
                      {item.titre}
                    </span>
                    {item.fonction && (
                      <span className="mt-1.5 block text-sm italic text-accent">{item.fonction}</span>
                    )}
                  </p>
                  <p className="mt-4 max-w-[60ch] pb-8 text-sm leading-relaxed text-text-muted md:pb-10">
                    {item.texte}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ The Faculty ═══ */}
        {faculty && faculty.noms && faculty.noms.length > 0 && (
          <Section id="faculty" num="04" title="The Faculty">
            {faculty.intro && (
              <p className="mb-4 max-w-[50ch] font-display text-xl font-medium text-primary md:text-2xl">
                {faculty.intro}
              </p>
            )}
            {faculty.texte && (
              <p className="mb-10 max-w-[65ch] text-text-muted">{faculty.texte}</p>
            )}
            <ol className="border-t border-gray-100">
              {faculty.noms.map((nom, i) => (
                <li
                  key={i}
                  className="group flex items-baseline gap-5 border-b border-gray-100 py-4 md:gap-8 md:py-5"
                >
                  <span className="w-6 shrink-0 font-display text-xs text-text-muted md:w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-base text-primary transition-colors group-hover:text-accent md:text-xl">
                    {nom}
                  </span>
                </li>
              ))}
            </ol>
            {faculty.ctaLabel && (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className={`${BTN_LIGHT_OUTLINE} mt-8`}
              >
                {faculty.ctaLabel}
              </button>
            )}
          </Section>
        )}

        {/* ═══ Le programme — jour collant ═══ */}
        {parcours && parcours.jours && parcours.jours.length > 0 && (
          <Section id="programme" num="05" title="Le programme">
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
                      <div className="divide-y divide-gray-100 border-y border-gray-100">
                        {jour.items.map((item, j) => (
                          <div key={j} className="py-6">
                            <h4 className="font-display text-base font-bold text-primary md:text-lg">
                              {item.titre}
                            </h4>
                            {item.texte && (
                              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-text-muted">
                                {item.texte}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {jour.points && jour.points.length > 0 && (
                      <ul className="space-y-3 border-t border-gray-100 pt-6">
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
                        <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent">
                          {jour.closing}
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
          <Section num="06" title="Une pédagogie orientée décision">
            <div className="divide-y divide-gray-100 border-y border-gray-100">
              {pedagogie.items.map((item, i) => (
                <div key={i} className="flex items-baseline gap-5 py-6 md:gap-8">
                  <span className="font-display text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-display text-base text-primary md:text-lg">{item}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ Qui participe ? ═══ */}
        {participer.length > 0 && (
          <Section num="07" title="Qui participe ?">
            <div className="grid border-t border-gray-100 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
              {participer.map((item, i) => (
                <div key={i} className="border-b border-gray-100 pb-8 pt-8 md:border-b-0 md:pt-0">
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
          <Section num="08" title="L’expérience K-EMPIRE">
            {experience.intro && (
              <p className="mb-10 max-w-[50ch] font-display text-xl font-medium text-primary md:mb-14 md:text-2xl">
                {experience.intro}
              </p>
            )}
            <div className="grid border-b border-gray-100 sm:grid-cols-2 sm:gap-x-12">
              {experience.items.map((item, i) => (
                <div
                  key={i}
                  className={`border-t border-gray-100 py-6 sm:py-7 ${
                    i % 2 === 0 ? 'sm:border-r sm:border-gray-100 sm:pr-8' : 'sm:pl-8'
                  }`}
                >
                  <h3 className="font-display text-sm font-semibold text-primary md:text-base">
                    {item.titre}
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
          <Section num="09" title="Livrables & bénéfices">
            {livrables.intro && (
              <p className="mb-8 max-w-[65ch] text-text-muted">{livrables.intro}</p>
            )}
            <ul className="grid gap-y-4 border-t border-gray-100 pt-8 sm:grid-cols-2 sm:gap-x-12">
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
          <Section num="10" title="Partenaires & institutions">
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
          <Section id="infos" num="11" title="Informations pratiques">
            <RowsTable rows={infosPratiques.rows} />
          </Section>
        )}

        {/* ═══ Foire aux questions ═══ */}
        {faq.length > 0 && (
          <Section id="faq" num="12" title="Foire aux questions">
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

        {/* ═══ Événements à venir + newsletter ═══ */}
        <Section title="Restez informé">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            {relatedEvenements.length > 0 && (
              <div>
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
              </div>
            )}

            <div className="bg-primary p-7 text-white sm:p-9">
              <h3 className="font-display text-xl font-bold">Newsletter</h3>
              <p className="mt-2 text-sm text-white/70">Recevez nos dernières invitations</p>
              <form onSubmit={handleNewsletterSidebar} className="mt-6 flex flex-col gap-3">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading || !newsletterConsent}
                    aria-label="S'inscrire à la newsletter"
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-light disabled:opacity-50"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-white/40 bg-white/10 accent-accent"
                  />
                  <span className="text-[11px] leading-tight text-white/60">
                    J&apos;accepte la{' '}
                    <a
                      href="/mentions-legales"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      politique de confidentialité
                    </a>{' '}
                    et consens à recevoir des communications.
                  </span>
                </label>
              </form>
            </div>
          </div>
        </Section>
      </main>

      {/* ═══ Candidature — unique bandeau saturé de la page ═══ */}
      {(ctaFinal || ctas.length > 0) && (
        <Bleed>
          <section id="candidature" className="scroll-mt-36 text-white">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
              <div className="max-w-3xl">
                <span className="mb-6 block h-1 w-12 bg-accent" />
                <h2 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                  {ctaFinal?.titre || 'Prendre part à l’expérience'}
                </h2>
                {ctaFinal?.texte && (
                  <p className="mt-5 max-w-[58ch] text-sm leading-relaxed text-white/70 md:text-base">
                    {ctaFinal.texte}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  {ctas.map((cta, i) => {
                    const cls = i === 0 ? BTN_PRIMARY : BTN_HERO_SECONDARY;
                    return cta.url ? (
                      <a key={i} href={cta.url} className={cls}>
                        {cta.label}
                      </a>
                    ) : (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setShowModal(true)}
                        className={cls}
                      >
                        {cta.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </Bleed>
      )}

      <div className="h-16" />

      {/* Registration Modal */}
      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => { setShowModal(false); setCurrentStep(0); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => { setShowModal(false); setCurrentStep(0); }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="p-8">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                  {[0, 1, 2].map((step) => (
                    <div key={step} className="flex-1 h-1 rounded-full bg-gray-200">
                      <div 
                        className={`h-full rounded-full transition-[width] duration-300 ${step <= currentStep ? 'bg-accent' : ''}`}
                        style={{ width: step <= currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Step 0: Welcome */}
                {currentStep === 0 && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar size={32} className="text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Participez à cet événement</h2>
                    <p className="text-text-muted mb-6">
                      Rejoignez les professionnels et experts pour cette événement unique. 
                      Votre inscription vous rapproche de l'excellence.
                    </p>
                    <div className="bg-bg-alt p-4 rounded-2xl mb-6 text-left">
                      <h3 className="font-semibold text-primary mb-2">Cet événement vous offre :</h3>
                      <ul className="space-y-2 text-sm text-text-muted">
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          Des connaissances pratiques et actionable
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          Un networking avec des professionnels qualifiés
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          Une attestation de participation
                        </li>
                      </ul>
                    </div>
                    <Button onClick={nextStep}>
                      Réserver ma place
                    </Button>
                  </div>
                )}

                {/* Step 1: Informations */}
                {currentStep === 1 && (
                  <form onSubmit={handleSubmit}>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">Vos informations</h2>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-primary">Type d'inscription</p>
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="inscriptionType" 
                          value="individuelle"
                          checked={formData.inscriptionType === 'individuelle'}
                          onChange={(e) => setFormData({...formData, inscriptionType: e.target.value})}
                          className="w-5 h-5 text-accent accent-accent"
                        />
                        <span className="text-primary font-medium">Individuelle</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="inscriptionType" 
                          value="institutionnelle"
                          checked={formData.inscriptionType === 'institutionnelle'}
                          onChange={(e) => setFormData({...formData, inscriptionType: e.target.value})}
                          className="w-5 h-5 text-accent accent-accent"
                        />
                        <span className="text-primary font-medium">Institutionnelle (Entreprise / Organisation)</span>
                      </label>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Nom & Prénom *</label>
                        <input 
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Adresse e-mail professionnelle *</label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                          placeholder="vous@entreprise.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Numéro WhatsApp / Téléphone *</label>
                        <input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                          placeholder="+228 90 10 80 75"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Organisation / Entreprise</label>
                        <input 
                          type="text"
                          value={formData.organisation}
                          onChange={(e) => setFormData({...formData, organisation: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                          placeholder="Nom de votre structure"
                        />
                      </div>

                      {formData.inscriptionType === 'institutionnelle' && (
                        <div className="border-t border-gray-100 pt-4 space-y-4">
                          <p className="text-sm font-semibold text-primary">Informations de l'institution</p>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1">Dénomination *</label>
                            <input 
                              type="text"
                              required
                              value={formData.denomination}
                              onChange={(e) => setFormData({...formData, denomination: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                              placeholder="Nom officiel de l'institution"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1">RCCM *</label>
                            <input 
                              type="text"
                              required
                              value={formData.rccm}
                              onChange={(e) => setFormData({...formData, rccm: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                              placeholder="N° RCCM"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1">NIF *</label>
                            <input 
                              type="text"
                              required
                              value={formData.nif}
                              onChange={(e) => setFormData({...formData, nif: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                              placeholder="N° NIF"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1">Siège social *</label>
                            <input 
                              type="text"
                              required
                              value={formData.siegeSocial}
                              onChange={(e) => setFormData({...formData, siegeSocial: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                              placeholder="Adresse du siège social"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-primary mb-1">Nom du responsable de l'inscription *</label>
                            <input 
                              type="text"
                              required
                              value={formData.responsableNom}
                              onChange={(e) => setFormData({...formData, responsableNom: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                              placeholder="Nom du responsable"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Fonction / Profession</label>
                        <input 
                          type="text"
                          value={formData.fonction}
                          onChange={(e) => setFormData({...formData, fonction: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                          placeholder="Votre fonction"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">Pays *</label>
                        <input 
                          type="text"
                          required
                          value={formData.pays}
                          onChange={(e) => setFormData({...formData, pays: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent"
                          placeholder="Votre pays"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={prevStep}>
                        Retour
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={!formData.inscriptionType || !formData.name || !formData.email || !formData.phone || !formData.pays}
                      >
                        Suivant
                      </Button>
                    </div>
                  </form>
                )}

                {/* Step 2: Confirmation */}
                {currentStep === 2 && (
                  <form onSubmit={handleSubmit}>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">Finalisation</h2>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-2xl mb-6">
                      <p className="text-sm text-text-muted mb-2">
                        <span className="font-semibold text-primary">“Un conseiller vous contactera sous 24h pour finaliser votre inscription.”</span>
                      </p>
                      <p className="text-sm text-text-muted">
                        <span className="font-semibold text-primary">“Places limitées – Sélection basée sur la pertinence du profil”</span>
                      </p>
                    </div>

                    <label className="flex items-start gap-3 mb-6 cursor-pointer">
                      <input 
                        type="checkbox"
                        required
                        checked={formData.acceptContact}
                        onChange={(e) => setFormData({...formData, acceptContact: e.target.checked})}
                        className="w-5 h-5 mt-0.5 text-accent accent-accent rounded"
                      />
                      <span className="text-sm text-text-muted">
                        J'accepte d'être contacté dans le cadre de cette demande et j'ai lu les{' '}
                        <a href="/cgf-k-empire" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">CGF</a>
                      </span>
                    </label>

                    <div className="bg-bg-alt p-4 rounded-2xl mb-6">
                      <h4 className="font-semibold text-primary text-sm mb-2">Récapitulatif</h4>
                      <div className="space-y-1 text-sm text-text-muted">
                        <p><span className="font-medium">Événement :</span> {evenement.title}</p>
                        <p><span className="font-medium">Date :</span> {evenement.date}</p>
                        <p><span className="font-medium">Lieu :</span> {evenement.location || 'Non défini'}</p>
                        <p><span className="font-medium">Tarif :</span> {evenement.price ? 'Événement payant' : 'Événement gratuit'}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prevStep}>
                        Retour
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Envoi en cours...' : 'Confirmer mon inscription'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvenementSingle;