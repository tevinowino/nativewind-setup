import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
}

/**
 * Reusable Loading Component
 * Following Single Responsibility Principle
 */
export const Loading: React.FC<LoadingProps> = ({ message, size = 'large' }) => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <ActivityIndicator size={size} color="#16a34a" />
      {message && (
        <Text className="text-gray-600 mt-4 text-base">{message}</Text>
      )}
    </View>
  );
};
