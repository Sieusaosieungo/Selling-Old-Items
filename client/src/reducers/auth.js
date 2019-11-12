import { SIGN_IN, SIGN_OUT } from '../constants/ActionTypes';

const initialState = false;

const auth = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SIGN_IN:
      state = true;
      return state;
    case SIGN_OUT:
      state = false;
      return state;

    default:
      return state;
  }
};

export default auth;
