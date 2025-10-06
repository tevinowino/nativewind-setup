import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

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
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-green-600 active:bg-green-700';
      case 'secondary':
        return 'bg-gray-500 active:bg-gray-600';
      case 'outline':
        return 'bg-transparent border-2 border-green-600 active:bg-green-50';
      case 'danger':
        return 'bg-red-600 active:bg-red-700';
      default:
        return 'bg-green-600 active:bg-green-700';
    }
  };

  const getTextStyles = () => {
    const baseStyle = 'font-semibold';
    const colorStyle = variant === 'outline' ? 'text-green-600' : 'text-white';
    
    switch (size) {
      case 'sm':
        return `${baseStyle} ${colorStyle} text-sm`;
      case 'lg':
        return `${baseStyle} ${colorStyle} text-lg`;
      default:
        return `${baseStyle} ${colorStyle} text-base`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2';
      case 'lg':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        rounded-lg
        flex-row
        items-center
        justify-center
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50' : ''}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#16a34a' : '#ffffff'} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className={getTextStyles()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
