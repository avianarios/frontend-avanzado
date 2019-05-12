import { Action } from '@ngrx/store';
import { Offer } from 'src/app/shared/models/offer.model';

export const LOAD_OFFERS = '[Offers] Load Offers Information';
export class LoadOffers implements Action {
  readonly type = LOAD_OFFERS;

  constructor() {}
}

export const LOAD_OFFERS_SUCCESS = '[Offers] Load success';
export class LoadOffersSuccess implements Action {
  readonly type = LOAD_OFFERS_SUCCESS;

  constructor(public payload: Offer[]) {}
}
export const LOAD_OFFERS_FAILED = '[Offer] Load failed';
export class LoadOffersFailed implements Action {
  readonly type = LOAD_OFFERS_FAILED;

  constructor(public payload: string) {}
}

export type All = LoadOffers | LoadOffersSuccess | LoadOffersFailed;
