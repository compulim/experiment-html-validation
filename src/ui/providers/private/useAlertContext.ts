import { useContext } from 'react';

import AlertContext from './AlertContext';

export default function useAlertContext() {
  const contextValue = useContext(AlertContext);

  if (!contextValue) {
    throw new Error('useAlertContext() can only used under <AlertComposer>.');
  }

  return contextValue;
}
