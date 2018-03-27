import axios from 'axios';
import {
  USER_PROFILE_BIRTHDATE,
  USER_PROFILE_ABOUTME,
  USER_PROFILE_PRIMARY_INTEREST
} from './types';

export const birthDateChange = (birthDate) => {
  return ({ type: USER_PROFILE_BIRTHDATE, payload: birthDate });
}

export const aboutMeChange = (aboutMe) => {
  return ({ type: USER_PROFILE_ABOUTME, payload: aboutMe });
}

export const primaryInterestChange = ( {catId, intId, name} ) => {
  let primaryInterest = {catId, intId, name};
  //console.log('primaryInterest: ', primaryInterest);
  return ({ type: USER_PROFILE_PRIMARY_INTEREST, payload: {catId, intId, name} });
}
