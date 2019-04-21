import { RouterReducerState } from '@ngrx/router-store';
import { UserState, initialUserState } from './user.state';
import { AccionesAutenticacion, EAccionesAutenticacion } from '../actions/aut.actions';
import { estadoAut, estadoInicialAut } from './aut.state';



export interface AppState{
  router?: RouterReducerState;
  user: UserState;
  auth: estadoAut;
}

export const initialAppState: AppState={
  user: initialUserState,
  auth: estadoInicialAut
};

export function getInitialState(): AppState{
  return initialAppState;
}
