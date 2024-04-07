import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>404</h1>
      <p>{t('pageNotFound')}</p>
    </div>
  );
};

export default NotFound;
