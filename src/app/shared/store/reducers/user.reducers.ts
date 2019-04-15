import { Action } from '@ngrx/store';
import { initialUserState, UserState } from '../state/user.state';
import { AccionesUsuario } from '../actions/user.actions';


export function userReducer (state= initialUserState, action: AccionesUsuario){
  switch (action.type) {
    case AccionesUsuario.Cargar:
      return {  ...state, users: action.payload};
    default:
      return state;
  }
};
