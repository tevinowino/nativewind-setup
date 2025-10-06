import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

interface UseImagePickerReturn {
  imageUri: string | null;
  loading: boolean;
  error: string | null;
  pickImage: () => Promise<void>;
  takePhoto: () => Promise<void>;
  clearImage: () => void;
}

/**
 * Custom hook for image picking
 * Following Single Responsibility Principle
 */
export const useImagePicker = (): UseImagePickerReturn => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access gallery denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      setError('Failed to pick image');
      console.error('Image picker error:', err);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access camera denied');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      setError('Failed to take photo');
      console.error('Camera error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageUri(null);
    setError(null);
  };

  return {
    imageUri,
    loading,
    error,
    pickImage,
    takePhoto,
    clearImage,
  };
};
