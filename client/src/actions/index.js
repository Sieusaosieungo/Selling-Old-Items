import { STORE_USER, SIGN_IN, SIGN_OUT } from '../constants/ActionTypes';

export const signIn = () => {
  return { type: SIGN_IN };
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
