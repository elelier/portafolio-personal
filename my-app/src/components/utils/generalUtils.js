// src/utils/generalUtils.js

// import { scrollToSection, loadExternalScripts, isMobile } from '../utils/generalUtils';

export function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

export function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export async function loadExternalScripts() {
    try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/typed.js@2.0.12');
        await loadScript('https://unpkg.com/@buildshipapp/chat-widget@^1');
        console.log('All external scripts loaded successfully');
    } catch (error) {
        console.error('Error loading external scripts:', error);
    }
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}