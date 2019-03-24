import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloFormativoComponent } from './ciclo-formativo.component';

describe('CicloFormativoComponent', () => {
  let component: CicloFormativoComponent;
  let fixture: ComponentFixture<CicloFormativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloFormativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloFormativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
