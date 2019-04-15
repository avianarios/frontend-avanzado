import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';

const appState = (state: AppState) => state;

export const selectAuth = createSelector(
  appState,
  (state: AppState) => state.auth
);
