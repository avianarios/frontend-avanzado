import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const getAuth = createFeatureSelector<fromAuth.AuthState>('auth');
export const getToken = createSelector(
  getAuth,
  fromAuth.getToken
);
