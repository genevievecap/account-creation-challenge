import React, { createContext, useReducer } from 'react';
import { accountReducer, AnonymousUser } from './reducer';
import { AccountStateType, AccountDispatchType, AccountProviderProps } from './types';

export const AccountContext = createContext<
  | {
      state: AccountStateType;
      dispatch: AccountDispatchType; // connect the action to the state
    }
  | undefined
>(undefined);

export function AccountProvider({ children }: AccountProviderProps) {
  const [state, dispatch] = useReducer(accountReducer, AnonymousUser);
  const value = { state, dispatch };
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
