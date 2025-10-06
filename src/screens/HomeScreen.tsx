import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { Card } from '../components/Card';
import { DiagnosisResult, WeatherData } from '../types';
import aiDiagnosisService from '../services/aiDiagnosisService';
import weatherService from '../services/weatherService';
import { formatRelativeTime } from '../utils/helpers';
import { SEVERITY_COLORS } from '../utils/constants';

/**
 * Home Screen - Dashboard
 * Following Single Responsibility Principle
 */
export const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const colors = useThemeColors();
  
  const [recentDiagnosis, setRecentDiagnosis] = useState<DiagnosisResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!user) return;

    // Load recent diagnosis
    const diagnosisResponse = await aiDiagnosisService.getDiagnosisHistory(user.id);
    if (diagnosisResponse.success && diagnosisResponse.data && diagnosisResponse.data.length > 0) {
      setRecentDiagnosis(diagnosisResponse.data[0]);
    }

    // Load weather (mock location)
    const weatherResponse = await weatherService.getWeather({
      latitude: -1.286389,
      longitude: 36.817223,
      address: 'Nairobi, Kenya',
    });
    if (weatherResponse.success && weatherResponse.data) {
      setWeather(weatherResponse.data);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const QuickActionButton = ({ icon, label, onPress, color = '#16a34a' }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="items-center flex-1"
    >
      <View
        className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
        style={{ backgroundColor: color + '20' }}
      >
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={{ color: colors.text.secondary }} className="text-xs text-center">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
      }
    >
      {/* Header */}
      <View style={{ backgroundColor: colors.headerBg }} className="px-6 pt-12 pb-8">
        <View className="flex-row justify-between items-center">
          <View>
            <Text style={{ color: colors.headerText }} className="text-lg">{t('welcome')}</Text>
            <Text style={{ color: colors.headerText }} className="text-2xl font-bold">{user?.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile')}
            className="w-12 h-12 bg-white/20 rounded-full items-center justify-center"
          >
            <Ionicons name="person" size={24} color={colors.headerText} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-6 -mt-4">
        {/* Quick Actions */}
        <Card className="mb-6">
          <Text style={{ color: colors.text.primary }} className="font-semibold text-lg mb-4">
            {t('quickActions')}
          </Text>
          <View className="flex-row justify-between">
            <QuickActionButton
              icon="camera"
              label={t('diagnose')}
              onPress={() => router.push('/(tabs)/diagnose')}
              color="#16a34a"
            />
            <QuickActionButton
              icon="cart"
              label={t('marketplace')}
              onPress={() => router.push('/(tabs)/marketplace')}
              color="#15803d"
            />
            <QuickActionButton
              icon="cloud"
              label={t('weather')}
              onPress={() => router.push('/(tabs)/weather')}
              color="#3b82f6"
            />
            <QuickActionButton
              icon="receipt"
              label={t('orders')}
              onPress={() => router.push('/(tabs)/orders')}
              color="#f59e0b"
            />
          </View>
        </Card>

        {/* Weather Today */}
        {weather && (
          <Card className="mb-6" onPress={() => router.push('/(tabs)/weather')}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text style={{ color: colors.text.secondary }} className="text-sm mb-1">{t('weatherToday')}</Text>
                <Text style={{ color: colors.text.primary }} className="font-bold text-3xl">
                  {weather.current.temperature}°C
                </Text>
                <Text style={{ color: colors.text.secondary }} className="mt-1">{weather.current.condition}</Text>
              </View>
              <View className="items-center">
                <Ionicons name="partly-sunny" size={64} color="#f59e0b" />
              </View>
            </View>
            {weather.alerts.length > 0 && (
              <View className="mt-4 bg-orange-50 p-3 rounded-lg flex-row items-center">
                <Ionicons name="warning" size={20} color="#f59e0b" />
                <Text className="text-orange-700 ml-2 flex-1" numberOfLines={2}>
                  {weather.alerts[0].title}
                </Text>
              </View>
            )}
          </Card>
        )}

        {/* Recent Diagnosis */}
        {recentDiagnosis && (
          <Card className="mb-6">
            <Text style={{ color: colors.text.primary }} className="font-semibold text-lg mb-3">
              {t('recentDiagnosis')}
            </Text>
            <View className="flex-row items-start">
              <View className="flex-1">
                <Text style={{ color: colors.text.primary }} className="font-medium mb-1">
                  {recentDiagnosis.cropName}
                </Text>
                <Text style={{ color: colors.text.secondary }} className="text-sm mb-2" numberOfLines={2}>
                  {recentDiagnosis.issue}
                </Text>
                <View className="flex-row items-center">
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: SEVERITY_COLORS[recentDiagnosis.severity] + '20' }}
                  >
                    <Text
                      className="text-xs font-medium capitalize"
                      style={{ color: SEVERITY_COLORS[recentDiagnosis.severity] }}
                    >
                      {recentDiagnosis.severity}
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-xs ml-2">
                    {formatRelativeTime(recentDiagnosis.createdAt)}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        )}

        {/* Farming Tips */}
        {weather && weather.farmingTips.length > 0 && (
          <Card className="mb-6">
            <View className="flex-row items-center mb-3">
              <Ionicons name="bulb" size={20} color={colors.primary} />
              <Text style={{ color: colors.text.primary }} className="font-semibold text-lg ml-2">
                {t('farmingTips')}
              </Text>
            </View>
            {weather.farmingTips.slice(0, 3).map((tip, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text style={{ color: colors.primary }} className="mr-2">•</Text>
                <Text style={{ color: colors.text.secondary }} className="flex-1">{tip}</Text>
              </View>
            ))}
          </Card>
        )}
      </View>
    </ScrollView>
  );
};
