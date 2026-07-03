import React from 'react';
import { useMediaQuery } from './utils/useMediaQuery';
import App from './App';
import AppMobile from './AppMobile';

const AppSwitcher = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <AppMobile />;
  }

  return <App />;
};

export default AppSwitcher;
