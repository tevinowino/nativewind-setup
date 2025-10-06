import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getInitials } from '../utils/helpers';
import { LANGUAGES } from '../utils/constants';

/**
 * Profile Screen
 * Following Single Responsibility Principle
 */
export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const colors = useThemeColors();

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      'Are you sure you want to logout?',
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('logout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const handleLanguageChange = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    Alert.alert(t('success'), 'Language updated successfully');
  };

  const MenuItem = ({ icon, title, onPress, rightElement }: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ borderBottomColor: colors.border }}
      className="flex-row items-center justify-between py-4 border-b"
    >
      <View className="flex-row items-center flex-1">
        <View style={{ backgroundColor: colors.primary + '20' }} className="w-10 h-10 rounded-full items-center justify-center">
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={{ color: colors.text.primary }} className="ml-3 text-base">{title}</Text>
      </View>
      {rightElement || <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: colors.background }} className="flex-1">
      {/* Header */}
      <View style={{ backgroundColor: colors.headerBg }} className="px-6 pt-12 pb-8">
        <Text style={{ color: colors.headerText }} className="text-2xl font-bold">{t('profile')}</Text>
      </View>

      <View className="px-6 -mt-4">
        {/* User Info Card */}
        <Card className="mb-6 items-center py-6">
          <View style={{ backgroundColor: colors.primary }} className="w-24 h-24 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">
              {user ? getInitials(user.name) : 'U'}
            </Text>
          </View>
          <Text style={{ color: colors.text.primary }} className="text-xl font-bold">{user?.name}</Text>
          <Text style={{ color: colors.text.secondary }} className="mt-1">{user?.email}</Text>
          {user?.phone && (
            <Text style={{ color: colors.text.secondary }} className="mt-1">{user.phone}</Text>
          )}
        </Card>

        {/* Appearance Settings */}
        <Card className="mb-6">
          <Text style={{ color: colors.text.primary }} className="font-semibold text-lg mb-4">
            {t('appearance')}
          </Text>
          <View style={{ borderBottomColor: colors.border }} className="flex-row items-center justify-between py-3 border-b">
            <View className="flex-row items-center">
              <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color={colors.primary} />
              <Text style={{ color: colors.text.primary }} className="ml-3 text-base">{t('darkMode')}</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#d1d5db', true: colors.primary }}
              thumbColor={isDarkMode ? '#ffffff' : '#f3f4f6'}
            />
          </View>
        </Card>

        {/* Language Selection */}
        <Card className="mb-6">
          <Text style={{ color: colors.text.primary }} className="font-semibold text-lg mb-4">
            {t('language')}
          </Text>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => handleLanguageChange(lang.code as 'en' | 'sw')}
              style={{ borderBottomColor: colors.border }}
              className="flex-row items-center justify-between py-3 border-b last:border-0"
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-3">{lang.flag}</Text>
                <Text style={{ color: colors.text.primary }}>{lang.label}</Text>
              </View>
              {language === lang.code && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Card>

        {/* Menu Items */}
        <Card className="mb-6">
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon')}
          />
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon')}
          />
          <MenuItem
            icon="settings-outline"
            title={t('settings')}
            onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon')}
          />
          <MenuItem
            icon="help-circle-outline"
            title={t('help')}
            onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon')}
          />
          <MenuItem
            icon="information-circle-outline"
            title={t('about')}
            onPress={() => Alert.alert('Shamba Pal', 'Version 1.0.0\nYour Farming Companion')}
          />
        </Card>

        {/* Logout Button */}
        <Button
          title={t('logout')}
          onPress={handleLogout}
          variant="danger"
          fullWidth
          icon={<Ionicons name="log-out" size={20} color="#ffffff" />}
        />

        <View className="h-8" />
      </View>
    </ScrollView>
  );
};
