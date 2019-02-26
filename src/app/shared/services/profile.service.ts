import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
/* import { UserOptions } from '../models/user'; */
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
/* import { AppStore } from '../states/store.inteface';
import { Store } from '@ngrx/store';
import * as UserActions from 'app/shared/states/user/actions';
import { User } from 'app/shared/models/user'; */

@Injectable()
export class ProfileService {
  private mockUser = {
    uid: 'ajvazquez',
    name: 'Antonio Jesús',
    surname: 'Vázquez Muñoz',
    email: 'antoniojesusvazquezmunozz@gmail.com',
    roles: [AppSettings.COMPANY_ROL.value],
    avatar_hash: 'ef72d0e94ba5015d64de8522d845cfd2',
    parents: [],
    childrens: [],
    hasFailed: false,
    studies: {
      action: 'SHOW',
      entities: [
        {
          uid: 0,
          level: 'Ciclo formativo',
          title: 'Desarrollo de aplicaciones web',
          institution: 'IES Politécnico Jesús Marin',
          date: '1548320228',
          certificate: false
        },
        {
          uid: 1,
          level: 'Ciclo formativo',
          title: 'Administracion de sistemas informaticos y redes',
          institution: 'IES Politécnico Jesús Marin',
          date: '1397293028',
          certificate: true
        }
      ]
    },
    experiences: {
      action: 'SHOW',
      entities: [
        {
          uid: 0,
          company: 'Suma',
          position: 'Junior',
          date: '1548320228'
        },
        {
          uid: 0,
          company: 'Indra',
          position: 'engineer',
          date: '1548320228'
        }
      ]
    },

    languages: {
      action: 'SHOW',
      entities: [
        {
          uid: 0,
          level: '6',
          name: 'English',
          date: '1548320228'
        },
        {
          uid: 0,
          level: '4',
          name: 'French',
          date: '1548320228'
        }
      ]
    },

    offers: {
      entities: [
        {
          position: 'Professor Extraescolars programació i robòtica educativa',
          company: 'Eixos Creativa',
          family: 'Informática y Comunicaciones',
          date: '30/01/2019'
        },
        {
          position: 'Programaador Jr Java',
          company: 'Ki - Works',
          family: 'Informática y Comunicaciones',
          date: '28/01/2019'
        },
        {
          position: 'Programador.net',
          company: 'Tecnic Consultores',
          family: 'Informática y Comunicaciones',
          date: '28/01/2019'
        },
        {
          position: 'Programador Junior Java Spring boot',
          company: 'GRUPO CMC',
          family: 'Informática y Comunicaciones',
          date: '25/01/2019'
        },
        {
          position: 'Administrativa',
          company: 'Servium',
          family: 'Administración y Gestión',
          date: '25/01/2019'
        },
        {
          position: 'DESARROLLADOR/A SOFTWARE',
          company: 'PEPPER',
          family: 'Informática y Comunicaciones',
          date: '23/01/2019'
        }
      ]
    }
  } as any /* UserOptions */;

  constructor(
    private http: HttpClient /* , private store$: Store<AppStore> */
  ) {}

  loadProfile(): Observable<any /* UserOptions */> {
    return of(this.mockUser as any);
    //return this.http.get<UserOptions>(AppSettings.API_ENDPOINT_USER_ME);
  }
  logout(): void {
    /*  this.store$.dispatch(new UserActions.Logout()); */
  }
  public updateProfile(profile: any /* User */): Observable<any /* User */> {
    /*if (Math.random() > 0.5) {
      return this.http.put<TokenResponse>(AppSettings.API_ENDPOINT_USER_ME, profile);
    }*/
    this.mockUser = { ...profile };
    return of(this.mockUser as any /* User */);
  }
  public signupProfile(profile: any /* UserOptions */): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_USER_CREATE,
      profile
    );
  }
  public requestRememberPassword(uid: { uid: string }): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_USER_REQUEST_REMEMBER_PASSWORD,
      uid
    );
  }
  public rememberPassword(uidAndHash: {
    uid: string;
    hash: string;
  }): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_USER_REMEMBER_PASSWORD,
      uidAndHash
    );
  }
  public confirmUser(uidAndHash: {
    uid: string;
    hash: string;
  }): Observable<boolean> {
    return this.http.post<boolean>(
      AppSettings.API_ENDPOINT_CONFIRM_USER,
      uidAndHash
    );
  }
}
