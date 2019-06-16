import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
// COMPONENTS
import { AppComfirmComponent } from './services/app-confirm/app-confirm.component';
// SERVICES
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { CommonModule } from '@angular/common';
// DIRECTIVES
import { FontSizeDirective } from './directives/fontsize.directive';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/*
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; */



// PIPES


const declarations = [
  FontSizeDirective,
  AppComfirmComponent,
  AdminLayoutComponent
];
const exportsKeyword = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  AppComfirmComponent,
  AdminLayoutComponent
];
const providers = [AppConfirmService];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  entryComponents: [AppComfirmComponent],
  providers,
  declarations,
  exports: exportsKeyword
})
export class SharedModule {}
