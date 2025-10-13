import React, { createContext, useReducer } from 'react';
import { alertReducer, EmptyAlert } from './reducer';
import { AlertStateType, AlertDispatchType, AlertProviderProps } from './types';

export const AlertContext = createContext<
  | {
      state: AlertStateType;
      dispatch: AlertDispatchType; // connect the action to the state
    }
  | undefined
>(undefined);

export function AlertProvider({ children }: AlertProviderProps) {
  const [state, dispatch] = useReducer(alertReducer, EmptyAlert);
  const value = { state, dispatch };
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
