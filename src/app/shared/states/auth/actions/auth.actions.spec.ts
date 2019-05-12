import * as fromAuth from './auth.actions';

describe('Auth Actions', () => {
  describe('Identification Actions', () => {
    let params;
    beforeEach(() => {
      params = {
        payload: {
          emailOrUid: 'andujar34',
          password: 'test',
        },
        tokenResponse: {
          token: 'anytest',
        },
        message: 'Identification error' as string,
      };
    });
    describe('Identification', () => {
      it('should create an action', () => {
        const action = new fromAuth.Identification(params.payload);
        expect({ ...action }).toEqual({
          type: fromAuth.IDENTIFICATION,
          payload: params.payload,
        });
      });
    });
    describe('IdentificationFail', () => {
      it('should create an action', () => {
        const action = new fromAuth.IdentificationFailed(params.message);
        expect({ ...action }).toEqual({
          type: fromAuth.IDENTIFICATION_FAILED,
          payload: params.message,
        });
      });
    });
    describe('IdentificationSuccess', () => {
      it('should create an action', () => {
        const action = new fromAuth.IdentificationSuccess(params.tokenResponse);
        expect({ ...action }).toEqual({
          type: fromAuth.IDENTIFICATION_SUCCESS,
          payload: params.tokenResponse,
        });
      });
    });
  });
  describe('IdentificationRefresh Actions', () => {
    it('should create an action', () => {
      const params = {
        tokenResponse: {
          token: 'anytest',
        },
      };
      const action = new fromAuth.IdentificationRefresh(params.tokenResponse);
      expect({ ...action }).toEqual({
        type: fromAuth.IDENTIFICATION_REFRESH,
        payload: params.tokenResponse,
      });
    });
  });
  describe('IdentificationLogOut Actions', () => {
    it('should create an action', () => {
      const action = new fromAuth.IdentificationLogout();
      expect({ ...action }).toEqual({
        type: fromAuth.IDENTIFICATION_LOGOUT,
      });
    });
  });
});
