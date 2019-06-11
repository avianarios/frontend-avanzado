import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const LOAD_USER = '[User] Load User Information';
export class LoadUser implements Action {
  readonly type = LOAD_USER;

  constructor() {}
}

export const LOAD_USER_SUCCESS = '[User] Load success';
export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: User) {}
}
export const LOAD_USER_FAILED = '[User] Load failed';
export class LoadUserFailed implements Action {
  readonly type = LOAD_USER_FAILED;

  constructor(public payload: string) {}
}

export const UPDATE_USER = '[User] Update User Information';
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}
export const UPDATE_USER_SUCCESS = '[User] Update User Information SUCCESS';
export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor(public payload: User) {}
}
export const UPDATE_USER_FAILED = '[User] Update User Information FAILED';
export class UpdateUserFailed implements Action {
  readonly type = UPDATE_USER_FAILED;

  constructor(public payload: string) {}
}

export const LOGOUT_USER = '[User] Logout';
export class Logout implements Action {
  readonly type = LOGOUT_USER;

  constructor() {}
}

export type All =
  | LoadUser
  | LoadUserSuccess
  | LoadUserFailed
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailed
  | Logout;
