import { Action } from '@ngrx/store';
//import { User } from '../../models/user.model';

export enum EAccionesAutenticacion{
  IniciarSesion='[Sesion] Iniciar Sesion',
  CredencialesCorrectas= '[Sesion] Credenciales Correctas',
  CredencialesIncorrectas= '[Sesion] Credenciales Incorrectas',
}


export class IniciarSesion implements Action{
  public readonly type= EAccionesAutenticacion.IniciarSesion;
  constructor (public payload: { correo: string, clave: string }){}
}

export class CredencialesCorrectas implements Action{
  public readonly type= EAccionesAutenticacion.CredencialesCorrectas;
  constructor (public payload: { correo: string, clave: string }){}
}

export class CredencialesIncorrectas implements Action{
  public readonly type= EAccionesAutenticacion.CredencialesIncorrectas;
}

export type AccionesAutenticacion = IniciarSesion | CredencialesCorrectas | CredencialesIncorrectas;
