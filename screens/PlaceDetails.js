import React, { Component } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Container from '../components/Container';

import { connect } from 'react-redux';
import { getUsersAtSelectedPlace } from '../actions';

class PlaceDetails extends Component {

  goToUserDetails = (user) => {
    //console.log('***** user: ', user);
    this.props.navigation.navigate('UserDetails');
  }

  renderPlaceDetails = () => {
    return (
      <View style={styles.placeViewStyle}>
        <Text style={styles.textHeadingStyle}>{this.props.selectedPlaceDetails.poiName} ({this.props.selectedPlaceDetails.poiType})</Text>
        <Text style={ styles.textNormalStyle }>{this.props.selectedPlaceDetails.poiAddress}</Text>
        <Text style={ styles.textNormalStyle }>No of Users: {this.props.selectedPlaceDetails.totalUsers} </Text>
      </View>
    );
  };


  renderSeperator = () => {
    return(
      <View style={ styles.seperatorStyle } />
    );
  }

  render() {
    return (
      <List containerStyle={ styles.listContainerStyle }>
        <FlatList
          data={this.props.usersAtSelectedPlace}
          renderItem={ ({item}) => (
            <TouchableHighlight key={item.profileId} onPress={ () => this.goToUserDetails(item) } >
              <ListItem
                containerStyle={{ borderBottomWidth: 0, borderWidth: 0, height: 50, marginTop: 0, marginBottom: 0 }}
                titleStyle={{ fontSize: 12, color: "red", marginTop: 1, marginBottom: 1 }}
                rightTitleStyle={{ fontSize: 12, color: "red", marginTop: 1, marginBottom: 1 }}
                subtitleStyle={{ fontSize: 12, color: "red", marginTop: 1, marginBottom: 1 }}
                //avatarContainerStyle={{ borderWidth: 2, marginTop: 0, alignItems: "flex-start"}}
                //wrapperStyle={ {backgroundColor: "yellow", height: 35} }
                roundAvatar
                hideChevron={false}
                rightTitle={item.gender}
                avatar={{uri: item.profileId}}
                title={item.name}
                subtitle={item.familyName}
              />
          </TouchableHighlight>
          )}
          keyExtractor={item => item.profileId}
          ItemSeparatorComponent={this.renderSeperator}
          ListHeaderComponent={this.renderPlaceDetails()}
          //ListFooterComponent={this.renderFooter}
          //onRefresh={this.handleRefresh}
          //refreshing={this.state.refreshing}

        />
      </List>
    );
  }
}

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
  placeViewStyle: {
    backgroundColor: 'sandybrown',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingTop: 1,
    paddingBottom: 1
  },
  textHeadingStyle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  },
  textNormalStyle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "white"
  }

});


const mapStateToProps = ( { place }) => {
  //console.log('PlaceDetails mapStateToProps place: ', place)
  const { usersAtSelectedPlace, selectedPlaceDetails } = place;
  return { usersAtSelectedPlace, selectedPlaceDetails};
};

export default connect(mapStateToProps, { getUsersAtSelectedPlace })(PlaceDetails);
