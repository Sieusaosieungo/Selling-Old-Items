import { STORE_USER, SIGN_IN, UPDATE_STATE } from '../constants/ActionTypes';

export const signIn = accessToken => {
  return { type: SIGN_IN, accessToken };
};

export const storeUser = user => {
  return {
    type: STORE_USER,
    user,
  };
};

export const updateState = data => {
  return {
    type: UPDATE_STATE,
    payload: data,
  };
};
