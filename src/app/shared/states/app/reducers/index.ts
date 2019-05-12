import { ActionReducerMap } from '@ngrx/store';
import * as fromApp from './app.reducer';

export interface AppState {
  app: fromApp.AppState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: fromApp.reducer,
};
