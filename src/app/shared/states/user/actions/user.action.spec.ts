import * as fromUser from './user.actions';
import { User } from '../../../models/user';

describe('User Actions', () => {
  describe('LoadUser Actions', () => {
    let params;
    beforeEach(() => {
      params = {
        payload: [
          {
            uid: 'nobody',
            password: 'test',
            name: 'nobody',
            email: 'nobody@qontu.com',
            surname: 'noone',
            id_country: 'esp',
            id_language: 'spa',
            app_language: 'spa',
            timezone: 'Europe/Madrid',
            status: 'active',
          },
          {
            uid: 'toni',
            password: 'test',
            name: 'Toni',
            email: 'toni@qontu.com',
            surname: 'Villena',
            id_card: '73783897F',
            id_country: 'esp',
            id_language: 'spa',
            app_language: 'spa',
            timezone: 'Europe/Madrid',
            status: 'active',
            avatar_hash: null,
          },
          {
            uid: 'carlos',
            password: '123456',
            name: 'Carlos',
            email: 'carlos@qontu.com',
            surname: 'Caballero',
            id_card: '25783897L',
            id_country: 'usa',
            id_language: 'eng',
            app_language: 'eng',
            timezone: 'Europe/Madrid',
            status: 'active',
            avatar_hash: 'aValidHashinBase64',
            hash: 'anyHash',
            date_end_hash: '12345466757',
            supervisedUser: {
              uid: 'manuel',
            },
          },
          {
            uid: 'manuel',
            password: 'test',
            name: 'Manuel',
            email: 'manuel@qontu.com',
            surname: 'Molina',
            id_card: '100',
            id_country: 'deu',
            id_language: 'deu',
            app_language: 'eng',
            timezone: 'Europe/Madrid',
            status: 'active',
            hash: 'anyHashValidForManuel',
            date_end_hash: '12345466757',
          },
        ],
        message: 'Load error' as string,
      };
    });
    describe('LoadUser', () => {
      it('should create an action', () => {
        const action = new fromUser.LoadUser();
        expect({ ...action }).toEqual({
          type: fromUser.LOAD_USER,
        });
      });
    });
    describe('LoaduserSuccess', () => {
      it('should create an action', () => {
        const action = new fromUser.LoadUserSuccess(params.payload);
        expect({ ...action }).toEqual({
          type: fromUser.LOAD_USER_SUCCESS,
          payload: params.payload,
        });
      });
    });
    describe('LoadUserFail', () => {
      it('should create an action', () => {
        const action = new fromUser.LoadUserFailed(params.message);
        expect({ ...action }).toEqual({
          type: fromUser.LOAD_USER_FAILED,
          payload: params.message,
        });
      });
    });
  });
  describe('UpdateUser Actions', () => {
    let params;
    beforeEach(() => {
      params = {
        payload: {
          uid: 'nobody',
          password: 'test',
          name: 'nobody',
          email: 'nobody@qontu.com',
          surname: 'noone',
          id_country: 'esp',
          id_language: 'spa',
          app_language: 'spa',
          timezone: 'Europe/Madrid',
          status: 'active',
        },
      };
    });
    it('should create an action', () => {
      const action = new fromUser.UpdateUser(params.payload);
      expect({ ...action }).toEqual({
        type: fromUser.UPDATE_USER,
        payload: params.payload,
      });
    });
  });

  describe('LogOut Actions', () => {
    it('should create an action', () => {
      const action = new fromUser.Logout();
      expect({ ...action }).toEqual({
        type: fromUser.LOGOUT_USER,
      });
    });
  });
});
