import securityManager from '../services/securityService';

async function testSecuritySystem() {
  // Probar el hash de los passcodes
  const passcodes = {
    arqidia: process.env.REACT_APP_PASSCODE_ARQIDIA,
    hqcontrol: process.env.REACT_APP_PASSCODE_HQCONTROL,
    andamios: process.env.REACT_APP_PASSCODE_ANDAMIOS
  };

  console.log('Probando sistema de seguridad...\n');

  // Generar hashes
  for (const [clientId, passcode] of Object.entries(passcodes)) {
    const hash = await securityManager.hashPasscode(passcode);
    console.log(`Cliente: ${clientId}`);
    console.log(`Passcode original: ${passcode}`);
    console.log(`Hash generado: ${hash}`);
    
    // Probar verificación
    const isValid = await securityManager.verifyPasscode(passcode, hash);
    console.log(`Verificación correcta: ${isValid ? '✅' : '❌'}\n`);
  }

  // Probar token de verificación
  const token = await securityManager.generateVerificationToken('arqidia', passcodes.arqidia);
  console.log('Token de verificación generado:', token);
}

export { testSecuritySystem };
