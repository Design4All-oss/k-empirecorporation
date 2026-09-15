import { useCallback } from 'react';
import { getConsentPrefs } from './useConsentSync';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName, params) => {
    const prefs = getConsentPrefs();
    if (!prefs.analytics) return;
    window.gtag?.('event', eventName, params);
  }, []);

  const trackPageView = useCallback((path, title) => {
    const prefs = getConsentPrefs();
    if (!prefs.analytics) return;
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }, []);

  return { trackEvent, trackPageView };
};
