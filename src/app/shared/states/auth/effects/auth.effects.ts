import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as AuthActions from '../actions';
import * as UserActions from '../../user/actions';
import * as OffersActions from '../../offers/actions';

import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.IDENTIFICATION),
    switchMap((action: AuthActions.Identification) =>
      this.authService.login(action.payload).pipe(
        map(token => new AuthActions.IdentificationSuccess(token)),
        catchError((error: HttpErrorResponse) =>
          of(new AuthActions.IdentificationFailed(error.message))
        )
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.IDENTIFICATION_SUCCESS),
    switchMap(() => of(new UserActions.LoadUser()))
  );

  @Effect()
  loginSuccessOffers$ = this.actions$.pipe(
    ofType(AuthActions.IDENTIFICATION_SUCCESS),
    switchMap(() => of(new OffersActions.LoadOffers()))
  );

  @Effect({ dispatch: false })
  loginFailed$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.IDENTIFICATION_FAILED),
    tap(() =>
      this.notificationsService.showNotification(
        'header.ERROR_LOGIN',
        'header.ERROR_LOGIN'
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {}
}
