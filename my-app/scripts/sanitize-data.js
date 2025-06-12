const fs = require('fs');
const path = require('path');

// Configuración de sanitización
const SENSITIVE_FIELDS = [
    'passcode',
    'cliente',
    'email',
    'telefono',
    'direccion'
];

const PATHS_TO_SANITIZE = [
    '../src/data/clientProjects.json'
];

/**
 * Sanitiza un objeto eliminando o transformando datos sensibles
 * @param {Object} obj - Objeto a sanitizar
 * @returns {Object} - Objeto sanitizado
 */
function sanitizeObject(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => sanitizeObject(item));
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
        // Si es un campo sensible, lo transformamos o eliminamos
        if (SENSITIVE_FIELDS.includes(key)) {
            if (key === 'passcode') {
                sanitized[key] = '[REMOVED]';
            } else if (key === 'cliente') {
                sanitized[key] = 'Cliente Ejemplo';
            } else {
                continue; // Omitir el campo completamente
            }
        } else if (typeof value === 'object' && value !== null) {
            // Recursivamente sanitizar objetos anidados
            sanitized[key] = sanitizeObject(value);
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
}

/**
 * Procesa un archivo JSON, lo sanitiza y guarda una versión pública
 * @param {string} filePath - Ruta al archivo JSON
 */
function sanitizeFile(filePath) {
    try {
        const fullPath = path.resolve(__dirname, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(content);
        
        // Sanitizar datos
        const sanitized = sanitizeObject(data);
        
        // Crear nombre para archivo público
        const publicPath = fullPath.replace('.json', '.public.json');
        
        // Guardar versión sanitizada
        fs.writeFileSync(
            publicPath,
            JSON.stringify(sanitized, null, 2)
        );
        
        console.log(`✅ Sanitizado: ${path.basename(filePath)} → ${path.basename(publicPath)}`);
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error);
    }
}

// Procesar todos los archivos configurados
console.log('🔒 Iniciando proceso de sanitización...');
PATHS_TO_SANITIZE.forEach(sanitizeFile);
console.log('✨ Proceso completado');
