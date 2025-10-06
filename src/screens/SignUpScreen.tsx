import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { isValidEmail, isValidPassword } from '../utils/helpers';

/**
 * Sign Up Screen
 * Following Single Responsibility Principle
 */
export const SignUpScreen: React.FC = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const { t } = useTranslation();
  const colors = useThemeColors();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);
    const result = await signUp({ name, email, password, phone });
    setLoading(false);

    if (result.success) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Sign Up Failed', result.error || 'Please try again');
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
          <Text style={{ color: colors.text.primary }} className="text-3xl font-bold">Create Account</Text>
          <Text style={{ color: colors.text.secondary }} className="mt-2">Join Shamba Pal today</Text>
        </View>

        {/* Sign Up Form */}
        <View className="mb-6">
          <Input
            label={t('name')}
            value={name}
            onChangeText={setName}
            placeholder="John Farmer"
            icon="person"
            error={errors.name}
          />

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
            label={t('phone')}
            value={phone}
            onChangeText={setPhone}
            placeholder="+254 700 000 000"
            keyboardType="phone-pad"
            icon="call"
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

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            secureTextEntry
            icon="lock-closed"
            error={errors.confirmPassword}
          />
        </View>

        {/* Sign Up Button */}
        <Button
          title={t('signup')}
          onPress={handleSignUp}
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

        {/* Login Link */}
        <View className="flex-row justify-center mt-6">
          <Text style={{ color: colors.text.secondary }}>{t('alreadyHaveAccount')} </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={{ color: colors.primary }} className="font-semibold">{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
