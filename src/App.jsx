import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceConseil from './pages/ServiceConseil';
import ServiceAudit from './pages/ServiceAudit';
import ServiceJuridique from './pages/ServiceJuridique';
import Formations from './pages/Formations';
import FormationSingle from './pages/FormationSingle';
import EvenementSingle from './pages/EvenementSingle';
import Contact from './pages/Contact';
import LegalNotices from './pages/LegalNotices';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import BookingModal from './components/ui/BookingModal';
import { BookingModalProvider } from './context/BookingModalContext';

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
  const knownRoutes = ['/', '/a-propos', '/services', '/contact', '/formations', '/blog', '/mentions-legales', '/event'];
  const isKnownRoute = knownRoutes.some(route => 
    location.pathname === route || 
    location.pathname.startsWith(route + '/')
  );
  
  const shouldHideFooter = is404 || !isKnownRoute;

  return (
    <>
      {!is404 && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/conseil-strategie" element={<ServiceConseil />} />
          <Route path="/services/audit-diagnostic" element={<ServiceAudit />} />
          <Route path="/services/assistance-juridique" element={<ServiceJuridique />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/formations/:slug" element={<FormationSingle />} />
          <Route path="/event/:slug" element={<EvenementSingle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalNotices />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogSingle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BookingModalProvider>
          <Router>
            <CustomCursor />
            <BookingModal />
            <AppContent />
          </Router>
        </BookingModalProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;