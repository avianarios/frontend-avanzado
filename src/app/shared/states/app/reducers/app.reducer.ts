import * as AppActions from '../actions';

export interface AppState {
  provinces: any[];
}

export const initialState: AppState = {
  provinces: []
};

export function reducer(state = initialState, action): AppState {
  return state;
}

export const getProvinces = (state: AppState) => state.provinces;
