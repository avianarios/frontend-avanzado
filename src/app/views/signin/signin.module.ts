import { NgModule } from '@angular/core';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SigninService } from './signin.service';

@NgModule({
  declarations: [SigninComponent],
  imports: [SharedModule, SigninRoutingModule],
  providers: [SigninService]
})
export class SigninModule {}
