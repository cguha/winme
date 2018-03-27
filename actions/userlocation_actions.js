import {
  USER_CURRENT_LOCATION_BY_PHONE,
  USER_CONFIRMED_LOCATION,
  USER_NEARBY_PLACES,
  USER_DETAILS,
  GOOGLE_NEARBY_PLACES_TO_CONFIRM,
  GOOGLE_LOCATION_API_CALL_REQUIRED,
  NEARBY_PLACES_REFRESH_REQUIRED
} from './types';
//import userNearByPlaces from '../stubdata/GetNearByPlaces.json';
import { AsyncStorage } from 'react-native';
import axios from 'axios';



export const getUserNearByPlaces = (userLoginSession) => async(dispatch) => {
  const nearByPlacesURL = `http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/nearbyplaces`;
  const nearByPlacesData = { "profileId": userLoginSession.fbLoginID };

  let nearByPlacesResponse = await axios.post(nearByPlacesURL, nearByPlacesData);
  console.log('#### 3. getUserNearByPlaces nearByPlacesData input: ', nearByPlacesData);
  console.log('#### 3. getUserNearByPlaces response: ', nearByPlacesResponse);
  //console.log('************* userlocation_action.js place: ', nearByPlacesResponse.data.list[0]);
  //console.log('************* userlocation_action.js userCurrentLocation: ', nearByPlacesResponse.data.userCurrentLocation);

  dispatch({ type: USER_NEARBY_PLACES, payload: nearByPlacesResponse.data });
};


//this is to find out near by places for a user so that he can choose the right place from the list of places
export const getNearByLocationToConfirm = (userLoginSession, userCurrentLocationByPhone) => async(dispatch) => {
  console.log('*** 8. getNearByLocationToConfirm with userCurrentLocationByPhone: ', userCurrentLocationByPhone);

  const googleAPIKey = 'AIzaSyAOGS2GwieA9bw8ZzNtJOgX5CYmi4qPDho';
  const radius = 100; //in meters
  const {latitude, longitude} = userCurrentLocationByPhone.coords;

  const googleURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${googleAPIKey}`;

  let googlePlaceAPIResponse = await axios.get(googleURL);
  console.log('*** 9. Google API returns near by places : ', googlePlaceAPIResponse);

  dispatch({ type: GOOGLE_NEARBY_PLACES_TO_CONFIRM, payload: googlePlaceAPIResponse.data.results });

};



//this is for a user to confirm the place where he is.
//We update the current location with this information and then call near by places and then send him to the near by places screen
export const confirmLocationByUser = (userLoginSession, userCurrentLocationConfirmed, callbackToNBP) => async(dispatch) => {

  console.log('*** 12. userlocation_action.js confirmLocationByUser: ', userCurrentLocationConfirmed );

  const {icon, id, name, place_id, rating } = userCurrentLocationConfirmed;
  const { lat, lng } = userCurrentLocationConfirmed.geometry.location;

  const locationURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/location';
  const locationData = {
      "profileId": userLoginSession.fbLoginID,
      "latitude": lat,
      "longitude":lng,
      "poiId": place_id,
      "poiName": name,
      "poiType": userCurrentLocationConfirmed.types[0],
      "poiAddress": "Dummy address",
      "poiInterest": 'Y',
      "poiPhone": "dummy",
      "poiWebsite": "dummy",
      "poiRating": rating
  };

  let locationResponse = await axios.post(locationURL, locationData);
  dispatch({ type: USER_CONFIRMED_LOCATION, payload: userCurrentLocationConfirmed });
  console.log('*** 13. Update user current location via location API: ', locationResponse );

  const nearByPlacesURL = `http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/nearbyplaces`;
  const nearByPlacesData = { "profileId": userLoginSession.fbLoginID };
  let nearByPlacesResponse = await axios.post(nearByPlacesURL, nearByPlacesData);

  console.log('*** 14. NBP after confirms current location reloads NBP: ', nearByPlacesResponse );
  dispatch({ type: USER_NEARBY_PLACES, payload: nearByPlacesResponse.data });
  callbackToNBP();
};


export const getUserCurrentLocationByPhone = (callback) => async(dispatch) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('*** 5. getUserCurrentLocationByPhone currentPositionByPhone : ', position);
      dispatch({ type: USER_CURRENT_LOCATION_BY_PHONE, payload: position })
    },
    (error) => { console.log(error)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

  callback();

};


//get users current location from phones gps.
//if user's current location is present (latlon API) then get near by places (nearbyplaces API)
//if users current location is not present then redirect (callback) to the location screen for him to show near by places to choose the right place
export const getUserCurrentLocation = (userLoginSession, callbackToLocation) => async(dispatch) => {
  //console.log('*** userlocation_action.js getUserCurrentLocation profileId: ', profileId);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setPosition(position, userLoginSession, callbackToLocation);
      dispatch({ type: USER_CURRENT_LOCATION_BY_PHONE, payload: position })
    },
    (error) => { console.log(error)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

  const setPosition = (position, userLoginSession, callbackToLocation) => {
    getNearByPlaces(dispatch, position, userLoginSession, callbackToLocation);
  }

};

//this is helper function
const getNearByPlaces = async (dispatch, position, userLoginSession, callbackToLocation) => {
  //console.log('*** userlocation_action.js current position: ', position);
  const {latitude, longitude} = position.coords;
  const latlonURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/location/latlon';
  const latLonInputData = { "profileId": userLoginSession.fbLoginID, "latitude":latitude, "longitude":longitude};
  let responseLatLon = await axios.post(latlonURL, latLonInputData);

  //console.log('***########## userlocation_action.js latLon API response: ', responseLatLon);

  if (responseLatLon.data.poiId === 'NoPlaceId') {
    //callback to location screen to display all nearby places
    dispatch({ type: GOOGLE_LOCATION_API_CALL_REQUIRED, payload: 'Y' });
    callbackToLocation();
  } else {
    const nearByPlacesURL = `http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/nearbyplaces`;
    const nearByPlacesData = { "profileId": userLoginSession.fbLoginID };

    let nearByPlacesResponse = await axios.post(nearByPlacesURL, nearByPlacesData);
    //console.log('userlocation_action.js nearByPlacesResponse: ', nearByPlacesResponse);
    dispatch({ type: USER_NEARBY_PLACES, payload: nearByPlacesResponse.data.list });
    dispatch({ type: GOOGLE_LOCATION_API_CALL_REQUIRED, payload: 'N' });

    //the below causes infinite loop so comment them out. Also we don't need to call for SelectLocation as this flow comes from auth.
    //dispatch({ type: NEARBY_PLACES_REFRESH_REQUIRED, payload: 'Y' });
    //callbackToLocation();
  }

}


export const nearByPlacesRefreshManage = (refreshRequiredFlag) => async(dispatch) => {
  //console.log('**** userlocation_action.js nearByPlacesRefreshManage refreshRequiredFlag: ' + refreshRequiredFlag);
  dispatch({ type: NEARBY_PLACES_REFRESH_REQUIRED, payload: refreshRequiredFlag });
}

export const googleAPICallRequiredManage = (apiCallRequiredFlag) => async(dispatch) => {
  console.log('**** userlocation_action.js googleAPICallRequiredManage apiCallRequiredFlag: ' + apiCallRequiredFlag);
  dispatch({ type: GOOGLE_LOCATION_API_CALL_REQUIRED, payload: apiCallRequiredFlag });
}
