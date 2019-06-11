import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Study,
  VocationalStudy,
  CollegeStudy
} from 'src/app/shared/models/study.model';
import { MockData } from 'src/app/shared/mock-data';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile-study',
  templateUrl: './profile-study.component.html',
  styleUrls: ['./profile-study.component.scss']
})
export class ProfileStudyComponent implements OnChanges {
  @Input() study: VocationalStudy | CollegeStudy;
  @Input() user: User;
  @Output() save: EventEmitter<User> = new EventEmitter();
  @Output() update: EventEmitter<User> = new EventEmitter();
  rForm: FormGroup;
  options = MockData.TYPE_STUDIES;

  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    let study = {} as Study;
    if (this.hasChangeStudy(changes.study)) {
      study = changes.study.currentValue;
    }
    this.loadFormInstance(study);
  }
  private loadFormInstance(study: Study) {
    this.rForm = new FormGroup({
      option: new FormControl(study.level, [Validators.required])
    });
  }
  private hasChangeStudy(study) {
    return study && study.currentValue;
  }

  compareOption(option1, option2) {
    return option1.uid === (option2 && option2.uid);
  }
  private _update(study: Study) {
    const studies = this.user.studies.map(_study =>
      _study.uid === study.uid ? study : _study
    ) as (VocationalStudy | CollegeStudy)[];
    const user = {
      ...this.user,
      studies
    };
    this.update.emit(user);
  }
  private _save(study: Study) {
    const _study = MockData.fakeIncreaseID<Study>(this.user.studies, study);
    const studies = [...this.user.studies, _study] as (
      | VocationalStudy
      | CollegeStudy)[];
    const user = {
      ...this.user,
      studies
    };
    this.save.emit(user);
  }

  saveOrUpdate(_study: VocationalStudy | CollegeStudy) {
    const study = {
      ..._study,
      level: this.rForm.get('option').value
    };
    this.isNew() ? this._save(study) : this._update(study);
  }
  public isNew(): boolean {
    return !!!this.study;
  }
  public isSelectVocational(): boolean {
    const value = this.rForm.get('option').value;
    return value && value.uid === MockData.TYPE_STUDIES[0].uid;
  }
  public isSelectUniversity(): boolean {
    const value = this.rForm.get('option').value;
    return value && value.uid === MockData.TYPE_STUDIES[1].uid;
  }
}
