import { ReactNode } from 'react';

type AlertType = {
  message: string;
};

export type AlertStateType = {
  alert: AlertType;
};

export type AlertDispatchType = (action: AlertActions) => void;

export type AlertProviderProps = {
  children: ReactNode;
};

export enum AlertActionTypes {
  SET_ALERT = 'SET_ALERT',
  DELETE_ALERT = 'DELETE_ALERT',
}

interface SetAlert {
  type: typeof AlertActionTypes.SET_ALERT;
  payload: {
    alert: AlertType;
  };
}

interface DeleteAlert {
  type: typeof AlertActionTypes.DELETE_ALERT;
}

export type AlertActions = SetAlert | DeleteAlert;
