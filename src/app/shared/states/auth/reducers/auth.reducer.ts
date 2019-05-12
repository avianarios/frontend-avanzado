import * as AuthActions from '../actions';

export interface AuthState {
  token: string;
}

export const initialState: AuthState = {
  token: ''
};

export function reducer(
  state = initialState,
  action: AuthActions.All
): AuthState {
  switch (action.type) {
    case AuthActions.IDENTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case AuthActions.IDENTIFICATION_LOGOUT: {
      return {
        ...state,
        ...initialState
      };
    }
    case AuthActions.IDENTIFICATION_REFRESH: {
      return {
        ...state,
        ...action.payload
      };
    }
  }
  return state;
}

export const getToken = (state: AuthState) => state.token;
