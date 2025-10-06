import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import { useThemeColors } from '../hooks/useThemeColors';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import productService from '../services/productService';
import { Order } from '../types';
import { formatDate, formatCurrency } from '../utils/helpers';

/**
 * Orders Screen
 * Following Single Responsibility Principle
 */
export const OrdersScreen: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const colors = useThemeColors();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (!user) return;

    setLoading(true);
    const response = await productService.getOrders(user.id);
    setLoading(false);

    if (response.success && response.data) {
      setOrders(response.data);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return '#10b981';
      case 'shipped':
        return '#3b82f6';
      case 'processing':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'checkmark-circle';
      case 'shipped':
        return 'airplane';
      case 'processing':
        return 'time';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'ellipse';
    }
  };

  if (loading) {
    return <Loading message="Loading orders..." />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ backgroundColor: colors.headerBg }} className="px-6 pt-12 pb-6">
        <Text style={{ color: colors.headerText }} className="text-2xl font-bold">{t('myOrders')}</Text>
      </View>

      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="receipt-outline" size={64} color={colors.text.secondary} />
          <Text style={{ color: colors.text.secondary }} className="mt-4 text-center">
            No orders yet. Start shopping in the marketplace!
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 24 }}
          renderItem={({ item }) => (
            <Card className="mb-4">
              {/* Order Header */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1">
                  <Text style={{ color: colors.text.secondary }} className="text-sm">Order #{item.id}</Text>
                  <Text style={{ color: colors.text.primary }} className="font-semibold text-lg mt-1">
                    {formatCurrency(item.totalAmount, 'KES')}
                  </Text>
                  <Text style={{ color: colors.text.secondary }} className="text-sm mt-1">
                    {formatDate(item.createdAt)}
                  </Text>
                </View>
                
                <View
                  className="px-3 py-1 rounded-full flex-row items-center"
                  style={{ backgroundColor: getStatusColor(item.status) + '20' }}
                >
                  <Ionicons
                    name={getStatusIcon(item.status)}
                    size={16}
                    color={getStatusColor(item.status)}
                  />
                  <Text
                    className="ml-1 text-sm font-medium capitalize"
                    style={{ color: getStatusColor(item.status) }}
                  >
                    {t(item.status)}
                  </Text>
                </View>
              </View>

              {/* Order Items */}
              <View style={{ borderTopColor: colors.border }} className="border-t pt-4">
                {item.items.map((cartItem, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between items-center mb-2"
                  >
                    <Text style={{ color: colors.text.primary }} className="flex-1" numberOfLines={1}>
                      {cartItem.product.name}
                    </Text>
                    <Text style={{ color: colors.text.secondary }} className="ml-2">
                      x{cartItem.quantity}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Delivery Info */}
              <View style={{ borderTopColor: colors.border }} className="border-t pt-4 mt-2">
                <View className="flex-row items-start">
                  <Ionicons name="location" size={16} color={colors.text.secondary} />
                  <Text style={{ color: colors.text.secondary }} className="text-sm ml-2 flex-1">
                    {item.deliveryAddress}
                  </Text>
                </View>
                <View className="flex-row items-start mt-2">
                  <Ionicons name="card" size={16} color={colors.text.secondary} />
                  <Text style={{ color: colors.text.secondary }} className="text-sm ml-2">
                    {item.paymentMethod}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        />
      )}
    </View>
  );
};
