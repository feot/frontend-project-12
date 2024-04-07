import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const i18nInstance = i18n.createInstance();
const { REACT_APP_RUNTIME_ENV: runtimeEnv } = process.env;
const lng = (runtimeEnv === 'production') ? 'en' : 'ru';

i18nInstance.use(initReactI18next);
i18nInstance.init({
  resources,
  lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18nInstance;
