import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { isValidEmail } from '../utils/helpers';

/**
 * Login Screen
 * Following Single Responsibility Principle
 */
export const LoginScreen: React.FC = () => {
  const { login, signInWithGoogle } = useAuth();
  const { t } = useTranslation();
  const colors = useThemeColors();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Login Failed', result.error || 'Please try again');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Sign In Failed', result.error || 'Please try again');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} className="flex-1">
      <View className="flex-1 px-6 pt-16 pb-8">
        {/* Header */}
        <View className="items-center mb-8">
          <View style={{ backgroundColor: colors.primary }} className="w-20 h-20 rounded-full items-center justify-center mb-4">
            <Ionicons name="leaf" size={40} color="#ffffff" />
          </View>
          <Text style={{ color: colors.text.primary }} className="text-3xl font-bold">Shamba Pal</Text>
          <Text style={{ color: colors.text.secondary }} className="mt-2">Your Farming Companion</Text>
        </View>

        {/* Login Form */}
        <View className="mb-6">
          <Input
            label={t('email')}
            value={email}
            onChangeText={setEmail}
            placeholder="farmer@example.com"
            keyboardType="email-address"
            icon="mail"
            error={errors.email}
          />

          <Input
            label={t('password')}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            icon="lock-closed"
            error={errors.password}
          />

          <TouchableOpacity
            onPress={() => router.push('/(auth)/forgot-password')}
            className="self-end"
          >
            <Text style={{ color: colors.primary }} className="font-medium">
              {t('forgotPassword')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <Button
          title={t('login')}
          onPress={handleLogin}
          loading={loading}
          fullWidth
        />

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
          <Text style={{ color: colors.text.secondary }} className="mx-4">or</Text>
          <View style={{ backgroundColor: colors.border }} className="flex-1 h-px" />
        </View>

        {/* Google Sign In */}
        <Button
          title={t('signInWithGoogle')}
          onPress={handleGoogleSignIn}
          variant="outline"
          fullWidth
          icon={<Ionicons name="logo-google" size={20} color={colors.primary} />}
        />

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.text.secondary }}>{t('dontHaveAccount')} </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={{ color: colors.primary }} className="font-semibold">{t('signup')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
