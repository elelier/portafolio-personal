const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Rutas de archivos
const CLIENT_DATA_PATH = path.join(__dirname, '../../src/data/clientProjects.json');
const HASHED_PASSCODES_PATH = path.join(__dirname, '../../src/config/hashedPasscodes.js');

// Obtiene los passcodes de variables de entorno
const getPasscodeFromEnv = (token) => {
    const envVar = `REACT_APP_PASSCODE_${token.toUpperCase()}`;
    return process.env[envVar];
};

// Lee los datos de los clientes
async function generateHashedPasscodes() {
  try {
    // Lee el archivo de datos de clientes
    const clientData = JSON.parse(fs.readFileSync(CLIENT_DATA_PATH, 'utf8'));
    const hashedPasscodes = {};    // Genera los hashes para cada cliente
    for (const [token, data] of Object.entries(clientData)) {      const passcode = getPasscodeFromEnv(token);      if (passcode) {
        const crypto = require('crypto');
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHash('sha256')
          .update(passcode + salt)
          .digest('hex');
        hashedPasscodes[token] = `${hash}$salt$3.0$${salt}`;
      } else {
        console.log(`ℹ️ Cliente ${token} sin passcode en .env - omitiendo`);
      }
    }

    // Guarda los datos de clientes actualizados (sin passcodes)
    fs.writeFileSync(CLIENT_DATA_PATH, JSON.stringify(clientData, null, 2), 'utf8');

    // Genera el archivo de hashes
    const hashedPasscodesContent = `// ARCHIVO GENERADO AUTOMÁTICAMENTE - NO EDITAR MANUALMENTE
// Generado el: ${new Date().toISOString()}

export const hashedPasscodes = ${JSON.stringify(hashedPasscodes, null, 2)};
`;

    fs.writeFileSync(HASHED_PASSCODES_PATH, hashedPasscodesContent, 'utf8');
    console.log('✅ Datos de clientes procesados exitosamente');
    console.log(`📁 Archivo de hashes guardado en: ${HASHED_PASSCODES_PATH}`);

  } catch (error) {
    console.error('❌ Error al generar los datos:', error);
    process.exit(1);
  }
}

// Ejecuta el script
generateHashedPasscodes();
