# 🚀 Quick Start Guide - Shamba Pal

## Step 1: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:
- Expo SDK and router
- NativeWind (TailwindCSS)
- Navigation libraries
- Image picker, location, secure storage
- date-fns for date formatting
- All other dependencies

## Step 2: Start the Development Server

```bash
npm start
```

Or use specific commands:
```bash
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
```

## Step 3: Test the App

### Login Flow
1. The app will open to the **Login Screen**
2. Use any email/password to test (mock authentication)
   - Example: `farmer@test.com` / `password123`
3. Or click "Sign Up" to create a test account
4. Or use "Sign in with Google" (placeholder)

### Main Features to Test

#### 🏠 Home Screen
- View dashboard with weather and quick actions
- See recent diagnosis results
- Check farming tips

#### 🔬 Diagnose Screen
1. Tap "Take Photo" or "Select from Gallery"
2. Choose/capture an image
3. Tap "Diagnose Crop"
4. Wait for AI analysis (3 seconds mock delay)
5. View results with severity, confidence, and advice

#### 🛒 Marketplace
1. Browse products by category
2. Filter by: All, Seeds, Fertilizers, Pesticides, Tools, Equipment
3. Tap "Add" to add items to cart
4. View cart count in header

#### ☁️ Weather
1. View current weather conditions
2. Check 7-day forecast
3. Read weather alerts
4. Get farming tips based on weather
5. Tap "Update Location" to refresh

#### 📦 Orders
- View order history
- Check order status
- See delivery information

#### 👤 Profile
1. View user information
2. Change language (English ↔ Kiswahili)
3. Access settings
4. Logout

## Step 4: Customize for Production

### Replace Mock Data with Real APIs

#### 1. Authentication (`src/services/authService.ts`)
```typescript
// Replace mock response with:
const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials),
});
const data = await response.json();
```

#### 2. AI Diagnosis (`src/services/aiDiagnosisService.ts`)
```typescript
// Replace mock response with:
const formData = new FormData();
formData.append('image', {
  uri: request.imageUri,
  type: 'image/jpeg',
  name: 'crop-image.jpg',
});

const response = await fetch(`${API_CONFIG.AI_DIAGNOSIS_API_URL}`, {
  method: 'POST',
  body: formData,
});
```

#### 3. Weather (`src/services/weatherService.ts`)
```typescript
// Replace mock response with:
const response = await fetch(
  `${API_CONFIG.WEATHER_API_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${API_CONFIG.WEATHER_API_KEY}&units=metric`
);
```

#### 4. Products (`src/services/productService.ts`)
```typescript
// Replace mock response with:
const response = await fetch(`${API_CONFIG.PRODUCT_API_URL}/products`);
```

### Update Environment Variables

Edit `.env` file:
```env
API_BASE_URL=https://your-api.com
WEATHER_API_KEY=your_actual_api_key
AI_DIAGNOSIS_API_URL=https://your-ai-api.com/diagnose
PRODUCT_API_URL=https://your-api.com/products
GOOGLE_CLIENT_ID=your_google_client_id
```

## Step 5: Add Real Google Sign-In

1. Install Google Sign-In package:
```bash
npx expo install @react-native-google-signin/google-signin
```

2. Configure in `app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "@react-native-google-signin/google-signin",
        {
          "iosUrlScheme": "com.shambapal.app"
        }
      ]
    ]
  }
}
```

3. Update `authService.ts` with real implementation

## Troubleshooting

### Issue: Module not found errors
**Solution**: Run `npm install` again

### Issue: Metro bundler cache issues
**Solution**: 
```bash
npx expo start --clear
```

### Issue: TypeScript errors
**Solution**: 
```bash
npm run lint
```

### Issue: Expo Go limitations
**Solution**: Use development build for full features:
```bash
npx expo run:android
npx expo run:ios
```

## Project Structure Overview

```
src/
├── components/      # Reusable UI (Button, Input, Card, etc.)
├── screens/         # Full screen components
├── services/        # API calls (auth, diagnosis, products, weather)
├── contexts/        # Global state (Auth, Theme, Cart)
├── hooks/           # Custom hooks (useLocation, useImagePicker, etc.)
├── utils/           # Helpers, constants, translations
└── types/           # TypeScript definitions
```

## Key Features Implemented

✅ Authentication with persistent sessions  
✅ AI crop diagnosis with image upload  
✅ Marketplace with cart functionality  
✅ Weather forecast with location  
✅ Multi-language support (EN/SW)  
✅ Order management  
✅ Profile management  
✅ SOLID architecture  
✅ Green-themed UI with NativeWind  
✅ Tab navigation with Expo Router  

## Next Steps

1. **Backend Integration**: Connect to real APIs
2. **Payment Gateway**: Integrate M-Pesa or other payment methods
3. **Push Notifications**: Add expo-notifications
4. **Analytics**: Add Firebase Analytics
5. **Testing**: Add Jest and React Native Testing Library
6. **CI/CD**: Set up GitHub Actions or similar

## Support

For issues or questions:
- Check the main README.md
- Review code comments in service files
- All services use placeholder data - easy to replace

---

**Happy Farming! 🌾**
