import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollegeStudy } from 'src/app/shared/models/study.model';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';

@Component({
  selector: 'app-university-degree-form',
  templateUrl: './university-degree-form.component.html'
})
export class UniversityDegreeComponent {
  @Output() onSave: EventEmitter<CollegeStudy> = new EventEmitter();
  @Input() study: CollegeStudy = {} as CollegeStudy;
  public rForm: FormGroup;

  constructor() {}
  ngOnInit() {
    this.loadSelectProperties();
    this.loadFormInstance();
  }

  public loadSelectProperties(): void {}

  public loadFormInstance(): void {
    this.rForm = new FormGroup({
      institution: new FormControl(this.study.institution, [
        Validators.required
      ]),
      title: new FormControl(this.study.title, [Validators.required]),
      date: new FormControl(this.study.date, [
        Validators.required,
        dateValidator()
      ]),
      bilingue: new FormControl(this.study.bilingue, [])
    });
  }

  public submit() {
    this.onSave.emit({ ...this.study, ...this.rForm.value });
  }

  public save() {
    const study: CollegeStudy = {
      certificate: false,
      ...this.rForm.value
    };
    this.onSave.emit(study);
  }
}
