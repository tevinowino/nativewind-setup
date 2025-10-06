// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  language: 'en' | 'sw';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  name: string;
  phone?: string;
}

// Diagnosis Types
export interface DiagnosisResult {
  id: string;
  cropName: string;
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  advice: string;
  recommendedProducts: string[];
  imageUri: string;
  createdAt: string;
}

export interface DiagnosisRequest {
  imageUri: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: 'seeds' | 'fertilizers' | 'pesticides' | 'tools' | 'equipment';
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress: string;
  paymentMethod: string;
}

// Weather Types
export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  };
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
  farmingTips: string[];
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
  precipitation: number;
}

export interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  startTime: string;
  endTime: string;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation Types
export type RootStackParamList = {
  '(auth)/login': undefined;
  '(auth)/signup': undefined;
  '(auth)/forgot-password': undefined;
  '(tabs)': undefined;
  'product-detail': { productId: string };
  'diagnosis-result': { diagnosisId: string };
  'checkout': undefined;
};

export type TabParamList = {
  home: undefined;
  diagnose: undefined;
  marketplace: undefined;
  weather: undefined;
  profile: undefined;
  orders: undefined;
};
