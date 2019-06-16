// store interface
import { AuthState } from './auth/reducers/auth.reducer';
import { UserState } from './user/reducers/user.reducer';


import { AppState } from './app';

export interface AppStore {
  app: AppState;
  auth: AuthState;
  user: UserState;
}
