import { useEffect } from 'react';
import { useConsentSync, getConsentPrefs, updateGtagConsent } from '../../hooks/useConsentSync';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GADS_CONVERSION_ID = import.meta.env.VITE_GADS_CONVERSION_ID;

const GoogleAnalytics = () => {
  const hasGA = Boolean(GA_MEASUREMENT_ID);
  const hasAds = Boolean(GADS_CONVERSION_ID);

  useConsentSync();

  useEffect(() => {
    if (!hasGA && !hasAds) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GADS_CONVERSION_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());

    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });

    if (hasGA) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
      });
    }

    if (hasAds) {
      window.gtag('config', GADS_CONVERSION_ID);
    }

    const prefs = getConsentPrefs();
    if (Object.keys(prefs).length > 0) {
      updateGtagConsent(prefs);
    }
  }, [hasGA, hasAds]);

  useEffect(() => {
    if (!hasGA) return;

    const handleRouteChange = () => {
      window.gtag?.('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
      });
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [hasGA]);

  if (!hasGA && !hasAds) return null;

  return null;
};

export default GoogleAnalytics;
