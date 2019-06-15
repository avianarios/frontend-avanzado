import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Offer } from 'app/shared/models/offer.model';

export const getOffers = createFeatureSelector<Offer[]>('offers');

export function getOfferByID(id: number) {
  return createSelector(
    getOffers,
    offers => offers.find(offer => offer.id === id)
  );
}
