import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitarioComponent } from './universitario.component';

describe('UniversitarioComponent', () => {
  let component: UniversitarioComponent;
  let fixture: ComponentFixture<UniversitarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
