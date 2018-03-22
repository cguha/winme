import {
  SEARCH_GENDER_CHANGED,
  AGE_CHANGED,
  DISTANCE_CHANGED,
  SHOW_ME_CHANGED,
  SHOW_AGE_CHANGED,
  SETTINGS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  searchGender: 2,
  age: 18,
  distance: 10,
  showMe: true,
  showAge: true,
  userSettings: null
};

export default function (state=INITIAL_STATE, action) {
  //console.log('**** settings_reducer type: ', action.type);
  //console.log('**** settings_reducer data: ', action.payload);
  //console.log('**** settings_reducer state: ', state);

  switch (action.type) {
    case AGE_CHANGED:
      return ({ ...state, age: action.payload});
    case DISTANCE_CHANGED:
      return ( { ...state, distance: action.payload} );
    case SEARCH_GENDER_CHANGED:
      return ( { ...state, searchGender: action.payload} );
    case SHOW_ME_CHANGED:
     return ( { ...state, showMe: action.payload} );
    case SHOW_AGE_CHANGED:
      return ( { ...state, showAge: action.payload} );
    case SETTINGS_SUCCESS:
      if (action.payload.showProfile === 'Y') {
        showMeNew = true;
      } else if (action.payload.showProfile === 'N') {
        showMeNew = false;
      } else {
        showMeNew = false;
      }

      if (action.payload.showAge === 'Y') {
        showAgeNew = true;
      } else if (action.payload.showAge === 'N') {
        showAgeNew = false;
      } else {
        showAgeNew = false;
      }

      if (action.payload.searchGender === 'M') {
        searchGenderNew = 0;
      } else if (action.payload.searchGender === 'F') {
        searchGenderNew = 1;
      } else if (action.payload.searchGender === 'B') {
        searchGenderNew = 2;
      } else {
        searchGenderNew = 9;
      }

      return ({
        ...state,
        age: action.payload.maxSearchAge,
        distance: action.payload.maxDistance,
        searchGender: searchGenderNew,
        showMe: showMeNew,
        showAge: showAgeNew
      });
    default:
      return state;
  }
};
