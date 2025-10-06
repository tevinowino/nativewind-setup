import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useImagePicker } from '../hooks/useImagePicker';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import aiDiagnosisService from '../services/aiDiagnosisService';
import { DiagnosisResult } from '../types';
import { SEVERITY_COLORS } from '../utils/constants';
import { router } from 'expo-router';

/**
 * Diagnose Screen
 * Following Single Responsibility Principle
 */
export const DiagnoseScreen: React.FC = () => {
  const { imageUri, pickImage, takePhoto, clearImage } = useImagePicker();
  const { t } = useTranslation();
  
  const [diagnosing, setDiagnosing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleDiagnose = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select or take a photo first');
      return;
    }

    setDiagnosing(true);
    const response = await aiDiagnosisService.diagnose({ imageUri });
    setDiagnosing(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      Alert.alert('Error', response.error || 'Failed to diagnose image');
    }
  };

  const handleReset = () => {
    clearImage();
    setResult(null);
  };

  const handleViewProducts = () => {
    if (result?.recommendedProducts) {
      router.push('/(tabs)/marketplace');
    }
  };

  if (diagnosing) {
    return <Loading message={t('analyzing')} />;
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {t('diagnose')}
          </Text>
          <Text className="text-gray-600">
            Upload or take a photo of your crop for AI-powered diagnosis
          </Text>
        </View>

        {!result ? (
          <>
            {/* Image Preview */}
            {imageUri ? (
              <Card className="mb-6">
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-64 rounded-lg"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={clearImage}
                  className="absolute top-2 right-2 bg-red-500 w-10 h-10 rounded-full items-center justify-center"
                >
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </Card>
            ) : (
              <Card className="mb-6 items-center py-12">
                <Ionicons name="image-outline" size={64} color="#9ca3af" />
                <Text className="text-gray-500 mt-4">No image selected</Text>
              </Card>
            )}

            {/* Action Buttons */}
            <View className="gap-4 mb-6">
              <Button
                title={t('takePhoto')}
                onPress={takePhoto}
                variant="primary"
                fullWidth
                icon={<Ionicons name="camera" size={20} color="#ffffff" />}
              />
              
              <Button
                title={t('selectFromGallery')}
                onPress={pickImage}
                variant="outline"
                fullWidth
                icon={<Ionicons name="images" size={20} color="#16a34a" />}
              />
            </View>

            {imageUri && (
              <Button
                title="Diagnose Crop"
                onPress={handleDiagnose}
                fullWidth
              />
            )}
          </>
        ) : (
          <>
            {/* Diagnosis Results */}
            <Card className="mb-6">
              <Text className="text-2xl font-bold text-gray-900 mb-4">
                {t('diagnosisResults')}
              </Text>

              {/* Image */}
              <Image
                source={{ uri: result.imageUri }}
                className="w-full h-48 rounded-lg mb-4"
                resizeMode="cover"
              />

              {/* Crop Name */}
              <View className="mb-4">
                <Text className="text-gray-600 text-sm mb-1">{t('cropName')}</Text>
                <Text className="text-gray-900 font-semibold text-lg">
                  {result.cropName}
                </Text>
              </View>

              {/* Issue */}
              <View className="mb-4">
                <Text className="text-gray-600 text-sm mb-1">{t('issue')}</Text>
                <Text className="text-gray-900 font-semibold text-lg">
                  {result.issue}
                </Text>
              </View>

              {/* Severity & Confidence */}
              <View className="flex-row gap-4 mb-4">
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">{t('severity')}</Text>
                  <View
                    className="px-4 py-2 rounded-lg"
                    style={{ backgroundColor: SEVERITY_COLORS[result.severity] + '20' }}
                  >
                    <Text
                      className="font-semibold capitalize text-center"
                      style={{ color: SEVERITY_COLORS[result.severity] }}
                    >
                      {result.severity}
                    </Text>
                  </View>
                </View>
                
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">{t('confidence')}</Text>
                  <View className="bg-green-50 px-4 py-2 rounded-lg">
                    <Text className="text-green-600 font-semibold text-center">
                      {Math.round(result.confidence * 100)}%
                    </Text>
                  </View>
                </View>
              </View>

              {/* Advice */}
              <View className="mb-4">
                <Text className="text-gray-600 text-sm mb-2">{t('advice')}</Text>
                <View className="bg-blue-50 p-4 rounded-lg">
                  <Text className="text-gray-700 leading-6">{result.advice}</Text>
                </View>
              </View>

              {/* Recommended Products */}
              {result.recommendedProducts.length > 0 && (
                <View>
                  <Text className="text-gray-600 text-sm mb-2">
                    {t('recommendedProducts')}
                  </Text>
                  <Button
                    title="View Products"
                    onPress={handleViewProducts}
                    variant="outline"
                    fullWidth
                    icon={<Ionicons name="cart" size={20} color="#16a34a" />}
                  />
                </View>
              )}
            </Card>

            {/* New Diagnosis Button */}
            <Button
              title="New Diagnosis"
              onPress={handleReset}
              fullWidth
              icon={<Ionicons name="add-circle" size={20} color="#ffffff" />}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};
