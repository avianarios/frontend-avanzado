import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProfileService } from '../../../shared/services/profile.service';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';

/*import { AppState } from '../../../shared/store/state/app.state';
import { UserState } from '../../../shared/store/state/user.state';
import { seleccionaPersonales } from '../../../shared/store/selectors/user.selectors';
import { GetUser, GetUserSuccess } from '../../../shared/store/actions/user.actions';*/

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent {
  user: User;

  constructor(
    private _profileService: ProfileService
  ) {
    this.user = this._profileService.user;
  }

  deleteStudy(studyID: number) {
    const studies = this.user.studies;
    const index = studies.findIndex(study => study.uid === studyID);
    if (index === -1) {
      alert('Error: Study not found');
      return;
    }
    studies.splice(index, 1);
    this._profileService.updateProfile(this.user);
  }
  deleteLanguage(languageID: any) {
    const languages = this.user.languages;
    const index = languages.findIndex(language => language.uid === languageID);
    if (index === -1) {
      alert('Error: Language not found');
      return;
    }
    languages.splice(index, 1);
    this._profileService.updateProfile(this.user);
  }
}
