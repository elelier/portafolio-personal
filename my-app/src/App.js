import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import { HOME_COPY, OG_LOCALES, homePathFor, isLocalizedHome } from './i18n/locales';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './styles/App.css';
import './styles/components/UxSmallFixes.css';
import SEO from './components/SEO';
import RouteSEO from './components/RouteSEO';
import Navegacion from './components/Navegacion';
import HeroBanner from './components/HeroBanner';
import Soluciones from './components/Soluciones';
import CasosEstudio from './components/CasosEstudio';
import Testimonios from './components/Testimonios';
import Portafolio from './components/Portafolio';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import SobreMi from './components/SobreMi';
import Tarifario from './components/Tarifario';
import FloatingButton from './components/FloatingButton';
import ChatModal from './components/ChatModal';
import ExternalRedirect from './components/ExternalRedirect';
import ClientSpace from './components/ClientSpace';
import SettingsMenu from './components/SettingsMenu';
import AdminLeads from './pages/AdminLeads';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AionLabs from './components/AionLabs';
import PrivateRouteSEO from './components/PrivateRouteSEO';
import InternalRoutePlaceholder from './components/InternalRoutePlaceholder';
import { initializeTheme } from './components/utils/themeUtils';
import { getMotionAwareScrollBehavior, loadExternalScripts } from './components/utils/generalUtils';
import { getRouteSeoPolicy } from './config/routeSeoPolicy';
import './utils/testGemini';

if (process.env.NODE_ENV === 'development') {
  import('./debug-gemini');
}

const Blog = lazy(() => import('./components/Blog'));

const SCROLL_TO_TOP_LABELS = Object.freeze({
  es: 'Volver arriba',
  en: 'Back to top',
  'pt-br': 'Voltar ao topo',
});

function LocalizedScrollToTop({ onClick }) {
  const { language } = useLanguage();
  return (
    <FloatingButton
      icon={<FaArrowUp />}
      onClick={onClick}
      ariaLabel={SCROLL_TO_TOP_LABELS[language] || SCROLL_TO_TOP_LABELS.es}
    />
  );
}

function HomeSeo() {
  const { language } = useLanguage();
  const location = useLocation();
  if (!isLocalizedHome(location.pathname)) return null;
  const copy = HOME_COPY[language] || HOME_COPY.es;
  return <SEO title={copy.title} description={copy.description} pathname={homePathFor(language)} locale={OG_LOCALES[language]} />;
}

const LocalizedHashScroll = () => {
  const { pathname, hash } = useLocation();
  const previousPathRef = useRef(null);

  useEffect(() => {
    const changedPath = previousPathRef.current !== pathname;
    previousPathRef.current = pathname;
    if (!hash || !changedPath) return undefined;
    const sectionId = decodeURIComponent(hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (section && typeof section.scrollIntoView === 'function') {
        section.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

const HeroVisibilityObserver = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const hero = document.getElementById('hero-banner');
    if (!hero) {
      document.body.classList.remove('hero-section-in-view');
      return undefined;
    }

    const syncHeroVisibility = (isVisible) => {
      document.body.classList.toggle('hero-section-in-view', isVisible);
    };

    if (typeof window.IntersectionObserver === 'undefined') {
      const handleViewportChange = () => {
        const rect = hero.getBoundingClientRect();
        syncHeroVisibility(rect.top < window.innerHeight && rect.bottom > 0);
      };
      handleViewportChange();
      window.addEventListener('scroll', handleViewportChange, { passive: true });
      window.addEventListener('resize', handleViewportChange);
      return () => {
        window.removeEventListener('scroll', handleViewportChange);
        window.removeEventListener('resize', handleViewportChange);
        document.body.classList.remove('hero-section-in-view');
      };
    }

    const rect = hero.getBoundingClientRect();
    syncHeroVisibility(rect.top < window.innerHeight && rect.bottom > 0);

    const observer = new window.IntersectionObserver(
      ([entry]) => syncHeroVisibility(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);

    return () => {
      observer.disconnect();
      document.body.classList.remove('hero-section-in-view');
    };
  }, [pathname]);

  return null;
};

function App({ initialLanguage }) {
  const homeSectionPalette = [
    'var(--color-bg)',
    'var(--color-bg-3)',
    'var(--color-bg)',
    'var(--color-bg-2)',
  ];

  const homeSections = [
    { key: 'hero', Component: HeroBanner },
    { key: 'soluciones', Component: Soluciones },
    { key: 'casos', Component: CasosEstudio },
    { key: 'testimonios', Component: Testimonios },
    { key: 'servicios', Component: Servicios },
    { key: 'sobre-mi', Component: SobreMi },
    { key: 'portafolio', Component: Portafolio },
    { key: 'contacto', Component: Contacto },
  ];

  const getSectionTransitionStyle = (index) => ({
    '--section-bg-start': homeSectionPalette[index % homeSectionPalette.length],
    '--section-bg-end': homeSectionPalette[(index + 1) % homeSectionPalette.length],
  });

  useEffect(() => {
    initializeTheme();
    loadExternalScripts().then(() => {});
  }, [initialLanguage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: getMotionAwareScrollBehavior() });
  };

  const renderPrivateRoute = (element, seoProps) => (
    <>
      <PrivateRouteSEO {...seoProps} />
      {element}
    </>
  );

  const renderPublicAliasRoute = (element, seoProps) => (
    <>
      <RouteSEO {...seoProps} />
      {element}
    </>
  );

  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <ThemeProvider>
            <div className="App">
              <HeroVisibilityObserver />
              <LocalizedHashScroll />
              <SettingsMenu />
              <HomeSeo />
              <Navegacion />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {['/', '/en/', '/pt-br/'].map((route) => (
                    <Route key={route} path={route} element={<>{homeSections.map(({ key, Component }, index) => (<Component key={key} style={getSectionTransitionStyle(index)} />))}</>} />
                  ))}
                  <Route
                    path="/tarifas-2024"
                    element={renderPrivateRoute(<Tarifario />, {
                      title: 'Ruta utilitaria | Elier Loya',
                      description: 'Ruta utilitaria con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/hero-banner"
                    element={renderPrivateRoute(<HeroBanner />, {
                      title: 'Vista privada | Elier Loya',
                      description: 'Vista interna con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/portafolio"
                    element={renderPublicAliasRoute(<Portafolio />, {
                      route: '/portafolio',
                      title: getRouteSeoPolicy('/portafolio')?.title,
                      description: getRouteSeoPolicy('/portafolio')?.description,
                    })}
                  />
                  <Route
                    path="/sobre-mi"
                    element={renderPublicAliasRoute(<SobreMi />, {
                      route: '/sobre-mi',
                      title: getRouteSeoPolicy('/sobre-mi')?.title,
                      description: getRouteSeoPolicy('/sobre-mi')?.description,
                    })}
                  />
                  <Route
                    path="/servicios"
                    element={renderPublicAliasRoute(<Servicios />, {
                      route: '/servicios',
                      title: getRouteSeoPolicy('/servicios')?.title,
                      description: getRouteSeoPolicy('/servicios')?.description,
                    })}
                  />
                  <Route
                    path="/blog"
                    element={renderPublicAliasRoute(<Blog />, {
                      route: '/blog',
                      title: getRouteSeoPolicy('/blog')?.title,
                      description: getRouteSeoPolicy('/blog')?.description,
                    })}
                  />
                  <Route
                    path="/entradas/2408_IA_Transforma_ecommerce"
                    element={renderPrivateRoute(<InternalRoutePlaceholder />, {
                      title: 'Contenido privado | Elier Loya',
                      description: 'Contenido interno con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/contacto"
                    element={renderPublicAliasRoute(<Contacto />, {
                      route: '/contacto',
                      title: getRouteSeoPolicy('/contacto')?.title,
                      description: getRouteSeoPolicy('/contacto')?.description,
                    })}
                  />
                  <Route
                    path="/cotizacion/:id"
                    element={renderPrivateRoute(<ExternalRedirect />, {
                      title: 'Ruta privada | Elier Loya',
                      description: 'Ruta privada con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/mockup/:id"
                    element={renderPrivateRoute(<InternalRoutePlaceholder />, {
                      title: 'Ruta privada | Elier Loya',
                      description: 'Ruta privada con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/proyecto/:token"
                    element={renderPrivateRoute(<ClientSpace />, {
                      title: 'Espacio de cliente | Elier Loya',
                      description: 'Espacio de cliente con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/client-demo"
                    element={renderPrivateRoute(<InternalRoutePlaceholder />, {
                      title: 'Ruta de demostracion | Elier Loya',
                      description: 'Demostracion interna con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route
                    path="/admin/leads"
                    element={renderPrivateRoute(<AdminLeads />, {
                      title: 'Panel interno | Elier Loya',
                      description: 'Panel interno con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route
                    path="/aionlabs"
                    element={renderPublicAliasRoute(<AionLabs />, {
                      route: '/aionlabs',
                      title: getRouteSeoPolicy('/aionlabs')?.title,
                      description: getRouteSeoPolicy('/aionlabs')?.description,
                    })}
                  />
                  <Route
                    path="/sites"
                    element={renderPrivateRoute(<InternalRoutePlaceholder />, {
                      title: 'Vista utilitaria | Elier Loya',
                      description: 'Vista interna con acceso controlado y sin indexacion publica.'
                    })}
                  />
                </Routes>
              </Suspense>
              <Footer />
              <LocalizedScrollToTop onClick={scrollToTop} />
              <ChatModal />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
