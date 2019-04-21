import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

/*export enum TipoAccionesUsuario{
  GetUser = '[User] Get User',
  GetPersonales = '[User] Get Personales',
  GetUserSuccess = '[User] Get User Success'
}

export class GetUser implements Action{
  public readonly type = TipoAccionesUsuario.GetUser;
  constructor (public payload: User){}
}


export class GetPersonales implements Action{
  public readonly type = TipoAccionesUsuario.GetPersonales;
  constructor (public payload: User){}
}


export class GetUserSuccess implements Action{
  public readonly type = TipoAccionesUsuario.GetUserSuccess;
  constructor (public payload: User[]){}
}

export type AccionesUsuario = GetUser | GetUserSuccess;
*/

export enum EAccionesUsuario{
  CargarUsuario= '[Usuario] Cargar Usuario',
  CargarUsuarioExito='[Usuario] Cargar Usuario Exito'
}

export class CargarUsuario implements Action{
  public readonly type= EAccionesUsuario.CargarUsuario;
}

export class CargarUsuarioExito implements Action{
  public readonly type= EAccionesUsuario.CargarUsuarioExito;
  constructor (public payload: {personales, formacion, idiomas, experiencia, ofertas}){}
}

export type AccionesUsuario = CargarUsuario | CargarUsuarioExito;
