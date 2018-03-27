import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, DatePickerIOS, Picker } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  birthDateChange,
  aboutMeChange,
  primaryInterestChange,
  saveUserProfile
} from '../actions';

class Profile extends Component {

  saveProfile = () => {
    console.log('Save profile');
  };

  showInterestScreen = () => {
    console.log('show interest');
    this.props.navigation.navigate('Interests');
  };

  birthDateChange = (value) => {
    this.props.birthDateChange(value);
  };

  aboutMeChange = (value) => {
    console.log('About me: ' + value);
    this.props.aboutMeChange(value);
  };

  primaryInterestChange = () => {
    this.props.primaryInterestChange(value);
    console.log('primaryInterestChange change');
  };


  render() {
    if (this.props.userDetails) {
      return(
        <View style={styles.cardStyle}>

          {/*This is the profile picture section */}
          <View style={ [styles.cardSectionStyle, { height: "30%"}] }>
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Avatar large rounded activeOpacity={0.7}
                source={{uri:this.props.userDetails.pictureLocation}}
                onPress={() => console.log("Works!")}
              />
              <Text></Text>
              <Text style={styles.dataText}>{this.props.userDetails.name} {this.props.userDetails.familyName}, {this.props.userDetails.age}</Text>
              <Text style={styles.dataText}>{this.props.userDetails.email}</Text>
            </View>
          </View>


          {/*Date of Birth section */}
          <View style={ [styles.cardSectionStyle, {height: "30%", borderWidth: 0, paddingLeft: 0} ] }>
            <View style={{ width: "100%", borderWidth: 0, paddingLeft: 5, justifyContent: 'flex-start'}}>
              <Text style={styles.labelText}>Date of Birth:</Text>
            </View>

            <View style={{ height: 150, width: "100%", borderTopWidth: .5, borderLeftWidth: 0, borderRightWidth: 0}}>
              <DatePickerIOS
                date={ this.props.birthDate }
                onDateChange = {this.birthDateChange }
                mode="date"
                maximumDate= {new Date('2000-03-24')}
              />
            </View>
          </View>


          {/*About Me section */}
          <View style={ [styles.cardSectionStyle, { paddingLeft: 0, height: "20%"} ]} >

            <View style={{ width: "100%", borderWidth: 0, paddingLeft: 5, justifyContent: 'flex-start'}} >
              <Text style={styles.labelText}>About Me: </Text>
            </View>

            <View style={{width: "100%", borderColor: 'black', borderWidth: .4, alignItems: 'flex-start'}} >
              <TextInput style={{height: 60, width: "100%"} }
                editable={true}
                autoFocus={false}
                value={this.props.aboutMe}
                //placeholder="This is a placeholder"
                placeholderTextColor="grey"
                multiline
                maxLength={100}
                onChangeText={this.aboutMeChange.bind(this)}
              />
            </View>
          </View>

          {/*Primary interest section
          <View style={ [styles.cardSectionStyle, { paddingLeft: 0, width: "100%"} ]} >
            <View style={{ width: "100%", borderWidth: 0, paddingLeft: 5, justifyContent: 'flex-start'}} >
              <Text style={styles.labelText}>Primary Interest: </Text>
            </View>

            <View style={ [styles.viewButton, { paddingLeft: 0, width: "100%"} ]}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.showInterestScreen} >
                <Text style={styles.buttonText}>Select Interest {this.props.primaryInterest.name}</Text>
              </TouchableOpacity>
            </View>
          </View>
          */}

          <View style={ [styles.cardSectionStyle, { paddingLeft: 0, width: "100%", height: "5%"} ]} >
            <View style={{ width: "100%", borderWidth: 0, paddingLeft: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}} >

              <View style={[styles.viewButton, { width: "20%", borderWidth: 0, paddingLeft: 5, borderRadius: 0, backgroundColor: "white"}]}>
                <TouchableOpacity style={styles.buttonStyle} onPress={this.showInterestScreen} >
                  <Text style={styles.labelText}>Interest: </Text>
                </TouchableOpacity>
              </View>

              <View style={ [styles.viewButton, {width: "80%", borderWidth: 0, borderRadius: 0, backgroundColor: "white"}]}>
                <TouchableOpacity style={styles.buttonStyle} onPress={this.showInterestScreen} >
                  <Text style={styles.buttonText}>{this.props.primaryInterest.name}</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>


          {/*Save button section */}
          <View style={ [styles.cardSectionStyle, { width: "100%", paddingLeft: 0, height: "15%"} ]} >
            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.saveProfile} >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'green',
    marginLeft: 1,
    marginRight: 1,
    marginTop: 0
  },
  cardSectionStyle: {
    //flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: .5,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    backgroundColor: '#fff',
    borderColor: 'grey'
  },


  imageStyle: {
    height: 100,
    //flex: 1,
    width: 80,
    marginTop: 10,
    marginBottom: 10
  },
  viewButton: {
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    height: 25,
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
    fontSize: 12,
    color: "white",
    fontWeight: "normal",
    fontStyle: "italic"
  },
  labelText: {
    color: "firebrick",
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: 'italic'
  },
  dataText: {
    color: "blue",
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: 'italic'
  }
});

const mapStateToProps = ( {auth, profile} ) => {
  console.log('*** Profile.js mapStateToProps auth: ', auth);
  console.log('*** Profile.js mapStateToProps profile: ', profile);
  const { userLoginSession, userDetails } = auth;
  const { birthDate, aboutMe, primaryInterest } = profile;
  return { userLoginSession, userDetails, birthDate, aboutMe, primaryInterest };
};

export default connect(mapStateToProps, {birthDateChange, aboutMeChange, primaryInterestChange} )(Profile);
