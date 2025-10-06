# Shamba Pal API Requirements

## Overview
This document outlines the backend API endpoints required for the **Shamba Pal** React Native farming application. The app uses Firebase Authentication for user management, while the client backend provides all business logic and data management endpoints.

## Architecture
- **Frontend**: React Native with Expo Router, NativeWind, TypeScript
- **Authentication**: Firebase Authentication
- **Backend**: Client-provided REST API
- **Target Market**: Kenyan farmers
- **Languages**: English/Swahili support required

---

## API Endpoints

### 1. AI Crop Diagnosis Endpoints 🔬

#### POST `/api/diagnosis/analyze`
**Purpose**: Upload crop image for AI-powered analysis

**Request**:
```http
POST /api/diagnosis/analyze
Content-Type: multipart/form-data
Authorization: Bearer <firebase-id-token>

Body (FormData):
- image: File (crop image)
- location: JSON string (optional) { "latitude": number, "longitude": number }
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "diag_123",
    "cropName": "Tomato",
    "issue": "Early Blight (Alternaria solani)",
    "severity": "medium",
    "confidence": 0.87,
    "advice": "Remove affected leaves immediately. Apply copper-based fungicide...",
    "recommendedProducts": ["prod-1", "prod-3", "prod-5"],
    "imageUrl": "https://storage.example.com/images/diag_123.jpg",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Diagnosis completed successfully"
}
```

#### GET `/api/diagnosis/history/{email}`
**Purpose**: Get user's diagnosis history

**Request**:
```http
GET /api/diagnosis/history/{email}
Authorization: Bearer <firebase-id-token>
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "diag_123",
      "cropName": "Tomato",
      "issue": "Early Blight",
      "severity": "medium",
      "confidence": 0.87,
      "advice": "Apply fungicide and remove affected leaves.",
      "recommendedProducts": ["prod-1", "prod-3"],
      "imageUrl": "https://storage.example.com/images/diag_123.jpg",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### GET `/api/diagnosis/{diagnosisId}`
**Purpose**: Get specific diagnosis details

**Request**:
```http
GET /api/diagnosis/{diagnosisId}
Authorization: Bearer <firebase-id-token>
```

**Response**: Same as diagnosis result object above

---

### 2. Product/Marketplace Endpoints 🛒

**Note**: All products include a `marketplaceUrl` field that directs users to external marketplace/supplier websites for purchasing.

#### GET `/api/products`
**Purpose**: Get all products with optional category filtering

**Request**:
```http
GET /api/products?category=seeds&page=1&limit=20
Authorization: Bearer <firebase-id-token>
```

**Query Parameters**:
- `category` (optional): `seeds`, `fertilizers`, `pesticides`, `tools`, `equipment`, or `all`
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-1",
      "name": "Hybrid Maize Seeds - H614",
      "category": "seeds",
      "description": "High-yield hybrid maize seeds suitable for various climates...",
      "price": 2500,
      "currency": "KES",
      "imageUrl": "https://storage.example.com/products/prod-1.jpg",
      "inStock": true,
      "rating": 4.5,
      "reviews": 128,
      "supplier": "Kenya Seed Company",
      "marketplaceUrl": "https://marketplace.example.com/products/hybrid-maize-seeds-h614"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

#### GET `/api/products/{productId}`
**Purpose**: Get single product details

**Request**:
```http
GET /api/products/{productId}
Authorization: Bearer <firebase-id-token>
```

**Response**: Single product object (same structure as above)

#### POST `/api/products/batch`
**Purpose**: Get multiple products by IDs (for recommendations)

**Request**:
```http
POST /api/products/batch
Content-Type: application/json
Authorization: Bearer <firebase-id-token>

{
  "productIds": ["prod-1", "prod-3", "prod-5"]
}
```

**Response**: Array of product objects

---

### 3. Order Management Endpoints 📦

#### POST `/api/orders`
**Purpose**: Create new order

**Request**:
```http
POST /api/orders
Content-Type: application/json
Authorization: Bearer <firebase-id-token>

{
  "items": [
    {
      "productId": "prod-1",
      "quantity": 2,
      "price": 2500
    }
  ],
  "deliveryAddress": "123 Farm Road, Nairobi, Kenya",
  "paymentMethod": "M-Pesa",
  "totalAmount": 5000
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "userEmail": "farmer@example.com",
    "items": [
      {
        "productId": "prod-1",
        "productName": "Hybrid Maize Seeds",
        "quantity": 2,
        "price": 2500,
        "subtotal": 5000
      }
    ],
    "totalAmount": 5000,
    "status": "pending",
    "deliveryAddress": "123 Farm Road, Nairobi, Kenya",
    "paymentMethod": "M-Pesa",
    "createdAt": "2024-01-15T10:30:00Z",
    "estimatedDelivery": "2024-01-18T00:00:00Z"
  },
  "message": "Order placed successfully"
}
```

#### GET `/api/orders/{email}`
**Purpose**: Get user's order history

**Request**:
```http
GET /api/orders/{email}?status=all&page=1&limit=10
Authorization: Bearer <firebase-id-token>
```

**Query Parameters**:
- `status` (optional): Filter by order status
- `page`, `limit`: Pagination

**Response**: Array of order objects

#### GET `/api/orders/details/{orderId}`
**Purpose**: Get specific order details

**Request**:
```http
GET /api/orders/details/{orderId}
Authorization: Bearer <firebase-id-token>
```

**Response**: Single order object with full details

#### PUT `/api/orders/{orderId}/status`
**Purpose**: Update order status (admin/delivery updates)

**Request**:
```http
PUT /api/orders/{orderId}/status
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "status": "shipped",
  "trackingNumber": "TRK123456",
  "notes": "Package dispatched via courier"
}
```

---

### 4. Weather Data Endpoints 🌤️

#### GET `/api/weather`
**Purpose**: Get weather data for location

**Request**:
```http
GET /api/weather?lat=-1.286389&lon=36.817223
Authorization: Bearer <firebase-id-token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "location": "Nairobi, Kenya",
    "current": {
      "temperature": 24,
      "humidity": 65,
      "windSpeed": 12,
      "condition": "Partly Cloudy",
      "icon": "02d"
    },
    "forecast": [
      {
        "date": "2024-01-15T00:00:00Z",
        "temperature": { "min": 18, "max": 26 },
        "condition": "Partly Cloudy",
        "icon": "02d",
        "precipitation": 10
      }
    ],
    "alerts": [
      {
        "id": "alert-1",
        "type": "warning",
        "title": "Heavy Rain Expected",
        "description": "Heavy rainfall expected in the next 48 hours...",
        "severity": "medium",
        "startTime": "2024-01-16T00:00:00Z",
        "endTime": "2024-01-17T00:00:00Z"
      }
    ],
    "farmingTips": [
      "Good weather for planting this week",
      "Prepare drainage systems for upcoming rain"
    ]
  }
}
```

#### GET `/api/weather/alerts/{location}`
**Purpose**: Get weather alerts for specific area

**Request**:
```http
GET /api/weather/alerts/nairobi
Authorization: Bearer <firebase-id-token>
```

#### GET `/api/weather/farming-tips`
**Purpose**: Get farming tips based on weather conditions

**Request**:
```http
GET /api/weather/farming-tips?condition=rainy&crop=maize
Authorization: Bearer <firebase-id-token>
```

---

### 5. User Profile Endpoints 👤

#### GET `/api/users/{email}/profile`
**Purpose**: Get user profile data (non-auth data)

**Request**:
```http
GET /api/users/{email}/profile
Authorization: Bearer <firebase-id-token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "firebaseUid": "firebase_uid_123",
    "farmingExperience": "5-10 years",
    "cropTypes": ["maize", "tomatoes", "beans"],
    "farmSize": 2.5,
    "location": {
      "latitude": -1.286389,
      "longitude": 36.817223,
      "address": "Nairobi, Kenya"
    },
    "language": "en",
    "preferences": {
      "notifications": true,
      "weatherAlerts": true,
      "marketingEmails": false
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT `/api/users/{email}/profile`
**Purpose**: Update user profile

**Request**:
```http
PUT /api/users/{email}/profile
Content-Type: application/json
Authorization: Bearer <firebase-id-token>

{
  "farmingExperience": "5-10 years",
  "cropTypes": ["maize", "tomatoes"],
  "farmSize": 3.0,
  "language": "sw",
  "preferences": {
    "notifications": true,
    "weatherAlerts": true
  }
}
```

#### GET `/api/users/{email}/dashboard`
**Purpose**: Get dashboard data for home screen

**Request**:
```http
GET /api/users/{email}/dashboard
Authorization: Bearer <firebase-id-token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "recentDiagnosis": { /* latest diagnosis object */ },
    "orderSummary": {
      "totalOrders": 5,
      "pendingOrders": 1,
      "totalSpent": 15000
    },
    "recommendations": {
      "products": ["prod-1", "prod-3"],
      "tips": ["Apply fertilizer before rain season"]
    },
    "weatherSummary": { /* current weather object */ }
  }
}
```

---

## Data Models

### User Profile
```typescript
interface UserProfile {
  firebaseUid: string;
  farmingExperience: string;
  cropTypes: string[];
  farmSize: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  language: 'en' | 'sw';
  preferences: {
    notifications: boolean;
    weatherAlerts: boolean;
    marketingEmails: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Diagnosis Result
```typescript
interface DiagnosisResult {
  id: string;
  userEmail: string;
  cropName: string;
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  advice: string;
  recommendedProducts: string[];
  imageUrl: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}
```

### Product
```typescript
interface Product {
  id: string;
  name: string;
  category: 'seeds' | 'fertilizers' | 'pesticides' | 'tools' | 'equipment';
  description: string;
  price: number;
  currency: 'KES';
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  supplier?: string;
  marketplaceUrl: string;
  createdAt: string;
  updatedAt: string;
}
```

### Order
```typescript
interface Order {
  id: string;
  userEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}
```

---

## Authentication & Security

### Firebase Integration
- All endpoints require Firebase ID token in Authorization header
- Backend should verify Firebase tokens and extract user email for identification
- Use Firebase Admin SDK for token verification
- User email from Firebase token should be used as the primary identifier for all user-related operations

### Security Headers
```http
Authorization: Bearer <firebase-id-token>
Content-Type: application/json
```

### Error Responses
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

---

## Third-Party Integrations

### Required External Services
1. **AI/ML Service**: For crop disease detection (Google Vision AI, AWS Rekognition, or custom ML model)
2. **Weather API**: OpenWeatherMap, AccuWeather, or similar
3. **Payment Gateway**: M-Pesa integration for Kenyan market
4. **Cloud Storage**: AWS S3, Google Cloud Storage for images
5. **Push Notifications**: Firebase Cloud Messaging

### Localization
- All text responses should support English (`en`) and Swahili (`sw`)
- Use user's language preference from profile
- Farming tips and advice should be culturally relevant to Kenyan farming practices

---

## Performance & Scalability

### Caching Strategy
- Cache weather data for 30 minutes
- Cache product catalog for 1 hour
- Cache user profiles for 15 minutes

### Rate Limiting
- AI diagnosis: 10 requests per hour per user
- General API: 1000 requests per hour per user
- Image uploads: 50MB max file size

### Database Considerations
- Index on userEmail for all user-related queries
- Index on createdAt for time-based queries
- Consider read replicas for product catalog queries

---

## Development Notes

### Environment Variables
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
WEATHER_API_KEY=your-weather-api-key
AI_SERVICE_API_KEY=your-ai-service-key
MPESA_CONSUMER_KEY=your-mpesa-key
MPESA_CONSUMER_SECRET=your-mpesa-secret
```

### API Base URL
- Development: `https://api-dev.shambapal.com`
- Production: `https://api.shambapal.com`

### Testing
- Provide mock endpoints for development
- Include sample data for all endpoints
- Support for test Firebase users
