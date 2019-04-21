import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap, withLatestFrom, mergeMap} from 'rxjs/operators';
import { SigninService } from '../../../views/signin/signin.service';
import { AccionesAutenticacion, EAccionesAutenticacion, IniciarSesion, CredencialesCorrectas, CredencialesIncorrectas } from '../actions/aut.actions';

@Injectable()
export class AutEffects {

  @Effect()
  IniciarSesion$ = this._actions$.pipe(
    ofType<IniciarSesion>(EAccionesAutenticacion.IniciarSesion),
    tap (()=>console.log(" en el efecto de iniciar sesión")),
    mergeMap (action=>{
      this._signinService.login(action.payload).
      pipe(
        map(user => {user != undefined ? new CredencialesCorrectas(action.payload) : new CredencialesIncorrectas()})
      )
    })
  );

  constructor(
    private _signinService: SigninService,
//    private _store: Store<IAppState>,
    private _actions$: Actions
  ) {}
}
