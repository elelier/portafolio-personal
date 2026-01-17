// src/utils/translations.js

export const translations = {
    en: {
        // Títulos y encabezados
        pageTitle: "Personal Portfolio",
        heroTitle: "Welcome to My Portfolio",
        aboutMeTitle: "About Me",
        skillsTitle: "My Skills",
        projectsTitle: "My Projects",
        servicesTitle: "My Services",
        contactTitle: "Contact Me",

        // Contenido de secciones
        aboutMeContent: "I'm a digital transformation specialist with experience in...",
        skillsList: ["Web Development", "Digital Strategy", "Project Management", "Data Analysis"],
        servicesList: ["Digital Transformation Consulting", "Web Development", "Process Optimization", "Data-Driven Decision Making"],

        // Formulario de contacto
        nameplaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        messagePlaceholder: "Your Message",
        sendButton: "Send Message",

        // Configuración
        settingsTitle: "Settings",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        systemTheme: "System Theme",

        // Chat widget
        chatWidgetPlaceholder:"Ask me about Elier!",
        chatWidgetTitle: "Want a Chatbot?",
        chatWidgetBranding: "Want a chatbot for you?",
        chatButtonText: "Hello!",
        chatGreetingMessage: `
Hello! I'm a <b>Chatbot developed by <a href="https://elelier.com" target="_blank">Elier Loya Mata</a></b> for <b><a href="#hero-banner">this portfolio</a></b>.
<br><br>
<b>How can I assist you today?</b>
<ul style="color: #f6f9fc; padding-left: 20px;">
  <li><a href="#portafolio" onclick="scrollToSection('portafolio'); return false;">See Projects</a></li>
  <li><a href="#servicios" onclick="scrollToSection('servicios'); return false;">Know Services</a></li>
  <li><a href="#contacto" onclick="scrollToSection('contacto'); return false;">Contact Me</a></li>
  <li><a href="#sobre-mi" onclick="scrollToSection('sobre-mi'); return false;">More About Me</a></li>
</ul>
<br>
Explore <a href="#hero-banner" onclick="scrollToSection('hero-banner'); return false;">my website</a> for more information.
<br><br>
I'm here to help you find what you need!
<br><br>
<b><a href="#" onclick="changeLanguage('es'); return false;">Cambiar a Español</a></b>
        `,

        // Footer
        footerText: "© 2024 Your Name. All rights reserved.",

        // Otros elementos
        languageToggle: "EN",

        // Página de agradecimiento
        thanksTitle: "Session Confirmed",
        thanksDescription: "Thank you for scheduling your Express Diagnosis. We sent you the confirmation by email. You can close this tab or return to elelier.com.",
        thanksButton: "Back to elelier.com",

        // Lead Qualifier
        leadQualifierTitle: "Express Diagnosis",
        leadQualifierSubtitle: "Tell me your challenge and I'll tell you the next step.",
        leadName: "Name",
        leadEmail: "Email",
        leadCompanyType: "Company Type",
        leadProblem: "Challenge Type",
        leadBudget: "Budget",
        leadUrgency: "Urgency",
        leadSelectOption: "Select an option",
        leadFreelancer: "Freelancer",
        leadStartup: "Startup",
        leadPyme: "SME",
        leadEnterprise: "Enterprise",
        leadOperacion: "Operations",
        leadProducto: "Product",
        leadIA: "AI",
        leadWeb: "Web",
        leadSubmitButton: "Send diagnosis",
        leadAnalyzing: "Analyzing...",
        leadCalendarOpened: "Calendar opened ✅",
        leadError: "An error occurred. Try again later.",
        leadTooFast: "You're sending too fast. Try in a few minutes.",
        leadHighTitle: "✅ Ready for call",
        leadHighDescription: "We opened the calendar in a new tab. When you finish, you can come back here.",
        leadHighAction: "Open manually",
        leadMidTitle: "A couple more details",
        leadMidDescription: "Answer these questions to refine the diagnosis.",
        leadMidSubmitButton: "Send details",
        leadMidProcessing: "Processing...",
        leadLowTitle: "Recommended resource",
        leadLowDescription: "We leave you a resource to move forward with clarity.",
        leadLowAction: "View resource",
        leadSuccessGeneric: "Thank you. We will show you the next step.",
        leadFollowupMetric: "What is your main metric to move?",
        leadFollowupData: "Do you have data available?",
        leadFollowupDecision: "Who decides?",
        leadFollowupConversion: "conversion",
        leadFollowupCosts: "costs",
        leadFollowupLeadTime: "lead time",
        leadFollowupRetention: "retention",
        leadFollowupOther: "other",
        leadFollowupYes: "yes",
        leadFollowupNo: "no",
        leadFollowupMe: "me",
        leadFollowupPartner: "partner",
        leadFollowupBoard: "board"
    },
    es: {
        // Títulos y encabezados
        pageTitle: "Portafolio Personal",
        heroTitle: "Bienvenido a Mi Portafolio",
        aboutMeTitle: "Sobre Mí",
        skillsTitle: "Mis Habilidades",
        projectsTitle: "Mis Proyectos",
        servicesTitle: "Mis Servicios",
        contactTitle: "Contáctame",

        // Contenido de secciones
        aboutMeContent: "Soy un especialista en transformación digital con experiencia en...",
        skillsList: ["Desarrollo Web", "Estrategia Digital", "Gestión de Proyectos", "Análisis de Datos"],
        servicesList: ["Consultoría en Transformación Digital", "Desarrollo Web", "Optimización de Procesos", "Toma de Decisiones Basada en Datos"],

        // Formulario de contacto
        nameplaceholder: "Tu Nombre",
        emailplaceholder: "Tu Email",
        messageplaceholder: "Tu Mensaje",
        sendButton: "Enviar Mensaje",

        // Configuración
        settingsTitle: "Configuración",
        lightMode: "Modo Claro",
        darkMode: "Modo Oscuro",
        systemTheme: "Tema del Sistema",

        // Chat widget
        chatWidgetPlaceholder:"Pregúntame sobre Elier!",
        chatWidgetTitle: "¿Quieres un Chatbot?",
        chatWidgetBranding: "¿Quieres un chatbot para ti?",
        chatButtonText: "¡HOLA!",
        chatGreetingMessage: `
Hola! Soy un <b>Chatbot desarrollado por <a href="https://elelier.com" target="_blank">Elier Loya Mata</a></b> para <b><a href="#hero-banner">este portafolio</a></b>.
<br><br>
<b>¿Cómo puedo asistirte hoy?</b>
<ul style="color: #f6f9fc; padding-left: 20px;">
  <li><a href="#portafolio" onclick="scrollToSection('portafolio'); return false;">Ver Proyectos</a></li>
  <li><a href="#servicios" onclick="scrollToSection('servicios'); return false;">Conocer Servicios</a></li>
  <li><a href="#contacto" onclick="scrollToSection('contacto'); return false;">Contáctame</a></li>
  <li><a href="#sobre-mi" onclick="scrollToSection('sobre-mi'); return false;">Más Sobre Mi</a></li>
</ul>
<br>
Explora <a href="#hero-banner" onclick="scrollToSection('hero-banner'); return false;">mi sitio web</a> para más información.
<br><br>
¡Estoy aquí para ayudarte a encontrar lo que necesitas!
<br><br>
<b><a href="#" onclick="changeLanguage('en'); return false;">Change to English</a></b>
        `,

        // Footer
        footerText: "© 2024 Tu Nombre. Todos los derechos reservados.",

        // Otros elementos
        languageToggle: "ES",

        // Página de agradecimiento
        thanksTitle: "Sesión confirmada",
        thanksDescription: "Gracias por agendar tu Diagnóstico Express. Te enviamos la confirmación por email. Puedes cerrar esta pestaña o volver a elelier.com.",
        thanksButton: "Volver a elelier.com",

        // Lead Qualifier
        leadQualifierTitle: "Diagnóstico Express",
        leadQualifierSubtitle: "Cuéntame tu reto y te digo el siguiente paso.",
        leadName: "Nombre",
        leadEmail: "Email",
        leadCompanyType: "Tipo de empresa",
        leadProblem: "Tipo de reto",
        leadBudget: "Presupuesto",
        leadUrgency: "Urgencia",
        leadSelectOption: "Selecciona una opción",
        leadFreelancer: "Freelancer",
        leadStartup: "Startup",
        leadPyme: "Pyme",
        leadEnterprise: "Enterprise",
        leadOperacion: "Operación",
        leadProducto: "Producto",
        leadIA: "IA",
        leadWeb: "Web",
        leadSubmitButton: "Enviar diagnóstico",
        leadAnalyzing: "Analizando...",
        leadCalendarOpened: "Calendario abierto ✅",
        leadError: "Ocurrió un error. Intenta más tarde.",
        leadTooFast: "Estás enviando muy rápido. Intenta en unos minutos.",
        leadHighTitle: "✅ Listo para llamada",
        leadHighDescription: "Abrimos el calendario en una pestaña nueva. Cuando termines, puedes volver aquí.",
        leadHighAction: "Abrir manualmente",
        leadMidTitle: "Un par de detalles más",
        leadMidDescription: "Responde estas preguntas para afinar el diagnóstico.",
        leadMidSubmitButton: "Enviar detalles",
        leadMidProcessing: "Procesando...",
        leadLowTitle: "Recurso recomendado",
        leadLowDescription: "Te dejamos un recurso para avanzar con claridad.",
        leadLowAction: "Ver recurso",
        leadSuccessGeneric: "Gracias. Te mostraremos el siguiente paso.",
        leadFollowupMetric: "¿Cuál es tu principal métrica a mover?",
        leadFollowupData: "¿Tienes datos disponibles?",
        leadFollowupDecision: "¿Quién decide?",
        leadFollowupConversion: "conversión",
        leadFollowupCosts: "costos",
        leadFollowupLeadTime: "lead time",
        leadFollowupRetention: "retención",
        leadFollowupOther: "otro",
        leadFollowupYes: "sí",
        leadFollowupNo: "no",
        leadFollowupMe: "yo",
        leadFollowupPartner: "partner",
        leadFollowupBoard: "board"
    }
};

export function getCurrentLanguage() {
    return localStorage.getItem('language') || getBrowserLanguage();
}

export function getBrowserLanguage() {
    return navigator.language.startsWith('es') ? 'es' : 'en';
}

export function changeLanguage(newLanguage) {
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
    updateDynamicContent(newLanguage);
    // You might want to dispatch a custom event here to notify other parts of your app
    const event = new CustomEvent('languageChanged', { detail: { language: newLanguage } });
    document.dispatchEvent(event);
}

export function updateDynamicContent(language) {
    document.querySelectorAll('[data-en], [data-es]').forEach((element) => {
        element.textContent = element.getAttribute(`data-${language}`) || element.getAttribute('data-en');
    });

    document.querySelectorAll('input[placeholder]').forEach((input) => {
        const key = input.getAttribute('data-placeholder-key');
        if (key && translations[language][key]) {
            input.placeholder = translations[language][key];
        }
    });
};