import { AsyncStorage } from 'react-native';
import {
  FACEBOOK_LOGIN_TOKEN,
  FACEBOOK_LOGIN_ID,
  USER_LOGIN_SESSION,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_USER_DETAILS,
  USER_DETAILS,
  NEARBY_PLACES_REFRESH_REQUIRED
} from './types';

import { Facebook } from 'expo';
import axios from 'axios';

const FB_PROFILE_URL = 'https://graph.facebook.com/v2.11/me?fields=id,picture,name,email,first_name,last_name,gender,birthday&access_token=';



export const facebookLogin = (callback) => async (dispatch) => {
  let token = await AsyncStorage.getItem('fb_token');
  let fb_user_id = await AsyncStorage.getItem('fb_user_id');
  //console.log('auth_action.js facebookLogin: ' + token + ', fb_user_id: ' + fb_user_id);
  console.log('auth_action.js facebookLogin: fb_user_id: ' + fb_user_id);

  let name = await AsyncStorage.getItem('firstName');
  let familyName = await AsyncStorage.getItem('lastName');
  let gender = await AsyncStorage.getItem('gender');
  let age = await AsyncStorage.getItem('age');
  let birthDate = await AsyncStorage.getItem('birthDate');
  let email = await AsyncStorage.getItem('email');
  let pictureLocation = await AsyncStorage.getItem('pictureLocation');

  userDetails = {
    profileId: fb_user_id,
    name: name,
    familyName: familyName,
    gender: gender,
    age: age,
    birthDate: birthDate,
    email: email,
    profileSource: 'FB',
    pictureLocation: pictureLocation
  };


  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_TOKEN, payload: token });
    dispatch({ type: FACEBOOK_LOGIN_ID, payload: fb_user_id });
    dispatch({ type: USER_LOGIN_SESSION, payload: {fbToken: token, fbLoginID: fb_user_id} });
    dispatch({ type: USER_DETAILS, payload: userDetails });

    if (callback) {
      dispatch({ type: NEARBY_PLACES_REFRESH_REQUIRED, payload: 'Y' });
      callback();
    }
  } else {
    doFacebookLogin(dispatch, callback);
  }
};


const doFacebookLogin = async (dispatch, callback) => {
  let result = await Facebook.logInWithReadPermissionsAsync('2054606067899136', { permissions: ['public_profile', 'email', 'user_birthday', 'user_hometown'] } );

  //console.log('*** auth_action.js doFacebookLogin FB authentication : ', result);
  let { type, token } = result;

  dispatch({ type: FACEBOOK_LOGIN_TOKEN, payload: token });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  if (type === 'success') {
    let responseFB = await axios.get(`${FB_PROFILE_URL}${token}`);
    console.log('auth_action.js responseFB: ', responseFB);

    const {id, first_name, last_name, gender, email, birthday } = responseFB.data;
    //dispatch({ type: FACEBOOK_USER_DETAILS, payload: responseFB.data});
    dispatch({ type: FACEBOOK_LOGIN_ID, payload: id });
    dispatch({ type: USER_LOGIN_SESSION, payload: {fbToken: token, fbLoginID: id} });

    //create user using FB user data
    const createUserURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users';
    const createUserFBData = {
 	    "profileId":id,
	    "name":first_name,
	    "familyName":last_name,
	    "profileSource":"FB",
	    "pictureLocation":responseFB.data.picture.data.url,
	    "email":email,
	    "gender":gender,
	    "birthDate":birthday,
	    "zoneInfo":"zone info",
	    "locale":"locale 1",
	    "phoneNumber":"12345",
	    "address":"Address 1",
	    "updatedAt":"2017-09-12 23:45:00"
    };

    let createUserResponse = await axios.post(createUserURL, createUserFBData);
    //console.log('auth_actions.js createUserResponse: ', createUserResponse);
    //this can be used by profile screen
    dispatch({ type: USER_DETAILS, payload: createUserResponse.data });
    const { age } = createUserResponse.data;
    console.log('***** auth_actions.js createUserResponse: ', createUserResponse.data);
    console.log('age :', age);

    /*
    AsyncStorage.removeItem('fb_token');
    AsyncStorage.removeItem('fb_user_id');
    */

    await AsyncStorage.setItem('fb_token', token);
    await AsyncStorage.setItem('fb_user_id', id );

    ///*
    await AsyncStorage.setItem('firstName', first_name );
    await AsyncStorage.setItem('lastName', last_name );
    await AsyncStorage.setItem('gender', gender);
    await AsyncStorage.setItem('age', age.toString() );
    await AsyncStorage.setItem('birthDate', birthday );
    await AsyncStorage.setItem('email', email );
    await AsyncStorage.setItem('pictureLocation', responseFB.data.picture.data.url );
    //*/

    if (callback) {
      dispatch({ type: NEARBY_PLACES_REFRESH_REQUIRED, payload: 'Y' });
      callback();
    }
  }

}
