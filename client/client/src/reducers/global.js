import { UPDATE_STATE } from '../constants/ActionTypes';

const initialState = {};

const global = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_STATE:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};

export default global;
