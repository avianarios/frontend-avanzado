import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as OffersActions from '../actions';

import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';

@Injectable()
export class OffersEffects {
  @Effect()
  loadOffers$: Observable<Action> = this.actions$.pipe(
    ofType(OffersActions.LOAD_OFFERS),
    switchMap(() =>
      this.offersService.getOffers().pipe(
        map((offers: Offer[]) => new OffersActions.LoadOffersSuccess(offers)),
        catchError((error: HttpErrorResponse) =>
          of(new OffersActions.LoadOffersFailed(error.message))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private offersService: OffersService
  ) {}
}
