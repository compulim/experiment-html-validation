import { createContext } from 'react';

type Type = { showAlert: (message: string) => void };

const AlertContext = createContext<Type | undefined>(undefined);

export default AlertContext;
