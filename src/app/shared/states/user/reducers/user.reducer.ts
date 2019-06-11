import * as UserActions from '../actions';

import { AppSettings } from '../../../app.settings';
import { User } from 'src/app/shared/models/user.model';

export interface UserState extends User {
  hasFailed: boolean;
}

export const initialState: UserState = {
  password: '', // Only for mock
  id: -1,
  username: '',
  name: '',
  surname: '',
  birthdate: '',
  phone: '',
  phone2: '',
  email: '',
  documentNumber: '',
  documentType: {
    uid: -1,
    name: ''
  },
  aboutMe: '',
  otherCompetences: '',
  license: '',
  avatar_hash: '',
  address: {
    street: '',
    province: {
      uid: -1,
      name: ''
    },
    municipe: {
      uid: -1,
      name: ''
    }
  },
  roles: [],
  studies: [],
  experiencies: [],
  languages: [],
  offers: [],
  hasFailed: false
};

export function reducer(
  state = initialState,
  action: UserActions.All
): UserState {
  switch (action.type) {
    case UserActions.LOAD_USER: {
      return {
        ...state
      };
    }
    case UserActions.LOAD_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        hasFailed: false
      };
    }
    case UserActions.LOAD_USER_FAILED: {
      return {
        ...state,
        hasFailed: true
      };
    }
    case UserActions.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case UserActions.LOGOUT_USER: {
      return {
        ...state,
        ...initialState
      };
    }
  }
  return state;
}
