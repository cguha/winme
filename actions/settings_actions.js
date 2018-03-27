import axios from 'axios';
import {
  SEARCH_GENDER_CHANGED,
  AGE_CHANGED,
  DISTANCE_CHANGED,
  SHOW_ME_CHANGED,
  SHOW_AGE_CHANGED,
  SETTINGS_SUCCESS,
  NEARBY_PLACES_REFRESH_REQUIRED
} from './types';


export const searchGenderChange = (value) => {
  return (
    { type: 'SEARCH_GENDER_CHANGED', payload: value }
  );
};

export const ageChange = (value) => {
  return (
    { type: 'AGE_CHANGED', payload: value }
  );
};

export const distanceChange = (value) => {
  return (
    { type: 'DISTANCE_CHANGED', payload: value }
  );
};

export const showMeChange = (value) => {
  return (
    { type: 'SHOW_ME_CHANGED', payload: value }
  );
};

export const showAgeChange = (value) => {
  return (
    { type: 'SHOW_AGE_CHANGED', payload: value }
  );
};

export const saveSettings = ({distance, age, searchGender, searchG, showMe, showMeFlag, showAge, showAgeFlag, userLoginSession}, callbackToNearByPlaces) => async(dispatch) => {


  const settingsURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/settings';
  let settingsData = {
    "profileId": userLoginSession.fbLoginID,
	  "maxDistance": distance,
	  "searchGender": searchG,
	  "minSearchAge": 18,
	  "maxSearchAge": age,
	  "poiType": "All",
    "showProfile": showMeFlag,
    "showAge": showAgeFlag
  };

  /*
  let responseSettings = await axios.post(settingsURL, settingsData);
  console.log('*** 16. Step 3 should appear next. responseSettings: ', responseSettings);
  dispatch({type: SETTINGS_SUCCESS, payload: responseSettings.data});
  callbackToNearByPlaces();
  */

  let responseSettings = await axios.post(settingsURL, settingsData)
    .then( response => {
      console.log('***### 16. Step 3 should appear next. response: ', response);
      dispatch({type: SETTINGS_SUCCESS, payload: response.data});
      dispatch({ type: NEARBY_PLACES_REFRESH_REQUIRED, payload: 'Y' });
      callbackToNearByPlaces();
    });


};

//this is called to get users current settings
export const getUserSettings = (userLoginSession) => async(dispatch) => {
  const userSettingsURL = `http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/${userLoginSession.fbLoginID}/settings`;
  let userSettingResponse = await axios.get(userSettingsURL);
  //console.log('######### userSettingResponse settings_action.js: ', userSettingResponse.data);
  dispatch({type: SETTINGS_SUCCESS, payload: userSettingResponse.data});

}
