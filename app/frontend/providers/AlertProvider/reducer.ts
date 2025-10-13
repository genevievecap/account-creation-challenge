import { Reducer } from 'react';
import { AlertActions, AlertActionTypes, AlertStateType } from './types';

export const EmptyAlert = {
  alert: { message: '' },
};

export const alertReducer: Reducer<AlertStateType, AlertActions> = (state, action) => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT: {
      return {
        ...state,
        alert: action.payload?.alert,
      };
    }
    case AlertActionTypes.DELETE_ALERT: {
      return {
        ...state,
        alert: { message: '' },
      };
    }
  }
};
