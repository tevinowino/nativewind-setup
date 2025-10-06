import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Loading } from '../components/Loading';
import productService from '../services/productService';
import { Product } from '../types';
import { PRODUCT_CATEGORIES } from '../utils/constants';

/**
 * Marketplace Screen
 * Following Single Responsibility Principle
 */
export const MarketplaceScreen: React.FC = () => {
  const { t, language } = useTranslation();
  const colors = useThemeColors();
  const { addItem, itemCount } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    setLoading(true);
    const response = await productService.getProducts(
      selectedCategory === 'all' ? undefined : selectedCategory
    );
    setLoading(false);

    if (response.success && response.data) {
      setProducts(response.data);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      Alert.alert('Out of Stock', 'This product is currently unavailable');
      return;
    }
    addItem(product);
    Alert.alert('Added to Cart', `${product.name} has been added to your cart`);
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ backgroundColor: colors.headerBg }} className="px-6 pt-12 pb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text style={{ color: colors.headerText }} className="text-2xl font-bold">{t('marketplace')}</Text>
          <TouchableOpacity className="relative">
            <Ionicons name="cart" size={28} color={colors.headerText} />
            {itemCount > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row -mx-6 px-6"
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor: selectedCategory === category.id ? '#ffffff' : 'rgba(255,255,255,0.2)'
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  color: selectedCategory === category.id ? colors.primary : colors.headerText
                }}
              >
                {language === 'sw' ? category.labelSw : category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => {}}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="cube-outline" size={64} color={colors.text.secondary} />
            <Text style={{ color: colors.text.secondary }} className="mt-4">{t('noData')}</Text>
          </View>
        }
      />
    </View>
  );
};
