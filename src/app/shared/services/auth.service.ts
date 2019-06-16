import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TokenResponse } from '../models/token.interface';
import { AppSettings } from '../app.settings';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }): Observable<any> {
    //Mock - Should return a Token
    return of(true);
  }

}
