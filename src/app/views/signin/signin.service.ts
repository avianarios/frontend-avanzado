import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/shared/app.settings';

@Injectable()
export class SigninService {
  constructor(private http: HttpClient) {}

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
