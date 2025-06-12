/**
 * Servicio de autenticación para espacios de clientes
 */
class ClientAuthService {
  /**
   * Verifica el passcode de un cliente
   * @param {string} inputPasscode - Código ingresado por el usuario
   * @param {string} storedPasscode - Código almacenado (variable de entorno en desarrollo, hash en producción)
   * @returns {Promise<boolean>} - true si el passcode es correcto
   */
  async verifyPasscode(inputPasscode, storedPasscode) {
    if (!inputPasscode || !storedPasscode) return false;    try {      const [storedHash, , , salt] = storedPasscode.split('$');
      const encoder = new TextEncoder();
      const data = encoder.encode(inputPasscode + salt);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const inputHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
      return inputHash === storedHash;
    } catch (error) {
      console.error('Error al verificar passcode:', error);
      return false;
    }
  }

  /**
   * Genera un token de sesión para el localStorage
   * @param {string} clientId - ID del cliente
   * @param {string} passcode - Passcode validado
   * @returns {string} - Token de sesión
   */
  generateSessionToken(clientId, passcode) {
    return `${clientId}-${passcode}-${new Date().toDateString()}`;
  }
}

// Singleton para uso global
const clientAuthService = new ClientAuthService();

export default clientAuthService;
