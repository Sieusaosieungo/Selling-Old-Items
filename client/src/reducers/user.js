import { STORE_USER } from '../constants/ActionTypes';

const initialState = {};

const user = (state = initialState, action) => {
  const { type, user } = action;

  switch (type) {
    case STORE_USER:
      state = { state, ...user };
      return state;
    default:
      return state;
  }
};

export default user;
