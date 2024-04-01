import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const isProdEnvironment = process.env.NODE_ENV === 'production';
const lng = (isProdEnvironment) ? 'en' : 'ru';

i18n 
  .use(initReactI18next)
  .init({
    resources,
    lng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;