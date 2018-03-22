import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';



const Container = (props) => {
  if (props.scroll === true) {
    console.log(props.children);
    return (
      <ScrollView style={styles.styleScrollView}>
        {props.children}
      </ScrollView>
    );
  }

  return (
    <View style={styles.styleView}>
      {props.children}
    </View>
  );
};

export default Container;
