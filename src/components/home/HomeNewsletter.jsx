import React, { useState } from 'react';
import { Inbox } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { submitNewsletter } from '../../api/forms';
import { useToast } from '../../context/ToastContext';

const SOURCE_MAP = {
  '/': 'home',
  '/about': 'about',
  '/blog': 'blog',
  '/formations': 'formations',
  '/services': 'services',
  '/services/conseil': 'services-conseil',
  '/services/intelligence-strategique': 'services-intelligence',
  '/services/juridique': 'services-juridique',
  '/references': 'references',
  '/ecosysteme': 'ecosysteme',
};

const HomeNewsletter = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();

  const source = SOURCE_MAP[location.pathname] || 'newsletter';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      toast("Vous devez accepter la politique de confidentialité pour vous inscrire.", 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await submitNewsletter({ email, nom: '', source, consentement: true });
      toast(res.message || 'Inscription à la newsletter réussie !');
      setEmail('');
      setConsent(false);
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 md:py-12 -mb-32 relative z-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-accent rounded-3xl p-8 md:p-16 shadow-md relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
            {/* Left Column - Title & Text */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-h2-m md:text-h2-d font-bold text-white font-display leading-tight mb-6 md:whitespace-nowrap">
                Restez informé
              </h2>
              <p className="text-body text-white/80 max-w-sm">
                Inscrivez-vous à notre newsletter pour ne rien manquer de nos actualités.
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="flex-shrink-0 w-full max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col items-end gap-4">
                <div className="w-full relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                    <Inbox size={28} strokeWidth={1.5} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    aria-label="Adresse email"
                    className="w-full pl-12 bg-transparent border-b border-white/40 text-white placeholder:text-white/50 focus:outline-none focus:border-white pb-1"
                    required
                  />
                </div>
                <label className="flex items-start gap-2 cursor-pointer text-left">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/40 bg-white/10 text-accent focus:ring-accent"
                    required
                  />
                  <span className="text-xs text-white/70 leading-tight">
                    J'accepte la{' '}
                    <a href="/mentions-legales" className="underline underline-offset-2 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                      politique de confidentialité
                    </a>{' '}
                    et consens à recevoir des communications.
                  </span>
                </label>
                <button type="submit" disabled={loading || !consent} className="px-6 py-3 bg-white text-primary font-semibold rounded-pill hover:bg-white/90 transition-colors disabled:opacity-50">
                  {loading ? 'En cours...' : "S'inscrire"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNewsletter;
