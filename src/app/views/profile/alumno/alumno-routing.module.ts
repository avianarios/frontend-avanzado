import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent} from './alumno.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { FormacionComponent } from './formacion/formacion.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { PersonalesComponent } from './personales/personales.component';

const routes: Routes = [
  {
    path:'',
    component: AlumnoComponent
  },
  {
    path:'personales',
    component: PersonalesComponent
  },
  {
    path:'experiencia',
    component: ExperienciaComponent
  },
  {
    path:'formacion',
    component: FormacionComponent
  },
  {
    path:'idiomas',
    component: IdiomasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnoRoutingModule { }
