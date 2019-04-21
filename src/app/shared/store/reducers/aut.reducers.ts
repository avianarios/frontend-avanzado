import { Action } from '@ngrx/store';
import { estadoInicialAut, estadoAut } from '../state/aut.state';
import { AccionesAutenticacion, EAccionesAutenticacion } from '../actions/aut.actions';

export const autenticacionReducers = (state = estadoInicialAut, action: AccionesAutenticacion): estadoAut => {
  switch (action.type) {
    case EAccionesAutenticacion.CredencialesCorrectas:
      return {  ...state, correo:action.payload.correo, clave:action.payload.clave };
    default:
      return state;
  }
};
