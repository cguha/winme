import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card } from 'react-native-elements';
import Container from '../components/Container';
import { connect } from 'react-redux';
import { facebookLogin } from '../actions';
import { AsyncStorage } from 'react-native';

class Login extends Component {

  /*
  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      console.log('token present in Login, redirects to NBP' + token);
      this.props.facebookLogin(() => { this.props.navigation.navigate('Tabs') });
    }
  };
  */


  validateLogin = () => {
    //console.log('################# Facebookbutton pressed');
    //this.props.facebookLogin(() => { this.props.navigation.navigate('NearByPlacesStack') });
    this.props.facebookLogin(() => { this.props.navigation.navigate('TabsStack') });
  };

  RemoveFBToken = () => {
    AsyncStorage.removeItem('fb_token');
    AsyncStorage.removeItem('fb_user_id');
  };

  render() {
    //console.log('*** render Login.js props: ', this.props);
    return (
      <View style={styles.containerStyle}>

        <View style={styles.upperView}>
          <Text style={styles.textStyle}>
            Who is near Me (WinMe)
          </Text>
        </View>

        <View style={styles.lowerView}>
          <TouchableOpacity title="Login Facebook" onPress={this.validateLogin} style={styles.buttonStyle} >
            <Text style={styles.buttonTextStyle}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'black',
    marginTop: 40,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0
  },
  upperView: {
    //flex: 1,
    borderWidth: 0,
    borderColor: 'green',
    height: "80%",
    marginTop: 0,
    marginRight: 1,
    marginLeft: 1,
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  lowerView: {
    //flex: 1,
    borderWidth: 0,
    borderColor: 'green',
    height: "20%",
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    backgroundColor: "midnightblue",
    width: "85%",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textStyle: {
    fontSize: 30,
    color: "red",
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  buttonTextStyle: {
    fontSize: 15,
    color: "white",
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ( {auth} ) => {
  //console.log('*** Login.js mapStateToProps auth: ', auth);
  const { fbToken } = auth;
  return { fbToken };
};

export default connect(mapStateToProps, {facebookLogin} )(Login);
