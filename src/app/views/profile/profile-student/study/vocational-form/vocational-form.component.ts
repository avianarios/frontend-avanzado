import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  VocationalStudy,
  Institution,
  Category,
  TitleStudy,
  Grade
} from 'src/app/shared/models/study.model';
import { MockData } from 'src/app/shared/mock-data';
import { dateValidator } from 'src/app/shared/directives/date-validator.directive';

@Component({
  selector: 'app-vocational-form',
  templateUrl: './vocational-form.component.html'
})
export class VocationalFormComponent implements OnInit {
  @Output() onSave: EventEmitter<VocationalStudy> = new EventEmitter();
  @Input() study: VocationalStudy = {} as VocationalStudy;
  public institutions: Institution[];
  public categories: Category[];
  public titles: TitleStudy[];
  public grades: Grade[];
  public rForm: FormGroup;

  constructor() {}
  ngOnInit() {
    this.loadSelectProperties();
    this.loadFormInstance();
  }

  public loadSelectProperties(): void {
    this.institutions = MockData.VOCATIONAL_INSTITUTION;
    this.categories = MockData.VOCATIONAL_CATEGORY;
    this.titles = MockData.VOCATIONAL_TITLE;
    this.grades = MockData.VOCATIONAL_GRADES;
  }

  public loadFormInstance(): void {
    this.rForm = new FormGroup({
      institution: new FormControl(this.study.institution, [
        Validators.required
      ]),
      category: new FormControl(this.study.category, [Validators.required]),
      grade: new FormControl(this.study.grade, [Validators.required]),
      title: new FormControl(this.study.title, [Validators.required]),
      date: new FormControl(this.study.date, [
        Validators.required,
        dateValidator()
      ]),
      dual: new FormControl(this.study.dual, []),
      bilingue: new FormControl(this.study.bilingue, [])
    });
  }

  public submit() {
    this.onSave.emit({ ...this.study, ...this.rForm.value });
  }

  public compareInstitution(
    institution1: Institution,
    institution2?: Institution
  ) {
    return institution1.uid === (institution2 && institution2.uid);
  }
  public compareCategory(category1: Category, category2: Category) {
    return category1.uid === (category2 && category2.uid);
  }
  public compareTitle(title1: TitleStudy, title2: TitleStudy) {
    return title1.uid === (title2 && title2.uid);
  }

  public compareGrade(grade1: Grade, grade2: Grade) {
    return grade1.uid === (grade2 && grade2.uid);
  }
  public save() {
    const study: VocationalStudy = {
      certificate: false,
      ...this.rForm.value
    };
    this.onSave.emit(study);
  }
}
