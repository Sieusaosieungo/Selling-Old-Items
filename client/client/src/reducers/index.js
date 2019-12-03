import { combineReducers } from 'redux';

import user from './user';
import auth from './auth';
import global from './global';

const rootReducer = combineReducers({ user, auth, global });

export default rootReducer;
