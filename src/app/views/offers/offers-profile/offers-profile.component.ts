import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OffersService } from 'app/shared/services/offers.service';
import { Offer } from 'app/shared/models/offer.model';
import { ProfileService } from 'app/shared/services/profile.service';
import { User } from 'app/shared/models/user.model';

@Component({
  selector: 'app-offers-profile',
  templateUrl: './offers-profile.component.html'
})
export class OffersProfileComponent implements OnChanges {
  @Input() user: User;
  offers: Offer[] = [];
  constructor() {}
  ngOnChanges() {
    this.offers = this.user.offers;
  }
}
