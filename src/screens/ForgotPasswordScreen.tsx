import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import authService from '../services/authService';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { isValidEmail } from '../utils/helpers';

/**
 * Forgot Password Screen
 * Following Single Responsibility Principle
 */
export const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await authService.resetPassword(email);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Success',
        result.message || 'Password reset link sent to your email',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } else {
      Alert.alert('Error', result.error || 'Failed to send reset link');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} className="flex-1">
      <View className="flex-1 px-6 pt-16 pb-8">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-8"
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-8">
          <Text style={{ color: colors.text.primary }} className="text-3xl font-bold mb-2">
            {t('resetPassword')}
          </Text>
          <Text style={{ color: colors.text.secondary }}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <Input
            label={t('email')}
            value={email}
            onChangeText={setEmail}
            placeholder="farmer@example.com"
            keyboardType="email-address"
            icon="mail"
            error={error}
          />
        </View>

        {/* Reset Button */}
        <Button
          title="Send Reset Link"
          onPress={handleResetPassword}
          loading={loading}
          fullWidth
        />

        {/* Back to Login */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.text.secondary }}>Remember your password? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={{ color: colors.primary }} className="font-semibold">{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
