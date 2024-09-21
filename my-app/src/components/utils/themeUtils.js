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
    if (savedTheme === 'system' || !savedTheme) {
      return getSystemTheme();
    }
    return savedTheme;
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