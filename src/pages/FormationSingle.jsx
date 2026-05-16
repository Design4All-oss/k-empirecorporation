import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, Users, Target, FileText, CheckCircle, ArrowRight, GraduationCap, X, MessageCircle } from 'lucide-react';
import { useFormation, useFormations, useRecentPosts } from '../hooks';
import LoadingSpinner from '../components/ui/Loading';
import Button from '../components/ui/Button';

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
  
  const [recentPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    inscriptionType: '',
    fonction: '',
    pays: '',
    format: '',
    objectif: '',
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
      organization: '', 
      message: '',
      inscriptionType: '',
      fonction: '',
      pays: '',
      format: '',
      objectif: '',
      acceptContact: false
    });
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
          <h1 className="text-2xl font-bold text-primary mb-4">Formation non trouvée</h1>
          <Link to="/formations" className="text-accent hover:underline">
            Retour aux formations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={formation.image}
          alt={formation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
            >
              {/* Category & Level */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
                  {formation.category}
                </span>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {formation.level}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-h2-m md:text-h2-d text-primary font-bold mb-4 leading-tight">
                {formation.title}
              </h1>

              {/* Hook */}
              <p className="text-lg text-text-muted mb-8">
                {formation.hook}
              </p>

              {/* Content from Gutenberg editor */}
              {formation.content && (
                <div className="mb-8">
                  <div 
                    className="text-text-muted leading-relaxed [&_p]:mb-4 [&_p]:whitespace-normal [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4"
                    dangerouslySetInnerHTML={{ __html: formation.content }}
                    style={{
                      overflowWrap: 'break-word',
                      wordBreak: 'break-word',
                      maxWidth: '100%',
                    }}
                  />
                </div>
              )}

              {/* Info Keys */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-6 bg-bg-alt rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Clock size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Durée</p>
                    <p className="text-sm font-semibold text-primary">{formation.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Video size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Format</p>
                    <p className="text-sm font-semibold text-primary">{formation.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <MapPin size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Lieu</p>
                    <p className="text-sm font-semibold text-primary">{formation.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-muted">Public</p>
                    <p className="text-sm font-semibold text-primary truncate">{formation.audience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Calendar size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Prochaine session</p>
                    <p className="text-sm font-semibold text-primary">{formation.nextSession}</p>
                  </div>
                </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <GraduationCap size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Tarif</p>
                      <p className={`text-sm font-semibold ${formation.price ? 'text-accent' : 'text-green-600'}`}>
                        {formation.price ? 'Formation payante' : 'Formation gratuite'}
                      </p>
                    </div>
                  </div>
              </div>

              {/* Objectives */}
              {formation.objectives && formation.objectives.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Target size={20} className="text-accent" />
                    </div>
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

              {/* Target Audience */}
              {formation.audience && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-accent" />
                    </div>
                    Public cible
                  </h2>
                  <p className="text-text-muted">{formation.audience}</p>
                </div>
              )}

              {/* Prerequisites */}
              {formation.prerequisites && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <FileText size={20} className="text-accent" />
                    </div>
                    Prérequis
                  </h2>
                  <p className="text-text-muted">{formation.prerequisites}</p>
                </div>
              )}

              {/* Trainers */}
              {formation.trainers && formation.trainers.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="text-accent" />
                    Formateurs
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
                            <p className="text-sm text-accent font-medium">{trainer.role}</p>
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

              {/* Program */}
              {formation.program && formation.program.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <GraduationCap className="text-accent" />
                    Programme
                  </h2>
                  <div className="space-y-4">
                    {formation.program.map((module, index) => (
                      <div key={index} className="p-4 bg-bg-alt rounded-xl">
                        <h3 className="font-semibold text-primary mb-2">{module.title}</h3>
                        {module.content && (
                          <div 
                            className="text-sm text-text-muted"
                            dangerouslySetInnerHTML={{ __html: module.content }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Info */}
              {formation.practical && (
                <div className="mb-8 p-6 bg-primary rounded-2xl text-white">
                  <h2 className="text-xl font-bold mb-4">Modalités pratiques</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Durée</p>
                      <p className="font-semibold">{formation.practical.duration}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Horaires</p>
                      <p className="font-semibold">{formation.practical.schedule}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Supports</p>
                      <p className="font-semibold">{formation.practical.materials}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Évaluation</p>
                      <p className="font-semibold">{formation.practical.evaluation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-accent/10 rounded-2xl">
                <div>
                  <p className={`text-2xl font-bold ${formation.price ? 'text-accent' : 'text-green-600'}`}>
                    {formation.price ? 'Formation payante' : 'Formation gratuite'}
                  </p>
                  <p className="text-sm text-text-muted">Prochaine session : {formation.nextSession}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={() => setShowModal(true)}>
                    S'inscrire <ArrowRight size={18} className="ml-2" />
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
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={related.image || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=150&fit=crop'} 
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
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
                  {[0, 1, 2, 3].map((step) => (
                    <div key={step} className="flex-1 h-1 rounded-full bg-gray-200">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${step <= currentStep ? 'bg-accent' : ''}`}
                        style={{ width: step <= currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Step 0: Type d'inscription */}
                {currentStep === 0 && (
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">Type d'inscription</h2>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
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
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
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
                    
                    <Button 
                      onClick={nextStep}
                      disabled={!formData.inscriptionType}
                      className={!formData.inscriptionType ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Suivant
                    </Button>
                  </div>
                )}

                {/* Step 1: Informations */}
                {currentStep === 1 && (
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">Informations</h2>
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
                        <label className="block text-sm font-medium text-primary mb-1">Fonction / Profession *</label>
                        <input 
                          type="text"
                          required
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
                        disabled={!formData.name || !formData.email || !formData.phone || !formData.fonction || !formData.pays}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Format */}
                {currentStep === 2 && (
                  <div>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">Format</h2>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="format" 
                          value="en ligne"
                          checked={formData.format === 'en ligne'}
                          onChange={(e) => setFormData({...formData, format: e.target.value})}
                          className="w-5 h-5 text-accent accent-accent"
                        />
                        <span className="text-primary font-medium">En ligne</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="format" 
                          value="presentiel"
                          checked={formData.format === 'presentiel'}
                          onChange={(e) => setFormData({...formData, format: e.target.value})}
                          className="w-5 h-5 text-accent accent-accent"
                        />
                        <span className="text-primary font-medium">Présentiel</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input 
                          type="radio" 
                          name="format" 
                          value="intra-entreprise"
                          checked={formData.format === 'intra-entreprise'}
                          onChange={(e) => setFormData({...formData, format: e.target.value})}
                          className="w-5 h-5 text-accent accent-accent"
                        />
                        <span className="text-primary font-medium">Intra-entreprise</span>
                      </label>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-primary mb-1">Quel est votre objectif principal en suivant cette formation ?</label>
                      <textarea 
                        value={formData.objectif}
                        onChange={(e) => setFormData({...formData, objectif: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-text focus:outline-none focus:border-accent resize-none"
                        placeholder="Décrivez votre objectif..."
                      />
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={prevStep}>
                        Retour
                      </Button>
                      <Button onClick={nextStep}>
                        Suivant
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit}>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-primary">Finalisation</h2>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-xl mb-6">
                      <p className="text-sm text-text-muted mb-2">
                        <span className="font-semibold text-primary">“Un conseiller académique vous contactera sous 24h pour finaliser votre inscription et vous orienter stratégiquement.”</span>
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
                        onChange={(e) => setFormData({...formData, acceptContact: e.target.value})}
                        className="w-5 h-5 mt-0.5 text-accent accent-accent rounded"
                      />
                      <span className="text-sm text-text-muted">
                        J'accepte d'être contacté dans le cadre de cette demande
                      </span>
                    </label>

                    <div className="bg-bg-alt p-4 rounded-xl mb-6">
                      <h4 className="font-semibold text-primary text-sm mb-2">Récapitulatif</h4>
                      <div className="space-y-1 text-sm text-text-muted">
                        <p><span className="font-medium">Formation :</span> {formation.title}</p>
                        <p><span className="font-medium">Type :</span> {formData.inscriptionType === 'individuelle' ? 'Individuelle' : 'Institutionnelle'}</p>
                        <p><span className="font-medium">Format :</span> {formData.format || 'Non défini'}</p>
                        <p><span className="font-medium">Tarif :</span> {formation.price ? 'Formation payante' : 'Formation gratuite'}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={prevStep}>
                        Retour
                      </Button>
                      <Button type="submit">
                        Envoyer ma demande
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

export default FormationSingle;