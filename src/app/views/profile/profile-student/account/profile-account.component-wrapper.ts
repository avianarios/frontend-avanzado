import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AppStore } from 'src/app/shared/states/store.interface';
import { Store } from '@ngrx/store';
import { getProfile } from 'src/app/shared/states/user';
import { Observable } from 'rxjs';
import * as UsersActions from 'src/app/shared/states/user/actions';

@Component({
  selector: 'app-profile-account-wrapper',
  template: `
    <app-profile-account
              [user]="user$ | async"
              (onSave)="save($event)">
    </app-profile-account>`,
})
export class ProfileAccountWrapperComponent {
  user$: Observable<User>;

  constructor(private store$: Store<AppStore>) {
      this.user$ = this.store$.select(getProfile);
  }
  save(user: User) {
    this.store$.dispatch(new UsersActions.UpdateUser(user));
  }
}
