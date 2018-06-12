import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return initial state first time', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null, 
      userID: null,
      error: null,
      loading: false
    });
  });

  it('should store token and userID upon login', () => {
    expect(reducer({
      token: null, 
      userID: null,
      error: null,
      loading: false
    }, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'some-token',
      userID: 'some-user-id'
    })).toEqual({
      token: 'some-token', 
      userID: 'some-user-id',
      error: null,
      loading: false
    });
  });
});