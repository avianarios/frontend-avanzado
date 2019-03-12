import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ConfiguracionComponent } from './configuracion.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConfiguracionComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConfiguracionModule { }
