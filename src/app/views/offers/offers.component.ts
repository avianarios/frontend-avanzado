import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  isOffersList = true;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(
      params => (this.isOffersList = !params.my_offers)
    );
  }

  ngOnInit() {}
}
