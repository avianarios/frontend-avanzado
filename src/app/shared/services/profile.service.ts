import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class ProfileService {
  private _user: User = {} as User;

  constructor(
    private http: HttpClient /* , private store$: Store<AppStore> */
  ) {}

  set user(_user) {
    this._user = _user;
  }
  get user() {
    return this._user;
  }
  loadProfile(): Observable<any /* UserOptions */> {
    return of(this.user as any);
    //return this.http.get<UserOptions>(AppSettings.API_ENDPOINT_USER_ME);
  }
  logout(): void {
    /*  this.store$.dispatch(new UserActions.Logout()); */
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
