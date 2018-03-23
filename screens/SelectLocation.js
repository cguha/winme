import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, Modal, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { confirmLocationByUser, getNearByLocationToConfirm, googleAPICallRequiredManage, nearByPlacesRefreshManage } from '../actions';

class SelectLocation extends Component {

  state = {
    showPlace: false
  };

  componentWillMount() {
    if (this.props.userLoginSession && this.props.googleAPICallRequired === 'Y' && this.props.userCurrentLocation) {
      console.log('SelectLocation.js componentWillMount');
      this.getNearByLocations(this.props.userLoginSession, this.props.userCurrentLocation);
    }
    console.log('#### SelectLocation.js componentWillMount');
    if (this.props.navigation.state.params) {
      this.getNearByLocations(this.props.navigation.state.params.userLoginSession, this.props.navigation.state.params.currentPosition);
    }
  };

  //I assume userLoginSession will be present by this time
  componentWillReceiveProps(nextProps) {
    if (this.props.userCurrentLocation) {
      userCurrentLocation = this.props.userCurrentLocation;
    }

    if (nextProps.userCurrentLocation) {
      userCurrentLocation = nextProps.userCurrentLocation;
    }

    if (nextProps.googleAPICallRequired === 'Y' && this.props.googleAPICallRequired === 'N') {
      console.log('SelectLocation.js componentWillReceiveProps..');
      this.getNearByLocations(this.props.userLoginSession, userCurrentLocation);
      /*
      this.setState({showPlace: true});
      this.props.getNearByLocationToConfirm(nextProps.fbLoginID, nextProps.userCurrentLocation);
      this.props.googleAPICallRequiredManage('N');
      */
    };
  }

  getNearByLocations = (userLoginSession, userCurrentLocation) => {
    //console.log('SelectLocation.js getNearByLocations is called with: ', userCurrentLocation);
    this.setState({showPlace: true});
    this.props.getNearByLocationToConfirm(userLoginSession, userCurrentLocation);
    this.props.googleAPICallRequiredManage('N');
  };


  renderHeader = () => {
    return(
      <View style={styles.headerViewStyle}>
        <Text style={styles.textHeadingStyle}>Select Current location</Text>
      </View>
    );
  }

  renderSeperator = () => {
    return(
      <View style={ styles.seperatorStyle } />
    );
  }


  renderFooter = () => {
    return(
      <View style={styles.footerViewStyle}>
        <TouchableHighlight style={styles.buttonStyle}
          onPress={ () => {
            item = {
              icon: 'dummy_icon',
              id: 'dummy_id',
              name: 'unknown name',
              place_id: 'UNKNOWN',
              rating: 0,
              geometry: {
                location: {
                  lat: this.props.userCurrentLocation.coords.latitude,
                  lng: this.props.userCurrentLocation.coords.longitude
                }
              },
              types: ['dummy_types']
            };
            this.setState({showPlace: false});
            this.props.confirmLocationByUser(this.props.userLoginSession, item, () => { this.props.navigation.navigate('NearByPlacesStack') });
          }}
        >
          <View style={styles.viewButton}>
            <Text style={styles.buttonText}>My location is not listed above</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  fnConfirmLocation = (place) => {
    this.setState({showPlace: false});
    this.props.confirmLocationByUser(this.props.userLoginSession, place, () => { this.props.navigation.navigate('NearByPlacesStack') });
    this.props.nearByPlacesRefreshManage('Y');
  };

  render() {
    console.log('render of Modal');
    return (
      <Modal visible={this.state.showPlace} animationType="slide" presentationStyle="fullScreen" >
        <List containerStyle={ styles.listContainerStyle }>
          <FlatList
            data={this.props.userNearByPlacesToConfirm}
            renderItem={ ({item}) => (
              <TouchableHighlight key={item.place_id}
                ///*
                onPress={() => {
                  this.setState({showPlace: false});
                  this.props.confirmLocationByUser(this.props.userLoginSession, item, () => { this.props.navigation.navigate('NearByPlacesStack') });
                  this.props.nearByPlacesRefreshManage('Y');
                }}
                //*/
                //onPress={this.fnConfirmLocation(item)}
              >
                <ListItem
                  containerStyle={{ borderBottomWidth: 0, borderWidth: 0, height: 50, marginTop: 0, marginBottom: 0 }}
                  titleStyle={{ fontSize: 12, color: "red", marginTop: 1, marginBottom: 1 }}
                  rightTitleStyle={{ fontSize: 12, color: "red", marginTop: 1, marginBottom: 1 }}
                  subtitleStyle={{ fontSize: 12, color: "red", marginTop: 1, marginBottom: 1 }}
                  //avatarContainerStyle={{ borderWidth: 2, marginTop: 0, alignItems: "flex-start"}}
                  //wrapperStyle={ {backgroundColor: "yellow", height: 35} }
                  roundAvatar
                  hideChevron={false}
                  //rightTitle={item.gender}
                  avatar={{uri: item.icon}}
                  title={item.name}
                  subtitle={item.types[0]}
                />
            </TouchableHighlight>
            )}
            keyExtractor={item => item.place_id}
            ItemSeparatorComponent={this.renderSeperator}
            ListHeaderComponent={this.renderHeader()}
            ListFooterComponent={this.renderFooter}
            //onRefresh={this.handleRefresh}
            //refreshing={this.state.refreshing}

          />
        </List>
      </Modal>
    );
  }
};


const styles = StyleSheet.create({
  listContainerStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopColor: "green",
    borderBottomColor: "yellow",
    marginTop: 0,
  },
  seperatorStyle: {
    height: 1,
    borderWidth: .5,
    borderColor: "#CED0CE",
    marginLeft: "1%",
    width: "99%"
  },
  headerViewStyle: {
    backgroundColor: 'indigo',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingTop: 1,
    paddingBottom: 1,
    marginTop: 60
  },
  footerViewStyle: {
    flex: 1,
    width: "100%",
    backgroundColor: 'mintcream',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    height: 50,
    paddingTop: 5,
    paddingBottom: 1,
    marginTop: 5
  },
  textHeadingStyle: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white"
  },
  textNormalStyle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "white"
  },
  viewButton: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "firebrick",
    marginTop: 1
  },
  buttonStyle: {
    width: "100%",
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic"
  }
});

const mapStateToProps = ( { auth, location }) => {
  //console.log('**** SelectLocation mapStateToProps SelectLocation location: ', location);
  //console.log('*** SelectLocation mapStateToProps auth: ', auth);
  const { userLoginSession } = auth;
  const { userCurrentLocation, userNearByPlacesToConfirm, googleAPICallRequired } = location
  return { userLoginSession, userCurrentLocation, userNearByPlacesToConfirm, googleAPICallRequired };
};

export default connect(mapStateToProps, {
  confirmLocationByUser, getNearByLocationToConfirm, googleAPICallRequiredManage, nearByPlacesRefreshManage })(SelectLocation);
