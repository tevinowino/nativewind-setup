import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
}

/**
 * Reusable Loading Component
 * Following Single Responsibility Principle
 */
export const Loading: React.FC<LoadingProps> = ({ message, size = 'large' }) => {
  const colors = useThemeColors();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    }}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text style={{
          color: colors.text.secondary,
          marginTop: 16,
          fontSize: 16,
        }}>
          {message}
        </Text>
      )}
    </View>
  );
};
