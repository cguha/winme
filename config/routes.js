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


export const NearByPlacesStack = StackNavigator(
  {
    NearByPlaces: { screen: NearByPlaces, navigationOptions: { title: 'Places'} },
    PlaceDetails: { screen: PlaceDetails, navigationOptions: { title: 'Place Details'}},
    UserDetails: { screen: UserDetails, navigationOptions: { title: 'User Details'}}
  },
  { headerMode: 'screen'}
);

export const SettingsStack = StackNavigator(
  { Settings: { screen: Settings, navigationOptions: { title: 'Settings'} } }, { headerMode: 'screen'}
);

export const TopCrowdedPlacesStack = StackNavigator(
  { TopCrowdedPlaces: { screen: TopCrowdedPlaces, navigationOptions: { title: 'Crowded Places'} } }, { headerMode: 'screen'}
);

export const ProfileStack = StackNavigator(
  { Profile: { screen: Profile, navigationOptions: { title: 'Profile'} } }, { headerMode: 'screen'}
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
