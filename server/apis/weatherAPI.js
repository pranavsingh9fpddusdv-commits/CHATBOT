const axios = require('axios');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Get weather for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
async function getWeather(city) {
  try {
    if (WEATHER_API_KEY === 'demo') {
      // Return mock data for demo
      return {
        city: city,
        condition: 'Partly Cloudy',
        temperature: 22,
        humidity: 65,
        windSpeed: 10
      };
    }

    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });

    return {
      city: response.data.name,
      condition: response.data.weather[0].main,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
    throw error;
  }
}

module.exports = {
  getWeather
};