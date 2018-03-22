import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { getTopCrowdedPlaces } from '../actions';
import Container from '../components/Container';

const OBJECTS = [
  {id: 1, name: 'Dip1', gender: 'M'},
  {id: 2, name: 'Dip1', gender: 'M'},
  {id: 3, name: 'Dip1', gender: 'M'},
  {id: 4, name: 'Dip1', gender: 'M'},
  {id: 5, name: 'Dip1', gender: 'M'},
  {id: 6, name: 'Dip1', gender: 'M'},
  {id: 7, name: 'Dip1', gender: 'M'},
  {id: 8, name: 'Dip1', gender: 'M'},
  {id: 9, name: 'Dip1', gender: 'M'},
  {id: 10, name: 'Dip1', gender: 'M'},
  {id: 11, name: 'Dip1', gender: 'M'},
  {id: 12, name: 'Dip1', gender: 'M'},
  {id: 13, name: 'Dip1', gender: 'M'},
  {id: 14, name: 'Dip1', gender: 'M'},
  {id: 15, name: 'Dip1', gender: 'M'},
  {id: 16, name: 'Dip1', gender: 'M'},
  {id: 17, name: 'Dip1', gender: 'M'},
  {id: 18, name: 'Dip1', gender: 'M'},
  {id: 19, name: 'Dip1', gender: 'M'},
  {id: 20, name: 'Dip1', gender: 'M'}
];

class TopCrowdedPlaces extends Component {

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
    if (this.props.userLoginSession) {
      console.log('TopCrowdedPlaces componentDidMount: ', this.props.userLoginSession);
      this.getTopCrowdedPlaces(this.props.userLoginSession);
    }
  };


  componentWillReceiveProps(nextProps) {
    if (nextProps.userLoginSession && this.props.userLoginSession == null) {
      console.log('TopCrowdedPlaces componentWillReceiveProps: ', nextProps.userLoginSession);
      this.getTopCrowdedPlaces(nextProps.userLoginSession);
    }
  };

  getTopCrowdedPlaces = (userLoginSession) => {
    this.props.getTopCrowdedPlaces(userLoginSession);
  };

  render() {
    console.log('render TopCrowded this.props.topCrowdedPlaces: ', this.props.topCrowdedPlaces);
    if (this.props.topCrowdedPlaces) {
      ///*
      return (
        <List containerStyle={styles.listStyle}>
          <FlatList
            data={this.props.topCrowdedPlaces.list}
            renderItem={ ({item}) => (
              <ListItem
                containerStyle={{ borderBottomWidth: 0 }}
                roundAvatar
                title={item.poiName}
                subtitle={item.poiType}
              />
            )}
            keyExtractor={item => item.poiId}
            ItemSeparatorComponent={this.renderSeperator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
        </List>
      );
      //*/
      /*
      return(
        <View>
          <Text>No top crowded places</Text>
        </View>
      );
      */
    } else {
      return(
        <View>
          <Text>No top crowded places</Text>
        </View>
      );
    }
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


const mapStateToProps = ( { auth, place }) => {
  //console.log('*** TopCrowdedPlaces mapStateToProps auth: ', auth);
  //console.log('*** TopCrowdedPlaces mapStateToProps place: ', place);
  const { userLoginSession } = auth;
  const { topCrowdedPlaces } = place;
  return { userLoginSession, topCrowdedPlaces };
};

export default connect(mapStateToProps, { getTopCrowdedPlaces })(TopCrowdedPlaces);
