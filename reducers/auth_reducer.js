import {
  FACEBOOK_LOGIN_TOKEN,
  FACEBOOK_LOGIN_ID,
  USER_LOGIN_SESSION,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_USER_DETAILS,
  USER_DETAILS,
  NEARBY_PLACES_REFRESH_REQUIRED
} from '../actions/types';

const INITIAL_STATE = {
  fbToken: '',
  fbUserDtails: null,
  fbLoginID: '',
  userDetails: null,
  userLoginSession: null
};


export default function ( state=INITIAL_STATE, action) {
  /*
  console.log('auth_reducer.js action.type: ', action.type);
  console.log('auth_reducer.js action.payload: ', action.payload);
  console.log('auth_reducer.js state: ', state);
  */

  switch (action.type) {
    case FACEBOOK_LOGIN_TOKEN:
      return { ...state, fbToken: action.payload };
    case FACEBOOK_LOGIN_ID:
      return { ...state, fbLoginID: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { fbToken: null };
    //case FACEBOOK_USER_DETAILS:
      //return {...state, fbUserDtails: action.payload};
    case USER_DETAILS:
      return {...state, userDetails: action.payload};
    case USER_LOGIN_SESSION:
      //console.log('auth_reducer.js userLoginSession: ', action.payload);
      return {...state, userLoginSession: action.payload};
    default:
      return state;
  }
}
