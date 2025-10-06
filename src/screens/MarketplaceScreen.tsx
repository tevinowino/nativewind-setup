import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';
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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-600 px-6 pt-12 pb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">{t('marketplace')}</Text>
          <TouchableOpacity className="relative">
            <Ionicons name="cart" size={28} color="#ffffff" />
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
              className={`
                px-4 py-2 rounded-full mr-2
                ${selectedCategory === category.id ? 'bg-white' : 'bg-white/20'}
              `}
            >
              <Text
                className={`
                  font-medium
                  ${selectedCategory === category.id ? 'text-green-600' : 'text-white'}
                `}
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
            <Ionicons name="cube-outline" size={64} color="#9ca3af" />
            <Text className="text-gray-500 mt-4">{t('noData')}</Text>
          </View>
        }
      />
    </View>
  );
};
