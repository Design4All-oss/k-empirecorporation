import React, { Suspense, lazy } from 'react';
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
import { BookingModalProvider } from './context/BookingModalContext';
import { ToastProvider } from './context/ToastContext';
import { CookieConsentProvider } from './components/legal/CookieConsent';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceConseil = lazy(() => import('./pages/ServiceConseil'));
const ServiceIntelligenceStrategique = lazy(() => import('./pages/ServiceIntelligenceStrategique'));
const ServiceJuridique = lazy(() => import('./pages/ServiceJuridique'));
const Formations = lazy(() => import('./pages/Formations'));
const FormationSingle = lazy(() => import('./pages/FormationSingle'));
const EvenementSingle = lazy(() => import('./pages/EvenementSingle'));
const Contact = lazy(() => import('./pages/Contact'));
const LegalNotices = lazy(() => import('./pages/LegalNotices'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogSingle = lazy(() => import('./pages/BlogSingle'));
const NotFound = lazy(() => import('./pages/NotFound'));
const References = lazy(() => import('./pages/References'));
const Ecosysteme = lazy(() => import('./pages/Ecosysteme'));
const CGUFormations = lazy(() => import('./pages/CGUFormations'));

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

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BookingModalProvider>
            <ToastProvider>
              <Router>
                <CookieConsentProvider>
                  <GoogleAnalytics />
                  <CustomCursor />
                  <BookingModal />
                  <AppContent />
                </CookieConsentProvider>
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