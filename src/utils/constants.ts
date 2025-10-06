// Color Theme - Shades of Green
export const COLORS = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main primary color
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  white: '#ffffff',
  black: '#000000',
  background: {
    light: '#f9fafb',
    dark: '#111827',
  },
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    light: '#9ca3af',
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Font Sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border Radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  LANGUAGE: 'app_language',
  THEME: 'app_theme',
};

// API Endpoints (fallback if .env not loaded)
export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'https://api.shambapal.com',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY || '',
  WEATHER_API_URL: process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
  AI_DIAGNOSIS_API_URL: process.env.AI_DIAGNOSIS_API_URL || 'https://api.shambapal.com/ai/diagnose',
  PRODUCT_API_URL: process.env.PRODUCT_API_URL || 'https://api.shambapal.com/products',
};

// Severity Colors
export const SEVERITY_COLORS = {
  low: COLORS.success,
  medium: COLORS.warning,
  high: '#fb923c',
  critical: COLORS.error,
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products', labelSw: 'Bidhaa Zote' },
  { id: 'seeds', label: 'Seeds', labelSw: 'Mbegu' },
  { id: 'fertilizers', label: 'Fertilizers', labelSw: 'Mbolea' },
  { id: 'pesticides', label: 'Pesticides', labelSw: 'Dawa za Wadudu' },
  { id: 'tools', label: 'Tools', labelSw: 'Zana' },
  { id: 'equipment', label: 'Equipment', labelSw: 'Vifaa' },
];

// Language Options
export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
];
