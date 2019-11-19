import { STORE_USER, DELETE_USER } from '../constants/ActionTypes';

const initialState = {};

const user = (state = initialState, action) => {
  const { type, user } = action;

  switch (type) {
    case STORE_USER:
      state = { ...state, ...user };
      return state;
    case DELETE_USER:
      state = {};
      return state;
    default:
      return state;
  }
};

export default user;
