// themeUtils.js
export function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  export function setTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }
  
  export function getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'system') {
      return savedTheme; // Usa el tema guardado si existe y no es 'system'
    }
    // Si es 'system', no hay nada guardado, o el valor guardado es inválido,
    // el default es 'dark'. El usuario aún puede seleccionar 'system' explícitamente
    // para que siga las preferencias del navegador.
    return 'dark'; // Default general a 'dark'
  }
  
  export function initializeTheme() {
    const savedTheme = getCurrentTheme();
    setTheme(savedTheme);
  }
  
  // Optional: Add an event listener for system theme changes
  export function addSystemThemeListener(callback) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener((e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      callback(newTheme);
    });
  }