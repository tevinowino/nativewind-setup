# 🌾 Shamba Pal - Your Farming Companion

A comprehensive React Native Expo app designed for farmers, featuring AI-powered crop diagnosis, marketplace, weather forecasts, and more. Built with **SOLID architecture principles** and a beautiful green-themed UI.

## 📱 Features

### 🔐 Authentication
- Email/Password sign up and login
- Google Sign-In integration (placeholder)
- Forgot password functionality
- Persistent authentication across sessions

### 🏠 Home Dashboard
- Weather overview
- Recent diagnosis results
- Quick action buttons
- Farming tips based on weather

### 🔬 AI Crop Diagnosis
- Upload or take photos of crops
- AI-powered disease/pest detection (placeholder API)
- Severity assessment and confidence scores
- Actionable advice and treatment recommendations
- Product recommendations linked to marketplace

### 🛒 Marketplace
- Browse agricultural products (seeds, fertilizers, pesticides, tools)
- Category filtering
- Product details with ratings
- Shopping cart functionality
- Order placement (mock checkout)

### ☁️ Weather Forecast
- Current weather conditions
- 7-day forecast
- Weather alerts and hazard warnings
- Location-based weather data
- Farming tips based on weather conditions

### 👤 Profile Management
- User profile display
- Language toggle (English/Kiswahili)
- Settings and preferences
- Logout functionality

### 📦 Orders
- Order history
- Order status tracking
- Delivery information

## 🏗️ Architecture

This project follows **SOLID principles** with a well-structured folder organization:

```
shambapal-react-native/
├── app/                          # Expo Router navigation
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── forgot-password.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                   # Main app tabs
│   │   ├── home.tsx
│   │   ├── diagnose.tsx
│   │   ├── marketplace.tsx
│   │   ├── weather.tsx
│   │   ├── profile.tsx
│   │   ├── orders.tsx
│   │   └── _layout.tsx
│   ├── _layout.tsx               # Root layout with providers
│   └── index.tsx                 # Entry point
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Loading.tsx
│   │   └── ProductCard.tsx
│   ├── screens/                  # Feature screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DiagnoseScreen.tsx
│   │   ├── MarketplaceScreen.tsx
│   │   ├── WeatherScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── OrdersScreen.tsx
│   ├── services/                 # API service layer
│   │   ├── authService.ts
│   │   ├── aiDiagnosisService.ts
│   │   ├── productService.ts
│   │   └── weatherService.ts
│   ├── contexts/                 # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── CartContext.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useLocation.ts
│   │   ├── useImagePicker.ts
│   │   └── useTranslation.ts
│   ├── utils/                    # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── translations.ts
│   └── types/                    # TypeScript type definitions
│       └── index.ts
├── .env                          # Environment variables
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   cd shambapal-react-native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update `.env` file with your API keys:
   ```env
   API_BASE_URL=https://api.shambapal.com
   WEATHER_API_KEY=your_weather_api_key_here
   WEATHER_API_URL=https://api.openweathermap.org/data/2.5
   AI_DIAGNOSIS_API_URL=https://api.shambapal.com/ai/diagnose
   PRODUCT_API_URL=https://api.shambapal.com/products
   GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your preferred platform**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web
   - Scan QR code with Expo Go app

## 🎨 Design System

### Color Theme
The app uses a green color palette representing agriculture and growth:
- **Primary**: `#16a34a` (Green 600)
- **Secondary**: Various shades of green from 50 to 900
- **Accent colors**: Success, Warning, Error, Info

### Components
All components are built with:
- **NativeWind** (TailwindCSS for React Native)
- Consistent spacing and typography
- Responsive design
- Accessibility considerations

## 🔌 API Integration

All services are currently using **mock data** with placeholder API calls. To integrate real APIs:

1. **Authentication** (`src/services/authService.ts`)
   - Replace mock responses with actual API calls
   - Implement real Google Sign-In

2. **AI Diagnosis** (`src/services/aiDiagnosisService.ts`)
   - Connect to your AI model endpoint
   - Handle image upload and processing

3. **Products** (`src/services/productService.ts`)
   - Connect to your product database/API
   - Implement real payment processing

4. **Weather** (`src/services/weatherService.ts`)
   - Use OpenWeatherMap or similar service
   - Add your API key to `.env`

## 🌍 Internationalization

The app supports:
- **English** (default)
- **Kiswahili**

Add more languages in `src/utils/translations.ts`

## 📦 Key Dependencies

- **expo**: ~54.0.12
- **expo-router**: ~6.0.10 (File-based routing)
- **nativewind**: ^4.2.1 (TailwindCSS)
- **expo-image-picker**: Image selection
- **expo-location**: GPS location
- **expo-secure-store**: Secure storage
- **date-fns**: Date formatting
- **@expo/vector-icons**: Icon library

## 🧪 Testing

```bash
# Run linter
npm run lint
```

## 📱 Build for Production

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios
```

## 🤝 Contributing

This project follows SOLID principles:
- **S**ingle Responsibility: Each class/component has one job
- **O**pen/Closed: Extensible through props, not modification
- **L**iskov Substitution: Components are interchangeable
- **I**nterface Segregation: Focused interfaces
- **D**ependency Inversion: Depend on abstractions (contexts, services)

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ for farmers

---

**Note**: This app uses placeholder data and mock API calls. Replace with real backend services for production use.
