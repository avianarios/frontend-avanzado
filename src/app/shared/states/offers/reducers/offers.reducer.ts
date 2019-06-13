import * as OffersActions from '../actions';

import { AppSettings } from '../../../app.settings';
import { Offer } from 'src/app/shared/models/offer.model';

export type OffersState = Offer[];

export const initialState: OffersState = [];
export function reducer(
  state = initialState,
  action: OffersActions.All
): OffersState {
  switch (action.type) {
    case OffersActions.LOAD_OFFERS_SUCCESS: {
      return [...state, ...action.payload];
    }
  }
  return state;
}
