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

  const trackConversion = useCallback((conversionLabel, value) => {
    const prefs = getConsentPrefs();
    if (!prefs.marketing) return;
    window.gtag?.('event', 'conversion', {
      send_to: `${import.meta.env.VITE_GADS_CONVERSION_ID}/${conversionLabel}`,
      value,
    });
  }, []);

  return { trackEvent, trackPageView, trackConversion };
};
