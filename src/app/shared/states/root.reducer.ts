import { ActionReducer } from '@ngrx/store';
import { reducers as appReducer } from './app/reducers';
import { reducers as authReducer } from './auth/reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers as offersReducer } from './offers/reducers';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducers as userReducer } from './user/reducers';
/* import { enableBatching } from 'redux-batched-actions'; */

/* import { environment } from 'environments/environment'; */



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

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

// ------------------------------------------------------------------------------
// enableBatching allows us to dispatch multiple actions
// without letting the subscribers being warned between the actions
// only at the end : https://github.com/tshelburne/redux-batched-actions
// can be very handy when normalizing HTTP response
/* const metaReducersDev = [storeFreeze, enableBatching]; */
const metaReducersDev = [storeFreeze, localStorageSyncReducer, stateSetter];

/* const metaReducersProd = [enableBatching];  */
const metaReducersProd = [];

// if environment is != from production
// use storeFreeze to avoid state mutation
/* export const metaReducers = environment.production
    ? metaReducersProd
    : metaReducersDev; */
export const metaReducers = metaReducersDev;
