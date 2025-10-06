import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, ViewStyle, TextStyle } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Reusable Button Component
 * Following Open/Closed Principle - extensible through props
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  const colors = useThemeColors();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: colors.primary };
      case 'secondary':
        return { backgroundColor: colors.text.secondary };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          borderWidth: 2, 
          borderColor: colors.primary 
        };
      case 'danger':
        return { backgroundColor: '#ef4444' };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getTextColor = (): string => {
    return variant === 'outline' ? colors.primary : '#ffffff';
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: 16, paddingVertical: 8 };
      case 'lg':
        return { paddingHorizontal: 32, paddingVertical: 16 };
      default:
        return { paddingHorizontal: 24, paddingVertical: 12 };
    }
  };

  const getTextSize = (): number => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 18;
      default:
        return 16;
    }
  };

  const isDisabled = disabled || loading;
  const buttonStyle: ViewStyle = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : undefined,
    opacity: isDisabled ? 0.5 : 1,
  };

  const textStyle: TextStyle = {
    color: getTextColor(),
    fontSize: getTextSize(),
    fontWeight: '600',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={buttonStyle}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text style={textStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
