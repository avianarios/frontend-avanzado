import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';

const selectUser = (state: AppState) => state.user;


/*PARECE FUNCIONAR
const usuario = (state: UserState) => state;
export const seleccionaPersonales2 = createSelector(
  usuario,
  (state: UserState) => state.personales
);*/

export const seleccionaPersonales = createSelector(
  selectUser,
  (state: UserState) => state.personales
);

export const seleccionaIdiomas = createSelector(
  selectUser,
  (state: UserState) => state.idiomas
);

export const seleccionaExperiencia = createSelector(
  selectUser,
  (state: UserState) => state.experiencia
);

export const seleccionaFormacion = createSelector(
  selectUser,
  (state: UserState) => state.formacion
);

export const seleccionaOfertas = createSelector(
  selectUser,
  (state: UserState) => state.ofertas
);


//TERMINAR
/*
export const seleccionaPersonal = createSelector(
  seleccionaPersonales,
  (state: UserState) => state.personales
);

export const seleccionaPersonal = createSelector(
  seleccionaPersonales,
  (state: UserState) => state.personales
);

export const seleccionaPersonal = createSelector(
  seleccionaPersonales,
  (state: UserState) => state.personales
);
*/
