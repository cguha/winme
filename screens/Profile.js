import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import Container from '../components/Container';


class Profile extends Component {

  state = {
    editable: false,
    btnText: 'Edit',
    autoFocus: false
  };

  editPressed = () => {
    if (this.state.btnText === 'Edit') {
      this.setState( {editable: true, btnText: 'Save', autoFocus: true});
    } else if (this.state.btnText === 'Save') {
      this.setState( {editable: false, btnText: 'Edit', autoFocus: false});
    }
  }


  render() {
    if (this.props.userDetails) {
    return(
      <View style={styles.cardStyle}>

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

        <View style={ [styles.cardSectionStyle, { height: "70%"}] } >
          <View style={{borderWidth: 0, borderColor: "red", width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{borderWidth: 0, borderColor: "yellow", paddingLeft: 5}} >
              <Text style={styles.labelText}>About Me: </Text>
            </View>

            <View style={styles.viewButton}>
              <TouchableOpacity style={ styles.buttonStyle} onPress={this.editPressed}>
                <Text style={styles.buttonText}>{this.state.btnText}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: "100%", borderColor: 'black', borderWidth: .4, alignItems: 'flex-start', justifyContent: 'center'}} >
            <TextInput style={{height: 60, width: "100%"} }
              editable={this.state.editable}
              autoFocus={this.state.autoFocus}
              placeholder="This is a placeholder"
              placeholderTextColor="grey"
              multiline
              maxLength={100}
              onChangeText={(text) => this.setState({input: text})}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View></View>
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
  labelStyle: {
    flex: 1,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 10
  },
  dataStyle: {
    flex: 1,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0
  },
  sliderStyle: {
    height: 5,
    width: 350,
    flex: 1,
    margin: 0
  },
  viewHorizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderWidth: 0,
    borderColor: 'pink'
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
    width: "15%",
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
    fontWeight: "bold",
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

const mapStateToProps = ( {auth} ) => {
  console.log('*** Profile.js mapStateToProps auth: ', auth);
  const { fbToken, fbLoginID, userDetails } = auth;
  return { fbToken, fbLoginID, userDetails };
};

export default connect(mapStateToProps, {} )(Profile);
