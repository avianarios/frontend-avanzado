import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { AccionesUsuario, EAccionesUsuario, CargarUsuario } from '../actions/user.actions';

@Injectable()
export class UserEffects {

  @Effect()
  CargarUsuario$ = this._actions$.pipe(
    ofType<CargarUsuario>(EAccionesUsuario.CargarUsuario),
    tap (()=>console.log(" en el efecto "))
    /*switchMap(() => this._userService.loadProfile()),
    switchMap((userHttp: IUserHttp) => of(new GetUsersSuccess(userHttp.users)))*/
  );

  constructor(
//    private _userService: UserService,
//    private _store: Store<IAppState>,
private _actions$: Actions
  ) {}
}
