/*import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { TipoAccionesUsuario, GetUser } from '../actions/user.actions';

@Injectable()
export class UserEffects {

  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(TipoAccionesUsuario.GetUser)
    switchMap(() => this._userService.loadProfile()),
    switchMap((userHttp: IUserHttp) => of(new GetUsersSuccess(userHttp.users)))
  );



  constructor(
//    private _userService: UserService,
//    private _store: Store<IAppState>,
private _actions$: Actions
  ) {}
}*/
