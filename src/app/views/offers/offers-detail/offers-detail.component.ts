import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-offers-detail',
  templateUrl: './offers-detail.component.html',
  styleUrls: ['./offers-detail.component.scss']
})
export class OffersDetailComponent implements OnInit {
  offer: Offer;
  user: User;
  constructor(
    private profileService: ProfileService,
    private offersService: OffersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = this.profileService.user;
    this.route.params.subscribe(params => {
      const offers = this.offersService.offers;

      const offerID = +params.id;
      this.offer = (offers.find(offer => offer.id === offerID) || {}) as Offer;
    });
  }

  subscribeOffer() {
    this.user.offers = [...this.user.offers, this.offer];
    this.router.navigate(['/admin/profile']);
  }
  unsubscribeOffer() {
    this.user.offers = this.user.offers.filter(
      _offer => _offer.id !== this.offer.id
    );
    this.router.navigate(['/admin/profile']);
  }
  isSubscribe(): boolean {
    return !!this.user.offers.find(_offer => this.offer.id === _offer.id);
  }

  ngOnInit() {}
}
