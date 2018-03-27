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
    console.log('*** 6. SelectLocation componentWillMount userCurrentLocationByPhone : ', this.props.userCurrentLocationByPhone);
    if (this.props.userCurrentLocationByPhone) {
      this.getNearByLocations(this.props.userLoginSession, this.props.userCurrentLocationByPhone);
    }
  };

  componentWillUnmount() {
    console.log('*** 11A. SelectLocation componentWillUnmount');
    this.setState({showPlace: false});
  }


  //I assume userLoginSession will be present by this time
  componentWillReceiveProps(nextProps) {
    if (nextProps.userCurrentLocationByPhone != this.props.userCurrentLocationByPhone) {
      console.log('*** 7. SelectLocation componentWillReceiveProps userCurrentLocationByPhone : ', this.props.userCurrentLocationByPhone);
      this.getNearByLocations(this.props.userLoginSession, nextProps.userCurrentLocationByPhone);
    }
  }


  getNearByLocations = (userLoginSession, userCurrentLocationByPhone) => {
    console.log('*** 7A. SelectLocation calls getNearByLocationToConfirm with currentPositionByPhone : ', userCurrentLocationByPhone);
    this.setState({showPlace: true});
    this.props.getNearByLocationToConfirm(userLoginSession, userCurrentLocationByPhone);
    //this.props.googleAPICallRequiredManage('N');
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
            item = { icon: 'dummy_icon', id: 'dummy_id', name: 'unknown name', place_id: 'UNKNOWN', rating: 0,
              geometry: {
                location: {
                  lat: this.props.userCurrentLocationByPhone.coords.latitude,
                  lng: this.props.userCurrentLocationByPhone.coords.longitude
                }
              },
              types: ['dummy_types']
            };
            this.fnConfirmLocation(item);
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
    console.log('*** 11. SelectLocation (CB to NBP) calls confirmLocationByUser : ', place);
    this.setState({showPlace: false});
    this.props.confirmLocationByUser(this.props.userLoginSession, place, () => { this.props.navigation.navigate('NearByPlacesStack') });
    this.props.nearByPlacesRefreshManage('Y');
  };


  renderData = () => {
    return (
        <List containerStyle={ styles.listContainerStyle }>
          <FlatList
            data={this.props.userNearByPlacesToConfirm}
            renderItem={ ({item}) => (
              <TouchableHighlight key={item.place_id}
                ///*
                onPress={() => {
                  this.fnConfirmLocation(item);
                }}
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
    );
  }

  render() {
    console.log('*** 10. SelectLocation render with Google response : ', this.props.userNearByPlacesToConfirm);
    return(
      <Modal visible={this.state.showPlace} animationType="slide" presentationStyle="fullScreen"
        onDismiss={ () => {
          console.log('*** 11A. Modal is closed');
          this.setState( {showPlace: false} );
        }}
      >
        {this.renderData()}
      </Modal>
    );
  }


};//end of SelectLocation class


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
  const { userCurrentLocationByPhone, userNearByPlacesToConfirm } = location
  return { userLoginSession, userCurrentLocationByPhone, userNearByPlacesToConfirm };
};

export default connect(mapStateToProps, {
  confirmLocationByUser, getNearByLocationToConfirm , nearByPlacesRefreshManage })(SelectLocation);
