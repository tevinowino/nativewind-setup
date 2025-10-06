// Translation utility for English and Kiswahili
export const translations = {
  en: {
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    phone: 'Phone Number',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signInWithGoogle: 'Sign in with Google',
    resetPassword: 'Reset Password',
    
    // Navigation
    home: 'Home',
    diagnose: 'Diagnose',
    marketplace: 'Marketplace',
    weather: 'Weather',
    profile: 'Profile',
    orders: 'Orders',
    
    // Home Screen
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    quickActions: 'Quick Actions',
    recentDiagnosis: 'Recent Diagnosis',
    weatherToday: 'Weather Today',
    
    // Diagnose Screen
    uploadImage: 'Upload Image',
    takePhoto: 'Take Photo',
    selectFromGallery: 'Select from Gallery',
    analyzing: 'Analyzing...',
    diagnosisResults: 'Diagnosis Results',
    cropName: 'Crop Name',
    issue: 'Issue',
    severity: 'Severity',
    confidence: 'Confidence',
    advice: 'Advice',
    recommendedProducts: 'Recommended Products',
    
    // Marketplace
    allProducts: 'All Products',
    seeds: 'Seeds',
    fertilizers: 'Fertilizers',
    pesticides: 'Pesticides',
    tools: 'Tools',
    equipment: 'Equipment',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    cart: 'Cart',
    checkout: 'Checkout',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    
    // Weather
    currentWeather: 'Current Weather',
    forecast: 'Forecast',
    alerts: 'Alerts',
    farmingTips: 'Farming Tips',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    
    // Profile
    language: 'Language',
    settings: 'Settings',
    about: 'About',
    help: 'Help',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    viewAll: 'View All',
    
    // Orders
    myOrders: 'My Orders',
    orderHistory: 'Order History',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    retry: 'Retry',
    noData: 'No data available',
  },
  sw: {
    // Auth
    login: 'Ingia',
    signup: 'Jisajili',
    logout: 'Toka',
    email: 'Barua Pepe',
    password: 'Nenosiri',
    name: 'Jina',
    phone: 'Nambari ya Simu',
    forgotPassword: 'Umesahau Nenosiri?',
    dontHaveAccount: 'Huna akaunti?',
    alreadyHaveAccount: 'Una akaunti tayari?',
    signInWithGoogle: 'Ingia na Google',
    resetPassword: 'Weka Upya Nenosiri',
    
    // Navigation
    home: 'Nyumbani',
    diagnose: 'Chunguza',
    marketplace: 'Soko',
    weather: 'Hali ya Hewa',
    profile: 'Wasifu',
    orders: 'Maagizo',
    
    // Home Screen
    welcome: 'Karibu',
    dashboard: 'Dashibodi',
    quickActions: 'Vitendo vya Haraka',
    recentDiagnosis: 'Uchunguzi wa Hivi Karibuni',
    weatherToday: 'Hali ya Hewa Leo',
    
    // Diagnose Screen
    uploadImage: 'Pakia Picha',
    takePhoto: 'Piga Picha',
    selectFromGallery: 'Chagua kutoka Matunzio',
    analyzing: 'Inachanganua...',
    diagnosisResults: 'Matokeo ya Uchunguzi',
    cropName: 'Jina la Zao',
    issue: 'Tatizo',
    severity: 'Ukali',
    confidence: 'Uhakika',
    advice: 'Ushauri',
    recommendedProducts: 'Bidhaa Zinazopendekezwa',
    
    // Marketplace
    allProducts: 'Bidhaa Zote',
    seeds: 'Mbegu',
    fertilizers: 'Mbolea',
    pesticides: 'Dawa za Wadudu',
    tools: 'Zana',
    equipment: 'Vifaa',
    addToCart: 'Ongeza kwenye Kikapu',
    buyNow: 'Nunua Sasa',
    cart: 'Kikapu',
    checkout: 'Maliza Ununuzi',
    inStock: 'Inapatikana',
    outOfStock: 'Haipo',
    
    // Weather
    currentWeather: 'Hali ya Hewa Sasa',
    forecast: 'Utabiri',
    alerts: 'Tahadhari',
    farmingTips: 'Vidokezo vya Kilimo',
    temperature: 'Joto',
    humidity: 'Unyevu',
    windSpeed: 'Kasi ya Upepo',
    
    // Profile
    language: 'Lugha',
    settings: 'Mipangilio',
    about: 'Kuhusu',
    help: 'Msaada',
    appearance: 'Muonekano',
    darkMode: 'Hali ya Giza',
    viewAll: 'Tazama Zote',
    
    // Orders
    myOrders: 'Maagizo Yangu',
    orderHistory: 'Historia ya Maagizo',
    pending: 'Inasubiri',
    processing: 'Inashughulikiwa',
    shipped: 'Imetumwa',
    delivered: 'Imefikishwa',
    cancelled: 'Imeghairiwa',
    
    // Common
    save: 'Hifadhi',
    cancel: 'Ghairi',
    delete: 'Futa',
    edit: 'Hariri',
    search: 'Tafuta',
    filter: 'Chuja',
    loading: 'Inapakia...',
    error: 'Hitilafu',
    success: 'Imefanikiwa',
    retry: 'Jaribu Tena',
    noData: 'Hakuna data',
  },
};

export type Language = 'en' | 'sw';
export type TranslationKey = keyof typeof translations.en;

export const translate = (key: TranslationKey, language: Language = 'en'): string => {
  return translations[language][key] || translations.en[key] || key;
};
