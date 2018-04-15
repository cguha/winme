import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  primaryInterestChange
} from '../actions';

const OBJECTS = [
  {catId: 1, intId: 1, name: 'Football'},
  {catId: 1, intId: 2, name: 'Cricker'},
  {catId: 1, intId: 3, name: 'Tennis'},
  {catId: 1, intId: 4, name: 'Table Tennis'},
  {catId: 1, intId: 5, name: 'Golf'},
  {catId: 2, intId: 6, name: 'Software Development'},
  {catId: 2, intId: 7, name: 'IT Architecture'},
  {catId: 2, intId: 8, name: 'React'},
  {catId: 3, intId: 9, name: 'Politics'},
  {catId: 4, intId: 10, name: 'UK History'},
  {catId: 4, intId: 11, name: 'Indian History'},
  {catId: 5, intId: 12, name: 'Meetups'},
  {catId: 5, intId: 13, name: 'Meetups - Software'},
  {catId: 5, intId: 14, name: 'Meetups - FE Technology'}
];

class Interests extends Component {

  state = {
    loading: false,
    refreshing: false
  };

  renderSeperator = () => {
    return(
      <View style={styles.seperatorStyle} />
    );
  }

  renderHeader = () => {
    return(
      <View>
        <SearchBar placeholder="Search here ..." lightTheme round />
      </View>
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return(
      <View style={ {borderTopWidth: 1, borderTopColor: "red"} }>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  handleRefresh = () => {
    this.setState(
      {refreshing: true },
      () => {
        console.log('handleRefresh');
      }
    );
  }

  componentDidMount() {
    console.log('componentDidMount');
  };


  componentWillReceiveProps(nextProps) {
    console.log('componentDidMount');
  };

  goToProfile = ( {catId, intId, name} ) => {
    //console.log('goToProfile: ', interest);
    this.props.primaryInterestChange({catId, intId, name});
    this.props.navigation.goBack(null);
  }

  render() {
    console.log('render Interests');
    return (
      <List containerStyle={styles.listStyle}>
        <FlatList
          data={OBJECTS}
          renderItem={ ({item}) => (
            <TouchableHighlight key={item.intId} onPress={ () => this.goToProfile(item) } >
              <ListItem
                containerStyle={{ borderBottomWidth: 0 }}
                roundAvatar
                title={item.name}
                subtitle={item.catId}
              />
            </TouchableHighlight>
            )}
            keyExtractor={item => item.intId}
            ItemSeparatorComponent={this.renderSeperator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderTopColor: "green",
    borderBottomColor: "yellow",
    marginTop: 0
  },
  seperatorStyle: {
    height:1,
    borderWidth: 1,
    borderColor: "#CED0CE",
    marginLeft: "15%",
    width: "85%"
  },
});


const mapStateToProps = ( { auth }) => {
  console.log('*** Interests mapStateToProps auth: ', auth);
  //console.log('*** Interests mapStateToProps place: ', place);
  const { userLoginSession } = auth;
  return { userLoginSession };
};

export default connect(mapStateToProps, {primaryInterestChange} )(Interests);
