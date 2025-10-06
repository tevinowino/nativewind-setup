import { WeatherData, Location, ApiResponse } from '../types';
import { API_CONFIG } from '../utils/constants';
import { delay } from '../utils/helpers';

/**
 * Weather Service
 * Handles weather-related API calls
 * Following Single Responsibility Principle
 */
class WeatherService {
  /**
   * Get weather data for location
   */
  async getWeather(location: Location): Promise<ApiResponse<WeatherData>> {
    try {
      await delay(1500);
      
      // Mock response - replace with actual weather API call
      // const response = await fetch(
      //   `${API_CONFIG.WEATHER_API_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_CONFIG.WEATHER_API_KEY}&units=metric`
      // );
      
      const mockWeather: WeatherData = {
        location: location.address || 'Nairobi, Kenya',
        current: {
          temperature: 24,
          humidity: 65,
          windSpeed: 12,
          condition: 'Partly Cloudy',
          icon: '02d',
        },
        forecast: [
          {
            date: new Date().toISOString(),
            temperature: { min: 18, max: 26 },
            condition: 'Partly Cloudy',
            icon: '02d',
            precipitation: 10,
          },
          {
            date: new Date(Date.now() + 86400000).toISOString(),
            temperature: { min: 19, max: 27 },
            condition: 'Sunny',
            icon: '01d',
            precipitation: 5,
          },
          {
            date: new Date(Date.now() + 172800000).toISOString(),
            temperature: { min: 17, max: 25 },
            condition: 'Light Rain',
            icon: '10d',
            precipitation: 60,
          },
          {
            date: new Date(Date.now() + 259200000).toISOString(),
            temperature: { min: 16, max: 23 },
            condition: 'Rainy',
            icon: '09d',
            precipitation: 80,
          },
          {
            date: new Date(Date.now() + 345600000).toISOString(),
            temperature: { min: 18, max: 24 },
            condition: 'Cloudy',
            icon: '03d',
            precipitation: 30,
          },
          {
            date: new Date(Date.now() + 432000000).toISOString(),
            temperature: { min: 19, max: 26 },
            condition: 'Partly Cloudy',
            icon: '02d',
            precipitation: 15,
          },
          {
            date: new Date(Date.now() + 518400000).toISOString(),
            temperature: { min: 20, max: 28 },
            condition: 'Sunny',
            icon: '01d',
            precipitation: 5,
          },
        ],
        alerts: [
          {
            id: 'alert-1',
            type: 'warning',
            title: 'Heavy Rain Expected',
            description: 'Heavy rainfall expected in the next 48 hours. Ensure proper drainage in your fields.',
            severity: 'medium',
            startTime: new Date(Date.now() + 172800000).toISOString(),
            endTime: new Date(Date.now() + 259200000).toISOString(),
          },
        ],
        farmingTips: [
          'Good weather for planting this week',
          'Prepare drainage systems for upcoming rain',
          'Monitor crops for fungal diseases after rain',
          'Apply fertilizer before the rain for better absorption',
        ],
      };
      
      return {
        success: true,
        data: mockWeather,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch weather data.',
      };
    }
  }

  /**
   * Get farming tips based on weather
   */
  async getFarmingTips(weatherCondition: string): Promise<ApiResponse<string[]>> {
    try {
      await delay(500);
      
      const tipsMap: Record<string, string[]> = {
        sunny: [
          'Ideal conditions for harvesting',
          'Water crops early morning or late evening',
          'Monitor for heat stress in plants',
        ],
        rainy: [
          'Check drainage systems',
          'Monitor for fungal diseases',
          'Delay pesticide application',
          'Protect young seedlings from heavy rain',
        ],
        cloudy: [
          'Good time for transplanting',
          'Apply foliar fertilizers',
          'Inspect crops for pests',
        ],
      };
      
      const tips = tipsMap[weatherCondition.toLowerCase()] || tipsMap.sunny;
      
      return {
        success: true,
        data: tips,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch farming tips.',
      };
    }
  }
}

export default new WeatherService();
