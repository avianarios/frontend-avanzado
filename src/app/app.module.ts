import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app-routing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './shared/inmemory-db/fake-backend.service';

//ngrx
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './shared/store/reducers/user.reducers';
import { autenticacionReducers } from './shared/store/reducers/aut.reducers';
//import { appReducers } from './shared/store/reducers/app.reducers';

//import { appReducers } from './shared/store/reducers/app.reducers';
import { AutEffects } from './shared/store/effects/aut.effects';
import { UserEffects } from './shared/store/effects/user.effects';
//import { AppRoutingModule } from './app-routing.module';

//import { reducers, metaReducers } from './shared/state/user';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService, {
      dataEncapsulation: false
    }),
    StoreModule.forRoot(autenticacionReducers),
    EffectsModule.forRoot([UserEffects, AutEffects]),
    StoreRouterConnectingModule.forRoot({stateKey:'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
