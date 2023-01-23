import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AlertContext from './private/AlertContext';

import type { CSSProperties, PropsWithChildren } from 'react';

const STYLE: CSSProperties = {
  color: 'transparent',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  whiteSpace: 'nowrap',
  width: 1
};

type Props = PropsWithChildren<{
  alertClassName?: string;
}>;

const AlertComposer = ({ alertClassName, children }: Props) => {
  const [messageObject, setMessage] = useState({ message: '' });
  const alertElementRef = useRef<HTMLSpanElement | null>(null);

  const showAlert = useCallback((message: string): void => setMessage({ message }), [setMessage]);

  const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

  useEffect(() => {
    const { current: alertElement } = alertElementRef;

    if (alertElement) {
      alertElement.innerText = '';
      alertElement.innerText = messageObject.message;
    }
  }, [alertElementRef, messageObject]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <span
        className={alertClassName}
        ref={alertElementRef}
        role="alert"
        style={typeof alertClassName === 'undefined' ? STYLE : undefined}
      />
    </AlertContext.Provider>
  );
};

export default AlertComposer;
