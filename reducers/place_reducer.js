import {
  USERS_AT_SELECTED_PLACE,
  PLACE_DETAILS,
  TOP_CROWDED_PLACES
} from '../actions/types';

INITIAL_STATE = {
  usersAtSelectedPlace: null,
  selectedPlaceDetails: null,
  topCrowdedPlaces: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_AT_SELECTED_PLACE:
      return { ...state, usersAtSelectedPlace: action.payload };
    case PLACE_DETAILS:
      return { ...state, selectedPlaceDetails: action.payload};
    case TOP_CROWDED_PLACES:
        return { ...state, topCrowdedPlaces: action.payload};
    default:
      return state;
  }
};
