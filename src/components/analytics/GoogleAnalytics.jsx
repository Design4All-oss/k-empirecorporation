import { useEffect } from 'react';
import { useConsentSync, getConsentPrefs, updateGtagConsent } from '../../hooks/useConsentSync';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

// Microsoft Clarity
const initClarity = (id) => {
  if (!id || window.clarity) return;
  (function(c,l,a,r,i,t,y){
    if (c[a]) return;
    c[a]=function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src=`https://www.clarity.ms/tag/${i}`;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,'clarity','script',id);
};

const GoogleAnalytics = () => {
  const hasGA = Boolean(GA_MEASUREMENT_ID);

  useConsentSync();

  // GA4
  useEffect(() => {
    if (!hasGA) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
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

    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
    });

    const prefs = getConsentPrefs();
    if (Object.keys(prefs).length > 0) {
      updateGtagConsent(prefs);
    }
  }, [hasGA]);

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

  // Microsoft Clarity (no consent needed — analytics only, no cookies)
  useEffect(() => {
    initClarity(CLARITY_ID);
  }, []);

  if (!hasGA) return null;

  return null;
};

export default GoogleAnalytics;
