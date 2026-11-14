import * as React from 'react';
import { useTranslation } from 'react-i18next';

const NoMatch = () => {
  const { t } = useTranslation();

  return (
    <div className="app-background custom-vertically-center">
      <span className="h5 text-light">{`${t('404 | Not Found')}`}</span>
    </div>
  );
};

export default NoMatch;
