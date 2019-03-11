import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlumnoComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AlumnoOffersModule { }
