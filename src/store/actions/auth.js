import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const setLogoutTimeout = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn);
  };
};

export const auth = (email, password, signUping) => {
  return dispatch => {
    dispatch(authStart());

    const signupUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAUDK2Q0GjjIv5hfmdope6dbKr2Tq8s4Rw';
    const signinUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAUDK2Q0GjjIv5hfmdope6dbKr2Tq8s4Rw';
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const url = signUping ? signupUrl : signinUrl;

    axios.post(url, payload)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userID', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(setLogoutTimeout(response.data.expiresIn * 1000));
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  }
}

export const checkToken = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userID = localStorage.getItem('userID');
        dispatch(authSuccess(token, userID));
        dispatch(setLogoutTimeout(expirationDate.getTime() - new Date().getTime()));
      } else {
        dispatch(authLogout());
      }
    }
  };
};