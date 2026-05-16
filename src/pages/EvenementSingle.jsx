import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Monitor, MapPinHouse, MessageCircle, X, CheckCircle } from 'lucide-react';
import { useEvenement, useEvenements } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';
import Button from '../components/ui/Button';

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

const EvenementSingle = () => {
  const { slug } = useParams();
  const { data: evenement, isLoading, error } = useEvenement(slug);
  const { data: allEvenements } = useEvenements();

  const defaultImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop';

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
    acceptContact: false
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowModal(false);
    setCurrentStep(0);
    setFormData({ 
      name: '', 
      email: '', 
      phone: '', 
      organisation: '',
      fonction: '',
      pays: '',
      acceptContact: false
    });
  };

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
          <h1 className="text-2xl font-bold text-primary mb-4">Événement non trouvé</h1>
          <Link to="/blog" className="text-accent hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={evenement.image || defaultImage}
          alt={evenement.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-accent text-white font-medium rounded-full">
            Événement
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
            >
              <div className="flex items-center gap-2 mb-4">
                {evenement.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {evenement.category}
                  </span>
                )}
                {evenement.type && (
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    {evenement.type}
                  </span>
                )}
              </div>

              <h1 className="text-h2-m md:text-h2-d text-primary font-bold mb-6 leading-tight">
                {evenement.title}
              </h1>

              {evenement.content && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-primary mb-4">Détails</h2>
                  <div 
                    className="text-text-muted leading-relaxed [&_p]:mb-4 [&_p]:whitespace-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4"
                    dangerouslySetInnerHTML={{ __html: evenement.content }}
                    style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              )}

              {evenement.programme && (
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                  <h2 className="text-lg font-bold text-primary mb-4">Programme</h2>
                  <div 
                    className="text-text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: evenement.programme }}
                  />
                </div>
              )}

              {evenement.intervenants && evenement.intervenants.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-primary mb-4">Intervenants</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {evenement.intervenants.map((intervenant, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        {intervenant.photo && (
                          <img 
                            src={intervenant.photo} 
                            alt={intervenant.nom}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-primary">{intervenant.nom}</p>
                          <p className="text-sm text-text-muted">{intervenant.fonction}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {evenement.price ? (
                <div className="mb-8 p-6 bg-accent/10 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Tarif</p>
                      <p className="text-2xl font-bold text-accent">Événement payant</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8 p-6 bg-green-50 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Tarif</p>
                      <p className="text-2xl font-bold text-green-600">Événement gratuit</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-gray-100 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {evenement.date && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Date</p>
                        <p className="font-semibold text-primary">{evenement.date}</p>
                      </div>
                    </div>
                  )}
                  {evenement.time && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Heure</p>
                        <p className="font-semibold text-primary">{evenement.time}</p>
                      </div>
                    </div>
                  )}
                  {evenement.duration && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Durée</p>
                        <p className="font-semibold text-primary">{evenement.duration}</p>
                      </div>
                    </div>
                  )}
                  {evenement.location && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Lieu</p>
                        <p className="font-semibold text-primary">{evenement.location}</p>
                      </div>
                    </div>
                  )}
                  {evenement.spots !== undefined && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Places</p>
                        <p className="font-semibold text-primary">{evenement.registered || 0}/{evenement.spots} places</p>
                      </div>
                    </div>
                  )}
                  {evenement.format && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {evenement.format === 'presentiel' ? (
                          <MapPinHouse size={20} className="text-accent" />
                        ) : (
                          <Monitor size={20} className="text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Format</p>
                        <p className="font-semibold text-primary">
                          {evenement.format === 'presentiel' ? 'Présentiel' : evenement.format === 'visioconference' ? 'Visioconférence' : evenement.format}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {evenement.spots && (evenement.registered || 0) < evenement.spots ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowModal(true)}
                    className="py-3 px-6 bg-accent text-white font-semibold rounded-full hover:bg-orange-400 transition-colors flex items-center justify-center gap-2"
                  >
                    S'inscrire <ArrowRight size={18} />
                  </button>
                  <a 
                    href="https://wa.me/228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors flex-shrink-0"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              ) : (
                <button className="py-3 px-6 bg-gray-300 text-white font-semibold rounded-full cursor-not-allowed">
                  Complet
                </button>
              )}

              <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8">
                <span className="text-text-muted">Partager cet événement</span>
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

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              {relatedEvenements.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h3 className="text-lg text-accent font-bold font-display mb-4">Événements à venir</h3>
                  <div className="space-y-4">
                    {relatedEvenements.map((event) => (
                      <Link 
                        key={event.id}
                        to={`/event/${event.slug}`}
                        className="group flex gap-4 items-center"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={event.image || defaultImage}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                            <Calendar size={12} />
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-primary rounded-3xl p-6 text-white mt-8">
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-white/70 text-sm mb-4">Recevez nos dernières invitations</p>
                <div className="flex gap-3">
                  <input 
                    type="email" 
                    placeholder="Votre email" 
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent"
                  />
                  <button className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-light transition-colors flex-shrink-0">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-16"></div>
      </div>

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
              className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
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
                        className={`h-full rounded-full transition-all duration-300 ${step <= currentStep ? 'bg-accent' : ''}`}
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
                    <div className="bg-bg-alt p-4 rounded-xl mb-6 text-left">
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
                          placeholder="+228 XX XX XX XX"
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
                        disabled={!formData.name || !formData.email || !formData.phone || !formData.pays}
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

                    <div className="bg-accent/10 p-4 rounded-xl mb-6">
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
                        J'accepte d'être contacté dans le cadre de cette demande
                      </span>
                    </label>

                    <div className="bg-bg-alt p-4 rounded-xl mb-6">
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
                      <Button type="submit">
                        Confirmer mon inscription
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