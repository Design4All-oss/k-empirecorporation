import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Cookie, Settings, X, ChevronDown } from 'lucide-react';

// --- Context ---
const CookieConsentContext = createContext(null);

const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('CookieConsent parts must be used within <CookieConsent>');
  return ctx;
};

// --- Storage helpers ---
const writeStored = (key, prefs) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(prefs));
  } catch {}
};

const readStored = (key) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// --- Provider ---
const CookieConsentProvider = ({
  storageKey = 'kempire-cookie-consent',
  defaultPreferences,
  onChange,
  children,
}) => {
  const [prefs, setPrefs] = useState(() => defaultPreferences ?? {});
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const categoriesRef = useRef(new Map());

  useEffect(() => {
    const stored = readStored(storageKey);
    if (stored) setDismissed(true);
  }, [storageKey]);

  const register = useCallback((category) => {
    categoriesRef.current.set(category.id, category);
    return () => { categoriesRef.current.delete(category.id); };
  }, []);

  const setPref = useCallback((id, checked) => {
    setPrefs(prev => ({ ...prev, [id]: checked }));
  }, []);

  const commit = useCallback((next) => {
    writeStored(storageKey, next);
    setPrefs(next);
    onChange?.(next);
    setExpanded(false);
    setDismissed(true);
  }, [storageKey, onChange]);

  const acceptAll = useCallback(() => {
    const next = {};
    for (const { id } of categoriesRef.current.values()) next[id] = true;
    commit(next);
  }, [commit]);

  const rejectAll = useCallback(() => {
    const next = {};
    for (const { id, required } of categoriesRef.current.values()) next[id] = required;
    commit(next);
  }, [commit]);

  const save = useCallback(() => {
    const next = {};
    for (const { id, required } of categoriesRef.current.values()) {
      next[id] = required || Boolean(prefs[id]);
    }
    commit(next);
  }, [commit, prefs]);

  const dismiss = useCallback(() => setDismissed(true), []);

  const value = useMemo(() => ({
    prefs, setPref, expanded, setExpanded, register, acceptAll, rejectAll, save, dismiss,
  }), [prefs, setPref, expanded, register, acceptAll, rejectAll, save, dismiss]);

  const show = !dismissed;

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {show && <CookieConsentBanner storageKey={storageKey} />}
    </CookieConsentContext.Provider>
  );
};

// --- Banner ---
const CookieConsentBanner = ({ storageKey }) => {
  const { expanded, setExpanded, acceptAll, rejectAll, save, dismiss } = useCookieConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(dismiss, 300);
  };

  return (
    <div
      role="dialog"
      aria-modal={false}
      aria-label="Préférences cookies"
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[420px] z-[9999] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-4.5 h-4.5 text-accent" />
              </div>
              <h2 className="text-sm font-semibold text-primary tracking-tight">
                Nous utilisons des cookies
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-500 mt-3">
            Les cookies nécessaires assurent le bon fonctionnement du site. Avec votre consentement, nous utilisons également des cookies pour les analyses et la mesure d'audience.{' '}
            <a href="/mentions-legales" className="text-accent underline underline-offset-2 hover:text-accent-dark transition-colors">
              Politique de confidentialité
            </a>
          </p>
        </div>

        {/* Categories (expanded) */}
        {expanded && <CookieConsentCategories />}

        {/* Actions */}
        <div className="p-5 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 sm:flex-none px-4 py-2 bg-accent text-white text-[13px] font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              Tout accepter
            </button>
            <button
              onClick={() => { rejectAll(); handleClose(); }}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-100 text-gray-700 text-[13px] font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Tout refuser
            </button>
            {expanded && (
              <button
                onClick={save}
                className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white text-[13px] font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Enregistrer
              </button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="sm:ml-auto flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Gérer</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Categories ---
const CookieConsentCategories = () => {
  return (
    <div className="px-5 py-3">
      <div className="border border-gray-100 rounded-xl divide-y divide-gray-100">
        <CategoryItem
          id="necessary"
          name="Nécessaires"
          description="Authentification, sécurité et préférences de consentement."
          required
        />
        <CategoryItem
          id="analytics"
          name="Analytiques"
          description="Mesure d'audience et compréhension de l'utilisation du site."
        />
        <CategoryItem
          id="marketing"
          name="Marketing"
          description="Publicité et campagnes de communication."
        />
      </div>
    </div>
  );
};

// --- Category Item ---
const CategoryItem = ({ id, name, description, required = false }) => {
  const { prefs, setPref, register } = useCookieConsent();

  useEffect(() => register({ id, required }), [register, id, required]);

  const checked = required || Boolean(prefs[id]);

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-gray-800">{name}</span>
          {required && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
              Toujours actif
            </span>
          )}
        </div>
        <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={required}
        onClick={() => !required && setPref(id, !checked)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
          checked ? 'bg-accent' : 'bg-gray-200'
        } ${required ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
          }`}
        />
      </button>
    </div>
  );
};

export { CookieConsentProvider, useCookieConsent };
