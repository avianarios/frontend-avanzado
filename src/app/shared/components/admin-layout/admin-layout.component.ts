import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { SigninService } from 'src/app/views/signin/signin.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent {
  /*   constructor() {} */

  /* MOCK PURPOSES */
  constructor(
    private profileService: ProfileService,
    private offersService: OffersService,
    private http: HttpClient
  ) {
    this.login({ email: 'carlos.caballero@gmail.com', password: '1234' }).then(
      user => {
        this.profileService.user = user;
      }
    );
    this.offersService.getOffers().subscribe(offers => {
      this.offersService.offers = offers;
    });
  }

  getUsers() {
    return this.http.get<any>(AppSettings.API_ENDPOINT_USERS).toPromise();
  }

  async login({ email, password }): Promise<any> {
    const users = await this.getUsers();
    // Mock response from backend:
    return users.find(
      (user: any) => user.email === email && user.password === password
    );
  }
}
