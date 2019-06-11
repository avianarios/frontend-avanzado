import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/states/store.interface';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { getProfile } from 'src/app/shared/states/user';
import { getOffers } from 'src/app/shared/states/offers';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  user$: Observable<User>;
  offers$: Observable<Offer[]>;
  isOffersList = true;
  constructor(private route: ActivatedRoute, private store$: Store<AppStore>) {
    this.route.data.subscribe(
      params => (this.isOffersList = !params.my_offers)
    );
    this.user$ = this.store$.select(getProfile);
    this.offers$ = this.store$.select(getOffers);
  }

  ngOnInit() {}
}
