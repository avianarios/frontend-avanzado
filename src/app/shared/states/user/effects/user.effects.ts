import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as UserActions from '../actions';
import * as AuthActions from '../../auth/actions';
import * as RouterActions from '../../router/actions';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../../../services/profile.service';
import { NotificationsService } from '../../../services/notifications.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { TokenResponse } from 'src/app/shared/models/token.interface';

@Injectable()
export class UserEffects {
  @Effect()
  me$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.LOAD_USER),
    switchMap(() =>
      this.profileService.loadProfile().pipe(
        map((user: User) => new UserActions.LoadUserSuccess(user)),
        catchError((error: HttpErrorResponse) =>
          of(new UserActions.LoadUserFailed(error.message))
        )
      )
    )
  );

  @Effect()
  loadUserSuccess$: Observable<RouterActions.Go> = this.actions$.pipe(
    ofType(UserActions.LOAD_USER_SUCCESS),
    map(() => new RouterActions.Go({ path: ['admin/dashboard'] }))
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER),
    switchMap((action: UserActions.UpdateUser) =>
      this.profileService.updateProfile(action.payload).pipe(
        map(() => new UserActions.UpdateUserSuccess(action.payload)),
        catchError((error: HttpErrorResponse) =>
          of(new UserActions.UpdateUserFailed(error.message))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  updateUserSuccessNotification$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER_SUCCESS),
    tap(() =>
      this.notificationsService.showNotification(
        'Modificación realizada',
        'Actualizar usuario'
      )
    )
  );

  // Si quieres desplazar al usuario una vez realizado el cambio.
  /* @Effect()
  updateUserSuccessRouter$: Observable<RouterActions.Go> = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER_SUCCESS),
    map(() => new RouterActions.Go({ path: ['admin/dashboard'] }))
  ); */

  @Effect({ dispatch: false })
  addUsersFailed$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER_FAILED),
    tap(() =>
      this.notificationsService.showNotification(
        'Error: Inténtelo más tarde',
        'Crear usuario'
      )
    )
  );

  // POR AQUÍ
  @Effect()
  updateUserRouter$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER),
    switchMap((action: UserActions.UpdateUser) =>
      this.profileService.updateProfile(action.payload)
    ),
    map((token: TokenResponse) => {
      this.notificationsService.showNotification(
        'Modificación realizada',
        'Actualizar usuario'
      );
      return new AuthActions.IdentificationRefresh(token);
    }),
    catchError((error: HttpErrorResponse) => {
      this.notificationsService.showNotification(
        'Error: Inténtelo más tarde',
        'Actualizar usuario'
      );
      return of(new UserActions.LoadUserFailed(error.message));
    })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.LOGOUT_USER),
    switchMap(() => [
      new AuthActions.IdentificationLogout(),
      new RouterActions.Go({ path: ['/login'] })
    ])
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private notificationsService: NotificationsService
  ) {}
}
