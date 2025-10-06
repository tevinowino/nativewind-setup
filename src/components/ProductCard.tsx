import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { formatCurrency } from '../utils/helpers';
import { useThemeColors } from '../hooks/useThemeColors';

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
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={{ width: '100%', height: 192 }}
        resizeMode="cover"
      />
      
      <View style={{ padding: 16 }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text.primary,
          marginBottom: 4,
        }}>
          {product.name}
        </Text>
        
        <Text style={{
          color: colors.text.secondary,
          fontSize: 14,
          marginBottom: 8,
        }} numberOfLines={2}>
          {product.description}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text style={{
            color: colors.text.secondary,
            marginLeft: 4,
            fontSize: 14,
          }}>
            {product.rating} ({product.reviews})
          </Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{
            color: colors.primary,
            fontWeight: 'bold',
            fontSize: 18,
          }}>
            {formatCurrency(product.price, product.currency)}
          </Text>
          
          {product.inStock ? (
            <TouchableOpacity
              onPress={onAddToCart}
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="cart" size={16} color="#ffffff" />
              <Text style={{ color: '#ffffff', fontWeight: '500', marginLeft: 4 }}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={{
              backgroundColor: colors.text.secondary + '30',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}>
              <Text style={{ color: colors.text.secondary, fontWeight: '500' }}>Out of Stock</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
