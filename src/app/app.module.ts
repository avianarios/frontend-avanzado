import {
  BrowserModule,
  BrowserTransferStateModule,
  TransferState,
  makeStateKey
} from '@angular/platform-browser';

//import { HeaderComponent } from 'src/app/shared/header/header.component';
/* import { AngularFontAwesomeModule } from 'angular-font-awesome'; */
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './shared/core.module';
import { FakeBackendService } from './shared/inmemory-db/fake-backend.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { rootRouterConfig } from './app-routing';

//import { HeaderComponent } from './shared/header/header.component';

export const NGRX_STATE = makeStateKey('NGRX_STATE');

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeBackendService, {
      dataEncapsulation: false
    }),
    BrowserAnimationsModule,
    MaterialModule,
    //AngularFontAwesomeModule,
    FlexLayoutModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
    //HeaderComponent
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(
    private readonly transferState: TransferState,
    private readonly store: Store<any>
  ) {
    const isBrowser = this.transferState.hasKey<any>(NGRX_STATE);

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }
  onServer() {
    this.transferState.onSerialize(NGRX_STATE, () => {
      let state;
      this.store
        .subscribe((saveState: any) => {
          console.log('Set for browser', JSON.stringify(saveState));
          state = saveState;
        })
        .unsubscribe();

      return state;
    });
  }

  onBrowser() {
    const state = this.transferState.get<any>(NGRX_STATE, null);
    this.transferState.remove(NGRX_STATE);
    this.store.dispatch({ type: 'SET_ROOT_STATE', payload: state });
    console.log('Got state from server', JSON.stringify(state));
  }
}
