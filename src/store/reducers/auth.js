import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../shared/helpers';

const initialState = {
  token: null, 
  userID: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObj(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObj(state, {
    token: action.token,
    userID: action.userID,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObj(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObj(state, { 
    token: null,
    userID: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
};

export default reducer;