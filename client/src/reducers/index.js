import { combineReducers } from 'redux';
import authReducer from './authReducer';
import portalReducer from './portalReducer';

export default combineReducers({
  auth: authReducer,
  portal: portalReducer
});
