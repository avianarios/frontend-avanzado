import { RouterReducerState } from '@ngrx/router-store';
import { UserState, initialUserState } from './user.state';
import { initialAuthState, AuthState } from './auth.state';

export interface AppState{
  router?: RouterReducerState;
  user: UserState;
  auth: AuthState;
}

export const initialAppState: AppState={
  user: initialUserState,
  auth: initialAuthState
};

export function getInitialState(): AppState{
  return initialAppState;
}
