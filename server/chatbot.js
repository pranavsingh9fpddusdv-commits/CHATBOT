const rules = require('./rules');
const weatherAPI = require('./apis/weatherAPI');
const translationAPI = require('./apis/translationAPI');

class Chatbot {
  constructor() {
    this.conversationHistory = [];
  }

  /**
   * Process user message and generate response
   * @param {string} userMessage - User input message
   * @param {string} language - Language code (en, es, fr)
   * @returns {Promise<string>} Chatbot response
   */
  async processMessage(userMessage, language = 'en') {
    try {
      // Store user message in history
      this.addToHistory('user', userMessage, language);

      // Check rules for matching response
      let response = this.matchRules(userMessage, language);

      // If no rule matched, generate default response
      if (!response) {
        response = this.getDefaultResponse(language);
      }

      // Handle special commands (weather, translation, etc.)
      if (userMessage.toLowerCase().includes('weather')) {
        response = await this.handleWeatherRequest(userMessage, language);
      }

      if (userMessage.toLowerCase().includes('translate')) {
        response = await this.handleTranslationRequest(userMessage, language);
      }

      // Store bot response in history
      this.addToHistory('bot', response, language);

      return response;
    } catch (error) {
      console.error('Error processing message:', error);
      return this.getDefaultResponse(language);
    }
  }

  /**
   * Match user message against predefined rules
   */
  matchRules(userMessage, language) {
    const messageLower = userMessage.toLowerCase();
    
    for (const rule of rules) {
      for (const pattern of rule.patterns) {
        if (messageLower.includes(pattern.toLowerCase())) {
          const responses = rule.responses[language] || rule.responses['en'];
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
    
    return null;
  }

  /**
   * Handle weather API request
   */
  async handleWeatherRequest(userMessage, language) {
    try {
      // Extract city name from message (simple implementation)
      const cityMatch = userMessage.match(/weather\s+(?:in\s+)?(\w+)/i);
      const city = cityMatch ? cityMatch[1] : 'London';
      
      const weatherData = await weatherAPI.getWeather(city);
      return this.formatWeatherResponse(weatherData, language);
    } catch (error) {
      return this.getDefaultResponse(language);
    }
  }

  /**
   * Handle translation request
   */
  async handleTranslationRequest(userMessage, language) {
    try {
      // Extract text to translate
      const textMatch = userMessage.match(/translate\s+"?([^\"]+)"?/i);
      const textToTranslate = textMatch ? textMatch[1] : userMessage;
      
      const translatedText = await translationAPI.translate(textToTranslate, language);
      return translatedText;
    } catch (error) {
      return this.getDefaultResponse(language);
    }
  }

  /**
   * Format weather response
   */
  formatWeatherResponse(weatherData, language) {
    const responses = {
      en: `The weather in ${weatherData.city} is ${weatherData.condition} with a temperature of ${weatherData.temperature}°C.`,
      es: `El clima en ${weatherData.city} es ${weatherData.condition} con una temperatura de ${weatherData.temperature}°C.`,
      fr: `Le temps à ${weatherData.city} est ${weatherData.condition} avec une température de ${weatherData.temperature}°C.`
    };
    return responses[language] || responses['en'];
  }

  /**
   * Get default response based on language
   */
  getDefaultResponse(language) {
    const responses = {
      en: "I'm not sure how to respond to that. Can you ask me something else?",
      es: "No estoy seguro de cómo responder a eso. ¿Puedes preguntarme algo más?",
      fr: "Je ne suis pas sûr de comment répondre à cela. Pouvez-vous me poser une autre question?"
    };
    return responses[language] || responses['en'];
  }

  /**
   * Add message to conversation history
   */
  addToHistory(sender, message, language) {
    this.conversationHistory.push({
      sender,
      message,
      language,
      timestamp: new Date()
    });
  }

  /**
   * Get conversation history
   */
  getHistory() {
    return this.conversationHistory;
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }
}

module.exports = new Chatbot();