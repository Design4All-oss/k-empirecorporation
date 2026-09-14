import { useEffect } from 'react';

const STORAGE_KEY = 'kempire-cookie-consent';

export const getConsentPrefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const updateGtagConsent = (prefs) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('consent', 'update', {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  });
};

export const useConsentSync = () => {
  useEffect(() => {
    const prefs = getConsentPrefs();
    if (Object.keys(prefs).length > 0) {
      updateGtagConsent(prefs);
    }

    const handler = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          updateGtagConsent(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handler);

    const interval = setInterval(() => {
      const current = getConsentPrefs();
      updateGtagConsent(current);
    }, 2000);

    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(interval);
    };
  }, []);
};
