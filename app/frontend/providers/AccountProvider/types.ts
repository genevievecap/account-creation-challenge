import { ReactNode } from 'react';

export type AccountStateType = {
  username: string;
  isValid: boolean;
};

// a function that takes in an action
export type AccountDispatchType = (action: AccountActions) => void;

export type AccountProviderProps = {
  children: ReactNode;
};

export enum AccountActionTypes {
  SET_USERNAME = 'SET_USERNAME',
  DELETE_USERNAME = 'DELETE_USERNAME',
}

interface SetUsername {
  type: typeof AccountActionTypes.SET_USERNAME;
  payload: {
    username: string;
  };
}

interface DeleteUsername {
  type: typeof AccountActionTypes.DELETE_USERNAME;
}

export type AccountActions = SetUsername | DeleteUsername;
