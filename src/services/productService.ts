import { Product, Order, CartItem, ApiResponse } from '../types';
import { API_CONFIG } from '../utils/constants';
import { delay, generateId } from '../utils/helpers';

/**
 * Product Service
 * Handles marketplace and product-related API calls
 * Following Single Responsibility Principle
 */
class ProductService {
  /**
   * Get all products
   */
  async getProducts(category?: string): Promise<ApiResponse<Product[]>> {
    try {
      await delay(1000);
      
      // Mock products - replace with actual API call
      const mockProducts: Product[] = [
        {
          id: 'prod-1',
          name: 'Hybrid Maize Seeds - H614',
          category: 'seeds',
          description: 'High-yield hybrid maize seeds suitable for various climates. Drought-resistant and disease-tolerant.',
          price: 2500,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/22c55e/ffffff?text=Maize+Seeds',
          inStock: true,
          rating: 4.5,
          reviews: 128,
        },
        {
          id: 'prod-2',
          name: 'Organic Pesticide - BioGuard',
          category: 'pesticides',
          description: 'Eco-friendly pesticide for controlling fall armyworm and other pests. Safe for crops and environment.',
          price: 1800,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/16a34a/ffffff?text=Pesticide',
          inStock: true,
          rating: 4.7,
          reviews: 95,
        },
        {
          id: 'prod-3',
          name: 'Copper Fungicide - CropShield',
          category: 'pesticides',
          description: 'Effective copper-based fungicide for treating blight, rust, and other fungal diseases.',
          price: 1500,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/15803d/ffffff?text=Fungicide',
          inStock: true,
          rating: 4.6,
          reviews: 73,
        },
        {
          id: 'prod-4',
          name: 'NPK Fertilizer 23-23-0',
          category: 'fertilizers',
          description: 'Balanced NPK fertilizer for optimal crop growth. Suitable for maize, wheat, and vegetables.',
          price: 3200,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/166534/ffffff?text=NPK+Fertilizer',
          inStock: true,
          rating: 4.8,
          reviews: 156,
        },
        {
          id: 'prod-5',
          name: 'Tomato Seeds - Money Maker',
          category: 'seeds',
          description: 'Popular tomato variety with excellent yield. Disease-resistant and suitable for greenhouse or open field.',
          price: 800,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/22c55e/ffffff?text=Tomato+Seeds',
          inStock: true,
          rating: 4.4,
          reviews: 89,
        },
        {
          id: 'prod-6',
          name: 'Garden Hoe - Heavy Duty',
          category: 'tools',
          description: 'Durable steel garden hoe with wooden handle. Perfect for weeding and soil preparation.',
          price: 1200,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/14532d/ffffff?text=Garden+Hoe',
          inStock: true,
          rating: 4.3,
          reviews: 45,
        },
        {
          id: 'prod-7',
          name: 'Organic Compost - 50kg',
          category: 'fertilizers',
          description: 'Premium organic compost for improving soil fertility. Rich in nutrients and beneficial microorganisms.',
          price: 1000,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/166534/ffffff?text=Compost',
          inStock: false,
          rating: 4.9,
          reviews: 203,
        },
        {
          id: 'prod-8',
          name: 'Sprayer Pump - 20L',
          category: 'equipment',
          description: 'Manual knapsack sprayer for applying pesticides and fertilizers. Adjustable nozzle and comfortable straps.',
          price: 4500,
          currency: 'KES',
          imageUrl: 'https://via.placeholder.com/300x300/15803d/ffffff?text=Sprayer',
          inStock: true,
          rating: 4.5,
          reviews: 67,
        },
      ];
      
      let filteredProducts = mockProducts;
      if (category && category !== 'all') {
        filteredProducts = mockProducts.filter(p => p.category === category);
      }
      
      return {
        success: true,
        data: filteredProducts,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch products.',
      };
    }
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string): Promise<ApiResponse<Product>> {
    try {
      await delay(500);
      
      const productsResponse = await this.getProducts();
      const product = productsResponse.data?.find(p => p.id === productId);
      
      if (!product) {
        return {
          success: false,
          error: 'Product not found.',
        };
      }
      
      return {
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch product details.',
      };
    }
  }

  /**
   * Get products by IDs (for recommended products)
   */
  async getProductsByIds(productIds: string[]): Promise<ApiResponse<Product[]>> {
    try {
      await delay(500);
      
      const productsResponse = await this.getProducts();
      const products = productsResponse.data?.filter(p => productIds.includes(p.id)) || [];
      
      return {
        success: true,
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch products.',
      };
    }
  }

  /**
   * Create order
   */
  async createOrder(items: CartItem[], deliveryAddress: string, paymentMethod: string): Promise<ApiResponse<Order>> {
    try {
      await delay(1500);
      
      const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      const order: Order = {
        id: generateId(),
        items,
        totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString(),
        deliveryAddress,
        paymentMethod,
      };
      
      return {
        success: true,
        data: order,
        message: 'Order placed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create order.',
      };
    }
  }

  /**
   * Get user orders
   */
  async getOrders(userId: string): Promise<ApiResponse<Order[]>> {
    try {
      await delay(1000);
      
      // Mock orders
      const mockOrders: Order[] = [
        {
          id: 'order-1',
          items: [
            {
              product: {
                id: 'prod-1',
                name: 'Hybrid Maize Seeds',
                category: 'seeds',
                description: 'High-yield seeds',
                price: 2500,
                currency: 'KES',
                imageUrl: 'https://via.placeholder.com/100',
                inStock: true,
                rating: 4.5,
                reviews: 128,
              },
              quantity: 2,
            },
          ],
          totalAmount: 5000,
          status: 'delivered',
          createdAt: new Date(Date.now() - 604800000).toISOString(),
          deliveryAddress: 'Nairobi, Kenya',
          paymentMethod: 'M-Pesa',
        },
        {
          id: 'order-2',
          items: [
            {
              product: {
                id: 'prod-4',
                name: 'NPK Fertilizer',
                category: 'fertilizers',
                description: 'Balanced fertilizer',
                price: 3200,
                currency: 'KES',
                imageUrl: 'https://via.placeholder.com/100',
                inStock: true,
                rating: 4.8,
                reviews: 156,
              },
              quantity: 1,
            },
          ],
          totalAmount: 3200,
          status: 'shipped',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          deliveryAddress: 'Nairobi, Kenya',
          paymentMethod: 'M-Pesa',
        },
      ];
      
      return {
        success: true,
        data: mockOrders,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch orders.',
      };
    }
  }
}

export default new ProductService();
