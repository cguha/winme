import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Container from '../components/Container';

import { connect } from 'react-redux';
import { createUserDetails } from '../actions';

class Auth extends Component {

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    console.log('** Auth componentWillMount token: ', token);
    if (token) {
      this.props.createUserDetails();
      this.props.navigation.navigate('Tabs');
    }
  };


  render() {
    if (this.props.token) {
      this.props.navigation.navigate('Tabs');
    };

    return (
      <View>
        <Text>Auth</Text>
      </View>
    );
  }
}

function mapStateToProps({ auth, location }) {
  console.log('Auth mapStateToProps auth: ', auth);
  console.log('Auth mapStateToProps location:', location)
  const { token } = auth;
  const { userDetails } = location;
  return { token, userDetails };
}

export default connect(mapStateToProps, { createUserDetails })(Auth);
