import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, RouterNavigatedAction } from '@ngrx/router-store';

export const getRouterState = createFeatureSelector<RouterReducerState>('router');
export const getURL = createSelector(
  getRouterState,
  route => route.state.url,
);

export function getURLOfAction(action: RouterNavigatedAction): string {
  return action.payload.event.url;
}
