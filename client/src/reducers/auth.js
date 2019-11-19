import { SIGN_IN, SIGN_OUT } from '../constants/ActionTypes';

const initialState = {
  accessToken: '',
};

const auth = (state = initialState, action) => {
  const { type, accessToken } = action;

  // console.log('authenticated: ', accessToken);

  switch (type) {
    case SIGN_IN:
      return { ...state, accessToken };
    default:
      return state;
  }
};

export default auth;
