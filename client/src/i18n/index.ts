import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

// RTL languages list
export const RTL_LANGUAGES = ['ar', 'he', 'fa'];

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ar: { translation: ar },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Function to check if current language is RTL
export const isRTL = (language?: string) => {
  const currentLang = language || i18n.language;
  return RTL_LANGUAGES.includes(currentLang);
};

// Function to get text direction
export const getDirection = (language?: string) => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

export default i18n;
