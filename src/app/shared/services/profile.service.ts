import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from '../states/store.interface';

import * as UserActions from '../states/user/actions';

@Injectable()
export class ProfileService {
  constructor(
    private http: HttpClient , private store$: Store<AppStore>
  ) {}


  getUsers(id: number) {
    return this.http.get<any>(`${AppSettings.API_ENDPOINT_USERS}/${id}`);
  }
   loadProfile(): Observable<any> {
    return this.getUsers(1);
  }
  logout(): void {
     this.store$.dispatch(new UserActions.Logout());
  }
  public updateProfile(profile: any /* User */): Observable<any /* User */> {
    return this.http.put<any>(AppSettings.API_ENDPOINT_USERS, { ...profile });
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
