import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user.reducer';

export interface UserState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  user: fromUser.reducer,
};
