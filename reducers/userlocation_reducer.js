import {
  USER_CURRENT_LOCATION_BY_PHONE,
  USER_CONFIRMED_LOCATION,
  USER_NEARBY_PLACES,
  USER_DETAILS,
  GOOGLE_NEARBY_PLACES_TO_CONFIRM,
  GOOGLE_LOCATION_API_CALL_REQUIRED,
  NEARBY_PLACES_REFRESH_REQUIRED
} from '../actions/types';

const INITIAL_STATE = {
  userCurrentLocation: null,
  userNearByPlaces: null,
  userDetails: null,
  userNearByPlacesToConfirm: null,
  userCurrentLocationConfirmed: null,
  googleAPICallRequired: 'N',
  nearByPlaceRefreshRequired: 'N'
};

export default function ( state=INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAILS:
      return {...state, userDetails: action.payload};
    case USER_CURRENT_LOCATION_BY_PHONE:
      console.log('userlocation_reducer userCurrentLocation(Phone): ', action.payload);
      return { ...state, userCurrentLocation: action.payload };
    case USER_NEARBY_PLACES:
      return { ...state, userNearByPlaces: action.payload};
    case GOOGLE_NEARBY_PLACES_TO_CONFIRM:
      return { ...state, userNearByPlacesToConfirm: action.payload};
    case USER_CONFIRMED_LOCATION:
      return { ...state, userCurrentConfirmedLocation: action.payload};
    case GOOGLE_LOCATION_API_CALL_REQUIRED:
      return { ...state, googleAPICallRequired: action.payload};
    case NEARBY_PLACES_REFRESH_REQUIRED:
      return { ...state, nearByPlaceRefreshRequired: action.payload};
    default:
      return state;
  }
};
