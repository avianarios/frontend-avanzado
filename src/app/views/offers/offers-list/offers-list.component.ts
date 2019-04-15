import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnInit {
  offersStudy: Offer[] = [];
  offersOther: Offer[] = [];
  constructor(
    private profileService: ProfileService,
    private offersService: OffersService
  ) {
    this.selectOffers();
  }

  private selectOffers() {
    const studiesOfUser = this.profileService.user.studies;
    const offersOfUser = this.profileService.user.offers;
    this.offersStudy = this.offersService.offers
      .filter(offer =>
        studiesOfUser.some(study => study.uid === offer.category.uid)
      )
      .map(offer => {
        const offerUser = !!offersOfUser.find(
          _offerUser => _offerUser.id === offer.id
        );
        return { ...offer, subscribe: offerUser };
      });

    this.offersOther = this.offersService.offers.filter(offer =>
      studiesOfUser.every(study => study.uid !== offer.category.uid)
    );
  }

  ngOnInit() {}
}
