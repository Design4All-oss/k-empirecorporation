import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import BookingModal from './components/ui/BookingModal';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';
import Maintenance from './pages/Maintenance';
import { useSiteSettings } from './hooks/useSiteContent';
import { BookingModalProvider } from './context/BookingModalContext';
import { ToastProvider } from './context/ToastContext';
import { CookieConsentProvider } from './components/legal/CookieConsent';

// Route lazy avec récupération automatique.
// Un onglet resté ouvert depuis un déploiement antérieur demande encore un
// chunk haché qui n'existe plus (404) : au lieu d'afficher la page d'erreur,
// on recharge une fois pour récupérer le HTML à jour. Le garde-fou de 10 s
// évite une boucle de rechargement.
const CHUNK_RELOAD_KEY = 'kempire:chunk-reload';
const lazyRoute = (factory) =>
  React.lazy(() =>
    factory().catch((error) => {
      const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
      if (Date.now() - last > 10000) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
        window.location.reload();
      }
      throw error;
    })
  );

const Home = lazyRoute(() => import('./pages/Home'));
const About = lazyRoute(() => import('./pages/About'));
const Services = lazyRoute(() => import('./pages/Services'));
const ServiceConseil = lazyRoute(() => import('./pages/ServiceConseil'));
const ServiceIntelligenceStrategique = lazyRoute(() => import('./pages/ServiceIntelligenceStrategique'));
const ServiceJuridique = lazyRoute(() => import('./pages/ServiceJuridique'));
const Formations = lazyRoute(() => import('./pages/Formations'));
const FormationSingle = lazyRoute(() => import('./pages/FormationSingle'));
const EvenementSingle = lazyRoute(() => import('./pages/EvenementSingle'));
const Contact = lazyRoute(() => import('./pages/Contact'));
const LegalNotices = lazyRoute(() => import('./pages/LegalNotices'));
const Blog = lazyRoute(() => import('./pages/Blog'));
const BlogSingle = lazyRoute(() => import('./pages/BlogSingle'));
const NotFound = lazyRoute(() => import('./pages/NotFound'));
const References = lazyRoute(() => import('./pages/References'));
const Ecosysteme = lazyRoute(() => import('./pages/Ecosysteme'));
const CGUFormations = lazyRoute(() => import('./pages/CGUFormations'));

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function AppContent() {
  const location = useLocation();
  
  // Hide footer on unknown routes (404)
  const is404 = location.pathname === '*';
  
  // List of known routes (base paths)
  const knownRoutes = ['/', '/a-propos', '/services', '/contact', '/formations', '/blog', '/mentions-legales', '/cgf-k-empire', '/event', '/references-partenariats', '/ecosysteme-experts'];
  const isKnownRoute = knownRoutes.some(route => 
    location.pathname === route || 
    location.pathname.startsWith(route + '/')
  );
  
  const shouldHideFooter = is404 || !isKnownRoute;

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-pill">
        Aller au contenu principal
      </a>
      {!is404 && <Header />}
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/conseil-strategie" element={<ServiceConseil />} />
            <Route path="/services/intelligence-strategique" element={<ServiceIntelligenceStrategique />} />
            <Route path="/services/assistance-juridique" element={<ServiceJuridique />} />
            <Route path="/references-partenariats" element={<References />} />
            <Route path="/ecosysteme-experts" element={<Ecosysteme />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formations/:slug" element={<FormationSingle />} />
            <Route path="/event/:slug" element={<EvenementSingle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<LegalNotices />} />
            <Route path="/cgf-k-empire" element={<CGUFormations />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogSingle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

// Contournement du mode maintenance : ajouter ?preview=1 à l'URL.
// Le choix est conservé pour toute la session, sinon la navigation interne
// (react-router) le perdrait immédiatement.
const isPreview = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === '1') {
      sessionStorage.setItem('kempire:preview', '1');
      return true;
    }
    return sessionStorage.getItem('kempire:preview') === '1';
  } catch {
    return false;
  }
};

// Affiche la page de maintenance quand le réglage est actif dans le Studio.
// Fail-open : si la lecture échoue (data indéfini), le site s'affiche normalement.
function MaintenanceGate({ children }) {
  const { data, isLoading } = useSiteSettings();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (data?.maintenance && !isPreview()) {
    return <Maintenance message={data.message} />;
  }

  return children;
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BookingModalProvider>
            <ToastProvider>
              <Router>
                <MaintenanceGate>
                  <CookieConsentProvider>
                    <GoogleAnalytics />
                    <CustomCursor />
                    <BookingModal />
                    <AppContent />
                  </CookieConsentProvider>
                </MaintenanceGate>
              </Router>
            </ToastProvider>
          </BookingModalProvider>
        </QueryClientProvider>
      </ErrorBoundary>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;