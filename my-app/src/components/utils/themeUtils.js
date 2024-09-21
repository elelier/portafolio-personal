// src/utils/themeUtils.js
// import { getCurrentTheme, setTheme, toggleTheme } from '../utils/themeUtils';

export function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
}

export function getCurrentTheme() {
    return localStorage.getItem('theme') || getSystemTheme();
}

export function initializeTheme() {
    const savedTheme = getCurrentTheme();
    setTheme(savedTheme);
}

export function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    return newTheme;
}

// Optional: Add an event listener for system theme changes
export function addSystemThemeListener(callback) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener((e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        callback(newTheme);
    });
}