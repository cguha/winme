import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const MapCallout = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.bubble}>
        <View style={styles.amount}>
          <Text style={styles.headerText}>{props.title}</Text>
          <Text style={styles.text}>Users: {props.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: "red"
  },
  bubble: {
    flex: 1,
    height: 50,
    width: 200,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    //backgroundColor: '#f7f7f7',
    backgroundColor: "crimson",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 6,
    //borderColor: '#3B5998',
    borderColor: 'crimson',
    borderWidth: .5
  },
  amount: {
    flex: 1,
    borderWidth: 0,
    borderColor: "blue",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "crimson"
  },
  calloutContainer: {
    width: 140,
  },
  headerText: {
    //color: '#181818',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  text: {
    //color: '#181818',
    color: 'white',
    fontSize: 12,
  }
};

export default MapCallout;
