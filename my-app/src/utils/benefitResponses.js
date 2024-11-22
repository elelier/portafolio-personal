import benefitResponsesData from '../data/benefitResponses.json';

/**
 * Obtiene la respuesta detallada para un beneficio específico
 * @param {string} benefitText - El texto del beneficio a buscar
 * @param {string} lang - El idioma actual ('es' o 'en')
 * @returns {Object|null} - Objeto con la información del beneficio o null si no se encuentra
 */
export const getBenefitResponse = (benefitText, lang) => {
  try {
    const response = benefitResponsesData[lang][benefitText];
    if (!response) {
      console.warn(`No se encontró respuesta para el beneficio: ${benefitText} en el idioma: ${lang}`);
      return null;
    }
    return response;
  } catch (error) {
    console.error('Error al obtener la respuesta del beneficio:', error);
    return null;
  }
};

/**
 * Obtiene todos los beneficios disponibles para un idioma
 * @param {string} lang - El idioma deseado ('es' o 'en')
 * @returns {Array} - Array de objetos con los beneficios
 */
export const getAllBenefits = (lang) => {
  try {
    return Object.keys(benefitResponsesData[lang]).map(key => ({
      key,
      ...benefitResponsesData[lang][key]
    }));
  } catch (error) {
    console.error('Error al obtener todos los beneficios:', error);
    return [];
  }
};

/**
 * Obtiene los ejemplos de beneficios para un idioma específico
 * @param {string} lang - El idioma deseado ('es' o 'en')
 * @returns {Object|null} - Objeto con los ejemplos o null si no se encuentran
 */
export const getBenefitExamples = (lang) => {
  try {
    return benefitResponsesData.examples?.[lang] || null;
  } catch (error) {
    console.error('Error al obtener ejemplos de beneficios:', error);
    return null;
  }
};
