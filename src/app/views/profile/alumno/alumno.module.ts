import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalesComponent } from './personales/personales.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { FormacionComponent } from './formacion/formacion.component';
import { IdiomasComponent } from './idiomas/idiomas.component';


@NgModule({
  declarations: [AlumnoComponent, PersonalesComponent, ExperienciaComponent, IdiomasComponent, FormacionComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AlumnoProfileModule { }
