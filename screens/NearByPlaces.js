import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import MapCallout from '../components/MapCallout';
import { getUserCurrentLocation, getUserNearByPlaces, getUsersAtSelectedPlace, nearByPlacesRefreshManage } from '../actions';

//myLat:51.4182, myLon: -.9463

class NearByPlaces extends Component {

  componentWillMount() {
    if (this.props.userLoginSession && this.props.nearByPlaceRefreshRequired === 'Y') {
      console.log('NearByPlaces.js componentWillMount calling..: ', this.props.userLoginSession.fbLoginID)
      this.refreshNearByPlaces(this.props.userLoginSession);
    };
  }

  componentWillReceiveProps(nextProps) {
    let callRefreshFlag = 'N';
    let userLoginSession = null;

    if (this.props.userLoginSession && nextProps.nearByPlaceRefreshRequired === 'Y') {
      callRefreshFlag = 'Y';
      userLoginSession = this.props.userLoginSession;
    } else if (nextProps.userLoginSession === null && this.props.nearByPlaceRefreshRequired === 'Y') {
      callRefreshFlag = 'Y';
      userLoginSession = nextProps.userLoginSession;
    } else if (nextProps.userLoginSession && nextProps.nearByPlaceRefreshRequired === 'Y') {
      callRefreshFlag = 'Y';
      userLoginSession = nextProps.userLoginSession;
    } else {
      callRefreshFlag = 'N';
    };

    if (callRefreshFlag === 'Y') {
      console.log('NearByPlaces.js componentWillReceiveProps calling ....: ', userLoginSession.fbLoginID);
      this.refreshNearByPlaces(userLoginSession);
    }

  }


  refreshNearByPlaces = (userLoginSession) => {
    this.props.getUserCurrentLocation(userLoginSession, () => { this.props.navigation.navigate('SelectLocation') });
    this.props.nearByPlacesRefreshManage('N');
  }


  goToLocationDetails = (place) => {
    this.props.getUsersAtSelectedPlace(place, () => { this.props.navigation.navigate('PlaceDetails') } );
  };


  renderPlaceMarker = () => {
    return this.props.userNearByPlaces.map((place) => {
      let { poiLatitude, poiLongitude } = place;

      let latitude = place.poiLatitude;
      let longitude = place.poiLongitude;

      return (
        <Marker key={place.poiId} coordinate={ {latitude, longitude} } title={place.poiName}>
          <Callout tooltip style={styles.calloutStyle}>
            <MapCallout
              title={place.poiName}
              description={place.totalUsers}
              onPress={() => this.goToLocationDetails(place)}
            />
          </Callout>
        </Marker>
      );
    })
  }

  renderMap = () => {
    //console.log('this.props.userCurrentLocation:' , this.props.userCurrentLocation)
    if (this.props.userCurrentLocation && this.props.userNearByPlaces) {
      const { latitude, longitude } = this.props.userCurrentLocation.coords;
      return (
        <MapView
          initialRegion={ {latitude: latitude, longitude: longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421  } }
          showsUserLocation
          style={styles.viewStyle} mapType='hybrid'
        >
          {this.renderPlaceMarker()}
        </MapView>
      );
    } else {
      return (
        <View></View>
      );
    }
  }


  render() {
    return (
      <View style={styles.viewStyle}>
        { this.renderMap()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1
  },
  calloutStyle: {
    borderWidth: 0,
    width:140
  }
}

const mapStateToProps = ( { location, auth }) => {
  //console.log('NearByPlaces mapStateToProps location: ', location);
  //console.log('NearByPlaces mapStateToProps auth: ', auth);
  const { userCurrentLocation, userNearByPlaces, nearByPlaceRefreshRequired } = location
  const { userLoginSession } = auth;
  return { userLoginSession, userCurrentLocation, userNearByPlaces,  nearByPlaceRefreshRequired };
};

export default connect(mapStateToProps, { getUserCurrentLocation, getUserNearByPlaces, getUsersAtSelectedPlace, nearByPlacesRefreshManage })(NearByPlaces);
