import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
/* import { enableBatching } from 'redux-batched-actions'; */

/* import { environment } from 'environments/environment'; */

import { reducers as appReducer } from './app/reducers';
import { reducers as authReducer } from './auth/reducers';
import { reducers as userReducer } from './user/reducers';
import { reducers as offersReducer } from './offers/reducers';

import { ActionReducer } from '@ngrx/store';

// ------------------------------------------------------------------------------
export const reducers = {
  // pass your reducers here
  ...appReducer,
  ...authReducer,
  ...userReducer,
  ...offersReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

// ------------------------------------------------------------------------------
// enableBatching allows us to dispatch multiple actions
// without letting the subscribers being warned between the actions
// only at the end : https://github.com/tshelburne/redux-batched-actions
// can be very handy when normalizing HTTP response
/* const metaReducersDev = [storeFreeze, enableBatching]; */
const metaReducersDev = [storeFreeze, localStorageSyncReducer];

/* const metaReducersProd = [enableBatching];  */
const metaReducersProd = [];

// if environment is != from production
// use storeFreeze to avoid state mutation
/* export const metaReducers = environment.production
    ? metaReducersProd
    : metaReducersDev; */
export const metaReducers = metaReducersDev;
