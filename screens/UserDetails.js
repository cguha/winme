import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import Container from '../components/Container';


class UserDetails extends Component {
  render() {
    return (
      <View style={styles.cardStyle}>

        <View style={ [styles.cardSectionStyle, { borderWidth: 0, height: "30%" }] }>
          <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar large rounded activeOpacity={0.7}
              source={{uri:"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/28167328_136433773843252_2164380255172369558_n.jpg?oh=cec17294e24a4719764a21851e733222&oe=5B31E6C5" }}
              onPress={() => console.log("Works!")}
            />
            <Text></Text>
            <Text style={styles.dataText}>Dip Guha, 40</Text>
            <Text style={styles.dataText}>dip@email.com</Text>
          </View>
        </View>

        <View style={ [styles.cardSectionStyle, { height: "30%"}] } >
          <View style={{borderWidth: 0, borderColor: "red", width: "100%"}}>
            <View style={{borderWidth: 0, borderColor: "yellow", paddingLeft: 5}} >
              <Text style={styles.labelText}>About Me: </Text>
            </View>

            <View style={{width: "100%", borderColor: 'black', borderWidth: .3, alignItems: 'flex-start', justifyContent: 'center'}} >
              <TextInput style={{height: 60, width: "100%"} }
                editable={false}
                multiline
                onChangeText={(text) => this.setState({input: text})}
              />
            </View>
          </View>
        </View>

        <View style={ [styles.cardSectionStyle, {height: "40%", justifyContent: 'center', alignItems: 'center', paddingTop: 1}] }>
          <View style={styles.viewButton}>
            <TouchableOpacity onPress={this.saveButtonPressed} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Send a message</Text>
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
    borderBottomWidth: 0,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    backgroundColor: '#fff',
    //borderColor: 'grey'
  },
  imageStyle: {
    height: 100,
    //flex: 1,
    width: 80,
    marginTop: 10,
    marginBottom: 10
  },
  viewButton: {
    borderWidth: 0,
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

export default UserDetails;
