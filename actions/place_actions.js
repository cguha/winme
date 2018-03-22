import {
  USERS_AT_SELECTED_PLACE,
  PLACE_DETAILS,
  TOP_CROWDED_PLACES
} from './types';
import axios from 'axios';
//import usersAtSelectedPlace from '../stubdata/GetUsersByPlace.json';

export const getUsersAtSelectedPlace = (selectedPlaceDetails, cbToPlaceDetails) => async (dispatch) => {
  try {

    dispatch({ type: PLACE_DETAILS, payload: selectedPlaceDetails });

    //call other users at this place
    const usersAtPoiURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/pois/others';
    let usersAtPoiURLInput = { poiId: selectedPlaceDetails.poiId };
    usersAtPoiResponse = await axios.post(usersAtPoiURL, usersAtPoiURLInput);

    dispatch({ type: USERS_AT_SELECTED_PLACE, payload: usersAtPoiResponse.data.list });
    cbToPlaceDetails();
  } catch(e) {
    console.error(e);
  }

};

export const getTopCrowdedPlaces = (userLoginSession) => async (dispatch) => {
  try {
    const topCrowdedPlacesURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/profile/top5places';
    let topCrowdedPlacesInput = { "profileId": userLoginSession.fbLoginID  };
    let topCrowdedPlacesResponse = await axios.post(topCrowdedPlacesURL, topCrowdedPlacesInput);

    //console.log('*** topCrowdedPlacesInput: ', topCrowdedPlacesInput);
    //console.log('*** place_actins.js topCrowdedPlacesResponse: ', topCrowdedPlacesResponse);

    dispatch({ type: TOP_CROWDED_PLACES, payload: topCrowdedPlacesResponse.data });
  } catch (e) {
    console.error(e);
  }
}
