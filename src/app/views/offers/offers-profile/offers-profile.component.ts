import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-offers-profile',
  templateUrl: './offers-profile.component.html'
})
export class OffersProfileComponent implements OnInit {
  offers: Offer[] = [];
  constructor(private profileService: ProfileService) {
    this.selectOffers();
  }

  private selectOffers() {
    this.offers = this.profileService.user.offers;
  }

  ngOnInit() {}
}
