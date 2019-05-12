import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { OffersService } from 'src/app/shared/services/offers.service';
import { Offer } from 'src/app/shared/models/offer.model';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { User } from 'src/app/shared/models/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnChanges {
  @Input() user: User;
  @Input() offers: Offer[];
  offersStudy: Offer[] = [];
  offersOther: Offer[] = [];
  columnasOfertas: string[] = ['puesto', 'empresa', 'familia', 'fecha', 'provincia', 'municipio', 'inscrito', 'acciones'];
  columnasOtrasOfertas: string[] = ['puesto', 'empresa', 'familia', 'fecha', 'provincia', 'municipio'];

  datosOfertas;

  ngOnInit(){
    this.datosOfertas=new MatTableDataSource(this.offers);
    this.datosOtrasOfertas=new MatTableDataSource(this.offersOther);
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && changes.offers) {
      this.selectOffers();
    }
  }

  private selectOffers() {
    const studiesOfUser = this.user.studies;
    const offersOfUser = this.user.offers;
    this.offersStudy = this.offers
      .filter(offer =>
        studiesOfUser.some(study => study.uid === offer.category.uid)
      )
      .map(offer => {
        const offerUser = !!offersOfUser.find(
          _offerUser => _offerUser.id === offer.id
        );
        return { ...offer, subscribe: offerUser };
      });
    this.offersOther = this.offers.filter(offer =>
      studiesOfUser.every(study => study.uid !== offer.category.uid)
    );
  }
}
