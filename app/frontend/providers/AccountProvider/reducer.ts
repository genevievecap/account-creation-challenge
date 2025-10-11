import { Reducer } from 'react';
import { AccountActions, AccountActionTypes } from './types';
import { AccountStateType } from './types';

export const AnonymousUser = {
  username: '',
  isValid: false,
};

export const accountReducer: Reducer<AccountStateType, AccountActions> = (state, action) => {
  switch (action.type) {
    case AccountActionTypes.SET_USERNAME: {
      return {
        ...state,
        username: action.payload?.username,
        isValid: true,
      };
    }
    case AccountActionTypes.DELETE_USERNAME: {
      return {
        ...state,
        username: '',
        isValid: false,
      };
    }
  }
};
