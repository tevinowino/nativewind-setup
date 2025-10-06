# Dark Mode Implementation

## Overview
Successfully implemented light and dark mode support for the ShambaPal React Native app.

## Changes Made

### 1. Tailwind Configuration (`tailwind.config.js`)
- Added `darkMode: 'class'` configuration
- Created theme-aware color tokens:
  - `primary` (light/dark variants)
  - `background` (light/dark)
  - `card` (light/dark)
  - `text.primary` and `text.secondary` (light/dark)
  - `border` (light/dark)

### 2. Theme Colors Hook (`src/hooks/useThemeColors.ts`)
- Created custom hook to provide theme-aware colors
- Returns appropriate colors based on `isDarkMode` state
- Provides consistent color scheme across the app

### 3. Card Component (`src/components/Card.tsx`)
- Updated to use `useThemeColors` hook
- Dynamic background color based on theme
- Supports custom styles via props

### 4. Home Screen (`src/screens/HomeScreen.tsx`)
- Integrated `useThemeColors` hook
- Updated all text colors to be theme-aware
- Updated background colors for cards and sections
- Header background adapts to theme
- Icons and UI elements use theme colors

### 5. Profile Screen (`src/screens/ProfileScreen.tsx`)
- Added **Dark Mode Toggle** with Switch component
- Shows moon icon for dark mode, sun icon for light mode
- New "Appearance" section in settings
- All UI elements are theme-aware
- Menu items use dynamic colors

### 6. Translations (`src/utils/translations.ts`)
- Added new translation keys:
  - `appearance` (English: "Appearance", Swahili: "Muonekano")
  - `darkMode` (English: "Dark Mode", Swahili: "Hali ya Giza")
  - `viewAll` (English: "View All", Swahili: "Tazama Zote")

### 7. Theme Context (`src/contexts/ThemeContext.tsx`)
- Already existed with dark mode support
- Persists theme preference using `expo-secure-store`
- Provides `isDarkMode` state and `toggleDarkMode` function

## How It Works

1. **Theme State**: The `ThemeContext` manages the dark mode state
2. **Persistence**: Theme preference is saved to secure storage
3. **Color Hook**: `useThemeColors` provides the right colors for current theme
4. **Component Updates**: All components use the hook to get theme-aware colors
5. **User Control**: Users can toggle dark mode in Profile > Appearance

## Color Scheme

### Light Mode
- Background: `#f9fafb` (gray-50)
- Card: `#ffffff` (white)
- Text Primary: `#1f2937` (gray-900)
- Text Secondary: `#6b7280` (gray-600)
- Primary: `#16a34a` (green-600)

### Dark Mode
- Background: `#111827` (gray-900)
- Card: `#1f2937` (gray-800)
- Text Primary: `#f9fafb` (gray-50)
- Text Secondary: `#9ca3af` (gray-400)
- Primary: `#22c55e` (green-500)

## Testing

To test dark mode:
1. Navigate to Profile tab
2. Find "Appearance" section
3. Toggle the "Dark Mode" switch
4. Navigate through the app to see theme changes

## Future Enhancements

- Add system theme detection (auto-follow device theme)
- Extend dark mode to all remaining screens
- Add smooth theme transition animations
- Create theme preview before applying
