import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileStudyComponent } from './profile-student/study/profile-study.component';
import { ProfileLanguageComponent } from './profile-student/language/profile-language.component';
import { ProfileAccountComponent } from './profile-student/account/profile-account.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'profile-student/account',
    component: ProfileAccountComponent
  },
  {
    path: 'profile-student/study',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-student/study/:uid',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-student/language',
    component: ProfileLanguageComponent
  },
  {
    path: 'profile-student/language/:uid',
    component: ProfileLanguageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
