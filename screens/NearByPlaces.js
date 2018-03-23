import React, { Component } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import MapCallout from '../components/MapCallout';
import { getUserCurrentLocation, getUserNearByPlaces, getUsersAtSelectedPlace, nearByPlacesRefreshManage } from '../actions';

//myLat:51.4182, myLon: -.9463

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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

  /*
  refreshNearByPlaces = (userLoginSession) => {
    this.props.getUserCurrentLocation(userLoginSession, () => { this.props.navigation.navigate('SelectLocation') });
    this.props.nearByPlacesRefreshManage('N');
  }
  */
  refreshNearByPlaces = (userLoginSession) => {
    this.props.getUserNearByPlaces(userLoginSession);
    this.props.nearByPlacesRefreshManage('N');
  }

  goToLocationDetails = (place) => {
    this.props.getUsersAtSelectedPlace(place, () => { this.props.navigation.navigate('PlaceDetails') } );
  };

  showPlacesToChoose = () => {
    console.log('showPlacesToChoose: ');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.navigation.navigate('SelectLocation', {currentPosition: position, userLoginSession: this.props.userLoginSession });
      },
      (error) => { console.log(error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  renderPlaceMarker = (userLastLatitude, userLastLongitude) => {
    return this.props.userNearByPlaces.list[0].map((place) => {
      //console.log('place: ', place);
      let { poiLatitude, poiLongitude } = place;

      let pinColor = "orangered";
      if (poiLatitude === userLastLatitude && poiLongitude === userLastLongitude) {
        pinColor = "blue";
      }

      let latitude = place.poiLatitude;
      let longitude = place.poiLongitude;

      return (
        <Marker key={place.poiId} coordinate={ {latitude, longitude} } title={place.poiName} pinColor={pinColor}>
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
    /*
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
        <View><Text>No Map</Text></View>
      );
    }
    */
    //console.log('LATITUDE_DELTA' + LATITUDE_DELTA);
    //console.log('LONGITUDE_DELTA' + LONGITUDE_DELTA);
    if (this.props.userNearByPlaces) {
      //console.log('this.props.userNearByPlaces: ', this.props.userNearByPlaces[0]);
      const { latitude, longitude } = this.props.userNearByPlaces.userCurrentLocation;
      return (
        <MapView
          style={styles.viewStyle}
          //provider={PROVIDER_GOOGLE}
          //fitToElements
          //zoomEnabled={true}
          //customMapStyle={ [zoom = 20] }
          //minZoomLevel={20}
          initialRegion={ {latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA  } }
          //initialRegion={ {latitude: poiLatitude, longitude: poiLongitude, latitudeDelta: 50, longitudeDelta: 50  } }
          //showsUserLocation
          mapType='hybrid'
        >
          {this.renderPlaceMarker(latitude, longitude)}
        </MapView>
      );
    } else {
      return (
        <View><Text>No Map</Text></View>
      );
    }
  }


  render() {
    return (
      <View style={styles.viewStyle}>
        { this.renderMap()}
        <View style={styles.viewButton}>
          <Icon
            raised
            color="grey"
            reverse
            name='my-location'
            type="MaterialIcons"
            onPress={this.showPlacesToChoose}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  calloutStyle: {
    borderWidth: 0,
    width:140,
    padding: 0
  },
  viewButton: {
    width:"20%",
    position:"absolute",
    bottom: 0,
    right: 2,
    borderWidth: 0
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
