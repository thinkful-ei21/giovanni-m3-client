import jwtDecode from 'jwt-decode';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { saveAuthToken, clearAuthToken } from '../local-storage';
import {setHigh, resetGame} from '../actions/grid'

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const SET_WARNING = 'SET_WARNING';
export const setWarning = warning => ({
  type: SET_WARNING,
  warning
})


const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
  };

export const logOut = () => dispatch => {
  dispatch(clearAuth());
  dispatch(resetGame())
}

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return (
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      // Reject any requests which don't return a 200 status, creating
      // errors which follow a consistent format
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
      .then(()=> dispatch(submitScore(0)))
      .catch(err => {
        // const { code } = err;
        // const message =
        //   code === 401
        //     ? 'Incorrect username or password'
        //     : 'Unable to login, please try again';
        dispatch(authError(err));
        // Could not authenticate, so return a SubmissionError for Redux
        // Form
        // return Promise.reject(
        //   new SubmissionError({
        //     _error: message
        //  })
        //);
      })
  );
};

export const register = (username, password) => dispatch =>{
  dispatch(authRequest());
  return (
    fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => {console.log(res.status)
      if(res.status === 201){dispatch(login(username, password))}
      // res.status === 201 ? dispatch(login(username, password)): {}
      return res} )
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => dispatch(authError(err)))
  )
}

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        // Provide our existing token as credentials to get a new one
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
      .catch(err => {
        dispatch(authError(err));
        dispatch(clearAuth());
        clearAuthToken(authToken);
      });
  };


  export const submitScore = (score) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/score`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        score: score
      }
      // ,
      // body: JSON.stringify({
      //   score
      // })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(res => {dispatch(setHigh(res.data))})
      .catch(err => {
        dispatch(authError(err));
        dispatch(clearAuth());
        clearAuthToken(authToken);
      })
  };
  

  // export const submitScore = () => (dispatch, getState) => {
  //   const authToken = getState().auth.authToken;
  //   return fetch(`${API_BASE_URL}/score`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${authToken}`
  //     }
  //   })
  //     .then(res => normalizeResponseErrors(res))
  //     .then(res => res.json())
  //     .then((res => console.log(res)))
  //     .catch(err => {
  //       dispatch(authError(err));
  //       dispatch(clearAuth());
  //       clearAuthToken(authToken);
  //     })
  // };