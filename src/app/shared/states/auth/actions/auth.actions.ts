import { Action } from '@ngrx/store';

import { TokenResponse } from '../../../models/token.interface';

export const IDENTIFICATION = '[Auth] Identification';
export class Identification implements Action {
  readonly type = IDENTIFICATION;

  constructor(public payload: { email: string; password: string }) {}
}

export const IDENTIFICATION_SUCCESS = '[Auth] Identification success';
export class IdentificationSuccess implements Action {
  readonly type = IDENTIFICATION_SUCCESS;

  constructor(public payload: TokenResponse) {}
}
export const IDENTIFICATION_FAILED = '[Auth] Identification failed';
export class IdentificationFailed implements Action {
  readonly type = IDENTIFICATION_FAILED;

  constructor(public payload: string) {}
}

export const IDENTIFICATION_LOGOUT = '[Auth] Identification logout';
export class IdentificationLogout implements Action {
  readonly type = IDENTIFICATION_LOGOUT;

  constructor() {}
}

export const IDENTIFICATION_REFRESH = '[Auth] Identification refresh';
export class IdentificationRefresh implements Action {
  readonly type = IDENTIFICATION_REFRESH;

  constructor(public payload: TokenResponse) {}
}

export type All =
  | Identification
  | IdentificationSuccess
  | IdentificationFailed
  | IdentificationLogout
  | IdentificationRefresh;
