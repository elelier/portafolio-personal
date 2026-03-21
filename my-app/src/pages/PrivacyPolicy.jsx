import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import '../styles/LegalPages.css';

const OG_IMAGE = 'https://elelier.com/static/media/eleliercom.ced5bb90383175580555.png';

const content = {
  es: {
    seoTitle: 'Política de Privacidad | Elier Loya',
    seoDescription: 'Política de privacidad de elelier.com sobre datos personales, cookies, Google Analytics 4, Google Tag Manager, formularios de contacto y derechos de privacidad.',
    seoKeywords: 'privacidad, política de privacidad, cookies, google analytics, google tag manager, ARCO, elelier',
    seoPath: '/privacy-policy',
    eyebrow: 'Privacidad',
    title: 'Política de Privacidad',
    effectiveDate: 'Fecha de entrada en vigor: 21 de marzo de 2026',
    intro: 'En elelier.com se respeta la privacidad de quienes visitan este sitio. Esta política explica qué datos podrían recopilarse, cómo se usan, qué herramientas de terceros participan y qué opciones tienes como visitante o posible cliente.',
    sections: [
      {
        title: '1. Responsable del sitio',
        body: [
          'Este sitio es operado por Elier Loya como portafolio profesional, escaparate de servicios y canal de contacto para posibles colaboraciones, consultoría, desarrollo de soluciones digitales y proyectos relacionados.'
        ]
      },
      {
        title: '2. Qué información puede recopilarse',
        body: [
          'Dependiendo de cómo interactúes con el sitio, puede recopilarse información como tu nombre, correo electrónico, empresa, mensaje, preferencias de contacto o cualquier dato que decidas compartir voluntariamente mediante formularios, agenda o mensajes directos.',
          'También puede recopilarse información técnica y de uso, por ejemplo: dirección IP aproximada, tipo de dispositivo, navegador, sistema operativo, idioma, páginas visitadas, tiempos de interacción, origen de tráfico, eventos de navegación y cookies o identificadores similares.'
        ]
      },
      {
        title: '3. Finalidades del tratamiento',
        body: [
          'Los datos se usan para responder mensajes, evaluar oportunidades de trabajo, agendar llamadas, mejorar la experiencia del sitio, medir rendimiento de contenido y servicios, detectar fallas técnicas y entender de forma agregada cómo se utiliza la página.',
          'No se venden datos personales a terceros.'
        ]
      },
      {
        title: '4. Herramientas y servicios de terceros actualmente utilizados',
        body: [
          'De acuerdo con la configuración actual del sitio, elelier.com carga Google Tag Manager y Google Analytics 4. Estas herramientas ayudan a medir visitas, navegación, rendimiento general del sitio y eventos de interacción.',
          'El sitio también puede apoyarse en servicios de infraestructura, hosting, CDN, librerías de terceros o plataformas cloud relacionadas con la operación técnica de la página. Si en el futuro se integra Google Cloud u otro proveedor adicional para backend, formularios, automatizaciones o almacenamiento, esta política podrá actualizarse para reflejarlo.'
        ]
      },
      {
        title: '5. Cookies, identificadores y tecnologías similares',
        body: [
          'Este sitio puede usar cookies, almacenamiento local del navegador, etiquetas de seguimiento y tecnologías similares para recordar preferencias, medir tráfico y mejorar funcionalidades.',
          'En el caso de Google Analytics 4 y Google Tag Manager, pueden procesarse identificadores de navegador, datos de navegación, páginas vistas, interacción con contenido, tiempo en el sitio, origen de tráfico y datos técnicos del dispositivo y navegador.'
        ]
      },
      {
        title: '6. Cuándo se cargan estas herramientas',
        body: [
          'Con la implementación actual del sitio, Google Tag Manager y Google Analytics 4 se cargan al entrar a la página, es decir, antes de un mecanismo formal de consentimiento granular.',
          'Si necesitas un esquema de cumplimiento más estricto para ciertas jurisdicciones, esta implementación debería complementarse con un banner o plataforma de gestión de consentimiento antes de considerar suficiente la postura de privacidad del sitio.'
        ]
      },
      {
        title: '7. Base legal y consentimiento',
        body: [
          'Cuando la ley lo requiera, el tratamiento se basa en tu consentimiento, en la ejecución de medidas precontractuales solicitadas por ti o en el interés legítimo de operar, asegurar y mejorar este sitio y los servicios ofrecidos.',
          'Para visitantes ubicados en regiones con requisitos de consentimiento más estrictos, puede ser necesario implementar controles adicionales antes de activar analítica no esencial.'
        ]
      },
      {
        title: '8. Cómo limitar o desactivar el tracking',
        body: [
          'Puedes limitar o bloquear cookies desde la configuración de tu navegador. También puedes usar modos de navegación privados, extensiones de bloqueo o herramientas de rechazo de analítica cuando estén disponibles.',
          'Ten presente que algunas funciones, métricas o experiencias del sitio podrían verse afectadas si desactivas almacenamiento local, scripts o cookies.'
        ]
      },
      {
        title: '9. Conservación y compartición de datos',
        body: [
          'La información se conserva solo durante el tiempo razonablemente necesario para atender tu solicitud, dar seguimiento comercial o cumplir obligaciones legales, fiscales, de seguridad o prevención de fraude.',
          'Los datos pueden compartirse con proveedores que apoyan la operación del sitio, siempre bajo una necesidad razonable de servicio, seguridad, alojamiento, comunicaciones, analítica o soporte técnico. También podrían revelarse si existe obligación legal o si es necesario para proteger derechos, seguridad o integridad del sitio.'
        ]
      },
      {
        title: '10. Seguridad',
        body: [
          'Se buscan medidas razonables para proteger la información contra acceso no autorizado, alteración, pérdida o uso indebido. Aun así, ningún sistema conectado a internet puede garantizar seguridad absoluta.'
        ]
      },
      {
        title: '11. Derechos de privacidad y ARCO',
        body: [
          'Puedes solicitar acceso, rectificación, cancelación u oposición respecto de los datos personales que hayas compartido directamente, así como pedir actualización o eliminación cuando resulte procedente, sujeto a límites legales y operativos aplicables.',
          'Si deseas ejercer derechos ARCO o hacer una consulta de privacidad, utiliza los medios de contacto publicados en elelier.com e indica claramente tu solicitud y la información necesaria para identificar tu caso.'
        ]
      },
      {
        title: '12. Menores de edad',
        body: [
          'Este sitio no está dirigido intencionalmente a menores de edad. Si se detecta el tratamiento no autorizado de datos de una persona menor de edad, se procurará eliminar la información correspondiente en un plazo razonable.'
        ]
      },
      {
        title: '13. Cambios a esta política',
        body: [
          'Esta política puede actualizarse para reflejar cambios legales, técnicos o de negocio. La versión vigente será la publicada en esta misma página.'
        ]
      },
      {
        title: '14. Contacto',
        body: [
          'Si tienes dudas sobre esta política o sobre el tratamiento de tus datos, utiliza los canales de contacto mostrados en elelier.com.'
        ]
      }
    ]
  },
  en: {
    seoTitle: 'Privacy Policy | Elier Loya',
    seoDescription: 'Privacy policy for elelier.com covering personal data, cookies, Google Analytics 4, Google Tag Manager, contact forms, and privacy rights.',
    seoKeywords: 'privacy policy, cookies, google analytics 4, google tag manager, privacy rights, elelier',
    seoPath: '/privacy-policy',
    eyebrow: 'Privacy',
    title: 'Privacy Policy',
    effectiveDate: 'Effective date: March 21, 2026',
    intro: 'At elelier.com, visitor privacy is taken seriously. This policy explains what data may be collected, how it may be used, which third-party tools are involved, and what options you have as a visitor or potential client.',
    sections: [
      {
        title: '1. Website operator',
        body: [
          'This website is operated by Elier Loya as a professional portfolio, service showcase, and contact channel for potential collaborations, consulting, digital solutions, and related projects.'
        ]
      },
      {
        title: '2. Information that may be collected',
        body: [
          'Depending on how you interact with the site, information such as your name, email address, company, message, contact preferences, or any other data you voluntarily share through forms, scheduling flows, or direct messages may be collected.',
          'Technical and usage data may also be collected, such as approximate IP address, device type, browser, operating system, language, visited pages, interaction times, traffic source, navigation events, and cookies or similar identifiers.'
        ]
      },
      {
        title: '3. Purposes of processing',
        body: [
          'Data may be used to respond to messages, evaluate work opportunities, schedule calls, improve the website experience, measure content and service performance, detect technical issues, and understand in aggregate how the site is used.',
          'Personal data is not sold to third parties.'
        ]
      },
      {
        title: '4. Third-party tools and services currently used',
        body: [
          'Based on the current website configuration, elelier.com loads Google Tag Manager (GTM-5KBGG57T) and Google Analytics 4 (G-J0EFBPH9P1). These tools help measure visits, navigation, overall website performance, and interaction events.',
          'The site may also rely on infrastructure, hosting, CDN services, third-party libraries, or cloud platforms related to technical website operations. If Google Cloud or another provider is later integrated for backend, forms, automations, or storage, this policy may be updated accordingly.'
        ]
      },
      {
        title: '5. Cookies, identifiers, and similar technologies',
        body: [
          'This site may use cookies, browser local storage, tracking tags, and similar technologies to remember preferences, measure traffic, and improve features.',
          'In the case of Google Analytics 4 and Google Tag Manager, browser identifiers, navigation data, page views, content interaction, time on site, traffic source, and technical device/browser data may be processed.'
        ]
      },
      {
        title: '6. When these tools are loaded',
        body: [
          'With the website\'s current implementation, Google Tag Manager and Google Analytics 4 are loaded when a visitor enters the site, meaning before any formal granular consent mechanism is presented.',

        ]
      },
      {
        title: '7. Legal basis and consent',
        body: [
          'Where required by law, processing is based on your consent, on pre-contractual steps requested by you, or on the legitimate interest of operating, securing, and improving this site and the services offered.',
          'For visitors in regions with stricter consent requirements, additional controls may be needed before enabling non-essential analytics.'
        ]
      },
      {
        title: '8. How to limit or disable tracking',
        body: [
          'You may limit or block cookies through your browser settings. You may also use private browsing modes, blocking extensions, or analytics opt-out tools when available.',
          'Please note that some website features, metrics, or user experience elements may be affected if local storage, scripts, or cookies are disabled.'
        ]
      },
      {
        title: '9. Retention and data sharing',
        body: [
          'Information is kept only for as long as reasonably necessary to address your request, follow up on business opportunities, or comply with applicable legal, tax, security, or fraud-prevention obligations.',
          'Data may be shared with providers supporting website operations where reasonably necessary for service delivery, security, hosting, communications, analytics, or technical support. Data may also be disclosed if legally required or if necessary to protect rights, safety, or the integrity of the website.'
        ]
      },
      {
        title: '10. Security',
        body: [
          'Reasonable measures are sought to protect information against unauthorized access, alteration, loss, or misuse. However, no internet-connected system can guarantee absolute security.'
        ]
      },
      {
        title: '11. Privacy rights',
        body: [
          'You may request access to, correction, updating, deletion of, or objection to personal data you have shared directly, subject to applicable legal and operational limitations.',
          'If you wish to exercise privacy rights, please use the contact channels listed on elelier.com and clearly identify your request and the information needed to locate your case.'
        ]
      },
      {
        title: '12. Children',
        body: [
          'This site is not intentionally directed to children. If unauthorized processing of a child\'s data is detected, reasonable efforts will be made to delete the relevant information.'
        ]
      },
      {
        title: '13. Changes to this policy',
        body: [
          'This policy may be updated to reflect legal, technical, or business changes. The current version will always be the one published on this page.'
        ]
      },
      {
        title: '14. Contact',
        body: [
          'If you have questions about this policy or about the handling of your data, please use the contact channels shown on elelier.com.'
        ]
      }
    ]
  }
};

function PrivacyPolicy() {
  const { language } = useLanguage();
  const page = content[language] || content.es;

  return (
    <main className="legal-page">
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        pathname={page.seoPath}
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

export default PrivacyPolicy;
