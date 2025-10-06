import React, { ReactNode } from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
}

/**
 * Reusable Card Component
 * Following Single Responsibility Principle
 */
export const Card: React.FC<CardProps> = ({ children, onPress, className = '', style }) => {
  const colors = useThemeColors();
  const baseStyles = 'rounded-xl p-4 shadow-sm';
  const cardStyle = { backgroundColor: colors.card, ...style };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={cardStyle}
        className={`${baseStyles} active:opacity-80 ${className}`}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle} className={`${baseStyles} ${className}`}>{children}</View>;
};
