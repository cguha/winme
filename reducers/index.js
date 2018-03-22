import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import userLocationReducer from './userlocation_reducer';
import placeReducer from './place_reducer';
import settingsReducer from './settings_reducer';


export default combineReducers({
  auth: AuthReducer,
  location: userLocationReducer,
  place: placeReducer,
  settings: settingsReducer
});
