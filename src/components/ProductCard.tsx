import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { formatCurrency } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart?: () => void;
}

/**
 * Product Card Component
 * Following Single Responsibility Principle
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
    >
      <Image
        source={{ uri: product.imageUrl }}
        className="w-full h-48"
        resizeMode="cover"
      />
      
      <View className="p-4">
        <Text className="text-lg font-semibold text-gray-900 mb-1">
          {product.name}
        </Text>
        
        <Text className="text-gray-600 text-sm mb-2" numberOfLines={2}>
          {product.description}
        </Text>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text className="text-gray-700 ml-1 text-sm">
            {product.rating} ({product.reviews})
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-green-600 font-bold text-lg">
            {formatCurrency(product.price, product.currency)}
          </Text>
          
          {product.inStock ? (
            <TouchableOpacity
              onPress={onAddToCart}
              className="bg-green-600 px-4 py-2 rounded-lg flex-row items-center"
            >
              <Ionicons name="cart" size={16} color="#ffffff" />
              <Text className="text-white font-medium ml-1">Add</Text>
            </TouchableOpacity>
          ) : (
            <View className="bg-gray-300 px-4 py-2 rounded-lg">
              <Text className="text-gray-600 font-medium">Out of Stock</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
