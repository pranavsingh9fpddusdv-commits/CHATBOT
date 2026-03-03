const axios = require('axios');

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || 'demo';
const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Translate text to a target language
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language code (en, es, fr, etc.)
 * @returns {Promise<string>} Translated text
 */
async function translate(text, targetLanguage = 'en') {
  try {
    if (GOOGLE_TRANSLATE_API_KEY === 'demo') {
      // Return simple mock translation for demo
      const mockTranslations = {
        en: text,
        es: `[ES] ${text}`,
        fr: `[FR] ${text}`
      };
      return mockTranslations[targetLanguage] || text;
    }

    const response = await axios.post(GOOGLE_TRANSLATE_URL, null, {
      params: {
        key: GOOGLE_TRANSLATE_API_KEY,
        q: text,
        target: targetLanguage
      }
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation API error:', error.message);
    throw error;
  }
}

module.exports = {
  translate
};