import { NgModule } from '@angular/core';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SigninComponent],
  imports: [SharedModule, SigninRoutingModule, MaterialModule, FlexLayoutModule],
  providers: []
})
export class SigninModule {}
