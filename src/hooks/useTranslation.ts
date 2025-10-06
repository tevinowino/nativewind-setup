import { useTheme } from '../contexts/ThemeContext';
import { translate, TranslationKey } from '../utils/translations';

/**
 * Custom hook for translations
 * Following Single Responsibility Principle
 */
export const useTranslation = () => {
  const { language } = useTheme();

  const t = (key: TranslationKey): string => {
    return translate(key, language);
  };

  return { t, language };
};
