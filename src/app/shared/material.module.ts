import {NgModule} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule
  ],
  exports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule
  ]
})
export class MaterialModule {}
