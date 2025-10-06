import { useTheme } from '../contexts/ThemeContext';

/**
 * Custom hook to get theme-aware colors
 */
export const useThemeColors = () => {
  const { isDarkMode } = useTheme();

  return {
    background: isDarkMode ? '#111827' : '#f9fafb',
    card: isDarkMode ? '#1f2937' : '#ffffff',
    text: {
      primary: isDarkMode ? '#f9fafb' : '#1f2937',
      secondary: isDarkMode ? '#9ca3af' : '#6b7280',
    },
    border: isDarkMode ? '#374151' : '#e5e7eb',
    primary: isDarkMode ? '#22c55e' : '#16a34a',
    headerBg: isDarkMode ? '#1f2937' : '#16a34a',
    headerText: '#ffffff',
  };
};
