import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import profanityFilter from 'leo-profanity';
import resources from './locales/index.js';

const { REACT_APP_RUNTIME_ENV: runtimeEnv } = process.env;
const lng = (runtimeEnv === 'production') ? 'en' : 'ru';

const profanityFilterInit = () => {
  profanityFilter.list();
  profanityFilter.clearList();
  profanityFilter.add(profanityFilter.getDictionary('en'));
  profanityFilter.add(profanityFilter.getDictionary('ru'));
  profanityFilter.list();
};
profanityFilterInit();

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
