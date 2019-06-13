import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStudyModifyStudiesComponent } from './profile-study.component';

describe('ProfileStudyModifyComponent', () => {
  let component: ProfileStudyModifyStudiesComponent;
  let fixture: ComponentFixture<ProfileStudyModifyStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileStudyModifyStudiesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStudyModifyStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
