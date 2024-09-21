export function initializeSettings() {
    // Función para alternar la visibilidad del menú de configuración
    function toggleSettings() {
        const settingsMenu = document.getElementById('settings-menu');
        if (settingsMenu) {
            settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Función para alternar el tema
    function setActiveSetting(theme) {
        if (theme === 'light' || theme === 'dark') {
            localStorage.setItem('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
        } else if (theme === 'system') {
            setSystemTheme();
        }
    }

    // Función para obtener el tema del sistema
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Función para establecer el tema basado en la configuración del sistema
    function setSystemTheme() {
        const systemTheme = getSystemTheme();
        localStorage.setItem('theme', systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
    }

    // Función para cargar el tema guardado al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        setSystemTheme(); // Establecer el tema del sistema si no hay tema guardado
    }

    // Función para alternar el idioma

    // Configurar el idioma
    const language = localStorage.getItem('language') || 'en';
    document.querySelector('.language-toggle-button').textContent = language === 'es' ? 'ES' : 'EN';
    document.querySelector('.flag-image').src = `assets/files/flag-${language === 'es' ? 'mx' : 'us'}.png`;

    // Configura el botón de configuración
    document.querySelector('.settings-toggle').addEventListener('click', toggleSettings);
    document.querySelectorAll('.settings-option').forEach(option => {
        option.addEventListener('click', () => setActiveSetting(option.id));
    });
}
