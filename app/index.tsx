import "./globals.css";
import { View, ActivityIndicator } from 'react-native';

/**
 * Initial loading screen
 * Navigation handled in _layout.tsx
 */
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-green-600">
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}