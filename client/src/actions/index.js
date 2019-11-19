import {
  STORE_USER,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_STATE,
  DELETE_USER,
} from '../constants/ActionTypes';

export const signIn = accessToken => {
  return { type: SIGN_IN, accessToken };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const storeUser = user => {
  return {
    type: STORE_USER,
    user,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};

export const updateState = data => {
  return {
    type: UPDATE_STATE,
    payload: data,
  };
};
