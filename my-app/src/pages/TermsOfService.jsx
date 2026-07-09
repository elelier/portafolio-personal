import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { getRouteSeoPolicy } from '../config/routeSeoPolicy';
import '../styles/LegalPages.css';

const OG_IMAGE = 'https://elelier.com/static/media/eleliercom.ced5bb90383175580555.png';

const content = {
  es: {
    seoTitle: 'Condiciones del Servicio | Elier Loya',
    seoDescription: 'Condiciones del servicio y términos de uso aplicables a elelier.com, su contenido, formularios y posibles contrataciones.',
    seoKeywords: 'términos del servicio, condiciones del servicio, elelier, servicios digitales, consultoría',
    seoPath: '/terms-of-service',
    eyebrow: 'Términos',
    title: 'Condiciones del Servicio',
    effectiveDate: 'Fecha de entrada en vigor: 21 de marzo de 2026',
    intro: 'Estas condiciones regulan el acceso y uso de elelier.com, así como las interacciones iniciales relacionadas con servicios, contenidos, formularios, agenda y materiales publicados en este sitio.',
    sections: [
      {
        title: '1. Aceptación de los términos',
        body: [
          'Al navegar, utilizar o interactuar con este sitio aceptas estas condiciones. Si no estás de acuerdo, debes abstenerte de usar el sitio.'
        ]
      },
      {
        title: '2. Objeto del sitio',
        body: [
          'elelier.com funciona como portafolio profesional, escaparate comercial e informativo y canal de contacto para servicios de consultoría, estrategia, automatización, desarrollo digital, optimización de operaciones y proyectos relacionados.'
        ]
      },
      {
        title: '3. Uso permitido',
        body: [
          'Puedes utilizar el sitio con fines informativos, de evaluación comercial o de contacto legítimo. No debes usarlo para actividades ilícitas, abusivas, fraudulentas, automatización maliciosa, scraping no autorizado o intentos de afectar su seguridad o disponibilidad.'
        ]
      },
      {
        title: '4. Información publicada',
        body: [
          'Se busca que la información del sitio sea útil y actualizada, pero puede contener cambios, errores, material desactualizado o elementos sujetos a revisión. Nada en este sitio constituye una garantía absoluta de resultados, disponibilidad permanente o compatibilidad universal.'
        ]
      },
      {
        title: '5. Solicitudes, formularios y agenda',
        body: [
          'Si envías formularios, mensajes o solicitudes de agenda, aceptas proporcionar información veraz y suficiente para atender tu requerimiento. El envío de una solicitud no crea por sí mismo una relación contractual definitiva ni obliga a aceptar un proyecto.'
        ]
      },
      {
        title: '6. Servicios profesionales',
        body: [
          'Cualquier servicio profesional ofrecido o discutido a través del sitio estará sujeto, en su caso, a propuestas, alcances, tiempos, precios y acuerdos específicos por separado. Salvo que exista un acuerdo expreso, el contenido del sitio es solo informativo y preliminar.'
        ]
      },
      {
        title: '7. Propiedad intelectual',
        body: [
          'Los textos, diseños, marcas, imágenes, estructura del sitio y demás contenidos, salvo que se indique lo contrario, pertenecen a su titular o se usan con autorización. No se permite reproducir, redistribuir o explotar el contenido sin autorización previa cuando así resulte aplicable.'
        ]
      },
      {
        title: '8. Herramientas de terceros',
        body: [
          'El sitio puede depender de servicios de terceros como infraestructura, analítica, etiquetas, hosting, automatización o componentes de software, incluyendo servicios de Google. La disponibilidad o comportamiento de esos servicios puede afectar ciertas funciones del sitio sin que ello implique responsabilidad directa por fallas externas.'
        ]
      },
      {
        title: '9. Limitación de responsabilidad',
        body: [
          'En la máxima medida permitida por la ley, el uso del sitio es bajo tu propio riesgo. No se garantiza que el sitio esté libre de errores, interrupciones o vulnerabilidades, ni que satisfaga una necesidad específica en todo momento.'
        ]
      },
      {
        title: '10. Enlaces externos',
        body: [
          'Este sitio puede incluir enlaces a plataformas o recursos externos. Esos sitios operan bajo sus propios términos y políticas, por lo que conviene revisarlos antes de usarlos.'
        ]
      },
      {
        title: '11. Privacidad',
        body: [
          'El tratamiento de datos personales relacionado con este sitio se describe en la Política de Privacidad publicada en elelier.com. Al usar el sitio, reconoces también dicha política.'
        ]
      },
      {
        title: '12. Modificaciones',
        body: [
          'Estas condiciones pueden actualizarse en cualquier momento para reflejar cambios legales, técnicos o comerciales. La versión vigente será la publicada en esta página.'
        ]
      },
      {
        title: '13. Contacto',
        body: [
          'Para consultas sobre estas condiciones o sobre una posible contratación, utiliza los canales de contacto mostrados en el sitio.'
        ]
      }
    ]
  },
  en: {
    seoTitle: 'Terms of Service | Elier Loya',
    seoDescription: 'Terms of service and website use conditions applicable to elelier.com, including content, forms, scheduling, and potential service engagements.',
    seoKeywords: 'terms of service, website terms, digital services, consulting, elelier',
    seoPath: '/terms-of-service',
    eyebrow: 'Terms',
    title: 'Terms of Service',
    effectiveDate: 'Effective date: March 21, 2026',
    intro: 'These terms govern access to and use of elelier.com, as well as initial interactions related to services, content, forms, scheduling, and materials published on this website.',
    sections: [
      {
        title: '1. Acceptance of terms',
        body: [
          'By browsing, using, or interacting with this website, you agree to these terms. If you do not agree, you should refrain from using the site.'
        ]
      },
      {
        title: '2. Website purpose',
        body: [
          'elelier.com operates as a professional portfolio, commercial and informational showcase, and contact channel for consulting, strategy, automation, digital development, operations optimization, and related projects.'
        ]
      },
      {
        title: '3. Permitted use',
        body: [
          'You may use the site for informational purposes, commercial evaluation, or legitimate contact. You must not use it for unlawful, abusive, fraudulent activity, malicious automation, unauthorized scraping, or attempts to affect its security or availability.'
        ]
      },
      {
        title: '4. Published information',
        body: [
          'The site information is intended to be useful and current, but it may change and may contain errors, outdated material, or items under revision. Nothing on this site constitutes an absolute guarantee of results, continuous availability, or universal compatibility.'
        ]
      },
      {
        title: '5. Requests, forms, and scheduling',
        body: [
          'If you submit forms, messages, or scheduling requests, you agree to provide truthful and sufficient information so your request can be handled. Submitting a request does not by itself create a binding contractual relationship or an obligation to accept a project.'
        ]
      },
      {
        title: '6. Professional services',
        body: [
          'Any professional service offered or discussed through the website will, where applicable, be subject to separate proposals, scope definitions, timelines, pricing, and agreements. Unless expressly agreed otherwise, the website content is informational and preliminary only.'
        ]
      },
      {
        title: '7. Intellectual property',
        body: [
          'Texts, designs, marks, images, website structure, and other content, unless otherwise stated, belong to their owner or are used with permission. Reproduction, redistribution, or exploitation of the content is not permitted without prior authorization where applicable.'
        ]
      },
      {
        title: '8. Third-party tools',
        body: [
          'The website may rely on third-party services such as infrastructure, analytics, tags, hosting, automation, or software components, including Google services. The availability or behavior of those services may affect certain site functions without creating direct responsibility for external failures.'
        ]
      },
      {
        title: '9. Limitation of liability',
        body: [
          'To the fullest extent permitted by law, use of the website is at your own risk. The site is not guaranteed to be error-free, uninterrupted, or free of vulnerabilities, nor to satisfy any specific need at all times.'
        ]
      },
      {
        title: '10. External links',
        body: [
          'This website may include links to third-party platforms or resources. Those sites operate under their own terms and policies, which should be reviewed before use.'
        ]
      },
      {
        title: '11. Privacy',
        body: [
          'The handling of personal data related to this website is described in the Privacy Policy published on elelier.com. By using the site, you also acknowledge that policy.'
        ]
      },
      {
        title: '12. Modifications',
        body: [
          'These terms may be updated at any time to reflect legal, technical, or commercial changes. The current version will be the one published on this page.'
        ]
      },
      {
        title: '13. Contact',
        body: [
          'For questions about these terms or a potential engagement, please use the contact channels listed on the website.'
        ]
      }
    ]
  }
};

function TermsOfService() {
  const { language } = useLanguage();
  const page = content[language] || content.es;
  const routePolicy = getRouteSeoPolicy('/terms-of-service');

  return (
    <main className="legal-page">
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        pathname={page.seoPath}
        canonicalPath={routePolicy?.canonicalPath}
        robots={routePolicy?.robots}
        keywords={page.seoKeywords}
        image={OG_IMAGE}
        imageAlt={page.title}
        locale={language === 'en' ? 'en_US' : 'es_MX'}
      />
      <div className="legal-page__container">
        <span className="legal-page__eyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        <p className="legal-page__effective-date">{page.effectiveDate}</p>
        <p className="legal-page__intro">{page.intro}</p>

        <div className="legal-page__sections">
          {page.sections.map((section) => (
            <section key={section.title} className="legal-page__section">
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default TermsOfService;
