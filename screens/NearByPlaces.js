import React, { Component } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import MapCallout from '../components/MapCallout';
import { getUserCurrentLocationByPhone, getUserNearByPlaces, getUsersAtSelectedPlace, nearByPlacesRefreshManage } from '../actions';

//myLat:51.4182, myLon: -.9463

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class NearByPlaces extends Component {

  componentWillMount() {
    if (this.props.userLoginSession && this.props.nearByPlaceRefreshRequired === 'Y') {
      console.log('*** 2. NearByPlaces.js componentWillMount call refresh: ', this.props.userLoginSession.fbLoginID)
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
      console.log('*** NearByPlaces.js componentWillReceiveProps call refresh: ', userLoginSession.fbLoginID);
      this.refreshNearByPlaces(userLoginSession);
    }

  }

  refreshNearByPlaces = (userLoginSession) => {
    this.props.getUserNearByPlaces(userLoginSession);
    this.props.nearByPlacesRefreshManage('N');
  }

  goToLocationDetails = (place) => {
    this.props.getUsersAtSelectedPlace(place, () => { this.props.navigation.navigate('PlaceDetails') } );
  };

  //this is called when the floating button is pressed
  showPlacesToChoose = () => {
    this.props.getUserCurrentLocationByPhone( () => { this.props.navigation.navigate('SelectLocation') } );
  }

  renderPlaceMarker = (userLastLatitude, userLastLongitude, userCurrentLocation) => {
    let userNearByPlacesArray = this.props.userNearByPlaces.list[0];
    userNearByPlacesArray.push({poiId: "Unknown", poiName: userCurrentLocation.poiName, poiLatitude: userLastLatitude, poiLongitude: userLastLongitude });

    return userNearByPlacesArray.map((place, index) => {
      //console.log('place: ', place);
      //console.log('userCurrentLocation: ', userCurrentLocation);
      //console.log('index: '+ index);
      let { poiLatitude, poiLongitude } = place;

      let pinColor = "orangered";
      if (poiLatitude === userLastLatitude && poiLongitude === userLastLongitude) {
        pinColor = "blue";
      }

      return (
        <Marker key={index} coordinate={ {latitude: poiLatitude, longitude: poiLongitude} } pinColor={pinColor}>
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

  //22.4583792, 88.3788021 - Mainak Gardens
  //Home: 51.4180817, -0.9490554
  //Tesco Uxbridge: 51.5477631, -0.4838688

  renderMap = () => {
    if (this.props.userNearByPlaces) {
      console.log('*** 4. NBP renders places : ', this.props.userNearByPlaces);
      const { latitude, longitude } = this.props.userNearByPlaces.userCurrentLocation;
      let initialRegion = { latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA  } ;
      let region = { latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA  };
      return (
        <MapView
          style={styles.viewStyle}
          //provider={PROVIDER_GOOGLE}
          //fitToElements
          //zoomEnabled={true}
          //customMapStyle={ [zoom = 20] }
          //minZoomLevel={20}
          //initialRegion={ {latitude: latitude, longitude: longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA  } }
          initialRegion= { initialRegion }
          region = { region }
          //initialRegion={ {latitude: poiLatitude, longitude: poiLongitude, latitudeDelta: 50, longitudeDelta: 50  } }
          //showsUserLocation
          //followsUserLocation={true}
          mapType='hybrid'
        >
          {this.renderPlaceMarker(latitude, longitude, this.props.userNearByPlaces.userCurrentLocation)}
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
            color="maroon"
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
  //console.log('*** NearByPlaces mapStateToProps location: ', location);
  //console.log('NearByPlaces mapStateToProps auth: ', auth);
  const { userLoginSession } = auth;
  const { userCurrentLocationByPhone, userNearByPlaces, nearByPlaceRefreshRequired } = location
  return { userLoginSession, userCurrentLocationByPhone, userNearByPlaces,  nearByPlaceRefreshRequired };
};

export default connect(mapStateToProps, { getUserCurrentLocationByPhone, getUserNearByPlaces, getUsersAtSelectedPlace, nearByPlacesRefreshManage })(NearByPlaces);
