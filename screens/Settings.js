import React, { Component } from 'react';
import { View, Text, Slider, StyleSheet, Switch, Button, TouchableHighlight, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../components/Container';
import {
  searchGenderChange,
  ageChange,
  distanceChange, showMeChange, showAgeChange, getUserSettings, saveSettings,
  nearByPlacesRefreshManage
} from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Settings extends Component {

  componentWillMount() {
    if (this.props.userLoginSession) {
      console.log('Settings.js componentWillMount userLoginSession: ', this.props.userLoginSession);
      this.getUserSettings(this.props.userLoginSession);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLoginSession !== this.props.userLoginSession) {
      console.log('Settings.js componentWillReceiveProps userLoginSession: ', nextProps.userLoginSession);
      this.getUserSettings(this.props.userLoginSession);
    }
  };

  getUserSettings = (userLoginSession) => {
    this.props.getUserSettings(userLoginSession.fbLoginID, userLoginSession.fbToken);
  };

  /*
    componentWillMount()
    render()
    componentDidMount()

    componentWillReceiveProps()
    shouldComponentUpdate()
    componentWillUpdate()
    render()
    componentDidUpdate()

    componentWillUnmount()

    componentDidCatch()
  */

  saveButtonPressed = () => {
    const { distance, age, searchGender, showMe, showAge, userLoginSession } = this.props;
    if (this.props.searchGender === 0) {
      searchG = 'M';
    }

    if (this.props.searchGender === 1) {
      searchG = 'F';
    }

    if (this.props.searchGender === 2) {
      searchG = 'B';
    }

    this.props.saveSettings(
      {distance, age, searchG, showMe, showAge, userLoginSession},
      () => {this.props.navigation.navigate('NearByPlacesStack')}
    );
    this.props.nearByPlacesRefreshManage('Y');
  }

  logoutButtonPressed = () => {
    AsyncStorage.removeItem('fb_token');
    AsyncStorage.removeItem('fb_user_id');
    AsyncStorage.removeItem('firstName');
    AsyncStorage.removeItem('lastName');
    AsyncStorage.removeItem('gender');
    AsyncStorage.removeItem('age');
    AsyncStorage.removeItem('birthDate');
    AsyncStorage.removeItem('email');

    this.props.navigation.navigate('Login');
  };

  distanceChange = (value) => {
    this.props.distanceChange(value);
  }

  ageChange = (value) => {
    this.props.ageChange(value);
  }

  searchGenderChange = (value) => {
    //console.log('searchGenderChange value: ' + value);
    this.props.searchGenderChange(value);
  }

  showMeChange = (value) => {
    this.props.showMeChange(value);
  }

  showAgeChange = (value) => {
    this.props.showAgeChange(value);
  }


  //state = { index: 2 }

  render() {

    return (
      <View style={ styles.cardStyle }>

        <View style={styles.cardSectionStyle}>
            <View style={styles.labelStyle}>
              <Text style={styles.textStyle}>Search Gender:</Text>
            </View>

            <View style={styles.dataStyle}>
              <ButtonGroup
                containerStyle={{flex:1, height: 30, marginRight: 1, borderColor: "black", borderWidth: 0.5 }}
                innerBorderStyle={{borderWidth: 0.5, color: "black"}}
                selectedButtonStyle={{backgroundColor: "firebrick"}}
                textStyle={{fontSize: 12, fontWeight: "normal"}}
                selectedTextStyle={{color: "white", fontSize: 12, fontWeight: "bold", fontStyle: "italic"}}
                onPress={this.searchGenderChange.bind(this)}
                selectedIndex={this.props.searchGender}
                buttons={['Men', 'Women', 'Both']}
              />
          </View>
        </View>

        <View style={styles.cardSectionStyle}>
            <View style={styles.viewHorizontal}>
              <Text style={styles.textStyle}>Search Age: 18 - {this.props.age}</Text>
              <Slider style={styles.sliderStyle} minimumValue={19} maximumValue={60} step={1}
                value={this.props.age}
                onValueChange={this.ageChange.bind(this)}
              />
            </View>
        </View>

        <View style={styles.cardSectionStyle}>
            <View style={styles.viewHorizontal}>
              <Text style={styles.textStyle}>Search Distance: 0 - {this.props.distance}</Text>
              <Slider style={styles.sliderStyle} minimumValue={1} maximumValue={20} step={1}
                value={this.props.distance}
                onValueChange={this.distanceChange.bind(this)}
              />
            </View>
        </View>

        <View style={styles.cardSectionStyle}>
          <View style={styles.labelStyle}>
            <Text style={styles.textStyle}>Show Me: </Text>
          </View>
          <View style={styles.dataStyle}>
            <Switch value={this.props.showMe} onValueChange={this.showMeChange.bind(this)}/>
          </View>
        </View>

        <View style={styles.cardSectionStyle}>
          <View style={styles.labelStyle}>
            <Text style={styles.textStyle}>Show My Age: </Text>
          </View>
          <View style={styles.dataStyle}>
            <Switch value={this.props.showAge} onValueChange={this.showAgeChange.bind(this)}/>
          </View>
        </View>


        <View style={ [styles.cardSectionStyle, {flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 1}] } >
          <View style={styles.viewButton}>
            <TouchableOpacity onPress={this.saveButtonPressed} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Save Settings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewButton}>
            <TouchableOpacity onPress={this.logoutButtonPressed} style={styles.buttonStyle} >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#fff"
  },
  cardSectionStyle: {
    flex: 1,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: .75,
    paddingTop: 5,
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'grey',
    //backgroundColor: "ghostwhite"
    backgroundColor: "#fff"
  },
  labelStyle: {
    //flex: 1,
    //width: "30%",
    borderWidth: 0,
    borderColor: "blue",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 10,
    //backgroundColor: "green"
    //marginTop: 20
  },
  dataStyle: {
    flex: 1,
    //width: "70%",
    borderWidth: 0,
    borderColor: "black",
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0
  },
  sliderStyle: {
    height: 5,
    width: "100%",
    flex: 1,
    marginRight: 0,
    marginLeft: 0
  },
  viewHorizontal: {
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderWidth: 0,
    borderColor: 'orange',
    marginTop: 5,
    marginRight: 0,
    marginLeft: 0
  },
  textStyle: {
    color: "firebrick",
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: 'italic'
  },
  viewButton: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    height: 35,
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

const mapStateToProps = ( {settings, auth } ) => {
  //console.log('*** Settings mapStateToProps settings: ', settings);
  //console.log('Settings mapStateToProps auth: ', auth);
  const { searchGender, age, distance, showMe, showAge, saveSettings } = settings;
  const { userLoginSession } = auth;
  return ( {userLoginSession, searchGender, age, distance, showMe, showAge, saveSettings });
};

export default connect(mapStateToProps,
  { searchGenderChange, ageChange, distanceChange, showMeChange, showAgeChange, getUserSettings,
    saveSettings, nearByPlacesRefreshManage })(Settings);
