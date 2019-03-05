import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenRoutingModule } from './resumen-routing.module';
import { ResumenComponent } from './resumen.component';

@NgModule({
  declarations: [ResumenComponent],
  imports: [
    CommonModule,
    ResumenRoutingModule
  ]
})
export class ResumenModule { }
