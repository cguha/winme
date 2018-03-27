import {
  USER_PROFILE_BIRTHDATE,
  USER_PROFILE_ABOUTME,
  USER_PROFILE_PRIMARY_INTEREST
} from '../actions/types';

const INITIAL_STATE = {
  birthDate: new Date(),
  aboutMe: '',
  primaryInterest: {catId: 0, intId: 0, name: 'Any'}
};

export default function ( state=INITIAL_STATE, action) {
  switch (action.type) {
    case USER_PROFILE_BIRTHDATE:
      return { ...state, birthDate: action.payload };
    case USER_PROFILE_ABOUTME:
      return { ...state, aboutMe: action.payload};
    case USER_PROFILE_PRIMARY_INTEREST:
      return { ...state, primaryInterest: action.payload};
    default:
      return state;
  }
};
