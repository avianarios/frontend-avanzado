import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalesComponent } from './personales/personales.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { FormacionComponent } from './formacion/formacion.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { CicloFormativoComponent } from './formacion/ciclo-formativo/ciclo-formativo.component';
import { UniversitarioComponent } from './formacion/universitario/universitario.component';


@NgModule({
  declarations: [AlumnoComponent, PersonalesComponent, ExperienciaComponent, IdiomasComponent, FormacionComponent, CicloFormativoComponent, UniversitarioComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AlumnoProfileModule { }
