import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { AlumnoComponent } from './alumno/alumno.component';

@NgModule({
  declarations: [OffersComponent, AlumnoComponent],
  imports: [
    CommonModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
