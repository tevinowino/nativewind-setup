import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { useLocation } from '../hooks/useLocation';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import weatherService from '../services/weatherService';
import { WeatherData } from '../types';
import { formatDate } from '../utils/helpers';

/**
 * Weather Screen
 * Following Single Responsibility Principle
 */
export const WeatherScreen: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const { location, requestLocation } = useLocation();
  
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    setLoading(true);
    
    // Use mock location if real location not available
    const loc = location || {
      latitude: -1.286389,
      longitude: 36.817223,
      address: 'Nairobi, Kenya',
    };

    const response = await weatherService.getWeather(loc);
    setLoading(false);

    if (response.success && response.data) {
      setWeather(response.data);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  };

  const handleRequestLocation = async () => {
    await requestLocation();
    await loadWeather();
  };

  if (loading && !weather) {
    return <Loading message="Loading weather data..." />;
  }

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain')) return 'rainy';
    if (lower.includes('cloud')) return 'cloudy';
    if (lower.includes('sun')) return 'sunny';
    return 'partly-sunny';
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
      }
    >
      {/* Header */}
      <View style={{ backgroundColor: '#3b82f6' }} className="px-6 pt-12 pb-8">
        <Text className="text-white text-2xl font-bold mb-2">{t('weather')}</Text>
        <View className="flex-row items-center">
          <Ionicons name="location" size={16} color="#ffffff" />
          <Text className="text-white ml-1">{weather?.location || 'Unknown'}</Text>
        </View>
      </View>

      <View className="px-6 -mt-4">
        {weather ? (
          <>
            {/* Current Weather */}
            <Card className="mb-6">
              <Text style={{ color: colors.text.secondary }} className="text-sm mb-2">{t('currentWeather')}</Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text style={{ color: colors.text.primary }} className="text-5xl font-bold">
                    {weather.current.temperature}°C
                  </Text>
                  <Text style={{ color: colors.text.secondary }} className="text-lg mt-2">
                    {weather.current.condition}
                  </Text>
                </View>
                <Ionicons
                  name={getWeatherIcon(weather.current.condition)}
                  size={80}
                  color="#f59e0b"
                />
              </View>

              <View style={{ borderTopColor: colors.border }} className="flex-row justify-between mt-6 pt-6 border-t">
                <View className="items-center">
                  <Ionicons name="water" size={24} color="#3b82f6" />
                  <Text style={{ color: colors.text.secondary }} className="text-sm mt-1">
                    {t('humidity')}
                  </Text>
                  <Text style={{ color: colors.text.primary }} className="font-semibold">
                    {weather.current.humidity}%
                  </Text>
                </View>
                
                <View className="items-center">
                  <Ionicons name="speedometer" size={24} color="#3b82f6" />
                  <Text style={{ color: colors.text.secondary }} className="text-sm mt-1">
                    {t('windSpeed')}
                  </Text>
                  <Text style={{ color: colors.text.primary }} className="font-semibold">
                    {weather.current.windSpeed} km/h
                  </Text>
                </View>
              </View>
            </Card>

            {/* Weather Alerts */}
            {weather.alerts.length > 0 && (
              <Card className="mb-6">
                <View className="flex-row items-center mb-3">
                  <Ionicons name="warning" size={20} color="#f59e0b" />
                  <Text className="text-gray-900 font-semibold text-lg ml-2">
                    {t('alerts')}
                  </Text>
                </View>
                {weather.alerts.map((alert) => (
                  <View
                    key={alert.id}
                    className="bg-orange-50 p-4 rounded-lg mb-2"
                  >
                    <Text className="text-orange-900 font-semibold mb-1">
                      {alert.title}
                    </Text>
                    <Text className="text-orange-700 text-sm">
                      {alert.description}
                    </Text>
                  </View>
                ))}
              </Card>
            )}

            {/* 7-Day Forecast */}
            <Card className="mb-6">
              <Text className="text-gray-900 font-semibold text-lg mb-4">
                {t('forecast')} (7 Days)
              </Text>
              {weather.forecast.map((day, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between py-3 border-b border-gray-100"
                >
                  <Text className="text-gray-700 flex-1">
                    {formatDate(day.date, 'EEE, MMM dd')}
                  </Text>
                  <Ionicons
                    name={getWeatherIcon(day.condition)}
                    size={24}
                    color="#f59e0b"
                  />
                  <View className="flex-row items-center ml-4">
                    <Text className="text-gray-900 font-semibold">
                      {day.temperature.max}°
                    </Text>
                    <Text className="text-gray-500 ml-2">
                      {day.temperature.min}°
                    </Text>
                  </View>
                </View>
              ))}
            </Card>

            {/* Farming Tips */}
            <Card className="mb-6">
              <View className="flex-row items-center mb-3">
                <Ionicons name="bulb" size={20} color="#16a34a" />
                <Text className="text-gray-900 font-semibold text-lg ml-2">
                  {t('farmingTips')}
                </Text>
              </View>
              {weather.farmingTips.map((tip, index) => (
                <View key={index} className="flex-row items-start mb-3">
                  <Text className="text-green-600 mr-2">•</Text>
                  <Text className="text-gray-700 flex-1">{tip}</Text>
                </View>
              ))}
            </Card>
          </>
        ) : (
          <Card className="mb-6 items-center py-8">
            <Ionicons name="cloud-offline" size={64} color="#9ca3af" />
            <Text className="text-gray-500 mt-4 mb-4">No weather data available</Text>
            <Button
              title="Load Weather"
              onPress={loadWeather}
              variant="primary"
            />
          </Card>
        )}

        {/* Update Location Button */}
        <Button
          title="Update Location"
          onPress={handleRequestLocation}
          variant="outline"
          fullWidth
          icon={<Ionicons name="location" size={20} color="#16a34a" />}
        />
      </View>
    </ScrollView>
  );
};
