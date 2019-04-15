import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable()
export class OffersService {
  private _offers: Offer[] = [{}] as Offer[];

  constructor(
    private http: HttpClient /* , private store$: Store<AppStore> */
  ) {}

  set offers(_offers) {
    this._offers = _offers;
  }
  get offers() {
    return this._offers;
  }

  getOffers() {
    return this.http.get<any>(AppSettings.API_ENDPOINT_OFFERS);
  }
}
