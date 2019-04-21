import { Action } from '@ngrx/store';
import { initialUserState, UserState } from '../state/user.state';
import { AccionesUsuario, EAccionesUsuario } from '../actions/user.actions';

export const userReducer = (state = initialUserState, action: AccionesUsuario): UserState => {
  switch (action.type) {
    case EAccionesUsuario.CargarUsuario:
      return {  ...state};
    case EAccionesUsuario.CargarUsuarioExito:
      return {  ...state, personales: action.payload.personales, formacion: action.payload.formacion, idiomas: action.payload.idiomas, experiencia: action.payload.experiencia, ofertas: action.payload.ofertas};
    default:
      return state;
  }
};
