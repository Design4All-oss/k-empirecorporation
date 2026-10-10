import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, Users, Target, FileText, CheckCircle, ArrowRight, GraduationCap, MessageCircle, Download, Presentation } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { isPaidFormation } from '../utils/format';
import { sanitizeHtml } from '../utils/sanitize';
import { useFormation, useFormations } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';
import Button from '../components/ui/Button';
import { submitNewsletter } from '../api/forms';
import { useToast } from '../context/ToastContext';
import { toDirectDownloadUrl, triggerDownload } from '../utils/driveDownload';
import RegistrationModal from '../components/formations/RegistrationModal';

// Icons
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M28.278,3.722H3.722C2.231,3.722,1,4.953,1,6.444v19.111c0,1.491,1.231,2.722,2.722,2.722h24.556c1.491,0,2.722-1.231,2.722-2.722V6.444C31,4.953,29.769,3.722,28.278,3.722zM10.389,24.444H7.556V13.722h2.833v10.722zM8.972,11.722c-0.935,0-1.694-0.759-1.694-1.694c0-0.935,0.759-1.694,1.694-1.694c0.935,0,1.694,0.759,1.694,1.694C10.667,10.963,9.907,11.722,8.972,11.722zM24.444,24.444h-2.833v-6.222c0-0.935-0.759-1.694-1.694-1.694c-0.935,0-1.694,0.759-1.694,1.694v6.222h-2.833V13.722h2.833v1.528c0.559-0.867,1.528-1.694,2.833-1.694c1.694,0,2.833,1.194,2.833,3.111v6.778H24.444z"/>
  </svg>
);

const FormationSingle = () => {
  const { slug } = useParams();
  
  const { data: apiFormation, isLoading, error } = useFormation(slug);
  const { data: allFormations } = useFormations();
  
  const formation = apiFormation;
  
  const relatedFormations = allFormations 
    ? allFormations.filter(f => f.slug !== slug).slice(0, 3)
    : [];
  
  const [showModal, setShowModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const toast = useToast();

  const handleDownload = () => {
    if (!formation?.lienPresentation) return
    const url = toDirectDownloadUrl(formation.lienPresentation)
    if (url) triggerDownload(url, `${formation.title || 'presentation'}.pdf`)
  }

  const handleNewsletterSidebar = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) {
      if (!newsletterConsent) toast("Vous devez accepter la politique de confidentialité.", 'error');
      return;
    }
    setNewsletterLoading(true);
    try {
      const res = await submitNewsletter({ email: newsletterEmail, nom: '', source: 'formation-sidebar', consentement: true });
      toast(res.message || 'Inscription à la newsletter réussie !');
      setNewsletterEmail('');
      setNewsletterConsent(false);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner text="Chargement de la formation..." />
      </div>
    );
  }

  // Error ou pas de formation
  if (error || !formation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Formation non trouvée</h2>
          <Link to="/formations" className="text-accent hover:underline">
            Retour aux formations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={formation.title}
        description={formation.hook || `Formation ${formation.title} - K-EMPIRE Corporation`}
        url={`/formations/${slug}`}
        image={formation.image}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": formation.title,
          "description": formation.hook,
          "url": `https://www.k-empirecorporation.com/formations/${slug}`,
          "provider": {
            "@type": "Organization",
            "name": "K-EMPIRE Corporation"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": formation.format,
            "location": {
              "@type": "Place",
              "name": formation.location
            }
          }
        }}
      />
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        {formation.image && (
          <img
            src={formation.image}
            alt={formation.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
            >
              {/* Type de formation */}
              {formation.formationType && (
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {formation.formationType}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-h2-m md:text-h2-d text-primary font-bold mb-4 leading-tight">
                {formation.title}
              </h1>

              {/* Hook */}
              <p className="text-lg text-text-muted mb-8">
                {formation.hook}
              </p>

              {/* Contexte */}
              {formation.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-accent" />
                    Contexte
                  </h2>
                  <p className="text-text-muted leading-relaxed">{formation.description}</p>
                </div>
              )}

              {/* Content from Gutenberg editor */}
              {formation.content && (
                <div className="mb-8">
                  <div 
                    className="text-text-muted leading-relaxed [&_p]:mb-4 [&_p]:whitespace-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(formation.content) }}
                    style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              )}

              {/* Info Keys */}
              {(() => {
                const keys = [
                  { icon: Clock, label: 'Durée', value: formation.duration },
                  { icon: Video, label: 'Format', value: formation.format },
                  { icon: MapPin, label: 'Lieu', value: formation.location },
                  { icon: Users, label: 'Public', value: formation.audience },
                  { icon: Calendar, label: 'Prochaine session', value: formation.nextSession },
                ].filter((k) => k.value);

                if (keys.length === 0) return null;

                return (
                  <div className="mb-8 p-6 bg-bg-alt rounded-2xl grid md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center">
                    <div className="grid grid-cols-2 gap-4">
                      {keys.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon size={18} className="text-accent" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-text-muted">{label}</p>
                            <p className="text-sm font-semibold text-primary truncate">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="group inline-flex items-center gap-2 text-small font-normal font-display tracking-tight text-accent hover:text-primary transition-colors duration-300 hover:cursor-pointer whitespace-nowrap"
                    >
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="underline decoration-accent/40 decoration-2 underline-offset-4 group-hover:decoration-primary/40">
                        S'inscrire
                      </span>
                    </button>
                  </div>
                );
              })()}

              {/* Objectives */}
              {formation.objectives && formation.objectives.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Target size={20} className="text-accent" />
                    Objectifs de la formation
                  </h2>
                  <ul className="space-y-3">
                    {formation.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-1" />
                        <span className="text-text-muted">
                          {typeof objective === 'string' ? objective : objective.objectif || ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Méthodologie */}
              {formation.methodology && formation.methodology.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Presentation size={20} className="text-accent" />
                    Méthodologie
                  </h2>
                  <ul className="space-y-3">
                    {formation.methodology.map((mode, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-accent flex-shrink-0 mt-1" />
                        <span className="text-text-muted">{mode}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Program */}
              {formation.program && formation.program.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <GraduationCap className="text-accent" />
                    Architecture du programme
                  </h2>
                  <div className="space-y-4">
                    {formation.program.map((module, index) => (
                      <div key={index} className="p-4 bg-bg-alt rounded-xl">
                        <h3 className="font-semibold text-primary mb-2">{module.title}</h3>
                        {module.content && (
                          <div 
                            className="text-sm text-text-muted"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(module.content) }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trainers */}
              {formation.trainers && formation.trainers.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="text-accent" />
                    Profil des intervenants
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {formation.trainers.map((trainer, index) => (
                      <div key={index} className="p-4 bg-bg-alt rounded-xl">
                        <div className="flex items-center gap-4 mb-3">
                          {trainer.image ? (
                            <img 
                              src={trainer.image} 
                              alt={trainer.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                            />
                          ) : null}
                          <div 
                            className={`w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 ${trainer.image ? 'hidden' : ''}`}
                          >
                            <Users className="w-8 h-8 text-accent" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-primary">{trainer.name}</h3>
                            {trainer.role && (
                              <p className="text-sm text-accent font-medium">{trainer.role}</p>
                            )}
                          </div>
                        </div>
                        {trainer.bio && (
                          <p className="text-sm text-text-muted">{trainer.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sessions */}
              {formation.sessions && formation.sessions.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-accent" />
                    </div>
                    Sessions à venir
                  </h2>
                  <div className="space-y-4">
                    {formation.sessions.map((session) => {
                      const start = session.startDate ? new Date(`${session.startDate}T00:00:00`) : null;
                      const end = session.endDate ? new Date(`${session.endDate}T00:00:00`) : null;
                      const label = start
                        ? end && end.getTime() !== start.getTime()
                          ? `${start.toLocaleDateString('fr-FR')} → ${end.toLocaleDateString('fr-FR')}`
                          : start.toLocaleDateString('fr-FR')
                        : 'Date à confirmer';
                      return (
                        <div key={session.id} className="p-5 bg-bg-alt rounded-2xl flex flex-wrap items-center gap-x-8 gap-y-2">
                          <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-accent" />
                            <span className="font-semibold text-primary">{label}</span>
                          </div>
                          {session.location && (
                            <div className="flex items-center gap-2 text-sm text-text-muted">
                              <MapPin size={16} className="text-accent" />
                              {session.location}
                            </div>
                          )}
                          {session.format && (
                            <div className="flex items-center gap-2 text-sm text-text-muted">
                              <Video size={16} className="text-accent" />
                              {session.format}
                            </div>
                          )}
                          {session.spots != null && (
                            <div className="flex items-center gap-2 text-sm text-text-muted">
                              <Users size={16} className="text-accent" />
                              {session.spots} places
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Practical Info */}
              {(() => {
                const p = formation.practical || {};
                const startDateLabel = p.startDate
                  ? new Date(`${p.startDate}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                  : '';
                const items = [
                  { label: 'Date de démarrage', value: startDateLabel },
                  { label: 'Durée', value: formation.duration },
                  { label: 'Format', value: formation.format },
                  { label: 'Places', value: p.placesLabel || (p.capacity ? `${p.capacity} places` : '') },
                  { label: 'Lieu', value: p.location },
                  { label: 'Planning', value: p.schedule },
                  { label: 'Admission', value: p.admission },
                  { label: 'Matériel fourni', value: p.materials },
                  { label: 'Certification', value: p.certification },
                  { label: 'Attestation', value: p.attestation },
                ].filter((item) => item.value);

                if (items.length === 0) return null;

                return (
                  <div className="mb-8 p-6 bg-primary rounded-2xl text-white">
                    <h2 className="text-xl font-bold mb-4">Informations pratiques</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {items.map((item) => (
                        <div key={item.label}>
                          <p className="text-white/70 text-sm">{item.label}</p>
                          <p className="font-semibold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-accent/10 rounded-2xl">
                {isPaidFormation(formation) ? (
                  <div>
                    <p className="text-2xl font-bold text-accent">Formation payante</p>
                    {formation.nextSession && (
                      <p className="text-sm text-text-muted">Prochaine session : {formation.nextSession}</p>
                    )}
                  </div>
                ) : formation.nextSession ? (
                  <p className="text-sm text-text-muted">Prochaine session : {formation.nextSession}</p>
                ) : (
                  <p className="text-sm text-text-muted">Inscription ouverte</p>
                )}
                <div className="flex items-center gap-3">
                  {formation.lienPresentation && (
                    <button
                      onClick={handleDownload}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer flex-shrink-0"
                      title="Télécharger la présentation"
                    >
                      <Download size={20} />
                    </button>
                  )}
                  <Button onClick={() => setShowModal(true)}>
                    Je m'inscris <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <a 
                    href="https://wa.me/228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
                <span className="text-text-muted">Partager cette formation</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  >
                    <FacebookIcon />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  >
                    <XIcon />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  >
                    <LinkedinIcon />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="lg:sticky lg:top-8">
              {relatedFormations.length > 0 ? (
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h3 className="text-lg text-accent font-bold font-display mb-4">Autres formations</h3>
                  <div className="space-y-4">
                    {relatedFormations.map((related) => (
                      <Link key={related.id} to={`/formations/${related.slug}`} className="group flex gap-4">
                        {related.image && (
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={related.image}
                              alt={related.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                            {related.title}
                          </h4>
                          <span className="text-xs text-text-muted mt-1 block">
                            {related.duration}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h3 className="text-lg text-accent font-bold font-display mb-4">Autres formations</h3>
                  <p className="text-sm text-text-muted">Aucune autre formation disponible</p>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-primary rounded-3xl p-6 text-white mt-8">
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-white/70 text-sm mb-4">Recevez nos dernières formations et actualités</p>
                <form onSubmit={handleNewsletterSidebar} className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <input 
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Votre email" 
                      required
                      className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                    />
                    <button type="submit" disabled={newsletterLoading || !newsletterConsent} className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-light transition-colors flex-shrink-0 disabled:opacity-50">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 rounded border-white/40 bg-white/10 text-accent focus:ring-accent"
                    />
                    <span className="text-[11px] text-white/60 leading-tight">
                      J'accepte la <a href="/mentions-legales" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">politique de confidentialité</a> et consens à recevoir des communications.
                    </span>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-16"></div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <RegistrationModal formation={formation} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default FormationSingle;
