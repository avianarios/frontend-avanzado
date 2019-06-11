import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OffersService {
  constructor(
    private http: HttpClient /* , private store$: Store<AppStore> */
  ) {}

  getOffers() {
    return this.http.get<any>(AppSettings.API_ENDPOINT_OFFERS);
  }
}
