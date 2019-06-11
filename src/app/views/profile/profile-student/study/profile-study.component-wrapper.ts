import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Study } from 'src/app/shared/models/study.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AppStore } from 'src/app/shared/states/store.interface';
import { Store } from '@ngrx/store';
import { getProfile, getStudyByID } from 'src/app/shared/states/user';
import { map, switchMap } from 'rxjs/operators';
import * as UserActions from 'src/app/shared/states/user/actions';

@Component({
  selector: 'app-profile-study-wrapper',
  template: `
    <app-profile-study
      [user]="user$ | async"
      [study]="study$ | async"
      (save)="onSaveStudy($event)"
      (update)="onUpdateStudy($event)"
    ></app-profile-study>
  `
})
export class ProfileStudyWrapperComponent {
  study$: Observable<Study>;
  user$: Observable<User>;

  constructor(private route: ActivatedRoute, private store$: Store<AppStore>) {
    this.user$ = this.store$.select(getProfile);
    this.study$ = this.route.params.pipe(
      map(({ uid: uid }: { uid: string }) => Number.parseInt(uid)),
      switchMap(uid => this.store$.select(getStudyByID(uid)))
    );
  }
  onSaveStudy(user: User) {
    this.store$.dispatch(new UserActions.UpdateUser(user));
  }
  onUpdateStudy(user: User) {
    this.store$.dispatch(new UserActions.UpdateUser(user));
  }
}
