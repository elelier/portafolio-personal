import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import React, { useEffect, lazy, Suspense } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './styles/App.css';
import './styles/components/UxSmallFixes.css';
import SEO from './components/SEO';
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
import './utils/testGemini';

if (process.env.NODE_ENV === 'development') {
  import('./debug-gemini');
}

const Blog = lazy(() => import('./components/Blog'));

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
    { key: 'sobre-mi', Component: SobreMi },
    { key: 'portafolio', Component: Portafolio },
    { key: 'servicios', Component: Servicios },
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

  return (
    <HelmetProvider>
      <LanguageProvider initialLanguage={initialLanguage}>
        <ThemeProvider>
          <Router>
            <div className="App">
              <SettingsMenu />
              <SEO
                title="Transformo procesos complicados en soluciones que realmente funcionan. | Elier Loya"
                description="Transformo procesos complicados en soluciones que realmente funcionan. Especialista en operaciones, producto digital e IA aplicada."
              />
              <Navegacion />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<>{homeSections.map(({ key, Component }, index) => (<Component key={key} style={getSectionTransitionStyle(index)} />))}</>} />
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
                  <Route path="/portafolio" element={<Portafolio />} />
                  <Route path="/sobre-mi" element={<SobreMi />} />
                  <Route path="/servicios" element={<Servicios />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route
                    path="/entradas/2408_IA_Transforma_ecommerce"
                    element={renderPrivateRoute(<InternalRoutePlaceholder />, {
                      title: 'Contenido privado | Elier Loya',
                      description: 'Contenido interno con acceso controlado y sin indexacion publica.'
                    })}
                  />
                  <Route path="/contacto" element={<Contacto />} />
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
                  <Route path="/aionlabs" element={<AionLabs />} />
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
              <FloatingButton icon={<FaArrowUp />} onClick={scrollToTop} ariaLabel="Volver arriba" />
              <ChatModal />
            </div>
          </Router>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
