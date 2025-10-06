import * as SecureStore from 'expo-secure-store';
import { User, LoginCredentials, SignUpCredentials, ApiResponse } from '../types';
import { STORAGE_KEYS, API_CONFIG } from '../utils/constants';
import { delay } from '../utils/helpers';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 * Following Single Responsibility Principle
 */
class AuthService {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // Simulate API call
      await delay(1500);
      
      // Mock response - replace with actual API call
      // const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials),
      // });
      
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Farmer',
        language: 'en',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store token securely
      await this.storeToken(mockToken);
      await this.storeUser(mockUser);
      
      return {
        success: true,
        data: { user: mockUser, token: mockToken },
        message: 'Login successful',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please check your credentials.',
      };
    }
  }

  /**
   * Sign up new user
   */
  async signUp(credentials: SignUpCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // Simulate API call
      await delay(1500);
      
      // Mock response - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        phone: credentials.phone,
        language: 'en',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      await this.storeToken(mockToken);
      await this.storeUser(mockUser);
      
      return {
        success: true,
        data: { user: mockUser, token: mockToken },
        message: 'Account created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Sign up failed. Please try again.',
      };
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle(): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // Simulate Google sign-in
      await delay(1500);
      
      // Mock response - implement actual Google Sign-In
      const mockUser: User = {
        id: Date.now().toString(),
        email: 'user@gmail.com',
        name: 'Google User',
        language: 'en',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-google-token-' + Date.now();
      
      await this.storeToken(mockToken);
      await this.storeUser(mockUser);
      
      return {
        success: true,
        data: { user: mockUser, token: mockToken },
        message: 'Google sign-in successful',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Google sign-in failed.',
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<ApiResponse<void>> {
    try {
      await delay(1500);
      
      // Mock response - replace with actual API call
      return {
        success: true,
        message: 'Password reset link sent to your email',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send reset link.',
      };
    }
  }

  /**
   * Get stored token
   */
  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Get stored user
   */
  async getStoredUser(): Promise<User | null> {
    const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Store token securely
   */
  private async storeToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  /**
   * Store user data
   */
  private async storeUser(user: User): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      await delay(1000);
      
      const currentUser = await this.getStoredUser();
      if (!currentUser) {
        return { success: false, error: 'User not found' };
      }
      
      const updatedUser = { ...currentUser, ...updates };
      await this.storeUser(updatedUser);
      
      return {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update profile.',
      };
    }
  }
}

export default new AuthService();
