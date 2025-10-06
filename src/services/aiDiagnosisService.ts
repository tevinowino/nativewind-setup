import { DiagnosisRequest, DiagnosisResult, ApiResponse } from '../types';
import { API_CONFIG } from '../utils/constants';
import { delay, generateId } from '../utils/helpers';

/**
 * AI Diagnosis Service
 * Handles crop/plant diagnosis API calls
 * Following Single Responsibility Principle
 */
class AIDiagnosisService {
  /**
   * Diagnose crop/plant from image
   */
  async diagnose(request: DiagnosisRequest): Promise<ApiResponse<DiagnosisResult>> {
    try {
      // Simulate API call with AI processing time
      await delay(3000);
      
      // Mock response - replace with actual AI API call
      // const formData = new FormData();
      // formData.append('image', {
      //   uri: request.imageUri,
      //   type: 'image/jpeg',
      //   name: 'crop-image.jpg',
      // });
      // if (request.location) {
      //   formData.append('location', JSON.stringify(request.location));
      // }
      // 
      // const response = await fetch(`${API_CONFIG.AI_DIAGNOSIS_API_URL}`, {
      //   method: 'POST',
      //   body: formData,
      // });
      
      const mockDiagnoses = [
        {
          cropName: 'Tomato',
          issue: 'Early Blight (Alternaria solani)',
          severity: 'medium' as const,
          confidence: 0.87,
          advice: 'Remove affected leaves immediately. Apply copper-based fungicide. Ensure proper spacing between plants for air circulation. Water at the base of plants, not overhead.',
          recommendedProducts: ['prod-1', 'prod-3', 'prod-5'],
        },
        {
          cropName: 'Maize',
          issue: 'Fall Armyworm Infestation',
          severity: 'high' as const,
          confidence: 0.92,
          advice: 'Apply recommended pesticides early morning or late evening. Scout fields regularly. Remove and destroy egg masses. Consider biological control agents.',
          recommendedProducts: ['prod-2', 'prod-4'],
        },
        {
          cropName: 'Coffee',
          issue: 'Coffee Berry Disease',
          severity: 'critical' as const,
          confidence: 0.89,
          advice: 'Immediate action required. Remove and burn infected berries. Apply copper-based fungicide. Improve drainage and reduce humidity around plants.',
          recommendedProducts: ['prod-3', 'prod-6'],
        },
        {
          cropName: 'Beans',
          issue: 'Healthy - No Issues Detected',
          severity: 'low' as const,
          confidence: 0.95,
          advice: 'Your crop appears healthy! Continue with regular care: adequate watering, proper fertilization, and regular monitoring for pests.',
          recommendedProducts: ['prod-1', 'prod-7'],
        },
      ];
      
      const randomDiagnosis = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)];
      
      const result: DiagnosisResult = {
        id: generateId(),
        ...randomDiagnosis,
        imageUri: request.imageUri,
        createdAt: new Date().toISOString(),
      };
      
      return {
        success: true,
        data: result,
        message: 'Diagnosis completed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to diagnose image. Please try again.',
      };
    }
  }

  /**
   * Get diagnosis history
   */
  async getDiagnosisHistory(userId: string): Promise<ApiResponse<DiagnosisResult[]>> {
    try {
      await delay(1000);
      
      // Mock response - replace with actual API call
      const mockHistory: DiagnosisResult[] = [
        {
          id: '1',
          cropName: 'Tomato',
          issue: 'Early Blight',
          severity: 'medium',
          confidence: 0.87,
          advice: 'Apply fungicide and remove affected leaves.',
          recommendedProducts: ['prod-1', 'prod-3'],
          imageUri: 'https://via.placeholder.com/300',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          cropName: 'Maize',
          issue: 'Fall Armyworm',
          severity: 'high',
          confidence: 0.92,
          advice: 'Apply pesticides and monitor regularly.',
          recommendedProducts: ['prod-2', 'prod-4'],
          imageUri: 'https://via.placeholder.com/300',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
      
      return {
        success: true,
        data: mockHistory,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch diagnosis history.',
      };
    }
  }

  /**
   * Get diagnosis by ID
   */
  async getDiagnosisById(diagnosisId: string): Promise<ApiResponse<DiagnosisResult>> {
    try {
      await delay(500);
      
      // Mock response
      const mockResult: DiagnosisResult = {
        id: diagnosisId,
        cropName: 'Tomato',
        issue: 'Early Blight',
        severity: 'medium',
        confidence: 0.87,
        advice: 'Apply fungicide and remove affected leaves.',
        recommendedProducts: ['prod-1', 'prod-3'],
        imageUri: 'https://via.placeholder.com/300',
        createdAt: new Date().toISOString(),
      };
      
      return {
        success: true,
        data: mockResult,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch diagnosis details.',
      };
    }
  }
}

export default new AIDiagnosisService();
