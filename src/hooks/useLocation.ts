import { useState, useEffect } from 'react';
import * as ExpoLocation from 'expo-location';
import { Location } from '../types';

interface UseLocationReturn {
  location: Location | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}

/**
 * Custom hook for location services
 * Following Single Responsibility Principle
 */
export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request permission
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      // Get current location
      const currentLocation = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Balanced,
      });

      // Get address from coordinates
      const addresses = await ExpoLocation.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const address = addresses[0]
        ? `${addresses[0].city || ''}, ${addresses[0].country || ''}`
        : undefined;

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        address,
      });
    } catch (err) {
      setError('Failed to get location');
      console.error('Location error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    loading,
    error,
    requestLocation,
  };
};
