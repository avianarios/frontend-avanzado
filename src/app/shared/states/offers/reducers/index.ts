import { ActionReducerMap } from '@ngrx/store';

import * as fromOffers from './offers.reducer';

export interface OffersState {
  offers: fromOffers.OffersState;
}

export const reducers: ActionReducerMap<OffersState> = {
  offers: fromOffers.reducer
};
