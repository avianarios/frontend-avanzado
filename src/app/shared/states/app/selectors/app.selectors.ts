import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromApp from '../reducers/app.reducer';

export const getAppState = createFeatureSelector<fromApp.AppState>('app');
export const getProvinces = createSelector(getAppState, fromApp.getProvinces);
