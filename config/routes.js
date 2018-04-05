import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';

import Login from '../screens/Login';
import NearByPlaces from '../screens/NearByPlaces';
import Settings from '../screens/Settings';
import TopCrowdedPlaces from '../screens/TopCrowdedPlaces';
import Profile from '../screens/Profile';
import PlaceDetails from '../screens/PlaceDetails';
import UserDetails from '../screens/UserDetails';
import Auth from '../screens/Auth';
import SelectLocation from '../screens/SelectLocation';
import Interests from '../screens/Interests';
import DisplayPlaceReviews from '../screens/DisplayPlaceReviews';
import CreatePlaceReviews from '../screens/CreatePlaceReviews';


export const NearByPlacesStack = StackNavigator(
  {
    NearByPlaces: { screen: NearByPlaces, navigationOptions: { title: 'People', headerTitle: 'People Around You'} },
    PlaceDetails: { screen: PlaceDetails, navigationOptions: { title: 'People', headerTitle: 'Place'} },
    DisplayPlaceReviews: { screen: DisplayPlaceReviews, navigationOptions: { title: 'People', headerTitle: 'Place Reviews'} },
    CreatePlaceReviews: { screen: CreatePlaceReviews, navigationOptions: { title: 'People', headerTitle: 'Provide Reviews'} },
    UserDetails: { screen: UserDetails, navigationOptions: { title: 'People', headerTitle: 'User'}}
  },
  { headerMode: 'screen'}
);

export const SettingsStack = StackNavigator(
  {
    Settings: { screen: Settings, navigationOptions: { title: 'Settings'} },
    Interests: { screen: Interests, navigationOptions: { title: 'Settings', headerTitle: 'Interests'} }
  },
  { headerMode: 'screen'}
);

export const TopCrowdedPlacesStack = StackNavigator(
  { TopCrowdedPlaces: { screen: TopCrowdedPlaces, navigationOptions: { title: 'Crowded Places'} } }, { headerMode: 'screen'}
);

export const ProfileStack = StackNavigator(
  {
    Profile: { screen: Profile, navigationOptions: { title: 'Profile'} },
    Interests: { screen: Interests, navigationOptions: { title: 'Profile', headerTitle: 'Interests'} }
  },
  { headerMode: 'screen'}
);

export const TabsStack = TabNavigator(
  {
    NearByPlacesStack: { screen: NearByPlacesStack },
    SettingsStack: { screen: SettingsStack },
    TopCrowdedPlacesStack: { screen: TopCrowdedPlacesStack },
    ProfileStack: { screen: ProfileStack }
  },
  { tabBarPosition: 'bottom', lazy: true, tabBarComponent: TabBarBottom, tabBarOptions: { labelStyle: {fontSize: 12} } }
);


export const MainNavigator = TabNavigator(
  {
    Login: { screen: Login },
    TabsStack: { screen: TabsStack },
    SelectLocation: { screen: SelectLocation }
  },
  { navigationOptions: { tabBarVisible: false }, lazy: true }
);
