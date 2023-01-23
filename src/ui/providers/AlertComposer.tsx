import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AlertContext from './private/AlertContext';

import type { CSSProperties, PropsWithChildren } from 'react';

const HIDE_ALERT_AFTER_MS = 1000;

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
  const [messageObject, setMessageObject] = useState<{ message: string }>({ message: '' });
  const alertElementRef = useRef<HTMLSpanElement | null>(null);

  const showAlert = useCallback((message: string): void => setMessageObject({ message }), [setMessageObject]);

  const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

  useEffect(() => {
    let { current: alertElement } = alertElementRef;

    if (!alertElement) {
      return;
    }

    alertElement.innerText = '';

    if (!messageObject.message) {
      return;
    }

    alertElement.innerText = messageObject.message;

    // Hides/removes alert message after queued to the screen reader.
    // This prevents screen reader from picking it up by narrating the whole page, such as CAPSLOCK + DOWN.
    setTimeout(() => {
      if (alertElement) {
        alertElement.innerText = '';
      }
    }, HIDE_ALERT_AFTER_MS);

    return () => {
      alertElement = null;
    };
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
