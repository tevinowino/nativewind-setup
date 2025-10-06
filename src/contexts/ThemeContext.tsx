import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Language } from '../utils/translations';
import { STORAGE_KEYS } from '../utils/constants';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme Context Provider
 * Manages language and theme preferences
 * Following Single Responsibility Principle
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedLanguage = await SecureStore.getItemAsync(STORAGE_KEYS.LANGUAGE);
      if (savedLanguage === 'en' || savedLanguage === 'sw') {
        setLanguageState(savedLanguage);
      }

      const savedTheme = await SecureStore.getItemAsync(STORAGE_KEYS.THEME);
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.LANGUAGE, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newMode = !isDarkMode;
      await SecureStore.setItemAsync(STORAGE_KEYS.THEME, newMode ? 'dark' : 'light');
      setIsDarkMode(newMode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const value: ThemeContextType = {
    language,
    setLanguage,
    isDarkMode,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to use Theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
